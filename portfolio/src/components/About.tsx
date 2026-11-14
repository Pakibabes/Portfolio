"use client";

import Image from "next/image";
import {
  aboutParagraphs,
  stats,
  focusAreas,
  currentlyExploring,
} from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Who I am" title="About & Story" />

        {/* Bento Grid Container */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-12">
          {/* Card 1: Main Story & Senior CS Status (Span 7 on lg) */}
          <div className="bento-card group p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-cyan" />
                <span className="tracking-wider text-cyan uppercase">
                  Background & Drive
                </span>
                <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[10px] text-cyan font-semibold ml-auto">
                  Senior • 4th Year
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text mt-4">
                4th-Year CS Student @ CIT-U, building scalable web systems & useful AI.
              </h3>

              <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-muted font-sans">
                <p>{aboutParagraphs[0]}</p>
                <p>{aboutParagraphs[1]}</p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-panel-line/70 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted">
              <span className="text-text">Cebu Institute of Technology - University</span>
              <span className="text-cyan">Class of 2027 • BSCS</span>
            </div>
          </div>

          {/* Card 2: Latest Milestone / OJT Highlight (Span 5 on lg) */}
          <div className="bento-card group p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-violet uppercase">
                  Latest Milestone
                </span>
                <span className="rounded-full border border-violet/30 bg-violet/10 px-2.5 py-0.5 font-mono text-[10px] text-violet font-semibold">
                  350 Hours Completed
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3.5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-panel-line bg-void/80 p-1.5 shadow-inner">
                  <Image
                    src="/icons/metawatt.png"
                    alt="Metawatt logo"
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-text">
                    DevOps Intern @ Metawatt LLC
                  </h4>
                  <p className="font-mono text-[11px] text-muted">
                    Build • Automate • Scale • Impact
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted font-sans">
                Completed an intensive 350-hour industry training configuring
                automated CI/CD pipelines with GitHub Actions, solving tasks with
                ORCA CLI agents, and developing full-stack features.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-panel-line/70 flex items-center justify-between">
              <a
                href="#experience"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan transition-colors hover:text-text"
              >
                <span>View Full Experience & Certificate</span>
                <span>→</span>
              </a>
              <span className="font-mono text-[10px] text-muted">Remote</span>
            </div>
          </div>

          {/* Card 3: Mindset & Discipline (Span 6 on lg) */}
          <div className="bento-card group p-6 sm:p-8 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-gold uppercase">
                  Mindset & Training
                </span>
                <span className="font-mono text-xs text-gold">⚡ Discipline</span>
              </div>

              <h4 className="font-display text-lg sm:text-xl font-bold text-text mt-4">
                Disciplined in Training, Consistent in Code.
              </h4>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted font-sans">
                {aboutParagraphs[2]}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-panel-line/70 flex flex-wrap gap-2 font-mono text-[11px] text-muted">
              <span className="rounded-md border border-panel-line bg-void/50 px-2.5 py-1 text-text">
                #Consistency
              </span>
              <span className="rounded-md border border-panel-line bg-void/50 px-2.5 py-1 text-text">
                #Discipline
              </span>
              <span className="rounded-md border border-panel-line bg-void/50 px-2.5 py-1 text-text">
                #ContinuousGrowth
              </span>
            </div>
          </div>

          {/* Card 4: Key Metrics & Availability (Span 6 on lg) */}
          <div className="bento-card group p-6 sm:p-8 lg:col-span-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-cyan uppercase">
                Key Metrics
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Opportunities</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.desc}
                  className="rounded-xl border border-panel-line/60 bg-void/50 p-3.5 transition-colors hover:border-cyan/40"
                >
                  <div className="font-display text-2xl font-bold text-gradient">
                    {stat.num}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-muted leading-tight">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-panel-line/70 font-mono text-xs text-muted flex items-center justify-between">
              <span>Focus: Full-Stack & AI Systems</span>
              <span className="text-cyan">Available for Hire</span>
            </div>
          </div>

          {/* Card 5: Currently Exploring / Tech Radar (Full width on lg) */}
          <div className="bento-card group p-6 sm:p-8 lg:col-span-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
                <span className="font-mono text-xs tracking-wider text-violet uppercase">
                  Tech Radar & Active Exploration
                </span>
              </div>
              <span className="font-mono text-[11px] text-muted">
                Always expanding technical horizons
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {currentlyExploring.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-panel-line bg-void/70 px-3.5 py-1.5 font-mono text-xs text-text transition-all duration-300 hover:border-cyan hover:text-cyan hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card 6: Core Engineering Focus Areas (Span 12 on lg) */}
          <div className="bento-card group p-6 sm:p-8 lg:col-span-12">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-cyan uppercase">
                Core Engineering Focus
              </span>
              <span className="font-mono text-[11px] text-muted">
                End-to-End Capabilities
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {focusAreas.map((area, idx) => (
                <div
                  key={area.title}
                  className="rounded-xl border border-panel-line/60 bg-void/40 p-4 sm:p-5 transition-colors hover:border-violet/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-cyan">
                      0{idx + 1}.
                    </span>
                    <h5 className="font-display text-sm sm:text-base font-bold text-text">
                      {area.title}
                    </h5>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted font-sans">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
