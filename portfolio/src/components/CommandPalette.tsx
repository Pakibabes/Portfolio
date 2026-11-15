"use client";

import { useEffect, useState, useCallback } from "react";
import { navLinks, profile } from "@/data/portfolio";
import { replayCinematicIntro } from "@/lib/replay";

const commands = [
  ...navLinks.map((link) => ({
    id: link.href,
    label: `Go to ${link.label}`,
    href: link.href,
    group: "Navigate",
  })),
  {
    id: "resume",
    label: "Open Resume",
    href: profile.resumeHref,
    group: "Actions",
    external: true,
  },
  {
    id: "github",
    label: "Open GitHub",
    href: profile.socials[0].href,
    group: "Actions",
    external: true,
  },
  {
    id: "email",
    label: "Copy Email",
    action: "copy-email" as const,
    group: "Actions",
  },
  {
    id: "replay-intro",
    label: "Replay Cinematic Intro",
    action: "replay-intro" as const,
    group: "Actions",
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    setCopied(false);
  }, []);

  const execute = useCallback(
    (cmd: (typeof commands)[number]) => {
      if ("action" in cmd && cmd.action === "copy-email") {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(close, 800);
        return;
      }
      if ("action" in cmd && cmd.action === "replay-intro") {
        close();
        replayCinematicIntro();
        return;
      }
      if ("href" in cmd && cmd.href) {
        if ("external" in cmd && cmd.external) {
          window.open(cmd.href, "_blank", "noopener,noreferrer");
        } else {
          document.querySelector(cmd.href)?.scrollIntoView({ behavior: "smooth" });
        }
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActiveIndex(0);
        setCopied(false);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        execute(filtered[activeIndex]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIndex, execute]);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-void/80 px-3 pt-12 sm:px-4 sm:pt-[15vh] backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl sm:rounded-2xl border border-panel-line bg-panel shadow-2xl shadow-violet/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-3 border-b border-panel-line px-3.5 py-3 sm:px-4">
          <span className="font-mono text-xs text-cyan shrink-0">⌘K</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Jump to a section or action…"
            className="flex-1 bg-transparent font-mono text-base sm:text-sm text-text outline-none placeholder:text-muted"
          />
          {copied && (
            <span className="font-mono text-xs text-cyan shrink-0">Copied!</span>
          )}
          <button
            type="button"
            onClick={close}
            aria-label="Close command palette"
            className="flex h-7 w-7 items-center justify-center rounded text-muted hover:text-text sm:hidden"
          >
            ✕
          </button>
        </div>

        <ul className="max-h-[50vh] sm:max-h-64 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 font-mono text-xs sm:text-sm text-muted">
              No results
            </li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.id}>
                <button
                  type="button"
                  onClick={() => execute(cmd)}
                  className={`flex w-full items-center justify-between px-3.5 sm:px-4 py-3 sm:py-2.5 font-mono text-xs sm:text-sm transition-colors text-left ${
                    i === activeIndex
                      ? "bg-violet/10 text-cyan"
                      : "text-text hover:bg-panel-line/50 active:bg-panel-line"
                  }`}
                >
                  <span className="truncate pr-2">{cmd.label}</span>
                  <span className="text-[10px] sm:text-xs text-muted shrink-0">
                    {cmd.group}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
