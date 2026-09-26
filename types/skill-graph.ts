/**
 * PlacementOS - Core Skill Graph Types
 * Department-agnostic skill taxonomy and role definitions
 */

export interface Department {
  id: string;
  name: string;
  code: 'CSE' | 'EEE' | 'ECE' | 'MECH' | 'CIVIL' | string;
  description: string;
}

export interface Domain {
  id: string;
  departmentId: string; // Belongs to a department's standard curriculum/discipline
  name: string;
  description: string;
}

export type SkillProficiencyLevel = 1 | 2 | 3 | 4 | 5; // 1: Novice, 2: Beginner, 3: Intermediate, 4: Advanced, 5: Expert

export interface Tool {
  id: string;
  name: string;
  category: string;
}

export interface Subskill {
  id: string;
  skillId: string;
  name: string;
  description: string;
  tools?: Tool[];
}

export interface Skill {
  id: string;
  domainId: string;
  name: string;
  description: string;
  subskills: Subskill[];
  tools: Tool[];
  isFoundational?: boolean;
}

export interface RoleSkillRequirement {
  skillId: string;
  weight: number; // 0.0 to 1.0 (importance to role)
  minimumLevel: SkillProficiencyLevel;
  critical: boolean; // Must meet minimum level to be considered ready
}

export interface JobRole {
  id: string;
  title: string;
  description: string;
  // CRITICAL ARCHITECTURE RULE: JobRole MUST NOT belong directly to a Department.
  // Any student regardless of department can target this role.
  targetDomains?: string[]; // Recommended or typical domains (advisory only)
  requirements: RoleSkillRequirement[];
  marketDemandRating?: 'high' | 'medium' | 'emerging';
}

export interface TransferMapping {
  id: string;
  sourceSkillId: string;
  targetSkillId: string;
  transferMultiplier: number; // e.g., 0.7 (70% knowledge transfer credit)
  rationale: string;
}
