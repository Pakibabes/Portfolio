"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { experiences } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  const [activeCert, setActiveCert] = useState<{
    title: string;
    imageSrc: string;
    pdfSrc: string;
    recipient: string;
    hours: string;
  } | null>(null);

  // Close modal on Escape
  useEffect(() => {
    if (!activeCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCert]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (activeCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  const closeModal = useCallback(() => {
    setActiveCert(null);
  }, []);

  return (
    <section
      id="experience"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Where I've Worked" title="Experience" />

        <div className="space-y-10">
          {experiences.map((exp, expIdx) => (
            <Reveal key={exp.id} delay={expIdx * 100}>
              <div className="relative overflow-hidden rounded-2xl border border-panel-line bg-panel/80 p-6 sm:p-8 md:p-10 backdrop-blur-sm transition-all hover:border-panel-line/80">
                {/* Background ambient glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet/10 blur-3xl"
                />

                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* Left Column: Details, bullets, stack */}
                  <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
                    <div>
                      {/* Company Header with Logo */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {exp.companyLogo && (
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-panel-line bg-void/80 p-1.5 shadow-inner">
                              <Image
                                src={exp.companyLogo}
                                alt={`${exp.company} logo`}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-text">
                              {exp.company}
                            </h3>
                            {exp.companyTagline && (
                              <p className="font-mono text-[10px] sm:text-xs tracking-wider text-muted uppercase">
                                {exp.companyTagline}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Role Badge */}
                        <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1 font-mono text-xs font-semibold text-cyan">
                          {exp.role}
                        </span>
                      </div>

                      {/* Timeline & Meta info */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                        <span className="text-text">{exp.period}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-panel-line bg-void/60 px-2.5 py-0.5 text-cyan">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                          {exp.duration}
                        </span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>

                      {/* Bullet Highlights */}
                      <ul className="mt-6 space-y-3 text-xs sm:text-sm leading-relaxed text-muted">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                        Technologies & Methodologies
                      </span>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-panel-line bg-void/60 px-2.5 py-1 font-mono text-[11px] text-text transition-colors hover:border-cyan/50 hover:text-cyan"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Rectangular Certificate Frame Preview */}
                  {exp.certificate && (
                    <div className="flex flex-col justify-center lg:col-span-5">
                      <div className="rounded-xl border border-panel-line/80 bg-void/50 p-4 sm:p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
                            <span className="font-mono text-[11px] font-semibold tracking-wider text-cyan uppercase">
                              Verified Credential
                            </span>
                          </div>
                          <span className="font-mono text-[10px] text-muted">
                            {exp.certificate.hours}
                          </span>
                        </div>

                        {/* Interactive Rectangular Preview Frame */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveCert({
                              title: exp.certificate!.title,
                              imageSrc: exp.certificate!.imageSrc,
                              pdfSrc: exp.certificate!.pdfSrc,
                              recipient: "John Lyster T. Arbiol",
                              hours: exp.certificate!.hours,
                            })
                          }
                          className="group relative block w-full overflow-hidden rounded-lg border border-panel-line bg-void text-left transition-all duration-300 hover:border-cyan/60 hover:shadow-lg hover:shadow-cyan/5 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                          aria-label="Enlarge certificate preview"
                        >
                          <div className="relative aspect-[16/11.3] w-full overflow-hidden bg-void">
                            <Image
                              src={exp.certificate.imageSrc}
                              alt="Certificate of Completion Preview"
                              fill
                              sizes="(max-width: 1024px) 100vw, 420px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Hover overlay with magnifying glass */}
                            <div className="absolute inset-0 flex items-center justify-center bg-void/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                              <span className="inline-flex items-center gap-2 rounded-full border border-cyan/50 bg-panel/90 px-4 py-2 font-mono text-xs font-medium text-cyan shadow-lg">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                  />
                                </svg>
                                Click to Enlarge
                              </span>
                            </div>
                          </div>
                        </button>

                        {/* Certificate Action Buttons */}
                        <div className="mt-3 flex items-center justify-between gap-2 pt-1 font-mono text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveCert({
                                title: exp.certificate!.title,
                                imageSrc: exp.certificate!.imageSrc,
                                pdfSrc: exp.certificate!.pdfSrc,
                                recipient: "John Lyster T. Arbiol",
                                hours: exp.certificate!.hours,
                              })
                            }
                            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-cyan"
                          >
                            <span>🔍 Enlarge View</span>
                          </button>

                          <a
                            href={exp.certificate.pdfSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-cyan"
                          >
                            <span>Open PDF</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Interactive Modal Popup */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-void/85 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-panel-line bg-panel shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-panel-line px-5 py-3.5 sm:px-6">
              <div>
                <h4
                  id="cert-modal-title"
                  className="font-display text-base sm:text-lg font-bold text-text"
                >
                  {activeCert.title}
                </h4>
                <p className="font-mono text-[11px] sm:text-xs text-muted">
                  Issued to {activeCert.recipient} • {activeCert.hours}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-line text-muted transition-colors hover:border-cyan hover:text-cyan active:bg-void"
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

            {/* Modal Body: High Resolution Certificate Image */}
            <div className="relative flex-1 overflow-auto p-3 sm:p-6 bg-void/90 flex items-center justify-center">
              <div className="relative aspect-[16/11.3] w-full max-w-3xl overflow-hidden rounded-lg border border-panel-line/70 shadow-2xl">
                <Image
                  src={activeCert.imageSrc}
                  alt={activeCert.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-panel-line bg-panel px-5 py-3 sm:px-6 font-mono text-xs">
              <a
                href={activeCert.pdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-panel-line bg-void/80 px-4 py-2 text-text transition-colors hover:border-cyan hover:text-cyan"
              >
                <span>View Full PDF</span>
                <span>↗</span>
              </a>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-text px-5 py-2 font-semibold text-void transition-transform hover:scale-105 active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
