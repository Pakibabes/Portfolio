"use client";

import { useSyncExternalStore, useEffect } from "react";
import { profile } from "@/data/portfolio";
import TextType from "@/components/TextType";
import BlackHole from "@/components/BlackHole";
import DevStatus from "@/components/DevStatus";
import ScrollCue from "@/components/ScrollCue";
import MagneticButton from "@/components/MagneticButton";

function subscribeHero(callback: () => void) {
  window.addEventListener("singularity:breached", callback);
  window.addEventListener("entrance:nav", callback);
  window.addEventListener("entrance:hero", callback);
  window.addEventListener("entrance:bottom", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("singularity:breached", callback);
    window.removeEventListener("entrance:nav", callback);
    window.removeEventListener("entrance:hero", callback);
    window.removeEventListener("entrance:bottom", callback);
    window.removeEventListener("storage", callback);
  };
}

function getIntroSnapshot() {
  try {
    return (
      document.documentElement.classList.contains("intro-breached") ||
      sessionStorage.getItem("singularity_breached") === "true"
    );
  } catch {
    return false;
  }
}

function getNavSnapshot() {
  try {
    return (
      document.documentElement.classList.contains("entrance-nav") ||
      sessionStorage.getItem("hero_elements_entered") === "true"
    );
  } catch {
    return false;
  }
}

function getHeroCardSnapshot() {
  try {
    return (
      document.documentElement.classList.contains("entrance-hero") ||
      sessionStorage.getItem("hero_elements_entered") === "true"
    );
  } catch {
    return false;
  }
}

