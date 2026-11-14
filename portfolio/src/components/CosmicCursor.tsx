"use client";

import { useEffect, useRef } from "react";

export default function CosmicCursor() {
  const auraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      if (auraRef.current && auraRef.current.style.opacity !== "1") {
        auraRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (auraRef.current) auraRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (auraRef.current) auraRef.current.style.opacity = "1";
    };

    const checkHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest(
          "a, button, [role='button'], input, textarea, select, .project-card, .bento-card",
        ),
      );

      if (ringRef.current) {
        if (isInteractive) {
          ringRef.current.className =
            "rounded-full transition-all duration-300 ease-out h-12 w-12 border border-cyan/60 bg-cyan/15 shadow-[0_0_24px_rgba(79,214,224,0.4)] scale-125";
        } else {
          ringRef.current.className =
            "rounded-full transition-all duration-300 ease-out h-7 w-7 border border-violet/40 bg-violet/10 shadow-[0_0_12px_rgba(138,124,255,0.2)] scale-100";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", checkHoverState, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    let rafId = 0;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    // Smooth physics loop for the trailing cosmic accretion aura
    const loop = () => {
      posRef.current.x = lerp(posRef.current.x, posRef.current.targetX, 0.22);
      posRef.current.y = lerp(posRef.current.y, posRef.current.targetY, 0.22);

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", checkHoverState);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 opacity-0 transition-opacity duration-300 hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div
        ref={ringRef}
        className="rounded-full transition-all duration-300 ease-out h-7 w-7 border border-violet/40 bg-violet/10 shadow-[0_0_12px_rgba(138,124,255,0.2)] scale-100"
      />
    </div>
  );
}
