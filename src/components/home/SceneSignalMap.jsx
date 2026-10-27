import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignalEngine } from '../../context/SignalEngineContext';

const NODES = [
  {
    id: 'security',
    index: '01',
    title: 'Security Engineering',
    category: 'DEFENSIVE ARCHITECTURE',
    summary:
      'Zero-trust edge gateways, CIS Controls v8 defense-in-depth baselines, network micro-segmentation, and verified packet-level mitigation.',
    metrics: [
      { label: 'THM Ranking', val: 'Top 4% Global' },
      { label: 'CEH Status', val: 'Certified' },
      { label: 'SYN-Flood Drop', val: '96.75% Rate' },
    ],
    tools: ['Suricata', 'iptables', 'Fail2Ban', 'Keycloak', 'Wireshark', 'pfSense'],
    route: '/security',
    state: 'security',
    accent: 'cyan',
  },
  {
    id: 'ai-infra',
    index: '02',
    title: 'Local-First AI Systems',
    category: 'SOVEREIGN INFRASTRUCTURE',
    summary:
      'Private AI plumbing that runs entirely on local hardware. Wazuh SIEM alerts feeding local Ollama models with zero cloud telemetry and zero external API dependencies.',
    metrics: [
      { label: 'Inference', val: '100% Local / Zero-Cloud' },
      { label: 'Architecture', val: 'FastAPI + Ollama' },
      { label: 'Data Model', val: '45 Relational Tables' },
    ],
    tools: ['Ollama', 'FastAPI', 'Docker', 'PostgreSQL', 'Traefik', 'Python'],
    route: '/projects',
    state: 'ai-lab',
    accent: 'cobalt',
  },
  {
    id: 'creative',
    index: '03',
    title: 'Visual Storytelling',
    category: 'FILMMAKING & MOTION',
    summary:
      'High-velocity editorial craft, documentary pacing, corporate communications leadership, and motion design. Translating abstract technical ideas into cinematic narratives.',
    metrics: [
      { label: 'Delivery Record', val: '200+ Client Edits' },
      { label: 'Leadership Award', val: 'EOTQ (Apr–Jun 25)' },
      { label: 'Lead Craft', val: 'Sole Video Lead @ CAG' },
    ],
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Audition', 'Figma'],
    route: '/creative',
    state: 'creative',
    accent: 'amber',
  },
  {
    id: 'automation',
    index: '04',
    title: 'Cyber Constellation & Lab',
    category: 'WORKFLOW ORCHESTRATION',
    summary:
      'End-to-end security automation platform comprising 65 production workflows across SOC, GRC, IAM, DFIR, and DevSecOps behind an HMAC-authenticated control plane.',
    metrics: [
      { label: 'Workflows', val: '65 Orchestrated' },
      { label: 'Auth Scheme', val: 'HMAC + RS256 JWT' },
      { label: 'Lab Scope', val: '12 Security Domains' },
    ],
    tools: ['n8n', 'FastAPI', 'Grafana', 'Docker Compose', 'Bash', 'Linux'],
    route: '/projects',
    state: 'ai-lab',
    accent: 'cyan',
  },
];

