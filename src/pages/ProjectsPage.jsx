import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useContent } from '../hooks/useContent';
import useSEO from '../hooks/useSEO';

const CATEGORIES = ['ALL', 'SECURITY', 'AI & INFRASTRUCTURE', 'ARCHITECTURE'];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const { attributes, body } = project;
  const tools = attributes.tools || [];
  const status = attributes.status || 'Active';

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(6px)`;
    cardRef.current.style.borderColor = 'rgba(89, 225, 255, 0.45)';
  }, []);

  const onMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)';
    cardRef.current.style.borderColor = 'rgba(82, 118, 255, 0.18)';
  }, []);

  const statusStyle = {
    Active: { text: '#59E1FF', bg: 'rgba(89, 225, 255, 0.12)', border: 'rgba(89, 225, 255, 0.3)' },
    Deployed: { text: '#5CFF9D', bg: 'rgba(92, 255, 157, 0.12)', border: 'rgba(92, 255, 157, 0.3)' },
    Archived: { text: '#A1ABC2', bg: 'rgba(161, 171, 194, 0.12)', border: 'rgba(161, 171, 194, 0.2)' },
  }[status] || { text: '#59E1FF', bg: 'rgba(89, 225, 255, 0.12)', border: 'rgba(89, 225, 255, 0.3)' };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass-panel p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:shadow-cyan-glow"
      style={{ willChange: 'transform' }}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between font-mono text-xs mb-4">
          <span className="text-cobalt font-semibold tracking-wider">
            PRJ // 0{index + 1}
          </span>
          <span
            className="rounded px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{
              color: statusStyle.text,
              backgroundColor: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
            }}
          >
            {status}
          </span>
        </div>

        <div className="font-mono text-micro text-cyan/80 uppercase tracking-wider mb-1">
          {attributes.category || 'Engineering'}
        </div>

        <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary group-hover:text-cyan transition-colors">
          {attributes.title}
        </h3>

        <p className="mt-3 font-sans text-xs md:text-sm text-text-secondary leading-relaxed">
          {attributes.description}
        </p>

        {/* Stack Tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded bg-surface-elevated/70 px-2 py-0.5 font-mono text-[11px] text-text-secondary border border-border-subtle"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between font-mono text-xs">
        {attributes.github_link ? (
          <a
            href={attributes.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-cyan hover:text-white transition-colors font-semibold"
          >
            <span>GITHUB REPO</span>
            <span>↗</span>
          </a>
        ) : (
          <span className="text-text-faint">INTERNAL LAB REPO</span>
        )}

        <span className="text-text-muted text-[11px]">
          {attributes.date ? new Date(attributes.date).getFullYear() : '2026'}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  useSEO({
    title: 'Technical Projects',
    description:
      'Verified engineering repositories, cybersecurity automation workflows, zero-trust gateways, and local AI pipelines by Gururaj Seethuru.',
  });

  const rawProjects = useContent('projects');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return (rawProjects || []).filter((p) => {
      const cat = (p.attributes?.category || '').toUpperCase();
      const matchesCat =
        selectedCategory === 'ALL' || cat === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const title = (p.attributes?.title || '').toLowerCase();
      const desc = (p.attributes?.description || '').toLowerCase();
      const tools = (p.attributes?.tools || []).join(' ').toLowerCase();

      const matchesSearch =
        title.includes(q) || desc.includes(q) || tools.includes(q);

      return matchesCat && matchesSearch;
    });
  }, [rawProjects, selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <div className="max-w-content mx-auto">
        {/* ── TOP HEADER ──────────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span>SIGNAL ENGINE // PROJECT INVENTORY</span>
          </div>
          <h1 className="mt-3 font-display text-hero-heading font-bold text-text-primary">
            Engineering Projects<span className="text-cyan">.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base md:text-lg text-text-secondary leading-relaxed">
            Production control planes, empirical defense-in-depth frameworks, zero-trust threat intelligence gateways,
            and privacy-critical local AI pipelines.
          </p>
        </div>

        {/* ── CONTROLS: CATEGORIES & SEARCH ───────────────────────────── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border-subtle">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan/15 text-cyan border border-cyan/40 shadow-cyan-glow font-semibold'
                    : 'bg-surface/60 text-text-muted border border-border-subtle hover:text-text-primary hover:bg-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, keywords..."
              className="input-signal py-2 text-xs font-mono"
            />
          </div>
        </div>

        {/* ── PROJECT CARDS GRID ───────────────────────────────────────── */}
        {filteredProjects.length === 0 ? (
          <div className="glass-panel p-12 text-center text-text-muted font-mono text-sm">
            No projects matched query "{searchQuery}" in category {selectedCategory}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, idx) => (
              <ProjectCard key={p.slug || idx} project={p} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
