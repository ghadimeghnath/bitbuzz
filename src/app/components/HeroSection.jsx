'use client';

import React from 'react';
import Image from 'next/image';

// Custom Font Injection & Pixel Styling
const FontStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap');

    .font-pixel-title {
      font-family: 'Press Start 2P', monospace;
      font-smooth: never;
      -webkit-font-smoothing: none;
    }

    .font-pixel-body {
      font-family: 'Silkscreen', 'Press Start 2P', monospace;
      font-smooth: never;
      -webkit-font-smoothing: none;
    }

    .pixel-crisp {
      shape-rendering: crispEdges;
      image-rendering: pixelated;
    }

    /* Minecraft Green Button */
    .btn-minecraft-green {
      background-color: #2e591b;
      border: 2px solid #529331;
      box-shadow: 
        inset 2px 2px 0px #70c345,
        inset -2px -2px 0px #13270a,
        0 4px 0px #0a1405;
      text-shadow: 2px 2px 0px #000;
    }
    .btn-minecraft-green:hover {
      background-color: #386b22;
    }
    .btn-minecraft-green:active {
      transform: translateY(2px);
      box-shadow: 
        inset 2px 2px 0px #13270a,
        inset -2px -2px 0px #70c345,
        0 2px 0px #0a1405;
    }

    /* Minecraft Dark Stone Button */
    .btn-minecraft-dark {
      background-color: #1e1917;
      border: 2px solid #48382c;
      box-shadow: 
        inset 2px 2px 0px #735a47,
        inset -2px -2px 0px #0a0807,
        0 4px 0px #050404;
      text-shadow: 2px 2px 0px #000;
    }
    .btn-minecraft-dark:hover {
      background-color: #2b2421;
    }
    .btn-minecraft-dark:active {
      transform: translateY(2px);
      box-shadow: 
        inset 2px 2px 0px #0a0807,
        inset -2px -2px 0px #735a47,
        0 2px 0px #050404;
    }

    /* 3D Minecraft Pixel Text Shadow Effect */
    .minecraft-3d-text {
      text-shadow: 
        1px 1px 0 #3a322b,
        2px 2px 0 #312a24,
        3px 3px 0 #28221d,
        4px 4px 0 #1f1a16,
        5px 5px 0 #16120e,
        6px 6px 0 #000000,
        7px 7px 12px rgba(0,0,0,0.8);
    }

    .minecraft-3d-green-text {
      text-shadow: 
        1px 1px 0 #2b5719,
        2px 2px 0 #214313,
        3px 3px 0 #18300e,
        4px 4px 0 #0f1d08,
        5px 5px 0 #000000,
        6px 6px 10px rgba(0,0,0,0.9);
    }
  `}</style>
);

export default function HeroSection() {
  return (
    <>
      <FontStyles />
      <section className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden bg-stone-950 py-12 px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* 1. BACKGROUND IMAGE LAYER (Next.js Image)                 */}
        {/* Example image paths provided as requested                 */}
        {/* Place your background image inside /public/images/hero-bg.jpg */}
        {/* ========================================================= */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/hero-img.png" // Example path to main sunset background
            alt="BitBuzz 8.0 Sunset World Background"
            fill
            priority
            quality={90}
            className="object-cover object-center filter brightness-90 saturate-110"
          />
          
          {/* Subtle gradient overlays for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60" />
          <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN HERO CONTENT CONTAINER                            */}
        {/* ========================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">


          {/* CENTER / MAIN COLUMN: 3D HERO TITLE & ACTION BUTTONS */}
          <div className="lg:col-span-8 flex flex-col items-center text-center space-y-6">
            
            {/* Top Motto */}
            <div className="inline-block px-3 py-1 bg-black/50 border border-stone-800 rounded-sm backdrop-blur-xs">
              <p 
                className="font-pixel-nav text-stone-300 text-xs sm:text-sm tracking-widest uppercase"
                style={{ textShadow: '1px 1px 0px #000' }}
              >
                THINK &bull; CREATE &bull; TRANSFORM.
              </p>
            </div>

            {/* 3D TITLE LOGO (Option A: CSS Styled 3D Text | Option B: Next Image Asset) */}
            <div className="relative py-2">

             
              
              {/* CSS Rendered 3D Minecraft Title Fallback */}
              <h1 className="flex flex-col items-center justify-center font-pixel-title">
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#d4ceb8] tracking-wider minecraft-3d-text">
                  BITBUZZ
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#55ff55] tracking-wider minecraft-3d-green-text mt-1 sm:mt-2">
                  8.0
                </span>
              </h1>
            </div>

            {/* Subtitle / Description Banner */}
            <div className="max-w-xl mx-auto px-4">
              <h2 
                className="font-pixel-title text-stone-200 text-xs sm:text-sm md:text-base tracking-wider uppercase leading-relaxed"
                style={{ textShadow: '2px 2px 0px #000' }}
              >
                STATE LEVEL IT FEST FOR
                <span className="block text-[#55ff55] mt-1.5">HIGHER SECONDARY STUDENTS</span>
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
              
              <a
                href="#events"
                className="btn-minecraft-green w-full sm:w-auto font-pixel-nav text-xs md:text-sm text-stone-100 px-6 py-3.5 uppercase tracking-wider transition-transform flex items-center justify-center gap-2"
              >
                <span>EXPLORE EVENTS</span>
                <span className="text-stone-300">&gt;</span>
              </a>

              <a
                href="#about"
                className="btn-minecraft-dark w-full sm:w-auto font-pixel-nav text-xs md:text-sm text-stone-200 px-6 py-3.5 uppercase tracking-wider transition-transform"
              >
                ABOUT THE FEST
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Ambient Lighting / Glow */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-stone-950 to-transparent z-10 pointer-events-none" />
      </section>
    </>
  );
}