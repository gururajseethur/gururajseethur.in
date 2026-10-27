import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FEATURED_PROJECTS = [
  {
    id: 'cyber-constellation',
    index: '01',
    title: 'Cyber Constellation',
    subtitle: 'Enterprise Security Automation Platform',
    category: 'SECURITY AUTOMATION',
    status: 'PRODUCTION DEPLOYED',
    statusColor: '#59E1FF',
    problem:
      'Security operations teams suffer from alert fatigue, fragmented tools, and slow manual remediation, while third-party cloud SOAR platforms compromise data sovereignty.',
    contribution:
      'Sole architect and developer. Designed the complete FastAPI control plane, 45-table PostgreSQL data model, 65 automated n8n workflows across 12 domains, and Grafana observability.',
    approach:
      'Engineered an HMAC-authenticated API gateway in front of an orchestrated workflow cluster with tenant isolation, rate limiting, and automated dead-letter queues.',
    evidence: [
      '65 production workflows spanning SOC, GRC, IAM, DFIR, and DevSecOps',
      '45 relational tables with 23 performance indexes in PostgreSQL',
      'End-to-end containerized deployment with TLS termination and health monitoring',
    ],
    tools: ['FastAPI', 'PostgreSQL', 'n8n', 'Docker Compose', 'Grafana', 'Python', 'Nginx'],
    github: 'https://github.com/gururajseethur/security-automation-platform',
    accent: 'cyan',
    architectureBadge: 'FASTAPI + N8N + POSTGRESQL',
    diagramType: 'pipeline',
  },
  {
    id: 'sentinelmesh',
    index: '02',
    title: 'SentinelMesh',
    subtitle: 'Zero-Trust Threat Intelligence Gateway',
    category: 'IDENTITY & ZERO-TRUST',
    status: 'CAPSTONE DEFENDED',
    statusColor: '#5276FF',
    problem:
      'Threat sharing platforms (MISP, OpenCTI, TheHive) frequently rely on static API tokens or perimeter trust, risking unauthorized ingestion or data leaks if an internal node is breached.',
    contribution:
      'Architected the fail-closed Node.js API proxy and engineered the React 19 command center with dual runtime modes (live Keycloak OIDC vs simulation).',
    approach:
      'Every inbound request is cryptographically validated against a live RS256 JWKS endpoint before touching any upstream threat store. No bypass mode, no symmetric fallback.',
    evidence: [
      'Strict fail-closed RS256 JWT verification with live JWKS keyset caching',
      'Full Keycloak OIDC integration with role-based access control (RBAC)',
      'Defended as Capstone for Spinnaker Analytics / BIA Master-Diploma in Cyber Security',
    ],
    tools: ['Node.js', 'Keycloak', 'MISP', 'OpenCTI', 'TheHive', 'React 19', 'Vite 8'],
    github: 'https://github.com/gururajseethur/sentinelmesh-cti-gateway',
    accent: 'cobalt',
    architectureBadge: 'RS256 JWKS + KEYCLOAK OIDC',
    diagramType: 'auth',
  },
  {
    id: 'smb-framework',
    index: '03',
    title: 'SMB Defense-in-Depth',
    subtitle: 'CIS Controls v8 (IG1) Verified Architecture',
    category: 'INFRASTRUCTURE HARDENING',
    status: 'EMPIRICAL LAB EVIDENCE',
    statusColor: '#59E1FF',
    problem:
      'Small businesses face advanced ransomware and credential attacks but cannot afford enterprise SIEM/EDR licensing, leaving flat networks and exposed services vulnerable.',
    contribution:
      'Designed and executed complete defensive transformation for a 28-person enterprise; provisioned Linux VMs and captured empirical proof under active attack simulations.',
    approach:
      'Layered free and open-source controls into a cohesive defense-in-depth stack aligned with CIS Critical Security Controls v8 Implementation Group 1 (IG1).',
    evidence: [
      '96.75% SYN-flood drop (1,935 / 2,000 malicious packets stopped by iptables)',
      'Automatic attacker IP isolation via Fail2Ban kernel REJECT rules',
      'Suricata 8.0 loaded with 50,400 ET Open rules generating 44 targeted alerts',
      'System hardening index improved from 54 to 81 on Lynis audit tests',
    ],
    tools: ['iptables', 'nftables', 'Suricata 8.0', 'Fail2Ban', 'ClamAV', 'Wireshark', 'Lynis'],
    github: 'https://github.com/gururajseethur/smb-cybersecurity-framework',
    accent: 'cyan',
    architectureBadge: 'CIS CONTROLS V8 (IG1)',
    diagramType: 'lab',
  },
  {
    id: 'ai-soc',
    index: '04',
    title: 'Local AI SOC Control Plane',
    subtitle: 'Privacy-First Autonomous Triage Engine',
    category: 'SOVEREIGN AI SYSTEMS',
    status: 'ACTIVE EXPERIMENT',
    statusColor: '#FFB65C',
    problem:
      'Feeding proprietary security logs, network topology, and incident alerts to public cloud LLM APIs risks massive intellectual property and privacy exposure.',
    contribution:
      'Engineered local alert ingestion from Wazuh SIEM, contextual prompt assembly, and localized model orchestration via Ollama.',
    approach:
      '100% on-premise execution. Security alerts are normalized, mapped against MITRE ATT&CK techniques, and processed through local quantized LLMs without external API keys.',
    evidence: [
      'Zero external cloud network connections required for inference',
      'Wazuh alert correlation into structured incident triage summaries',
      'Sub-second local assessment pipeline using optimized local models',
    ],
    tools: ['FastAPI', 'Ollama', 'Wazuh SIEM', 'Docker', 'SQLite', 'Python'],
    github: 'https://github.com/gururajseethur/ai-soc-control-plane',
    accent: 'amber',
    architectureBadge: '100% LOCAL / OLLAMA LLM',
    diagramType: 'ai',
  },
];

