import { describe, it, expect } from 'vitest';
import { MissionEngine } from '@/lib/missions';
import { SkillGapAnalysis } from '@/types/scoring';

describe('Mission Prioritization Engine', () => {
  it('prioritizes critical gaps over non-critical gaps of equal magnitude', () => {
    const criticalGap: SkillGapAnalysis = {
      skillId: 'skill_fault_analysis',
      skillName: 'Fault Analysis',
      requiredLevel: 3,
      demonstratedLevel: 1.0,
      gapMagnitude: 2.0,
      importanceWeight: 0.45,
      isCritical: true,
      evidenceConfidence: 1.0,
      priorityScore: 13.5, // 0.45 * 2 * 1.0 * 1.5 * 10
      status: 'critical_gap',
      traceableReason: 'Critical gate deficit'
    };

    const nonCriticalGap: SkillGapAnalysis = {
      skillId: 'skill_power_analysis',
      skillName: 'Power Flow',
      requiredLevel: 3,
      demonstratedLevel: 1.0,
      gapMagnitude: 2.0,
      importanceWeight: 0.45,
      isCritical: false,
      evidenceConfidence: 1.0,
      priorityScore: 9.0, // 0.45 * 2 * 1.0 * 1.0 * 10
      status: 'minor_gap',
      traceableReason: 'Core deficit'
    };

    const missions = MissionEngine.generatePrioritizedMissions(
      'user_123',
      'Power Systems Engineer',
      [nonCriticalGap, criticalGap]
    );

    // Critical gap must be ranked #1
    expect(missions[0].targetSkillId).toBe('skill_fault_analysis');
    expect(missions[0].priorityScore).toBeGreaterThan(missions[1].priorityScore);
  });

  it('generates a mission directly traced to a detected gap with practice tasks and success criteria', () => {
    const gap: SkillGapAnalysis = {
      skillId: 'skill_fault_analysis',
      skillName: 'Fault Analysis',
      subskillName: 'Fortescue Symmetrical Components',
      requiredLevel: 3,
      demonstratedLevel: 1.5,
      gapMagnitude: 1.5,
      importanceWeight: 0.45,
      isCritical: true,
      evidenceConfidence: 1.0,
      priorityScore: 10.13,
      status: 'critical_gap',
      traceableReason: 'Recommended because Fault Analysis is your highest-priority critical gap for Power Systems Engineer.'
    };

    const mission = MissionEngine.generateMissionFromGap('user_123', 'Power Systems Engineer', gap);

    expect(mission.targetSkillId).toBe('skill_fault_analysis');
    expect(mission.reason).toContain('Fault Analysis is your highest-priority critical gap');
    expect(mission.steps.length).toBe(3);
    expect(mission.practice.title).toContain('Fault Analysis');
    expect(mission.successCriteria).toContain('Level 3');
  });
});
