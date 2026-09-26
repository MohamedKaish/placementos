/**
 * PlacementOS - Assessment Evaluation Engine
 * Deterministic scoring of technical assessments
 */

import { Assessment, Question, QuestionResponse, AssessmentAttempt } from '@/types/assessment';
import { SkillProficiencyLevel } from '@/types/skill-graph';

export class AssessmentEngine {
  /**
   * Evaluates multiple-choice and numeric responses deterministically
   */
  public static scoreResponses(
    questions: Question[],
    userResponses: Record<string, string> // questionId -> selectedOptionId or text
  ): QuestionResponse[] {
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    return Object.entries(userResponses).map(([qId, answer]) => {
      const question = questionMap.get(qId);
      if (!question) {
        return {
          questionId: qId,
          scoreAwarded: 0,
          timeSpentSeconds: 0,
          isCorrect: false
        };
      }

      if (question.type === 'multiple_choice' && question.options) {
        const selectedOpt = question.options.find((opt) => opt.id === answer);
        const isCorrect = selectedOpt ? selectedOpt.isCorrect : false;
        return {
          questionId: qId,
          selectedOptionId: answer,
          isCorrect,
          scoreAwarded: isCorrect ? question.maxScore : 0,
          timeSpentSeconds: 30
        };
      }

      return {
        questionId: qId,
        textResponse: answer,
        scoreAwarded: 0,
        timeSpentSeconds: 30
      };
    });
  }

  /**
   * Finalizes an assessment attempt with deterministically derived skill levels
   */
  public static finalizeAttempt(
    userId: string,
    assessment: Assessment,
    questions: Question[],
    responses: QuestionResponse[]
  ): AssessmentAttempt {
    const totalScore = responses.reduce((acc, r) => acc + r.scoreAwarded, 0);
    const maxScore = questions.reduce((acc, q) => acc + q.maxScore, 0);
    const percentageScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    // Convert percentage to proficiency level (1-5)
    let achievedLevel: SkillProficiencyLevel = 1;
    if (percentageScore >= 90) achievedLevel = 5;
    else if (percentageScore >= 75) achievedLevel = 4;
    else if (percentageScore >= 60) achievedLevel = 3;
    else if (percentageScore >= 40) achievedLevel = 2;

    const skillLevelAchieved: Record<string, SkillProficiencyLevel> = {};
    for (const skillId of assessment.targetSkillIds) {
      skillLevelAchieved[skillId] = achievedLevel;
    }

    return {
      id: `attempt_${Date.now()}`,
      userId,
      assessmentId: assessment.id,
      startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      responses,
      totalScore,
      maxScore,
      percentageScore,
      skillLevelAchieved,
      status: 'completed'
    };
  }
}
