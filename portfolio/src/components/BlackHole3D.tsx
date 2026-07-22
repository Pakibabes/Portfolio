"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const DISK_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

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

function AccretionDisk() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.RingGeometry(1.45, 2.85, 128, 8);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    [],
  );

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry} rotation={[0.12, 0, 0]}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={DISK_VERTEX}
        fragmentShader={DISK_FRAGMENT}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

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
      camera={{ position: [0, 1.8, 5.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent", touchAction: "none" }}
    >
      <BlackHoleModel autoRotate={autoRotate} />
    </Canvas>
  );
}
