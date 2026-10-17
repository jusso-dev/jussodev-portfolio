---
title: What hermes-cyber-au could change for Australian cyber teams
date: 2026-10-19
summary: My plan for an open source Hermes Agent distribution that gives every Australian security team the same starting point on threat intel, ASD guidance and reporting.
tags: [security, threat-intelligence, ai, australia]
draft: false
---

Every Australian security team does the same work each morning. Someone reads the overnight ASD's ACSC advisories and AusCERT bulletins, checks CISA's Known Exploited Vulnerabilities list against what the organisation runs, works out which ISM controls and Essential Eight timeframes apply, and writes a short note for the people who'll never read an advisory. Then they do it again tomorrow.

Every team does that translation on its own, with its own spreadsheet and its own notes on when the NDB scheme or the SOCI Act kicks in. A two-person team at a council or a not-for-profit does the same reading as a large SOC, with a fraction of the tooling.

hermes-cyber-au is my plan to do that work once, in the open, so every team starts from the same place. It's a profile distribution for [Hermes Agent](https://github.com/NousResearch/hermes-agent), Nous Research's open source agent. You install it once, and the agent knows the ISM, the Essential Eight and the new ASD Essentials, reads Australian and global threat intel, keeps a local intel store and has a briefing ready by 07:30 Sydney time. It proposes actions. It doesn't take them.

## Where it's at

It's planned, not shipped. The repo holds the design and the build plan as GitHub issues: a roadmap and nine epics covering install, connectors, skills, the intel store, briefings and routines, the agent's own security, docs, automation and premium feeds. There's no release yet.

When I posted about it on 11 October, it was a smaller skill pack for ASD guidance. That pack now lives in [jusso-dev/hermes-skills](https://github.com/jusso-dev/hermes-skills), and this repo has grown into a full distribution with connectors, an intel store, scheduled routines and controls on the agent itself.

## Why I think this matters

Australian teams aren't short of intelligence. ASD, AusCERT and the global feeds publish plenty, and much of it is free. What's scarce is the time it takes to turn it into "what do we do today" for one organisation.

If the reading, the mapping to ASD guidance and the reporting maths are done the same way in a shared, open project, a small team starts its day where a big one does. When someone fixes how a control is looked up or how a deadline is calculated, every team that updates gets the fix. That's the change I'm after.

## Threat intel with Australian context

The first milestone (v0.1) covers:

- ASD's ACSC alerts, advisories and publications
- the ISM from ASD's OSCAL catalogue, the Essential Eight and the ASD Essentials
- CISA KEV with FIRST EPSS and NVD
- AusCERT's public security bulletins
- abuse.ch, MITRE ATT&CK, Have I Been Pwned, the GitHub Advisory Database, VirusTotal and Cloudflare Radar

abuse.ch, VirusTotal and Cloudflare Radar are off by default because of their non-commercial terms, so you bring your own key. v0.2 adds OTX, GreyNoise, Shodan InternetDB, OSV, crt.sh, AbuseIPDB, Spamhaus DROP, NCSC NZ and the CVE Program records, among others. It's meant to work with no API keys at all on public sources, and each free key you add turns on more.

Indicators get checked across sources and deduplicated into one verdict that lists where each piece came from. Vulnerabilities are ranked using KEV, EPSS, CVSS, ASD and AusCERT mentions, your own asset list and the Essential Eight patching timeframes.

## Sharing without leaking

Information sharing in Australia runs through communities like ASD's Cyber Threat Intelligence Sharing (CTIS) platform, AusCERT and AusMISP. The plan is to plug into those rather than build another silo.

- A TAXII 2.1 reader (v0.2) lets ASD Network Partners read CTIS with their own credentials. It's off by default and only reads. It never submits or uploads indicators.
- Objects marked TLP:AMBER, TLP:AMBER+STRICT or TLP:RED stay inside the profile. They're left out of STIX exports and of briefings sent outside the profile unless you override that for the current run. TLP:CLEAR and TLP:GREEN can be exported.
- The local intel store is SQLite with canonical dedupe and STIX 2.1 export, so what you find comes out in a format other teams already use.
- Later milestones add MISP (your own instance or AusMISP), OpenCTI and AusCERT member feeds, again bring your own access.

The agent reads from the communities you already belong to and gives you clean STIX to share back. A person decides what leaves.

## Built in the open

It's Apache 2.0, and the whole plan is public as issues. If you think an ISM lookup should behave differently, or a connector matters more than its milestone suggests, say so on the issue. That's how the plan gets better.

The rules are written into the design. Every claim carries a source, a version and a date. ISM lookups use the release that was in force on the date you ask about, and if a control isn't in the snapshot, it says "I don't know" rather than guess.

## Research you can check

The Hermes details the design depends on (manifest fields, what a profile update replaces, MCP config, plugin hooks, cron rules) are written up with sources in `docs/research/hermes-structure.md`, checked against the Hermes Agent source just after release v0.22.2. Anything not confirmed in source is marked "verify" and has to be tested before code relies on it. The connector research records what was verified and when.

## What an analyst's morning would look like

Once v0.1 is out, this is the day I'm designing for:

- At 07:30 a briefing is waiting. It covers ASD's ACSC advisories and AusCERT bulletins since the last digest, grouped into what to do today, what to do this week and what to know.
- A KEV watch has already matched newly exploited bugs against your asset list.
- Someone forwards a suspicious email. The agent checks headers, SPF, DKIM and DMARC, lookalike domains of Australian brands and file hashes. It doesn't detonate anything.
- An incident comes in. The agent categorises it the way ASD's ACSC does, maps it to ATT&CK, proposes containment and checks whether NDB, SOCI or ransomware payment reporting applies. For SOCI it works out the 12 and 72 hour deadlines in Sydney time. It drafts the NDB statement, and a person submits it.
- The executive summary for the board is in plain Australian English.

Every routine (hourly feed ingest, the morning briefing, the KEV watch and a weekly executive summary) ships paused, so you choose what runs.

## The guardrails

An agent that reads untrusted feeds all day needs tight limits:

- Read-only by default. Anything that sends, blocks, posts or submits needs a person to approve it.
- Feed content is treated as data, never as instructions.
- Secrets stay in the profile `.env` and are never shipped, logged or exported.
- Each connector can only reach the hosts listed for it.
- Every tool call goes into a hash-chained audit log.

It's independent and not affiliated with or endorsed by ASD, the ACSC, the OAIC, the Cyber and Infrastructure Security Centre or Nous Research. Its output is guidance, not legal advice or a formal assessment.

## Get involved

Start with the roadmap issue, then the epics, at [github.com/jusso-dev/hermes-cyber-au](https://github.com/jusso-dev/hermes-cyber-au). If you work in an Australian security team, I'd like to know which part of your morning you'd hand over first.
