import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const projects = [
  {
    title: 'Offensive Security Lab Environment',
    description:
      'Multi-machine pentest lab on Ubuntu Server using VirtualBox and Docker. Four attack surfaces: vulnerable web app (OWASP), misconfigured Linux target, privilege escalation chain, and network enumeration box. Full documented attack paths from recon → exploitation → root. 54+ TryHackMe rooms completed including Mr Robot, RootMe, and Boiler CTF.',
    tools: ['Kali Linux', 'Nmap', 'Metasploit', 'Gobuster', 'Burp Suite', 'VirtualBox', 'Docker'],
    status: 'Active',
    statusColor: 'bg-cyan-400',
    category: 'Offensive Security',
    accent: 'from-red-500/10 to-orange-500/10',
  },
  {
    title: 'Python Recon & Scanning Automation',
    description:
      'Custom Python tool that accepts a target IP, runs structured Nmap scans, saves output to organized files, extracts open ports and services, and renders a clean summary. Production-minded architecture with modular functions and error handling — not a one-off script.',
    tools: ['Python', 'Nmap', 'Subprocess', 'JSON', 'Bash'],
    status: 'Active',
    statusColor: 'bg-cyan-400',
    category: 'Security Tooling',
    accent: 'from-green-500/10 to-emerald-500/10',
  },
  {
    title: 'HexaMine: Self-Hosted Private Cloud',
    description:
      'Bare-metal Ubuntu Server infrastructure running all personal services. Nginx reverse proxy with SSL termination via Certbot, automated backups, containerized service orchestration. The foundation everything else runs on.',
    tools: ['Ubuntu Server', 'Nginx', 'Docker', 'Certbot', 'Bash', 'SSH'],
    status: 'Deployed',
    statusColor: 'bg-emerald-400',
    category: 'Infrastructure',
    accent: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    title: 'Local AI Infrastructure (Ollama + N8N)',
    description:
      'Self-hosted LLM inference stack using Ollama with local model management. Integrated with N8N for automated prompt chaining and vector-augmented retrieval workflows. Zero cloud dependencies — fully private.',
    tools: ['Ollama', 'N8N', 'Python', 'Docker', 'ChromaDB'],
    status: 'Active',
    statusColor: 'bg-cyan-400',
    category: 'AI Infrastructure',
    accent: 'from-purple-500/10 to-pink-500/10',
  },
  {
    title: 'HexaCore: Docker Control Plane',
    description:
      'Docker-safe action control plane with whitelist enforcement and safety validation. Prometheus + Grafana observability stack with Promtail log aggregation across all self-hosted services. Built to monitor and manage containerized infrastructure securely.',
    tools: ['Docker', 'Prometheus', 'Grafana', 'Promtail', 'Terraform'],
    status: 'Deployed',
    statusColor: 'bg-emerald-400',
    category: 'DevOps & Automation',
    accent: 'from-green-500/10 to-emerald-500/10',
  },
];

export default function ProjectsPage() {
  return (
    <div className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="accent-line mb-6" />
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Projects
          </h1>
          <p className="font-sans text-lg text-white/35 mb-16 max-w-lg leading-relaxed">
            Nothing vague. Every project here is deployed, active, or documented with specifics.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 100}>
              <div className={`glass-card p-7 md:p-9 bg-gradient-to-br ${p.accent}`}>
                <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                  <div>
                    <span className="font-sans text-xs text-white/25 uppercase tracking-widest font-medium">
                      {p.category}
                    </span>
                    <h2 className="font-sans text-xl md:text-2xl font-semibold text-white mt-1">
                      {p.title}
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className={`w-2 h-2 rounded-full ${p.statusColor}`} />
                    <span className="font-sans text-xs text-white/50">{p.status}</span>
                  </span>
                </div>

                <p className="font-sans text-sm md:text-base text-white/40 leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
