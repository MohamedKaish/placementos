import { describe, it, expect } from 'vitest';
import { ScoringEngine, UserSkillEvaluationState } from '@/lib/scoring';
import { JobRole } from '@/types/skill-graph';

describe('Deterministic Scoring Engine', () => {
  const sampleRole: JobRole = {
    id: 'role_test',
    title: 'Test Power Systems Role',
    description: 'Test role description',
    requirements: [
      {
        skillId: 'skill_fault_analysis',
        weight: 0.6,
        minimumLevel: 3,
        critical: true
      },
      {
        skillId: 'skill_power_analysis',
        weight: 0.4,
        minimumLevel: 2,
        critical: false
      }
    ]
  };

  it('calculates deterministic gaps with zero false precision and traceable reasons', () => {
    const userEvaluation: UserSkillEvaluationState = {
      demonstratedSkills: {
        skill_fault_analysis: { level: 1.5, confidence: 1.0 },
        skill_power_analysis: { level: 2.0, confidence: 0.8 }
      }
    };

    const gaps = ScoringEngine.calculateSkillGaps(sampleRole, userEvaluation, (id) =>
      id === 'skill_fault_analysis' ? 'Fault Analysis' : 'Power Analysis'
    );
    expect(gaps).toHaveLength(2);

    const faultGap = gaps.find((g) => g.skillId === 'skill_fault_analysis')!;
    expect(faultGap.gapMagnitude).toBe(1.5);
    expect(faultGap.status).toBe('critical_gap');
    expect(faultGap.isCritical).toBe(true);
    expect(faultGap.traceableReason).toContain('Fault Analysis is your highest-priority critical demonstrated gap');

    const powerGap = gaps.find((g) => g.skillId === 'skill_power_analysis')!;
    expect(powerGap.gapMagnitude).toBe(0);
    expect(powerGap.status).toBe('proficient');
  });

  it('correctly handles NOT_ASSESSED skills as unassessed gaps', () => {
    const userEvaluation: UserSkillEvaluationState = {
      demonstratedSkills: {
        skill_fault_analysis: { level: 'NOT_ASSESSED', confidence: 0 },
        skill_power_analysis: { level: 2.0, confidence: 0.8 }
      }
    };

    const gaps = ScoringEngine.calculateSkillGaps(sampleRole, userEvaluation);
    const unassessed = gaps.find((g) => g.skillId === 'skill_fault_analysis')!;
    expect(unassessed.demonstratedLevel).toBe('NOT_ASSESSED');
    expect(unassessed.status).toBe('unassessed_gap');
    expect(unassessed.gapMagnitude).toBe(3); // Defaults to required level
  });

  it('exposes distinct Claimed vs Demonstrated vs Required comparisons in report', () => {
    const userEvaluation: UserSkillEvaluationState = {
      demonstratedSkills: {
        skill_fault_analysis: { level: 2.0, confidence: 1.0 },
        skill_power_analysis: { level: 2.5, confidence: 0.9 }
      },
      claimedSkills: {
        skill_fault_analysis: {
          skillId: 'skill_fault_analysis',
          claimedLevel: 4.5,
          selfAssessedAt: new Date().toISOString(),
          confidenceSelfRating: 5
        }
      }
    };

    const report = ScoringEngine.evaluateRoleReadiness(sampleRole, userEvaluation);
    expect(report.calibrations.length).toBe(2);

    const faultCal = report.calibrations.find((c) => c.skillId === 'skill_fault_analysis')!;
    expect(faultCal.claimedLevel).toBe(4.5);
    expect(faultCal.demonstratedLevel).toBe(2.0);
    expect(faultCal.requiredLevel).toBe(3);
    expect(faultCal.calibrationDelta).toBe(2.5);
    expect(faultCal.classification).toBe('overconfident');
  });
});
