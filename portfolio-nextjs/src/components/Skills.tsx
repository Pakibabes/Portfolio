import { skillGroups } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="What I know" title="Skills" />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-panel-line bg-panel-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 60} className="bg-panel p-6">
              <h3 className="font-mono text-xs tracking-[0.2em] text-cyan">
                {group.title.toUpperCase()}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-text">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-violet" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
