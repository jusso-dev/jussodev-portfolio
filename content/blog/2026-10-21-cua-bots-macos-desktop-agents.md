---
title: Cua Bots for macOS and where the security boundary really sits
date: 2026-10-21
summary: Cua's macOS bots sample gives each computer-use agent its own Space, memory, routines and approval rules. Its README is unusually clear that those rules are instructions, not enforcement, which is the right way to think about desktop agents.
tags: [ai, agents, computer-use, security]
draft: false
---

[Cua](https://github.com/trycua/cua) is an open source project for giving AI agents computers they can use. Its repo includes a sample app, [Cua Bots for macOS](https://github.com/trycua/cua/tree/main/examples/cua-bots-macos), that turns computer-use agents into persistent bots. It's not my project. I'm writing about it because of how clearly it documents what it doesn't enforce.

## What Cua is

The main repo holds several pieces:

- **Cua Spaces**, a desktop app that gives agents full desktops. A Space can be a macOS VM built on your Mac, or a Linux or Omarchy image, running on your Mac, on other machines you own or in your own cloud account.
- **Cua Driver** for operating apps on macOS, Windows and Linux.
- **Lume** for local macOS and Linux VMs on Apple Silicon.
- **Cua Bench** for evaluating computer-use agents, and the CUA-S1 decision models.

Most of the repo is MIT licensed, including the SDK, the `cua` command, Cua Driver and Lume. Cua Spaces is source-available under the Functional Source License 1.1 with an MIT future licence (FSL-1.1-MIT), and so is this sample, because it links Cua Spaces components. Spaces is free for individuals, with paid Pro and Teams plans.

It's a busy project. There were several releases across its components in the last few days, and commits landed on main as recently as 20 October.

## What the bots sample does

It's a SwiftUI app built on the Cua Swift SDK. Each bot gets:

- a name and a koala face you design
- its own computer, a Space named `bot-<name>`, running locally or in the cloud (local Spaces need Docker or Colima)
- a memory that outlives that computer, kept in a Cua Volume with `memory/MEMORY.md`, `outputs/` and `inbox/` folders
- routines it runs on its own on a schedule
- rules for when it has to ask you first, in a `rules.yaml` and an instructions file in its home

The agent underneath can be Claude Code, Codex, Hermes or OpenClaw, and it needs a model API key in the app's environment. You can watch the bot's computer live, with picture in picture, take over at any point, and pause, resume or reset it. Reset deletes the Space and the bot's Volume home. There's an iPhone companion app as well.

## How the bot talks to the app

The app writes standing instructions (`CLAUDE.md`, `SOUL.md` or `AGENTS.md`) into the bot's home. They teach the agent markers that the app turns into UI:

- `[[ask: ...]]` shows an approval card
- `[[handoff: ...]]` hands a task back to you, with "Change the bank password" as the example
- `[[login: site]]` shows a sign-in card, using a saved sign-in from the Cua Keyvault or letting you take over and type it
- others report status, steps, outputs, notifications, schedules and results

It's a tidy pattern for keeping a person in the loop on a long-running agent.

## The Gaps section is the best part

The README ends with a section called Gaps, and it's worth reading if you're thinking about running desktop agents anywhere near real accounts. It says:

- **Rules are guidance.** In the README's words, "The rules are instructions, not enforcement: the harness runs with its permissions auto-approved inside the bot's own Space." Enforced approvals would need the runner to route permission requests to the app.
- **Host access is per account, not per bot.** If you allow access to your Mac, you're not granting it to one bot.
- **Routines only fire while the app is open**, because the routine clock runs in the app.
- **Saved sign-ins** need the Cua daemon's Keyvault and a Cua-signed app to approve them. This sample's build shows the request and falls back to you taking over.
- **The Volume** in this sample is a folder in the app's data, with the Cua Volume layout and secret refusal. The SDK's own Volume and persistent agent features aren't wired in yet.

## Why that matters

This is how most agent setups actually work, whether or not they say so. An approval rule in a prompt is something the model is asked to follow. It isn't a control. A model can misread it, a prompt injection in a web page can talk it out of it, and nothing in the system stops the action.

The real boundary is the sandbox and what you put in it:

- what the bot's Space can reach on the network
- which credentials and signed-in sessions are inside it
- whether you've shared your host with it

Cua's design gives you useful pieces for that. Each bot has its own Space, the main README says Keyvault sessions are encrypted on your Mac and reach a Space only after you approve, and you can watch and take over. But the sample is honest that the approval rules sit on top of an agent that's already auto-approving inside its box.

## What I'd do

If you're trialling Cua Bots or any desktop agent:

- Treat the Space as the security boundary and design around it, not around prompt rules.
- Leave host sharing off unless you need it, and remember it's per account.
- Only put sign-ins in a Space that you'd be comfortable with the agent using without asking.
- Use it for low-stakes work first, and watch what it does live.

It's a sample, not a finished product, and it says so. That's exactly why it's a good one to learn from.
