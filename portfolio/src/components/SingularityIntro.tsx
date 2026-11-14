"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";

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

// 28 pure white blast rays in 360 degrees
const BLAST_RAY_ANGLES = Array.from({ length: 28 }, (_, i) => (i * 360) / 28);

// 20 pure white spark particles
const SPARK_ANGLES = Array.from({ length: 20 }, (_, i) => i * 18 + 9);

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

  // Typewriter state
  const [displayedLines, setDisplayedLines] = useState<string[]>(["", "", ""]);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [readyToBreach, setReadyToBreach] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  const breachSingularity = useCallback(() => {
    if (breaching || breachedLocally || alreadyBreached) return;
    setBreaching(true);

    // Allow the 950ms pure white explosion sequence to play on screen before updating storage
    setTimeout(() => {
      try {
        sessionStorage.setItem("singularity_breached", "true");
        document.documentElement.classList.add("intro-breached");
      } catch {
        // sessionStorage unavailable
      }
      setBreachedLocally(true);
      document.body.style.overflow = "";
    }, 950);
  }, [breaching, breachedLocally, alreadyBreached]);

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
        backgroundColor: "#000000",
        animation: breaching
          ? "screen-quake 0.55s ease-out forwards, container-dissolve 0.95s cubic-bezier(0.4, 0, 0.2, 1) forwards"
          : undefined,
      }}
    >
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

      {/* The Central Singularity & Pure White Explosion Center */}
      <div className="relative flex items-center justify-center">
        {/* Pre-breach Radiating Gravitational Shockwave Rings */}
        {!breaching && (
          <>
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
          </>
        )}

        {/* ============================================================== */}
        {/* PURE WHITE EXPLOSION DETONATION (Active upon Breach)           */}
        {/* ============================================================== */}
        {breaching && (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* 1. Primary Pure White Shockwave Ring */}
            <div
              className="absolute h-52 w-52 rounded-full border-white shadow-[0_0_90px_#ffffff,inset_0_0_50px_#ffffff] pointer-events-none z-30"
              style={{
                animation: "white-shockwave-primary 0.9s cubic-bezier(0.1, 0.85, 0.2, 1) forwards",
              }}
            />

            {/* 2. Secondary Pure White Shockwave Ring */}
            <div
              className="absolute h-52 w-52 rounded-full border-white/80 shadow-[0_0_120px_#ffffff] pointer-events-none z-30"
              style={{
                animation: "white-shockwave-secondary 0.95s cubic-bezier(0.12, 0.85, 0.25, 1) forwards",
                animationDelay: "40ms",
              }}
            />

            {/* 3. 28 Pure White Radiant Rays Shooting in 360 Degrees */}
            {BLAST_RAY_ANGLES.map((angle, idx) => (
              <div
                key={`white-ray-${angle}`}
                className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-35"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="absolute bottom-0 -left-0.5 w-1 sm:w-1.5 rounded-full origin-bottom"
                  style={{
                    height: idx % 2 === 0 ? "140px" : "190px",
                    background: "linear-gradient(to top, transparent, rgba(255,255,255,0.7), #ffffff)",
                    boxShadow: "0 0 25px #ffffff, 0 0 50px #ffffff",
                    animation: "white-ray-shoot 0.9s cubic-bezier(0.1, 0.85, 0.2, 1) forwards",
                    animationDelay: `${(idx % 4) * 12}ms`,
                  }}
                />
              </div>
            ))}

            {/* 4. 20 Pure White Spark Particles */}
            {SPARK_ANGLES.map((angle, idx) => (
              <div
                key={`white-spark-${angle}`}
                className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-35"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="absolute bottom-0 -left-1 h-2 w-2 rounded-full bg-white shadow-[0_0_20px_#ffffff,0_0_40px_#ffffff]"
                  style={{
                    animation: "white-spark-shoot 0.85s cubic-bezier(0.12, 0.85, 0.25, 1) forwards",
                    animationDelay: `${(idx % 5) * 15}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Central Core (Implodes then Detonates into Pure White Supernova Core) */}
        <div
          className={`absolute rounded-full bg-white transition-all ${
            breaching
              ? "h-20 w-20 shadow-[0_0_150px_#ffffff,0_0_300px_#ffffff] z-40 pointer-events-none"
              : activeLine >= 2
              ? "h-5 w-5 sm:h-6 sm:w-6 shadow-[0_0_25px_#ffffff,0_0_50px_var(--cyan),0_0_75px_var(--violet)] animate-pulse duration-700"
              : activeLine >= 1
              ? "h-4 w-4 sm:h-5 sm:w-5 shadow-[0_0_20px_#ffffff,0_0_35px_var(--cyan)] duration-700"
              : "h-3.5 w-3.5 sm:h-4 sm:w-4 shadow-[0_0_15px_#ffffff] duration-700"
          }`}
          style={
            breaching
              ? {
                  animation: "white-core-explosion 0.9s cubic-bezier(0.12, 0.82, 0.25, 1) forwards",
                }
              : undefined
          }
        />
      </div>

      {/* Telemetry Status Readout with Letter-by-Letter Typewriter */}
      <div
        className={`relative z-10 mt-14 flex flex-col items-center text-center font-mono w-full max-w-xl px-6 transition-all duration-200 ${
          breaching ? "opacity-0 scale-50 pointer-events-none" : "opacity-100"
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

      {/* 5. Pure White Radial Flash Transition */}
      {breaching && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100000]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.5) 65%, transparent 88%)",
            animation: "white-flash-burst 0.9s cubic-bezier(0.12, 0.8, 0.25, 1) forwards",
          }}
        />
      )}
    </div>
  );
}
