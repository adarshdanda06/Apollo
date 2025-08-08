"use client";

import React from "react";

export default function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Bottom glow */}
      <div className="absolute bottom-[-30%] left-1/2 h-[70%] w-[120%] -translate-x-1/2 blur-[60px] [background:radial-gradient(60%_60%_at_50%_100%,rgba(168,191,255,0.28),rgba(142,154,255,0.18)_40%,transparent_70%)]" />

      {/* Floating fog blobs */}
      <div className="absolute left-[10%] top-[15%] h-[40vmax] w-[40vmax] animate-[fog_22s_linear_infinite] blur-3xl [background:radial-gradient(50%_50%_at_50%_50%,rgba(150,170,255,0.12),transparent_60%)]" />
      <div className="absolute right-[8%] top-[25%] h-[34vmax] w-[34vmax] animate-[fog_28s_linear_infinite_reverse] blur-3xl [background:radial-gradient(50%_50%_at_50%_50%,rgba(110,140,255,0.10),transparent_60%)]" />

      {/* Grain overlay using SVG turbulence texture */}
      <svg className="absolute inset-0 opacity-[0.08] mix-blend-screen" aria-hidden>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}


