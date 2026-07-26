import React from 'react';

// Injection for authentic Minecraft pixel fonts
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap');
    
    .font-pixel-header {
      font-family: 'Press Start 2P', monospace;
      font-smooth: never;
      -webkit-font-smoothing: none;
    }
    
    .font-pixel-body {
      font-family:  monospace;
      font-smooth: never;
      -webkit-font-smoothing: none;
    }

    .pixel-crisp {
      shape-rendering: crispEdges;
      image-rendering: pixelated;
    }
  `}</style>
);

// High-detail Pixel Art Vines SVG Overlay
const PixelVines = ({ position = "top-left" }) => {
  const isRight = position === "top-right";
  return (
    <svg
      className={`absolute -top-3 ${isRight ? '-right-3 scale-x-[-1]' : '-left-3'} w-32 h-16 z-30 pointer-events-none select-none pixel-crisp`}
      viewBox="0 0 64 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark Vine Tendrils */}
      <path d="M0 0h24v4H0zM8 4h20v4H8zM16 8h16v4H16zM24 12h12v4H24zM32 16h8v8H32zM4 16h4v12H4z" fill="#0f380e" />
      {/* Dark Green Leaf Blocks */}
      <path d="M2 2h16v4H2zM6 6h18v4H6zM12 10h16v4H12zM20 14h12v4H20zM28 18h8v6H28zM3 18h4v8H3z" fill="#1b5212" />
      {/* Mid Green Leaves */}
      <path d="M4 2h10v2H4zM8 6h12v2H8zM14 10h12v2H14zM22 14h8v2H22zM29 19h5v3H29z" fill="#2d801e" />
      {/* Vibrant Minecraft Oak Leaf Highlights */}
      <path d="M6 3h6v1H6zM10 7h8v1H10zM16 11h8v1H16zM24 15h4v1H24z" fill="#52b133" />
      <path d="M8 3h2v1H8zM12 7h3v1H12zM18 11h3v1H18z" fill="#88e353" />
    </svg>
  );
};

// 3D Pixel Redstone / Gem Bullet Icon
export const PixelBulletIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 pixel-crisp" viewBox="0 0 8 8" fill="none">
    {/* Dark Shadow Outer */}
    <path d="M0 0h8v8H0z" fill="#2a0000" />
    {/* Base Red Frame */}
    <path d="M1 1h6v6H1z" fill="#7a0c0c" />
    {/* Bright Red Inner Block */}
    <path d="M2 2h4v4H2z" fill="#d32f2f" />
    {/* Highlight Top-Left Corner */}
    <path d="M2 2h2v2H2z" fill="#ff7961" />
    <path d="M2 2h1v1H2z" fill="#ffffff" />
  </svg>
);

// Decorative Diamond Divider
export const PixelDivider = ({ color = "#a63333" }) => (
  <div className="flex items-center justify-center my-3 gap-2 w-full">
    <div className="h-[2px] flex-1 bg-stone-800 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/60 to-stone-800" />
    </div>
    <svg className="w-4 h-4 pixel-crisp" viewBox="0 0 9 9" fill="none">
      <path d="M4 0h1v1H4zM3 1h3v1H3zM2 2h5v1H2zM1 3h7v1H1zM0 4h9v1H0zM1 5h7v1H1zM2 6h5v1H2zM3 7h3v1H3zM4 8h1v1H4z" fill={color} />
      <path d="M4 2h1v1H4zM3 3h3v1H3zM2 4h5v1H2zM3 5h3v1H3zM4 6h1v1H4z" fill="#ff7961" />
    </svg>
    <div className="h-[2px] flex-1 bg-stone-800 relative">
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-red-900/60 to-stone-800" />
    </div>
  </div>
);

// Theme Configuration mapping exact Minecraft material vibes
const THEMES = {
  red: {
    outerBorder: 'border-[#4a1010]',
    middleBorder: 'border-[#8b1e1e]',
    innerBorder: 'border-[#260808]',
    bannerBg: 'bg-[#3b1111]',
    bannerBorder: 'border-[#8b1e1e]',
    bannerText: 'text-[#ff5555]',
    bannerAccent: 'bg-[#ff5555]',
    glow: 'shadow-[0_0_25px_rgba(139,30,30,0.35)]',
    tableBorder: 'border-red-950/60',
  },
  blue: {
    outerBorder: 'border-[#0a2e36]',
    middleBorder: 'border-[#1b7a8d]',
    innerBorder: 'border-[#05171c]',
    bannerBg: 'bg-[#082d38]',
    bannerBorder: 'border-[#1b7a8d]',
    bannerText: 'text-[#55ffff]',
    bannerAccent: 'bg-[#55ffff]',
    glow: 'shadow-[0_0_25px_rgba(27,122,141,0.35)]',
    tableBorder: 'border-cyan-900/50',
  },
  gold: {
    outerBorder: 'border-[#3d2b0f]',
    middleBorder: 'border-[#a67c1e]',
    innerBorder: 'border-[#1c1305]',
    bannerBg: 'bg-[#2b1f09]',
    bannerBorder: 'border-[#a67c1e]',
    bannerText: 'text-[#ffaa00]',
    bannerAccent: 'bg-[#ffaa00]',
    glow: 'shadow-[0_0_25px_rgba(166,124,30,0.35)]',
    tableBorder: 'border-amber-900/50',
  },
};

export default function PixelFrame({
  title = "CLASSIFIED",
  variant = "red",
  showVines = true,
  children,
  className = "",
}) {
  const theme = THEMES[variant] || THEMES.red;

  return (
    <>
      <FontStyle />
      <div className={`relative inline-block w-full ${className}`}>
        {/* Top Pixel Leaf Vines */}
        {showVines && (
          <>
            <PixelVines position="top-left" />
            <PixelVines position="top-right" />
          </>
        )}

        {/* Outer Beveled Minecraft Box Frame */}
        <div
          className={`relative bg-[#120f10] border-4 ${theme.outerBorder} ${theme.glow} p-1.5 rounded-sm`}
          style={{
            boxShadow: `
              inset 2px 2px 0px rgba(255,255,255,0.08),
              inset -2px -2px 0px rgba(0,0,0,0.8),
              0 0 0 4px #0a090a,
              0 8px 20px rgba(0,0,0,0.9)
            `,
          }}
        >
          {/* Inner Textured Panel */}
          <div className={`relative border-2 ${theme.middleBorder} p-4 bg-[#181415] min-h-[480px]`}>
            {/* Minecraft Stone/Deepslate Texture Pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none pixel-crisp"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, #000 1px, transparent 1px),
                  linear-gradient(180deg, #000 1px, transparent 1px),
                  radial-gradient(#ffffff 1px, transparent 0)
                `,
                backgroundSize: '16px 16px, 16px 16px, 8px 8px',
              }}
            />

            {/* Top Wooden Banner Box */}
            {title && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-[280px]">
                <div
                  className={`relative py-1.5 px-4 bg-[#2e1d11] border-2 border-[#633e21] text-center shadow-lg`}
                  style={{
                    boxShadow: `
                      inset 2px 2px 0 #87562e,
                      inset -2px -2px 0 #170e08,
                      0 4px 10px rgba(0,0,0,0.8)
                    `,
                  }}
                >
                  {/* Banner Corner Brackets */}
                  <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#87562e] border border-[#170e08]" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#87562e] border border-[#170e08]" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#87562e] border border-[#170e08]" />
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#87562e] border border-[#170e08]" />

                  <h2
                    className={`font-pixel-header text-sm md:text-base tracking-wider uppercase ${theme.bannerText}`}
                    style={{
                      textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
                    }}
                  >
                    {title}
                  </h2>
                </div>
              </div>
            )}

            {/* Corner Decorative Pixel Accents */}
            <span className={`absolute top-1 left-1 w-2 h-2 ${theme.bannerAccent} border border-black`} />
            <span className={`absolute top-1 right-1 w-2 h-2 ${theme.bannerAccent} border border-black`} />
            <span className={`absolute bottom-1 left-1 w-2 h-2 ${theme.bannerAccent} border border-black`} />
            <span className={`absolute bottom-1 right-1 w-2 h-2 ${theme.bannerAccent} border border-black`} />

            {/* Card Content Slot */}
            <div className="relative z-10 pt-4 flex flex-col h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Section Title with Flanking Lines
