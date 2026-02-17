---
title: "HexaMine: Self-Hosted Private Cloud"
description: "Bare-metal Ubuntu Server infrastructure running all personal services. Nginx reverse proxy with SSL termination via Certbot, automated backups, containerized service orchestration."
tools:
  - Ubuntu Server
  - Nginx
  - Docker
  - Certbot
  - Bash
  - SSH
github_link: ""
demo_link: ""
thumbnail: ""
status: "Deployed"
category: "Infrastructure"
date: 2025-11-15T00:00:00.000Z
---

Full bare-metal Ubuntu Server deployment powering all personal infrastructure.

## Architecture

- Nginx reverse proxy with automated SSL via Certbot
- Docker-based service isolation
- Cron-driven backup pipeline
- SSH hardened access

## Key Decisions

Everything runs on one physical machine — intentionally. This forces real constraint-based engineering instead of throwing cloud credits at problems.
