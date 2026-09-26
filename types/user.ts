/**
 * PlacementOS - User Profile Types
 * Department-agnostic student representation
 */

import { StudentClaimedSkill } from './evidence';

export interface UserProfile {
  id: string; // matches Firebase Auth UID
  email: string;
  fullName: string;
  departmentId: string; // e.g., 'dept_cse', 'dept_eee', 'dept_mech'
  departmentCode: string; // 'CSE' | 'EEE' | 'ECE' | 'MECH' | 'CIVIL'
  graduationYear: number;
  currentSemester: number; // 1 through 8
  collegeName?: string;
  targetRoleIds: string[]; // Independent Job Roles student wants to prepare for
  claimedSkills: StudentClaimedSkill[];
  activeMissionIds: string[];
  createdAt: string;
  updatedAt: string;
  onboardingCompleted: boolean;
}
