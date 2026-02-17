import React from 'react';

/**
 * CONTACT — Establish Link.
 * Email, LinkedIn, GitHub, Status.
 * Clean. Direct. Translucent backing for legibility.
 */
export default function ContactSection() {
  return (
    <section className="section-block" id="section-contact">
      <div className="section-panel max-w-2xl mx-auto text-center px-4">
        <div className="hud-text text-core-cyan mb-2 tracking-[0.15em]">
          // ESTABLISH_LINK
        </div>
        <h2 className="font-mono text-2xl md:text-[1.75rem] font-semibold text-core-bright mb-2 tracking-tight">
          Contact
        </h2>
        <p className="font-sans text-sm text-core-text mb-10 leading-relaxed max-w-md mx-auto">
          Open to collaboration on security research, AI infrastructure,
          and systems engineering. Direct communication preferred.
        </p>

        <div className="space-y-5 font-mono text-sm max-w-sm mx-auto">
          <div className="flex items-center justify-between border-b border-core-border pb-3">
            <span className="text-core-muted text-xs tracking-wider">EMAIL</span>
            <a
              href="mailto:gururaj@example.com"
              data-interactive
              className="text-core-cyan hover:text-core-bright transition-colors"
            >
              gururaj@example.com
            </a>
          </div>
          <div className="flex items-center justify-between border-b border-core-border pb-3">
            <span className="text-core-muted text-xs tracking-wider">GITHUB</span>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="text-core-cyan hover:text-core-bright transition-colors"
            >
              github.com/gururaj
            </a>
          </div>
          <div className="flex items-center justify-between border-b border-core-border pb-3">
            <span className="text-core-muted text-xs tracking-wider">LINKEDIN</span>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="text-core-cyan hover:text-core-bright transition-colors"
            >
              linkedin.com/in/gururaj
            </a>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-core-muted text-xs tracking-wider">STATUS</span>
            <span className="text-core-green text-xs flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-core-green"></span>
              SIGNAL_ACTIVE
            </span>
          </div>
        </div>

        <div className="mt-14 hud-text text-core-muted text-[0.5rem] tracking-[0.15em]">
          RESPONSE_TIME: &lt;24H // PREFERRED_CHANNEL: DIRECT
        </div>
      </div>
    </section>
  );
}
