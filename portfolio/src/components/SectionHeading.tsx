import Reveal from "@/components/Reveal";

export default function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <Reveal className="mb-8 md:mb-12">
      <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-cyan">
        {label.toUpperCase()}
      </span>
      <h2 className="font-display mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {title}
      </h2>
    </Reveal>
  );
}
