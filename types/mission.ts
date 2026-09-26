/**
 * PlacementOS - Targeted Preparation Mission Types
 * "Every recommendation should be traceable to a detected gap."
 */

export type MissionStatus = 'todo' | 'in_progress' | 'submitted' | 'verified' | 'skipped';

export interface MissionStep {
  id: string;
  order: number;
  instruction: string;
  expectedOutput: string;
  completed: boolean;
}

export interface MissionPracticeTask {
  title: string;
  problemStatement: string;
  inputDatasetOrCircuit?: string;
  expectedDeliverable: string;
}

export interface PreparationMission {
  id: string;
  userId: string;
  targetRole: string; // e.g. "Power Systems Engineer"
  targetSkill: string; // e.g. "Fault Analysis & Symmetrical Components"
  targetSkillId: string;
  targetSubskill?: string; // e.g. "Fortescue Symmetrical Components"
  reason: string; // Traceable reason linked to detected gap
  estimatedDuration: number; // in hours
  objective: string;
  practice: MissionPracticeTask;
  successCriteria: string;
  priorityScore: number; // Deterministically computed priority
  status: MissionStatus;
  steps: MissionStep[];
  deliverableSubmissionPrompt: string;
  verificationMethod: 'quiz' | 'repo_inspection' | 'simulation_export' | 'manual_evidence';
  createdAt: string;
  completedAt?: string;
}
