import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignalEngine } from '../../context/SignalEngineContext';

export default function SceneIgnition({ onExplore }) {
  const { setSceneState, setCoreIntensity } = useSignalEngine();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSceneState('arrival');
    setCoreIntensity(1.2);
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, [setSceneState, setCoreIntensity]);

  return (
    <section
      id="ignition"
      className="relative flex min-h-[92vh] flex-col justify-between px-6 pb-12 pt-8 md:px-12 md:pt-16"
    >
      {/* ── TOP STATUS TELEMETRY BAR ─────────────────────────────────── */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-cyan">
            SIGNAL ENGINE // ONLINE
          </span>
          <span className="hidden font-mono text-xs text-text-muted md:inline">
            · NODE 12.0.4 · BENGALURU, IN
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
          <span className="rounded border border-border bg-surface/50 px-2.5 py-1 text-text-secondary">
            CEH CERTIFIED
          </span>
          <span className="hidden rounded border border-border bg-surface/50 px-2.5 py-1 text-text-secondary sm:inline">
            70+ THM ROOMS
          </span>
          <span className="rounded border border-amber/30 bg-amber/10 px-2.5 py-1 text-amber">
            COMMUNICATIONS LEAD
          </span>
        </div>
      </div>

      {/* ── MAIN HERO TITLE & POSITIONING ────────────────────────────── */}
      <div className="my-auto max-w-5xl py-12">
        {/* Discipline Breadcrumb */}
        <div
          className={`mb-6 flex flex-wrap items-center gap-2 font-mono text-xs tracking-wider text-cyan transition-all duration-700 delay-150 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-cobalt">01</span>
          <span>CYBERSECURITY ARCHITECTURE</span>
          <span className="text-border">/</span>
          <span className="text-cobalt">02</span>
          <span>LOCAL AI INFRASTRUCTURE</span>
          <span className="text-border">/</span>
          <span className="text-amber">03</span>
          <span className="text-amber">VISUAL STORYTELLING</span>
        </div>

        {/* Identity & Main Name */}
        <h1
          className={`font-display text-hero-heading font-bold tracking-tight text-text-primary transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          GURURAJ <br className="hidden sm:inline" />
          <span className="signal-gradient-text">SEETHURU</span>
        </h1>

        {/* Core Statement & Forward Momentum */}
        <p
          className={`mt-6 max-w-2xl font-sans text-lg text-text-secondary sm:text-xl md:text-2xl font-light leading-relaxed transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Building secure systems. Engineering local-first AI telemetry.
          Shaping how complex technical realities are understood and experienced.
        </p>

        {/* Supporting Narrative */}
        <p
          className={`mt-4 max-w-xl font-sans text-sm md:text-base text-text-muted leading-relaxed transition-all duration-700 delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Transitioning professional focus toward cybersecurity engineering and sovereign AI pipelines,
          grounded in a disciplined career leading broadcast filmmaking and brand communications.
        </p>

        {/* ── PRIMARY ACTION TRIGGERS ─────────────────────────────────── */}
        <div
          className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-900 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#signal-map"
            onClick={(e) => {
              e.preventDefault();
              onExplore?.('signal-map');
            }}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-cobalt to-cyan px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-void shadow-cyan-glow transition-all duration-300 hover:brightness-110"
          >
            <span>Explore The Systems</span>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/70 px-5 py-3.5 font-mono text-xs font-medium tracking-wide text-text-primary backdrop-blur-md transition-all duration-300 hover:border-cyan hover:bg-surface-elevated hover:text-cyan"
          >
            <span>Technical Projects</span>
            <span className="text-cyan">→</span>
          </Link>

          <a
            href="#visual-archive"
            onClick={(e) => {
              e.preventDefault();
              onExplore?.('visual-archive');
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface/40 px-5 py-3.5 font-mono text-xs font-medium tracking-wide text-amber backdrop-blur-md transition-all duration-300 hover:border-amber/50 hover:bg-amber/10"
          >
            <span>Watch Showreel</span>
            <span className="text-amber">▶</span>
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-3 py-3.5 font-mono text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
          >
            <span>Contact & Transmission</span>
          </Link>
        </div>
      </div>

      {/* ── BOTTOM ANCHOR SCROLL INDICATOR ───────────────────────────── */}
      <div className="flex items-center justify-between border-t border-border-subtle pt-6">
        <div className="flex items-center gap-6 font-mono text-xs text-text-faint">
          <span>LATENCY // 14ms</span>
          <span className="hidden sm:inline">ZERO-TRUST PIPELINE</span>
          <span className="hidden md:inline">OLLAMA SOVEREIGN STACK</span>
        </div>

        <a
          href="#signal-map"
          onClick={(e) => {
            e.preventDefault();
            onExplore?.('signal-map');
          }}
          className="flex items-center gap-2 font-mono text-xs text-cyan transition-colors hover:text-white"
        >
          <span>SCROLL TO INITIALIZE</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
