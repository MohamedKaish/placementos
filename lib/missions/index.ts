/**
 * PlacementOS - Targeted Preparation Mission Engine
 * "Every recommendation should be traceable to a detected gap."
 *
 * Inputs:
 * - target role
 * - skill gaps (with priority scores and traceable reasons)
 * - available weekly hours
 *
 * The priority and ordering are 100% deterministic.
 */

import { SkillGapAnalysis } from '@/types/scoring';
import { PreparationMission, MissionStep, MissionPracticeTask } from '@/types/mission';

export class MissionEngine {
  /**
   * Generates a concrete mission linked directly to a detected gap
   */
  public static generateMissionFromGap(
    userId: string,
    targetRoleTitle: string,
    gap: SkillGapAnalysis,
    availableHours: number = 10
  ): PreparationMission {
    const isCritical = gap.isCritical;
    const duration = Math.min(availableHours * 2, Math.max(3, Math.round(gap.gapMagnitude * 5)));

    const practiceTask: MissionPracticeTask = {
      title: `${gap.skillName} Proof-of-Concept Implementation`,
      problemStatement: `Develop a concrete, verifiable engineering artifact demonstrating Level ${gap.requiredLevel} capability in ${gap.skillName}. Resolve the detected deficit of ${gap.gapMagnitude} proficiency levels.`,
      inputDatasetOrCircuit: isCritical ? 'Industrial Benchmark Dataset / Spec Sheet' : undefined,
      expectedDeliverable: isCritical
        ? 'Verified Technical Assessment Attempt Score >= 75% or GitHub Repo Artifact with comprehensive test bench.'
        : 'GitHub Repository link or verified simulation export artifact.'
    };

    const steps: MissionStep[] = [
      {
        id: `step_${gap.skillId}_1`,
        order: 1,
        instruction: `Study foundational core principles of ${gap.skillName} to satisfy target Level ${gap.requiredLevel} requirements.`,
        expectedOutput: `Structured review notes, key formulas, and architecture/circuit diagrams.`,
        completed: false
      },
      {
        id: `step_${gap.skillId}_2`,
        order: 2,
        instruction: `Execute hands-on laboratory practice / codebase implementation targeting ${gap.subskillName || gap.skillName}.`,
        expectedOutput: `Working simulation export (ETAP/MATLAB/Simulink) or clean Git repository.`,
        completed: false
      },
      {
        id: `step_${gap.skillId}_3`,
        order: 3,
        instruction: `Complete the PlacementOS Diagnostic Reassessment for ${gap.skillName} to record verifiable demonstrated improvement.`,
        expectedOutput: `Demonstrated assessment score >= Level ${gap.requiredLevel}.`,
        completed: false
      }
    ];

    const successCriteria = `Demonstrated proficiency in ${gap.skillName} reaches or exceeds Level ${gap.requiredLevel}, closing the current gap of ${gap.gapMagnitude} levels.`;

    return {
      id: `mission_${userId}_${gap.skillId}_${Date.now()}`,
      userId,
      targetRole: targetRoleTitle,
      targetSkill: gap.skillName,
      targetSkillId: gap.skillId,
      targetSubskill: gap.subskillName,
      reason: gap.traceableReason,
      estimatedDuration: duration,
      objective: `Bridge the ${gap.gapMagnitude}-level deficit in ${gap.skillName} for ${targetRoleTitle}.`,
      practice: practiceTask,
      successCriteria,
      priorityScore: gap.priorityScore,
      status: 'todo',
      steps,
      deliverableSubmissionPrompt: `Submit your verifiable project URL, simulation report, or pass the reassessment to demonstrate ${gap.skillName}.`,
      verificationMethod: isCritical ? 'quiz' : 'repo_inspection',
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Generates prioritized missions for all detected skill gaps
   */
  public static generatePrioritizedMissions(
    userId: string,
    targetRoleTitle: string,
    skillGaps: SkillGapAnalysis[],
    availableHours: number = 10
  ): PreparationMission[] {
    const activeGaps = skillGaps.filter((g) => g.gapMagnitude > 0);

    // Sort strictly by deterministic priority score
    const sortedGaps = [...activeGaps].sort((a, b) => b.priorityScore - a.priorityScore);

    return sortedGaps.map((gap) =>
      this.generateMissionFromGap(userId, targetRoleTitle, gap, availableHours)
    );
  }
}
