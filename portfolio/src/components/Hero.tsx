import { profile } from "@/data/portfolio";
import TextType from "@/components/TextType";
import BlackHole from "@/components/BlackHole";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-6 pl-20 pt-24 md:flex-row md:items-center md:justify-between md:gap-6 md:px-12 lg:px-20"
    >
      <div className="relative z-10 ml-20 flex max-w-2xl flex-col items-start gap-6 text-left">
        <span className="font-mono text-xs tracking-[0.3em] text-cyan">
          {profile.tagline.toUpperCase()}
        </span>

        <h1 className="font-display max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          <span className="block text-2xl font-medium text-muted md:text-3xl">
            Hi, I'm
          </span>
          {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-cyan animate-glow">
            {profile.name.split(" ").slice(-1)}
          </span>
        </h1>

        <TextType
          as="p"
          text={[profile.bio]}
          className="max-w-xl text-base text-muted md:text-lg"
          typingSpeed={45}
          pauseDuration={2200}
          showCursor
          cursorCharacter="_"
          loop={false}
        />

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
      </div>

      <div className="relative -ml-30 h-[280px] w-full shrink-0 md:h-[460px] md:w-[460px] lg:h-[560px] lg:w-[560px]">
        <BlackHole />
      </div>
    </section>
  );
}
