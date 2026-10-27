---
title: "Enterprise Secure Network Architecture"
description: "A comprehensive zero-trust enterprise network design for Meridian Financial Group mapped to RBI guidelines, DPDP Act 2023, PCI DSS v4.0, and ISO 27001. Accompanied by a 39-page engineering report and 42 lab evidence captures."
tools:
  - Zero-Trust Architecture
  - OpenVAS
  - FreeRADIUS
  - pfSense
  - Wireshark
  - 802.1X
  - Micro-segmentation
github_link: "https://github.com/gururajseethur/enterprise-secure-network-architecture"
demo_link: ""
thumbnail: ""
status: "Active"
category: "Architecture"
date: 2026-09-23T06:40:00.000Z
---

# Enterprise Secure Network Architecture

A zero-trust network design tailored for a multinational financial services group ("Meridian Financial Group"), anchored in India to reflect genuine regulatory compliance and threat modeling requirements.

## Regulatory & Standards Mapping

- **RBI Cybersecurity Framework:** High-resilience segmentation for banking and NBFC operations.
- **Digital Personal Data Protection (DPDP) Act 2023:** Data minimization, encryption at rest/transit, and access control boundaries.
- **PCI DSS v4.0:** Strict micro-segmentation isolating the Cardholder Data Environment (CDE).
- **ISO/IEC 27001:2022 & NIST SP 800-61:** Formalized incident response and disaster recovery procedures.

## Deliverables & Evidence

- **39-Page Engineering Report:** Executive summary, current-state vulnerability baseline, risk register, gap analysis, perimeter defense topology, and phased migration roadmap.
- **42 Lab Artifacts:** Screen captures and pcap files across 10 structured technical exercises (OpenVAS vulnerability scans, 802.1X EAP-TLS FreeRADIUS network access control, segmented VLAN routing, and post-incident forensic reviews).
