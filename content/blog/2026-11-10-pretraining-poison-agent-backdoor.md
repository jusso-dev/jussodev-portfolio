---
title: "A tenth of one percent of the training data was enough"
date: 2026-11-10
summary: "A new arXiv paper shows poisoning 0.1% of pretraining data can plant a remote code execution backdoor in an AI agent, and bigger models were more susceptible."
tags: ["ai-security", "research", "ai-agents", "supply-chain"]
draft: false
---

A paper posted to arXiv in October, [Agentic Backdoors via Pretraining Poisoning](https://arxiv.org/abs/2610.37741), tests something people have worried about for a while. Can someone who plants content on the public web end up with code execution on your machine, through an AI agent trained on that web?

The answer, in their experiments, is yes.

## The problem

Large language models are pretrained on huge, uncurated scrapes of the public web. Anyone can publish to the public web. So an attacker can plant poisoned content and hope it lands in a training set.

What's new here is the payload. The authors say this is the first demonstration that such poisoning can plant a remote code execution backdoor in an agent, causing it to run attacker-chosen commands on the user's machine.

## What they did

To measure it end to end, the researchers pretrained Qwen3 models from scratch at three sizes: 0.6B, 1.7B and 4B parameters. They then post-trained each one into a command-line agent using a clean pipeline. The poison only went into pretraining.

Poisoning 0.1% of the pretraining corpus with their poison design was enough to implant the backdoor. When a trigger is present, the deployed agent runs the malicious command. On clean inputs it behaves normally.

That second part is what makes this hard. A backdoored model that acts strangely all the time gets caught. One that only misbehaves when it sees a specific trigger can pass ordinary testing.

## Bigger was worse

The result I keep thinking about is the scaling. Attack success went up with model size. The 4B model reached roughly 92% at a 0.1% poison rate, and the attack stayed above zero even when the poisoning rate dropped to 0.0005%.

The intuition many people have is that bigger models, trained on more data, should dilute a small amount of poison. In these experiments, it went the other way.

## Keeping it in proportion

This is lab work. The models are small by current standards and were trained from scratch for the study. The paper doesn't report this happening to any deployed model, and I'm not suggesting it has.

But the setting is real. Models are trained on scraped web data, agents are given shells, and people run them on machines that hold credentials.

## What it means for teams

The useful lesson for me is about where the controls sit. If a model could carry a backdoor from before you ever touched it, then "we fine-tuned it on clean data" doesn't settle the question. The clean post-training in this paper didn't remove the backdoor.

So the model can't be the only thing standing between a prompt and your system. What I'd want around any agent that can run commands:

- A sandbox, so a bad command has limited reach.
- Allowlists for the commands and network destinations an agent can use.
- Approval prompts for anything touching credentials, the network or production.
- Logging of what the agent actually ran, so odd behaviour can be found later.

These are the same controls you'd put around any untrusted code. This paper is a good reminder that an agent's model is, in a real sense, untrusted code.
