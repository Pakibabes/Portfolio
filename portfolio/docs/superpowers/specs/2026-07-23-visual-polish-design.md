# Visual Polish: Project Card Hover + Black Hole Redesign

## Overview

Two independent visual fixes to the portfolio site:

1. A CSS bug fix — the project card hover state lacks a solid, visible edge.
2. A redesign of the 3D black hole — from a violet/cyan multi-ring accretion
   disk to a Gargantua-style (Interstellar) single warped disk in a
   white/gold/orange palette, kept as a cheap stylized approximation rather
   than true gravitational lensing.

These ship as two separate implementation plans since they touch unrelated
files and carry different risk/complexity.

---

## 1. Project Card Hover Fix

**File:** `src/components/ProjectCard.tsx`, `src/app/globals.css`

**Problem:** On hover, `.project-card` changes `border-color` to
`rgba(138,124,255,0.45)` and adds a box-shadow ring at
`0 0 0 1px rgba(79,214,224,0.08)`. Both are low-opacity, so the edge reads as
faint/patchy instead of a solid line.

**Fix:**
- Raise the hover border color opacity so the edge is clearly visible
  (target roughly `rgba(138,124,255,0.6–0.8)`, tuned visually).
- Remove or substantially strengthen the `0 0 0 1px rgba(79,214,224,0.08)`
  inset ring — it currently contributes almost nothing. Prefer relying on a
  single strong border transition over a near-invisible second ring, unless
  visually a subtle second ring adds depth once the opacity is raised.
- Keep the existing `transform: translateY(-4px)` lift and outer glow
  box-shadow (`0 12px 40px -12px rgba(138,124,255,0.25)`) unchanged.
- No structural changes to `ProjectCard.tsx` — this is a CSS-only fix in
  `globals.css` (`.project-card:hover` block, lines ~258-264).

**Out of scope:** changing card layout, content, or non-hover states.

---

## 2. Black Hole Redesign (Gargantua-style)

**Files:**
- `src/components/BlackHole3D.tsx` — the interactive 3D model
  (react-three-fiber/Three.js)
- `src/components/BlackHole.tsx` — wrapper, including `StaticBlackHole`
  (CSS-only reduced-motion fallback)

**Problem:** The current accretion disk (`AccretionDisk` shader, `InnerDisk`
torus, `PhotonRing` torus) uses a violet/cyan/hot-color mix
(`DISK_FRAGMENT`) that reads as too intense/saturated and doesn't match the
restrained feel of the rest of the site.

**Direction:** Replace the multi-layer ring setup with a single warped disk
silhouette evoking the Gargantua black hole from *Interstellar* — a disk
that appears to wrap over the top and bottom of the sphere — using a
**stylized approximation**, not true gravitational lensing / ray-marching.
This keeps GPU cost low and mobile performance safe, per the fidelity
trade-off already agreed.

**Shape:**
- Replace `AccretionDisk` + `InnerDisk` + `PhotonRing` (three separate
  meshes) with one disk mesh whose geometry and/or shader UV mapping fakes
  the "wrapped around the sphere" silhouette (e.g. a distorted ring geometry
  bent toward the camera at top/bottom, or a shader mask on a
  larger-than-horizon plane that curves the bright band over the polar
  regions). Exact geometry technique is an implementation detail for the
  plan — the requirement is the silhouette reads as "warped single disk
  wrapping the sphere," not flat concentric rings.
- `EventHorizon` (the dark sphere) and `Glow` stay conceptually as-is
  (still a dark sphere at center with a soft ambient glow), but colors
  change per below.

**Palette:**
- Inner edge: bright white-hot (e.g. near `#fff8ec` / `#ffffff`)
- Mid-band: gold (e.g. `#ffcf7a` / `#f5b84f`)
- Outer edge: deep orange (e.g. `#d9660b` / `#b5480a`)
- Replace all violet (`#8a7cff`) and cyan (`#4fd6e0`) references inside
  `BlackHole3D.tsx` (disk shader `violet`/`cyan`/`hot` vec3s, `InnerDisk`
  color, `PhotonRing` color, point-light colors, `EventHorizon` rim color,
  `Glow` color) with tones from this warm palette.
- `DISK_FRAGMENT`'s `mix(violet, cyan, spiral)` logic is restructured to mix
  across white → gold → orange instead.

**Motion:** Keep the existing animation mechanics — `uTime`-driven spiral/
pulse in the fragment shader, `InnerDisk` rotation, `OrbitControls`
autoRotate/drag behavior — retuned only as needed for the new shape. No
change to `BlackHole.tsx`'s drag-to-spin interaction, `hintVisible` state,
or the "DRAG TO SPIN" hint UI.

**Reduced-motion fallback:** `StaticBlackHole` in `BlackHole.tsx` currently
uses `var(--violet)` and `var(--cyan)` in its radial/conic gradients. Update
these gradients to the same white/gold/orange palette so the fallback
matches the 3D version. This does not require new CSS custom properties
unless convenient — inline gradient colors may be updated directly, or new
`--gold`/`--ember` custom properties may be added to `:root` in
`globals.css` if reused in multiple places.

**Out of scope:**
- True gravitational lensing / ray-marched light bending
- Changes to `Starfield.tsx`
- Changes to camera position, FOV, or canvas sizing in `BlackHole3D.tsx`
- Changes to the loading placeholder in `BlackHole.tsx`'s `dynamic()` call

---

## Testing

- Visual/manual verification only (no automated visual regression tooling
  in this repo). Each plan's tasks should end with running the dev server
  and confirming the change looks correct, per this project's `run` skill
  convention.
- Confirm reduced-motion fallback still triggers correctly via
  `prefers-reduced-motion: reduce` emulation in devtools.
