/**
 * PlacementOS - Learning Velocity & Reassessment Types
 * Tracks demonstrated performance progression over time
 */

export type LearningTrend =
  | 'accelerating'
  | 'steady'
  | 'plateauing'
  | 'declining'
  | 'NOT_ENOUGH_DATA';

export interface ScoreHistoryPoint {
  attemptId: string;
  timestamp: string;
  demonstratedScore: number;
}

export interface LearningVelocityResult {
  skillId: string;
  historyPoints: ScoreHistoryPoint[];
  totalAssessments: number;
  baselineScore: number | 'NOT_ENOUGH_DATA';
  latestScore: number | 'NOT_ENOUGH_DATA';
  totalImprovement: number | 'NOT_ENOUGH_DATA'; // latestScore - baselineScore
  learningVelocity: number | 'NOT_ENOUGH_DATA'; // Average delta per session
  trend: LearningTrend;
  analysis: string;
}

export interface ReassessmentResult {
  skillId: string;
  skillName: string;
  roleId: string;
  requiredLevel: number;
  previousDemonstratedLevel: number;
  currentDemonstratedLevel: number;
  delta: number; // current - previous
  previousGap: number;
  remainingGap: number;
  isGapClosed: boolean;
  learningVelocity: number | 'NOT_ENOUGH_DATA';
  trend: LearningTrend;
  status: 'significantly_improved' | 'improved' | 'unchanged' | 'regressed';
  feedback: string;
}
