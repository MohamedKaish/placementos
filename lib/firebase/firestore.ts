/**
 * PlacementOS - Firestore Collections Schema & Type Constants
 * Team A / Team B shared collection name registry to eliminate typos and prevent merge collisions.
 */

export const COLLECTIONS = {
  USERS: 'users',
  DEPARTMENTS: 'departments',
  DOMAINS: 'domains',
  SKILLS: 'skills',
  SUBSKILLS: 'subskills',
  TOOLS: 'tools',
  JOB_ROLES: 'jobRoles',
  TRANSFER_MAPPINGS: 'transferMappings',
  ASSESSMENTS: 'assessments',
  QUESTIONS: 'questions',
  ASSESSMENT_ATTEMPTS: 'assessmentAttempts',
  EVIDENCE: 'evidence',
  MISSIONS: 'missions',
  PROGRESS: 'progress'
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
