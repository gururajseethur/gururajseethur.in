---
title: "Cyber Constellation — Security Automation Platform"
description: "65 orchestrated security workflows spanning SOC operations, GRC, IAM, vulnerability management, DFIR, DevSecOps and cloud posture, driven by a FastAPI control plane with JWT auth, HMAC verification, and tenant isolation."
tools:
  - FastAPI
  - PostgreSQL
  - n8n
  - Docker Compose
  - Grafana
  - Python
  - Nginx
github_link: "https://github.com/gururajseethur/security-automation-platform"
demo_link: ""
thumbnail: ""
status: "Active"
category: "Security"
date: 2026-09-23T05:15:00.000Z
---

# Cyber Constellation

A unified security automation platform designed to answer a practical engineering problem: **how much of a security team's repetitive triage and compliance overhead can be automated without giving up auditability or data sovereignty?**

## Architecture & System Design

The platform places a hardened FastAPI control plane (`sentinel-api`) in front of an enterprise n8n workflow cluster, backed by a 45-table PostgreSQL data model with 23 targeted indexes.

- **FastAPI Control Plane:** RS256 JWT authorization, HMAC-SHA256 signature verification on inbound webhooks, per-tenant rate limiting, and structured audit logs.
- **Master Orchestrator:** Centralized request router with automatic exponential-backoff retry policies and dead-letter queues.
- **Domain Coverage (65 Workflows):**
  - **Blue Team / SOC (6 workflows):** Alert ingestion, threat enrichment, triage routing, ticket automation.
  - **GRC (5 workflows):** Evidence collection, audit trail validation, compliance checks.
  - **IAM & Privileged Access (5 workflows):** Offboarding revocation, inactive session cleanup, permission auditing.
  - **Vulnerability Management (6 workflows):** CVE matching, SLA tracking, patch notification queues.
  - **DFIR (5 workflows):** Host isolation triggers, volatile evidence capture, timeline assembly.
  - **DevSecOps & Cloud Posture (12+ workflows):** Pipeline security scanning, policy drift detection, container auditing.
- **Metrics & Visualization:** Provisioned Grafana dashboard tracking mean-time-to-respond (MTTR), active webhooks, and workflow error budgets.
