---
title: "The ACSC's open-weight guidance hasn't changed. Here's the operating bit."
date: 2026-11-13
summary: "ASD's ACSC has not issued new open-weight publications since 5 November. If a model is already running, the practical next step is an inventory, controls that sit outside the model, and a plan to isolate or roll it back."
tags: ["ai", "acsc", "governance", "supply-chain"]
draft: false
---

This is not a new release. On 5 November, ASD's ACSC published two guides on open-weight AI models, and both pages were still last reviewed on that date when I checked them. I wrote about the [ownership trade-off](/blog/open-weight-ai-you-own-it/) when they first landed. This is the operating follow-up.

If a model is already running in your environment, the useful document is [Selecting, deploying and operating open-weight AI models securely](https://www.cyber.gov.au/publication/open-weight-ai-models-selecting-deploying-and-operating-open-weight-ai-models-securely). The companion, [Open-weight AI models: Opportunities and cyber security risks](https://www.cyber.gov.au/publication/open-weight-ai-models-opportunities-and-cyber-security-risks), is still worth reading for the supply-chain and fine-tuning risks. The [announcement](https://www.cyber.gov.au/news/new-guidance-on-open-weight-ai-models) has not been replaced.

## Start with a register, not another download

The ACSC wants a register of approved models and a technical inventory of what is actually deployed: model versions, artefacts, adapters, dependencies and configurations. Each entry should record the approved use, the accountable owner, the risk acceptance decision, and the date of the next review.

That's the bit most teams still skip. A model can be in production for weeks before anyone can answer which checkpoint is running, who signed off on it, or what it can reach. If you can't produce that list, start there before you add another model.

## Don't rely on the model's own safeguards

The guidance is blunt about this. Do not rely solely on safeguards built into the model. Controls need to sit outside it, covering inputs, outputs, tool use, and approval of high-risk or irreversible actions.

On the infrastructure side, that means putting the inference service in a separate network segment, keeping development and production apart, authenticating the admin and inference interfaces, enforcing multi-factor authentication for administrative access, and restricting outbound network access. Rate limits and resource quotas belong on the inference interface too.

The ACSC also distinguishes self-hosting from consuming an open-weight model through a hosted API. In the second case, you're consuming a hosted AI service, and the usual cloud and supply-chain questions apply.

## Have a way to stop it, update it, or retire it

Operating the model includes watching for new releases, security advisories and vulnerability disclosures, testing updates before you apply them, and keeping a rollback path. If the developer stops maintaining the model, you need a decision about whether continued use is still acceptable.

For incidents, the ACSC's recommended actions are practical: log admin access, security events, prompts, responses and tool activity in proportion to the risk, and have a tested way to stop the service, revoke credentials, and isolate the infrastructure from sensitive data and connected systems.

If you only do one pass this week, do the inventory, name an owner, and confirm you can isolate or roll the deployment back. The documents are still the 5 November pair. They haven't been superseded.
