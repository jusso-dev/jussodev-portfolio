---
title: What I'd steal from how the Claude Code team does code review
date: 2026-10-20
summary: Claude writes about 90% of Claude Code, so the team rebuilt code review around human time. The three-round cap on agent review loops is the rule I'd copy first, along with risk tiers set by the change and approvals that cover one commit.
tags: [ai, agents, code-review, security, engineering]
draft: false
---

Anthropic's Claude Code team has written up how it reviews code now that Claude writes about 90% of Claude Code's own code. The post, [How the Claude Code team does code review](https://claude.dev/blog/solving-code-review-at-anthropic/), is by Addy Osmani, Morgan Westlee Lunt and Qing Wang, published on 15 October 2026.

Their framing is that the scarce resource is human time and attention, not reading every line. The goal is that most pull requests merge with at most one person in the loop, who can be the author, with no increase in reverts or incidents. These are the parts I'd take into any team that lets agents open PRs.

## The review loop needs a cap

This is the bit I keep coming back to.

One CLI PR went through more than 50 rounds of review and fixes overnight before its author stopped it. When the team ran git blame on what the reviewer kept flagging, about 59% of it was code that had been there since the reviewer's first pass. It wasn't finding new bugs. It was finding a few more old ones each round.

The post explains why this happens with agent authors. A person can wave off a nit in seconds. An agent fixes it, which means another commit and another round of review. An agent author and an agent reviewer can keep each other busy indefinitely. The team also admits it made things worse by running several rounds by default.

What they changed:

- After three rounds, the reviewer asks the author to step back and reconsider the approach.
- After the first few passes, re-review looks only at the new diff.
- The reviewer flags the class of bug, so the author fixes every instance rather than one line.
- Findings already posted aren't repeated.

They now track rounds-to-pass alongside recall. It's a cheap rule, and anyone running agent review in CI can add it this week.

## The change sets the risk tier

A docs fix and an auto-updater change carry different risk, so they get different review.

- **Low:** docs, copy, internal-only features and additive changes behind a flag. No human approval is required once automated review and security checks are green.
- **Medium:** ordinary product changes, and sensitive areas such as caching, the auto-updater or system prompts. One person approves.
- **High:** the highest-risk code, plus a small set of paths that always need two people.

A classifier reads the change and picks the tier, and a second one asks whether this particular change needs another person anyway. Paths owners have listed as sensitive, and any CI workflow file, always need a person. Humans stay responsible for reviewing risky code such as billing, the auto-updater and CI workflows.

The lighter paths are only for authors on the repo's trusted list, mostly the team that owns it. Everyone else needs a second person.

## An agent is never a person

Two rules here that I like a lot from a security point of view.

An agent's approval never counts as a person's. Automated review can clear a low-risk change, but it can't fill a slot that calls for a human. And on an agent-written PR, the person directing the agent counts as one of the required reviewers, the same as if they'd typed the code.

An approval covers one specific commit. If new commits land that the system can't vouch for, like an agent's push or a merge someone resolved by hand, the approval has to be given again. That closes the obvious gap where something gets approved and then quietly changes.

## Incidents become the eval set

The team collected past PRs that caused incidents, with their fix-forwards and reverts, and had engineers who know the code confirm each bug and where it lived. The reviewer runs against that set daily, and every change to the reviewer is scored against it.

They also measure noise by tracking what people do with each comment (fixed it, said it was wrong, said it was intentional, or decided it didn't matter), and they run the reviewer on known-clean PRs to see how often it would lead someone into a harmful change. Their written priority is catching real bugs first and cutting review rounds second.

## Layers, not one gate

The rest of the process is defence in depth for code. Claude verifies its work before a PR exists, by running tests, a build or a screenshot comparison and showing the output. Every PR gets an AI review, and findings are checked by other agents and only posted if enough of them agree. A separate security review can block the merge, and every finding has to be fixed or closed with a reason. Then there's CI, human approval by risk, a merge queue that reruns checks against main, feature flags, internal use first, staged releases and fast rollback.

They're open about the gaps too. Spotting a bad merge still depends on the author, on-call and dashboards, and they don't yet have circuit breakers that tighten approval when revert or incident numbers move.

## A caution on the headline number

From June to September, merged PRs to Claude Code more than doubled while the share that had to be reverted fell by more than 40%.

That's a good result, but it's a rate. If volume exactly doubled and the revert rate fell exactly 40%, the raw number of reverts would still be about a fifth higher. The post says "more than" for both figures, so the count could have gone either way. It's a strong result per PR. On its own, it doesn't prove fewer things broke.

## What I'd do first

If your team lets agents open PRs, I'd start with three changes:

- Cap agent review rounds, and re-review only the new diff after the first few passes.
- Make sure no bot approval can satisfy a required human review, and dismiss approvals when new commits land.
- Put billing, auth, installers and CI workflow files behind CODEOWNERS and branch protection so a person always signs off.

Then start turning past incidents into a set your reviewer has to pass.
