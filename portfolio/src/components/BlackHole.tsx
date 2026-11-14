"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore, useState } from "react";

const BlackHole3D = dynamic(() => import("./BlackHole3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-violet/10 blur-2xl" />
    </div>
  ),
});

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeElements(onChange: () => void) {
  window.addEventListener("singularity:elements-enter", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("singularity:elements-enter", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getElementsSnapshot() {
  try {
    return (
      document.documentElement.classList.contains("hero-elements-entered") ||
      sessionStorage.getItem("hero_elements_entered") === "true"
    );
  } catch {
    return false;
  }
}

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

export default function BlackHole() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const elementsEntered = useSyncExternalStore(
    subscribeElements,
    getElementsSnapshot,
    () => false,
  );
  const [hintVisible, setHintVisible] = useState(true);

  const dismissHint = () => {
    if (hintVisible) setHintVisible(false);
  };

  if (reducedMotion) {
    return <StaticBlackHole />;
  }

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      onPointerDown={dismissHint}
      role="img"
      aria-label="Interactive 3D black hole — drag to spin"
    >
      <BlackHole3D autoRotate={hintVisible} />

      {hintVisible && (
        <div
          className={`pointer-events-none absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-700 ${
            elementsEntered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="rounded-full border border-panel-line/60 bg-void/80 px-2.5 py-1 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-muted backdrop-blur-sm">
            DRAG TO SPIN
          </span>
        </div>
      )}
    </div>
  );
}
