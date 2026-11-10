---
title: "Claude Fable 5.2 is out. Here's what I'd check before switching."
date: 2026-11-11
summary: "Anthropic has released Claude Fable 5.2 for long-horizon agent work, at a lower price than 5.1. I'd still start with Opus 5.5, and I'd check the 30-day retention rule and the cyber refusals first."
tags: ["anthropic", "ai-agents", "security", "cloud"]
draft: false
---

Anthropic has released [Claude Fable 5.2](https://www.anthropic.com/claude-fable-and-mythos-5-2), and a counterpart, Claude Mythos 5.2, for long-horizon agent work: sessions that run for hours, deep research, and analysis carried through to a finished document or deck. Both landed on 9 November.

Anthropic says they are the same underlying model. Fable has cybersecurity and biology safeguards, which is why it is available to every Claude API customer. Mythos drops those blocks, and is limited to organisations that have been through Anthropic's Cyber or Life Sciences Verification Programs.

## Price, specs and where it runs

Fable 5.2 and Mythos 5.2 cost $8 per million input tokens and $40 per million output tokens, down from $10 and $50 on the 5.1 models. There is an optional fast mode that Anthropic says speeds up token generation by up to 2.5 times, at $16 and $80. Testers, according to Anthropic, found ordinary outputs up to 30% faster than 5.1.

The context window is 1 million tokens, with 128,000 tokens of maximum output. Adaptive thinking is always on. The models are on the Claude API as `claude-fable-5-2` and `claude-mythos-5-2`, on Amazon Bedrock, on Google Cloud, and on Microsoft Foundry.

Anthropic still recommends starting with Claude Opus 5.5 for most coding and knowledge work, and moving to Fable only when your evals say you need it. That matches how I'd use it.

## What I'd check before cutting over

Both models require 30-day data retention. They aren't available under zero data retention unless Anthropic expressly authorises it. If your policy is zero retention, this isn't a drop-in replacement.

Fable 5.2's safeguards will block most cybersecurity-related tasks. On Claude's own apps, a blocked cyber query is answered by Opus 4.8 instead. On the API, a refusal comes back and you have to retry on another model, unless you've turned on Anthropic's server-side fallback, which is still in beta. If you need the model for defensive cyber work, Mythos is the path, and that means going through verification.

There are also breaking API changes from Fable 5.1. The prefix check now applies to every account, so editing earlier turns, the system prompt or the tool list invalidates thinking blocks and returns a 400 error. Only Fable 5.2 and Mythos 5.2 can read Fable 5.2 thinking blocks, so switching mid-conversation to Opus 5.5 drops that reasoning. And the older `computer_20251124` computer-use tool now errors on every platform except Amazon Bedrock.

I'd re-run evals at the default effort level (`high`) before I cut over, and I'd read the [migration guide](https://platform.claude.com/docs/en/models/fable-5-2/migration-guide) rather than just changing the model ID.
