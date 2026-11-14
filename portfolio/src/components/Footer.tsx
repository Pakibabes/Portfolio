"use client";

export default function Footer() {
  const triggerCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
    );
  };

  return (
    <footer className="border-t border-panel-line px-4 py-8 text-center font-mono text-xs text-muted sm:px-6 md:px-12">
      <p className="leading-relaxed">
        © {new Date().getFullYear()} John Lyster T. Arbiol — Built with passion
        &amp; caffeine ✦
      </p>
      <div className="mt-3">
        <button
          type="button"
          onClick={triggerCommandPalette}
          className="inline-flex items-center gap-1.5 rounded-full border border-panel-line/70 bg-panel/50 px-3 py-1 text-[10px] tracking-wider text-muted transition-colors hover:border-cyan/50 hover:text-cyan active:bg-panel"
          aria-label="Open command palette"
        >
          <span className="hidden sm:inline">Press</span>
          <kbd className="rounded border border-panel-line px-1 py-0.5 text-[9px]">
            Ctrl
          </kbd>
          <span>+</span>
          <kbd className="rounded border border-panel-line px-1 py-0.5 text-[9px]">
            K
          </kbd>
          <span>to navigate</span>
        </button>
      </div>
    </footer>
  );
}
