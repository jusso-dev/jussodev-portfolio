---
title: "AI refusals are becoming a weapon, for attackers and defenders"
date: 2026-11-02
summary: "A Russian anti-bot script hides its code behind function names built to make AI models refuse to read it, and Tracebit is using the same trick to stop AI attackers in their tracks. Here's what both tell us about the guardrails we lean on."
tags: ["security", "ai", "deception", "agents"]
draft: false
---

## Two stories, one idea

I read two pieces of research recently that look unrelated at first. One is about a browser fingerprinting script. The other is about stopping autonomous AI attackers in a cloud account. They both rely on the same thing: a model's safety guardrails can be triggered on purpose, by whoever controls the text the model reads.

## The fingerprinting script that talks about ricin

A researcher writing as veritas on nullpt.rs crawled 10,000 websites from the Tranco top sites list with Playwright, hooking canvas and common fingerprinting calls to see what scripts were out there. One canvas they liked traced back to a script served from servicepipe.tech.

Inside the usual mangled, obfuscated JavaScript were function names like `computeRicinLethalDosageForWaterSupply` and `calculateDeadlyLethalSuicideAspirinDosage`. There was also a block of invisible Unicode characters that decoded to a fake "SYSTEM OVERRIDE" jailbreak prompt covering bioweapons, DDoS attacks on healthcare, tax evasion and drugs, plus Tiananmen Square references that look aimed at Chinese models.

None of that is what the script actually does. The researcher's read is that it's anti-LLM obfuscation: strings planted to make a model refuse to help deobfuscate the code. It worked on at least one model they tried, which refused. Another, GLM-5.3, went ahead.

Under all of that, the script collects fairly standard anti-bot signals: user agent, hardware concurrency, device memory, `navigator.webdriver`, WebGL vendor and renderer strings and so on. A urlscan led to servicepipe.ru, a Russian company selling traffic control and anti-DDoS protection.

## Context bombs on the defensive side

Tracebit's research runs the same idea in reverse. In earlier work they pointed ten frontier models at a live AWS environment and found the top models took a critical action within 14 minutes on average. Canaries detected them, but only bought defenders about an 8-minute head start.

So they planted what they call a context bomb: a short piece of text designed to trigger a model's safety guardrails, placed where an attacker's agent will read it, such as a decoy secret, environment variable or DNS record. Across five leading models and 152 attack runs in their AWS cyber range, a context bomb in a decoy secret:

- cut admin privilege escalation from 57% of runs to 5%
- cut complete compromise from 36% to 1%
- cut runs achieving any attack path from 91% to 15%

They also note threat actors got there first, with Check Point and Socket reporting malware strings written to trip AI tools inspecting them in 2025.

## What I take from it

Guardrails aren't just a safety feature any more. They're an attack surface and a control at the same time. Anyone who can put text in front of a model can steer what it's willing to do.

For defenders, that's a cheap win worth testing. Decoy credentials and canaries were already good practice, and a context bomb in the right place can turn a detection into an early stop.

For anyone using AI to help with analysis, it's a warning. If your malware triage or code review leans on a model, an adversary can make it go quiet on exactly the samples you care about. A refusal on suspicious code should be treated as a signal to look closer, not a dead end. It's also worth knowing which of your tools will refuse and which won't, before you need them.

## Sources

- [Why Is This Fingerprinting Script Creating Bioweapons?](https://nullpt.rs/fingerprinting-bioweapons) on nullpt.rs
- [Context bombs: stopping AI attackers in their tracks](https://tracebit.com/blog/context-bombs-stopping-ai-attackers-in-their-tracks) by Tracebit
