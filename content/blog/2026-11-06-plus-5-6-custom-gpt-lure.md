---
title: "Plus 5.6 isn't a new ChatGPT model. It was a lure"
date: 2026-11-06
summary: "Huntress found attackers using a Custom GPT named to look like a new model, sponsored search results and a fake CAPTCHA to deliver a RAT. The trusted bits were real. The middle was ClickFix."
tags: ["clickfix", "malware", "ai", "social-engineering"]
draft: false
---

Huntress has a detailed write-up on a campaign that started inside ChatGPT itself: [Attackers Abuse ChatGPT Custom GPTs to Deliver RAT via ClickFix](https://www.huntress.com/blog/chatgpt-custom-gpts-clickfix-rat). It was first published on 28 September and updated on 14 October, when Huntress said organisations were still being hit.

## The lure

Custom GPTs are personalised versions of ChatGPT that anyone can build. They live on the real chatgpt.com, with the GPT's name at the top and the builder underneath.

The attackers named theirs "Plus 5.6" so a visitor might take it for a new ChatGPT model. In some incidents, victims searched Google for "chatgpt" and clicked a sponsored result that took them to this Custom GPT. The page said it was by a "community builder", which is a giveaway if you know what that means.

Whatever you asked it, the GPT replied with a "Service Availability Notice". It said the service had limited availability on the primary domain, and offered a "backup domain". That link went to a Google Sites page dressed up as a Cloudflare CAPTCHA, asking the visitor to paste a command into their terminal. That's ClickFix.

Huntress has responded to at least 40 incidents tied to that Google Sites page, and confirmed two came through a Custom GPT. OpenAI took the first GPT down on 25 September. Two days later Huntress found a new one linked to the same campaign.

## The chain underneath

Huntress describes eight hops, each hiding the next.

The pasted command pulls an obfuscated PowerShell script. The server address is written as a decimal number instead of a dotted IP, so filters looking for an IP address don't see one. The script silently installs an MSI that calls itself "Advanced Printer Configuration Reader" and hides from Programs and Features.

The MSI drops a genuine, Canon-signed application. Next to it sits a real Canon logging DLL that's been patched to load a malicious DLL. That DLL reads a .wav file which starts as real audio and turns into ciphertext part way through. The decoded loader then opens a homemade encrypted file system holding 806 files, including a persistence script and the RAT. Persistence comes back within minutes if you delete only one of the Run key or scheduled task.

The RAT has remote desktop, camera and microphone capture, file search and the ability to drop more payloads. A second version swapped the Canon app for a Stardock-signed one and hid the loader inside a Microsoft NuGet package instead of a .wav. The RAT itself was byte for byte the same.

## What it shows

The front of this chain is trusted: ChatGPT's own domain, reached through a paid ad. The back is trusted too: signed binaries from real companies. Everything in between is an old trick with a lot of wrapping paper.

Huntress has seen the same idea with shared ChatGPT, Grok and Claude conversations and Claude Artifacts. These pages often stay up only hours or days, but that's enough.

## What I'd tell people

- No real CAPTCHA asks you to paste a command into a terminal or PowerShell.
- Be suspicious of sponsored results, even when they land on a real domain.
- A Custom GPT is not ChatGPT. Look for the builder line.
- For detection, follow Huntress and watch behaviour rather than names: PowerShell launching msiexec on a GUID-named MSI in `%TEMP%`, and signed apps started by msiexec from odd folders under `%LOCALAPPDATA%\Programs\`.
- When cleaning up, kill the process first, then remove both the Run key and the scheduled task.
