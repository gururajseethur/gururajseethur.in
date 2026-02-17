import React from 'react';

/**
 * SYSTEMS BUILT — Deployed infrastructure and projects.
 * Structured entries with descriptions, tools, and links.
 * Translucent backing for legibility over particles.
 */

const systems = [
  {
    id: '0xS01',
    name: 'UBUNTU_SERVER_CLOUD',
    title: 'Ubuntu Server Personal Cloud Deployment',
    description:
      'Self-hosted cloud infrastructure on bare-metal Ubuntu Server. Reverse proxy routing via Nginx, SSL termination, automated backups, and containerized service orchestration.',
    tools: ['Ubuntu Server', 'Nginx', 'Docker', 'Certbot', 'Bash'],
    status: 'DEPLOYED',
    github: '#',
  },
  {
    id: '0xS02',
    name: 'PRIVATE_AI_STACK',
    title: 'Private AI Stack Architecture',
    description:
      'Air-gapped LLM inference pipeline using Ollama with custom model management. Integrated with N8N for automated prompt chaining and vector-augmented retrieval workflows.',
    tools: ['Ollama', 'N8N', 'Python', 'Docker', 'ChromaDB'],
    status: 'ACTIVE',
    github: '#',
  },
  {
    id: '0xS03',
    name: 'AUTOMATION_ENGINE',
    title: 'Automation Workflow Engine',
    description:
      'Event-driven automation platform orchestrating CI/CD pipelines, monitoring alerts, and infrastructure provisioning. Prometheus + Grafana observability stack with Promtail log aggregation.',
    tools: ['Prometheus', 'Grafana', 'Promtail', 'Docker', 'Terraform'],
    status: 'DEPLOYED',
    github: '#',
  },
  {
    id: '0xS04',
    name: 'PENTEST_LAB',
    title: 'Penetration Testing Lab Environment',
    description:
      'Isolated network environment for offensive security research. Vulnerable VM targets, network enumeration toolchains, privilege escalation chains, and structured attack documentation.',
    tools: ['Kali Linux', 'Metasploit', 'Nmap', 'Burp Suite', 'Wireshark'],
    status: 'TRAINING',
    github: '#',
  },
];

export default function SystemsSection() {
  return (
    <section className="section-block" id="section-systems">
      <div className="section-panel max-w-3xl mx-auto w-full px-4">
        <div className="hud-text text-core-cyan mb-2 tracking-[0.15em]">
          // SYSTEMS_BUILT
        </div>
        <h2 className="font-mono text-2xl md:text-[1.75rem] font-semibold text-core-bright mb-2 tracking-tight">
          Deployed Infrastructure
        </h2>
        <div className="hud-text text-core-muted mb-10 text-[0.55rem]">
          ACTIVE DEPLOYMENTS AND RESEARCH PLATFORMS
        </div>

        <div className="space-y-5">
          {systems.map((sys) => (
            <div
              key={sys.id}
              className="border border-core-border p-5 md:p-6 hover:border-core-muted transition-colors duration-150"
            >
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <span className="font-mono text-[0.6rem] text-core-muted mr-2">
                    [{sys.id}]
                  </span>
                  <span className="font-mono text-sm md:text-base text-core-bright font-medium">
                    {sys.title}
                  </span>
                </div>
                <span
                  className={`font-mono text-[0.6rem] shrink-0 ${
                    sys.status === 'DEPLOYED'
                      ? 'text-core-green'
                      : sys.status === 'ACTIVE'
                      ? 'text-core-cyan'
                      : 'text-core-muted'
                  }`}
                >
                  {sys.status}
                </span>
              </div>

              <p className="font-sans text-sm text-core-text leading-relaxed mb-4">
                {sys.description}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {sys.tools.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[0.6rem] px-2 py-0.5 border border-core-border text-core-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {sys.github && sys.github !== '#' && (
                  <a
                    href={sys.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-interactive
                    className="font-mono text-[0.6rem] text-core-muted hover:text-core-cyan transition-colors"
                  >
                    [SOURCE]
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
