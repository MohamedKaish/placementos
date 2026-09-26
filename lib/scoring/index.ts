/**
 * PlacementOS - Deterministic Scoring & Skill Gap Engine
 * Differentiator: "Claimed skill != Demonstrated skill != Required skill"
 * Gemini is NEVER used to compute scores or prioritize gaps.
 */

import { JobRole } from '@/types/skill-graph';
import {
  RoleReadinessReport,
  SkillGapAnalysis,
  SkillCalibrationComparison
} from '@/types/scoring';
import { StudentClaimedSkill } from '@/types/evidence';
import { EvidenceEngine } from '@/lib/evidence-engine';

export interface UserSkillEvaluationState {
  // Map of skillId to demonstrated status & level
  demonstratedSkills: Record<
    string,
    {
      level: number | 'NOT_ASSESSED';
      confidence: number;
    }
  >;
  // Map of skillId to claimed levels
  claimedSkills?: Record<string, StudentClaimedSkill>;
}

export class ScoringEngine {
  /**
   * Deterministically calculates gaps for all requirements in a target role
   * Prioritization formula:
   * Priority = roleImportance * skillDeficit * evidenceConfidence * (isCritical ? 1.5 : 1.0) * 10
   */
  public static calculateSkillGaps(
    role: JobRole,
    evaluationState: UserSkillEvaluationState,
    skillNameLookup: (skillId: string) => string = (id) => id
  ): SkillGapAnalysis[] {
    return role.requirements.map((req) => {
      const skillName = skillNameLookup(req.skillId);
      const demonstratedEntry = evaluationState.demonstratedSkills[req.skillId];
      const demonstratedLevel = demonstratedEntry ? demonstratedEntry.level : 'NOT_ASSESSED';
      const confidence = demonstratedEntry ? demonstratedEntry.confidence : 0;

      let gapMagnitude = 0;
      let status: SkillGapAnalysis['status'] = 'proficient';
      let traceableReason = '';
      let priorityScore = 0;

      if (demonstratedLevel === 'NOT_ASSESSED') {
        gapMagnitude = req.minimumLevel;
        status = 'unassessed_gap';
        const criticalMultiplier = req.critical ? 1.5 : 1.0;
        priorityScore = Number((req.weight * gapMagnitude * 0.35 * criticalMultiplier * 10).toFixed(2));
        traceableReason = `Recommended because ${skillName} is a ${req.critical ? 'critical' : 'core'} requirement for ${role.title} and has not yet been demonstrated through verified evidence.`;
      } else {
        const rawGap = req.minimumLevel - demonstratedLevel;
        gapMagnitude = Number(Math.max(0, rawGap).toFixed(2));

        if (gapMagnitude > 0) {
          status = req.critical || gapMagnitude >= 1.5 ? 'critical_gap' : 'minor_gap';
          const criticalMultiplier = req.critical ? 1.5 : 1.0;
          // Prioritize by role importance * skill deficit * evidence confidence * critical multiplier
          const confidenceFactor = Math.max(0.4, confidence);
          priorityScore = Number((req.weight * gapMagnitude * confidenceFactor * criticalMultiplier * 10).toFixed(2));
          traceableReason = `Recommended because ${skillName} is your ${req.critical ? 'highest-priority critical demonstrated' : 'demonstrated'} gap for the selected ${role.title} role (Demonstrated: Level ${demonstratedLevel}, Required: Level ${req.minimumLevel}).`;
        } else {
          status = 'proficient';
          priorityScore = 0;
          traceableReason = `${skillName} meets or exceeds target requirement (Demonstrated: Level ${demonstratedLevel}, Required: Level ${req.minimumLevel}).`;
        }
      }

      return {
        skillId: req.skillId,
        skillName,
        requiredLevel: req.minimumLevel,
        demonstratedLevel,
        gapMagnitude,
        importanceWeight: req.weight,
        isCritical: req.critical,
        evidenceConfidence: confidence,
        priorityScore,
        status,
        traceableReason
      };
    });
  }

  /**
   * Generates a multi-dimensional role readiness report exposing Claimed vs Demonstrated vs Required
   */
  public static evaluateRoleReadiness(
    role: JobRole,
    evaluationState: UserSkillEvaluationState,
    skillNameLookup: (skillId: string) => string = (id) => id
  ): RoleReadinessReport {
    const gaps = this.calculateSkillGaps(role, evaluationState, skillNameLookup);

    let totalWeight = 0;
    let satisfiedWeight = 0;
    let criticalRequirementsMet = true;
    let evidenceCount = 0;

    for (const req of role.requirements) {
      const demonstratedEntry = evaluationState.demonstratedSkills[req.skillId];
      const demonstratedLevel = demonstratedEntry ? demonstratedEntry.level : 'NOT_ASSESSED';

      if (demonstratedLevel !== 'NOT_ASSESSED') {
        evidenceCount++;
        // Check if critical minimum requirement is met
        if (req.critical && demonstratedLevel < req.minimumLevel) {
          criticalRequirementsMet = false;
        }

        const fulfillment = Math.min(1.0, demonstratedLevel / req.minimumLevel);
        satisfiedWeight += fulfillment * req.weight;
      } else {
        if (req.critical) {
          criticalRequirementsMet = false;
        }
      }
      totalWeight += req.weight;
    }

    const coreSkillsReadiness = totalWeight > 0
      ? Math.round((satisfiedWeight / totalWeight) * 100)
      : 0;

    const evidenceCoverage = role.requirements.length > 0
      ? Math.round((evidenceCount / role.requirements.length) * 100)
      : 0;

    const foundationReadiness = Math.round(
      (coreSkillsReadiness * 0.7) + (evidenceCoverage * 0.3)
    );

    let overallReadinessBand: RoleReadinessReport['overallReadinessBand'] = 'Needs_Foundation';
    if (criticalRequirementsMet && coreSkillsReadiness >= 85 && evidenceCoverage >= 80) {
      overallReadinessBand = 'Target_Ready';
    } else if (coreSkillsReadiness >= 65 && evidenceCoverage >= 50) {
      overallReadinessBand = 'Advancing';
    } else if (coreSkillsReadiness >= 40) {
      overallReadinessBand = 'Developing';
    }

    // Expose explicit Claimed vs Demonstrated vs Required comparisons
    const calibrations: SkillCalibrationComparison[] = role.requirements.map((req) => {
      const skillName = skillNameLookup(req.skillId);
      const claimed = evaluationState.claimedSkills ? evaluationState.claimedSkills[req.skillId] : undefined;
      const demonstratedEntry = evaluationState.demonstratedSkills[req.skillId];
      const demonstratedLevel = demonstratedEntry ? demonstratedEntry.level : 'NOT_ASSESSED';

      return EvidenceEngine.evaluateCalibration(
        req.skillId,
        skillName,
        claimed,
        demonstratedLevel,
        req.minimumLevel
      );
    });

    // Top priority gaps: sorted strictly by priority score
    const topPriorityGaps = [...gaps]
      .filter((g) => g.gapMagnitude > 0)
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .map((g) => g.skillId);

    return {
      roleId: role.id,
      roleTitle: role.title,
      evaluatedAt: new Date().toISOString(),
      foundationReadiness,
      coreSkillsReadiness,
      evidenceCoverage,
      criticalRequirementsMet,
      overallReadinessBand,
      calibrations,
      skillGaps: gaps,
      topPriorityGapSkillIds: topPriorityGaps
    };
  }
}
