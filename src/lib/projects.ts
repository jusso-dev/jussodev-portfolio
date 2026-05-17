export type Project = {
  name: string;
  description: string;
  lang: string;
  updated: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "ScopeStack",
    description:
      "Branded SOW, proposal, and quote workflow with templates, client portal acceptance, audit trails, and PDFs.",
    lang: "TypeScript",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/ScopeStack",
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
