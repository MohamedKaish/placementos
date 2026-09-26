/**
 * PlacementOS - Targeted Preparation Mission Engine
 * "Every recommendation should be traceable to a detected gap."
 */

import { SkillGapAnalysis } from '@/types/scoring';
import { PreparationMission, MissionStep } from '@/types/mission';

export class MissionEngine {
  /**
   * Deterministically calculates priority score for a detected gap
   */
  public static calculatePriorityScore(gap: SkillGapAnalysis): number {
    const criticalMultiplier = gap.isCritical ? 1.5 : 1.0;
    const score = gap.importanceWeight * gap.gapMagnitude * criticalMultiplier * 10;
    return Number(score.toFixed(2));
  }

  /**
   * Generates a targeted preparation mission directly traceable to a detected gap
   */
  public static generateMissionFromGap(
    userId: string,
    targetRoleId: string,
    gap: SkillGapAnalysis
  ): PreparationMission {
    const priorityScore = this.calculatePriorityScore(gap);

    // Formulate steps to produce verifiable evidence
    const steps: MissionStep[] = [
      {
        id: `step_${gap.skillId}_1`,
        order: 1,
        instruction: `Review foundational concepts for ${gap.skillName} to satisfy required Level ${gap.requiredLevel}.`,
        expectedOutput: `Structured review notes and concept checklist.`,
        completed: false
      },
      {
        id: `step_${gap.skillId}_2`,
        order: 2,
        instruction: `Implement a targeted proof-of-concept project or simulation targeting ${gap.skillName}.`,
        expectedOutput: `GitHub repository link or CAD/simulation export artifact.`,
        completed: false
      },
      {
        id: `step_${gap.skillId}_3`,
        order: 3,
        instruction: `Pass the PlacementOS Level ${gap.requiredLevel} verification assessment for ${gap.skillName}.`,
        expectedOutput: `Verified assessment attempt score >= 75%.`,
        completed: false
      }
    ];

    return {
      id: `mission_${userId}_${gap.skillId}_${Date.now()}`,
      userId,
      targetRoleId,
      linkedSkillId: gap.skillId,
      linkedSkillName: gap.skillName,
      tracedGapMagnitude: gap.gapMagnitude,
      title: `Bridge ${gap.skillName} Gap (${gap.currentEvidenceLevel} → Level ${gap.requiredLevel})`,
      description: `Targeted mission to resolve a ${gap.status === 'critical_gap' ? 'CRITICAL' : 'standard'} gap of ${gap.gapMagnitude} levels for your target role.`,
      type: gap.gapMagnitude >= 2.0 ? 'project_build' : 'targeted_assessment',
      priorityScore,
      estimatedHours: Math.max(4, Math.round(gap.gapMagnitude * 6)),
      status: 'todo',
      steps,
      deliverableSubmissionPrompt: `Submit your verifiable repository URL, project report, or pass the technical assessment to demonstrate ${gap.skillName}.`,
      verificationMethod: gap.isCritical ? 'quiz' : 'repo_inspection',
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Sorts missions strictly by deterministic priority
   */
  public static prioritizeMissions(missions: PreparationMission[]): PreparationMission[] {
    return [...missions].sort((a, b) => b.priorityScore - a.priorityScore);
  }
}
