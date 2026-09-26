# PlacementOS — Two-Team Collaborative Workflow

> **Core Mission**: Establish clear module boundaries and low-conflict integration protocols for two development teams working simultaneously in the same repository.

---

## 1. Team Responsibilities & Ownership Matrix

| Area / Module | Directory Path | Primary Owner | Secondary Reviewer |
| :--- | :--- | :--- | :--- |
| **Skill Graph & Taxonomy** | `/lib/skill-graph`, `/data/seed` | **Team A** | Team B |
| **Deterministic Scoring & Readiness** | `/lib/scoring` | **Team A** | Team B |
| **Evidence Engine & Calibration** | `/lib/evidence-engine` | **Team A** | Team B |
| **Assessment Evaluation Engine** | `/lib/assessment-engine` | **Team A** | Team B |
| **Mission Prioritization Engine** | `/lib/missions` | **Team A** | Team B |
| **AI LLM Abstraction (Gemini)** | `/lib/ai` | **Team A** | Team B |
| **Firebase / Firestore Schema** | `/lib/firebase` | **Team A** | Team B |
| **Shared Type Contracts** | `/types` | **Team A** (Consensus) | Team B |
| **Core Algorithm Tests** | `/tests` | **Team A** | Team B |
| **Design System & Tokens** | `/app/globals.css`, `/components/ui` | **Team B** | Team A |
| **Student Onboarding UI** | `/app/(onboarding)` | **Team B** | Team A |
| **Readiness Dashboard UI** | `/app/(dashboard)` | **Team B** | Team A |
| **Assessment Flow UI** | `/app/(assessment)` | **Team B** | Team A |
| **Preparation Missions UI** | `/app/(missions)` | **Team B** | Team A |
| **Student Dossier / Profile UI** | `/app/(profile)` | **Team B** | Team A |
| **Authentication Views** | `/app/(auth)` | **Team B** | Team A |
| **Shared Layout & Navigation** | `/components/shared` | **Team B** | Team A |

---

## 2. Low Merge-Conflict Rules

1. **Shared Types Stability**:
   - Files under `/types` represent the strict API contract.
   - Any modifications to `/types` require mutual agreement and a joint PR review before feature branches branch off.
2. **Strict File Separation**:
   - Team A works predominantly in `/lib`, `/data/seed`, and `/tests`.
   - Team B works predominantly in `/app` and `/components`.
   - Neither team should edit the other's designated core files without explicit peer review.
3. **No Direct Pushes to `main`**:
   - All commits must go through feature branches (`team-a/*` or `team-b/*`).
   - Every merge into `main` requires passing automated tests (`npm test`) and builds (`npm run build`).
4. **Data Isolation**:
   - Team B must use the exported functions in `/lib` to query data or evaluate scores.
   - Never implement ad-hoc scoring or duplicate calculations inside UI components.

---

## 3. Communication & Integration Protocol

- **Synchronous Touchpoint**: 10-minute daily sync before starting active coding sprints.
- **Contract-First Development**: If Team B needs a new data field, Team A updates the type in `/types` first, adds seed data in `/data/seed`, and provides mock outputs before UI wiring commences.
- **Verification Gates**:
  ```bash
  npm test          # Must pass 100% of unit tests
  npm run lint      # Must pass with zero ESLint errors
  npm run build     # Must compile cleanly via Next.js Turbopack
  ```
