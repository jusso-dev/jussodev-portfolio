---
title: "Infisical's bet: agents shouldn't hold your secrets"
date: 2026-10-28
summary: "Infisical raised a $40M Series B to push Agent Vault, a proxy that gives AI agents access to services without handing them the credentials. Here's why I think the idea matters even if you never use the product."
tags: ["security", "ai", "secrets-management", "agents"]
draft: false
---

## What happened

Infisical has raised a $40M Series B at a $600M valuation. Elad Gil led the round, having also backed their Series A, and Y Combinator and Gradient Ventures came back in again.

The bit I found refreshing is that they say they didn't have to raise. According to their [announcement](https://infisical.com/blog/series-b), they've been cash-flow positive for a long time, have more money in the bank than they've ever raised, and serve over 1,300 organisations.

## Where the money's going

Infisical says it'll keep investing in secrets, certificate and privileged access management, but it'll significantly increase its focus on [Agent Vault](https://infisical.com/platform/agent-vault). That's the part I care about.

Agent Vault is an access layer for AI agents. The agent sends its traffic through a forward proxy and authenticates to that proxy with a time-bound session token. The proxy then attaches the real credential to each allowed request as it leaves your network. The credential is never in the agent's environment, files or context, so a prompt-injected agent has nothing to leak.

A few other details from the product page:

- Access is grouped into access bundles, one per job, and each service can be narrowed to specific HTTP methods and path prefixes. Requests outside those rules get a 403 before they leave your network.
- Every session expires on a schedule you set, and revoking one takes effect within one poll interval, 60 seconds by default.
- Session logs record every request the proxy handles, encrypted and stored in an S3 bucket you own.
- It's currently in preview, and Infisical is clear that it isn't a sandbox. It doesn't restrict the agent's filesystem or processes.

## Why I think this matters

This next part is my view, not Infisical's.

Most teams I see give agents access the lazy way. An API key goes in a .env file, gets passed into the agent's environment, and everyone hopes for the best. Anything an agent can read, it can leak, whether that's into logs, to a model provider or out through a prompt injection.

That risk isn't theoretical. Last week AI coding platform OpenCode told users a breach had exposed stored API keys for about 1.4% of its users, and [BleepingComputer reports](https://www.bleepingcomputer.com/news/security/warp-discloses-breach-exposing-ai-agent-logs-user-telemetry-data/) some were hit with unauthorised charges of up to $1,700.

## The takeaway

You don't need Infisical to take the lesson. Treat agents as a new class of user. Give each one an identity, scope what it can reach to the job it's doing, make its access expire, and keep the real secrets somewhere it can't read. If a tool can broker credentials for you, use it. If it can't, at least stop pasting long-lived keys into agent environments.
