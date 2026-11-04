---
title: "Markdown just became an executable"
date: 2026-11-05
summary: "Forever Security found a planted AGENTS.md in a customer's Downloads folder that told a coding agent to install malware. Nothing needs patching, which is exactly the problem."
tags: ["ai-agents", "prompt-injection", "developer-security", "supply-chain"]
draft: false
---

Forever Security has published one of the more unsettling write-ups I've read this year: [Markdown Is the New Executable](https://forever.security/blog/hijacking-ai-agents-via-downloads-folder/). It isn't a lab demo. It started with something they caught on a real customer's machine.

## What they found

A coding agent on the customer's machine tried to install an npm package called function-color, which is known malware. Forever's product stopped the install before any code ran. When they traced back why the agent wanted that package, they found a file called AGENTS.md sitting in the customer's `~/Downloads` folder.

The file was plain text, dressed up as ordinary engineering notes. One section told the agent to add a "project tools" server to its own configuration and install the package. The agent hadn't gone looking for malware. It was following the instructions file in the folder it had been started in, which is what it's built to do.

Forever couldn't establish how the file got there. That's worth saying clearly.

## Why the Downloads folder matters

Two things make this work, and each is harmless on its own.

Coding agents such as Codex read an AGENTS.md when they start in a folder and treat it as directions. And Downloads is the one folder a web page can write to without a click or a permission prompt, choosing both the file name and its contents.

Put those together and a web page can drop orders into a folder your agent trusts. Forever built its own proof of concept page to show the full path is possible: visit it, and an AGENTS.md lands silently in Downloads. In their telemetry, about half of customers run a coding agent inside their Downloads folder.

## How well it works

Forever took the real attacker file from the customer's machine and ran it unchanged inside an isolated VM. Codex fetched and ran the live payload in more than 90% of attempts. They also reproduced the attack on Claude Code.

The nastier detail is where the change lands. The edit goes into `~/.codex/config.toml`, which is Codex's machine-wide config. Once it's written, every Codex session on that machine loads the attacker's server, in any folder. Leaving Downloads doesn't fix it.

## Nothing to patch

Forever makes a point I agree with. There's nothing here for OpenAI or Anthropic to fix. An agent that follows the instructions file in its folder is working as designed, the same way a browser that renders a phishing page is working as designed. The problem is a folder the web can write to being trusted as if the user filled it.

That's the bigger pattern. A lot of our defences assume a human is the one deciding what to run. When an agent takes the human's place, those assumptions quietly stop holding.

## What I'd do this week

- Don't start Codex, Claude Code or any other agent in `~/Downloads`.
- Look for instructions files you didn't write. A stray AGENTS.md or CLAUDE.md, in Downloads or a repo you just cloned, is the whole attack. Read it before an agent does.
- Check agent configs. In `~/.codex/config.toml`, look for a server block or base URL you didn't add. In a project's `.claude/settings.json`, look for an API endpoint you didn't set.
- Leave approval prompts and sandboxes on, and be wary of anything asking the agent to switch them off.
- If you find a planted file, assume the agent's login token leaked and rotate it.

None of this costs anything. It just needs someone to treat a text file like the executable it's become.
