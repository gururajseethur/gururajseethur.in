import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useTryHackMeStats from '../hooks/useTryHackMeStats';

const projects = [
  {
    title: 'Offensive Security Lab Environment',
    description:
      'Multi-machine pentest lab on Ubuntu Server using VirtualBox and Docker. Four attack surfaces: vulnerable web app (OWASP), misconfigured Linux target, privilege escalation chain, and network enumeration box. Full documented attack paths from recon → exploitation → root. __THM_ROOMS__ TryHackMe rooms completed including Mr Robot, RootMe, and Boiler CTF.',
    tools: ['Kali Linux', 'Nmap', 'Metasploit', 'Gobuster', 'Burp Suite', 'VirtualBox', 'Docker'],
    status: 'Active',
    category: 'Offensive Security',
  },
  {
    title: 'Python Recon & Scanning Automation',
    description:
      'Custom Python tool that accepts a target IP, runs structured Nmap scans, saves output to organized files, extracts open ports and services, and renders a clean summary. Production-minded architecture with modular functions and error handling — not a one-off script.',
    tools: ['Python', 'Nmap', 'Subprocess', 'JSON', 'Bash'],
    status: 'Active',
    category: 'Security Tooling',
  },
  {
    title: 'HexaMine: Self-Hosted Private Cloud',
    description:
      'Bare-metal Ubuntu Server infrastructure running all personal services. Nginx reverse proxy with SSL termination via Certbot, automated backups, containerized service orchestration. The foundation everything else runs on.',
    tools: ['Ubuntu Server', 'Nginx', 'Docker', 'Certbot', 'Bash', 'SSH'],
    status: 'Deployed',
    category: 'Infrastructure',
  },
  {
    title: 'Local AI Infrastructure (Ollama + N8N)',
    description:
      'Self-hosted LLM inference stack using Ollama with local model management. Integrated with N8N for automated prompt chaining and vector-augmented retrieval workflows. Zero cloud dependencies — fully private.',
    tools: ['Ollama', 'N8N', 'Python', 'Docker', 'ChromaDB'],
    status: 'Active',
    category: 'AI Infrastructure',
  },
  {
    title: 'HexaCore: Docker Control Plane',
    description:
      'Docker-safe action control plane with whitelist enforcement and safety validation. Prometheus + Grafana observability stack with Promtail log aggregation across all self-hosted services. Built to monitor and manage containerized infrastructure securely.',
    tools: ['Docker', 'Prometheus', 'Grafana', 'Promtail', 'Terraform'],
    status: 'Deployed',
    category: 'DevOps & Automation',
  },
];

/* Staggered card grid that triggers via IntersectionObserver */
function StaggeredCardList({ children }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  return (
    <div ref={ref} className="space-y-6">
      {React.Children.map(children, (child, i) => (
        <div
          className={`card-stagger-child ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: isVisible ? `${i * 80}ms` : '0ms' }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const { roomCount } = useTryHackMeStats();
  const hydratedProjects = projects.map((project) => ({
    ...project,
    description: project.description.replace('__THM_ROOMS__', `${roomCount}`),
  }));

  return (
    <div className="page-panel px-5 md:px-8 pt-24 md:pt-28 py-16 md:py-24">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Projects</div>
          <div className="accent-line mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-fg mb-3 tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-fg-secondary mb-16 max-w-lg leading-relaxed">
            Nothing vague. Every project here is deployed, active, or documented with specifics.
          </p>
        </ScrollReveal>

        <StaggeredCardList>
          {hydratedProjects.map((p) => (
            <div key={p.title} className="solid-card p-7 md:p-9">
              <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                <div>
                  <span className="font-mono text-xs text-fg-muted uppercase tracking-widest font-medium">
                    {p.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-fg mt-1">
                    {p.title}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-edge">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-mono text-xs text-fg-secondary">{p.status}</span>
                </span>
              </div>

              <p className="text-sm text-fg-secondary leading-relaxed mb-6">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </StaggeredCardList>
      </div>
    </div>
  );
}
