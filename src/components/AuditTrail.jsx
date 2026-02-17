import React from 'react';

/**
 * SECURITY LOG — Structured audit grid.
 *
 * Format: [ 0x001 ] IDENTIFIER   STATUS
 * Monospace. High contrast. Instant rendering.
 * No typing animations. No glow. No slide effects.
 * Data appears like a database dump.
 */

const securityEntries = [
  { addr: '0x001', label: 'INITIAL_RECON', status: 'PASSED' },
  { addr: '0x002', label: 'NETWORK_ENUM', status: 'PASSED' },
  { addr: '0x003', label: 'PRIV_ESC_LABS', status: 'STABLE' },
  { addr: '0x004', label: 'WEB_APP_PENTEST', status: 'ACTIVE' },
  { addr: '0x005', label: 'OSCP_TRAJECTORY', status: 'ACTIVE' },
  { addr: '0x006', label: 'ACTIVE_DIRECTORY', status: 'QUEUED' },
  { addr: '0x007', label: 'WIRELESS_AUDIT', status: 'QUEUED' },
  { addr: '0x008', label: 'BUFFER_OVERFLOW', status: 'TRAINING' },
];

const infraEntries = [
  { addr: '0x010', label: 'DOCKER_ORCHESTRATION', status: 'PASSED' },
  { addr: '0x011', label: 'K8S_DEPLOYMENT', status: 'PASSED' },
  { addr: '0x012', label: 'TERRAFORM_IaC', status: 'STABLE' },
  { addr: '0x013', label: 'CI_CD_PIPELINES', status: 'PASSED' },
  { addr: '0x014', label: 'MONITORING_STACK', status: 'ACTIVE' },
  { addr: '0x015', label: 'NGINX_REVERSE_PROXY', status: 'PASSED' },
];

const aiEntries = [
  { addr: '0x020', label: 'LLM_INTEGRATION', status: 'ACTIVE' },
  { addr: '0x021', label: 'ML_PIPELINE_ARCH', status: 'ACTIVE' },
  { addr: '0x022', label: 'VECTOR_DB_IMPL', status: 'STABLE' },
  { addr: '0x023', label: 'AGENT_FRAMEWORK', status: 'ACTIVE' },
  { addr: '0x024', label: 'RAG_PIPELINE', status: 'BUILDING' },
];

const statusClass = {
  PASSED: 'status-passed',
  STABLE: 'status-stable',
  ACTIVE: 'status-active',
  QUEUED: 'text-core-muted',
  TRAINING: 'text-core-cyan',
  BUILDING: 'text-core-cyan',
};

function AuditBlock({ title, entries }) {
  return (
    <div className="mb-8">
      <div className="hud-text text-core-muted mb-3 text-[0.6rem] tracking-[0.2em]">
        ── {title} ──────────────────────────────
      </div>
      <div>
        {entries.map((entry) => (
          <div key={entry.addr} className="audit-row">
            <span className="addr">[ {entry.addr} ] </span>
            <span className="label">{entry.label.padEnd(24)}</span>
            <span className={statusClass[entry.status] || 'text-core-muted'}>
              {entry.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SecuritySection() {
  return (
    <section className="section-block" id="section-security">
      <div className="section-panel max-w-3xl mx-auto w-full px-4">
        <div className="hud-text text-core-cyan mb-2 tracking-[0.15em]">
          // SECURITY_LOG
        </div>
        <h2 className="font-mono text-2xl md:text-[1.75rem] font-semibold text-core-bright mb-2 tracking-tight">
          Audit Trail
        </h2>
        <div className="hud-text text-core-muted mb-10 text-[0.55rem]">
          CLASSIFICATION: OPERATOR_EYES_ONLY // RETRIEVED: {new Date().toISOString().slice(0, 10)}
        </div>

        <AuditBlock title="OFFENSIVE_SECURITY" entries={securityEntries} />
        <AuditBlock title="INFRASTRUCTURE" entries={infraEntries} />
        <AuditBlock title="AI_SYSTEMS" entries={aiEntries} />

        <div className="mt-4 border-t border-core-border pt-4">
          <div className="audit-row text-core-muted">
            <span className="addr">[ EOF  ] </span>
            <span className="label">{'AUDIT_COMPLETE'.padEnd(24)}</span>
            <span className="status-passed">OK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
