"use client";

import { useSyncExternalStore, useEffect } from "react";
import { profile } from "@/data/portfolio";
import TextType from "@/components/TextType";
import BlackHole from "@/components/BlackHole";
import DevStatus from "@/components/DevStatus";
import ScrollCue from "@/components/ScrollCue";
import MagneticButton from "@/components/MagneticButton";

function subscribeIntro(callback: () => void) {
  window.addEventListener("singularity:breached", callback);
  window.addEventListener("singularity:elements-enter", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("singularity:breached", callback);
    window.removeEventListener("singularity:elements-enter", callback);
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

function getElementsSnapshot() {
  try {
    return (
      document.documentElement.classList.contains("hero-elements-entered") ||
      sessionStorage.getItem("singularity_breached") === "true"
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
    subscribeIntro,
    getIntroSnapshot,
    getServerSnapshot,
  );

  const elementsEntered = useSyncExternalStore(
    subscribeIntro,
    getElementsSnapshot,
    getServerSnapshot,
  );

  // Fallback watchdog: If intro was breached but elements haven't entered after 1.5s, trigger them
  useEffect(() => {
    if (introBreached && !elementsEntered) {
      const timer = setTimeout(() => {
        try {
          document.documentElement.classList.add("hero-elements-entered");
          window.dispatchEvent(new CustomEvent("singularity:elements-enter"));
        } catch {}
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [introBreached, elementsEntered]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center gap-10 px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-0 lg:px-12 xl:px-16 2xl:px-20 max-w-[1600px] mx-auto"
    >
      {/* Left Column: Expansive Hero Content Card (Slides in smoothly 1.3s after the Black Hole appears) */}
      <div
        className={`relative z-10 flex flex-1 flex-col items-start gap-5 sm:gap-6 text-left max-w-2xl lg:max-w-3xl xl:max-w-4xl min-w-0 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          elementsEntered
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
          pauseDuration={2200}
          showCursor
          cursorCharacter="_"
          loop={false}
          start={elementsEntered}
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
        className={`relative shrink-0 flex items-center justify-center h-[340px] w-full sm:h-[420px] md:h-[500px] md:w-[460px] lg:h-[580px] lg:w-[540px] xl:h-[660px] xl:w-[620px] 2xl:h-[720px] 2xl:w-[680px] transition-all duration-1000 ease-out ${
          introBreached
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90"
        }`}
      >
        <BlackHole />
      </div>

      <div
        className={`hidden md:flex transition-opacity duration-700 ease-out ${
          elementsEntered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ScrollCue />
      </div>
    </section>
  );
}
