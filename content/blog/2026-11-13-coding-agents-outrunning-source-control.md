---
title: "Agents write code faster than source control can take it"
date: 2026-11-13
summary: "Anthropic replaced Git with Scion, while OpenAI and GitHub kept Git and rebuilt the server. The shared problem is that coding agents now write changes faster than source control, review and CI can absorb them."
tags: ["ai-agents", "git", "source-control", "devops"]
draft: false
---

Coding agents are putting pressure on the systems that store and merge their code. Three organisations have now published what they built when that pressure showed up in a monorepo: [Anthropic's Scion](https://www.anthropic.com/research/redesigning-source-control) in October, then [OpenAI's Pando](https://openai.com/index/scaling-git-at-openai/) on 2 November and [GitHub's Project Rubicon](https://github.blog/engineering/architecture-optimization/inside-githubs-new-git-storage-architecture/) on 5 November.

They made different bets. Anthropic replaced Git. OpenAI and GitHub kept it and rebuilt the server. The problem underneath is the same.

## Anthropic replaced Git

Anthropic's merges went from about 2,500 a day in May to more than 30,000 in September. Writing code was no longer the bottleneck. Source control, builds and CI still assumed human scale.

Its answer was Scion, an in-house version control system that replaced Git in its monorepo. A seven-person team built Scion, a review surface called Antique, and the surrounding tools, and fully migrated in five months. Commits, merges and history run on the server, and clients fetch only what they need. There is no local push step, and many CI jobs can ask the server for a diff or a merge base without checking out a working copy at all.

Anthropic reports a 200-fold reduction in infrastructure footprint against its old Git mirror fleet, and a 25% reduction in CI CPU use. Checkouts that used to take minutes now take seconds. It is also clear that Scion is not a public Git replacement. The design only makes sense for a huge monorepo flooded with agents, and using it would mean migrating review, search and CI as well.

## OpenAI kept Git and rebuilt the server

OpenAI went the other way. [Pando](https://openai.com/index/scaling-git-at-openai/) keeps the Git protocol and client, but rebuilds the backend so pushes to different branches don't wait on each other. Engineers and agents kept their existing Git workflows. In production, OpenAI says median push latency dropped by nearly 80%.

The core of Pando was designed by one engineer, teams of Codex agents built it, and it reached production in 10 weeks. It began serving production traffic in April, and now powers development in OpenAI's monorepo. OpenAI says it is exploring ways to share the technology with users, but there is no product you can adopt today.

The trade-off is consistency across the whole repository. Updates to one branch are serialised, but a client reading several branches at once can't assume those reads describe a single point in time. OpenAI's view is that people and agents care about the order of updates to a single reference, not a global snapshot of every branch.

## GitHub also kept Git

GitHub's Project Rubicon is a new Git storage architecture under GitHub itself. For developers, Git stays Git: the same push, fetch and branch flow, with the same protections. Underneath, objects live in Azure Blob Storage, and a dedicated service called Ref-CAS handles reference updates so that most agents, pushing to their own branches, don't wait on one another.

In internal testing, it handled 5,000 agents sending 7,200 pushes a second to one repository, while serving reads with consistently low latency. GitHub announced it at GitHub Universe and says it is in limited private preview, with a broader rollout early next year.

## These aren't a bake-off

These figures come from different workloads. They aren't a benchmark comparison. Anthropic is counting daily merges in its own monorepo, OpenAI is reporting median push latency on Pando in production, and GitHub is reporting an internal test. None of these systems is something you can download and install today.

For a smaller team, I'd start with the boring options that already exist: separate Git worktrees for agents, sparse checkouts where they make sense, and a check on whether CI can cope when several pull requests arrive together.

Faster merges don't make code safer. Review and testing still need to keep up. Anthropic has already said the next bottlenecks are builds and CI, and that a traditional merge queue starts to look odd when hundreds or thousands of changes can land while tests are still running. That's the part I'd watch, even if you're nowhere near 30,000 merges a day.
