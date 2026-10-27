import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO({
    title: '404 - Signal Lost',
    description: 'The requested node or route could not be resolved.',
  });

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="glass-panel p-10 md:p-14 border-border max-w-lg text-center shadow-glass-panel">
        <div className="font-mono text-xs uppercase tracking-widest text-cobalt mb-2">
          ERROR // 404: ROUTE_UNRESOLVED
        </div>

        <div className="font-display text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-cyan to-amber leading-none my-4">
          404
        </div>

        <h1 className="font-display text-2xl font-bold text-text-primary mb-3">
          Signal Path Terminated
        </h1>

        <p className="font-sans text-sm text-text-secondary leading-relaxed mb-8">
          The requested address or network node does not exist in the Signal Engine index.
          Recalibrate to return to nominal operations.
        </p>

        <div className="rounded-lg border border-border-subtle bg-void/80 p-4 font-mono text-xs text-text-muted text-left mb-8 space-y-1">
          <div>$ probe --route {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}</div>
          <div className="text-danger">[-] Host rejected: 404 NOT_FOUND</div>
          <div className="text-cyan">[+] Fallback suggested: return to apex (/)</div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 font-mono text-xs font-semibold uppercase text-void shadow-cyan-glow hover:brightness-110 transition-all"
        >
          <span>Re-anchor to Signal Engine Core</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
