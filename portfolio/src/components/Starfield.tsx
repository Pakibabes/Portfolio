"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  twinkle: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;

    // Relativistic velocity warp tracking
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity = (currentY - lastScrollY) * 0.35;
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(236, 233, 246, 0.5)";
        ctx.fill();
      }
    };

    const drawAnimated = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth decay of scroll velocity
      scrollVelocity *= 0.9;
      const warp = Math.max(-20, Math.min(20, scrollVelocity));
      const isWarping = Math.abs(warp) > 0.4;

      for (const star of stars) {
        star.twinkle += star.speed;
        const alpha = 0.35 + Math.sin(star.twinkle) * 0.35;

        if (isWarping) {
          // Relativistic warp speed streak
          ctx.beginPath();
          ctx.lineWidth = star.r * 1.4;
          ctx.strokeStyle = `rgba(79, 214, 224, ${Math.max(0.12, alpha * 0.85)})`;
          ctx.lineCap = "round";
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x, star.y - warp * star.r * 3);
          ctx.stroke();
        } else {
          // Normal celestial twinkle
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(236, 233, 246, ${Math.max(0.15, alpha)})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(drawAnimated);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const count = Math.floor((width * height) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        speed: Math.random() * 0.04 + 0.01,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(drawAnimated);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
