import type { Metadata } from "next";
import { JetBrains_Mono, Special_Elite } from "next/font/google";
import "./globals.css";

const display = Special_Elite({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl =
  process.env.SITE_URL ?? "https://jusso-dev.github.io/jussodev-portfolio";

const description =
  "Justin Middler — Cyber Security Engineer and Software Engineer based in Canberra, ACT. 12+ years across Australian Federal Government engagements in development, cyber-security, SOAR, SIEM (Microsoft Sentinel), ACSC ISM and Essential 8 uplift. Formerly Microsoft, Core Azure Networking.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Justin Middler — Cyber Security Engineer · Canberra, ACT",
  description,
  applicationName: "Justin Middler · Dossier",
  authors: [{ name: "Justin Middler", url: "https://github.com/jusso-dev" }],
  creator: "Justin Middler",
  publisher: "Justin Middler",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  keywords: [
    "Justin Middler",
    "jusso-dev",
    "Cyber Security Engineer",
    "Software Engineer",
    "Canberra ACT",
    "Australian Federal Government",
    "Microsoft Azure",
    "Core Azure Networking",
    "SOAR",
    "SIEM",
    "Microsoft Sentinel",
    "ACSC ISM",
    "Essential 8",
    "IRAP",
    "PSPF",
    "NIST",
    "OWASP",
    "Threat Intelligence",
    "Detection Engineering",
    "TypeScript",
    "Rust",
    "Python",
    "C#",
    ".NET",
    "PowerShell",
    "Kubernetes",
  ],
  openGraph: {
    type: "profile",
    locale: "en_AU",
    url: "/",
    siteName: "Justin Middler · Dossier",
    title: "Justin Middler — Cyber Security Engineer · Canberra, ACT",
    description,
    firstName: "Justin",
    lastName: "Middler",
    username: "jusso-dev",
  },
  twitter: {
    card: "summary",
    title: "Justin Middler — Cyber Security Engineer · Canberra, ACT",
    description,
    creator: "@jusso-dev",
  },
  category: "technology",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Justin Middler",
  alternateName: "jusso-dev",
  jobTitle: "Cyber Security Engineer",
  description,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canberra",
    addressRegion: "ACT",
    addressCountry: "AU",
  },
  sameAs: ["https://github.com/jusso-dev"],
  knowsAbout: [
    "Cyber Security",
    "Software Engineering",
    "Security Orchestration, Automation and Response (SOAR)",
    "Security Information and Event Management (SIEM)",
    "Microsoft Sentinel",
    "Microsoft Azure",
    "Azure Networking",
    "ACSC Information Security Manual (ISM)",
    "ACSC Essential 8",
    "IRAP",
    "PSPF",
    "NIST",
    "OWASP Top 10",
    "Threat Modelling",
    "Secure SDLC",
    "Threat Intelligence",
    "Detection Engineering",
    "Kubernetes",
    "Container Security",
    "TypeScript",
    "Rust",
    "Python",
    "C# / .NET",
    "PowerShell",
  ],
  knowsLanguage: "en",
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Cyber Security Engineer",
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Australian Federal Government",
      },
      skills:
        "SOAR, SIEM (Microsoft Sentinel), threat intelligence, ACSC ISM and Essential 8 uplift, Azure automation",
    },
    {
      "@type": "Occupation",
      name: "Software Engineer, Core Azure Networking",
      occupationLocation: { "@type": "Organization", name: "Microsoft" },
      skills: "C# / .NET, hyperscale networking, traffic engineering",
    },
    {
      "@type": "Occupation",
      name: "Cyber Security Architect",
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Australian Federal Government",
      },
      skills:
        "Secure SDLC, threat modelling, secure code review, OWASP Top 10, ACSC ISM, container platforms (AKS, OpenShift, Tanzu)",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Microsoft Azure AZ-900",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "CompTIA Security+",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Acunetix Web Vulnerability Scanning",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Justin Middler · Dossier",
  url: siteUrl,
  author: { "@type": "Person", name: "Justin Middler" },
  inLanguage: "en-AU",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
