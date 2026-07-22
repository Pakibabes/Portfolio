"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { navLinks } from "@/data/portfolio";

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-void/60 border-b border-panel-line md:px-12">
      <a
        href="#hero"
        className="group relative flex h-11 w-11 items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full border border-violet/40 transition-transform duration-700 group-hover:rotate-180" />
        <Image
          src="/icons/black_hole_logo.svg"
          alt="Home"
          width={28}
          height={28}
          className="relative z-10 rounded-full"
        />
      </a>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        className="text-2xl text-text md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "✕" : "☰"}
      </button>

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

      <button
        type="button"
        onClick={() =>
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
          )
        }
        className="hidden items-center gap-2 rounded-lg border border-panel-line px-3 py-1.5 font-mono text-[10px] tracking-wider text-muted transition-colors hover:border-cyan/50 hover:text-cyan md:flex"
        aria-label="Open command palette"
      >
        <span>⌘K</span>
      </button>

      {open && (
        <ul className="absolute top-full left-0 right-0 flex flex-col gap-1 border-b border-panel-line bg-void/95 px-6 py-4 font-mono text-sm text-muted md:hidden">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block py-2 transition-colors hover:text-cyan ${
                    active === id ? "text-cyan" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label.toUpperCase()}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
