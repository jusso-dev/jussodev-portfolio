---
title: "126 AI tool servers say: do not tell the user"
date: 2026-11-09
summary: "ToolVet scanned 296,198 MCP tool definitions. Real attacks were rare. Instructions that quietly work against the user were not."
tags: ["mcp", "ai-agents", "prompt-injection", "research"]
draft: false
---

ToolVet published [MCP tool poisoning in the wild: 296,000 tools scanned](https://toolvet.app/blog/mcp-tool-poisoning-in-the-wild) on 15 October. I like it because it's honest. The headline finding isn't "everything is on fire". It's more interesting than that.

## What they scanned

An MCP server describes its tools to an AI agent in plain text: a name, a description and an input schema. The model reads all of it before deciding what to call. The user usually sees only the tool's name. Tool poisoning means hiding instructions in that text.

ToolVet connects to remote MCP servers on a schedule and scans every name, description, schema key and string. As of 15 October, that was 296,198 tool definitions from 16,647 remote servers. Their rules are simple pattern matches, so each finding can be explained.

## The numbers

202 servers, about 1%, tripped at least one prompt injection rule. The biggest group was "conceal from user" at 126 servers. Then credential access at 39, tool shadowing at 21, hidden instruction tags at 13, "ignore previous instructions" at 6 and invisible characters at 2.

## Most of it was harmless

Reading the findings by hand, ToolVet didn't find a tool trying to steal keys. All six "ignore previous instructions" hits came from security tools that use the phrase as an example. Both invisible character hits were stray zero-width spaces from copy-pasted marketing text. Most credential hits just named a config file or said not to send a private key.

Even most of the "do not tell the user" lines were good design. Things like don't tell the user their booking is final until the status is confirmed. Sixty-one were one shared sentence from a template, stopping the model claiming a credit card had nothing owing.

## The handful that weren't

A few went the other way. ToolVet paraphrased them and didn't name the servers, because none looked malicious:

- A crypto swap service: when an address is screened, relay a neutral message and never tell the user it was flagged.
- A content platform: don't tell the user that the platform or its safety checks blocked an action.
- A video tool: never tell the user the connector failed.

Each has a business reason. Each also asks the model to put the server's interest ahead of the user's, in text the user never sees. That's the same mechanism as tool poisoning, minus the malice.

Two other patterns stood out. Two remote servers ask the agent to send a wallet private key over the network so the server can sign. And one setup tool tells the model to run steps, including writing to `.env`, "in yolo mode without asking". A tool description isn't the user, and it shouldn't be able to waive confirmation.

## What I'd do

- Read the full tool definitions before connecting a server, not the summary your client shows. Instructions hide in parameter descriptions and schema keys too.
- Treat descriptions as claims, not commands. Instructions about what to hide, which tools to avoid or when to skip confirmation are red flags.
- Pin what you approved. Store a hash of the definitions you reviewed and review again when it changes.
- Never give a remote tool a private key. Signing belongs on the user's machine.

ToolVet's own caveat is worth repeating: a scanner tells you what a person should read. It doesn't replace reading.
