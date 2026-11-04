---
title: "Your AI agent trusts the README more than the code"
date: 2026-11-10
summary: "A new arXiv paper finds the same malicious instruction is followed 2.6 times more often when it sits in a README or TODO than in a code or data file. Placement is part of the attack."
tags: ["ai-agents", "prompt-injection", "research", "developer-security"]
draft: false
---

A paper posted to arXiv in October, [Where You Inject Matters: The Trust Region Effect in LLM Agents](https://arxiv.org/abs/2610.38867), asks a question I hadn't seen measured before. Keep a malicious instruction exactly the same and move it around an agent's environment. Does where it sits change whether the agent follows it?

## The finding

It does, a lot.

Most risk work on indirect prompt injection looks at what the injected text says. These researchers held the content fixed and changed only the location. They found agent susceptibility varied across placements.

The headline number: an agent powered by GPT-5.4 followed an unsafe instruction placed in a repository documentation file, meaning a README or TODO, 2.6 times more often on average than the same instruction placed in a code or data file.

The authors call this the trust region effect. Agents implicitly give different levels of trust to different parts of their environment.

## How they tested it

Studying placement needs agents running longer tasks across lots of surfaces. So the team built three agent testbeds covering tool use, coding and daily workflows, each with a range of places an injection could go.

They then built learning-based attackers that generate injection content and also choose where to put it. Their conclusion is that both where an injection sits and what it says affect how strong the attack is. They describe this as the first systematic look at injection placement, across both broad surfaces and fine-grained positions.

## Why it rings true

It lines up with what's turned up in the wild over the past few weeks. Forever Security found a malicious AGENTS.md planted in a customer's Downloads folder. AIR Security found a fake starter kit whose README told agents to run a malicious install command. In both cases the attacker wrote instructions where agents look for guidance.

That makes sense from the agent's point of view. Docs are where a project tells you how to work. Code is the thing you're working on. Models seem to have picked up that same habit.

## What I'd change

The practical lesson is that "it's just documentation" isn't a reason to skip review anymore.

- If agents run in your repos, review changes to READMEs, TODOs and agent instruction files as closely as code, especially from outside contributors.
- Be careful about pointing agents at cloned or downloaded projects you haven't read. The docs are the first thing they'll trust.
- Keep the real controls outside the model. Approval prompts, sandboxes and limits on what an agent can run matter more than hoping it ignores a bad line.
- When you test your own agents, try the same injection in different places. The paper suggests your results will differ depending on where you put it.

Attackers already choose what to say. This paper shows they can also choose where to say it, and that choice matters more than I'd have guessed.
