# Project Card Hover Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the project card hover edge read as a solid, visible line instead of a faint/patchy one.

**Architecture:** Single CSS edit in `globals.css` — no component or markup changes.

**Tech Stack:** Tailwind CSS v4, plain CSS in `src/app/globals.css`.

## Global Constraints

- No automated test suite exists in this repo (`package.json` has no `test` script). Verification is `npm run lint`, `npm run build`, and manual visual check via `npm run dev`, per the project's spec (`docs/superpowers/specs/2026-07-23-visual-polish-design.md`).
- Do not change `.project-card`'s non-hover state, layout, or `ProjectCard.tsx` markup — this is CSS-only.
- Keep the existing `translateY(-4px)` lift and outer glow shadow unchanged.

---

### Task 1: Strengthen the hover border and remove the near-invisible ring

**Files:**
- Modify: `src/app/globals.css:258-264`

**Interfaces:**
- Consumes: existing `.project-card` / `.project-card:hover` rules already in the file (no other file references these class names besides `ProjectCard.tsx:13`, which is unchanged).
- Produces: n/a (leaf CSS change, nothing downstream depends on this).

- [ ] **Step 1: Read the current rule to confirm line numbers**

Run: `sed -n '250,270p' src/app/globals.css` (or open the file) and confirm the block still matches:

```css
.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(138, 124, 255, 0.45);
  box-shadow:
    0 12px 40px -12px rgba(138, 124, 255, 0.25),
    0 0 0 1px rgba(79, 214, 224, 0.08);
}
```

If the content differs (someone else edited it since this plan was written), stop and re-read the surrounding 20 lines before proceeding.

- [ ] **Step 2: Replace the hover rule**

Change:

```css
.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(138, 124, 255, 0.45);
  box-shadow:
    0 12px 40px -12px rgba(138, 124, 255, 0.25),
    0 0 0 1px rgba(79, 214, 224, 0.08);
}
```

To:

```css
.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(138, 124, 255, 0.75);
  box-shadow: 0 12px 40px -12px rgba(138, 124, 255, 0.25);
}
```

This raises the border opacity from 0.45 to 0.75 (solid, clearly visible edge) and drops the `0 0 0 1px rgba(79, 214, 224, 0.08)` ring, which contributed almost no visible contrast. The outer glow shadow is kept as-is.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors (CSS is not linted by this command, but this confirms nothing else broke — should pass trivially since no `.ts`/`.tsx` files changed).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 5: Manual visual check**

Run: `npm run dev`, open the projects section, hover over a project card.
Expected: the card edge shows a clearly visible solid violet line on hover (not faint/patchy), lift and glow shadow still animate in as before.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: make project card hover border solid and visible"
```
