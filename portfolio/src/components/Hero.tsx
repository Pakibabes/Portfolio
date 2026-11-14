import { profile } from "@/data/portfolio";
import TextType from "@/components/TextType";
import BlackHole from "@/components/BlackHole";
import DevStatus from "@/components/DevStatus";
import ScrollCue from "@/components/ScrollCue";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-6 pt-24 md:flex-row md:items-center md:justify-between md:gap-4 md:px-8 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-24"
    >
      <div className="relative z-10 flex max-w-xl lg:max-w-2xl flex-col items-start gap-6 text-left md:ml-6 lg:ml-8">
        <DevStatus />

        <span className="font-mono text-xs tracking-[0.3em] text-cyan">
          {profile.tagline.toUpperCase()}
        </span>

        <h1 className="font-display max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          <span className="block text-2xl font-medium text-muted md:text-3xl">
            Hi, I&apos;m
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
            rel="noopener noreferrer"
            className="cta-primary rounded-full bg-text px-6 py-3 font-semibold text-void transition-transform hover:scale-105"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="cta-secondary rounded-full border border-panel-line px-6 py-3 text-text transition-colors hover:border-cyan hover:text-cyan"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="relative h-[380px] w-full shrink-0 sm:h-[460px] md:h-[540px] md:w-[580px] lg:h-[660px] lg:w-[740px] xl:h-[740px] xl:w-[840px] 2xl:h-[800px] 2xl:w-[940px] md:mr-2 lg:mr-6 xl:mr-10">
        <BlackHole />
      </div>

      <ScrollCue />
    </section>
  );
}
