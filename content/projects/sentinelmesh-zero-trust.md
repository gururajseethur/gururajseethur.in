---
title: "SentinelMesh — Zero-Trust Threat Intelligence Gateway"
description: "Zero-trust edge gateway for threat intelligence platforms (MISP, OpenCTI, TheHive) enforcing mandatory RS256 JWKS verification on every API request. Capstone for BIA Master-Diploma in Ethical Hacking & Cybersecurity."
tools:
  - Node.js
  - Keycloak
  - MISP
  - OpenCTI
  - TheHive
  - React 19
  - Vite 8
github_link: "https://github.com/gururajseethur/sentinelmesh-cti-gateway"
demo_link: ""
thumbnail: ""
status: "Active"
category: "Security"
date: 2026-09-20T12:00:00.000Z
---

# SentinelMesh

A zero-trust edge gateway designed for secure multi-tenant threat intelligence exchange across distributed defense teams.

## Problem Statement

Threat intelligence sharing platforms (MISP, OpenCTI, TheHive) are high-value targets. Traditional edge configurations often rely on static bearer tokens or perimeter trust, risking unauthorized ingestion or data leaks if an internal node is compromised.

## Technical Approach & Architecture

- **Fail-Closed API Proxy (`tisp-proxy`):** Every inbound API request is verified against a live Keycloak JWKS endpoint before touching upstream threat sharing services. No bypass mode, no symmetric secret fallback, no degraded state — invalid tokens receive immediate 401 rejection.
- **Identity & Access Management:** OpenID Connect (OIDC) integration via Keycloak with fine-grained role-based access control (RBAC).
- **Interactive Command Center:** Built with React 19 and Vite 8, featuring dual runtime modes: full live Keycloak authentication or a simulated sandbox mode for security auditing and demonstrations.
- **Capstone Credentials:** Successfully defended as the capstone project for the Spinnaker Analytics / Boston Institute of Analytics Master-Diploma in Cyber Security & Ethical Hacking.
