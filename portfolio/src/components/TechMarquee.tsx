import { currentlyExploring } from "@/data/portfolio";

const items = [
  ...currentlyExploring,
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "AI Integration",
];

export default function TechMarquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-panel-line bg-panel/40 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent" />
      <div className="marquee-track flex w-max gap-8">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 font-mono text-xs tracking-[0.2em] text-muted"
          >
            <span className="text-cyan">✦</span>
            {item.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
