import { describe, it, expect } from 'vitest';
import { defaultSkillGraph } from '@/lib/skill-graph';
import { ScoringEngine } from '@/lib/scoring';
import { EvidenceEngine } from '@/lib/evidence-engine';
import { MissionEngine } from '@/lib/missions';

describe('PlacementOS Core Engine Integration', () => {
  it('loads real skill graph departments and roles', () => {
    const departments = defaultSkillGraph.getAllDepartments();
    expect(departments.length).toBeGreaterThanOrEqual(5);

    const eee = defaultSkillGraph.getDepartmentByCode('EEE');
    expect(eee).toBeDefined();
    expect(eee?.name).toContain('Electrical');

    const roles = defaultSkillGraph.getAllJobRoles();
    expect(roles.length).toBeGreaterThanOrEqual(4);
  });

  it('calculates deterministic gaps with EvidenceEngine and ScoringEngine', () => {
    const role = defaultSkillGraph.getAllJobRoles()[0];
    const userLevels = {
      evidenceLevels: {
        [role.requirements[0].skillId]: 1.5,
      },
    };

    const gaps = ScoringEngine.calculateSkillGaps(role, userLevels);
    expect(gaps.length).toBe(role.requirements.length);
  });

  it('computes calibration gap correctly for overconfident claims', () => {
    const claimed = {
      skillId: 'ps_fault_analysis',
      claimedLevel: 4.5,
      source: 'resume_parsed' as const,
      verified: false,
    };
    const demonstrated = 2.5;
    const result = EvidenceEngine.computeCalibrationGap(claimed, demonstrated, 'Fault Analysis');
    expect(result.classification).toBe('overconfident');
    expect(result.gap).toBe(2.0);
  });
});
