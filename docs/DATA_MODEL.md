# PlacementOS — Core Data Model & Firestore Architecture

> **Architectural Invariant**: JobRole MUST NOT belong directly to a Department. New engineering disciplines, skills, and roles are added through data configuration, requiring zero code rewrites.

---

## 1. Entity Relationship Overview

```
Department (e.g., CSE, EEE, ECE, MECH, CIVIL)
    │
    ▼
Domain (e.g., Power Systems, CAD Design, Software Systems)
    │
    ▼
Skill (e.g., Embedded C, Structural Analysis, DSA)
    │
    ├──► Subskill
    └──► Tool

JobRole (Independent Entity — e.g., Embedded Systems Engineer)
    │
    ▼ requires
RoleSkillRequirement (skillId + weight + minimumLevel + isCritical)

TransferMapping
    │ (sourceSkillId ──► targetSkillId via transferMultiplier)

User (Student)
    ├──► claimedSkills (claimedLevel, confidence)
    ├──► evidence (sourceType, confidence, demonstratedLevel, url)
    ├──► assessmentAttempts (scores, achievedLevel)
    └──► missions (linkedSkillId, priorityScore, steps, status)
```

---

## 2. Firestore Collection Specifications

### 2.1 `departments`
- `id`: string (e.g. `dept_cse`, `dept_eee`)
- `name`: string
- `code`: string (`CSE` | `EEE` | `ECE` | `MECH` | `CIVIL`)
- `description`: string

### 2.2 `domains`
- `id`: string (e.g. `domain_ece_embedded`)
- `departmentId`: string (Reference to `departments.id`)
- `name`: string
- `description`: string

### 2.3 `skills`
- `id`: string (e.g. `skill_embedded_c`)
- `domainId`: string (Reference to `domains.id`)
- `name`: string
- `description`: string
- `isFoundational`: boolean
- `subskills`: Array of `{ id, skillId, name, description }`
- `tools`: Array of `{ id, name, category }`

### 2.4 `jobRoles` *(Department-Agnostic)*
- `id`: string (e.g. `role_embedded`)
- `title`: string (e.g. `Embedded Systems Engineer`)
- `description`: string
- `marketDemandRating`: `high` | `medium` | `emerging`
- `targetDomains`: string[] (Advisory domain affinities)
- `requirements`: Array of:
  - `skillId`: string (Reference to `skills.id`)
  - `weight`: number (0.0 to 1.0)
  - `minimumLevel`: number (1 to 5)
  - `critical`: boolean (Must meet threshold for role qualification)

### 2.5 `transferMappings`
- `id`: string (e.g. `trans_c_to_dsa`)
- `sourceSkillId`: string
- `targetSkillId`: string
- `transferMultiplier`: number (e.g. 0.65)
- `rationale`: string

### 2.6 `users`
- `id`: string (matches Firebase Auth UID)
- `email`: string
- `fullName`: string
- `departmentId`: string (Reference to `departments.id`)
- `departmentCode`: string
- `graduationYear`: number
- `currentSemester`: number
- `targetRoleIds`: string[] (References to `jobRoles.id`)
- `claimedSkills`: Array of `{ skillId, claimedLevel, selfAssessedAt, confidenceSelfRating }`
- `activeMissionIds`: string[]
- `createdAt`: ISO Timestamp
- `updatedAt`: ISO Timestamp

### 2.7 `evidence`
- `id`: string
- `userId`: string (Reference to `users.id`)
- `skillId`: string (Reference to `skills.id`)
- `sourceType`: `technical_assessment` | `live_coding` | `faculty_endorsement` | `internship_experience` | `project_repo` | `coursework_certificate` | `resume_parsed`
- `title`: string
- `description`: string
- `url`: string (e.g., GitHub PR, live demo, verified certificate)
- `confidenceScore`: number (0.0 to 1.0)
- `demonstratedLevel`: number (1 to 5)
- `verifiedAt`: ISO Timestamp

### 2.8 `assessments` & `questions`
- `assessments`: `{ id, title, description, targetSkillIds, departmentCodeAgnostic, estimatedMinutes, totalQuestions, passingScore }`
- `questions`: `{ id, skillId, targetLevel, type, prompt, codeOrDiagramSnippet, options, maxScore }`
- `assessmentAttempts`: `{ id, userId, assessmentId, responses, totalScore, maxScore, percentageScore, skillLevelAchieved, status }`

### 2.9 `missions`
- `id`: string
- `userId`: string
- `targetRoleId`: string
- `linkedSkillId`: string (Directly traceable to detected gap)
- `tracedGapMagnitude`: number
- `title`: string
- `priorityScore`: number (Computed: `weight * gap * criticalMultiplier * 10`)
- `status`: `todo` | `in_progress` | `submitted` | `verified` | `skipped`
- `steps`: Array of `{ id, order, instruction, expectedOutput, completed }`
- `deliverableSubmissionPrompt`: string
- `verificationMethod`: `quiz` | `repo_inspection` | `peer_review` | `manual_evidence`

---

## 3. Extensibility Guarantee

To add a new department (e.g. Biotechnology, Chemical, Aerospace):
1. Insert a document into `departments`.
2. Insert associated domains into `domains`.
3. Insert skills into `skills`.
4. (Optional) Create independent `jobRoles` or add existing skills to target roles.
5. Zero lines of UI or scoring code need to be modified.
