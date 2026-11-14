import Image from "next/image";
import { profile } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import CopyEmailButton from "@/components/CopyEmailButton";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28"
    >
      <Image
        src="/icons/blackhole-large.svg"
        alt=""
        aria-hidden="true"
        width={520}
        height={520}
        className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 md:w-[520px] md:h-[520px] opacity-15 md:opacity-30 select-none"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Let&apos;s work <br /> together.
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-muted">
          Open for internships, collaborations, and creating modern web
          applications.
        </p>

        <p className="mt-8 sm:mt-10 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-cyan">
          CONTACT ME
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="text-gradient font-display mt-2 inline-block text-base sm:text-xl md:text-2xl font-bold transition-opacity hover:opacity-80 break-all max-w-full px-2"
        >
          {profile.email}
        </a>

        <div className="flex justify-center">
          <CopyEmailButton />
        </div>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm text-muted">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-panel-line/60 bg-panel/40 px-3 py-1.5 transition-colors hover:border-cyan hover:text-text sm:border-transparent sm:bg-transparent sm:px-0 sm:py-0 active:text-cyan"
            >
              {social.label} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
