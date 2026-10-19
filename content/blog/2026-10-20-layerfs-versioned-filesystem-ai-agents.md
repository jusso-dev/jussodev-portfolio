---
title: LayerFS, a versioned filesystem for AI agents
date: 2026-10-20
summary: LayerFS gives every agent its own writable fork of a project without copying files, and records each tool call as a commit you can trace back to the agent. 1.0 is planned for 21 October, so for now it's a developer preview.
tags: [ai, agents, infrastructure, security]
draft: false
---

When you run several coding agents on the same project, the filesystem becomes the problem. Each agent needs its own copy to work in. A real repo with `.git`, `node_modules` and build output is slow and big to copy. And when it's all done, it's hard to say which agent changed what, or to get back to the state before a bad change.

[LayerFS](https://github.com/Ephemeral-AI-Lab/layerfs), from Ephemeral AI Lab, is a versioned filesystem built for that. It isn't my project. Here's what it does, going by its README, release notes and 1.0 plan, and where it's at.

## What it does

The README describes it as giving every agent "its own complete, writable copy of the project in milliseconds, without copying a file". The main ideas:

- **Workspaces.** Mounting a Workspace binds the full tree, including `.git`, dependencies and build output, without scanning or copying it. Each Workspace keeps its uncommitted changes in its own overlay. You can have one per agent, or one per tool call.
- **Branches you can fork to any depth.** A branch can be forked from `main`, from another branch or from any past commit, and forks can be forked again. A fork copies nothing, it's a new name for an existing state. The pattern the project describes is a lead agent forking a branch per subtask, subagents forking again to try alternatives, the winners merging up and the losers being dropped.
- **Commits that merge.** If a branch moved since an agent mounted it, that agent's commit merges with the new head. A real conflict writes conflict markers into the agent's own Workspace and commits nothing.
- **Attribution.** `blame` traces each line to the commit that wrote it, and the agent UI shows which agent and which call made that commit.
- **Compute separate from state.** File work (read, write, grep, diff, fork, merge, publish) runs in your own process against a shared Store. A Sandbox is a container that mounts Workspaces and runs ordinary commands in them. Closing a Sandbox loses nothing that was committed.

The JavaScript SDK has 29 methods across `project`, `fs`, `branch` and `sandbox`. It needs Linux (ext4, xfs or btrfs) for the Store, Docker for Sandboxes and Node 20 or later. There's also a LayerFS tab in DeepSeek Harness that shows agents' branches, Workspaces, commits, merges and conflicts live.

## How it stores everything

Every state is kept, and a new state should cost about what changed. LayerFS combines four techniques:

- content-addressed storage, so identical files and objects are stored once across every branch and agent
- content-defined chunking, so a small edit to a large file changes a few chunks rather than the whole file
- copy-on-write trees, so a commit rewrites only the changed files and their directory path
- delta encoding against the previous version of a changed chunk or file

The README's headline number comes from the project's own test, where an agent built an e-commerce site on LayerFS. The full commit history added up to 770 MB of files, stored in a 6.3 MB database, which the project puts at 121 times smaller. Reinstalling `node_modules` from scratch added 117 KB. In another test, replaying part of a real repository's history with crews of agents produced 10,547 commits from 19,974 SDK calls. I haven't run either of these, but the evidence files are linked from the README.

## Why I find it interesting

I spend a lot of time thinking about what happens when agents write code and run tools with real access. Most setups give you a final diff and a log, if you're lucky. Two things here stand out to me.

The first is attribution. If every tool call can become a commit, and `blame` can take a line back to the agent and the call that wrote it, you get a much better record of who did what than a squashed change at the end. That's useful for code review, and for working out what happened when something goes wrong.

The second is rewind. Every state is kept cheaply, and any past commit can be forked, so getting back to a known good point is a normal operation rather than a restore job.

To be clear, LayerFS is a filesystem and history layer, not a security boundary. The isolation between agents is about their files and changes. How contained the commands are depends on the Sandbox container and how you run it.

## Where it's at

This is the part to read before you build on it.

- The latest release is v0.1.7, published on 15 October 2026 and described as the last 0.1.x developer preview. It rewrote the core and removed the earlier CLI and Rust SDK. It's source only, with no npm package, prebuilt binary or public image, and the release notes say it makes no performance claim.
- The 0.1.7 release shipped with waivers. Some acceptance gates weren't rerun at the release commit, one was not run, and one was kept as a historical fail.
- Only the Disposable Store profile runs in 0.1.7. Whether the Durable profile is enabled for 1.0 is still an open decision.
- The README says 1.0, the first official release, arrives on 21 October 2026. Until then `main` is locked and a work in progress, the SDK, Store format and docs may change without notice, and there's no supported install. The project asks people to wait for 1.0 before building on it.
- The 1.0 plan says no release candidate exists yet, and lists decisions the owner still has to make: the compatibility promise, release gates, whether to publish packages, and which known limits from 0.1.7 get fixed.
- The repo was created in August 2026 and is very active, but nearly every commit is from one developer.

It's MIT licensed.

## What I'd do

I'd wait for 1.0 and read its release notes, especially what it promises on the Store format and which limits were fixed. Then I'd try it on a throwaway project with a couple of agents before going near anything that matters. If the attribution and rewind hold up in practice, it's a much better base for multi-agent work than a pile of copied directories.
