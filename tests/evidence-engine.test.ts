import { describe, it, expect } from 'vitest';
import { EvidenceEngine, EVIDENCE_TRUST_WEIGHTS } from '@/lib/evidence-engine';
import { EvidenceItem } from '@/types/evidence';

describe('Evidence Engine', () => {
  it('enforces hierarchy: assessment > project > certification > resume > self', () => {
    expect(EVIDENCE_TRUST_WEIGHTS.assessment_performance).toBeGreaterThan(
      EVIDENCE_TRUST_WEIGHTS.verifiable_project
    );
    expect(EVIDENCE_TRUST_WEIGHTS.verifiable_project).toBeGreaterThan(
      EVIDENCE_TRUST_WEIGHTS.internship_certification
    );
    expect(EVIDENCE_TRUST_WEIGHTS.internship_certification).toBeGreaterThan(
      EVIDENCE_TRUST_WEIGHTS.resume_claim
    );
    expect(EVIDENCE_TRUST_WEIGHTS.resume_claim).toBeGreaterThan(
      EVIDENCE_TRUST_WEIGHTS.self_assessment
    );
  });

  it('proves self claim 10/10 does not inflate objective demonstrated level', () => {
    const items: EvidenceItem[] = [
      {
        id: 'ev_self',
        userId: 'u1',
        skillId: 'skill_fault_analysis',
        sourceType: 'self_assessment',
        title: 'I claim 10/10 mastery in Fault Analysis',
        confidenceScore: 1.0,
        demonstratedLevel: 5.0
      }
    ];

    const result = EvidenceEngine.calculateDemonstratedLevel(items);
    // Because self-assessment is filtered out from objective demonstrated calculation,
    // the system correctly returns NOT_ASSESSED instead of granting an unearned 5.0!
    expect(result.level).toBe('NOT_ASSESSED');
    expect(result.status).toBe('NOT_ASSESSED');
  });

  it('returns NOT_ASSESSED when zero evidence exists instead of guessing a score', () => {
    const result = EvidenceEngine.calculateDemonstratedLevel([]);
    expect(result.level).toBe('NOT_ASSESSED');
    expect(result.confidence).toBe(0);
    expect(result.confidenceBand).toBe('none');
  });

  it('calculates weighted demonstrated score when real assessment and repo exist', () => {
    const items: EvidenceItem[] = [
      {
        id: 'ev_1',
        userId: 'u1',
        skillId: 'skill_fault_analysis',
        sourceType: 'resume_claim',
        title: 'Resume mention of Power Systems',
        confidenceScore: 0.6,
        demonstratedLevel: 4.5
      },
      {
        id: 'ev_2',
        userId: 'u1',
        skillId: 'skill_fault_analysis',
        sourceType: 'assessment_performance',
        title: 'Diagnostic Assessment Score',
        confidenceScore: 1.0,
        demonstratedLevel: 2.5
      }
    ];

    const result = EvidenceEngine.calculateDemonstratedLevel(items);
    expect(result.status).toBe('ASSESSED');
    expect(result.level).not.toBe('NOT_ASSESSED');
    // Assessment weight (1.0 * 1.0 = 1.0) heavily outweighs resume claim (0.35 * 0.6 = 0.21)
    // Weighted level should be close to 2.85
    expect(result.level as number).toBeLessThan(3.0);
    expect(result.level as number).toBeGreaterThan(2.5);
  });

  it('correctly calculates calibration gap and identifies overconfidence', () => {
    const claimed = {
      skillId: 'skill_fault_analysis',
      claimedLevel: 4.5,
      selfAssessedAt: new Date().toISOString(),
      confidenceSelfRating: 5
    };
    const demonstrated = 2.5;
    const required = 3.0;

    const cal = EvidenceEngine.evaluateCalibration(
      'skill_fault_analysis',
      'Fault Analysis',
      claimed,
      demonstrated,
      required
    );

    expect(cal.claimedLevel).toBe(4.5);
    expect(cal.demonstratedLevel).toBe(2.5);
    expect(cal.requiredLevel).toBe(3.0);
    expect(cal.calibrationDelta).toBe(2.0);
    expect(cal.classification).toBe('overconfident');
  });
});
