export default function DevStatus() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-panel-line bg-panel/80 px-3.5 py-1.5 font-mono text-[11px] sm:text-xs sm:px-4 sm:py-2 backdrop-blur-sm">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-muted">
        Open to <span className="text-cyan">internships </span> &amp; collabs
      </span>
    </div>
  );
}
