import React, { useId } from "react";
import { motion } from "framer-motion";
import { ORANGE_YELLOW_CIRCUIT_PATHS, ICON_PATHS, WORDMARK_PATHS } from "@/lib/svg";

export default function GlowingLogo({
  // -- layout --------------------------------------------------------
  width = 320,
  className,
  background = "transparent",

  // -- recoloring ----------------------------------------------------
  wordmarkColor = "#FFFFFF",
  iconColor = null,

  // -- static glow & shimmer ------------------------------------------
  glowColor = "#2DC3F6",
  glowColorSecondary = "#FF900B",
  glowIntensity = 0.6,
  pulseSpeed = 4,
  sweepSpeed = 3.2,
  sweepColor = "#FFFFFF",

  // -- path beams animation ------------------------------------------
  showBeams = true,
  beamColor = "#00F0FF",
  beamColorSecondary = "",
  beamWidth = 2,
  beamLength = 440,
  beamGap = 600,
  beamSpeed = 4,

  // -- text ----------------------------------------------------------
  text = "BRANDNAME",
  showText = true,
  fontFamily = "'Space Grotesk', 'Inter', 'Helvetica Neue', sans-serif",
  fontSize = 28,
  fontWeight = 600,
  letterSpacing = "0.4em",
  textColor = "#F5F6F8",
  textMarginTop = 18,
}: {
  width?: number;
  className?: string;
  background?: string;
  wordmarkColor?: string | null;
  iconColor?: string | null;
  glowColor?: string;
  glowColorSecondary?: string;
  glowIntensity?: number;
  pulseSpeed?: number;
  sweepSpeed?: number;
  sweepColor?: string;
  showBeams?: boolean;
  beamColor?: string;
  beamColorSecondary?: string;
  beamWidth?: number;
  beamLength?: number;
  beamGap?: number;
  beamSpeed?: number;
  text?: string;
  showText?: boolean;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: string;
  textColor?: string;
  textMarginTop?: number;
}) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");

  // Base background paths (Circuit & Icon elements)
  const basePaths = [...ORANGE_YELLOW_CIRCUIT_PATHS, ...ICON_PATHS];

  const resolveFill = (p: any) => {
    if (WORDMARK_PATHS.includes(p) && wordmarkColor) return wordmarkColor;
    if (ICON_PATHS.includes(p) && iconColor) return iconColor;
    return p.fill;
  };

  const blurStd = 8 * glowIntensity;
  const haloOpacity = Math.min(0.9, 0.45 * glowIntensity);

  // Exact cycle length ensures an imperceptible, seamless infinite loop
  const beamCycleLength = beamLength + beamGap;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: textMarginTop,
        background,
        padding: 0,
        borderRadius: 24,
      }}
    >
      <div className="relative w-full h-full aspect-square" style={{ maxWidth: width }}>
        <svg
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full block overflow-visible"
        >
          <defs>
            {/* Halo glow filter */}
            <filter id={`glow-blur-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={blurStd} result="blurred" />
            </filter>

            {/* Beam Glow Filter */}
            <filter id={`beam-glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear sweep gradient */}
            <linearGradient id={`sweep-grad-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
              <stop offset="0%" stopColor={sweepColor} stopOpacity="0" />
              <stop offset="45%" stopColor={glowColor} stopOpacity="0" />
              <stop offset="50%" stopColor={sweepColor} stopOpacity="0.9" />
              <stop offset="55%" stopColor={glowColorSecondary} stopOpacity="0" />
              <stop offset="100%" stopColor={sweepColor} stopOpacity="0" />
            </linearGradient>

            {/* Mask strictly isolating sweep light to circuit paths */}
            <mask id={`logo-mask-${uid}`} maskUnits="userSpaceOnUse">
              {ORANGE_YELLOW_CIRCUIT_PATHS.map((p, i) => (
                <path key={i} d={p.d} transform={p.transform} fill="#FFFFFF" />
              ))}
            </mask>
          </defs>

          {/* Layer 1 — Soft background halo */}
          <motion.g
            filter={`url(#glow-blur-${uid})`}
            animate={{
              opacity: [haloOpacity * 0.55, haloOpacity, haloOpacity * 0.55],
              scale: [0.99, 1.015, 0.99],
            }}
            transition={{
              duration: pulseSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "500px 500px" }}
          >
            {ORANGE_YELLOW_CIRCUIT_PATHS.map((p, i) => (
              <path
                key={i}
                d={p.d}
                transform={p.transform}
                fill={i % 2 === 0 ? glowColor : glowColorSecondary}
              />
            ))}
          </motion.g>

          {/* Layer 2 — Crisp base icon & background circuit paths */}
          <g>
            {basePaths.map((p, i) => (
              <path key={i} d={p.d} transform={p.transform} fill={resolveFill(p)} />
            ))}
          </g>

          {/* Layer 3 — Traveling light sweep */}
          <g mask={`url(#logo-mask-${uid})`}>
            <motion.rect
              x="-200"
              y="-200"
              width="1400"
              height="1400"
              fill={`url(#sweep-grad-${uid})`}
              animate={{ x: [-1200, 1200] }}
              transition={{
                duration: sweepSpeed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </g>

          {/* Layer 4 — Animated Path Beams */}
          {showBeams && (
            <g filter={`url(#beam-glow-${uid})`}>
              {ORANGE_YELLOW_CIRCUIT_PATHS.map((p, i) => {
                const isEven = i % 2 === 0;
                const activeSecondaryColor = beamColorSecondary || beamColor;
                const duration = beamSpeed + (i % 4) * 0.4;
                const delay = (i % 5) * 0.35;

                return (
                  <motion.path
                    key={`beam-${i}`}
                    d={p.d}
                    transform={p.transform}
                    fill="none"
                    stroke={isEven ? beamColor : activeSecondaryColor}
                    strokeWidth={beamWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${beamLength} ${beamGap}`}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -beamCycleLength }}
                    transition={{
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                );
              })}
            </g>
          )}

          {/* Layer 5 (TOP) — Wordmark ("BITBUZZ") always rendered on top */}
          <g>
            {WORDMARK_PATHS.map((p, i) => (
              <path key={i} d={p.d} transform={p.transform} fill={resolveFill(p)} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}