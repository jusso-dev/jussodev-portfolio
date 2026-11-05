---
title: "Self-hosting an open-weight model means you own the risk"
date: 2026-11-06
summary: "ASD's ACSC has released two publications on adopting and operating open-weight AI models. The short version: more control comes with more responsibility."
tags: ["ai", "acsc", "governance", "supply-chain"]
draft: false
---

On 5 November, ASD's ACSC released two new publications on open-weight AI models. The announcement is here: [New guidance on open-weight AI models](https://www.cyber.gov.au/news/new-guidance-on-open-weight-ai-models).

## What's been published

- **Open-weight AI models: Opportunities and cyber security risks** explains what open-weight models are, the benefits they bring, and the security and supply chain risks that come from model weights being released publicly.
- **Selecting, deploying and operating open-weight AI models securely** is the practical one. It covers governance, model selection, secure deployment, monitoring, maintenance and incident response.

## The trade-off

The ACSC's framing is fair. Running a model in your own environment gives you more control over your data, operations and lifecycle. But you also take on the governance, security, monitoring, maintenance and incident response that a hosted provider would otherwise carry.

That's the bit I see skipped most often. Someone downloads a model, stands it up on a spare GPU box, and it quietly becomes production. Nobody checked where the weights came from, nobody's watching it, and nobody owns patching it.

## What the guidance covers

- understanding the opportunities and risks
- assessing model provenance and trustworthiness
- managing model and software supply chain risks
- setting up governance and oversight
- securing deployments and connected systems
- monitoring, maintenance and incident response

## Where I'd start

If you're already running open-weight models, start with provenance and ownership. Know where every model came from, who's responsible for it, and what it can reach. If you're only thinking about it, read both documents before the first download, not after.
