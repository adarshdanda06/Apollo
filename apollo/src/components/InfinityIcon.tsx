"use client";

import React from "react";

type InfinityIconProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function InfinityIcon({
  className,
  width = 640,
  height = 320,
}: InfinityIconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 640 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <defs>
        {/* Base metal gradient from black to white */}
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="50%" stopColor="#dcdcdc" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>

        {/* Subtle moving sheen */}
        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Inner glow for liquid/glass feel */}
        <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="atop" />
        </filter>

        {/* Outer soft highlight */}
        <filter id="softHighlight" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Infinity path as stroked curve for reflective look */}
      <g filter="url(#innerGlow)">
        <path
          d="M100 160 C 100 90 200 90 320 160 C 440 230 540 230 540 160 C 540 90 440 90 320 160 C 200 230 100 230 100 160 Z"
          stroke="url(#metal)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Specular-like band across the stroke */}
        <path
          d="M100 160 C 100 90 200 90 320 160 C 440 230 540 230 540 160 C 540 90 440 90 320 160 C 200 230 100 230 100 160 Z"
          stroke="url(#sheen)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
          filter="url(#softHighlight)"
        />
      </g>

      {/* Subtle inner ridge for depth */}
      <path
        d="M120 160 C 120 108 205 108 320 160 C 435 212 520 212 520 160 C 520 108 435 108 320 160 C 205 212 120 212 120 160 Z"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="2"
      />
    </svg>
  );
}
