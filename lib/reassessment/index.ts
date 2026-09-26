/**
 * PlacementOS - Learning Velocity & Reassessment Engine
 * Deterministically tracks demonstrated improvement over time.
 * RULE: Do not fake historical results. If insufficient data, returns 'NOT_ENOUGH_DATA'.
 */

import {
  ScoreHistoryPoint,
  LearningVelocityResult,
  ReassessmentResult,
  LearningTrend
} from '@/types/reassessment';

export class ReassessmentEngine {
  /**
   * Calculates learning velocity across sequential demonstrated assessment points
   */
  public static calculateLearningVelocity(
    skillId: string,
    history: ScoreHistoryPoint[]
  ): LearningVelocityResult {
    if (!history || history.length < 2) {
      const baseline = history?.[0]?.demonstratedScore ?? 'NOT_ENOUGH_DATA';
      return {
        skillId,
        historyPoints: history || [],
        totalAssessments: history?.length || 0,
        baselineScore: baseline,
        latestScore: baseline,
        totalImprovement: 'NOT_ENOUGH_DATA',
        learningVelocity: 'NOT_ENOUGH_DATA',
        trend: 'NOT_ENOUGH_DATA',
        analysis: 'At least two distinct assessment points are required to compute learning velocity and trend analysis.'
      };
    }

    // Sort chronologically
    const sorted = [...history].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const baseline = sorted[0].demonstratedScore;
    const latest = sorted[sorted.length - 1].demonstratedScore;
    const totalImprovement = Number((latest - baseline).toFixed(2));

    // Calculate incremental deltas between successive attempts
    const deltas: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      deltas.push(sorted[i].demonstratedScore - sorted[i - 1].demonstratedScore);
    }

    const averageDelta = deltas.reduce((sum, d) => sum + d, 0) / deltas.length;
    const learningVelocity = Number(averageDelta.toFixed(2));

    // Determine qualitative trend
    let trend: LearningTrend = 'steady';
    if (deltas.length >= 2) {
      const lastDelta = deltas[deltas.length - 1];
      const previousDelta = deltas[deltas.length - 2];

      if (lastDelta > previousDelta + 0.2 && lastDelta > 0) {
        trend = 'accelerating';
      } else if (lastDelta < previousDelta - 0.2 && lastDelta >= 0) {
        trend = 'plateauing';
      } else if (lastDelta < 0) {
        trend = 'declining';
      }
    } else {
      trend = totalImprovement > 0 ? 'steady' : 'declining';
    }

    const analysis = totalImprovement > 0
      ? `Demonstrated skill increased from Level ${baseline} to Level ${latest} (+${totalImprovement} points) with an average velocity of +${learningVelocity} pts/session (${trend} trend).`
      : `Demonstrated skill is flat or declining (${totalImprovement} points delta). Review prerequisite missions.`;

    return {
      skillId,
      historyPoints: sorted,
      totalAssessments: sorted.length,
      baselineScore: baseline,
      latestScore: latest,
      totalImprovement,
      learningVelocity,
      trend,
      analysis
    };
  }

  /**
   * Compares baseline assessment vs post-mission reassessment
   */
  public static compareReassessment(
    skillId: string,
    skillName: string,
    roleId: string,
    requiredLevel: number,
    previousDemonstratedLevel: number,
    currentDemonstratedLevel: number,
    history: ScoreHistoryPoint[] = []
  ): ReassessmentResult {
    const delta = Number((currentDemonstratedLevel - previousDemonstratedLevel).toFixed(2));
    const previousGap = Number(Math.max(0, requiredLevel - previousDemonstratedLevel).toFixed(2));
    const remainingGap = Number(Math.max(0, requiredLevel - currentDemonstratedLevel).toFixed(2));
    const isGapClosed = remainingGap <= 0;

    const velocityResult = this.calculateLearningVelocity(skillId, history);

    let status: ReassessmentResult['status'] = 'unchanged';
    if (delta >= 1.0) status = 'significantly_improved';
    else if (delta > 0) status = 'improved';
    else if (delta < 0) status = 'regressed';

    let feedback = '';
    if (isGapClosed) {
      feedback = `Milestone achieved! Demonstrated proficiency in ${skillName} increased by +${delta} to Level ${currentDemonstratedLevel}, completely satisfying the Level ${requiredLevel} requirement for this role.`;
    } else if (delta > 0) {
      feedback = `Progress detected: Demonstrated level improved by +${delta} points (from ${previousDemonstratedLevel} to ${currentDemonstratedLevel}). Remaining gap is ${remainingGap} levels to satisfy Level ${requiredLevel}.`;
    } else {
      feedback = `Demonstrated level did not increase. Focus on hands-on project artifacts and review core error rationales.`;
    }

    return {
      skillId,
      skillName,
      roleId,
      requiredLevel,
      previousDemonstratedLevel,
      currentDemonstratedLevel,
      delta,
      previousGap,
      remainingGap,
      isGapClosed,
      learningVelocity: velocityResult.learningVelocity,
      trend: velocityResult.trend,
      status,
      feedback
    };
  }
}