export function PixelSectionTitle({ children }) {
  return (
    <div className="text-center my-3">
      <h3
        className="font-pixel-header text-xs md:text-sm text-[#e0d5c1] tracking-wide uppercase inline-block"
        style={{
          textShadow: '2px 2px 0px #000',
        }}
      >
        {children}
      </h3>
    </div>
  );
}

// Pixel Bullet Item
export function PixelBullet({ children }) {
  return (
    <li className="flex items-start gap-2.5 my-2 text-stone-300 font-pixel-body text-xs md:text-sm leading-snug">
      <PixelBulletIcon />
      <span className="flex-1">{children}</span>
    </li>
  );
}

// Pixel Button with 3D Bevel Click Effect
export function PixelButton({ children, onClick, color = "gold" }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 px-4 font-pixel-header text-xs md:text-sm text-stone-100 uppercase tracking-widest bg-[#7a5c1e] hover:bg-[#8c6b23] active:translate-y-1 transition-transform border-2 border-[#caa038] relative pixel-crisp"
      style={{
        boxShadow: `
          inset 2px 2px 0px #eec45c,
          inset -2px -2px 0px #3d2b07,
          0 4px 0px #000
        `,
        textShadow: '1px 1px 0px #000',
      }}
    >
      {children}
    </button>
  );
}