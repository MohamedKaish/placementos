# PlacementOS — Accessibility & Inclusive Design Standards

> **Core Standard**: PlacementOS treats accessibility (a11y) as a non-negotiable first-class requirement conforming to WCAG 2.1 Level AA / AAA.

---

## 1. Core Principles

### 1.1 Never Rely on Color Alone
- Status indicators (e.g. Critical Gaps vs Proficient Skills) must never use only red or green badges.
- Every indicator pairs color with explicit text labels (e.g. `CRITICAL GATE`, `MINOR GAP`, `PROFICIENT`) and numerical indicators (`Gap: -1.5`).
- Progress bars and score meters provide explicit text percentages and ARIA range values.

### 1.2 Keyboard Navigation & Focus Ring
- Every interactive element (buttons, checkboxes, radios, card action links) is reachable via standard `Tab` / `Shift+Tab`.
- Distinct, high-contrast focus rings (`outline: 2px solid var(--border-focus)`) are enforced on `:focus-visible`.
- A `<a href="#main-content" class="skip-link">Skip to main content</a>` element is included on the root layout.

### 1.3 Semantic HTML & Screen Reader Support
- Standard HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Unique IDs paired with `<label htmlFor="...">` for all form controls.
- Dynamic widgets like progress bars use `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Heading hierarchy follows a strict structure: only one `<h1>` per page, followed by properly nested `<h2>` and `<h3>`.

---

## 2. Typography & Contrast Tokens

| Element | Background | Text Color | Contrast Ratio | Conformance |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Body Text** | `#0B0F17` | `#F8FAFC` | 17.5:1 | WCAG AAA |
| **Muted Meta Text** | `#0B0F17` | `#94A3B8` | 7.1:1 | WCAG AAA |
| **Action Accent Blue** | `#2563EB` | `#FFFFFF` | 4.8:1 | WCAG AA Large |
| **Card Surface Elevated** | `#121826` | `#F8FAFC` | 15.8:1 | WCAG AAA |

---

## 3. Team B Verification Checklist

- [ ] All inputs have associated `<label>` elements with matching `id`.
- [ ] No clickable `<div>` without `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers.
- [ ] All status cards and score indicators display visible text, not just colored dots.
- [ ] Tested via full keyboard navigation (Tab, Enter, Space).
- [ ] Screen reader smoke-test verified using Windows Narrator / NVDA.
