/**
 * PlacementOS - Deterministic Scoring & Readiness Types
 * Critical Rule: Gemini should NOT calculate the final readiness score.
 * Deterministic formulas calculate readiness, calibration gaps, and skill gaps.
 */

import { SkillProficiencyLevel } from './skill-graph';

export interface SkillGapAnalysis {
  skillId: string;
  skillName: string;
  requiredLevel: SkillProficiencyLevel;
  currentEvidenceLevel: number;
  gapMagnitude: number; // requiredLevel - currentEvidenceLevel (clamped to >= 0)
  importanceWeight: number; // from JobRole
  isCritical: boolean;
  status: 'proficient' | 'minor_gap' | 'critical_gap';
}

export interface CalibrationGapAnalysis {
  skillId: string;
  skillName: string;
  claimedLevel: SkillProficiencyLevel;
  demonstratedLevel: number;
  gap: number; // claimed - demonstrated
  classification:
    | 'well_calibrated'      // |gap| <= 0.5
    | 'overconfident'        // gap > 0.5 (claims high, demonstrates low)
    | 'underconfident';      // gap < -0.5 (imposter syndrome: demonstrates higher than claimed)
}

export interface RoleReadinessReport {
  roleId: string;
  roleTitle: string;
  evaluatedAt: string;
  // Multi-dimensional breakdown rather than a single fake percentage
  foundationReadiness: number; // 0 - 100%
  coreSkillsReadiness: number; // 0 - 100%
  evidenceCoverage: number;    // % of required skills that have verifiable evidence
  criticalRequirementsMet: boolean;
  overallReadinessBand: 'Target_Ready' | 'Advancing' | 'Developing' | 'Needs_Foundation';
  skillGaps: SkillGapAnalysis[];
  calibrationGaps: CalibrationGapAnalysis[];
  topPriorityGapSkillIds: string[];
}
