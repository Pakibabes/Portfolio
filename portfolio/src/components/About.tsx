import {
  aboutParagraphs,
  stats,
  focusAreas,
  currentlyExploring,
} from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="Who I am" title="About me" />

        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          <div className="space-y-6 sm:space-y-8">
            <Reveal
              delay={100}
              className="space-y-4 sm:space-y-5 text-sm leading-relaxed text-muted md:text-base"
            >
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={150}>
              <div className="flex items-center gap-3 font-mono text-xs text-muted">
                <span className="text-cyan">CURRENTLY EXPLORING</span>
                <span className="h-px flex-1 bg-panel-line" />
              </div>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {currentlyExploring.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-panel-line bg-panel px-2.5 py-1 text-[11px] sm:px-3 sm:py-1.5 sm:text-xs font-mono text-text transition-colors hover:border-cyan hover:text-cyan"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="grid grid-cols-2 content-start gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.desc}
                className="stat-card rounded-xl sm:rounded-2xl border border-panel-line bg-panel p-4 sm:p-6"
              >
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">
                  {stat.num}
                </div>
                <div className="mt-1.5 sm:mt-2 font-mono text-[11px] sm:text-xs text-muted leading-snug">
                  {stat.desc}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={250} className="mt-12 sm:mt-16">
          <div className="mb-6 sm:mb-8 flex items-center gap-3 font-mono text-xs text-muted">
            <span className="text-cyan">WHAT I FOCUS ON</span>
            <span className="h-px flex-1 bg-panel-line" />
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl sm:rounded-2xl border border-panel-line bg-panel-line sm:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area.title} className="skill-card bg-panel p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="skill-dot h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  <h3 className="font-display text-sm sm:text-base font-bold tracking-tight text-text">
                    {area.title}
                  </h3>
                </div>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
