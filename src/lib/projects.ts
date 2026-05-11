export type Project = {
  name: string;
  description: string;
  lang: string;
  updated: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "ISMSearch",
    description:
      "Index of the Australian Government Information Security Manual as searchable documents.",
    lang: "TypeScript",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/ISMSearch",
  },
  {
    name: "IOC-Dispatch",
    description:
      "Speeds up and automates the reporting of Indicators of Compromise to relevant authorities.",
    lang: "TypeScript",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/IOC-Dispatch",
  },
  {
    name: "M365-Secure",
    description: "Microsoft 365 security assessment CLI, written in Rust.",
    lang: "Rust",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/M365-Secure",
  },
  {
    name: "NRLPredictor",
    description:
      "Laravel app with a self-tuning prediction model driven by the Claude Agent SDK.",
    lang: "PHP",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/NRLPredictor",
  },
  {
    name: "quote-finder",
    description:
      "Indexes YouTube playlists into a local SQLite/FTS5 transcript store and searches them for phrases.",
    lang: "Python",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/quote-finder",
  },
  {
    name: "OhmsLawCalculator",
    description: "React Native mobile application that calculates Ohm's Law.",
    lang: "Swift / RN",
    updated: "2026.05",
    href: "https://github.com/jusso-dev/OhmsLawCalculator",
  },
  {
    name: "Rusty-files",
    description: "Watches files for hash changes. Rust. Small. Quiet.",
    lang: "Rust",
    updated: "2025.11",
    href: "https://github.com/jusso-dev/Rusty-files",
  },
  {
    name: "Azure-flowlog-parser",
    description: "Parses the JSON payload Azure emits as network flow logs.",
    lang: "C#",
    updated: "2025.11",
    href: "https://github.com/jusso-dev/Azure-flowlog-parser",
  },
];
