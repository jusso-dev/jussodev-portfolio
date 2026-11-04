---
title: "Fake AI desktop apps, real signed binaries"
date: 2026-11-09
summary: "Check Point Research tracked Yoba, a campaign using fake GPT-6 Astra and Claude Opus desktop apps on GitHub, with malware sideloaded by genuine signed OpenAI and Anthropic executables."
tags: ["malware", "ai", "seo-poisoning", "dll-sideloading"]
draft: false
---

Check Point Research published [Tricks from the Past deployed via signed ChatGPT and Claude binaries](https://research.checkpoint.com/2026/tricks-from-the-past-deployed-via-signed-chatgpt-and-claude-binaries/) on 27 October. The title gives away the conclusion, and I think it's the right one.

## The lure

Check Point has been tracking the campaign for about two months and calls it Yoba. The attackers built GitHub projects for AI desktop apps that don't exist: "GPT-5.6 Sol", "GPT-6 Astra" and "Claude Opus". Each had a GitHub.io page describing the software, with download links pointing at ZIP files hosted as GitHub releases.

There was no fake engagement. Check Point found no inflated stars or forks to push the projects up GitHub's own search. They still showed up near the top of Google results, which Check Point puts down to SEO poisoning: titles, descriptions and hosting domains tuned to rank.

Using real GitHub infrastructure helps. A download from github.com and a page on github.io look a lot more believable than a random domain.

## The trick inside

Inside the installers is a component Check Point calls YobaDropper, which carries a second component, YobaLoader. The loader contacts attacker infrastructure and fetches the final payload.

The clever bit is how it gets loaded. The malicious component sits next to legitimate, signed executables from OpenAI and Anthropic. When the trusted program runs, it loads the malware from the same folder. That's DLL sideloading, a technique that's been around for a long time and is often used to get past security tools that trust signed binaries.

Check Point also noted the ZIP files weren't password-protected, which is unusual for malware hosted on legitimate platforms. Their read is that the attackers didn't need to bother, because anti-sandbox and anti-analysis tricks already kept detection rates low.

## Careful operators

The actor's opsec was better than average. There was no dedicated command and control infrastructure. Instead they used Telegram, Tor, Catbox and DNS over HTTPS.

Each repository used a different Outlook address, and the commits came from three different time zones. Check Point thinks that was deliberate, to blur where the actor actually works. They report indicators suggesting Russian origins and say the actor appears to work mainly in UTC-4.

## The reveal

Strip it back and there are three old ideas here. Fake software pages. Search ranking. Sideloading through a signed binary. The new part is the costume. People are hungry for the next model, so a page offering "GPT-6 Astra" as a desktop download gets clicks it wouldn't have got a year ago.

The signed OpenAI or Anthropic binary is the part I'd want teams to understand. A signature tells you who built that one file. It doesn't tell you what that file will load from the folder it's sitting in.

## What I'd tell a team

- Install AI desktop apps only from the vendor's own site. If a model name sounds new and you can't find it on the vendor's site, it probably isn't real.
- Don't trust a download because it's on GitHub. Anyone can publish a release.
- A signed file is not proof that everything it loads is safe.
- For detection, look for signed apps running from user-writable folders with unsigned DLLs next to them.
- Block or monitor unexpected Telegram, Tor and file-sharing traffic from workstations that have no reason to use them.

Tricks from the past, as Check Point put it. They keep working because the wrapping keeps changing.
