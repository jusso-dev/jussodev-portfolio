---
title: "AI agents are working through online shops, Australian ones included"
date: 2026-10-21
summary: "NorForge found 20+ exposed Cairn panels, including one crew running over 1,100 agent attacks against e-commerce sites."
tags: ["security", "ai", "ecommerce"]
draft: false
---

Australian online shops are on the target list of one of the busiest AI-driven attack crews anyone has documented so far.

## What NorForge found

[NorForge](https://norforge.com/blog/inside_cairn) found more than 20 Cairn control panels sitting open on the internet. Cairn is an agent framework: give it a target and a goal, and it keeps working until the goal is met.

The busiest group, a Chinese-language crew NorForge calls AIA0001, ran over 1,100 attack projects against e-commerce sites in the US, Canada, Japan and Australia. Every one had the same goal. Get in without a login and leave a small upload form behind for later access.

[Reuters](https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/) reports more than 100 companies were breached, with Deere, SharkNinja and Cummins among them.

## Why the targeting matters

The tooling isn't the part that worries me. It's the targeting. Sites were ranked by traffic and checked to confirm they could take an order before an agent ever touched them. That's a production line, and it runs while everyone's asleep.

## What to check this week

- Look for files in upload folders that you didn't put there.
- Make sure session stores like memcached aren't reachable from the internet.
- Get rid of old framework components you've stopped maintaining.

One small mercy: the attackers left their own dashboards open too.
