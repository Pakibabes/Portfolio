"use client";

import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@/data/portfolio";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-void/60 border-b border-panel-line md:px-12">
      <a href="#hero" className="group relative flex h-11 w-11 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-violet/40 transition-transform duration-700 group-hover:rotate-180" />
        <Image
          src="/icons/black_hole_logo.png"
          alt="Home"
          width={28}
          height={28}
          className="relative z-10 rounded-full"
        />
      </a>

      <button
        aria-label="Toggle menu"
        className="text-2xl text-text md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "✕" : "☰"}
      </button>

      <ul className="hidden items-center gap-8 font-mono text-xs tracking-[0.2em] text-muted md:flex">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="transition-colors hover:text-cyan"
            >
              {link.label.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>

      {open && (
        <ul className="absolute top-full left-0 right-0 flex flex-col gap-1 border-b border-panel-line bg-void/95 px-6 py-4 font-mono text-sm text-muted md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 transition-colors hover:text-cyan"
                onClick={() => setOpen(false)}
              >
                {link.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
