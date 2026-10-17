---
title: What hermes-cyber-au could change for Australian cyber teams
date: 2026-10-19
summary: hermes-cyber-au is now code on main, an open source Hermes Agent distribution that gives every Australian security team the same starting point on threat intel, information sharing, ASD guidance and reporting.
tags: [security, threat-intelligence, ai, australia]
draft: false
---

Every Australian security team does the same work each morning. Someone reads the overnight ASD's ACSC advisories and AusCERT bulletins, checks CISA's Known Exploited Vulnerabilities list against what the organisation runs, works out which ISM controls and Essential Eight timeframes apply, and writes a short note for the people who'll never read an advisory. Then they do it again tomorrow.

Every team does that translation on its own, with its own spreadsheet and its own notes on when the NDB scheme or the SOCI Act kicks in. A two-person team at a council or a not-for-profit does the same reading as a large SOC, with a fraction of the tooling.

hermes-cyber-au is my attempt to do that work once, in the open, so every team starts from the same place. It's a profile distribution for [Hermes Agent](https://github.com/NousResearch/hermes-agent), Nous Research's open source agent. You install it once, and the agent knows the ISM, the Essential Eight and ASD Essentials, reads ASD's ACSC and AusCERT, pulls in global threat intel, keeps a local intel store and can write a briefing. It proposes actions. It doesn't take them.

## Where it's at

It's code now, not a plan. The `main` branch has the connectors, the skills, the local intel store, the plugin, the scheduled routines and a Docker image recipe.

It's still early, and I want to be straight about what that means:

- There's no release tag yet. The installer works from `main`, or you can pin a tag or commit with `--ref`.
- Hermes needs a model chosen before a chat or a briefing can run.
- Every scheduled job arrives paused, so nothing runs until you resume it.
- Some of the GitHub Actions (nightly intel refresh, connector health, skill data regeneration, dependency bumps and weekly releases) are still proposals under `ci/workflows/`. The checks on push to `main` are live.

