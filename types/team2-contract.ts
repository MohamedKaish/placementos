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
  score: number | null; // null if NOT_ASSESSED
  label: string;
  status: 'passed' | 'warning' | 'critical' | 'not_assessed';
  benchmarkScore?: number;
  evidenceCount?: number;
  notes?: string;
}

// UI Presentation Models for Stitch Screens
export interface CandidateConfig {
  name: string;
  departmentCode: string;
  academicYear: string;
  roleId: string;
  claimedScore: number;
}

export interface WeakSubskillItem {
  name: string;
  claimedScore: number;
  demonstratedScore: number;
  requiredScore: number;
  gap: number;
  rootCause: string;
  errorTrace?: string;
}

export interface EvidenceTelemetryItem {
  type: string;
  label: string;
  confidenceWeight: number;
  sampleCount: number;
  status: 'VERIFIED' | 'TELEMETRY_LOGGED' | 'IN_PROGRESS';
}

export interface CalibrationUIResult {
  runId: string;
  candidateName: string;
  roleId: string;
  roleTitle: string;
  department: string;
  academicYear: string;
  targetSkill: string;
  claimedScore: number;
  demonstratedScore: number;
  requiredScore: number;
  calibrationGap: number;
  calibrationStatus: 'OVERCONFIDENT' | 'CALIBRATED' | 'UNDERCONFIDENT';
  selfEfficacyIndex: string;
  confidenceInterval: string;
  evidenceUsed: EvidenceTelemetryItem[];
  weakSubskills: WeakSubskillItem[];
  explanation: string;
  meaning: string;
  nextActionRecommendation: string;
  timestamp: string;
}

export interface MissionStageUI {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
}

export interface MissionUI {
  id: string;
  targetSkill: string;
  title: string;
  priority: 'INTERVENTION' | 'STANDARD' | 'MAINTENANCE';
  targetRoleRationale: string;
  objective: string;
  practiceTask: string;
  estimatedDuration: string;
  stages: MissionStageUI[];
  successCriteria: string[];
  deltaTarget: string;
  benchmarkTarget: number;
  verifiedBaseline: number;
  simulationSandbox: {
    systemState: string;
    faultType: string;
    impedanceSpec: string;
    taskPrompt: string;
    starterFormulaOrCode: string;
    verificationRule: string;
  };
}

export interface ReadinessReportUI {
  studentProfile: {
    name: string;
    targetRole: string;
    department: string;
    academicYear: string;
    telemetryRunId: string;
  };
  overallBand: 'READY' | 'DEVELOPING' | 'EARLY_STAGE' | 'NOT_ASSESSED';
  overallScore: number | null;
  integrityScore: number;
  dimensions: ReadinessDimension[];
  skillsBreakdown: Array<{
    name: string;
    claimed: number;
    demonstrated: number;
    required: number;
    gap: number;
    status: 'SURPASSED' | 'CALIBRATED' | 'DEFICIT' | 'NOT_ASSESSED';
  }>;
  dataSufficiency: 'SUFFICIENT' | 'NOT_ENOUGH_DATA';
}

export interface ReassessmentResultUI {
  skill: string;
  beforeScore: number;
  afterScore: number;
  delta: number;
  learningVelocity: number | null;
  status: 'IMPROVED' | 'STAGNANT' | 'NOT_ENOUGH_DATA';
  dataSufficiency: 'SUFFICIENT' | 'NOT_ENOUGH_DATA';
  verifiedAt: string;
  verificationTelemetryRun: string;
  notes: string;
}
