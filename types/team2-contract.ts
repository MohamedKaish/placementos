/**
 * PlacementOS - Team 2 (Product & UI) Official Type Contracts
 * Clean public interfaces exposed for the UI layer.
 */

import { Department, Domain, Skill, Subskill, Tool, JobRole, RoleSkillRequirement } from './skill-graph';
import { EvidenceItem, SkillEvidenceSummary, StudentClaimedSkill } from './evidence';
import { AssessmentQuestion, AssessmentSession, AssessmentResult, AdaptiveStepResult, StudentQuestionConfidence } from './assessment';
import { SkillGapAnalysis, SkillCalibrationComparison, RoleReadinessReport } from './scoring';
import { PreparationMission, MissionStep } from './mission';
import { UserProfile } from './user';
import { ReassessmentResult, LearningVelocityResult } from './reassessment';

// Explicit re-exports matching Team 2 specifications
export type StudentProfile = UserProfile;
export type { Department, Domain, Skill, Subskill, Tool, JobRole };
export type SkillRequirement = RoleSkillRequirement;
export type SkillEvidence = EvidenceItem;
export type { AssessmentQuestion, AssessmentSession, AssessmentResult, AdaptiveStepResult, StudentQuestionConfidence };
export type SkillGap = SkillGapAnalysis;
export type Mission = PreparationMission;
export type { MissionStep };
export type { ReassessmentResult, LearningVelocityResult, RoleReadinessReport, SkillCalibrationComparison, SkillEvidenceSummary, StudentClaimedSkill };

export interface ReadinessDimension {
  name: string;
  score: number; // 0-100
  label: string;
  status: 'passed' | 'warning' | 'critical';
}
