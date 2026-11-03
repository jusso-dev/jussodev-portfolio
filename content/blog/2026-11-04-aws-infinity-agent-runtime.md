---
title: "AWS Infinity treats a waiting agent as a saved conversation, not a running process"
date: 2026-11-04
summary: "AWS and UC Berkeley have released Infinity, an open source research runtime that suspends agents during tool calls the way async code suspends at an await. Here's how it works and why it matters for anyone running long-lived agents."
tags: ["ai", "agents", "aws", "serverless", "open-source"]
draft: false
---

## What AWS released

On 23 October, AWS published [Introducing Infinity: a runtime for extreme agent concurrency](https://aws.amazon.com/blogs/opensource/introducing-infinity-a-runtime-for-extreme-agent-concurrency/). Infinity is an Apache 2.0 open source runtime from the Hydro project, which is a joint effort between AWS and UC Berkeley. AWS is clear that it's an early research release and that they're sharing it to get feedback.

## The problem it goes after

Agents spend a lot of their time waiting. A coding agent kicks off a build that takes twenty minutes. A triage agent waits hours for the next pull request. An assistant waits until tomorrow for someone to approve something.

Most agent harnesses run the loop as blocking steps: call the model, run a tool, wait for the result, repeat. While the agent waits, it holds a process and its memory, and it can't react to anything else that turns up in the meantime.

## How Infinity handles it

Infinity borrows from how languages like Rust, JavaScript and Python suspend async functions. When an agent calls a tool, its conversation history already holds everything needed to carry on once the result comes back. So the runtime saves that history, dispatches the tool call and lets the agent go.

Each agent runs as a series of bounded slices. A slice loads the history from a store, runs one model completion, saves the output and dispatches at most one tool call. Then it ends. Tool results, user messages and timers all arrive as messages on an input queue, and each one starts a new slice.

Threads don't share mutable state. Messages for one thread are processed in order, one slice at a time, while different threads run in parallel. If that sounds like an actor system, that's the comparison AWS makes too.

## The numbers

In AWS's benchmark, 80,000 agents ran twenty turns each against a simulated model, on a single thread with in-memory stores. Memory grew at about 100 KB per idle agent, which is mostly conversation history. At that rate about 75,000 agents fit in 8 GB, the memory of a Raspberry Pi 5.

## Serverless without paying for the wait

Because a slice never blocks and loads all its state from storage, Infinity can run on serverless platforms. The reference deployment on AWS uses an SQS FIFO queue with one message group per thread, Lambda to run each step, Aurora DSQL for conversation history and DynamoDB for deduplication. Timers use SQS delivery delays and EventBridge Scheduler.

The upshot is that an agent waiting three days on a CI pipeline uses no compute until the pipeline reports back. The runtime also deals with redelivered messages by tracking stable message IDs, and it only commits a model turn once it's complete.

## Events the model can reason about

The other idea I liked is synthetic tool calls. Model APIs expect one result per tool call, so there's no clean way to tell an agent "a new pull request just opened" while it's subscribed to a repo. Putting that in a user message makes it look like the user said it.

Infinity instead injects a tool call the model didn't make, named receive_event__injected, followed by a result carrying the event. The model gets the event in the form it already knows how to handle, and the runtime refuses the call if the model ever tries to invoke that name itself. The same mechanism is used for messages between parent and child agents.

## Why I think it's worth a look

A lot of the agent cost and reliability problems I see come from treating an agent like a long-running process. Infinity treats a waiting agent as saved state, which makes it cheaper and easier to recover. It's research code, so I wouldn't put it in production yet. But if you're designing agents that wait on builds, approvals or other people, the pattern is worth understanding now.
