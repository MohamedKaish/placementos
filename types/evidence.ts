/**
 * PlacementOS - Evidence Engine Types
 * Differentiator: "Claimed skill != Demonstrated skill"
 */

import { SkillProficiencyLevel } from './skill-graph';

export type EvidenceSourceType =
  | 'resume_parsed'
  | 'project_repo'
  | 'coursework_certificate'
  | 'internship_experience'
  | 'technical_assessment'
  | 'live_coding'
  | 'faculty_endorsement';

export interface EvidenceItem {
  id: string;
  userId: string;
  skillId: string;
  sourceType: EvidenceSourceType;
  title: string;
  description?: string;
  url?: string;
  confidenceScore: number; // 0.0 to 1.0 (reliability of evidence)
  demonstratedLevel: SkillProficiencyLevel;
  extractedKeywords?: string[];
  verifiedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface StudentClaimedSkill {
  skillId: string;
  claimedLevel: SkillProficiencyLevel;
  selfAssessedAt: string;
  confidenceSelfRating: number; // 1-5 scale of how sure student feels
}

export interface SkillEvidenceSummary {
  skillId: string;
  claimedLevel: SkillProficiencyLevel;
  evidenceBackedLevel: number; // Computed continuous level 0.0 - 5.0
  demonstratedLevel?: SkillProficiencyLevel; // From direct interactive assessments
  calibrationGap: number; // Claimed minus Demonstrated/Evidence-backed (+ means overconfident, - means imposter syndrome)
  evidenceCount: number;
  highestConfidenceSource: EvidenceSourceType;
  lastEvaluatedAt: string;
}