export default function SceneSignalMap() {
  const { setSceneState, setCoreIntensity } = useSignalEngine();
  const [activeNode, setActiveNode] = useState(NODES[0]);

  const handleNodeFocus = (node) => {
    setActiveNode(node);
    setSceneState(node.state);
    setCoreIntensity(1.3);
  };

  return (
    <section id="signal-map" className="relative px-6 py-24 md:px-12">
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="mb-14 max-w-content mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          <span>SCENE B // SYSTEM TOPOLOGY</span>
        </div>
        <h2 className="mt-3 font-display text-section-heading font-bold text-text-primary">
          The Signal Map<span className="text-cyan">.</span>
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-text-secondary leading-relaxed">
          An integrated ecosystem connecting defensive engineering, local-first machine intelligence,
          and narrative media. Hover or select a discipline node to inspect its telemetry and architectural footprint.
        </p>
      </div>

      <div className="max-w-content mx-auto grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ── INTERACTIVE 4-NODE GRID (LEFT / 7 COLS) ────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {NODES.map((node) => {
            const isSelected = activeNode.id === node.id;
            const isAmber = node.accent === 'amber';

            return (
              <div
                key={node.id}
                onMouseEnter={() => handleNodeFocus(node)}
                onClick={() => handleNodeFocus(node)}
                tabIndex={0}
                onFocus={() => handleNodeFocus(node)}
                className={`group relative cursor-pointer rounded-xl p-6 transition-all duration-300 outline-none ${
                  isSelected
                    ? isAmber
                      ? 'border-amber/60 bg-surface-elevated/90 shadow-amber-glow'
                      : 'border-cyan/60 bg-surface-elevated/90 shadow-cyan-glow'
                    : 'border-border/60 bg-surface/50 hover:border-border hover:bg-surface/80'
                } border backdrop-blur-md`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span
                    className={
                      isSelected
                        ? isAmber
                          ? 'text-amber'
                          : 'text-cyan'
                        : 'text-text-muted'
                    }
                  >
                    NODE // {node.index}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full transition-transform duration-300 ${
                      isSelected
                        ? isAmber
                          ? 'scale-125 bg-amber shadow-[0_0_8px_#FFB65C]'
                          : 'scale-125 bg-cyan shadow-[0_0_8px_#59E1FF]'
                        : 'bg-border'
                    }`}
                  />
                </div>

                <div className="mt-4">
                  <div
                    className={`font-mono text-micro tracking-wider ${
                      isAmber ? 'text-amber/80' : 'text-cobalt'
                    }`}
                  >
                    {node.category}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold text-text-primary group-hover:text-white">
                    {node.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 font-sans text-xs text-text-muted leading-relaxed">
                    {node.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-3 font-mono text-xs">
                  <span className="text-text-faint">SYSTEM ENGAGED</span>
                  <span
                    className={`transition-transform duration-200 group-hover:translate-x-1 ${
                      isAmber ? 'text-amber' : 'text-cyan'
                    }`}
                  >
                    INSPECT →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ACTIVE NODE HUD / TELEMETRY DETAIL (RIGHT / 5 COLS) ────── */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-surface/80 p-8 backdrop-blur-xl lg:col-span-5 shadow-glass-panel">
          <div>
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-ping rounded-full bg-cyan" />
                <span className="font-mono text-xs uppercase tracking-widest text-cyan">
                  NODE TELEMETRY INSPECTOR
                </span>
              </div>
              <span className="font-mono text-xs text-text-muted">
                STATUS: ACTIVE
              </span>
            </div>

            <div className="mt-6">
              <span
                className={`font-mono text-xs uppercase tracking-wider ${
                  activeNode.accent === 'amber' ? 'text-amber' : 'text-cobalt'
                }`}
              >
                {activeNode.category}
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-text-primary">
                {activeNode.title}
              </h3>
              <p className="mt-3 font-sans text-sm text-text-secondary leading-relaxed">
                {activeNode.summary}
              </p>
            </div>

            {/* Verified Metrics Matrix */}
            <div className="mt-6 space-y-3">
              <div className="font-mono text-micro uppercase tracking-wider text-text-muted">
                VERIFIED OPERATIONAL EVIDENCE
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {activeNode.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border-subtle bg-void/60 p-3"
                  >
                    <div className="font-mono text-[10px] uppercase text-text-muted">
                      {m.label}
                    </div>
                    <div className="mt-1 font-display text-sm font-semibold text-text-primary">
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tooling Stack */}
            <div className="mt-6">
              <div className="font-mono text-micro uppercase tracking-wider text-text-muted mb-2">
                CORE ARSENAL & TOOLING
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded bg-surface-elevated/70 px-2.5 py-1 font-mono text-[11px] text-text-secondary border border-border-subtle"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Deep Route Action */}
          <div className="mt-8 border-t border-border-subtle pt-6">
            <Link
              to={activeNode.route}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-surface-elevated px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-text-primary border border-border hover:border-cyan hover:text-cyan hover:shadow-cyan-glow transition-all"
            >
              <span>Explore {activeNode.title} Portfolio</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
