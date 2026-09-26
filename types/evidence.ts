/**
 * PlacementOS - Evidence Engine Types
 * Differentiator: "Claimed skill != Demonstrated skill"
 */

export type EvidenceSourceType =
  | 'assessment_performance'   // Highest trust (1.0)
  | 'verifiable_project'       // High trust (0.85)
  | 'internship_certification' // Medium-high trust (0.70)
  | 'resume_claim'             // Low trust (0.35)
  | 'self_assessment';         // Lowest trust (0.10) - strictly for calibration detection

export interface EvidenceItem {
  id: string;
  userId: string;
  skillId: string;
  sourceType: EvidenceSourceType;
  title: string;
  description?: string;
  url?: string;
  confidenceScore: number; // 0.0 to 1.0 (reliability of evidence)
  demonstratedLevel: number; // 1.0 to 5.0
  extractedKeywords?: string[];
  verifiedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface StudentClaimedSkill {
  skillId: string;
  claimedLevel: number; // 1.0 to 5.0 (or normalized from 1-10 scale)
  selfAssessedAt: string;
  confidenceSelfRating: number; // 1-5 scale of student subjective confidence
}

export type DemonstratedScoreStatus = 'ASSESSED' | 'NOT_ASSESSED';

export interface SkillEvidenceSummary {
  skillId: string;
  skillName?: string;
  status: DemonstratedScoreStatus;
  claimedLevel: number; // What student claims (1.0 to 5.0)
  demonstratedLevel: number | 'NOT_ASSESSED'; // Evidence-backed level or NOT_ASSESSED
  confidence: number; // 0.0 to 1.0
  confidenceBand: 'high' | 'medium' | 'low' | 'none';
  calibrationGap: number | 'NOT_ASSESSED'; // claimed - demonstrated
  calibrationState: 'overconfident' | 'underconfident' | 'well_calibrated' | 'NOT_ASSESSED';
  evidenceCount: number;
  evidenceTypes: EvidenceSourceType[];
  highestConfidenceSource?: EvidenceSourceType;
  lastAssessedAt?: string;
}
