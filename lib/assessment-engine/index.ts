/**
 * PlacementOS - Deterministic Adaptive Assessment Engine
 *
 * Adaptive Decision Rules:
 * 1. Correct + High Confidence            -> Increase Difficulty (+1)
 * 2. Wrong + High Confidence              -> Possible Misconception (-1)
 * 3. Wrong + Low/Medium Confidence        -> Reinforce Concept (-1)
 * 4. Correct + Very Slow (>1.5x expected) -> Fragile/Developing Knowledge (Maintain)
 * 5. Correct + Normal Pace                -> Increase Difficulty (+1)
 *
 * Gemini is NEVER used to calculate scores or adaptive state.
 */

import {
  AssessmentQuestion,
  AdaptiveAnswerSubmission,
  AdaptiveStepResult,
  AssessmentSession,
  AssessmentResult,
  AdaptiveStepDecision
} from '@/types/assessment';
import { EvidenceItem } from '@/types/evidence';
import { SkillProficiencyLevel } from '@/types/skill-graph';
import { questions as defaultQuestions } from '@/data/seed';

export class AssessmentEngine {
  private questions: Map<string, AssessmentQuestion>;

  constructor(customQuestions: AssessmentQuestion[] = defaultQuestions) {
    this.questions = new Map(customQuestions.map((q) => [q.id, q]));
  }

  public getQuestionById(id: string): AssessmentQuestion | undefined {
    return this.questions.get(id);
  }

  public getQuestionsForSkill(skillId: string): AssessmentQuestion[] {
    return Array.from(this.questions.values()).filter((q) => q.skillId === skillId);
  }

  /**
   * Initializes a new adaptive diagnostic assessment session for a skill
   */
  public startSession(
    userId: string,
    targetSkillId: string,
    targetRoleId?: string,
    initialDifficulty: number = 2
  ): AssessmentSession {
    const availableQuestions = this.getQuestionsForSkill(targetSkillId);
    const questionIds = availableQuestions.map((q) => q.id);

    return {
      sessionId: `session_${userId}_${targetSkillId}_${Date.now()}`,
      userId,
      targetRoleId,
      targetSkillId,
      currentDifficulty: Math.max(1, Math.min(5, initialDifficulty)),
      history: [],
      availableQuestionIds: questionIds,
      isCompleted: false,
      startedAt: new Date().toISOString()
    };
  }

  /**
   * Selects the next appropriate question based on current difficulty level
   */
  public getNextQuestion(session: AssessmentSession): AssessmentQuestion | undefined {
    const answeredIds = new Set(session.history.map((h) => h.questionId));
    const unasked = session.availableQuestionIds
      .filter((id) => !answeredIds.has(id))
      .map((id) => this.getQuestionById(id))
      .filter((q): q is AssessmentQuestion => q !== undefined);

    if (unasked.length === 0) return undefined;

    // Prefer exact difficulty match; fallback to closest available difficulty
    unasked.sort((a, b) => {
      const diffA = Math.abs(a.difficulty - session.currentDifficulty);
      const diffB = Math.abs(b.difficulty - session.currentDifficulty);
      return diffA - diffB;
    });

    return unasked[0];
  }

  /**
   * Deterministically evaluates an answer submission and decides adaptive next difficulty
   */
  public processAnswer(
    session: AssessmentSession,
    submission: AdaptiveAnswerSubmission
  ): { session: AssessmentSession; stepResult: AdaptiveStepResult } {
    const question = this.getQuestionById(submission.questionId);
    if (!question) {
      throw new Error(`Question ${submission.questionId} not found in catalog.`);
    }

    const isCorrect = submission.selectedOptionId === question.correctAnswer;
    const isProlongedTime = submission.timeSpentSeconds > question.expectedTimeSeconds * 1.5;
    const currentDiff = question.difficulty;

    let decision: AdaptiveStepDecision = 'maintain_level';
    let nextDifficulty = currentDiff;
    let rationale = '';

    if (isCorrect) {
      if (isProlongedTime) {
        // Correct + Very Slow -> Developing / Fragile Knowledge
        decision = 'fragile_knowledge';
        nextDifficulty = currentDiff; // Do not accelerate yet; solidify understanding
        rationale = `Answer correct, but response time (${submission.timeSpentSeconds}s vs expected ${question.expectedTimeSeconds}s) indicates fragile or developing knowledge. Maintaining Level ${nextDifficulty}.`;
      } else if (submission.confidenceRating === 'high' || submission.confidenceRating === 'medium') {
        // Correct + High/Medium Confidence -> Increase Difficulty
        decision = 'increase_difficulty';
        nextDifficulty = Math.min(5, currentDiff + 1);
        rationale = `Demonstrated solid mastery with ${submission.confidenceRating} confidence. Advancing to Level ${nextDifficulty}.`;
      } else {
        // Correct + Low Confidence -> Maintain
        decision = 'maintain_level';
        nextDifficulty = currentDiff;
        rationale = `Correct answer submitted with low self-confidence. Maintaining Level ${nextDifficulty} to confirm mastery.`;
      }
    } else {
      // Incorrect
      if (submission.confidenceRating === 'high') {
        // Wrong + Very High Confidence -> Possible Misconception
        decision = 'possible_misconception';
        nextDifficulty = Math.max(1, currentDiff - 1);
        rationale = `Incorrect answer with high confidence flagged as a conceptual misconception. Stepping back to Level ${nextDifficulty} to address root cause.`;
      } else {
        // Wrong + Low/Medium Confidence -> Reinforce Concept
        decision = 'reinforce_concept';
        nextDifficulty = Math.max(1, currentDiff - 1);
        rationale = `Incorrect response indicates knowledge gap. Stepping back to Level ${nextDifficulty} to reinforce prerequisites.`;
      }
    }

    const stepResult: AdaptiveStepResult = {
      questionId: question.id,
      isCorrect,
      selectedOptionId: submission.selectedOptionId,
      correctOptionId: question.correctAnswer,
      explanation: question.explanation,
      previousDifficulty: currentDiff,
      nextDifficulty,
      decision,
      decisionRationale: rationale,
      timeSpentSeconds: submission.timeSpentSeconds
    };

    const updatedSession: AssessmentSession = {
      ...session,
      currentDifficulty: nextDifficulty,
      history: [...session.history, stepResult]
    };

    return { session: updatedSession, stepResult };
  }

