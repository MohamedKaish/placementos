import { describe, it, expect } from 'vitest';
import { defaultSkillGraph } from '@/lib/skill-graph';

describe('Skill Graph Engine', () => {
  it('loads all 5 core engineering departments', () => {
    const depts = defaultSkillGraph.getAllDepartments();
    expect(depts.length).toBeGreaterThanOrEqual(5);

    const codes = depts.map((d) => d.code);
    expect(codes).toContain('CSE');
    expect(codes).toContain('EEE');
    expect(codes).toContain('ECE');
    expect(codes).toContain('MECH');
    expect(codes).toContain('CIVIL');
  });

  it('proves JobRoles do NOT belong directly to a department', () => {
    const roles = defaultSkillGraph.getAllJobRoles();
    expect(roles.length).toBeGreaterThanOrEqual(6);

    for (const role of roles) {
      // Critical invariant: role object does not contain departmentId
      expect((role as unknown as { departmentId?: string }).departmentId).toBeUndefined();
      expect(role.requirements.length).toBeGreaterThan(0);
    }
  });

  it('calculates transferable skill credit across disciplines', () => {
    // Embedded C (ECE/EEE) -> DSA (Software/CSE)
    const transferCredit = defaultSkillGraph.getTransferCredit(
      'skill_embedded_c',
      'skill_dsa',
      4.0
    );
    expect(transferCredit).toBeGreaterThan(0);
    expect(transferCredit).toBeCloseTo(4.0 * 0.65, 2);
  });
});
