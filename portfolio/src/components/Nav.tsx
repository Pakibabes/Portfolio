"use client";

import Image from "next/image";
import { useState, useEffect, useSyncExternalStore } from "react";
import { navLinks, profile } from "@/data/portfolio";

const sectionIds = ["hero", ...navLinks.map((l) => l.href.slice(1))];

function subscribeNav(callback: () => void) {
  window.addEventListener("entrance:nav", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("entrance:nav", callback);
    window.removeEventListener("storage", callback);
  };
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

function subscribeSysHud(callback: () => void) {
  window.addEventListener("syshud:change", callback);
  return () => window.removeEventListener("syshud:change", callback);
}

function getSysHudSnapshot() {
  try {
    return document.documentElement.classList.contains("syshud-modal-open");
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export default function Nav() {
  const navEntered = useSyncExternalStore(
    subscribeNav,
    getNavSnapshot,
    getServerSnapshot,
  );
  const isSysHudOpen = useSyncExternalStore(
    subscribeSysHud,
    getSysHudSnapshot,
    getServerSnapshot,
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const isMenuOpen = open && !isSysHudOpen;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 340);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const triggerCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
    );
  };

  return (
    <>
      {/* ================================================================= */}
      {/* 1. FULL TOP NAVBAR (Visible in Hero section at top of page)       */}
      {/* ================================================================= */}
      <header
        aria-label="Top Navigation"
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-panel-line bg-void/80 px-4 py-3 backdrop-blur-md transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 sm:py-4 md:px-12 ${
          !navEntered || scrolledPastHero || isSysHudOpen
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#hero"
            className="group relative flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10"
            aria-label="Back to top"
          >
            <span className="absolute inset-0 rounded-full border border-violet/40 transition-transform duration-700 group-hover:rotate-180" />
            <Image
              src="/icons/logo.png"
              alt="John Lyster Logo"
              width={26}
              height={26}
              priority
              className="relative z-10 rounded-full object-contain sm:h-7 sm:w-7"
            />
          </a>

          {/* Full Desktop Navigation Links */}
          <ul className="hidden items-center gap-8 font-mono text-xs tracking-[0.2em] text-muted md:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative transition-colors hover:text-cyan ${
                      isActive ? "text-cyan font-semibold" : ""
                    }`}
                  >
                    {link.label.toUpperCase()}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-violet to-cyan" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan sm:rounded-full sm:px-3 sm:py-1 sm:h-auto sm:w-auto font-mono text-xs"
              aria-label="Open command palette"
            >
              <span className="hidden sm:inline">⌘K</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:hidden"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Mobile-only toggle when at the top */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-line text-text transition-colors hover:border-cyan/50 hover:text-cyan md:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              {isMenuOpen ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu when at top */}
        {isMenuOpen && !scrolledPastHero && (
          <div className="absolute top-full left-0 right-0 border-b border-panel-line bg-void/95 p-4 backdrop-blur-2xl md:hidden">
            <ul className="flex flex-col gap-1 font-mono text-xs">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-panel text-cyan border border-cyan/20"
                          : "text-muted hover:bg-panel/60 hover:text-text"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="tracking-[0.15em] font-medium">
                        {link.label.toUpperCase()}
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(79,214,224,0.8)]" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      {/* ================================================================= */}
      {/* 2. FLOATING DYNAMIC ISLAND CAPSULE DOCK (When scrolled past Hero) */}
      {/* ================================================================= */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSysHudOpen ? "z-[60]" : "z-50"
        } ${
          scrolledPastHero || isSysHudOpen
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "-translate-y-16 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Floating Navigation Dock"
          className={`relative flex items-center gap-2.5 rounded-full border bg-void/90 px-3.5 py-1.5 backdrop-blur-xl shadow-2xl transition-colors ${
            isSysHudOpen
              ? "border-cyan/50 shadow-cyan/15"
              : "border-panel-line/80 shadow-cyan/5"
          }`}
        >
          {/* Logo link back to Hero */}
          <a
            href="#hero"
            className="group relative flex h-7 w-7 items-center justify-center shrink-0"
            aria-label="Scroll back to top"
          >
            <span className="absolute inset-0 rounded-full border border-violet/30 transition-transform duration-700 group-hover:rotate-180" />
            <Image
              src="/icons/logo.png"
              alt="Logo"
              width={20}
              height={20}
              className="relative z-10 rounded-full object-contain"
            />
          </a>

          {/* Divider */}
          <span className="h-4 w-px bg-panel-line/60" aria-hidden="true" />

          {/* When SysHUD modal is open: only show "System Hud" beside the logo */}
          {isSysHudOpen ? (
            <span className="font-mono text-xs font-bold tracking-widest text-cyan uppercase px-1">
              System Hud
            </span>
          ) : (
            <>
              {/* Active Section Indicator Pill */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                <span className="uppercase tracking-widest font-semibold max-w-[100px] truncate sm:max-w-none">
                  {active}
                </span>
              </div>

              {/* Divider */}
              <span className="h-4 w-px bg-panel-line/60" aria-hidden="true" />

              {/* Hamburger Menu Trigger Button */}
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium transition-all ${
                  isMenuOpen
                    ? "bg-cyan/15 text-cyan border border-cyan/40"
                    : "border border-panel-line bg-panel/70 text-text hover:border-cyan/50 hover:text-cyan"
                }`}
              >
                <span className="text-[11px]">{isMenuOpen ? "✕" : "☰"}</span>
                <span className="tracking-wider">{isMenuOpen ? "CLOSE" : "MENU"}</span>
              </button>

              {/* Search trigger in floating dock */}
              <button
                type="button"
                onClick={triggerCommandPalette}
                aria-label="Open command palette"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-panel-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </>
          )}

          {/* Floating Dropdown Menu (Under the Island Dock) */}
          {isMenuOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl border border-panel-line bg-void/95 p-3 backdrop-blur-2xl shadow-2xl shadow-cyan/10">
              <ul className="flex flex-col gap-1 font-mono text-xs">
                {navLinks.map((link) => {
                  const id = link.href.slice(1);
                  const isActive = active === id;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors ${
                          isActive
                            ? "bg-panel text-cyan border border-cyan/25 font-semibold"
                            : "text-muted hover:bg-panel/60 hover:text-text"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        <span className="tracking-[0.15em]">
                          {link.label.toUpperCase()}
                        </span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(79,214,224,0.8)]" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-2.5 flex items-center gap-2 pt-2.5 border-t border-panel-line font-mono text-xs">
                <a
                  href={profile.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-panel-line bg-panel py-2 text-center font-medium text-text transition-colors hover:border-cyan hover:text-cyan"
                >
                  Resume ↗
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    triggerCommandPalette();
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-panel-line bg-panel py-2 text-center text-muted transition-colors hover:border-cyan hover:text-cyan"
                >
                  <span>Search</span>
                  <kbd className="rounded border border-panel-line px-1 text-[9px]">
                    ⌘K
                  </kbd>
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