When I posted about it on 11 October, it was a smaller skill pack for ASD guidance. That pack now lives in [jusso-dev/hermes-skills](https://github.com/jusso-dev/hermes-skills), and the old version is kept on the `legacy-skills-pack` branch. This repo is now a full distribution.

## Why I think this matters

Australian teams aren't short of intelligence. ASD, AusCERT and the global feeds publish plenty, and much of it is free. What's scarce is the time it takes to turn it into "what do we do today" for one organisation.

If the reading, the mapping to ASD guidance and the reporting maths are done the same way in a shared, open project, a small team starts its day where a big one does. When someone fixes how a control is looked up or how a deadline is calculated, every team that updates gets the fix. That's the change I'm after.

## Threat intel with Australian context

There are 50 connectors in the repo. Each one is a read-only MCP server on a shared HTTP client with an egress allowlist, caching and rate limiting.

The Australian ones cover ASD's ACSC alerts, advisories and publications, the ISM from ASD's OSCAL catalogue, the Essential Eight and ASD Essentials, the ASD Blueprint for Secure Cloud, IRAP guidance, the PSPF, AusCERT's public bulletins, Scamwatch alerts, data.gov.au and Australian reporting obligations. NCSC NZ is in there too.

Global sources include CISA KEV, FIRST EPSS, NVD, the CVE Program, OSV, the GitHub Advisory Database, MITRE ATT&CK, abuse.ch, OTX, GreyNoise, Shodan InternetDB, crt.sh, AbuseIPDB, Spamhaus DROP, OpenPhish, Have I Been Pwned, SigmaHQ and Cloudflare Radar.

Public sources answer with no keys. A free key raises limits or turns on a source that ships disabled.

Paid feeds are in the checkout as well, all off by default and bring your own licence: Recorded Future, Flare, UpGuard, Hudson Rock, SpyCloud, Flashpoint, Intel 471, Google Threat Intelligence DTM, CrowdStrike Recon, SOCRadar and DarkOwl. Each vendor has terms flags for what may be cached, stored, exported or shared, and the defaults stay conservative until your contract says otherwise.

Indicators get checked across sources and deduplicated into one verdict that lists where each piece came from. Vulnerabilities are ranked using KEV, EPSS, CVSS, ASD and AusCERT mentions, your own asset list and the Essential Eight patching timeframes.

## Sharing without leaking

Information sharing in Australia runs through communities like ASD's Cyber Threat Intelligence Sharing (CTIS) platform, AusCERT and AusMISP. hermes-cyber-au plugs into those rather than building another silo.

- A read-only TAXII 2.1 client reads from an API root you supply, such as CTIS, with your own credentials. It polls at most once an hour and ships with no hosts allowed, so you add the host yourself.
- A read-only MISP connector works with your own instance or AusMISP, and there's a client for an OpenCTI instance you already run. Both are off until you add credentials.
- The local intel store is SQLite with canonical dedupe, retention and STIX 2.1 export, so what you find comes out in a format other teams already use.
- STIX exports default to a TLP:CLEAR ceiling. GREEN and AMBER go out only when you ask for them, and an AMBER export is written to the audit log. TLP:AMBER+STRICT and TLP:RED are never written into a bundle.

It never submits indicators for you. The agent reads from the communities you already belong to and gives you clean STIX to share back. A person decides what leaves.

## Collaboration inside a team

Hermes installs one home per profile, so hermes-cyber-au ships five role overlays you install side by side:

- The watcher is the only role with connector keys. It posts findings.
- The analyst claims them.
- The skeptic answers them.
- The briefer drafts the note, and it's the only role whose job may deliver to the owner.
- The librarian looks after shared memory and is the only role that can mark a memory as confirmed.

Handoffs move through a local queue. Each one carries a claim, its sources, a confidence and a TLP marking, and a later step can raise the marking but never lower it. Shared memory uses a Hindsight server you run yourself, and it stays off until you point it at one.

There's also a small read-only web dashboard for the less technical people on a team. It lists each routine with its schedule and last status, shows the newest report each routine wrote, lists the handoffs and shows a snapshot of each stored conversation with secrets redacted. It never runs a job, and it has no login, so it belongs on localhost or your LAN or Tailscale address, never the public internet.

## Research you can check

The Hermes details the design depends on (manifest fields, what a profile update replaces, MCP config, plugin hooks, cron rules) are written up with sources in `docs/research/hermes-structure.md`. Every connector has its own page saying where it reads from, how it authenticates, its rate limits and when it was last verified, and the connector research records what was checked and when.

ISM lookups use the release that was in force on the date you ask about. If a control isn't in the snapshot, it says "I don't know" rather than guess.

## What an analyst's morning looks like

Once you've picked a model and resumed the routines you want, this is the day it's built for:

- At 07:30 Sydney time a briefing is waiting. It covers ASD's ACSC advisories and AusCERT bulletins since the last digest, grouped into what to do today, what to do this week and what to know.
- A KEV watch has matched newly exploited bugs against your asset list.
- Someone forwards a suspicious email. The agent checks headers, SPF, DKIM and DMARC, lookalike domains of Australian brands and file hashes. It doesn't detonate anything.
- An incident comes in. The agent categorises it the way ASD's ACSC does, maps it to ATT&CK, proposes containment and checks whether NDB, SOCI or ransomware payment reporting applies. For SOCI it works out the 12 and 72 hour deadlines in Sydney time. It drafts the NDB statement, and a person submits it.
- Threat hunting comes with Sigma and KQL for Microsoft Sentinel and Defender, with the queries checked offline.
- The executive summary for the board is in plain Australian English.

The routines are hourly feed ingest, the morning briefing, the KEV watch, a weekly executive summary and store maintenance. They all arrive paused, so you choose what runs. Briefings deliver to the chat you're in, or to the job's last output when no channel is set up.

## The guardrails

An agent that reads untrusted feeds all day needs tight limits:

- Read-only by default. Anything that sends, blocks, posts or submits needs a person to approve it.
- Feed content is treated as data, never as instructions.
- Secrets stay in the profile `.env` and are never shipped, logged or exported.
- Each connector can only reach the hosts listed for it.
- Every tool call goes into a hash-chained audit log.
- Exposure data from the paid feeds is redacted, kept for 90 days by default and never sent anywhere automatically. Nothing contacts the OAIC, ASD, victims or vendors for you.

It's independent and not affiliated with or endorsed by ASD, the ACSC, the OAIC, the Cyber and Infrastructure Security Centre, Nous Research or any data provider. Its output is guidance, not legal advice or a formal assessment.

## Try it

It's Apache 2.0, and the code, docs and research are at [github.com/jusso-dev/hermes-cyber-au](https://github.com/jusso-dev/hermes-cyber-au). The install steps are in the README, and `cyber-au doctor --offline` checks the setup before anything goes live.

If you work in an Australian security team, I'd like to know which part of your morning you'd hand over first.
