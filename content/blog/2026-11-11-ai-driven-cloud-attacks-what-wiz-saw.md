---
title: "Wiz has seen AI agents run whole cloud intrusions"
date: 2026-11-11
summary: "Wiz's incident team has been investigating attacks where an AI agent found a way in, harvested credentials, pivoted across cloud platforms and rewrote its own scripts when something failed."
tags: ["security", "cloud", "ai-agents", "incident-response"]
draft: false
---

Wiz's Customer Incident Response Team has published a write-up of [AI-driven cloud attacks](https://www.wiz.io/blog/anatomy-of-ai-driven-cloud-attacks) it has been investigating. In several recent cases, an AI agent ran the operation: it found entry points, harvested credentials, pivoted across platforms, and debugged its own scripts as it went.

The post is dated 19 October. Eden Abergil, Zohar Kaplan and Kurt Giacchino wrote it.

These campaigns aren't quiet. Wiz describes them as loud, fast, and spread across every layer of the cloud stack. The problem for defenders is that the footprint is split across identity providers, cloud control planes, CI/CD systems and workload logs, so no single alert tells the full story.

## How they behave

Wiz CIRT says these attacks don't look like a person at a keyboard, and they don't look like a fixed script either. The agent works at machine speed, but it can also read context and change course.

Activity can reach hundreds or thousands of actions an hour, and it keeps going without the pauses or working-hour patterns you'd expect from a person. The same source can enumerate cloud resources, deploy Kubernetes workloads, create CI/CD pipelines and query databases in the same window.

Because the agent uses the native APIs of each platform it reaches, every credential becomes a path to the next one. Wiz's example is a Kubernetes service account token leading to a cloud service account, then to a CI/CD system, and from there to full administrative access.

When something fails, it doesn't wait for a person to fix the script. It reads the error, rewrites the code and tries again within minutes, with each attempt aimed at whatever broke the last one.

## What one investigation looked like

The case Wiz walks through was a large organisation with a multi-cloud environment. The agent worked from several attacker-controlled IP addresses and moved across cloud providers, Kubernetes, CI/CD and GitOps, the identity provider, secrets management, data warehouses and internal applications.

It probed several internet-facing services. One confirmed way in was a Java remote code execution vulnerability in an exposed Kafka UI. Shell commands ran from the application's Java process, then malware and a command-and-control channel followed. Even after that foothold, it kept scanning for other doors. The same source IP was seen scanning more than 600 other Wiz customer environments in the same window.

Once it had code execution, it moved quickly: backdoors and command-and-control agents on pods across several clusters, Kubernetes service account tokens, secrets in environment variables, and credentials from the instance metadata service. Those credentials were the path into the cloud control plane.

It operated in both GCP and AWS at a pace no human operator could match. In GCP, it used a service account that could create tokens, and minted credentials across dozens of identities in quick succession. It also scraped container registries, tried to take database records, and deployed publicly reachable Cloud Run services prefixed with `pentest-`. In AWS, it used Systems Manager to run commands, staged exfiltration to a bucket named `pentest-<task_id>`, created an IAM user prefixed with `probe`, and used that user to assume `OrganizationAccountAccessRole`, which gave administrative access across member accounts in the AWS Organization.

It also created an identity of its own. With a compromised administrator API key for the organisation's identity provider, it created a user with a `pentest` prefix, set a password, activated the account and added it to the administrators group. When the identity provider returned errors, the agent worked through them on the fly. It then added the user to cloud role groups mapped to AWS IAM Identity Center roles, and to broader organisational groups. Within minutes of the last group change, the new identity was signing in to AWS through single sign-on, and it kept sessions up until the account was suspended.

CI/CD and GitOps became the main execution engines. Five workstreams ran at once: harvesting secrets, mapping what each runner or pod could reach, trying harvested credentials against those targets, probing accessible services, and standing up more compute. Pipeline and manifest names included `pentest_exfil`, `recon`, `foothold`, `dump-remaining` and `harvest`. On the GitOps side, a compromised deployment service account was used to push Kubernetes manifests that the controller synced into the production cluster. The first manifest escalated to cluster-admin.

From Kubernetes it dumped secrets and, where role-based access blocked that, moved to ConfigMaps. After reaching cluster-admin, it minted service account tokens to impersonate legitimate applications, and it deployed a command-and-control implant as a self-healing workload so the backdoor came back if the pod was killed. It later changed running workloads by talking to the GitOps controller directly, which left no trace in the Git history.

Data was moved out through whatever channel was open: a request-catcher service at webhook.site, a repository in the organisation's own source control, and a Kubernetes ConfigMap created for the purpose. Attempts to create storage buckets named after the task were denied, and when one route failed or hit a size limit, it tried the next.

## Signs I'd look for

Some of the most useful tells aren't in the volume of API calls. Resources, files and payloads were consistently labelled with terms such as `pentest`, `probe`, `recon`, `redteam` and `exfil`. Wiz thinks that framing likely helps the actor present the work as authorised security testing, which can get past a model's safety guardrails.

Many of the resources, users and files also carried a numeric identifier, often shared across related artefacts. Failed attempts were retried under the same number with a letter suffix, such as `-b`, `-c` or `-d`.

The recovered scripts also looked generated. They had descriptive headers, numbered step-by-step comments, and the same helper functions reused across dozens of payloads. That's not how most people write a short-lived exploit script.

## What I'd check first

Wiz's advice to defenders is mostly about visibility and trust boundaries, and I agree with the direction.

Get cloud, Kubernetes, identity, CI/CD and workload logs into one place, with enough retention that you can actually join the events. If a workload is compromised at this speed, I'd rotate every credential it could have reached rather than trying to prove which ones were read. And I'd tighten the trust between systems: a staging workload shouldn't reach production credentials, a CI/CD pipeline shouldn't have standing access to every environment, and a single service account shouldn't be able to mint tokens for any other identity.

The other practical step is the obvious one that's still missed: find the internet-facing developer tools, management consoles and internal apps, and close them before something else does. In this case, an exposed Kafka UI was enough.

The original write-up is on the [Wiz blog](https://www.wiz.io/blog/anatomy-of-ai-driven-cloud-attacks).
