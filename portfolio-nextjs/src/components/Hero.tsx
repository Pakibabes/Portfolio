import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-start justify-center gap-6 px-6 pt-24 md:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--violet) 0%, transparent 70%)",
        }}
      />

      <span className="font-mono text-xs tracking-[0.3em] text-cyan">
        {profile.tagline.toUpperCase()}
      </span>

      <h1 className="font-display max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
        {profile.name}
      </h1>

      <p className="max-w-xl text-base text-muted md:text-lg">
        {profile.bio}
      </p>

      <div className="flex flex-wrap gap-4 pt-2 font-mono text-sm">
        <a
          href={profile.resumeHref}
          target="_blank"
          className="rounded-full bg-text px-6 py-3 font-semibold text-void transition-transform hover:scale-105"
        >
          Resume
        </a>
        <a
          href="#contact"
          className="rounded-full border border-panel-line px-6 py-3 text-text transition-colors hover:border-cyan hover:text-cyan"
        >
          Contact
        </a>
      </div>
    </section>
  );
}
