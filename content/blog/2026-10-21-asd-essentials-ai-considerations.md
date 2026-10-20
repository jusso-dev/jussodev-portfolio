---
title: What ASD's AI considerations within the Essentials mean for teams running agents
date: 2026-10-21
summary: ASD's new guide applies the ASD Essentials series to AI. It treats AI as an asset, accepts that prompt injection cannot be completely prevented, and puts the weight on identity, least privilege, approval and logging for agents.
tags: [security, ai, agents, australia, asd]
draft: false
---

ASD has published [AI considerations within the Essentials](https://www.cyber.gov.au/publication/ai-considerations-within-the-essentials), a guide (titled "AI within the ASD Essentials series" in the PDF) to applying the ASD Essentials series to AI. It covers the enterprise IT, cloud and OT chapters.

It isn't a new framework. The guide says the Essentials framework "applies regardless of whether an organisation consumes, develops or deploys artificial intelligence", and that the series is technology-agnostic. Most principles apply to AI the same way they apply to other technology, "although implementation may differ". The guide is about that difference.

## AI as a threat, a solution and an asset

The guide looks at AI three ways.

**As a threat.** ASD's view is that AI "has not fundamentally changed how adversaries gain access to and move through an environment", but it has made existing attacks "faster, cheaper and available to more people". It names synthetic voice and video used to deceive help desks or people who approve payments or access. It also says AI systems can be targets themselves, with indirect prompt injection through emails, documents or web content processed by AI agents that have access to tools or data. The answer it gives is layered protection, so an attacker who defeats one measure meets another.

**As a solution.** AI-enabled security tools can help process data, correlate events, triage alerts and synthesise threat intelligence. But those products are AI assets too, and should support the actions in the series "rather than replace them". Accountability for security outcomes "remains with people", and AI-generated outputs should be validated before they inform significant decisions.

**As an asset.** AI systems are in scope. The list includes:

- internally developed or fine-tuned models
- infrastructure used to host or train models
- externally provided AI services
- AI-enabled platforms and applications
- training and fine-tuning data
- prompts, outputs and inferences generated during operation
- interfaces, connectors and APIs
- accounts and non-person identities used by AI agents and services

When scoping, you look at an AI asset's function, connectivity, criticality, access and the consequence of its compromise.

## Executive accountability

The guide ties governance to the ISM's Executive artificial intelligence accountability principle. Under it, the board or executive committee is accountable for ensuring AI is "secure, controllable, human-supervised and used in an ethical and accountable manner". That should be backed by processes for approval, risk assessment, oversight and ongoing review of AI use cases.

## The line that matters most

In the enterprise IT section, secure system lifecycle "should ensure a manipulated model cannot exceed the access it has been granted, recognising that prompt injection cannot be completely prevented."

I think that's the most useful sentence in the guide for anyone building with agents. It accepts that you can't filter your way out of prompt injection, and moves the control to the agent's access. If an agent can be talked into something, the question is what it can reach when that happens.

## Enterprise IT in practice

The enterprise IT section maps AI onto the existing domains. AI agents and their non-person identities belong with identity services. AI tools that can take administrative actions belong within privileged environments. Public-facing AI services and APIs relate to boundary services.

The points I'd act on first:

- **Asset identification** includes AI systems, models, training data, model artefacts and inference endpoints.
- **Vulnerability management** covers prompt injection, adversarial inputs, model extraction and compromised model weights or training data.
- **Cyber supply chain security** verifies the integrity and provenance of model weights, training data and other AI components, and approves AI tools and integrations before they access organisational data.
- **Supplier assurance** establishes where AI providers keep prompts and outputs, and whether organisational data trains their models.
- **Trustworthy software** addresses unapproved AI tools, browser extensions, locally run models and agents, "including agents capable of executing code".
- **Least privilege** limits agents and integrations to the minimum data and permissions, and deals with overshared data that AI assistants may surface.
- **Secure administration** keeps AI tools capable of admin actions in privileged environments, with their actions recorded.
- **Centralised event logging** captures relevant prompts, outputs, retrieval activities and administrative actions, allowing for the sensitivity and volume of that data.
- **Baselined high-risk access** accounts for normal agent behaviour so anomalies can be detected.
- **Backups** include the models, configurations and retrieval data stores needed to restore AI-enabled services.
- **Awareness training** covers approved AI use, AI-enabled social engineering, out-of-band verification of unexpected requests and the limits of AI output.

## Cloud in practice

The cloud section adds a few things because responsibility is shared with providers:

- Get executive or delegate approval before enabling SaaS or PaaS AI functions.
- Record AI capabilities in your shared responsibility register: which AI controls you run, which the provider supplies for you to configure, and which the provider delivers for you to verify.
- Give each AI agent "an owned non-person identity that is constrained to its intended context".
- Assess and approve AI applications, connectors and consent grants before they access organisational data.
- Treat agents and automation with access to SaaS administration or cloud control planes as privileged, and record their actions.
- Include tenant-level AI settings such as web grounding, plugins, connectors and data access scopes in approved configuration baselines.
- Use content filtering to stop sensitive data flowing to unsanctioned AI services and to inspect retrieved content for malicious instructions.
- Log AI prompts, outputs and agent actions, and make sure provider logging is turned on and retained.
- Find out which regions AI processing happens in.

## OT in practice

The OT section is the most cautious, because decisions there affect safety and physical processes. It notes AI can help adversaries understand industrial protocols and control logic faster.

- Automated actions recommended or taken with input from AI should not be able to compromise safety functions.
- Models that feed control systems should have outputs constrained to safe operating limits, and safety systems should enforce those limits independently.
- AI platforms should have no pathway capable of changing safety systems.
- Vital OT should not depend on AI services outside the OT environment, and should stay safe during isolation.
- AI-enabled vendor services should connect through the OT demilitarised zone, not directly into OT.
- You should be able to recover AI-enabled OT functions without supplier support, and isolation exercises should confirm AI-dependent functions fail safely.
- OT information like configurations and drawings shouldn't be disclosed to AI services outside the organisation's control.
- Logging should capture AI recommendations, automated actions and operator overrides, and stay available during isolation.

## What I'd change on Monday

If your team is rolling out agents or AI assistants, this is where I'd start:

1. Inventory the AI estate, including connectors and the non-person identities agents use.
2. Give every agent its own owned identity, scoped to what it's for, and strip anything it doesn't need.
3. Put any agent that can make admin changes behind your privileged access controls, and log what it does.
4. Turn on prompt, output and agent action logging, and work out what normal looks like.
5. Ask your AI suppliers where prompts and outputs are kept and whether your data trains their models.

The guide says AI-specific guidance will be updated through supporting publications as capabilities, threats and assurance practices mature, while the core principles stay stable. Given how quickly agent tooling is moving, I'd expect that to happen often.
