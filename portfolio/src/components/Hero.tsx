import { profile } from "@/data/portfolio";
import TextType from "@/components/TextType";
import BlackHole from "@/components/BlackHole";
import DevStatus from "@/components/DevStatus";
import ScrollCue from "@/components/ScrollCue";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8 md:py-0 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-24"
    >
      <div className="relative z-10 flex max-w-xl lg:max-w-2xl flex-col items-start gap-5 sm:gap-6 text-left md:ml-6 lg:ml-8">
        <DevStatus />

        <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-cyan">
          {profile.tagline.toUpperCase()}
        </span>

        <h1 className="font-display max-w-3xl text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
          <span className="block text-lg sm:text-2xl font-medium text-muted md:text-3xl mb-1">
            Hi, I&apos;m
          </span>
          <span>{profile.name.split(" ").slice(0, -1).join(" ")} </span>
          <span className="text-cyan animate-glow inline-block">
            {profile.name.split(" ").slice(-1)}
          </span>
        </h1>

        <TextType
          as="p"
          text={[profile.bio]}
          className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-muted"
          typingSpeed={45}
          pauseDuration={2200}
          showCursor
          cursorCharacter="_"
          loop={false}
        />

        <div className="flex w-full sm:w-auto items-center gap-3 sm:gap-4 pt-2 font-mono text-xs sm:text-sm">
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary flex-1 sm:flex-initial text-center rounded-full bg-text px-5 py-3 sm:px-6 font-semibold text-void transition-transform hover:scale-105 active:scale-95"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="cta-secondary flex-1 sm:flex-initial text-center rounded-full border border-panel-line px-5 py-3 sm:px-6 text-text transition-colors hover:border-cyan hover:text-cyan active:bg-panel"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="relative h-[380px] w-full shrink-0 sm:h-[460px] md:h-[540px] md:w-[580px] lg:h-[660px] lg:w-[740px] xl:h-[740px] xl:w-[840px] 2xl:h-[800px] 2xl:w-[940px] md:mr-2 lg:mr-6 xl:mr-10">
        <BlackHole />
      </div>

      <div className="hidden md:flex">
        <ScrollCue />
      </div>
    </section>
  );
}
