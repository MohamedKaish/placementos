import { describe, it, expect } from 'vitest';
import { defaultSkillGraph } from '@/lib/skill-graph';

describe('Skill Graph Engine', () => {
  it('loads all 7 core engineering departments', () => {
    const depts = defaultSkillGraph.getAllDepartments();
    expect(depts.length).toBeGreaterThanOrEqual(7);

    const codes = depts.map((d) => d.code);
    expect(codes).toContain('CSE');
    expect(codes).toContain('EEE');
    expect(codes).toContain('ECE');
    expect(codes).toContain('MECH');
    expect(codes).toContain('CIVIL');
    expect(codes).toContain('CHEM');
    expect(codes).toContain('BIOTECH');
  });

  it('proves JobRoles do NOT belong directly to a department', () => {
    const roles = defaultSkillGraph.getAllJobRoles();
    expect(roles.length).toBeGreaterThanOrEqual(8);

    for (const role of roles) {
      // Critical invariant: role object does not contain departmentId
      expect((role as unknown as { departmentId?: string }).departmentId).toBeUndefined();
      expect(role.requirements.length).toBeGreaterThan(0);
    }
  });

  it('contains all 8 required demo roles', () => {
    const roleTitles = defaultSkillGraph.getAllJobRoles().map((r) => r.title);
    expect(roleTitles).toContain('Software Engineer');
    expect(roleTitles).toContain('Power Systems Engineer');
    expect(roleTitles).toContain('Embedded Systems Engineer');
    expect(roleTitles).toContain('Mechanical Design Engineer');
    expect(roleTitles).toContain('Automotive Engineer');
    expect(roleTitles).toContain('Structural Engineer');
    expect(roleTitles).toContain('Data Analyst');
    expect(roleTitles).toContain('Process Automation Engineer');
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
