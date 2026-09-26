import { describe, it, expect } from 'vitest';
import { ScoringEngine } from '@/lib/scoring';
import { JobRole } from '@/types/skill-graph';

describe('Deterministic Scoring Engine', () => {
  const sampleRole: JobRole = {
    id: 'role_test',
    title: 'Test Engineer Role',
    description: 'Test role description',
    requirements: [
      {
        skillId: 'skill_1',
        weight: 0.6,
        minimumLevel: 3,
        critical: true
      },
      {
        skillId: 'skill_2',
        weight: 0.4,
        minimumLevel: 2,
        critical: false
      }
    ]
  };

  it('calculates deterministic gaps with zero false precision', () => {
    const userLevels = {
      evidenceLevels: {
        skill_1: 1.5,
        skill_2: 2.0
      }
    };

    const gaps = ScoringEngine.calculateSkillGaps(sampleRole, userLevels);
    expect(gaps).toHaveLength(2);

    const gap1 = gaps.find((g) => g.skillId === 'skill_1')!;
    expect(gap1.gapMagnitude).toBe(1.5);
    expect(gap1.status).toBe('critical_gap');

    const gap2 = gaps.find((g) => g.skillId === 'skill_2')!;
    expect(gap2.gapMagnitude).toBe(0);
    expect(gap2.status).toBe('proficient');
  });

  it('marks criticalRequirementsMet as false when critical skill falls below minimum', () => {
    const userLevels = {
      evidenceLevels: {
        skill_1: 2.9, // Below 3 (critical)
        skill_2: 2.0  // Meets 2
      }
    };

    const report = ScoringEngine.evaluateRoleReadiness(sampleRole, userLevels);
    expect(report.criticalRequirementsMet).toBe(false);
    expect(report.overallReadinessBand).not.toBe('Target_Ready');
  });

  it('evaluates Target_Ready when critical requirements and high thresholds are met', () => {
    const userLevels = {
      evidenceLevels: {
        skill_1: 3.5, // Exceeds 3
        skill_2: 2.5  // Exceeds 2
      }
    };

    const report = ScoringEngine.evaluateRoleReadiness(sampleRole, userLevels);
    expect(report.criticalRequirementsMet).toBe(true);
    expect(report.overallReadinessBand).toBe('Target_Ready');
  });
});
