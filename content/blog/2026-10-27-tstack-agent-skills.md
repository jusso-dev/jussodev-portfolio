---
title: "tstack: Theo's agent skills for Claude Code and Codex"
date: 2026-10-27
summary: "Theo has published the agent skills he uses every day as an MIT-licensed repo. Here's what's in it and why I think the PR-focused ones are worth a look."
tags: ["ai-agents", "claude-code", "codex", "developer-tools", "open-source"]
draft: false
---

Theo (t3dotgg) has open-sourced tstack, the set of agent skills he says he uses every day, cleaned up so anyone can use them. They work in Claude Code and Codex, and it's MIT licensed.

## What's in it

Most of the skills are about getting a change through a pull request without someone sitting there watching:

- **full-send** takes a change all the way to a merged PR: proves it, reviews it, files it, babysits it and merges it.
- **full-stop** does the same but stops when the PR is ready for you to merge.
- **council** gets a review from three models from different providers and loops until they agree.
- **sol-loop** reviews a change with another model in a loop until both agents agree.
- **file-pr** writes a short PR that leads with the problem rather than a list of changes.
- **takeover** finishes someone else's PR, branch or agent thread and keeps their credit.
- **babysit-pr** watches a PR through CI and review bots and fixes the real findings.
- **modernize** rebases an old PR and decides whether it should still exist.
- **leaving-pr-comments** formats the comments an agent posts on your behalf.

Some skills call others, so if you want full-send you also need sol-loop, file-pr and babysit-pr.

## What you need

An authenticated GitHub CLI, python3 for one of the scripts, and for council and sol-loop, a way to run subagents on other providers' models. Installing is a matter of copying the skills folder into your Claude Code or Codex skills directory.

## Why I like it

Two things stand out to me. The first is "full-stop". Having an agent do all the work right up to the merge button, then stop for a human, is the kind of line I'd want most teams to draw.

The second is the advice to keep personal settings, like which models sit on your council, in your CLAUDE.md or AGENTS.md rather than editing the skills. That way you can pull updates without losing your changes. It's a good pattern for anyone sharing skills across a team.

As with any skills you didn't write, read them before you install them. They're instructions your agent will follow, and some of these push code and merge PRs.

The repo: https://github.com/t3dotgg/tstack
