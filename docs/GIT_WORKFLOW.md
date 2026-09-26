# PlacementOS — Git & Branching Strategy

> **Core Principle**: Zero direct commits to `main`. Every change merges via reviewed Pull Requests following strict CI quality gates.

---

## 1. Branch Hierarchy

```
main (Production Ready / Always Deployable)
  ▲
  │ Pull Request (Review + Tests + Build)
  │
feature branches (team-a/* or team-b/*)
```

---

## 2. Branch Naming Standards

To prevent branch collision and maintain clarity on ownership, branches must strictly follow this naming format:

### Team A (Foundation & Intelligence)
- `team-a/skill-graph`
- `team-a/evidence-engine`
- `team-a/scoring-refinements`
- `team-a/assessment-engine`
- `team-a/gemini-parser`
- `team-a/firestore-repo`

### Team B (Student Experience & UI)
- `team-b/onboarding-wizard`
- `team-b/dashboard-charts`
- `team-b/assessment-runner`
- `team-b/missions-ui`
- `team-b/profile-dossier`
- `team-b/accessibility-fixes`

---

## 3. Developer Workflow (Step-by-Step)

### Step 1: Start from Updated `main`
```bash
git checkout main
git pull origin main
```

### Step 2: Create a Feature Branch
```bash
git checkout -b team-a/skill-graph-update
# or
git checkout -b team-b/dashboard-improvements
```

### Step 3: Implement & Test Locally
Before pushing, every developer must run the local verification suite:
```bash
npm test          # Must pass all unit tests
npm run lint      # Must pass with zero ESLint errors
npm run build     # Must compile without build breaks
```

### Step 4: Commit with Conventional Messages
Format: `<type>(<scope>): <short description>`
- `feat(scoring): add multi-source evidence weighting`
- `fix(onboarding): correct radio selection tab index`
- `test(skill-graph): add cross-discipline transfer test`
- `docs(api): document firestore collections schema`

### Step 5: Push and Open a Pull Request
```bash
git push -u origin team-a/skill-graph-update
```
Open a PR targeting `main`. PR checklist:
- [ ] Description explains the problem and the solution.
- [ ] Confirms no edits outside the team's designated directories without mutual approval.
- [ ] Local tests and build passed.
- [ ] Requires at least 1 peer review approval from the other team before merge.

### Step 6: Squash & Merge
Always use **Squash and Merge** to keep the `main` branch history clean, linear, and easy to bisect.
