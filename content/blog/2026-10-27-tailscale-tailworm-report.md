---
title: "Tailworm: unpatched Tailscale findings and what to tighten now"
date: 2026-10-27
summary: "A researcher has published 11 lab findings against Tailscale and headscale without coordinated disclosure. They're unconfirmed and unpatched, but the main one is about lateral movement, and there are sensible things to tighten in the meantime."
tags: ["tailscale", "networking", "zero-trust", "ssh", "disclosure"]
draft: false
---

On 25 October Erica Windisch of Cyberdione Labs published a report called Tailworm. It lists 11 findings against Tailscale 1.104.2 and headscale 0.29.5, the self-hosted control server some people run instead of Tailscale's hosted service. She skipped coordinated disclosure and published before any fix existed.

A few things to keep in mind before reading too much into it. These are the researcher's lab results from a three-day test. Nobody else has publicly reproduced them, the proof-of-concept code isn't public, and as of 26 October Tailscale hadn't published a bulletin or a fixed release. Brandefense notes there are new commits in Tailscale's public code in the same areas, but none of them are in a release and Tailscale hasn't linked them to the report.

## The headline finding

The one getting the most attention is in Tailscale SSH. The embedded SSH server runs as root, and according to the report, Unix socket forwarding (`ssh -L` and `ssh -R`) does its path checks and file operations as root. Races and a missing privilege drop let an ordinary session reach or replace root-owned sockets. In the lab that meant root on the target server, and in one case a rogue node joining the network.

It's worth being clear about what an attacker needs first: control of one device that's already approved on your tailnet, plus an SSH rule that lets it connect to the target with forwarding allowed. That makes it a lateral movement problem, not something someone on the internet can do to you cold.

## The rest of the report

- **App connectors (conn25, experimental).** A device with the connector capability could send traffic to destinations nobody approved, including cloud metadata services and Kubernetes cluster services. Windisch told The Hacker News this one may matter more to some organisations than the SSH issue.
- **headscale.** Unauthenticated requests could exhaust memory and evict pending device approvals.
- **DERP client.** A hostile relay could make a client read a very large response and run out of memory.
- **tailscale serve.** Some configurations could expose the node's local API to a remote peer, and a race could carry one mount's permissions over to another.

## What I'd do now

You don't need to rip Tailscale out over this. You can tighten a few things while you wait for Tailscale's response:

- Review your SSH rules. Grant SSH between specific pairs of devices rather than broad groups, and only allow forwarding where someone actually needs it.
- If you're trialling app connectors, limit who has that capability.
- If you run headscale, don't leave it more exposed to the internet than it needs to be, and cap its memory.
- Watch for a Tailscale bulletin and update when a fixed release ships.

The bigger lesson for me is the same one that applies to any mesh VPN. One approved device is a foothold. Your access rules decide how far it can go.

The report: https://tailworm.com/

The Hacker News coverage: https://thehackernews.com/2026/10/unpatched-tailscale-ssh-flaws-could-let.html
