import React from 'react';

/**
 * Hero Section — Identity.
 * Full viewport. Strong hierarchy. Legible over particle layer.
 */
export default function HeroSection() {
  return (
    <section className="section-block relative" id="section-hero">
      <div className="max-w-3xl mx-auto text-center px-4">
        <div className="hud-text text-core-muted mb-6 tracking-[0.25em] text-[0.6rem]">
          SYSTEM INITIALIZED
        </div>

        <h1 className="font-mono text-[2.25rem] md:text-[3rem] font-bold text-core-bright mb-4 leading-tight tracking-tight">
          <span className="text-core-cyan">Gururaj</span> Seethur
        </h1>

        <p className="font-sans text-lg md:text-xl text-core-text font-light mb-3 tracking-wide">
          Creative Technologist
        </p>

        <p className="font-sans text-sm md:text-base text-core-muted leading-relaxed max-w-lg mx-auto mb-10">
          Building controlled systems at the intersection of{' '}
          <span className="text-core-cyan font-medium">Offensive Security</span>,{' '}
          <span className="text-core-green font-medium">AI Infrastructure</span>,
          and disciplined engineering.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#section-systems"
            data-interactive
            className="font-mono text-[0.7rem] tracking-wide px-7 py-3 border border-core-cyan text-core-cyan 
                       hover:bg-core-cyan hover:text-core-black transition-all duration-150"
          >
            VIEW SYSTEMS →
          </a>
          <a
            href="#section-contact"
            data-interactive
            className="font-mono text-[0.7rem] tracking-wide px-7 py-3 border border-core-border text-core-muted
                       hover:border-core-text hover:text-core-text transition-all duration-150"
          >
            ESTABLISH LINK
          </a>
        </div>

        <div className="mt-20 hud-text text-core-muted text-[0.5rem] animate-pulse tracking-[0.3em]">
          ▼ SCROLL TO DESCEND ▼
        </div>
      </div>
    </section>
  );
}
