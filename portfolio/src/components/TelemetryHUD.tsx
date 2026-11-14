"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { profile } from "@/data/portfolio";

function subscribeHUD(callback: () => void) {
  window.addEventListener("entrance:bottom", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("entrance:bottom", callback);
    window.removeEventListener("storage", callback);
  };
}

function getHUDSnapshot() {
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

export default function TelemetryHUD() {
  const bottomEntered = useSyncExternalStore(
    subscribeHUD,
    getHUDSnapshot,
    getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating HUD Trigger (Stage 3: Slides up with bottom elements) */}
      <div
        className={`fixed bottom-5 right-5 z-40 hidden sm:block transition-all duration-600 ease-out ${
          bottomEntered
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 rounded-full border border-panel-line bg-void/85 px-3.5 py-2 font-mono text-[11px] text-muted backdrop-blur-md transition-all duration-300 hover:border-cyan hover:text-cyan hover:shadow-lg hover:shadow-cyan/10 active:scale-95"
          aria-label="Open System Telemetry HUD"
        >
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
          <span className="tracking-wider">SYS_HUD // 4TH_YEAR_CS</span>
          <span className="rounded bg-panel px-1.5 py-0.5 text-[9px] text-muted group-hover:text-cyan border border-panel-line/60">
            ✦
          </span>
        </button>
      </div>

      {/* Floating Telemetry Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-cyan/40 bg-panel/95 p-6 shadow-2xl shadow-cyan/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Scanning Line Effect */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan to-transparent animate-pulse"
            />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-panel-line pb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan animate-ping" />
                <span className="font-bold tracking-widest text-cyan uppercase">
                  CITU_SYS // ORBITAL TELEMETRY
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-panel-line text-muted hover:border-cyan hover:text-cyan transition-colors"
                aria-label="Close telemetry"
              >
                ✕
              </button>
            </div>

            {/* Diagnostics Content */}
            <div className="mt-5 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="rounded-lg border border-panel-line/70 bg-void/60 p-3">
                  <span className="text-[10px] text-muted tracking-wider uppercase">
                    Operator
                  </span>
                  <div className="mt-1 font-bold text-text">{profile.name}</div>
                  <div className="text-cyan text-[10px]">Senior CS @ CIT-U</div>
                </div>

                <div className="rounded-lg border border-panel-line/70 bg-void/60 p-3">
                  <span className="text-[10px] text-muted tracking-wider uppercase">
                    Field Internship
                  </span>
                  <div className="mt-1 font-bold text-text">Metawatt LLC</div>
                  <div className="text-violet text-[10px]">
                    350 Hours • DevOps Certified
                  </div>
                </div>
              </div>

              {/* Stack Telemetry */}
              <div className="rounded-lg border border-panel-line/70 bg-void/60 p-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-[10px] text-muted tracking-wider uppercase">
                  <span>Core Architecture</span>
                  <span className="text-emerald-400">● 100% NOMINAL</span>
                </div>
                <div className="text-text space-y-1">
                  <p>• Frameworks: Next.js 16 (Turbopack), NestJS, React 19</p>
                  <p>• AI Core: ORCA Framework, Agent Orchestration, Skills</p>
                  <p>• DevOps & Cloud: GitHub Actions CI/CD, Supabase</p>
                  <p>• Web3: Cardano Blockchain, IPFS Protocol</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-panel-line text-[11px]">
                <a
                  href="#experience"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-panel-line bg-void px-3 py-1 text-muted hover:border-cyan hover:text-cyan transition-colors"
                >
                  Jump to OJT ↗
                </a>
                <a
                  href="#projects"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-panel-line bg-void px-3 py-1 text-muted hover:border-cyan hover:text-cyan transition-colors"
                >
                  Jump to Projects ↗
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-text px-4 py-1 text-void font-semibold hover:scale-105 active:scale-95 transition-transform"
                >
                  Close HUD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
