import { describe, it, expect } from 'vitest';
import { defaultPlacementService } from '@/lib/placement-service';
import { EvidenceItem } from '@/types/evidence';
import { ScoreHistoryPoint } from '@/types/reassessment';

describe('PlacementOS Core Intelligence & Diagnostics (Team 1)', () => {
  // =========================================================================
  // MANDATE 1: Self claim does NOT override assessment evidence
  // =========================================================================
  it('1. Self claim does not override objective assessment evidence', () => {
    // Student claims 10/10 (Level 5.0) in Fault Analysis, but assessment yields Level 2.0
    const evidenceItems: EvidenceItem[] = [
      {
        id: 'ev_self',
        userId: 'student_eee_1',
        skillId: 'skill_fault_analysis',
        sourceType: 'self_assessment',
        title: 'Subjective self-rating: 10/10 Expert',
        confidenceScore: 1.0,
        demonstratedLevel: 5.0
      },
      {
        id: 'ev_test',
        userId: 'student_eee_1',
        skillId: 'skill_fault_analysis',
        sourceType: 'assessment_performance',
        title: 'Diagnostic Test: Power Fault Analysis',
        confidenceScore: 1.0,
        demonstratedLevel: 2.0
      }
    ];

    const report = defaultPlacementService.evaluateReadiness('role_power_engineer', evidenceItems, {
      skill_fault_analysis: {
        skillId: 'skill_fault_analysis',
        claimedLevel: 5.0,
        selfAssessedAt: new Date().toISOString(),
        confidenceSelfRating: 5
      }
    });

    const faultCal = report.calibrations.find((c) => c.skillId === 'skill_fault_analysis')!;
    // Objective demonstrated score must be based on assessment (2.0), not inflated by self claim
    expect(faultCal.demonstratedLevel).toBe(2.0);
    expect(faultCal.claimedLevel).toBe(5.0);
  });

  // =========================================================================
  // MANDATE 2: Claimed vs demonstrated delta is correct
  // =========================================================================
  it('2. Claimed vs demonstrated delta is calculated accurately and identifies calibration state', () => {
    const evidenceItems: EvidenceItem[] = [
      {
        id: 'ev_test',
        userId: 'student_eee_1',
        skillId: 'skill_fault_analysis',
        sourceType: 'assessment_performance',
        title: 'Diagnostic Test: Power Fault Analysis',
        confidenceScore: 1.0,
        demonstratedLevel: 2.5
      }
    ];

    const report = defaultPlacementService.evaluateReadiness('role_power_engineer', evidenceItems, {
      skill_fault_analysis: {
        skillId: 'skill_fault_analysis',
        claimedLevel: 4.5,
        selfAssessedAt: new Date().toISOString(),
        confidenceSelfRating: 4
      }
    });

    const faultCal = report.calibrations.find((c) => c.skillId === 'skill_fault_analysis')!;
    // Claimed 4.5, Demonstrated 2.5 -> Delta = 2.0 (Overconfident)
    expect(faultCal.calibrationDelta).toBe(2.0);
    expect(faultCal.classification).toBe('overconfident');
  });

  // =========================================================================
  // MANDATE 3: Required skill gap is correct
  // =========================================================================
  it('3. Required skill gap is calculated correctly against role threshold', () => {
    // Power Systems Engineer requires Level 3 for Fault Analysis
    const evidenceItems: EvidenceItem[] = [
      {
        id: 'ev_test',
        userId: 'student_eee_1',
        skillId: 'skill_fault_analysis',
        sourceType: 'assessment_performance',
        title: 'Diagnostic Test',
        confidenceScore: 1.0,
        demonstratedLevel: 1.8
      }
    ];

    const report = defaultPlacementService.evaluateReadiness('role_power_engineer', evidenceItems);
    const faultGap = report.skillGaps.find((g) => g.skillId === 'skill_fault_analysis')!;

    expect(faultGap.requiredLevel).toBe(3);
    expect(faultGap.demonstratedLevel).toBe(1.8);
    // Gap = 3.0 - 1.8 = 1.2
    expect(faultGap.gapMagnitude).toBe(1.2);
    expect(faultGap.status).toBe('critical_gap');
  });

  // =========================================================================
  // MANDATE 4: Insufficient evidence returns NOT_ASSESSED
  // =========================================================================
  it('4. Insufficient evidence returns NOT_ASSESSED without guessing scores', () => {
    // Empty evidence array
    const report = defaultPlacementService.evaluateReadiness('role_power_engineer', []);
    const faultGap = report.skillGaps.find((g) => g.skillId === 'skill_fault_analysis')!;

    expect(faultGap.demonstratedLevel).toBe('NOT_ASSESSED');
    expect(faultGap.status).toBe('unassessed_gap');

    const faultCal = report.calibrations.find((c) => c.skillId === 'skill_fault_analysis')!;
    expect(faultCal.demonstratedLevel).toBe('NOT_ASSESSED');
    expect(faultCal.calibrationDelta).toBe('NOT_ASSESSED');
    expect(faultCal.classification).toBe('NOT_ASSESSED');
  });

  // =========================================================================
  // MANDATE 5: Adaptive difficulty changes correctly
  // =========================================================================
  it('5. Adaptive difficulty changes correctly (accelerating, misconceptions, and fragile knowledge)', () => {
    const { session, firstQuestion } = defaultPlacementService.startAssessment(
      'student_demo',
      'skill_fault_analysis',
      'role_power_engineer',
      1 // start at difficulty 1
    );

    expect(firstQuestion).toBeDefined();
    expect(session.currentDifficulty).toBe(1);

    // Step A: Correct answer + High confidence -> Advances difficulty
    const stepA = defaultPlacementService.submitAnswer(
      session.sessionId,
      'q_fault_1',
      'opt_a', // correct
      'high',
      25 // fast response
    );
    expect(stepA.stepResult.isCorrect).toBe(true);
    expect(stepA.stepResult.decision).toBe('increase_difficulty');
    expect(stepA.stepResult.nextDifficulty).toBe(2);

    // Step B: Wrong answer + Very High confidence -> Flagged as conceptual misconception!
    const stepB = defaultPlacementService.submitAnswer(
      session.sessionId,
      'q_fault_2',
      'opt_a', // wrong (chose parallel instead of series for SLG fault)
      'high',
      30
    );
    expect(stepB.stepResult.isCorrect).toBe(false);
    expect(stepB.stepResult.decision).toBe('possible_misconception');
    expect(stepB.stepResult.nextDifficulty).toBe(1); // Steps back to reinforce root concept

    // Step C: Correct answer + Very slow time -> Flagged as fragile/developing knowledge (maintains)
    const stepC = defaultPlacementService.submitAnswer(
      session.sessionId,
      'q_fault_3',
      'opt_b', // correct
      'medium',
      180 // took 180s on a 90s question (>1.5x expected)
    );
    expect(stepC.stepResult.isCorrect).toBe(true);
    expect(stepC.stepResult.decision).toBe('fragile_knowledge');
    expect(stepC.stepResult.nextDifficulty).toBe(stepC.stepResult.previousDifficulty);
  });

  // =========================================================================
  // MANDATE 6: Mission priority follows skill gap and role importance
  // =========================================================================
  it('6. Mission priority follows skill gap and role importance deterministically', () => {
    // Generate readiness report with a critical gap in Fault Analysis
    const evidenceItems: EvidenceItem[] = [
      {
        id: 'ev_1',
        userId: 'student_eee',
        skillId: 'skill_fault_analysis',
        sourceType: 'assessment_performance',
        title: 'Diagnostic Test',
        confidenceScore: 1.0,
        demonstratedLevel: 1.0 // Gap of 2.0 on critical skill (weight 0.45)
      },
      {
        id: 'ev_2',
        userId: 'student_eee',
        skillId: 'skill_power_analysis',
        sourceType: 'assessment_performance',
        title: 'Diagnostic Test',
        confidenceScore: 1.0,
        demonstratedLevel: 1.5 // Gap of 0.5 on non-critical skill (weight 0.25)
      }
    ];

    const report = defaultPlacementService.evaluateReadiness('role_power_engineer', evidenceItems);
    const missions = defaultPlacementService.generateMissions(
      'student_eee',
      'role_power_engineer',
      report.skillGaps
    );

    expect(missions.length).toBeGreaterThanOrEqual(1);
    // Fault Analysis mission must be ranked #1
    expect(missions[0].targetSkillId).toBe('skill_fault_analysis');
    expect(missions[0].reason).toContain('is your highest-priority critical demonstrated gap');
    expect(missions[0].reason).toContain('Fault Analysis');
    expect(missions[0].practice.problemStatement).toBeDefined();
    expect(missions[0].successCriteria).toBeDefined();
  });

  // =========================================================================
  // MANDATE 7: Reassessment delta and learning velocity are correct
  // =========================================================================
  it('7. Reassessment delta is calculated accurately and tracks learning velocity', () => {
    const history: ScoreHistoryPoint[] = [
      { attemptId: 'att_1', timestamp: '2026-09-01T10:00:00Z', demonstratedScore: 2.0 },
      { attemptId: 'att_2', timestamp: '2026-09-10T10:00:00Z', demonstratedScore: 2.8 },
      { attemptId: 'att_3', timestamp: '2026-09-20T10:00:00Z', demonstratedScore: 3.5 }
    ];

    const reassessment = defaultPlacementService.getReassessment(
      'skill_fault_analysis',
      'role_power_engineer',
      2.0, // baseline
      3.5, // post-mission
      history
    );

    // Delta = 3.5 - 2.0 = 1.5
    expect(reassessment.delta).toBe(1.5);
    expect(reassessment.isGapClosed).toBe(true); // Requirement is 3.0, achieved 3.5
    expect(reassessment.status).toBe('significantly_improved');
    expect(reassessment.learningVelocity).toBe(0.75); // (0.8 + 0.7) / 2
    expect(reassessment.feedback).toContain('Milestone achieved!');

    // Test NOT_ENOUGH_DATA when fewer than 2 attempts exist
    const velocitySingle = defaultPlacementService.getLearningVelocity('skill_fault_analysis', [
      { attemptId: 'att_1', timestamp: '2026-09-01T10:00:00Z', demonstratedScore: 2.0 }
    ]);
    expect(velocitySingle.learningVelocity).toBe('NOT_ENOUGH_DATA');
    expect(velocitySingle.trend).toBe('NOT_ENOUGH_DATA');
  });

  // =========================================================================
  // MANDATE 8: Different departments use the exact same engine
  // =========================================================================
  it('8. Universal engine supports EEE -> Power Systems and CSE -> Software Engineer', () => {
    // Flow 1: EEE student targeting Power Systems Engineer
    const eeeEvidence: EvidenceItem[] = [
      {
        id: 'ev_eee_1',
        userId: 'student_eee',
        skillId: 'skill_fault_analysis',
        sourceType: 'assessment_performance',
        title: 'Diagnostic Test',
        confidenceScore: 1.0,
        demonstratedLevel: 2.0
      }
    ];

    const eeeReport = defaultPlacementService.evaluateReadiness('role_power_engineer', eeeEvidence);
    expect(eeeReport.roleId).toBe('role_power_engineer');
    expect(eeeReport.skillGaps.some((g) => g.skillId === 'skill_fault_analysis')).toBe(true);

    // Flow 2: CSE student targeting Software Engineer
    const cseEvidence: EvidenceItem[] = [
      {
        id: 'ev_cse_1',
        userId: 'student_cse',
        skillId: 'skill_dsa',
        sourceType: 'assessment_performance',
        title: 'Live Coding DSA',
        confidenceScore: 1.0,
        demonstratedLevel: 3.5
      },
      {
        id: 'ev_cse_2',
        userId: 'student_cse',
        skillId: 'skill_backend_apis',
        sourceType: 'verifiable_project',
        title: 'GitHub Microservice API Project',
        confidenceScore: 0.9,
        demonstratedLevel: 3.0
      }
    ];

    const cseReport = defaultPlacementService.evaluateReadiness('role_swe', cseEvidence);
    expect(cseReport.roleId).toBe('role_swe');
    expect(cseReport.skillGaps.some((g) => g.skillId === 'skill_dsa')).toBe(true);
    expect(cseReport.overallReadinessBand).toBeDefined();

    // Confirm that JobRole has NO department hardcoding
    const allRoles = defaultPlacementService.getJobRoles();
    for (const r of allRoles) {
      expect((r as unknown as { departmentId?: string }).departmentId).toBeUndefined();
    }
  });
});
