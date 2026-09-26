/**
 * PlacementOS - Seed Data Index
 */

import departmentsData from './departments.json';
import domainsData from './domains.json';
import skillsData from './skills.json';
import jobRolesData from './jobRoles.json';
import transferMappingsData from './transferMappings.json';
import questionsData from './questions.json';

import {
  Department,
  Domain,
  Skill,
  JobRole,
  TransferMapping
} from '@/types/skill-graph';
import { AssessmentQuestion } from '@/types/assessment';

export const departments: Department[] = departmentsData as Department[];
export const domains: Domain[] = domainsData as Domain[];
export const skills: Skill[] = skillsData as Skill[];
export const jobRoles: JobRole[] = jobRolesData as JobRole[];
export const transferMappings: TransferMapping[] = transferMappingsData as TransferMapping[];
export const questions: AssessmentQuestion[] = questionsData as AssessmentQuestion[];
