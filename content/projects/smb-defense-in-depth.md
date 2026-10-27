---
title: "SMB Defense-in-Depth Cybersecurity Framework"
description: "CIS Controls v8 (IG1) baseline implemented for a 28-person SMB entirely using open-source tools. Validated with live Ubuntu VM lab evidence: 96.75% SYN-flood drop, Fail2Ban auto-banning, Suricata 8.0 IDS with 50.4k signatures, and ClamAV."
tools:
  - iptables
  - nftables
  - Suricata 8.0
  - Fail2Ban
  - ClamAV
  - Wireshark
  - Nmap
  - Lynis
github_link: "https://github.com/gururajseethur/smb-cybersecurity-framework"
demo_link: ""
thumbnail: ""
status: "Deployed"
category: "Security"
date: 2026-10-17T14:50:00.000Z
---

# SMB Cybersecurity Framework — Meridian Supplies

A cost-effective, defense-in-depth cybersecurity framework tailored for small-to-medium businesses, taking a representative 28-person enterprise from an unsegmented, high-risk posture to a segmented, monitored, and recoverable architecture.

## Empirical Lab Evidence

All recommended safeguards were built and stress-tested in an isolated Ubuntu VM environment:

| Defense Control | Security Tool | Measured Outcome |
|---|---|---|
| **Network DoS Mitigation** | `iptables` / `nftables` | **96.75% SYN-flood packets dropped** (1,935 / 2,000 dropped under attack load); 342 ICMP-flood packets metered. |
| **Brute-Force Mitigation** | `Fail2Ban` | Continuous SSH brute-force attack detected; attacker IP automatically isolated via kernel REJECT rule within 3 attempts. |
| **Intrusion Detection (NIDS)** | `Suricata 8.0` | 50,400 Emerging Threats (ET Open) signatures loaded; generated 44 named alerts identifying unauthorized database access and lateral movement. |
| **Endpoint Protection** | `ClamAV 1.4.4` | 3.6M active signature database; successfully identified EICAR test artifacts and quarantined malicious binaries. |
| **System Hardening** | `Lynis 3.1` | Hardening index elevated from baseline 54 to 81 through SSH parameter tuning, umask restriction, and kernel sysctl lockdowns. |
