---
title: "Mythos is going into Cisco and IBM products. You still don't get the model."
date: 2026-11-12
summary: "Cisco and IBM are putting Anthropic's bug-finding Mythos model into their security products. Customers get the capability under product controls, not an open interface to the model itself."
tags: ["anthropic", "security", "ai-agents", "cisco", "ibm"]
draft: false
---

Cisco and IBM are putting Anthropic's bug-finding [Mythos](https://www.theregister.com/ai-and-ml/2026/11/10/anthropics-super-bug-finding-mythos-model-is-going-into-cisco-and-ibm-products/5308616) model into their security products. The useful part is the access model: you get the capability, not an open interface to the model itself.

That matches how tightly Anthropic has held Mythos so far, first under Project Glasswing and then through its verification programmes. A model this good at finding bugs is also useful to an attacker, so widening access through a product, with a job, a target and an audit trail, is a more controlled step than handing customers the model.

## Cisco AI Defense

Cisco announced the integration at Cisco Live in Melbourne. [Mythos will sit inside the adaptive red teaming tools in Cisco AI Defense](https://blogs.cisco.com/ai/cisco-ai-defense-to-add-anthropics-claude-mythos-for-ai-red-teaming). You register a target you're authorised to test, a named person sets the objective, and the engagement is audited. Cisco says customers don't get an open interface they can prompt freely, and the test stays on that registered target rather than the wider internet. Every action is attributed to a named operator.

Standard and adaptive red teaming is already in AI Defense. Adaptive red teaming with Mythos is coming soon for select enterprises. Broader availability is planned for qualified customers, and Cisco says dates, scope and regions are still subject to change.

## IBM Concert Protect

[IBM plans to bring Mythos into Concert Protect](https://www.ibm.com/new/announcements/ibm-plans-to-bring-anthropic-s-claude-mythos-cyber-reasoning-into-ibm-concert). In IBM's wording, it will use the model to uncover weaknesses traditional scanners miss, work out which ones pose real risk, and generate fixes for a developer to approve. That scanning would run against repositories the customer selects, and findings would go into Concert's existing vulnerability management process, alongside results from ordinary scanners. IBM also points to Concert Protect's Proof of Exploitability feature, and to Red Hat Lightwell for proposed fixes that a developer still has to review.

General availability is planned for early 2027, and IBM says those plans can change.

## What I'd check first

I'd want to see the audit trail, the authorisation model, and what happens to the code or prompts you send it, before I pointed it at anything I care about. Cisco's controls are clearly written down. IBM's announcement is still a plan, with a later date. Neither vendor is giving you Mythos to drive yourself, which is the part of this I'd keep.
