export default function Footer() {
  return (
    <footer className="border-t border-panel-line px-6 py-8 text-center font-mono text-xs text-muted md:px-12">
      <p>
        © {new Date().getFullYear()} John Lyster T. Arbiol — Built with passion
        &amp; caffeine ✦
      </p>
      <p className="mt-2 text-[10px] tracking-wider opacity-60">
        Press <kbd className="rounded border border-panel-line px-1.5 py-0.5">Ctrl</kbd>{" "}
        + <kbd className="rounded border border-panel-line px-1.5 py-0.5">K</kbd> to
        navigate
      </p>
    </footer>
  );
}
