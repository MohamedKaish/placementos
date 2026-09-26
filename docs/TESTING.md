# PlacementOS — Deterministic Testing Strategy & Test Suites

> **Core Requirement**: The readiness and scoring engine must be 100% deterministic, reproducible, and mathematically testable with zero reliance on stochastic LLM outputs.

---

## 1. Test Architecture

PlacementOS separates testing into two distinct boundaries:

1. **Deterministic Unit Tests (`vitest run`)**:
   - Skill graph querying and cross-discipline transfer mapping calculations.
   - Multi-source evidence weighting.
   - Skill gap calculations (`requiredLevel - currentEvidenceLevel`).
   - Calibration gap analysis (`claimedLevel - evidenceBackedLevel`).
   - Assessment scoring and proficiency level derivation.
   - Mission prioritization scoring (`importanceWeight * gapMagnitude * criticalMultiplier`).
2. **AI & Integration Contract Tests**:
   - Mocked schema validation for Gemini LLM extractions (validating that parsed resume JSON matches expected TypeScript interfaces).
   - Component rendering tests for accessibility landmarks and keyboard navigation.

---

## 2. Implemented Test Suites

All tests are located under `/tests`:

### 2.1 `tests/skill-graph.test.ts`
- Verifies loading of all 5 initial engineering departments (CSE, EEE, ECE, MECH, CIVIL).
- Enforces the architectural invariant: `JobRole` does NOT belong directly to any `Department`.
- Verifies transferable skill multiplier calculations across domain boundaries.

### 2.2 `tests/evidence-engine.test.ts`
- Validates the source reliability hierarchy (e.g. `technical_assessment > project_repo > resume_parsed`).
- Validates mathematical correctness of multi-source weighted scoring.
- Validates classification of overconfidence (`gap > 0.75`) and underconfidence (`gap < -0.75`).

### 2.3 `tests/scoring.test.ts`
- Tests gap calculation with zero false precision.
- Validates that `criticalRequirementsMet` acts as an absolute qualification gate.
- Verifies qualitative band transitions (`Target_Ready`, `Advancing`, `Developing`, `Needs_Foundation`).

### 2.4 `tests/missions.test.ts`
- Verifies that critical gaps receive higher deterministic priority than non-critical gaps of equal magnitude.
- Ensures generated missions retain an unbroken trace to the specific skill gap that triggered them.

---

## 3. How to Execute Tests

```bash
# Run all unit tests once
npm test

# Run tests in interactive watch mode during development
npx vitest

# Run tests with code coverage report
npx vitest run --coverage
```
