# Black Hole Gargantua-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current violet/cyan multi-ring accretion disk with a Gargantua-style (Interstellar) warm white/gold/orange disk + halo, as a cheap stylized approximation (no true gravitational lensing), and match the reduced-motion CSS fallback to the same palette.

**Architecture:** `BlackHole3D.tsx` keeps its existing component structure (separate mesh components composed in `BlackHoleModel`), but `AccretionDisk`'s fragment shader is recolored and `InnerDisk` + `PhotonRing` (two tori) are replaced by a single `Halo` torus tilted to read as light wrapping over the top/bottom of the event horizon. `globals.css` gains two new palette custom properties consumed by the reduced-motion fallback in `BlackHole.tsx`.

**Tech Stack:** react-three-fiber, Three.js (`ShaderMaterial`, `MeshBasicMaterial`), Tailwind v4 CSS custom properties.

## Global Constraints

- No automated test suite exists in this repo. Verification is `npm run lint`, `npm run build`, and manual visual check via `npm run dev`, per the project's spec (`docs/superpowers/specs/2026-07-23-visual-polish-design.md`).
- No true gravitational lensing / ray-marching — stylized approximation only.
- Do not change `Starfield.tsx`, camera position/FOV, canvas sizing, the `dynamic()` loading placeholder, or the drag-to-spin / `hintVisible` / "DRAG TO SPIN" hint behavior in `BlackHole.tsx`.
- Keep `OrbitControls` props (`autoRotate`, `enableDamping`, angle limits) unchanged.

---

### Task 1: Add warm palette CSS custom properties

**Files:**
- Modify: `src/app/globals.css:3-24`

**Interfaces:**
- Produces: `--gold` (`#ffcf7a`) and `--ember` (`#d9660b`) CSS custom properties, plus matching `--color-gold` / `--color-ember` Tailwind theme entries. Task 3 consumes `var(--gold)` and `var(--ember)`.

- [ ] **Step 1: Add the custom properties to `:root`**

Change:

```css
:root {
  --void: #07060c;
  --panel: #0f0d1b;
  --panel-line: rgba(236, 233, 246, 0.1);
  --text: #ece9f6;
  --muted: #8d89a8;
  --violet: #8a7cff;
  --cyan: #4fd6e0;
  --grid-line: rgba(236, 233, 246, 0.035);
}
```

To:

```css
:root {
  --void: #07060c;
  --panel: #0f0d1b;
  --panel-line: rgba(236, 233, 246, 0.1);
  --text: #ece9f6;
  --muted: #8d89a8;
  --violet: #8a7cff;
  --cyan: #4fd6e0;
  --gold: #ffcf7a;
  --ember: #d9660b;
  --grid-line: rgba(236, 233, 246, 0.035);
}
```

- [ ] **Step 2: Add the matching `@theme inline` entries**

Change:

```css
@theme inline {
  --color-void: var(--void);
  --color-panel: var(--panel);
  --color-panel-line: var(--panel-line);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-violet: var(--violet);
  --color-cyan: var(--cyan);
  --font-display: "Syne", sans-serif;
  --font-mono: "Space Mono", monospace;
}
```

To:

```css
@theme inline {
  --color-void: var(--void);
  --color-panel: var(--panel);
  --color-panel-line: var(--panel-line);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-violet: var(--violet);
  --color-cyan: var(--cyan);
  --color-gold: var(--gold);
  --color-ember: var(--ember);
  --font-display: "Syne", sans-serif;
  --font-mono: "Space Mono", monospace;
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds (adding unused CSS custom properties cannot break the build, but confirms no typo broke `globals.css`).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add gold/ember CSS custom properties for black hole palette"
```

---

### Task 2: Recolor the accretion disk shader to white/gold/ember

**Files:**
- Modify: `src/components/BlackHole3D.tsx:18-43` (`DISK_FRAGMENT`)
- Modify: `src/components/BlackHole3D.tsx:66` (disk mesh tilt)

**Interfaces:**
- Consumes: nothing new (same `uTime` uniform, same `vUv`/`vPos` varyings from `DISK_VERTEX`, unchanged).
- Produces: same shader interface (`DISK_VERTEX`, `DISK_FRAGMENT`, `uniforms.uTime`) consumed by `AccretionDisk`'s `<shaderMaterial>` — no signature changes, so `AccretionDisk` itself needs no edits.

- [ ] **Step 1: Replace `DISK_FRAGMENT`**

Change:

