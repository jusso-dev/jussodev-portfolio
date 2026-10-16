---
title: Community CTI, threat intelligence for organisations without a security team
date: 2026-10-16
summary: An early-stage platform that watches public threat sources for an organisation's domains and explains what it finds in plain English.
tags: [security, threat-intelligence, community]
draft: false
---

Community CTI is a threat intelligence service for organisations that don't have a security team. You sign up, verify your domains and it tells you, in plain English, about the threats that touch you. Every finding shows where it came from, how confident it is and a way to dismiss or challenge it.

## Why I built it

Threat intelligence platforms are priced and designed for organisations with analysts. Aboriginal Community Controlled Organisations, Land Councils, Aboriginal Medical Services and Indigenous corporations hold sensitive data and get targeted like anyone else, but most of them don't have a SOC or a security budget. That's who I'm building this for first, along with other under-resourced organisations across Australia.

The aim isn't a cheaper copy of a commercial product. It's to put useful intelligence in front of people who've never had it. The organisations involved are co-design partners, and it's meant to sit alongside the ACSC's resources for First Nations businesses, not replace them.

The test I keep coming back to is simple. Can an organisation with no cyber staff find a real threat, understand it and do something sensible about it in under ten minutes?

## How it works

A worker collects public feeds into shared intelligence and raises findings for each organisation. Right now the jobs cover:

- ACSC alerts, advisories and news, plus CISA advisories, tagged for Australian, First Nations and sector relevance
- CISA KEV, NVD and EPSS for vulnerabilities
- URLhaus and OpenPhish
- ransomware.live listings for Australia only, summarised by sector without victim names
- lookalike domain detection from crt.sh, feeds and DNS permutations with Australian domain endings
- shared STIX pulled read-only from [ThreatSieve](/blog/threatsieve/) over TAXII

Collection and validation are ordinary deterministic code. AI is only used where it measurably helps, and the agent runtime is read-only. Anything that changes something needs a person to approve it.

The API keeps tenant findings in PostgreSQL under row-level security. The portal is a server-rendered app with magic-link sign-in, onboarding and consent, domain management, findings you can dismiss, challenge or reopen, alert settings and an Australian alerts page. Alerts go out by email, either straight away or as a digest.

Data governance is written down before features. Each organisation owns its data. Nothing goes to the wider community unless the organisation shares it, item by item. Cultural data is never shared automatically and never used to train models. Data stays in Australia. The governance doc covers the CARE principles and Maiam nayri Wingara alignment.

## Where it's at

It's early. The repo has a 90-day plan: foundation first, then investigation and response with Microsoft 365, then a pilot with three to five consenting organisations to measure precision, false positives and time to action. Those milestones are targets, not promises. The pricing in the README is a hypothesis too, and it'll change after the pilot. Several feed sources still need a licence review before they can run in production, and anything like stealer-log collection is blocked until lawful access and proper procedures exist.

## Try it

You'll need pnpm and Docker for the local services:

```bash
corepack enable
pnpm install
pnpm build
pnpm test
bash scripts/dev-up.sh
```

`dev-up.sh` starts PostgreSQL 16, OpenSearch 2 and MinIO. There are also tenant isolation and red team test suites (`pnpm test:isolation`, `pnpm test:redteam`). The code is Apache-2.0 licensed at [github.com/jusso-dev/community-cti](https://github.com/jusso-dev/community-cti).
