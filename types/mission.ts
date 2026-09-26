/**
 * PlacementOS - Targeted Preparation Mission Types
 * "Every recommendation should be traceable to a detected gap."
 */

export type MissionType =
  | 'project_build'       // Build a tangible project to produce evidence
  | 'targeted_assessment' // Take a micro-assessment to demonstrate level
  | 'concept_mastery'     // Bridge theoretical/foundational gap
  | 'resume_evidence_fix' // Clarify/substantiate claims with proof
  | 'tool_proficiency';   // Hands-on mastery of required tool

export type MissionStatus = 'todo' | 'in_progress' | 'submitted' | 'verified' | 'skipped';

export interface MissionStep {
  id: string;
  order: number;
  instruction: string;
  expectedOutput: string;
  completed: boolean;
}

export interface PreparationMission {
  id: string;
  userId: string;
  targetRoleId: string;
  linkedSkillId: string;
  linkedSkillName: string;
  tracedGapMagnitude: number; // Exactly why this mission was assigned
  title: string;
  description: string;
  type: MissionType;
  priorityScore: number; // Deterministically computed priority (weight * gap)
  estimatedHours: number;
  status: MissionStatus;
  steps: MissionStep[];
  deliverableSubmissionPrompt?: string;
  verificationMethod: 'quiz' | 'repo_inspection' | 'peer_review' | 'manual_evidence';
  createdAt: string;
  completedAt?: string;
}
