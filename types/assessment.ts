/**
 * PlacementOS - Assessment Engine Types
 * Department-agnostic structured assessments
 */

import { SkillProficiencyLevel } from './skill-graph';

export type QuestionType =
  | 'multiple_choice'
  | 'scenario_analysis'
  | 'code_snippet'
  | 'system_diagram_reasoning'
  | 'numerical_problem';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  skillId: string;
  subskillId?: string;
  targetLevel: SkillProficiencyLevel;
  type: QuestionType;
  prompt: string;
  codeOrDiagramSnippet?: string;
  options?: QuestionOption[]; // For multiple choice
  rubricCriteria?: string[]; // For open scenario grading
  maxScore: number;
}

export interface QuestionResponse {
  questionId: string;
  selectedOptionId?: string;
  textResponse?: string;
  isCorrect?: boolean;
  scoreAwarded: number;
  timeSpentSeconds: number;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  targetSkillIds: string[];
  departmentCodeAgnostic: boolean; // Applicable across engineering disciplines
  estimatedMinutes: number;
  totalQuestions: number;
  passingScore: number;
}

export interface AssessmentAttempt {
  id: string;
  userId: string;
  assessmentId: string;
  startedAt: string;
  completedAt?: string;
  responses: QuestionResponse[];
  totalScore: number;
  maxScore: number;
  percentageScore: number;
  skillLevelAchieved: Record<string, SkillProficiencyLevel>;
  status: 'in_progress' | 'completed' | 'abandoned';
}
