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
    <section id="about" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="Who I am" title="About me" />

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <Reveal
              delay={100}
              className="space-y-5 text-sm leading-relaxed text-muted md:text-base"
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
              <div className="mt-4 flex flex-wrap gap-2">
                {currentlyExploring.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-panel-line bg-panel px-3 py-1.5 font-mono text-xs text-text transition-colors hover:border-cyan hover:text-cyan"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="grid grid-cols-2 content-start gap-4">
            {stats.map((stat) => (
              <div
                key={stat.desc}
                className="rounded-2xl border border-panel-line bg-panel p-6"
              >
                <div className="font-display text-3xl font-bold text-gradient">
                  {stat.num}
                </div>
                <div className="mt-2 font-mono text-xs text-muted">
                  {stat.desc}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={250} className="mt-16">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs text-muted">
            <span className="text-cyan">WHAT I FOCUS ON</span>
            <span className="h-px flex-1 bg-panel-line" />
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-panel-line bg-panel-line sm:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area.title} className="skill-card bg-panel p-6">
                <div className="flex items-center gap-2">
                  <span className="skill-dot h-1.5 w-1.5 rounded-full bg-violet" />
                  <h3 className="font-display text-sm font-bold tracking-tight text-text">
                    {area.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
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
