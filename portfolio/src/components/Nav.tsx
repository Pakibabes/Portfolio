"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { navLinks, profile } from "@/data/portfolio";

const sectionIds = ["hero", ...navLinks.map((l) => l.href.slice(1))];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

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

    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md bg-void/80 border-b border-panel-line sm:px-6 sm:py-4 md:px-12">
      <a
        href="#hero"
        className="group relative flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11"
        aria-label="Home"
      >
        <span className="absolute inset-0 rounded-full border border-violet/40 transition-transform duration-700 group-hover:rotate-180" />
        <Image
          src="/icons/black_hole_logo.svg"
          alt="Home"
          width={26}
          height={26}
          className="relative z-10 rounded-full sm:h-7 sm:w-7"
        />
      </a>

      {/* Mobile controls */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={triggerCommandPalette}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-panel-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan active:bg-panel"
          aria-label="Open command palette"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-panel-line text-text transition-colors hover:border-cyan/50 hover:text-cyan active:bg-panel"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop menu */}
      <ul className="hidden items-center gap-8 font-mono text-xs tracking-[0.2em] text-muted md:flex">
        {navLinks.map((link) => {
          const id = link.href.slice(1);
          const isActive = active === id;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative transition-colors hover:text-cyan ${
                  isActive ? "text-cyan" : ""
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

      {/* Desktop Command Palette trigger */}
      <button
        type="button"
        onClick={triggerCommandPalette}
        className="hidden items-center gap-2 rounded-lg border border-panel-line px-3 py-1.5 font-mono text-[10px] tracking-wider text-muted transition-colors hover:border-cyan/50 hover:text-cyan md:flex"
        aria-label="Open command palette"
      >
        <span>⌘K</span>
      </button>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 border-b border-panel-line bg-void/98 backdrop-blur-xl px-4 py-4 shadow-2xl md:hidden">
          <ul className="flex flex-col gap-1 font-mono text-xs">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 transition-colors ${
                      isActive
                        ? "bg-panel text-cyan"
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

          <div className="mt-3 flex items-center gap-2 pt-3 border-t border-panel-line font-mono text-xs">
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-panel-line bg-panel py-2.5 text-center font-medium text-text transition-colors hover:border-cyan hover:text-cyan"
            >
              Resume ↗
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerCommandPalette();
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-panel-line bg-panel py-2.5 text-center text-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <span>Search</span>
              <kbd className="rounded border border-panel-line px-1 text-[10px]">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