```glsl
const DISK_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    float dist = length(vPos.xz);
    float angle = atan(vPos.z, vPos.x);
    float spiral = sin(angle * 10.0 + uTime * 1.8 - dist * 5.0) * 0.5 + 0.5;
    float pulse = sin(uTime * 0.6 + dist * 3.0) * 0.15 + 0.85;

    vec3 violet = vec3(0.541, 0.486, 1.0);
    vec3 cyan   = vec3(0.310, 0.839, 0.878);
    vec3 hot    = vec3(1.0, 0.85, 0.6);

    vec3 color = mix(violet, cyan, spiral);
    color = mix(color, hot, pow(spiral, 3.0) * 0.35);
    color *= 1.6 * pulse;

    float inner = smoothstep(1.35, 1.55, dist);
    float outer = 1.0 - smoothstep(2.6, 3.0, dist);
    float alpha = inner * outer;

    gl_FragColor = vec4(color, alpha * 0.92);
  }
`;
```

To:

```glsl
const DISK_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    float dist = length(vPos.xz);
    float angle = atan(vPos.z, vPos.x);
    float spiral = sin(angle * 10.0 + uTime * 1.8 - dist * 5.0) * 0.5 + 0.5;
    float pulse = sin(uTime * 0.6 + dist * 3.0) * 0.15 + 0.85;

    vec3 white = vec3(1.0, 0.973, 0.925);
    vec3 gold  = vec3(1.0, 0.812, 0.478);
    vec3 ember = vec3(0.851, 0.4, 0.043);

    float band = smoothstep(1.45, 2.85, dist);
    vec3 color = mix(white, gold, band);
    color = mix(color, ember, pow(band, 1.5));
    color *= 1.3 * pulse * (0.8 + spiral * 0.35);

    float inner = smoothstep(1.35, 1.55, dist);
    float outer = 1.0 - smoothstep(2.6, 3.0, dist);
    float alpha = inner * outer;

    gl_FragColor = vec4(color, alpha * 0.92);
  }
`;
```

This drives the base color by radial distance (white-hot at the inner edge, fading through gold to ember at the outer edge) instead of the old spiral-driven violet/cyan hue mix, and uses `spiral`/`pulse` only for brightness variation so the disk no longer looks like a moving rainbow.

- [ ] **Step 2: Flatten the disk tilt for a more edge-on Gargantua silhouette**

In the `AccretionDisk` component's returned JSX, change:

```tsx
  return (
    <mesh geometry={geometry} rotation={[0.35, 0, 0]}>
```

To:

```tsx
  return (
    <mesh geometry={geometry} rotation={[0.12, 0, 0]}>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds with no TypeScript/GLSL errors.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, scroll to the hero section with the black hole.
Expected: the outer disk now shows a white-hot inner edge fading to gold/ember at the rim, no violet/cyan tones remain on the disk, and it appears flatter/more edge-on than before.

- [ ] **Step 5: Commit**

```bash
git add src/components/BlackHole3D.tsx
git commit -m "feat: recolor accretion disk to white/gold/ember palette"
```

---

### Task 3: Replace InnerDisk + PhotonRing with a single warm Halo, and recolor EventHorizon/Glow/lights

**Files:**
- Modify: `src/components/BlackHole3D.tsx` (`InnerDisk`, `PhotonRing`, `EventHorizon`, `Glow`, `BlackHoleModel`)

**Interfaces:**
- Consumes: `THREE.AdditiveBlending`, `useFrame` (both already imported).
- Produces: new `Halo` component used by `BlackHoleModel` in place of `InnerDisk`/`PhotonRing`. No other file imports `InnerDisk` or `PhotonRing` (grep confirms `BlackHole3D.tsx` is self-contained), so removing them is safe.

- [ ] **Step 1: Replace `InnerDisk` and `PhotonRing` with `Halo`**

Change:

```tsx
function InnerDisk() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[1.65, 0.06, 16, 100]} />
      <meshBasicMaterial
        color="#4fd6e0"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function PhotonRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.28, 0.025, 16, 128]} />
      <meshBasicMaterial
        color="#ece9f6"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
```

To:

```tsx
function Halo() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.05, 0, 0]}>
      <torusGeometry args={[1.5, 0.05, 16, 100]} />
      <meshBasicMaterial
        color="#ffcf7a"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
