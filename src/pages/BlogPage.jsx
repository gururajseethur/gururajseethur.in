import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import useSEO from '../hooks/useSEO';

export default function BlogPage() {
  useSEO({
    title: 'Technical Notes & Writing',
    description:
      'Technical write-ups, home lab architectures, and security engineering insights by Gururaj Seethuru.',
  });

  const posts = useContent('blog');

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <div className="max-w-content mx-auto">
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span>DISPATCHES // RESEARCH & DOCUMENTATION</span>
          </div>
          <h1 className="mt-3 font-display text-hero-heading font-bold text-text-primary">
            Engineering Logs<span className="text-cyan">.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base md:text-lg text-text-secondary leading-relaxed">
            Technical notes, pentesting lab setups, security architecture evaluations, and local AI experiments.
          </p>
        </div>

        {/* ── POSTS GRID ──────────────────────────────────────────────── */}
        {(!posts || posts.length === 0) ? (
          <div className="glass-panel p-12 text-center text-text-muted font-mono text-sm">
            No published engineering notes yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => {
              const { attributes, slug } = post;
              const dateStr = attributes.date
                ? new Date(attributes.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : 'Recent';

              return (
                <Link
                  key={slug || idx}
                  to={`/blog/${slug}`}
                  className="glass-panel p-8 border-border hover:border-cyan/50 hover:bg-surface-elevated/70 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-text-muted mb-4">
                      <span className="text-cobalt font-semibold">LOG // 0{idx + 1}</span>
                      <span>{dateStr}</span>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-text-primary group-hover:text-cyan transition-colors">
                      {attributes.title}
                    </h2>

                    {attributes.cover_image && (
                      <div className="mt-4 rounded-lg overflow-hidden border border-border-subtle aspect-video bg-void">
                        <img
                          src={attributes.cover_image}
                          alt={attributes.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between font-mono text-xs">
                    <span className="text-text-muted">READ WRITE-UP</span>
                    <span className="text-cyan group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
