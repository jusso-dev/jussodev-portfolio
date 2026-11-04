---
title: "An infostealer that asks an LLM what you're worth"
date: 2026-11-05
summary: "Cisco Talos found Volta-Autodoxer, an infostealer that bundles everything it steals and asks an AI model for a target assessment. Underneath, it's still an ordinary stealer."
tags: ["malware", "ai", "infostealers", "identity"]
draft: false
---

WIRED's Kernel Panic has a story on new research from Cisco Talos: [Spooky New Infostealer Malware Uses AI to 'Autodox' Victims](https://www.wired.com/story/kernel-panic-volta-autodoxer-ai-infostealer-malware/). The malware calls itself Volta-Autodoxer internally, and the AI part is strange enough that I wanted to write it down properly.

## The stealer underneath

Start with the boring bit, because it's the bit that does the damage. Talos describes Volta as mature and broad. It collects passwords saved in browsers, Microsoft OAuth tokens, cookies, payment cards and crypto wallet seed phrases. It also grabs active Discord, Telegram, Steam and Roblox sessions.

Then it does a second, deeper sweep using what it found the first time. By looking through an account like Gmail, it builds a fuller picture of the victim: where they are and what their habits look like, using things like receipts and order history from UberEats and DoorDash.

## The weird part

Once it has all that, Volta compiles it into a dossier and sends it to AI models through OpenRouter, a service that routes prompts to different providers.

The prompt is around 240 words, with bullet points and a numbered list. It opens with "You are a forensic intelligence analyst drafting a target assessment from a structured evidence bundle." It asks for an executive summary of the person, what they do, "what they're worth" and a summary of "their opsec". It tells the model to "connect dots across fields", with the example of checking whether someone's Wi-Fi password matches their last name. "Go deep, not wide," it says.

Ryan Fetterman from Talos describes it as a prioritisation and analysis function. The model reads the haul and tells the operator who's worth their time.

## Planning for refusals

The authors expected the AI to say no. Volta defaults to Anthropic's Claude Opus 4.6. If that's blocked, it falls back to Moonshot AI's Kimi K2, then Google's Gemini 2.5 Flash. Fetterman notes the prompt is carefully worded so it doesn't sound overtly malicious, and that the malware still works without the AI. The model calls sit on top.

Talos found Volta using a new framework called CAIRN, built to spot hacking tools with AI features. Talos didn't track whether Volta has been used in the wild, so I wouldn't overstate how widespread it is.

## What it means

Take the AI away and this is a stealer. A good one, but familiar. What the AI adds is speed at the operator's end. Instead of someone digging through thousands of stolen logs, a model ranks the victims and writes up the best ones. That's a cost saving for the attacker, and it means a stolen session is more likely to be used quickly.

The other lesson is about refusals. A model saying no is not a control the defender owns. Attackers just build in a fallback list.

## What I'd do

- Stop saving passwords in browsers. Use a password manager.
- Use phishing-resistant MFA where you can. It won't stop a stolen session cookie, but it limits what a stolen password buys.
- Treat a stolen session as a stolen account. Revoke sessions and tokens, not just passwords, after an infection.
- Keep personal accounts like Gmail off work machines where possible, since they're the source for the second sweep.

The scary part is the prompt. The fix is still the basics.