```

`Halo` is tilted nearly vertical (`Math.PI / 2.05`, versus the disk's now-flatter `0.12` tilt from Task 2), so it reads as a bright band wrapping over the top and bottom of the event horizon sphere — the stylized stand-in for the lensed image in the real Gargantua render.

- [ ] **Step 2: Recolor `EventHorizon`'s rim glow**

Change:

```tsx
function EventHorizon() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshBasicMaterial color="#07060c" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.18, 64, 64]} />
        <meshBasicMaterial
          color="#8a7cff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
```

To:

```tsx
function EventHorizon() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshBasicMaterial color="#07060c" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.18, 64, 64]} />
        <meshBasicMaterial
          color="#d9660b"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 3: Recolor `Glow`**

Change:

```tsx
function Glow() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial
        color="#8a7cff"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
```

To:

```tsx
function Glow() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial
        color="#f5b84f"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
```

- [ ] **Step 4: Recolor point lights and update `BlackHoleModel`'s composition**

Change:

```tsx
function BlackHoleModel({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 3, 4]} intensity={0.6} color="#8a7cff" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#4fd6e0" />

      <group>
        <Glow />
        <EventHorizon />
        <PhotonRing />
        <InnerDisk />
        <AccretionDisk />
      </group>
```

To:

```tsx
function BlackHoleModel({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 3, 4]} intensity={0.6} color="#ffcf7a" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#d9660b" />

      <group>
        <Glow />
        <EventHorizon />
        <Halo />
        <AccretionDisk />
      </group>
```

(The rest of `BlackHoleModel`, including `OrbitControls` and its props, is unchanged.)

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds. If `InnerDisk`/`PhotonRing` are still referenced anywhere, TypeScript/ESLint will fail on unused/missing identifiers — confirm no such errors.

- [ ] **Step 6: Manual visual check**

Run: `npm run dev`, view the black hole, and drag to rotate it.
Expected: no violet/cyan remains anywhere on the model; a warm gold halo band appears to wrap over the top and bottom of the dark event horizon sphere, combined with the flattened warm disk from Task 2; drag-to-spin and autorotate still work.

- [ ] **Step 7: Commit**

```bash
git add src/components/BlackHole3D.tsx
git commit -m "feat: replace inner disk/photon ring with warm halo, recolor lights and glow"
```

---

### Task 4: Update the reduced-motion CSS fallback to match

**Files:**
- Modify: `src/components/BlackHole.tsx:25-51` (`StaticBlackHole`)

**Interfaces:**
- Consumes: `var(--gold)` / `var(--ember)` from Task 1.
- Produces: n/a (leaf component, only used by `BlackHole` in the same file).

- [ ] **Step 1: Replace the gradient colors in `StaticBlackHole`**

Change:

```tsx
function StaticBlackHole() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="bh-pulse absolute inset-0 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--violet) 0%, transparent 65%)",
        }}
      />
      <div
        className="bh-spin absolute inset-[6%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--cyan) 0deg, transparent 40deg, var(--violet) 120deg, transparent 200deg, var(--cyan) 280deg, transparent 340deg, var(--cyan) 360deg)",
          filter: "blur(2px)",
          opacity: 0.55,
          maskImage:
            "radial-gradient(circle, transparent 38%, black 42%, black 62%, transparent 64%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 38%, black 42%, black 62%, transparent 64%)",
        }}
      />
      <div className="absolute inset-[40%] rounded-full bg-void" />
    </div>
  );
}
```

To:

```tsx
function StaticBlackHole() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="bh-pulse absolute inset-0 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--gold) 0%, transparent 65%)",
        }}
      />
      <div
        className="bh-spin absolute inset-[6%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--gold) 0deg, transparent 40deg, var(--ember) 120deg, transparent 200deg, var(--gold) 280deg, transparent 340deg, var(--gold) 360deg)",
          filter: "blur(2px)",
          opacity: 0.55,
          maskImage:
            "radial-gradient(circle, transparent 38%, black 42%, black 62%, transparent 64%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 38%, black 42%, black 62%, transparent 64%)",
        }}
      />
      <div className="absolute inset-[40%] rounded-full bg-void" />
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Manual visual check**

In devtools, enable "Emulate CSS media feature `prefers-reduced-motion: reduce`", reload the page.
Expected: the static fallback now shows warm gold/ember tones instead of violet/cyan, consistent with the 3D version.

- [ ] **Step 4: Commit**

```bash
git add src/components/BlackHole.tsx
git commit -m "feat: match reduced-motion black hole fallback to warm palette"
```
