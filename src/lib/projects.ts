export type Project = {
  name: string;
  description: string;
  lang: string;
  updated: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "BlakCert",
    description:
      "Agentic-first, API-first, MCP-native enterprise certificate lifecycle platform for discovery, issuance, rotation, and expiry governance.",
    lang: "TypeScript",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/BlakCert",
  },
  {
    name: "BlakFile",
    description:
      "Secure, AI-native, multi-tenant enterprise file sharing and governance platform with tenant isolation and auditable access.",
    lang: "TypeScript",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/BlakFile",
  },
  {
    name: "DingoDocs",
    description:
      "Open-source, self-hosted penetration testing engagement and reporting platform for scoping, findings, and client-ready reports.",
    lang: "TypeScript",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/DingoDocs",
  },
  {
    name: "Tawny-SOC",
    description:
      "AI-focused SOC/SIEM workspace that ingests Tawny alerts and telemetry, enriches with Sigma-style detections and threat intel, and drives triage, cases, hunting, and Kelpie handoff.",
    lang: "TypeScript",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/Tawny-SOC",
  },
  {
    name: "Kelpie",
    description:
      "Self-hosted incident response and case management for small SOC teams — cases, timelines, and collaborative triage.",
    lang: "TypeScript",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/Kelpie",
  },
  {
    name: "GRiCk",
    description:
      "Self-hosted Governance, Risk, and Intelligent Controls Kit to accelerate ATO workflows: policy lifecycle, control mapping, vendor assurance, evidence collection, and risk decisions.",
    lang: "TypeScript",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/GRiCk",
  },
  {
    name: "Heeler",
    description:
      "Lightweight, secure, auditable NTP server written in Rust.",
    lang: "Rust",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/Heeler",
  },
  {
    name: "Kiln",
    description:
      "Build already-installed Ubuntu VM appliances straight from Docker Compose applications.",
    lang: "Go",
    updated: "2026.07",
    href: "https://github.com/jusso-dev/Kiln",
  },
  {
    name: "Bunya",
    description:
      "Diagram-driven Azure infrastructure as code, with a rules engine that knows when the picture is wrong.",
    lang: "TypeScript",
    updated: "2026.06",
    href: "https://github.com/jusso-dev/Bunya",
  },
  {
    name: "depscan",
    description:
      "Cloud-agnostic endpoint telemetry framework with a static Go agent, plugin inventory (software, packages, certs), JSONL output, and Sentinel forwarding via DCRs.",
    lang: "Go / PowerShell",
    updated: "2026.06",
    href: "https://github.com/jusso-dev/depscan",
  },
  {
    name: "AthenemyLMS",
    description:
      "Self-hostable LMS for course authoring, branded workspaces, payments, certificates, APIs, and automation hooks.",
    lang: "TypeScript",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/AthenemyLMS",
  },
  {
    name: "Tawny",
    description:
      "Self-hosted lightweight EDR with a Zig agent, .NET backend, detection rules, and Sentinel/Wazuh forwarding.",
    lang: "C# / Zig / TS",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/Tawny",
  },
  {
    name: "OakAttest",
    description:
      "Open-source IRAP assessment workspace for scoping, evidence, ISM applicability, findings, and SSP exports.",
    lang: "TypeScript",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/OakAttest",
  },
  {
    name: "awesome-Australian-compliance",
    description:
      "Agent skills and markdown references for Essential Eight, ISM, IRAP, PSPF, privacy, NDB, and compliance work.",
    lang: "Markdown / Shell",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/awesome-Australian-compliance",
  },
  {
    name: "IOC-Dispatch",
    description:
      "API-first IOC submission router with provider routing, audit logs, and safe browser-automation fallbacks.",
    lang: "TypeScript",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/IOC-Dispatch",
  },
];
