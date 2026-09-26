import { describe, it, expect } from 'vitest';
import { EvidenceEngine, SOURCE_RELIABILITY_WEIGHTS } from '@/lib/evidence-engine';
import { EvidenceItem } from '@/types/evidence';

describe('Evidence Engine', () => {
  it('weights technical assessment higher than unverified resume claim', () => {
    expect(SOURCE_RELIABILITY_WEIGHTS.technical_assessment).toBeGreaterThan(
      SOURCE_RELIABILITY_WEIGHTS.resume_parsed
    );
  });

  it('calculates weighted demonstrated level accurately', () => {
    const items: EvidenceItem[] = [
      {
        id: 'ev_1',
        userId: 'u1',
        skillId: 'skill_dsa',
        sourceType: 'resume_parsed',
        title: 'Resume claim',
        confidenceScore: 0.5,
        demonstratedLevel: 5
      },
      {
        id: 'ev_2',
        userId: 'u1',
        skillId: 'skill_dsa',
        sourceType: 'technical_assessment',
        title: 'Live DSA Coding Assessment',
        confidenceScore: 1.0,
        demonstratedLevel: 2
      }
    ];

    const result = EvidenceEngine.calculateEvidenceBackedLevel(items);
    // Weight for resume: 0.30 * 0.5 = 0.15
    // Weight for assessment: 1.0 * 1.0 = 1.0
    // Weighted level: (5 * 0.15 + 2 * 1.0) / (0.15 + 1.0) = (0.75 + 2.0) / 1.15 = 2.39
    expect(result).toBeCloseTo(2.39, 1);
  });

  it('correctly classifies overconfidence in calibration gap', () => {
    const claimed = {
      skillId: 'skill_dsa',
      claimedLevel: 5 as const,
      selfAssessedAt: new Date().toISOString(),
      confidenceSelfRating: 5
    };
    const demonstrated = 2.0;

    const gapAnalysis = EvidenceEngine.computeCalibrationGap(claimed, demonstrated, 'DSA');
    expect(gapAnalysis.gap).toBe(3.0);
    expect(gapAnalysis.classification).toBe('overconfident');
  });

  it('correctly classifies imposter syndrome (underconfident) in calibration gap', () => {
    const claimed = {
      skillId: 'skill_dsa',
      claimedLevel: 2 as const,
      selfAssessedAt: new Date().toISOString(),
      confidenceSelfRating: 2
    };
    const demonstrated = 4.2;

    const gapAnalysis = EvidenceEngine.computeCalibrationGap(claimed, demonstrated, 'DSA');
    expect(gapAnalysis.gap).toBeLessThan(-0.75);
    expect(gapAnalysis.classification).toBe('underconfident');
  });
});
