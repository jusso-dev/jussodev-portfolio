---
title: "Warp's breach is a reminder that agent logs are sensitive data"
date: 2026-10-28
summary: "Warp says an attack on a third-party vendor exposed agent decision logs and telemetry for about 1% of users. Here's how I'd think about where your coding agent logs live."
tags: ["security", "ai", "developer-tools", "supply-chain"]
draft: false
---

Warp, the agentic development environment, has disclosed an attack on a third-party vendor in its infrastructure. Agent decision logs and telemetry belonging to Warp users were exposed. It's a short story, but it's one I think every team running coding agents should sit with for a minute.

## What Warp has said

According to [BleepingComputer's report](https://www.bleepingcomputer.com/news/security/warp-discloses-breach-exposing-ai-agent-logs-user-telemetry-data/), Warp's founder and CEO Zach Lloyd estimates that roughly 1% of Warp users may have been impacted. Warp's website says the platform has at least 800,000 users.

Lloyd said Warp became aware on a Friday of what it believes was "an active and narrow-banded exploitation of a vendor in Warp's infrastructure", and that it detected the operation within hours and was able to remediate and mitigate the impact. Its analysis suggests the attack was powered by "an agent swarm" using "a very sophisticated penetration and escalation technique".

What we don't know yet matters just as much. Warp hasn't said whether the exposed data included source code, prompts, credentials or other sensitive details. It has contacted the vendor about the vulnerability but hasn't shared details. CrowdStrike is helping with the investigation, law enforcement has been told, and Warp has notified the users it identified as affected.

## It's not the only one this month

The report notes this follows an incident at OpenCode, another AI coding platform, which told users last week that a breach exposed stored API keys used with external providers. That affected about 1.4% of OpenCode users, and some were hit with unauthorised charges of up to $1,700.

Two tools, two weeks, and in both cases the data at risk was the stuff that sits around the agent rather than the code itself.

## Why agent logs deserve more care

A coding agent's decision log is a running record of what it looked at and what it did. Depending on the tool, that can include file contents, the commands it ran, terminal output, environment details and whatever you pasted into the prompt. If a secret ever passed through the session, there's a fair chance it's sitting in a trace somewhere.

Most teams I talk to treat their repos carefully and their agent logs as an afterthought. I think that's backwards now.

## What I'd do this week

- **Find out where each tool keeps its logs.** Locally, in the vendor's cloud, or both. Check the docs and the settings, not just the marketing page.
- **Map the vendors behind the vendor.** Warp's issue came through a third party in its infrastructure. Ask your tool providers which subprocessors store or process traces and telemetry.
- **Check retention.** Know how long logs and telemetry are kept, and turn it down or off where you can. Data that's been deleted can't leak.
- **Lock them down like a repo.** Limit who can read them, keep secrets out of agent sessions, and rotate any credential you suspect has been through one.
- **Have a plan for the notification.** If a tool vendor tells you you're affected, know who owns that response and which keys get rotated first.

If you use Warp, BleepingComputer's advice is to stay vigilant, monitor account activity and treat unsolicited messages with extra caution. I'd add rotating any credentials that may have shown up in agent sessions.
