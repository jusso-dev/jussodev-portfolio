---
title: "This malware's beacon looks like a ChatGPT API call"
date: 2026-11-06
summary: "Unit 42 found C2Agent, Windows malware where an LLM drives the infected machine one tool call at a time, beacons to /v1/chat/completions and can hand work to AI CLIs on the host."
tags: ["malware", "ai", "mcp", "threat-intel"]
draft: false
---

Palo Alto Networks Unit 42 posted timely threat intel notes on 9 October about a Windows malware family it named C2Agent. The notes are short and dense, and they're [published on Unit 42's GitHub](https://github.com/PaloAltoNetworks/Unit42-timely-threat-intel/blob/main/2026-10-09-C2Agent-malware.txt). This is what stood out to me.

## An LLM in the driver's seat

C2Agent is written in Go. Unit 42 says the implant relies on AI to drive operations on an infected host. The core of it is a loop: the operator sets a goal, the implant prompts an LLM, the model replies with one tool action, the implant runs it, sends the result back as feedback, and repeats.

The tools the model can call depend on the version, but include command execution, templates for credential dumping, shadow copy deletion and free-space wiping, compiling code on the host, data exfiltration, process injection and native Active Directory recon. Version 2.4 added execution of Cobalt Strike Beacon Object Files and self-upgrade.

## MCP and skills

The implant includes a built-in MCP client. By default it points at Firecrawl's public MCP server, a legitimate service, which it uses for web search and scraping. The C2 server can tell it to add more MCP servers at runtime. It also takes skill-based prompts assigned from the C2 server.

So the operator isn't shipping a fixed set of capabilities. They're shipping an agent and handing it instructions and tools as they go.

## Living off the AI

Two details are the reason I'm writing this.

First, the default beacon is a POST to `/v1/chat/completions`, the same path ordinary LLM API traffic uses. Alternate profiles use paths like `/api/v2/sync` and `/ws/message`. On a network full of AI tools, a beacon shaped like an AI API call is easy to wave through.

Second, from version 2.3, C2Agent can hand tasks to AI coding CLIs already installed on the victim's machine. Unit 42 calls this living off the AI, a play on living off the land. If the tools are already there and trusted, the malware can borrow them.

Even the stage one payload is named to blend in. The stager downloads a file called `copilot.txt`, which is really the C2Agent binary.

## How fast it's moving

Unit 42 collected 32 samples between 10 September and 8 October. Twenty-five are agents, covering eight major versions and 19 code revisions in 29 days. The other seven are builds of a single stager. As of 9 October the payload URL was still live and serving the newest build.

That's a lot of iteration for one month. It looks like someone actively building, not a one-off experiment.

## What I'd take from it

Underneath, the goals are familiar: credentials, recon, lateral movement, exfiltration. What's new is how it gets there and what it hides behind.

- Don't assume traffic to an LLM-style endpoint is benign. Know which AI services your organisation actually uses and alert on the rest.
- Ask which machines really need AI coding CLIs installed. Every one is something a compromised host could borrow.
- Treat MCP connections from endpoints like any other outbound tool use, worth logging and reviewing.

AI traffic is turning into cover. Defenders should know what normal looks like before it becomes the noise attackers hide in.
