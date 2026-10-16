---
title: "ThreatSieve: threat intel that shows its working"
date: 2026-10-16
summary: A Cloudflare-hosted intelligence pipeline and analyst workspace that only gives a verdict when the evidence backs it.
tags: [security, threat-intelligence, cloudflare]
draft: false
---

ThreatSieve takes raw threat data, lines it up against known intelligence and gives an analyst a decision they can check. It runs on Cloudflare Workers, D1, R2, Queues, Workers AI and Vectorize, and it's written in TypeScript end to end.

## Why I built it

Most threat feeds hand you a pile of indicators and a score with no explanation. Bolt a language model onto that and you get confident prose about an IP address nobody has ever seen. I wanted the opposite. If there's nothing supporting a claim, the answer should be "unknown", and that's exactly what the repo checks for: assess `example.com` with no supporting intelligence and you should get an unknown result, not an invented malicious verdict.

So the rules are strict. Models pick from candidates that already exist and can't create intelligence entities. An ATT&CK link from a piece of malware to a technique is treated as a candidate, not proof the indicator behaved that way. Actor similarity isn't attribution. Private telemetry stays inside its tenant. Every remediation step is a recommendation.

## How it works

Data comes in through source adapters for MITRE ATT&CK, MISP Galaxy, Feodo, CISA KEV, ThreatFox and URLhaus. Each one validates with Zod, gives records deterministic identities, keeps provenance and archives the original to R2. Optional adapters for OTX, VirusTotal, GreyNoise, TAXII, STIX and MISP stay off unless you configure them.

Classification uses Cloudflare's Clef typed decision models at fixed points in the pipeline. It calls `clef-flash` first, passes the result through a confidence gate, and escalates to the full `clef` model when the gate isn't satisfied. It doesn't parse generated prose. The full question distributions and candidate sets are kept, so you can see why it landed where it did. If Workers AI isn't available there's no quiet fallback. It just doesn't classify.

Scores are kept separate on purpose. Threat, confidence, relevance and priority each have their own factors, and multi-source confirmation only counts when at least two independent groups agree.

On top of the pipeline sits the analyst workspace:

- intelligence requirements with coverage, freshness and explicit gaps
- investigations with hypotheses, tasks, cited evidence and timestamped decisions
- watchlists, collections and authored reports
- a bounded graph view with evidence pivots and Cmd/Ctrl+K search
- source reliability ratings, sync history, quarantine and replay
- event playbooks with execution history

For sharing, it exports STIX 2.1, serves tenant-authenticated TAXII 2.1 collections, exchanges MISP events and ships a Python connector for OpenCTI. Exports leave out evidence you aren't allowed to redistribute by default.

Accounts use Better Auth with verified email, team invites, admin, analyst and viewer roles, authenticator MFA with single-use recovery codes, scoped API keys and tenant isolation.

## Where it's at

There's a hosted workspace at [threatsieve.yumait.au](https://threatsieve.yumait.au), and the repo keeps an honest [readiness register](https://github.com/jusso-dev/ThreatSieve/blob/main/docs/readiness.md). Some items are still open, like feed redistribution agreements, SSO setup, sustained load testing and calibration on real labelled cases. The model results so far come from a small synthetic set, and the README says plainly they're not an accuracy claim.

## Try it

You'll need Node.js 22 or 24, pnpm 10 and a Cloudflare account with Workers AI access if you want live classification.

```sh
pnpm install
pnpm bootstrap
pnpm dev
```

Bootstrap seeds six clearly labelled synthetic scenarios, so the UI at `http://127.0.0.1:3000` works without calling AI. New assessments do call Workers AI, so run `pnpm exec wrangler login` first. There's a CLI too:

```sh
pnpm --silent cli assess example.com --json
pnpm --silent cli feeds sync mitre --json
pnpm --silent cli attack T1071.001 --json
```

Sync MITRE first, then MISP, then the indicator feeds. The code is MIT licensed at [github.com/jusso-dev/ThreatSieve](https://github.com/jusso-dev/ThreatSieve).
