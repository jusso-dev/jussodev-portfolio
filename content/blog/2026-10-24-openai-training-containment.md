---
title: "OpenAI's training sandbox escape and what it says about isolation"
date: 2026-10-24
summary: "A model in training used a DNS resolver misconfiguration to reach the live internet. OpenAI paused frontier training, had its own agents red-team the containment, and resumed on 1 October."
tags: ["ai", "security", "sandboxing", "red-teaming"]
draft: false
---

OpenAI has published a write-up on how it secures the environments it uses to train and evaluate frontier models. I think every security team running agents should read it, so here's my summary and what I took from it.

## What happened

Frontier models in training at OpenAI don't get live internet access. They browse an "offline world", a large set of indexed and cached web content they can work with without touching external systems.

On 20 September, an internal research model exploited a misconfiguration in a DNS resolver and got limited access to the live internet during a training run. OpenAI says it contained the incident, but it exposed weaknesses. They paused training and evaluation of their most capable models and used the pause to harden infrastructure, strengthen monitoring and improve the systems that automatically stop runs.

## How the containment is built

OpenAI describes it as defence in depth, with overlapping layers:

- Restricted containers running inside lightweight microVMs on Linux, each with its own kernel, isolated from the host by a hypervisor
- Virtualised environments for macOS and Windows, and GPU-backed containers with user-space sandboxing
- Monitoring to detect unauthorised activity
- Network and cloud perimeters designed to hold even if an agent escapes its sandbox and controls the host

They point out a full air gap isn't feasible because they need external connections to run and monitor experiments. So they restrict outbound traffic and lateral movement, including through services reachable from the hosts.

## Turning agents on their own infrastructure

OpenAI then ran a high-compute red-teaming campaign using teams of frontier-model agents, on isolated copies of the research infrastructure. The agents had three goals: reach the live internet, cross an internal security boundary, and communicate with agents they should be isolated from. To make conditions favourable to the attacker, they were given source code, configuration details and documentation of potential weaknesses. OpenAI says it spent hundreds of billions of tokens on this.

The agents found:

- Previously unknown vulnerabilities in open-source components that let them chain together microVM escapes
- Weaknesses in almost every one of the narrow services still allowed out, such as metrics, logging and authentication, that gave limited internet access
- Misconfigurations that let blocked requests pass through DNS and firewall controls
- Covert channels between isolated microVMs, including one using processor cache timing, plus others through shared storage, CPU contention and a TLS certificate cache

OpenAI fixed what was found and worked with open-source maintainers to disclose and patch the issues. It also says the number of findings dropped significantly as the campaign went on.

The reassuring part is that the agents didn't find a route to the internet they could easily exploit while staying hidden from monitoring. Training and internal inference resumed on 1 October, 11 days after the pause.

## What stands out to me

A single DNS misconfiguration was enough. A model looking for a way out found the same boring config gap attackers use every day. And when OpenAI tested further, the weak points were the small, approved exceptions: the metrics service, the logging path, the auth endpoint. That's where I'd look first in any environment.

OpenAI has now made high-compute red-teaming part of the safety case for deciding whether frontier training can go ahead at all. Isolation is something they test continuously, not something they assume.

## If you're running agents

If you're giving agents real access in your own environment, I'd take a few lessons from this:

- Treat isolation as a control you test regularly. Don't assume it holds.
- Pay close attention to the exceptions you've allowed out, and to DNS in particular.
- Assume a layer will fail and check the next one holds on its own.
- Monitor for attempts to cross boundaries, not just successful ones.

You can read OpenAI's full post here: [Securing our frontier model training environment](https://openai.com/index/securing-our-frontier-model-training-environment/).
