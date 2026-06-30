import { aboutParagraphs, stats } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="Who I am" title="About me" />

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal delay={100} className="space-y-5 text-sm leading-relaxed text-muted md:text-base">
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={200} className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1">
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
      </div>
    </section>
  );
}
