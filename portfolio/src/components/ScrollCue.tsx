export default function ScrollCue() {
  return (
    <a
      href="#about"
      aria-label="Scroll to about section"
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-muted transition-colors hover:text-cyan"
    >
      <span>SCROLL</span>
      <span className="flex h-8 w-5 items-start justify-center rounded-full border border-panel-line p-1">
        <span className="h-1.5 w-1 animate-bounce rounded-full bg-cyan" />
      </span>
    </a>
  );
}
