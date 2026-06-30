export default function BlackHole() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* outer glow */}
      <div
        className="bh-pulse absolute inset-0 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--violet) 0%, transparent 65%)",
        }}
      />

      {/* accretion disk, rotating */}
      <div
        className="bh-spin absolute inset-[6%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--cyan) 0deg, transparent 40deg, var(--violet) 120deg, transparent 200deg, var(--cyan) 280deg, transparent 340deg, var(--cyan) 360deg)",
          filter: "blur(2px)",
          opacity: 0.55,
          maskImage:
            "radial-gradient(circle, transparent 38%, black 42%, black 62%, transparent 64%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 38%, black 42%, black 62%, transparent 64%)",
        }}
      />

      {/* secondary disk, counter-rotating for depth */}
      <div
        className="bh-spin-reverse absolute inset-[14%] rounded-full opacity-40"
        style={{
          background:
            "conic-gradient(from 90deg, transparent 0deg, var(--violet) 60deg, transparent 140deg, var(--cyan) 240deg, transparent 320deg)",
          filter: "blur(1.5px)",
          maskImage:
            "radial-gradient(circle, transparent 44%, black 48%, black 58%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 44%, black 48%, black 58%, transparent 60%)",
        }}
      />

      {/* event horizon core */}
      <div
        className="absolute inset-[40%] rounded-full bg-void"
        style={{
          boxShadow:
            "0 0 40px 12px rgba(7,6,12,0.9), inset 0 0 20px rgba(0,0,0,0.8)",
        }}
      />
    </div>
  );
}
