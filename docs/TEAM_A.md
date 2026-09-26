# Team A — Foundation + Intelligence Specification

> **Focus**: Data taxonomy, deterministic scoring logic, evidence weighting, AI language abstractions, and verification test suites.

---

## 1. Scope of Responsibility

Team A owns the core engine that powers PlacementOS:
1. **Skill Graph & Taxonomy**:
   - Department-agnostic hierarchy: `Department` → `Domain` → `Skill` → `Subskill` → `Tool`.
   - Independent `JobRole` definitions with weighted skills and minimum level thresholds.
   - `TransferMapping` definitions and credit calculations across disciplines.
2. **Evidence Engine**:
   - Multi-source weighting matrix (Technical assessment = 1.0, Live coding = 0.95, Faculty endorsement = 0.85, Internship = 0.80, Project repo = 0.70, Certificate = 0.50, Resume = 0.30).
   - Calibration gap calculation (`claimedLevel - evidenceBackedLevel`).
3. **Deterministic Scoring Engine**:
   - Multi-dimensional role readiness calculation (Foundation Readiness, Core Skills Readiness, Evidence Coverage, Critical Gates).
   - Prevention of false precision or single fake percentages.
4. **Assessment Engine**:
   - Test evaluation against objective rubrics and answer keys.
5. **Mission Prioritization Engine**:
   - Prioritizing missions using: `importanceWeight * gapMagnitude * criticalMultiplier`.
6. **AI Service Abstraction (Gemini API)**:
   - Server-side parsing of resumes, JD analysis, and linguistic explanations.
   - Strict architectural isolation: **Gemini NEVER computes readiness scores**.
7. **Firebase & Firestore Data Layer**:
   - Typed schema definitions and collection registries in `/lib/firebase`.
8. **Automated Unit Testing**:
   - 100% test coverage of scoring formulas and graph queries in `/tests`.

---

## 2. Directory Boundaries

| Allowed to Edit Freely | Requires Coordination with Team B | Strictly Forbidden |
| :--- | :--- | :--- |
| `/lib/skill-graph/**` | `/types/**` (API contracts) | `/app/**` (UI views) |
| `/lib/evidence-engine/**` | `/lib/firebase/**` (DB schema) | `/components/ui/**` |
| `/lib/scoring/**` | `/data/seed/**` (Seed mocks) | `/components/shared/**` |
| `/lib/assessment-engine/**` | | |
| `/lib/missions/**` | | |
| `/lib/ai/**` | | |
| `/tests/**` | | |

---

## 3. Immediate Sprint 1 Deliverables for Team A

1. [x] **Core TypeScript Types**: Complete models in `/types`.
2. [x] **Seed Data**: Comprehensive datasets for CSE, EEE, ECE, Mechanical, and Civil in `/data/seed`.
3. [x] **Deterministic Engines**: Initialized algorithms in `/lib/scoring`, `/lib/evidence-engine`, `/lib/missions`.
4. [x] **Unit Tests**: Full test suite running green in `/tests`.
5. [ ] **Next Step (Sprint 2)**: Implement Firestore persistence repositories to save and load student evaluation snapshots.
