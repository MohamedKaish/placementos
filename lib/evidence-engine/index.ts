/**
 * PlacementOS - Evidence Weighting & Calibration Engine
 * Differentiator: "Claimed skill != Demonstrated skill"
 */

import {
  EvidenceItem,
  EvidenceSourceType,
  SkillEvidenceSummary,
  StudentClaimedSkill
} from '@/types/evidence';
import { CalibrationGapAnalysis } from '@/types/scoring';

// Reliability weight matrix by evidence source type
export const SOURCE_RELIABILITY_WEIGHTS: Record<EvidenceSourceType, number> = {
  technical_assessment: 1.0,     // Direct verified assessment
  live_coding: 0.95,             // Real-time verified performance
  faculty_endorsement: 0.85,     // Academic verified endorsement
  internship_experience: 0.80,   // Industry work experience
  project_repo: 0.70,            // Inspected code artifacts / commits
  coursework_certificate: 0.50,  // Completed certified course
  resume_parsed: 0.30            // Unverified self-claim on resume
};

export class EvidenceEngine {
  /**
   * Aggregates multiple evidence items for a specific skill into a weighted score (0.0 - 5.0)
   */
  public static calculateEvidenceBackedLevel(items: EvidenceItem[]): number {
    if (!items || items.length === 0) return 0;

    let totalWeight = 0;
    let weightedSum = 0;

    for (const item of items) {
      const sourceWeight = SOURCE_RELIABILITY_WEIGHTS[item.sourceType] ?? 0.3;
      const combinedWeight = sourceWeight * (item.confidenceScore ?? 0.5);

      weightedSum += item.demonstratedLevel * combinedWeight;
      totalWeight += combinedWeight;
    }

    if (totalWeight === 0) return 0;
    const computed = weightedSum / totalWeight;
    return Number(Math.min(5.0, Math.max(0.0, computed)).toFixed(2));
  }

  /**
   * Calculates calibration gap:
   * gap = claimedLevel - evidenceBackedLevel
   * Positive gap = overconfident
   * Negative gap = underconfident (imposter syndrome)
   */
  public static computeCalibrationGap(
    claimed: StudentClaimedSkill,
    evidenceLevel: number,
    skillName: string
  ): CalibrationGapAnalysis {
    const rawGap = claimed.claimedLevel - evidenceLevel;
    const roundedGap = Number(rawGap.toFixed(2));

    let classification: CalibrationGapAnalysis['classification'] = 'well_calibrated';
    if (roundedGap > 0.75) {
      classification = 'overconfident';
    } else if (roundedGap < -0.75) {
      classification = 'underconfident';
    }

    return {
      skillId: claimed.skillId,
      skillName,
      claimedLevel: claimed.claimedLevel,
      demonstratedLevel: evidenceLevel,
      gap: roundedGap,
      classification
    };
  }

  /**
   * Generates a comprehensive summary for a single skill
   */
  public static summarizeSkillEvidence(
    claimed: StudentClaimedSkill,
    evidenceItems: EvidenceItem[]
  ): SkillEvidenceSummary {
    const evidenceBackedLevel = this.calculateEvidenceBackedLevel(evidenceItems);
    const gap = Number((claimed.claimedLevel - evidenceBackedLevel).toFixed(2));

    const highestConfidence = evidenceItems.reduce<EvidenceSourceType>(
      (highest, current) => {
        const currentWeight = SOURCE_RELIABILITY_WEIGHTS[current.sourceType];
        const highestWeight = SOURCE_RELIABILITY_WEIGHTS[highest] ?? 0;
        return currentWeight > highestWeight ? current.sourceType : highest;
      },
      evidenceItems[0]?.sourceType ?? 'resume_parsed'
    );

    return {
      skillId: claimed.skillId,
      claimedLevel: claimed.claimedLevel,
      evidenceBackedLevel,
      calibrationGap: gap,
      evidenceCount: evidenceItems.length,
      highestConfidenceSource: highestConfidence,
      lastEvaluatedAt: new Date().toISOString()
    };
  }
}
