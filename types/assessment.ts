/**
 * PlacementOS - Assessment Engine Types
 * Department-agnostic structured and adaptive assessments
 */

import { SkillProficiencyLevel } from './skill-graph';

export interface AssessmentQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface AssessmentQuestion {
  id: string;
  domainId: string;
  skillId: string;
  subskillId: string;
  difficulty: number; // 1 (Novice) to 5 (Expert)
  question: string;
  options: AssessmentQuestionOption[];
  correctAnswer: string;
  expectedTimeSeconds: number;
  explanation: string;
}

export type StudentQuestionConfidence = 'high' | 'medium' | 'low';

export interface AdaptiveAnswerSubmission {
  sessionId: string;
  questionId: string;
  selectedOptionId: string;
  confidenceRating: StudentQuestionConfidence;
  timeSpentSeconds: number;
}

export type AdaptiveStepDecision =
  | 'increase_difficulty'   // Correct + high confidence -> increase difficulty
  | 'reinforce_concept'     // Wrong + low confidence -> reinforce concept
  | 'possible_misconception'// Wrong + very high confidence -> possible misconception
  | 'fragile_knowledge'     // Correct + very slow -> developing/fragile knowledge
  | 'maintain_level';       // Standard progression

export interface AdaptiveStepResult {
  questionId: string;
  isCorrect: boolean;
  selectedOptionId: string;
  correctOptionId: string;
  explanation: string;
  previousDifficulty: number;
  nextDifficulty: number;
  decision: AdaptiveStepDecision;
  decisionRationale: string;
  timeSpentSeconds: number;
}

export interface AssessmentSession {
  sessionId: string;
  userId: string;
  targetRoleId?: string;
  targetSkillId: string;
  currentDifficulty: number; // 1 to 5
  history: AdaptiveStepResult[];
  availableQuestionIds: string[];
  isCompleted: boolean;
  startedAt: string;
  completedAt?: string;
}

export interface AssessmentResult {
  sessionId: string;
  userId: string;
  skillId: string;
  skillName: string;
  demonstratedScore: number; // Continuous demonstrated proficiency (0.0 to 5.0)
  totalQuestionsAnswered: number;
  correctCount: number;
  accuracyPercentage: number;
  misconceptionCount: number;
  fragileKnowledgeCount: number;
  achievedProficiencyLevel: SkillProficiencyLevel;
  confidence: number; // 0.0 to 1.0 (assessment performance confers high confidence)
  completedAt: string;
}
