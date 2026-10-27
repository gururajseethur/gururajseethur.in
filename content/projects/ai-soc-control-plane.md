---
title: "Local AI SOC Control Plane"
description: "Zero-cloud security operations engine. Ingests Wazuh SIEM alerts, constructs contextual risk envelopes, and runs local Ollama LLM models to generate structured incident assessments with zero API keys or external data leaks."
tools:
  - FastAPI
  - SQLite
  - Ollama
  - Wazuh SIEM
  - Docker
  - React
github_link: "https://github.com/gururajseethur/ai-soc-control-plane"
demo_link: ""
thumbnail: ""
status: "Active"
category: "AI & Infrastructure"
date: 2026-09-22T20:00:00.000Z
---

# Local AI SOC Control Plane

An automated incident assessment engine that runs entirely on local compute — designed specifically for privacy-critical organizations where sensitive security telemetry cannot be routed to public cloud LLM APIs.

## Key Technical Decisions

- **Local-First Inference:** Evaluates security alerts through a local Ollama instance (DeepSeek-Coder / Llama 3) with zero external network dependencies.
- **Wazuh SIEM Ingestion:** Subscribes to raw security events and correlates host activity, process spawning, and network flags into an enriched incident envelope.
- **Structured Triage Reports:** Produces MITRE ATT&CK mapped threat assessments, risk scores, and tactical remediation recommendations.
- **Zero Data Leakage:** Built for organizations handling proprietary IP, PII, or critical infrastructure where data sovereignty is non-negotiable.
