---
title: "Currawong: planning a memory-safe email gateway for Australian organisations"
date: 2026-10-16
summary: An open-source email security gateway in Rust that will sit in front of Microsoft 365, Google Workspace or Exchange and keep mail data in Australia. It's a skeleton for now.
tags: [rust, email, security, open-source]
draft: false
---

Currawong is an open-source email security gateway I'm writing in Rust for Australian organisations. It'll sit in front of your mailboxes, whether that's Microsoft 365, Google Workspace or on-premises Exchange, check every message going in and out, and keep your data in Australia. Think FortiMail, Proofpoint or Mimecast, but self-hostable, memory safe and aware of Australian rules.

I'll be upfront. It's an M0 skeleton. Nothing in the repo filters mail yet. This post is about what I'm building and the decisions I've already made, not a release.

## Why I'm building it

Mail gateways parse hostile input, at volume, while facing the internet. That's exactly where memory safety pays for itself, and most of the incumbents weren't written with it.

Australian buyers also have needs the global vendors treat as an afterthought. Data residency. ACSC threat feeds. Enforcing PSPF protective markings like OFFICIAL: Sensitive and PROTECTED. Catching TFNs and Medicare numbers in outbound mail. And MSPs want proper multi-tenancy without standing up an appliance per customer.

## How it'll work

The pipeline is simple to describe. An SMTP listener accepts the message and writes it to a durable spool. Pipeline workers then run sender authentication, scanning, data loss checks and policy. The result is deliver, quarantine or reject, and every decision becomes an event you can send to a SIEM.

A few decisions are already written up as ADRs.

**The spool is the filesystem.** Each message is two files, the raw bytes and a JSON envelope, in one directory per state. A message is written to a temp file, fsynced, renamed into place, and the directory is fsynced before the server replies 250. State changes are atomic renames. Retries back off from five minutes up to hourly for five days, then bounce.

**Parsing runs in separate processes.** MIME parsing and extraction happen in child processes, not threads. On Linux each worker gets a seccomp filter that blocks network access, plus memory and CPU limits. If a worker crashes, times out or hits a limit, the message is quarantined by default. ClamAV runs as its own `clamd` process.

**Storage stays boring.** SQLite for a single node, PostgreSQL for clusters and MSPs, using the same migrations. Quarantine blobs go on disk or in S3-compatible storage restricted to the Sydney and Melbourne regions unless you override it.

**Mail handling uses Stalwart's crates.** `mail-parser`, `mail-auth` and `mail-send`, with my own SMTP state machine on tokio so I control the limits and hooks at every stage.

The planned feature list is long. STARTTLS, MTA-STS, DANE, SPF, DKIM, DMARC and ARC. ClamAV and YARA. URL rewriting with time-of-click checks, lookalike domains, HTML smuggling and QR code phishing. Business email compromise checks for display name spoofing and payment change requests. Outbound detection of TFNs, Medicare numbers, ABNs, ACNs, driver's licences and card numbers. Quarantine digests, a per-user policy engine, an admin UI and API with RBAC, and post-delivery removal through Graph, the Gmail API or EWS.

## Roadmap

- **M0:** workspace, config, logging, CI, spool format. That's where it is now.
- **M1:** a working relay with sender authentication and ClamAV.
- **M2:** spam, URL protection, BEC, DLP, quarantine, admin UI, multi-tenancy and mailbox APIs.
- **M3:** an optional LLM classifier for BEC, sandbox detonation, residency attestation and appliance images.

## Follow along

The workspace builds today:

```sh
cargo check --workspace
cargo test --workspace
```

It won't do anything useful yet. The roadmap is tracked in [issue #1](https://github.com/jusso-dev/currawong/issues/1). The code is MIT licensed at [github.com/jusso-dev/currawong](https://github.com/jusso-dev/currawong).
