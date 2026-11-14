"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore, useRef } from "react";

const INTRO_LINES = [
  {
    text: "✦ INITIALIZING GRAVITATIONAL FIELD...",
    color: "text-cyan",
  },
  {
    text: "✦ OPERATOR: JOHN LYSTER T. ARBIOL // 4TH_YEAR_CS",
    color: "text-text",
  },
  {
    text: "✦ SINGULARITY STABILIZED [EVENT HORIZON ARMED]",
    color: "text-violet",
  },
];

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  try {
    return sessionStorage.getItem("singularity_breached") === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export default function SingularityIntro() {
  const alreadyBreached = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [breachedLocally, setBreachedLocally] = useState(false);
  const [breaching, setBreaching] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Typewriter state
  const [displayedLines, setDisplayedLines] = useState<string[]>(["", "", ""]);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [readyToBreach, setReadyToBreach] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  const breachSingularity = useCallback(() => {
    if (breaching || breachedLocally || alreadyBreached) return;
    setBreaching(true);

    // Allow the 900ms 60fps pure white explosion sequence to play before unmounting
    setTimeout(() => {
      try {
        sessionStorage.setItem("singularity_breached", "true");
        document.documentElement.classList.add("intro-breached");
      } catch {
        // sessionStorage unavailable
      }
      try {
        window.dispatchEvent(new CustomEvent("singularity:breached"));
      } catch {
        // CustomEvent unavailable
      }
      setBreachedLocally(true);
      document.body.style.overflow = "";
    }, 900);
  }, [breaching, breachedLocally, alreadyBreached]);

  // High-performance 60-120 FPS HTML5 Canvas Explosion Engine
  useEffect(() => {
    if (!breaching) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.hypot(cx, cy) * 1.1;

    // 36 Radiant piercing rays
    const rays = Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
      return {
        cos: Math.cos(angle),
        sin: Math.sin(angle),
        speed: 0.85 + Math.random() * 0.45,
        length: maxRadius * (0.65 + Math.random() * 0.5),
      };
    });

    // 48 High-velocity sparks with motion streaks
    const sparks = Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const speed = 500 + Math.random() * 950;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 2,
        length: 16 + Math.random() * 24,
      };
    });

    const DURATION = 900;
    let animId: number;
    const startTime = performance.now();
    let lastTime = startTime;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / DURATION, 1);
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      // Reset transform & clear frame
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Camera shake during violent core detonation (first 35% of burst)
      if (p > 0.08 && p < 0.4) {
        const shakeFactor = 1 - (p - 0.08) / 0.32;
        const shakeAmp = shakeFactor * 6;
        const ox = (Math.random() - 0.5) * shakeAmp;
        const oy = (Math.random() - 0.5) * shakeAmp;
        ctx.setTransform(dpr, 0, 0, dpr, ox * dpr, oy * dpr);
      } else {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      // Phase 1: Implosion / Pinch (0 <= p < 0.10)
      if (p < 0.10) {
        const ip = p / 0.10;
        // Keep pure black background before detonation
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        // Core shrinking sharply to pinpoint
        const pinchRadius = Math.max(2, 14 * (1 - ip));
        ctx.beginPath();
        ctx.arc(cx, cy, pinchRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        animId = requestAnimationFrame(render);
        return;
      }

      // Phase 2: Detonation & White Dissipation (0.10 <= p <= 1.0)
      const bp = (p - 0.10) / 0.90; // Burst progress [0, 1]

      // Fill black before the peak flash hits
      if (bp < 0.10) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
      }

      // 1. Full-Screen Pure White Flash
      let flashAlpha = 0;
      if (bp < 0.12) {
        flashAlpha = bp / 0.12;
      } else {
        const fadeP = (bp - 0.12) / 0.88;
        flashAlpha = Math.pow(1 - fadeP, 2.2); // Smooth ease-out dissipation
      }

      if (flashAlpha > 0.002) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha.toFixed(3)})`;
        ctx.fillRect(-20, -20, width + 40, height + 40);
      }

      // 2. Primary Pure White Shockwave Ring
      const sw1P = Math.min(bp * 1.35, 1);
      const easeSw1 = 1 - Math.pow(1 - sw1P, 3);
      const sw1Radius = maxRadius * easeSw1;
      const sw1Alpha = Math.max(0, 1 - sw1P * 1.05);
      const sw1Width = Math.max(1.5, 9 * (1 - sw1P));

      if (sw1Alpha > 0.01 && sw1Radius > 0) {
        // Outer soft glow ring
        ctx.beginPath();
        ctx.arc(cx, cy, sw1Radius, 0, Math.PI * 2);
        ctx.lineWidth = sw1Width * 2.2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${(sw1Alpha * 0.4).toFixed(3)})`;
        ctx.stroke();

        // Crisp core ring
        ctx.beginPath();
        ctx.arc(cx, cy, sw1Radius, 0, Math.PI * 2);
        ctx.lineWidth = sw1Width;
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw1Alpha.toFixed(3)})`;
        ctx.stroke();
      }

      // 3. Secondary Shockwave Ring (slightly trailing)
      if (bp >= 0.05) {
        const sw2P = Math.min((bp - 0.05) * 1.3, 1);
        const easeSw2 = 1 - Math.pow(1 - sw2P, 3);
        const sw2Radius = maxRadius * 0.88 * easeSw2;
        const sw2Alpha = Math.max(0, 1 - sw2P * 1.1);
        const sw2Width = Math.max(1, 6 * (1 - sw2P));

        if (sw2Alpha > 0.01 && sw2Radius > 0) {
          ctx.beginPath();
          ctx.arc(cx, cy, sw2Radius, 0, Math.PI * 2);
          ctx.lineWidth = sw2Width;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(sw2Alpha * 0.8).toFixed(3)})`;
          ctx.stroke();
        }
      }

      // 4. Central Supernova Detonation Core
      const coreP = Math.min(bp * 1.5, 1);
      const easeCore = 1 - Math.pow(1 - coreP, 3);
      const coreRadius = Math.min(cx, cy) * 0.75 * easeCore;
      const coreAlpha = Math.max(0, 1 - coreP * 1.1);

      if (coreAlpha > 0.01 && coreRadius > 5) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha.toFixed(3)})`);
        grad.addColorStop(0.35, `rgba(255, 255, 255, ${(coreAlpha * 0.7).toFixed(3)})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 5. 36 Radiant Rays
      const rayAlphaGlobal = Math.max(0, 1 - bp * 1.15);
      if (rayAlphaGlobal > 0.01) {
        ctx.beginPath();
        for (let i = 0; i < rays.length; i++) {
          const ray = rays[i];
          const rayP = Math.min(bp * ray.speed, 1);
          const rStart = maxRadius * 0.04 + maxRadius * 0.45 * (rayP * rayP);
          const rEnd = rStart + ray.length * (1 - Math.pow(1 - rayP, 2));

          ctx.moveTo(cx + ray.cos * rStart, cy + ray.sin * rStart);
          ctx.lineTo(cx + ray.cos * rEnd, cy + ray.sin * rEnd);
        }
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = `rgba(255, 255, 255, ${rayAlphaGlobal.toFixed(3)})`;
        ctx.stroke();
      }

      // 6. 48 Sparks with Motion Streaks
      const sparkAlphaGlobal = Math.max(0, 1 - bp * 1.1);
      if (sparkAlphaGlobal > 0.01) {
        ctx.beginPath();
        for (let i = 0; i < sparks.length; i++) {
          const sp = sparks[i];
          sp.x += sp.vx * dt;
          sp.y += sp.vy * dt;
          sp.vx *= Math.pow(0.86, dt * 60);
          sp.vy *= Math.pow(0.86, dt * 60);

          const speed = Math.hypot(sp.vx, sp.vy);
          const streak = Math.min(sp.length, speed * 0.04);
          const nx = sp.vx / (speed || 1);
          const ny = sp.vy / (speed || 1);

          ctx.moveTo(sp.x, sp.y);
          ctx.lineTo(sp.x - nx * streak, sp.y - ny * streak);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${sparkAlphaGlobal.toFixed(3)})`;
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${sparkAlphaGlobal.toFixed(3)})`;
        for (let i = 0; i < sparks.length; i++) {
          const sp = sparks[i];
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (p < 1) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [breaching]);

  // Letter-by-letter typewriter engine tuned for ~2-3 seconds per row
  useEffect(() => {
    if (alreadyBreached || breachedLocally) return;

    // Lock page scroll while cinematic intro is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let currentLine = 0;
    let currentChar = 0;
    let timer: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const typeNextChar = () => {
      if (isCancelled) return;

      if (currentLine >= INTRO_LINES.length) {
        setIsTyping(false);
        setReadyToBreach(true);
        return;
      }

      const lineText = INTRO_LINES[currentLine].text;

      if (currentChar < lineText.length) {
        currentChar++;
        const slice = lineText.slice(0, currentChar);
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = slice;
          return next;
        });
        // 24ms per character for snappy sci-fi terminal typing (~0.9-1.2s per line)
        timer = setTimeout(typeNextChar, 24);
      } else {
        // Line finished typing!
        if (currentLine < INTRO_LINES.length - 1) {
          // Pause ~1.35-1.4s (Total row cycle = ~2.4 - 2.6 seconds)
          timer = setTimeout(() => {
            if (isCancelled) return;
            currentLine++;
            currentChar = 0;
            setActiveLine(currentLine);
            typeNextChar();
          }, 1400);
        } else {
          // Last line finished typing, pause 1.0s before arming breach action (Total = ~2.1s)
          timer = setTimeout(() => {
            if (isCancelled) return;
            setIsTyping(false);
            setReadyToBreach(true);
          }, 1000);
        }
      }
    };

    // Initial 300ms pause in pure black space before typing initiates
    timer = setTimeout(typeNextChar, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [alreadyBreached, breachedLocally]);

  // Auto-countdown after all lines complete (3s countdown)
  useEffect(() => {
    if (!readyToBreach || breaching || alreadyBreached || breachedLocally) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          breachSingularity();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [readyToBreach, breaching, alreadyBreached, breachedLocally, breachSingularity]);

  // Keyboard shortcut listener (ESC, Space, Enter)
  useEffect(() => {
    if (alreadyBreached || breachedLocally) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        breachSingularity();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [alreadyBreached, breachedLocally, breachSingularity]);

  if (alreadyBreached || breachedLocally) return null;

  return (
    <div
      id="singularity-intro-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Event Horizon Breach Intro"
      suppressHydrationWarning
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden ${
        breaching ? "pointer-events-none" : ""
      }`}
      style={{
        backgroundColor: breaching ? "transparent" : "#000000",
      }}
    >
      {/* 60 FPS Hardware-Accelerated Canvas Explosion Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[100000] ${
          breaching ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Skip Button in Top-Right Corner */}
      <button
        type="button"
        onClick={breachSingularity}
        className={`absolute top-6 right-6 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] tracking-wider text-muted hover:border-cyan/50 hover:bg-white/10 hover:text-cyan transition-all duration-300 ${
          breaching ? "opacity-0 scale-75 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Skip cinematic intro"
      >
        <span>SKIP INTRO</span>
        <kbd className="rounded border border-white/20 bg-black/60 px-1 py-0.5 text-[9px] text-muted">
          ESC
        </kbd>
      </button>

      {/* The Central Singularity & Accretion Disk (Pre-Breach) */}
      <div
        className={`relative flex items-center justify-center transition-opacity duration-150 ${
          breaching ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Pre-breach Radiating Gravitational Shockwave Rings */}
        <div
          aria-hidden="true"
          className={`absolute h-44 w-44 sm:h-64 sm:w-64 rounded-full border border-cyan/20 animate-ping transition-transform duration-700 ${
            activeLine >= 1 ? "opacity-40" : "opacity-15"
          }`}
          style={{ animationDuration: "3s" }}
        />
        <div
          aria-hidden="true"
          className={`absolute h-60 w-60 sm:h-80 sm:w-80 rounded-full border border-violet/20 animate-pulse transition-opacity duration-700 ${
            activeLine >= 2 ? "opacity-60" : "opacity-15"
          }`}
        />

        {/* Accretion Disk Simulation */}
        <div
          aria-hidden="true"
          className="h-32 w-32 sm:h-44 sm:w-44 rounded-full border border-cyan/50 bg-gradient-to-tr from-cyan/15 via-violet/25 to-gold/20 blur-sm animate-spin transition-all duration-700"
          style={{
            animationDuration: activeLine === 0 ? "12s" : activeLine === 1 ? "8s" : "4.5s",
          }}
        />

        {/* Relativistic Photon Sphere Ring */}
        <div
          aria-hidden="true"
          className="absolute h-20 w-20 sm:h-28 sm:w-28 rounded-full border border-cyan/70 shadow-[0_0_30px_rgba(79,214,224,0.35)] animate-pulse"
        />

        {/* Central Core Singularity Point */}
        <div
          className={`absolute rounded-full bg-white transition-all ${
            activeLine >= 2
              ? "h-5 w-5 sm:h-6 sm:w-6 shadow-[0_0_25px_#ffffff,0_0_50px_var(--cyan),0_0_75px_var(--violet)] animate-pulse duration-700"
              : activeLine >= 1
              ? "h-4 w-4 sm:h-5 sm:w-5 shadow-[0_0_20px_#ffffff,0_0_35px_var(--cyan)] duration-700"
              : "h-3.5 w-3.5 sm:h-4 sm:w-4 shadow-[0_0_15px_#ffffff] duration-700"
          }`}
        />
      </div>

      {/* Telemetry Status Readout with Letter-by-Letter Typewriter */}
      <div
        className={`relative z-10 mt-14 flex flex-col items-center text-center font-mono w-full max-w-xl px-6 transition-all duration-150 ${
          breaching ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="min-h-[105px] flex flex-col items-center justify-center space-y-2.5 text-xs sm:text-sm">
          {INTRO_LINES.map((line, idx) => {
            const text = displayedLines[idx];
            if (!text && idx > activeLine) return null;

            const isCurrentlyActive = idx === activeLine && (isTyping || !readyToBreach);
            const isCompleted = text.length === line.text.length;

            return (
              <p
                key={idx}
                className={`tracking-widest ${line.color} transition-all duration-300 flex items-center justify-center font-medium`}
              >
                <span>{text}</span>
                {isCurrentlyActive && (
                  <span
                    className="inline-block w-2 ml-1 text-cyan animate-pulse font-bold"
                    aria-hidden="true"
                  >
                    ▌
                  </span>
                )}
                {isCompleted && !isCurrentlyActive && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-cyan/60 ml-2 animate-ping"
                    aria-hidden="true"
                  />
                )}
              </p>
            );
          })}
        </div>

        {/* Breach Action Button (Emerges once lines finish generating) */}
        <div
          className={`mt-8 flex flex-col items-center gap-3 transition-all duration-500 ${
            readyToBreach && !breaching
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={breachSingularity}
            className="group relative inline-flex items-center gap-3 rounded-full border border-white/60 bg-black/90 px-7 py-3 font-mono text-xs font-semibold tracking-widest text-white shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-300 hover:border-white hover:bg-white/15 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span>BREACH EVENT HORIZON</span>
            <span className="text-white/60 group-hover:text-white transition-colors text-sm">
              →
            </span>
          </button>

          <span className="text-[11px] text-muted tracking-wider">
            Auto-entering in {countdown}s • [Press SPACE or ENTER]
          </span>
        </div>
      </div>
    </div>
  );
}
