import Image from "next/image";
import { profile } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
import CopyEmailButton from "@/components/CopyEmailButton";

function getSocialIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("github")) {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }
  if (lower.includes("linkedin")) {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  if (lower.includes("facebook")) {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  return null;
}

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

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm text-muted">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-panel-line/70 bg-panel/30 px-3.5 py-1.5 transition-all duration-300 hover:text-cyan hover:drop-shadow-[0_0_12px_rgba(79,214,224,0.7)] active:text-cyan"
            >
              <span className="text-muted/80 transition-colors duration-300 group-hover:text-cyan">
                {getSocialIcon(social.label)}
              </span>
              <span className="transition-colors duration-300 group-hover:text-cyan">
                {social.label}
              </span>
              <span className="text-[11px] text-muted/60 transition-transform duration-300 group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
