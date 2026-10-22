---
title: "What I starred on GitHub this week"
date: 2026-10-23
summary: "Six repos I starred this week: agent harnesses, an agent protocol, an ICS honeypot and a 1 GB Palm OS archive."
tags: ["github", "open-source", "ai", "agents", "security"]
draft: false
---

Six open source repos caught my eye this week. Most of them are agent tooling, there's one for the security crowd, and one is pure nostalgia.

## google-research/harness2

Harness² treats the "harness" around a model (prompts, tools, memory, skills, orchestration and so on) as the thing to optimise, and it leaves the model weights alone. It refines the harness for the task in front of it by proposing edits, probing their effects on the same task and composing a better harness from the differences, without needing ground-truth feedback. It also keeps a persistent improvement harness so lessons carry over to later tasks.

The README reports gains of up to 11.5 points on WorkBuddy-Bench and 4.5 points on JobBench from a single step. It supports OpenCode and Codex executors.

[github.com/google-research/harness2](https://github.com/google-research/harness2)

## a2aproject/A2A

Agent2Agent is an open protocol so agents built on different frameworks, by different companies and running on separate servers, can talk to each other as agents rather than as tools. Agents discover each other through "Agent Cards", and they can collaborate without exposing their internal state, memory or tools.

Under the hood it's JSON-RPC 2.0 over HTTP(S), with streaming and async push notifications. There are SDKs for Python, Go, JS, Java and .NET.

[github.com/a2aproject/A2A](https://github.com/a2aproject/A2A)

## get-bb/bb

bb calls itself the agent IDE that builds itself. It can control, customise and automate itself, and you can drive it from the desktop app, web app, CLI or HTTP API. Work runs in threads you can follow live, steer, or hand off to another agent.

It's still in active development. The desktop app supports Apple Silicon Macs, with Linux and Windows builds in alpha, or you can run it with `npx bb-app@latest`.

[github.com/get-bb/bb](https://github.com/get-bb/bb)

## ruvnet/ruflo

Ruflo is a meta-harness for Claude Code and Codex. It adds specialised agents, coordinated swarms, memory that carries across sessions, and mods for routing and policy enforcement inside Claude Code. It also exposes its tools over MCP.

One note from the README I'd underline: the mods run with your account's permissions, so review the code before you install them.

[github.com/ruvnet/ruflo](https://github.com/ruvnet/ruflo)

## mushorg/conpot

Conpot is an ICS/SCADA honeypot. The goal is to collect intelligence about the motives and methods of attackers going after industrial control systems. If you want to see what actually hits OT-looking services on the internet, this is a good place to start, and the docs cover a quick install and writing your own templates.

[github.com/mushorg/conpot](https://github.com/mushorg/conpot)

## ardiri/dev-palmos

This one's pure nostalgia. It's about 1 GB of Palm OS development material: SDKs, technical docs, developer conference slides, utilities, examples and limited-release Palm OS source for 3.5, 4.0 and 5.0. Much of it sat on hard drive backups for more than 25 years before being shared for preservation and education. ROM images, emulator binaries and commercial apps are deliberately left out.

[github.com/ardiri/dev-palmos](https://github.com/ardiri/dev-palmos)

## That's the list

Happy to hear what you've been starring too.
