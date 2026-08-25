"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500 bg-[#cecbcb] dark:bg-neutral-950">
      {/* Top Radial Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_180px,#00a89625,transparent)] dark:bg-[radial-gradient(circle_600px_at_50%_180px,#38bdf820,transparent)]" />
      
      {/* Secondary Bottom Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_80%,#52796f15,transparent)] dark:bg-[radial-gradient(circle_500px_at_80%_80%,#00ffc610,transparent)]" />

      {/* Futuristic Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:18px_18px]" />
    </div>
  );
}