export default function SceneFeaturedProjects() {
  const [activeTab, setActiveTab] = useState('cyber-constellation');
  const project = FEATURED_PROJECTS.find((p) => p.id === activeTab) || FEATURED_PROJECTS[0];

  return (
    <section id="projects" className="relative px-6 py-24 md:px-12 bg-void/50">
      <div className="max-w-content mx-auto">
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              <span>SCENE C // ENGINEERING CASE STUDIES</span>
            </div>
            <h2 className="mt-3 font-display text-section-heading font-bold text-text-primary">
              Featured Systems<span className="text-cyan">.</span>
            </h2>
            <p className="mt-3 max-w-xl font-sans text-text-secondary leading-relaxed">
              Real code, empirical lab evidence, and production architectures. No generic templates or fabricated metrics.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 self-start font-mono text-xs font-semibold text-cyan hover:text-white border-b border-cyan/40 pb-1 transition-colors"
          >
            <span>VIEW COMPLETE REPOSITORY CATALOG ({FEATURED_PROJECTS.length}+)</span>
            <span>→</span>
          </Link>
        </div>

        {/* ── TAB SELECTOR BUTTONS ─────────────────────────────────────── */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-8 border-b border-border-subtle scrollbar-none">
          {FEATURED_PROJECTS.map((p) => {
            const isSelected = p.id === activeTab;
            const isAmber = p.accent === 'amber';

            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex shrink-0 items-center gap-3 rounded-lg px-5 py-3 font-mono text-xs tracking-wider transition-all duration-200 outline-none ${
                  isSelected
                    ? isAmber
                      ? 'bg-amber/15 text-amber border border-amber/40 shadow-amber-glow'
                      : 'bg-cyan/15 text-cyan border border-cyan/40 shadow-cyan-glow'
                    : 'bg-surface/50 text-text-muted border border-border/40 hover:bg-surface hover:text-text-primary'
                }`}
              >
                <span className="opacity-60">{p.index}</span>
                <span className="font-semibold">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── FEATURED PROJECT HERO CASE STUDY CARD ───────────────────── */}
        <div className="glass-panel p-8 md:p-12 border border-border/80 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div
            className={`absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px] pointer-events-none opacity-20 ${
              project.accent === 'amber' ? 'bg-amber' : 'bg-cyan'
            }`}
          />

          {/* Card Topline Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-cobalt">
                CASE STUDY // {project.index}
              </span>
              <span className="text-border">/</span>
              <span className="font-mono text-xs text-text-muted uppercase">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-micro px-2.5 py-1 rounded bg-surface border border-border-subtle text-text-muted">
                {project.architectureBadge}
              </span>
              <span
                className="font-mono text-micro px-2.5 py-1 rounded font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${project.statusColor}18`,
                  color: project.statusColor,
                  border: `1px solid ${project.statusColor}44`,
                }}
              >
                {project.status}
              </span>
            </div>
          </div>

          {/* Project Title & Subtitle */}
          <div className="mt-6">
            <h3 className="font-display text-2xl md:text-4xl font-bold text-text-primary">
              {project.title}
            </h3>
            <div className="mt-1 font-mono text-sm text-cyan">
              {project.subtitle}
            </div>
          </div>

          {/* Main 2-Column Content Split */}
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left: Problem, Contribution, Approach (7 cols) */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <span className="text-danger">01 //</span> THE CHALLENGE & PROBLEM STATEMENT
                </h4>
                <p className="mt-2 font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <span className="text-cyan">02 //</span> ROLE & ARCHITECTURAL CONTRIBUTION
                </h4>
                <p className="mt-2 font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                  {project.contribution}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <span className="text-cobalt">03 //</span> TECHNICAL IMPLEMENTATION
                </h4>
                <p className="mt-2 font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                  {project.approach}
                </p>
              </div>
            </div>

            {/* Right: Verified Evidence Box & Tools (5 cols) */}
            <div className="flex flex-col justify-between rounded-xl border border-border-subtle bg-void/70 p-6 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan">
                    VERIFIED EVIDENCE MATRIX
                  </span>
                  <span className="font-mono text-micro text-success">✓ AUDITED</span>
                </div>

                <ul className="mt-4 space-y-3 font-sans text-xs md:text-sm text-text-secondary">
                  {project.evidence.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-cyan mt-0.5">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border-subtle pt-4">
                  <div className="font-mono text-micro uppercase text-text-muted mb-2.5">
                    STACK & DEPENDENCIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-surface-elevated px-2 py-0.5 font-mono text-micro text-text-secondary border border-border-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-border-subtle flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan px-4 py-2.5 font-mono text-xs font-semibold uppercase text-void hover:brightness-110 transition-all shadow-cyan-glow"
                  >
                    <span>View Repository</span>
                    <span>↗</span>
                  </a>
                )}
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-xs text-text-primary hover:border-cyan hover:text-cyan transition-colors"
                >
                  <span>Detailed Spec</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
