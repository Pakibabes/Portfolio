"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import Reveal from "@/components/Reveal";

export default function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeImg =
    project.images && project.images[activeImageIdx]
      ? project.images[activeImageIdx]
      : { src: "/projects/wildcats.png", alt: project.title };

  // Spotlight mouse tracking
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Keyboard controls for lightbox (Escape to close, Arrow keys to cycle)
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight" && project.images.length > 1) {
        setActiveImageIdx((prev) => (prev + 1) % project.images.length);
      }
      if (e.key === "ArrowLeft" && project.images.length > 1) {
        setActiveImageIdx(
          (prev) => (prev - 1 + project.images.length) % project.images.length,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, project.images.length]);

  return (
    <>
      <Reveal delay={delay}>
        <article
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-panel-line bg-panel/75 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-violet/50 hover:shadow-2xl hover:shadow-violet/10"
        >
          {/* Dynamic Spotlight Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: isHovered
                ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(138, 124, 255, 0.12), transparent 70%)`
                : "",
            }}
          />

          <div className="relative space-y-4">
            {/* Top Bar: Number & Category */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-cyan font-bold">
                  {project.number}/
                </span>
                {project.category && (
                  <span className="rounded-full border border-panel-line bg-void/60 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                    {project.category}
                  </span>
                )}
              </div>
            </div>

            {/* Browser Window Mockup Frame */}
            <div className="overflow-hidden rounded-xl border border-panel-line bg-void/90 shadow-md">
              {/* Browser Window Header Chrome */}
              <div className="flex items-center justify-between border-b border-panel-line/70 bg-void/95 px-3 py-2 text-xs">
                {/* 🔴 🟡 🟢 Window Controls */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/90 inline-block" />
                </div>

                {/* Mock Browser URL Pill */}
                <div className="flex items-center gap-1.5 rounded-md border border-panel-line/60 bg-panel/60 px-2.5 py-0.5 font-mono text-[10px] text-muted truncate max-w-[190px]">
                  <span className="text-[9px] text-cyan">🔒</span>
                  <span className="truncate">
                    {project.mockupUrl || "localhost:3000"}
                  </span>
                </div>

                {/* Expand / Lightbox Trigger */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="text-muted hover:text-cyan transition-colors"
                  aria-label="Enlarge preview"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
              </div>

              {/* Multi-view Switcher Tabs (For projects with multiple screenshots) */}
              {project.images && project.images.length > 1 && (
                <div className="flex items-center gap-1 border-b border-panel-line/50 bg-panel/40 px-3 py-1.5 font-mono text-[10px]">
                  <span className="text-muted mr-1">Views:</span>
                  {project.images.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`rounded px-2 py-0.5 transition-colors ${
                        activeImageIdx === idx
                          ? "bg-cyan/15 text-cyan border border-cyan/30"
                          : "text-muted hover:text-text hover:bg-void/50"
                      }`}
                    >
                      {img.label || `0${idx + 1}`}
                    </button>
                  ))}
                </div>
              )}

              {/* Interactive Screenshot Preview */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="group/img relative aspect-[16/9.5] w-full block overflow-hidden bg-void/50 text-left focus:outline-none"
              >
                <Image
                  src={activeImg.src}
                  alt={activeImg.alt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                />

                {/* Hover Click-to-Enlarge Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-void/65 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-panel/90 px-3.5 py-1.5 font-mono text-xs text-cyan shadow-lg">
                    <span>🔍</span>
                    <span>Click to Enlarge</span>
                  </span>
                </div>
              </button>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text group-hover:text-cyan transition-colors">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="mt-0.5 font-mono text-xs text-muted">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          </div>

          {/* Bottom Section: Tags and Actions */}
          <div className="relative pt-4 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) =>
                tag.href ? (
                  <a
                    key={tag.label}
                    href={tag.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-panel-line bg-void/50 px-2.5 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-cyan hover:text-cyan"
                  >
                    {tag.label}
                  </a>
                ) : (
                  <span
                    key={tag.label}
                    className="rounded-full border border-panel-line bg-void/50 px-2.5 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag.label}
                  </span>
                ),
              )}
            </div>

            <div className="flex items-center justify-between border-t border-panel-line/70 pt-3">
              <span className="font-mono text-[11px] text-muted">
                Repository
              </span>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-line bg-void/50 text-muted transition-all hover:scale-110 hover:border-cyan hover:text-cyan active:scale-95"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 128 128"
                  fill="currentColor"
                >
                  <path
                    d="M56.7937 84.9688C44.4187 83.4688 35.7 74.5625 35.7 63.0313C35.7 58.3438 37.3875 53.2813 40.2 49.9063C38.9812 46.8125 39.1687 40.25 40.575 37.5313C44.325 37.0625 49.3875 39.0313 52.3875 41.75C55.95 40.625 59.7 40.0625 64.2937 40.0625C68.8875 40.0625 72.6375 40.625 76.0125 41.6563C78.9187 39.0313 84.075 37.0625 87.825 37.5313C89.1375 40.0625 89.325 46.625 88.1062 49.8125C91.1062 53.375 92.7 58.1563 92.7 63.0313C92.7 74.5625 83.9812 83.2813 71.4187 84.875C74.6062 86.9375 76.7625 91.4375 76.7625 96.5938L76.7625 106.344C76.7625 109.156 79.1062 110.75 81.9187 109.625C98.8875 103.156 112.2 86.1875 112.2 65.1875C112.2 38.6563 90.6375 17 64.1062 17C37.575 17 16.2 38.6562 16.2 65.1875C16.2 86 29.4187 103.25 47.2312 109.719C49.7625 110.656 52.2 108.969 52.2 106.438L52.2 98.9375C50.8875 99.5 49.2 99.875 47.7 99.875C41.5125 99.875 37.8562 96.5 35.2312 90.2188C34.2 87.6875 33.075 86.1875 30.9187 85.9063C29.7937 85.8125 29.4187 85.3438 29.4187 84.7813C29.4187 83.6563 31.2937 82.8125 33.1687 82.8125C35.8875 82.8125 38.2312 84.5 40.6687 87.9688C42.5437 90.6875 44.5125 91.9063 46.8562 91.9063C49.2 91.9063 50.7 91.0625 52.8562 88.9063C54.45 87.3125 55.6687 85.9063 56.7937 84.9688Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </Reveal>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-void/90 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-panel-line bg-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-panel-line px-5 py-3 sm:px-6">
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-text">
                  {project.title}
                </h4>
                <p className="font-mono text-xs text-muted">
                  {activeImg.label || "Screenshot Preview"} • Screen{" "}
                  {activeImageIdx + 1} of {project.images.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-line text-muted transition-colors hover:border-cyan hover:text-cyan"
                aria-label="Close modal"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative flex-1 overflow-auto p-4 sm:p-6 bg-void/95 flex items-center justify-center min-h-[300px] sm:min-h-[480px]">
              <div className="relative aspect-[16/9.5] w-full max-w-4xl overflow-hidden rounded-lg border border-panel-line shadow-2xl">
                <Image
                  src={activeImg.src}
                  alt={activeImg.alt || project.title}
                  fill
                  priority
                  sizes="(max-width: 1400px) 100vw, 1200px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-panel-line bg-panel px-5 py-3 font-mono text-xs">
              {/* Image Navigation Dots / Pills */}
              {project.images.length > 1 ? (
                <div className="flex items-center gap-2">
                  <span className="text-muted">Screens:</span>
                  {project.images.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`rounded px-2.5 py-1 transition-colors ${
                        activeImageIdx === idx
                          ? "bg-cyan/20 text-cyan border border-cyan/40"
                          : "text-muted hover:text-text hover:bg-void"
                      }`}
                    >
                      {img.label || `0${idx + 1}`}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-muted">High-Resolution Desktop View</div>
              )}

              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-panel-line bg-void px-4 py-1.5 text-text hover:border-cyan hover:text-cyan transition-colors"
                >
                  <span>View on GitHub ↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="rounded-full bg-text px-4 py-1.5 font-semibold text-void hover:scale-105 active:scale-95 transition-transform"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
