# Team B — Student Experience + UI Specification

> **Focus**: Student-facing interfaces, responsive layouts, accessibility compliance, design tokens, and modular components.

---

## 1. Scope of Responsibility

Team B owns the entire presentation and user experience of PlacementOS:
1. **Design System & Visual Language**:
   - Modern dark/navy engineering palette in `/app/globals.css`.
   - Accessible color contrast (WCAG AAA/AA).
   - Clean typography with strong information hierarchy.
   - Professional, technology-focused visual tone (no excessive gradients, childish animations, or heavy gaming elements).
2. **Reusable Component Library**:
   - Core atoms & molecules in `/components/ui`: `Button`, `Card`, `Badge`, `ProgressBar`.
   - Layout & global navigation in `/components/shared`: `Navbar`, `Footer`.
3. **Student Onboarding Experience**:
   - Intuitive selection of engineering discipline and independent target roles in `/app/(onboarding)`.
   - Baseline skill claim intake and evidence artifact collection.
4. **Placement Readiness Dashboard**:
   - Multi-dimensional readiness visualization in `/app/(dashboard)`.
   - Clear display of detected Skill Gaps and Calibration Gap analysis.
5. **Interactive Assessment Interface**:
   - Timed, distraction-free test execution interface in `/app/(assessment)`.
6. **Targeted Preparation Missions UI**:
   - Actionable milestone checklist and evidence submission flow in `/app/(missions)`.
7. **Student Intelligence Dossier / Profile**:
   - Candidate portfolio, verified artifact listing, and career targets in `/app/(profile)`.
8. **Accessibility & Responsive Usability**:
   - Full keyboard navigability, semantic tags, and mobile/tablet responsive behavior.

---

## 2. Directory Boundaries

| Allowed to Edit Freely | Requires Coordination with Team A | Strictly Forbidden |
| :--- | :--- | :--- |
| `/app/**` (All route views) | `/types/**` (API contracts) | `/lib/scoring/**` |
| `/components/ui/**` | `/lib/firebase/**` (Auth/Client) | `/lib/evidence-engine/**` |
| `/components/shared/**` | `/data/seed/**` (Mock structures) | `/lib/skill-graph/**` |
| `/app/globals.css` | | `/lib/assessment-engine/**` |
| | | `/lib/missions/**` |
| | | `/lib/ai/**` |
| | | `/tests/**` |

---

## 3. Immediate Sprint 1 Deliverables for Team B

1. [x] **Core Design Tokens**: Implemented in `/app/globals.css`.
2. [x] **Base UI Components**: `Button`, `Card`, `Badge`, `ProgressBar` built with accessible semantics.
3. [x] **Route Shells**: Scaffolded pages for `/login`, `/onboarding`, `/dashboard`, `/assessment`, `/missions`, `/profile`.
4. [x] **Clean Next.js Build**: Pre-rendered static pages compiling without errors.
5. [ ] **Next Step (Sprint 2)**: Wire the Onboarding state management to dynamically display skills based on user-selected disciplines and target roles from Team A's `SkillGraph`.
