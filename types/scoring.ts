/**
 * PlacementOS - Deterministic Scoring & Readiness Types
 * Differentiator: "Claimed skill != Demonstrated skill != Required skill"
 * Gemini NEVER calculates readiness scores.
 */

export type CalibrationClassification =
  | 'well_calibrated'  // |gap| <= 0.6
  | 'overconfident'    // gap > 0.6 (claims high, demonstrates low)
  | 'underconfident'   // gap < -0.6 (imposter syndrome: demonstrates higher than claimed)
  | 'NOT_ASSESSED';    // Insufficient evidence to calibrate

export interface SkillCalibrationComparison {
  skillId: string;
  skillName: string;
  claimedLevel: number; // What student claims (0.0 to 5.0)
  demonstratedLevel: number | 'NOT_ASSESSED'; // Evidence-backed level
  requiredLevel: number; // Role requirement
  calibrationDelta: number | 'NOT_ASSESSED'; // claimed - demonstrated
  classification: CalibrationClassification;
  explanation: string;
}

export interface SkillGapAnalysis {
  skillId: string;
  skillName: string;
  subskillName?: string;
  requiredLevel: number; // e.g. 3.0
  demonstratedLevel: number | 'NOT_ASSESSED'; // e.g. 1.5 or NOT_ASSESSED
  gapMagnitude: number; // requiredLevel - demonstratedLevel (clamped >= 0)
  importanceWeight: number; // from JobRole (0.0 to 1.0)
  isCritical: boolean; // hard gate
  evidenceConfidence: number; // 0.0 to 1.0
  priorityScore: number; // deterministically calculated
  status: 'proficient' | 'minor_gap' | 'critical_gap' | 'unassessed_gap';
  traceableReason: string; // e.g. "Recommended because Fault Analysis is your highest-priority demonstrated gap for the selected Power Systems role."
}

export interface RoleReadinessReport {
  roleId: string;
  roleTitle: string;
  evaluatedAt: string;
  foundationReadiness: number; // 0 to 100%
  coreSkillsReadiness: number; // 0 to 100%
  evidenceCoverage: number;    // % of required skills that have verifiable evidence
  criticalRequirementsMet: boolean;
  overallReadinessBand: 'Target_Ready' | 'Advancing' | 'Developing' | 'Needs_Foundation';
  calibrations: SkillCalibrationComparison[];
  skillGaps: SkillGapAnalysis[];
  topPriorityGapSkillIds: string[];
}
