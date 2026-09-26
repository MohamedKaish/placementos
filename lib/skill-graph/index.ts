/**
 * PlacementOS - Skill Graph Query Engine
 * Department-agnostic query helpers and transfer calculations
 */

import { departments, domains, skills, jobRoles, transferMappings } from '@/data/seed';
import {
  Department,
  Domain,
  Skill,
  JobRole,
  TransferMapping
} from '@/types/skill-graph';

export class SkillGraph {
  private depts: Map<string, Department>;
  private doms: Map<string, Domain>;
  private sks: Map<string, Skill>;
  private roles: Map<string, JobRole>;
  private transfers: TransferMapping[];

  constructor(
    customDepts = departments,
    customDoms = domains,
    customSkills = skills,
    customRoles = jobRoles,
    customTransfers = transferMappings
  ) {
    this.depts = new Map(customDepts.map((d) => [d.id, d]));
    this.doms = new Map(customDoms.map((d) => [d.id, d]));
    this.sks = new Map(customSkills.map((s) => [s.id, s]));
    this.roles = new Map(customRoles.map((r) => [r.id, r]));
    this.transfers = customTransfers;
  }

  public getAllDepartments(): Department[] {
    return Array.from(this.depts.values());
  }

  public getDepartmentByCode(code: string): Department | undefined {
    return Array.from(this.depts.values()).find(
      (d) => d.code.toUpperCase() === code.toUpperCase()
    );
  }

  public getDomainsByDepartment(deptId: string): Domain[] {
    return Array.from(this.doms.values()).filter((d) => d.departmentId === deptId);
  }

  public getSkillsByDomain(domainId: string): Skill[] {
    return Array.from(this.sks.values()).filter((s) => s.domainId === domainId);
  }

  public getSkillById(skillId: string): Skill | undefined {
    return this.sks.get(skillId);
  }

  public getAllJobRoles(): JobRole[] {
    return Array.from(this.roles.values());
  }

  public getJobRoleById(roleId: string): JobRole | undefined {
    return this.roles.get(roleId);
  }

  /**
   * Transferable skill calculation:
   * If a student demonstrates competence in a source skill,
   * calculates fractional transfer credit towards target skill.
   */
  public getTransferCredit(
    sourceSkillId: string,
    targetSkillId: string,
    sourceDemonstratedLevel: number
  ): number {
    const mapping = this.transfers.find(
      (t) => t.sourceSkillId === sourceSkillId && t.targetSkillId === targetSkillId
    );
    if (!mapping) return 0;
    return sourceDemonstratedLevel * mapping.transferMultiplier;
  }
}

export const defaultSkillGraph = new SkillGraph();
