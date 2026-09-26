import { describe, it, expect } from 'vitest';
import { MissionEngine } from '@/lib/missions';
import { SkillGapAnalysis } from '@/types/scoring';

describe('Mission Prioritization Engine', () => {
  it('prioritizes critical gaps over non-critical gaps of equal magnitude', () => {
    const criticalGap: SkillGapAnalysis = {
      skillId: 's1',
      skillName: 'Critical Skill',
      requiredLevel: 3,
      currentEvidenceLevel: 1,
      gapMagnitude: 2,
      importanceWeight: 0.5,
      isCritical: true,
      status: 'critical_gap'
    };

    const nonCriticalGap: SkillGapAnalysis = {
      skillId: 's2',
      skillName: 'Non-Critical Skill',
      requiredLevel: 3,
      currentEvidenceLevel: 1,
      gapMagnitude: 2,
      importanceWeight: 0.5,
      isCritical: false,
      status: 'minor_gap'
    };

    const scoreCritical = MissionEngine.calculatePriorityScore(criticalGap);
    const scoreNonCritical = MissionEngine.calculatePriorityScore(nonCriticalGap);

    expect(scoreCritical).toBeGreaterThan(scoreNonCritical);
  });

  it('generates a mission directly traced to a detected gap', () => {
    const gap: SkillGapAnalysis = {
      skillId: 'skill_dsa',
      skillName: 'Data Structures',
      requiredLevel: 3,
      currentEvidenceLevel: 1.5,
      gapMagnitude: 1.5,
      importanceWeight: 0.4,
      isCritical: true,
      status: 'critical_gap'
    };

    const mission = MissionEngine.generateMissionFromGap('user_123', 'role_swe', gap);

    expect(mission.linkedSkillId).toBe('skill_dsa');
    expect(mission.tracedGapMagnitude).toBe(1.5);
    expect(mission.steps.length).toBeGreaterThan(0);
    expect(mission.priorityScore).toBeGreaterThan(0);
  });
});
