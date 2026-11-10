---
title: "I'm building Bilby, a plain-English computer check"
date: 2026-11-11
summary: "I'm building a free desktop app that will tell non-technical people, in plain English, whether their computer looks healthy. The window already opens, but the checks aren't in yet."
tags: ["security", "windows", "open-source", "rust"]
draft: false
---

I'm building [Bilby](https://github.com/jusso-dev/Bilby), a free desktop app that answers one question for people who aren't technical: is something wrong with my computer?

When the checks are in, you press Check my computer. A minute later it tells you one of three things: looks healthy, worth a look, or needs attention. Every finding will say what Bilby saw, why it matters, how sure it is, and one safe next step. If you want a family member or a local repairer to look, you can save a report and send it to them yourself.

It's early. The app shell already builds and opens a window, but nothing checks your computer yet. Windows comes first, and macOS is a later milestone. I wouldn't treat it as a real scan today.

## What I want it to check

On Windows, the plan is to look for signs that something got past your antivirus, or that protection was switched off. That includes:

- whether Microsoft Defender or another antivirus is on and up to date, and what it has caught recently
- running programs: who signed them, where they run from, and whether any are pretending to be a Windows program
- programs set to start on their own, including startup entries, services, scheduled tasks and WMI event subscriptions
- network connections from programs that look out of place
- browser extensions installed outside the store, or with very wide access
- changes to the hosts file, proxy settings and trusted root certificates
- drivers that were added recently or aren't signed, and whether driver signature checks have been turned off

Optional online lookups of file hashes will be off unless you turn them on, and Bilby will never upload your files. It doesn't replace your antivirus.

## Promises I'm holding myself to

A check is read-only by default. Any fix is explained first, needs you to confirm, and can be undone. There's no telemetry, and the main screens stay in plain English. I'd rather say "worth a look" than scare someone about a program they've used for years.

I'm writing it in Rust and Tauri v2. The interface is plain HTML and CSS rendered from Rust templates, with a small amount of hand-written JavaScript. There's no npm, no Node and no JavaScript build step. Windows checks will use documented, user-mode APIs. There's no kernel driver. The licence is MIT.

I named it after the bilby, a small Australian marsupial with big ears that digs around at night. It listens carefully and doesn't make a fuss.
