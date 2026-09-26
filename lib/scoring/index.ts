/**
 * PlacementOS - Deterministic Scoring & Readiness Engine
 * CRITICAL RULE: Gemini must NOT calculate the final readiness score.
 * Deterministic formulas evaluate requirements, gaps, and readiness bands.
 */

import { JobRole } from '@/types/skill-graph';
import {
  RoleReadinessReport,
  SkillGapAnalysis,
  CalibrationGapAnalysis
} from '@/types/scoring';
import { StudentClaimedSkill } from '@/types/evidence';
import { EvidenceEngine } from '@/lib/evidence-engine';

export interface UserSkillLevels {
  // Map of skillId to evidence-backed demonstrated level (0.0 to 5.0)
  evidenceLevels: Record<string, number>;
  // Map of skillId to claimed levels
  claimedLevels?: Record<string, StudentClaimedSkill>;
}

export class ScoringEngine {
  /**
   * Deterministically calculates gaps for all requirements in a target role
   */
  public static calculateSkillGaps(
    role: JobRole,
    userLevels: UserSkillLevels,
    skillNameLookup: (skillId: string) => string = (id) => id
  ): SkillGapAnalysis[] {
    return role.requirements.map((req) => {
      const currentLevel = userLevels.evidenceLevels[req.skillId] ?? 0;
      const rawGap = req.minimumLevel - currentLevel;
      const gapMagnitude = Number(Math.max(0, rawGap).toFixed(2));

      let status: SkillGapAnalysis['status'] = 'proficient';
      if (gapMagnitude > 0) {
        status = req.critical || gapMagnitude >= 1.5 ? 'critical_gap' : 'minor_gap';
      }

      return {
        skillId: req.skillId,
        skillName: skillNameLookup(req.skillId),
        requiredLevel: req.minimumLevel,
        currentEvidenceLevel: currentLevel,
        gapMagnitude,
        importanceWeight: req.weight,
        isCritical: req.critical,
        status
      };
    });
  }

  /**
   * Generates a multi-dimensional role readiness report without false precision
   */
  public static evaluateRoleReadiness(
    role: JobRole,
    userLevels: UserSkillLevels,
    skillNameLookup: (skillId: string) => string = (id) => id
  ): RoleReadinessReport {
    const gaps = this.calculateSkillGaps(role, userLevels, skillNameLookup);

    let totalWeight = 0;
    let satisfiedWeight = 0;
    let criticalRequirementsMet = true;
    let evidenceCount = 0;

    for (const req of role.requirements) {
      const currentLevel = userLevels.evidenceLevels[req.skillId] ?? 0;
      if (currentLevel > 0) {
        evidenceCount++;
      }

      // Check if critical minimum requirement is met
      if (req.critical && currentLevel < req.minimumLevel) {
        criticalRequirementsMet = false;
      }

      // Continuous fulfillment ratio capped at 1.0
      const fulfillment = Math.min(1.0, currentLevel / req.minimumLevel);
      satisfiedWeight += fulfillment * req.weight;
      totalWeight += req.weight;
    }

    const coreSkillsReadiness = totalWeight > 0
      ? Math.round((satisfiedWeight / totalWeight) * 100)
      : 0;

    const evidenceCoverage = role.requirements.length > 0
      ? Math.round((evidenceCount / role.requirements.length) * 100)
      : 0;

    // Foundational check (skills with weight <= 0.25 or marked critical min levels)
    const foundationReadiness = Math.round(
      (coreSkillsReadiness * 0.7) + (evidenceCoverage * 0.3)
    );

    // Determine overall qualitative band based on multidimensional metrics
    let overallReadinessBand: RoleReadinessReport['overallReadinessBand'] = 'Needs_Foundation';
    if (criticalRequirementsMet && coreSkillsReadiness >= 85 && evidenceCoverage >= 80) {
      overallReadinessBand = 'Target_Ready';
    } else if (coreSkillsReadiness >= 65 && evidenceCoverage >= 50) {
      overallReadinessBand = 'Advancing';
    } else if (coreSkillsReadiness >= 40) {
      overallReadinessBand = 'Developing';
    }

    // Calibration gaps if claimed levels exist
    const calibrationGaps: CalibrationGapAnalysis[] = [];
    if (userLevels.claimedLevels) {
      for (const [skillId, claimed] of Object.entries(userLevels.claimedLevels)) {
        const evidence = userLevels.evidenceLevels[skillId] ?? 0;
        const skillName = skillNameLookup(skillId);
        calibrationGaps.push(
          EvidenceEngine.computeCalibrationGap(claimed, evidence, skillName)
        );
      }
    }

    // Top priority gaps: sorted by gapMagnitude * importanceWeight
    const topPriorityGaps = [...gaps]
      .filter((g) => g.gapMagnitude > 0)
      .sort((a, b) => (b.gapMagnitude * b.importanceWeight) - (a.gapMagnitude * a.importanceWeight))
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
      skillGaps: gaps,
      calibrationGaps,
      topPriorityGapSkillIds: topPriorityGaps
    };
  }
}
