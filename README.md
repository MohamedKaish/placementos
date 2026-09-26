# PlacementOS

> **“Know where you stand. Know what to do next.”**
>
> *An evidence-weighted, department-agnostic placement readiness engine for engineering students.*
>
> **Hackathon**: PromptWars × GDG on Campus – CIT GenAI Innovation Challenge

---

## The Problem

Engineering students frequently struggle with campus placement readiness because they lack clarity on:
- Exactly what they should prepare for their desired career path.
- Where their true technical ability stands compared to industry expectations.
- Which specific skill deficiencies are holding them back.
- How their current demonstrated skills compare with independent target job roles.
- What concrete, verifiable action they should take next.
- Whether their daily preparation is actually translating into demonstrated improvement.

Most existing platforms either assume a student's academic branch strictly dictates their career, or rely on superficial quizzes and unverified self-ratings.

---

## Core Differentiator: “Claimed Skill ≠ Demonstrated Skill”

PlacementOS breaks placement readiness into four distinct, measurable dimensions:

1. **Claimed Skill**: What the student self-assesses or writes on a resume.
2. **Evidence-Backed Skill**: What their code repositories, project artifacts, and coursework prove.
3. **Demonstrated Skill**: What they directly demonstrate under objective, structured assessment.
4. **Target Role Requirements**: What real-world industry roles require (weighted skills + minimum proficiency thresholds).

PlacementOS deterministically calculates the **Calibration Gap** (identifying overconfidence or imposter syndrome) and the **Skill Gap**, subsequently assigning targeted, milestone-driven **Preparation Missions**.

---

## 10 Core Product Principles

1. **Department ≠ Career**: Academic branches do not restrict career choices. An EEE student can target an Embedded Systems or Software role.
2. **Claimed skill ≠ Demonstrated skill**: Self-assessment is heavily discounted until verified through artifacts or assessment.
3. **Evidence is more important than self-rating**: Verifiable code repos and tests outweigh claims.
4. **AI is NOT the source of truth for deterministic scoring**: Gemini handles language understanding; deterministic application algorithms calculate scores and gaps.
5. **Every recommendation is traceable to a detected gap**: No arbitrary suggestions. Every mission traces back to an evaluated deficit.
6. **No false precision**: We do not show meaningless numbers like "87.432% ready".
7. **No single meaningless readiness percentage**: Readiness is multi-dimensional (Foundation, Core Skills, Verified Coverage, Critical Gates).
8. **Accessibility is a first-class requirement**: WCAG 2.1 AA/AAA compliance, keyboard navigation, and high-contrast precision UI.
9. **Security is a first-class requirement**: Zero API keys or private student dossiers exposed to client-side code.
10. **Data-driven extensibility**: New engineering departments, domains, and skills can be added purely via JSON data configurations without modifying codebase logic.

---

## Architecture Overview

```
                                  PLACEMENTOS ARCHITECTURE
                                  
  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                           AI Linguistic Engine (Gemini)                          │
  │     • Resume Parsing  • Job Description Extraction  • Qualitative Feedback       │
  └────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │ (Extracted Claims & Artifacts)
                                           ▼
  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                    Deterministic Business Logic Engine (TypeScript)              │
  │     • Multi-Source Evidence Weighting Matrix   • Skill Gap Calculator            │
  │     • Calibration Gap Classifier               • Multidimensional Readiness Band │
  │     • Mission Prioritization Engine            • Transferable Skill Multiplier   │
  └────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │
                                           ▼
  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                     Modern Presentation Layer (Next.js App Router)               │
  │     • Dark/Navy Engineering Theme              • Onboarding Diagnostic Flow      │
  │     • Placement Intelligence Dashboard         • Timed Assessment Runner         │
  │     • Actionable Missions Checklist            • Student Dossier / Profile       │
  └──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Client Views)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety across data contracts)
- **Styling**: Vanilla CSS Design System with accessible tokens and dark/navy engineering palette
- **Data & Auth Layer**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (Language understanding & extraction)
- **Testing**: [Vitest](https://vitest.dev/) (Deterministic unit test suites)
- **Deployment**: Vercel-compatible serverless architecture

---

## Repository Structure

```
placementos/
├── app/                      # Next.js App Router route groups
│   ├── (auth)/login/         # Student authentication view
│   ├── (onboarding)/         # Career profiling & branch intake
│   ├── (dashboard)/          # Multidimensional readiness intelligence
│   ├── (assessment)/         # Diagnostic evaluation interface
│   ├── (missions)/           # Traceable preparation missions
│   ├── (profile)/            # Candidate portfolio & verified artifacts
│   ├── layout.tsx            # Global layout with skip navigation
│   └── page.tsx              # Platform landing page
├── components/
│   ├── ui/                   # Reusable atomic UI (Button, Card, Badge, ProgressBar)
│   └── shared/               # Shared layout widgets (Navbar, Footer)
├── lib/
│   ├── skill-graph/          # Department-agnostic skill taxonomy & transfer queries
│   ├── evidence-engine/      # Multi-source reliability weighting & calibration gap
│   ├── scoring/              # Deterministic readiness evaluation & gap formulas
│   ├── assessment-engine/    # Objective test scoring & level derivation
│   ├── missions/             # Mission prioritization & generation logic
│   ├── ai/                   # Gemini API client & linguistic system prompts
│   ├── firebase/             # Firestore typed collection registry & config
│   └── utils/                # Helper utilities
├── types/                    # Canonical TypeScript interfaces (API contracts)
├── data/seed/                # Seed data for CSE, EEE, ECE, Mech, and Civil
├── tests/                    # Deterministic unit test suites (Vitest)
└── docs/                     # Engineering specifications & team workflows
```

---

## Team Ownership

| Team | Name | Primary Responsibilities |
| :--- | :--- | :--- |
| **Team A** | Foundation + Intelligence | Skill Graph, Scoring Engines, Evidence Weighting, Gemini Abstraction, Firestore Schema, Unit Tests |
| **Team B** | Student Experience + UI | Onboarding Wizard, Dashboard UI, Assessment Runner, Missions UI, Design Tokens, Accessibility |

*Detailed specifications: [`/docs/TEAM_A.md`](docs/TEAM_A.md) and [`/docs/TEAM_B.md`](docs/TEAM_B.md).*

---

## Getting Started Locally

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+` or `v11+`

### Installation
```bash
# Clone the repository
git clone https://github.com/MohamedKaish/placementos.git
cd placementos

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local to insert your GEMINI_API_KEY and Firebase project keys
```

### Verification & Testing
```bash
# Run deterministic unit tests
npm test

# Run ESLint quality checks
npm run lint

# Build production bundle
npm run build

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Current Project Status

- **Phase**: Foundation Milestone Complete (Ready for parallel Sprint 1 execution).
- **Core Architecture**: Fully scaffolded, typed, and unit tested.
- **Continuous Integration Quality Gate**: 100% test pass rate, 0 lint warnings, clean Turbopack build.