  /**
   * Finalizes the session and computes the demonstrated skill score
   */
  public finalizeSession(
    session: AssessmentSession,
    skillName: string
  ): { result: AssessmentResult; evidenceItem: EvidenceItem } {
    const history = session.history;
    const totalQuestions = history.length;

    if (totalQuestions === 0) {
      throw new Error('Cannot finalize an empty assessment session.');
    }

    const correctSteps = history.filter((h) => h.isCorrect);
    const correctCount = correctSteps.length;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    const misconceptionCount = history.filter((h) => h.decision === 'possible_misconception').length;
    const fragileKnowledgeCount = history.filter((h) => h.decision === 'fragile_knowledge').length;

    // Deterministic demonstrated score calculation based on peak difficulty and sustained correctness
    let maxCorrectDifficulty = 0;
    let weightedDifficultySum = 0;

    for (const step of history) {
      if (step.isCorrect) {
        maxCorrectDifficulty = Math.max(maxCorrectDifficulty, step.previousDifficulty);
        weightedDifficultySum += step.previousDifficulty;
      }
    }

    // Baseline calculation: (max passed difficulty * 0.6) + (average passed difficulty * 0.4)
    const avgPassedDifficulty = correctCount > 0 ? weightedDifficultySum / correctCount : 0;
    let rawDemonstratedScore = (maxCorrectDifficulty * 0.65) + (avgPassedDifficulty * 0.35);

    // Apply deterministic adjustments for misconceptions or fragile knowledge
    if (misconceptionCount > 0) {
      rawDemonstratedScore = Math.max(1.0, rawDemonstratedScore - (misconceptionCount * 0.3));
    }

    const demonstratedScore = Number(Math.min(5.0, Math.max(1.0, rawDemonstratedScore)).toFixed(2));

    let achievedLevel: SkillProficiencyLevel = 1;
    if (demonstratedScore >= 4.5) achievedLevel = 5;
    else if (demonstratedScore >= 3.5) achievedLevel = 4;
    else if (demonstratedScore >= 2.5) achievedLevel = 3;
    else if (demonstratedScore >= 1.8) achievedLevel = 2;

    const result: AssessmentResult = {
      sessionId: session.sessionId,
      userId: session.userId,
      skillId: session.targetSkillId,
      skillName,
      demonstratedScore,
      totalQuestionsAnswered: totalQuestions,
      correctCount,
      accuracyPercentage: accuracy,
      misconceptionCount,
      fragileKnowledgeCount,
      achievedProficiencyLevel: achievedLevel,
      confidence: 1.0, // Direct assessment yields 1.0 confidence
      completedAt: new Date().toISOString()
    };

    // Produces an objective EvidenceItem to integrate into EvidenceEngine
    const evidenceItem: EvidenceItem = {
      id: `ev_assess_${session.sessionId}`,
      userId: session.userId,
      skillId: session.targetSkillId,
      sourceType: 'assessment_performance',
      title: `Diagnostic Assessment: ${skillName}`,
      description: `Completed ${totalQuestions} adaptive questions with ${accuracy}% accuracy. Peak demonstrated difficulty: Level ${maxCorrectDifficulty}.`,
      confidenceScore: 1.0,
      demonstratedLevel: demonstratedScore,
      verifiedAt: result.completedAt,
      metadata: {
        sessionId: session.sessionId,
        misconceptions: misconceptionCount,
        fragilePoints: fragileKnowledgeCount
      }
    };

    return { result, evidenceItem };
  }
}

export const defaultAssessmentEngine = new AssessmentEngine();
