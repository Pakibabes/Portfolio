import Image from "next/image";
import { profile } from "@/data/portfolio";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:px-12">
      <Image
        src="/icons/blackhole-large.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={520}
        className="pointer-events-none absolute -bottom-24 -right-24 opacity-20 md:opacity-30"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Let&apos;s work <br /> together.
        </h2>
        <p className="mt-5 text-sm text-muted md:text-base">
          Open for internships, collaborations, and creating modern web
          applications.
        </p>

        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-cyan">
          CONTACT ME
        </p>
        <a
          href={`mailto:${profile.email}`}
          target="_blank"
          className="text-gradient font-display mt-2 inline-block text-xl font-bold md:text-2xl"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono text-sm text-muted">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              className="transition-colors hover:text-text"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
