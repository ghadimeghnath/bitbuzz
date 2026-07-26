'use client'

import Image from 'next/image';
import React, { useState } from 'react';

// Google Fonts Injection for Pixel Typography
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap');

    .font-pixel-title {
      font-family: 'Press Start 2P', monospace;
      font-smooth: never;
      -webkit-font-smoothing: none;
    }

    .font-pixel-nav {
      font-family: 'Silkscreen', 'Press Start 2P', monospace;
      font-smooth: never;
      -webkit-font-smoothing: none;
    }

    /* Crisp Pixel Borders and Rendering */
    .pixel-crisp {
      shape-rendering: crispEdges;
      image-rendering: pixelated;
    }

    .minecraft-btn-green {
      background-color: #2e591b;
      border: 2px solid #529331;
      box-shadow: 
        inset 2px 2px 0px #70c345,
        inset -2px -2px 0px #13270a,
        0 4px 0px #0c1606;
    }

    .minecraft-btn-green:hover {
      background-color: #386b22;
    }

    .minecraft-btn-green:active {
      transform: translateY(2px);
      box-shadow: 
        inset 2px 2px 0px #13270a,
        inset -2px -2px 0px #70c345,
        0 2px 0px #0c1606;
    }

    .minecraft-nav-active {
      background-color: #2d5a1e;
      border: 2px solid #4e8b35;
      box-shadow: 
        inset 2px 2px 0px #6eb84b,
        inset -2px -2px 0px #1b3a12;
      color: #a3e635;
    }
  `}</style>
);

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EVENTS', href: '#events' },
    { name: 'SCHEDULE', href: '#schedule' },
    { name: 'TEAMS', href: '#teams' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <FontStyles />
      <header className="sticky top-0 z-50 w-full bg-stone-950/80 backdrop-blur-md border-b-2 border-stone-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 1. MINECRAFT LOGO BADGE */}
            <a href="#home" className="flex items-center group">
                <div className="flex items-center gap-2 px-1">
                  <div className="flex flex-col text-left">
                   <Image src="/images/logo.png" alt="Logo" width={300} height={300}/>
                  </div>
                </div>
            </a>

            {/* 2. DESKTOP NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className={`px-3 py-1.5 font-pixel-nav text-xs tracking-wider transition-all duration-150 uppercase ${
                      isActive
                        ? 'minecraft-nav-active'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/60 border-2 border-transparent'
                    }`}
                    style={
                      !isActive
                        ? { textShadow: '1px 1px 0px #000' }
                        : { textShadow: '1px 1px 0px #000' }
                    }
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* 3. CTA REGISTER BUTTON */}
            <div className="hidden sm:flex items-center">
              <button
                onClick={() => alert('Registering...')}
                className="minecraft-btn-green font-pixel-nav text-xs text-stone-100 px-4 py-2.5 uppercase tracking-wider transition-all active:translate-y-0.5 cursor-pointer"
                style={{ textShadow: '1px 1px 0px #000' }}
              >
                REGISTER NOW
              </button>
            </div>

            {/* 4. MOBILE HAMBURGER MENU BUTTON */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-stone-900 border-2 border-stone-700 text-stone-200 focus:outline-none active:bg-stone-800"
                aria-label="Toggle Navigation Menu"
              >
                <svg className="w-6 h-6 pixel-crisp" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* 5. MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-stone-950/95 border-b-4 border-stone-800 px-4 pt-3 pb-6 space-y-2">
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActiveTab(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 font-pixel-nav text-xs uppercase tracking-wider block ${
                      isActive
                        ? 'minecraft-nav-active'
                        : 'text-stone-300 hover:bg-stone-800/80 border-2 border-transparent'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  alert('Registering...');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full minecraft-btn-green font-pixel-nav text-xs text-stone-100 py-3 uppercase tracking-wider"
                style={{ textShadow: '1px 1px 0px #000' }}
              >
                REGISTER NOW
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}