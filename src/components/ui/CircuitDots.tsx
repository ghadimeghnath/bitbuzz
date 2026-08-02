import * as React from "react";

/** Small decorative dots + traces used in the header
 *  corners and around the footer tagline. Purely ornamental, colored
 *  via `currentColor` so it inherits the wrapping element's text color. */
export function CircuitDots({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.7">
        <path d="M4 8 H36 V26" />
        <path d="M60 4 V22 H90" />
        <path d="M96 30 H130 V10" />
        <path d="M10 50 H30" />
        <path d="M150 8 V30 H180 V50" />
        <path d="M170 60 H200" />
        <path d="M40 70 V96 H70" />
        <path d="M100 90 H140" />
      </g>
      <g fill="currentColor">
        <circle cx="4" cy="8" r="2.5" />
        <circle cx="36" cy="26" r="2.5" />
        <circle cx="60" cy="4" r="2.5" />
        <circle cx="90" cy="22" r="2.5" />
        <circle cx="130" cy="10" r="2.5" />
        <circle cx="10" cy="50" r="2.5" />
        <circle cx="30" cy="50" r="2.5" />
        <circle cx="150" cy="8" r="2.5" />
        <circle cx="180" cy="50" r="2.5" />
        <circle cx="200" cy="60" r="2.5" />
        <circle cx="40" cy="70" r="2.5" />
        <circle cx="70" cy="96" r="2.5" />
        <circle cx="140" cy="90" r="2.5" />
      </g>
    </svg>
  );
}
