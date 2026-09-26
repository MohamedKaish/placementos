/**
 * PlacementOS - Evidence Weighting & Calibration Engine
 * Differentiator: "Claimed skill != Demonstrated skill"
 *
 * Evidence Trust Levels:
 * Assessment performance  -> 1.00 (highest)
 * Verifiable project repo  -> 0.85 (high)
 * Internship/cert          -> 0.70 (medium-high)
 * Resume claim             -> 0.35 (low)
 * Self-assessment          -> 0.10 (lowest - strictly for calibration detection)
 */

import {
  EvidenceItem,
  EvidenceSourceType,
  SkillEvidenceSummary,
  StudentClaimedSkill,
  DemonstratedScoreStatus
} from '@/types/evidence';
import { CalibrationClassification, SkillCalibrationComparison } from '@/types/scoring';

export const EVIDENCE_TRUST_WEIGHTS: Record<EvidenceSourceType, number> = {
  assessment_performance: 1.0,     // Highest trust: Direct objective measurement
  verifiable_project: 0.85,        // High trust: Inspected code repo / circuit / CAD artifact
  internship_certification: 0.70,  // Medium-high trust: Industry or accredited cert
  resume_claim: 0.35,              // Low trust: Unverified textual mention on CV
  self_assessment: 0.10            // Lowest trust: Subjective student assertion
};

export class EvidenceEngine {
  /**
   * Calculates evidence-backed demonstrated score (0.0 to 5.0).
   * RULE: If there is zero verifiable evidence, returns 'NOT_ASSESSED' instead of guessing or inventing a score!
   * RULE: Self-assessment is NEVER directly awarded as a demonstrated score.
   */
  public static calculateDemonstratedLevel(items: EvidenceItem[]): {
    level: number | 'NOT_ASSESSED';
    confidence: number;
    confidenceBand: 'high' | 'medium' | 'low' | 'none';
    status: DemonstratedScoreStatus;
  } {
    // Filter out purely subjective self-assessments when computing objective demonstrated skill
    const objectiveItems = (items || []).filter((item) => item.sourceType !== 'self_assessment');

    if (!objectiveItems || objectiveItems.length === 0) {
      return {
        level: 'NOT_ASSESSED',
        confidence: 0,
        confidenceBand: 'none',
        status: 'NOT_ASSESSED'
      };
    }

    let totalWeight = 0;
    let weightedSum = 0;

    for (const item of objectiveItems) {
      const trustWeight = EVIDENCE_TRUST_WEIGHTS[item.sourceType] ?? 0.35;
      const combinedWeight = trustWeight * (item.confidenceScore ?? 0.5);

      weightedSum += item.demonstratedLevel * combinedWeight;
      totalWeight += combinedWeight;
    }

    if (totalWeight <= 0) {
      return {
        level: 'NOT_ASSESSED',
        confidence: 0,
        confidenceBand: 'none',
        status: 'NOT_ASSESSED'
      };
    }

    const rawLevel = weightedSum / totalWeight;
    const computedLevel = Number(Math.min(5.0, Math.max(0.0, rawLevel)).toFixed(2));

    // Assessment performance confers 1.0 confidence; other sources scale with total weight
    const hasAssessment = objectiveItems.some(
      (i) => i.sourceType === 'assessment_performance' && (i.confidenceScore ?? 0) >= 0.8
    );
    const rawConfidence = hasAssessment ? 1.0 : Math.min(1.0, totalWeight / 1.0);
    const confidence = Number(rawConfidence.toFixed(2));

    let confidenceBand: 'high' | 'medium' | 'low' | 'none' = 'low';
    if (confidence >= 0.75) confidenceBand = 'high';
    else if (confidence >= 0.45) confidenceBand = 'medium';

    return {
      level: computedLevel,
      confidence,
      confidenceBand,
      status: 'ASSESSED'
    };
  }

  /**
   * Compares Claimed vs Demonstrated vs Required levels
   */
  public static evaluateCalibration(
    skillId: string,
    skillName: string,
    claimed: StudentClaimedSkill | undefined,
    demonstrated: number | 'NOT_ASSESSED',
    requiredLevel: number
  ): SkillCalibrationComparison {
    const claimedLevel = claimed ? claimed.claimedLevel : 0;

    if (demonstrated === 'NOT_ASSESSED') {
      return {
        skillId,
        skillName,
        claimedLevel,
        demonstratedLevel: 'NOT_ASSESSED',
        requiredLevel,
        calibrationDelta: 'NOT_ASSESSED',
        classification: 'NOT_ASSESSED',
        explanation: `${skillName} has not been demonstrated through diagnostic assessments or verifiable artifacts.`
      };
    }

    const delta = Number((claimedLevel - demonstrated).toFixed(2));

    let classification: CalibrationClassification = 'well_calibrated';
    let explanation = `Self-claim (Level ${claimedLevel}) closely mirrors demonstrated ability (Level ${demonstrated}).`;

    if (delta > 0.6) {
      classification = 'overconfident';
      explanation = `Student claims Level ${claimedLevel}, but demonstrated evidence evaluates to Level ${demonstrated} (Delta: +${delta}).`;
    } else if (delta < -0.6) {
      classification = 'underconfident';
      explanation = `Imposter syndrome detected: Student claims Level ${claimedLevel}, but demonstrates superior ability at Level ${demonstrated} (Delta: ${delta}).`;
    }

    return {
      skillId,
      skillName,
      claimedLevel,
      demonstratedLevel: demonstrated,
      requiredLevel,
      calibrationDelta: delta,
      classification,
      explanation
    };
  }

  /**
   * Summarizes all evidence for a single skill
   */
  public static summarizeSkillEvidence(
    skillId: string,
    skillName: string,
    claimed: StudentClaimedSkill | undefined,
    evidenceItems: EvidenceItem[]
  ): SkillEvidenceSummary {
    const { level, confidence, confidenceBand, status } = this.calculateDemonstratedLevel(evidenceItems);
    const claimedLevel = claimed ? claimed.claimedLevel : 0;

    let calibrationGap: number | 'NOT_ASSESSED' = 'NOT_ASSESSED';
    let calibrationState: SkillEvidenceSummary['calibrationState'] = 'NOT_ASSESSED';

    if (level !== 'NOT_ASSESSED') {
      calibrationGap = Number((claimedLevel - level).toFixed(2));
      if (calibrationGap > 0.6) calibrationState = 'overconfident';
      else if (calibrationGap < -0.6) calibrationState = 'underconfident';
      else calibrationState = 'well_calibrated';
    }

    const evidenceTypes = Array.from(new Set(evidenceItems.map((e) => e.sourceType)));
    const highestSource = evidenceItems.reduce<EvidenceSourceType | undefined>((prev, curr) => {
      if (!prev) return curr.sourceType;
      return (EVIDENCE_TRUST_WEIGHTS[curr.sourceType] ?? 0) > (EVIDENCE_TRUST_WEIGHTS[prev] ?? 0)
        ? curr.sourceType
        : prev;
    }, undefined);

    return {
      skillId,
      skillName,
      status,
      claimedLevel,
      demonstratedLevel: level,
      confidence,
      confidenceBand,
      calibrationGap,
      calibrationState,
      evidenceCount: evidenceItems.length,
      evidenceTypes,
      highestConfidenceSource: highestSource,
      lastAssessedAt: evidenceItems.find((e) => e.sourceType === 'assessment_performance')?.verifiedAt
    };
  }
}
