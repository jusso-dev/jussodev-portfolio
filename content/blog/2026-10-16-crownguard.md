---
title: "crownguard: find your crown jewels and explain the risk to leadership"
date: 2026-10-16
summary: A guided self-assessment for Microsoft 365, Google Workspace and AWS that runs entirely in your browser and produces a branded PDF report.
tags: [security, microsoft-365, aws, governance]
draft: false
---

crownguard is a guided self-assessment for Microsoft 365, Google Workspace and AWS. You name the things that would hurt most if they were compromised, answer plain-language control questions about them, and download a PDF report with your logo and colours on it. It runs entirely in your browser. There's no backend, no account and no analytics, so nothing you type leaves your device.

You can use it now at [jusso-dev.github.io/crownguard](https://jusso-dev.github.io/crownguard/).

## Why I built it

Generic security checklists treat every control as equally important. In practice the conversation with leadership is about specific things: the Entra ID tenant, the Global Administrators, the HR SharePoint site, the finance shared drive, how far Copilot or Gemini can reach into your data. I wanted a tool that starts from those crown jewels, works out how exposed each one is, and turns the answers into a report people will actually read.

I also didn't want anyone uploading their security posture to a stranger's server. Keeping it all in the browser solves that.

## How it works

You start with the organisation: name, ABN (checked against the ATO check digit), sector, size and obligations like the Privacy Act. Then you pick the platforms in scope and their licence tiers.

Next come the crown jewels. Guided prompts walk through identity, privileged access, business data, collaboration and email, endpoints, cloud and AI assistants. Each one gets a classification, impact ratings and the exposures that apply today, like standing admin rights or guest access.

The controls step only asks questions relevant to your crown jewels and licences. Each question cites the Microsoft, Google or AWS guidance it comes from and maps to CIS Benchmarks, the Essential Eight, NIST CSF 2.0, the ISM and the Home Affairs Industry Data Classification Framework. "Unknown" counts as a gap. Marking something N/A means giving a reason, and until you do it counts as unanswered.

If you've already run a scanner, you can import its results to pre-fill answers: M365-Secure for Microsoft 365, Prowler for AWS and Azure, and ScubaGoggles for Google Workspace. Every pre-filled answer shows the scan evidence and you can change it.

Risk is impact times likelihood on a 5×5 matrix. Likelihood rises with the share of relevant controls you're missing, weighted by severity, plus any recorded exposures. While a critical control is missing it can't drop below 3. The scoring code lives in `src/engine` with tests next to it.

There are two optional modules. A SOC maturity assessment uses 37 questions built on the five domains of the SOC-CMM v2.4 model. An AI use-case register follows the Digital Transformation Agency's Standard for accountability, adds readiness questions from the DTA's responsible AI policy, and exports to CSV or XLSX. The register also runs on its own if that's all you need.

The PDF covers scope, an executive summary, the heatmap, crown jewel and risk registers, findings with fixes, a 30/60/90-day roadmap, indicative Essential Eight maturity and references. Progress autosaves in the browser, and you can encrypt it with a passphrase or save a versioned `.crownguard.json` file.

## Limitations

It's a self-assessment, not an audit. It doesn't connect to your tenant or verify your answers, and it only covers the cloud platform, not your whole environment. The Essential Eight result is indicative, and the AI readiness check isn't a DTA assessment. Use it to start the right conversation, then verify.

## Try it

The hosted version is the easiest way in. To run it yourself:

```sh
pnpm install
pnpm dev
```

`pnpm build` produces a static site you can host anywhere. There's also a headless CLI for consulting work or CI:

```sh
pnpm cg new --org "Riverbend Health" --platforms microsoft --out a.crownguard.json
pnpm cg score a.crownguard.json
pnpm cg render a.crownguard.json report.pdf
```

The code is MIT licensed at [github.com/jusso-dev/crownguard](https://github.com/jusso-dev/crownguard).
