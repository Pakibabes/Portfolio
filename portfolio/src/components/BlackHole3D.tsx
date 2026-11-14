"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

type BlackHoleGLTF = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_9: THREE.Mesh;
  };
  materials: {
    main: THREE.MeshBasicMaterial;
    ring: THREE.MeshBasicMaterial;
    hole: THREE.MeshBasicMaterial;
    distortion: THREE.MeshBasicMaterial;
  };
};

function BlackHoleModel() {
  const { nodes, materials } = useGLTF(
    "/models/black_hole.glb"
  ) as unknown as BlackHoleGLTF;

  const holeTexture = useTexture("/textures/hole4.png");

  const ringRef = useRef<THREE.Mesh>(null);
  const distortionRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  // Clone materials and configure hole4.png with soft additive glow
  const cloned = useMemo(() => {
    const ring = materials.ring.clone();
    ring.map = holeTexture;
    ring.transparent = true;
    ring.alphaTest = 0; // Remove mask cutoff so the full outer rim and delicate glow render
    ring.side = THREE.DoubleSide;
    ring.depthWrite = false;
    ring.blending = THREE.AdditiveBlending;

    const main = materials.main.clone();
    main.transparent = true;
    main.depthWrite = false;
    main.blending = THREE.AdditiveBlending;

    const distortion = materials.distortion.clone();
    distortion.transparent = true;
    distortion.depthWrite = false;

    const hole = materials.hole.clone();
    hole.color = new THREE.Color("#000000");

    return { ring, main, distortion, hole };
  }, [materials, holeTexture]);

  // Dynamic animation: accretion disk spins continuously, distortion counter-rotates
  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.45;
    }
    if (distortionRef.current) {
      distortionRef.current.rotation.y -= delta * 0.18;
    }
    if (auraRef.current) {
      auraRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group scale={0.138} rotation={[0.22, 0, -0.05]}>
      {/* Outer atmospheric aura */}
      <mesh
        ref={auraRef}
        geometry={nodes.Object_4.geometry}
        material={cloned.main}
      />

      {/* Dynamic Accretion Disk (full high-res textured ring) */}
      <mesh
        ref={ringRef}
        geometry={nodes.Object_5.geometry}
        material={cloned.ring}
      />

      {/* Central Event Horizon (pure black void) */}
      <mesh geometry={nodes.Object_7.geometry} material={cloned.hole} />

      {/* Gravitational Distortion Sphere */}
      <mesh
        ref={distortionRef}
        geometry={nodes.Object_9.geometry}
        material={cloned.distortion}
        scale={9.521}
      />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#07060c" />
    </mesh>
  );
}

function Scene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 4, 5]} intensity={1.2} color="#ffcf7a" />
      <pointLight position={[-4, -3, -2]} intensity={0.6} color="#d9660b" />

      <Suspense fallback={<LoadingFallback />}>
        <BlackHoleModel />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        rotateSpeed={0.8}
        dampingFactor={0.06}
        enableDamping
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.6}
      />
    </>
  );
}

export default function BlackHole3D({
  autoRotate = true,
}: {
  autoRotate?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 6.8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <Scene autoRotate={autoRotate} />
    </Canvas>
  );
}

useGLTF.preload("/models/black_hole.glb");
useTexture.preload("/textures/hole4.png");
