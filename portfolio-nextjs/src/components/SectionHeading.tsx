import Reveal from "@/components/Reveal";

export default function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12">
      <span className="font-mono text-xs tracking-[0.3em] text-cyan">
        {label.toUpperCase()}
      </span>
      <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