function getBottomSnapshot() {
  try {
    return (
      document.documentElement.classList.contains("entrance-bottom") ||
      sessionStorage.getItem("hero_elements_entered") === "true"
    );
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export default function Hero() {
  const introBreached = useSyncExternalStore(
    subscribeHero,
    getIntroSnapshot,
    getServerSnapshot,
  );

  const navEntered = useSyncExternalStore(
    subscribeHero,
    getNavSnapshot,
    getServerSnapshot,
  );

  const heroCardEntered = useSyncExternalStore(
    subscribeHero,
    getHeroCardSnapshot,
    getServerSnapshot,
  );

  const bottomEntered = useSyncExternalStore(
    subscribeHero,
    getBottomSnapshot,
    getServerSnapshot,
  );

  // On mobile: smoothly pan down to center the Black Hole when the explosion ends
  useEffect(() => {
    if (!introBreached || bottomEntered) return;

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const panDownTimer = setTimeout(() => {
        const el = document.getElementById("hero-black-hole");
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        }
      }, 70);

      return () => clearTimeout(panDownTimer);
    }
  }, [introBreached, bottomEntered]);

  // Cascading sequential entrance (Top navbar -> Hero card -> Bottom elements)
  useEffect(() => {
    if (!introBreached || bottomEntered) return;

    let stage2Timer: ReturnType<typeof setTimeout>;
    let stage3Timer: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const startEntranceSequence = () => {
      if (isCancelled) return;

      // Stage 1: Top Navigation Bar slides down
      try {
        document.documentElement.classList.add("entrance-nav");
        window.dispatchEvent(new CustomEvent("entrance:nav"));
      } catch {}

      // Stage 2: 1.0s (1000ms) interval after Top Navbar - Pan back to hero on mobile + Hero presentation card glides in
      stage2Timer = setTimeout(() => {
        if (isCancelled) return;
        try {
          if (typeof window !== "undefined" && window.innerWidth < 768) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          document.documentElement.classList.add("entrance-hero");
          window.dispatchEvent(new CustomEvent("entrance:hero"));
        } catch {}
      }, 1000);

      // Stage 3: 800ms after Hero Card (1800ms total) - Bottom elements (HUD, scroll cue, hints) slide up
      stage3Timer = setTimeout(() => {
        if (isCancelled) return;
        try {
          document.documentElement.classList.add("entrance-bottom");
          document.documentElement.classList.add("hero-elements-entered");
          sessionStorage.setItem("hero_elements_entered", "true");
          window.dispatchEvent(new CustomEvent("entrance:bottom"));
        } catch {}
      }, 1800);
    };

    // Auto-slide in 1.5 seconds after solo Black Hole showcase
    const stage1Timer = setTimeout(startEntranceSequence, 1500);

    // Double-click or double-tap to fast-forward immediately
    let lastTapTime = 0;
    const handlePointerDown = () => {
      const now = Date.now();
      if (now - lastTapTime < 450) {
        clearTimeout(stage1Timer);
        clearTimeout(stage2Timer);
        clearTimeout(stage3Timer);
        startEntranceSequence();
      }
      lastTapTime = now;
    };

    const handleDblClick = () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      startEntranceSequence();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        clearTimeout(stage1Timer);
        clearTimeout(stage2Timer);
        clearTimeout(stage3Timer);
        startEntranceSequence();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      isCancelled = true;
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [introBreached, bottomEntered]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center gap-10 px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-0 lg:px-12 xl:px-16 2xl:px-20 max-w-[1600px] mx-auto"
    >
      {/* Left Column: Expansive Hero Content Card (Stage 2: Glides in gracefully) */}
      <div
        className={`relative z-10 flex flex-1 flex-col items-start gap-5 sm:gap-6 text-left max-w-2xl lg:max-w-3xl xl:max-w-4xl min-w-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          heroCardEntered
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-12 pointer-events-none"
        }`}
      >
        <DevStatus />

        <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-cyan">
          {profile.tagline.toUpperCase()}
        </span>

        <h1 className="font-display w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-text">
          <span className="block text-xl sm:text-2xl font-medium text-muted md:text-3xl mb-1.5">
            Hi, I&apos;m
          </span>
          <span>{profile.name.split(" ").slice(0, -1).join(" ")} </span>
          <span className="text-cyan animate-glow inline-block">
            {profile.name.split(" ").slice(-1)}
          </span>
        </h1>

        <TextType
          as="p"
          text={[profile.bio]}
          className="w-full max-w-2xl lg:max-w-3xl min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[5.5rem] text-sm sm:text-base md:text-lg leading-relaxed text-muted"
          typingSpeed={38}
          initialDelay={300}
          pauseDuration={2200}
          showCursor
          cursorCharacter="_"
          loop={false}
          start={heroCardEntered}
        />

        <div className="flex w-full sm:w-auto items-center gap-3 sm:gap-4 pt-2 font-mono text-xs sm:text-sm">
          <MagneticButton className="flex-1 sm:flex-initial">
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary block w-full text-center rounded-full bg-text px-6 py-3 font-semibold text-void transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
            >
              Resume
            </a>
          </MagneticButton>
          <MagneticButton className="flex-1 sm:flex-initial">
            <a
              href="#contact"
              className="cta-secondary block w-full text-center rounded-full border border-panel-line px-6 py-3 text-text transition-colors hover:border-cyan hover:text-cyan active:bg-panel"
            >
              Contact
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Right Column: 3D Black Hole at the Right Side (Revealed FIRST upon singularity breach) */}
      <div
        id="hero-black-hole"
        className={`relative shrink-0 flex items-center justify-center h-[340px] w-full sm:h-[420px] md:h-[500px] md:w-[460px] lg:h-[580px] lg:w-[540px] xl:h-[660px] xl:w-[620px] 2xl:h-[720px] 2xl:w-[680px] transition-all duration-1000 ease-out ${
          introBreached
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90"
        }`}
      >
        <BlackHole />
      </div>

      {/* Solo Black Hole phase indicator (Fades out when Stage 1 navbar starts) */}
      {introBreached && !navEntered && (
        <div
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-void/80 px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-muted backdrop-blur-md animate-pulse"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          <span className="hidden sm:inline">DOUBLE-CLICK TO ENTER</span>
          <span className="sm:hidden">DOUBLE-TAP TO ENTER</span>
          <span className="text-white/20">•</span>
          <span className="text-[9px] text-muted/60">SPACE / ENTER</span>
        </div>
      )}

      {/* Stage 3: Scroll cue and bottom elements fade in 1000ms after navbar */}
      <div
        className={`hidden md:flex transition-all duration-600 ease-out ${
          bottomEntered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ScrollCue />
      </div>
    </section>
  );
}
