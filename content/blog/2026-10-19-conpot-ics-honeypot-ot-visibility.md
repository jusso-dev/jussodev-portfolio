---
title: Conpot 1.0 and cheap OT visibility for Australian critical infrastructure
date: 2026-10-19
summary: Conpot, the open source ICS/SCADA honeypot, shipped 1.0.0 after eight years on 0.6.0. Here's what it emulates now and how I'd use it as a low-cost detection aid for OT and SOCI-regulated teams.
tags: [security, ot, ics, honeypot, australia]
draft: false
---

It's easy for an OT team to know its PLCs well and still know very little about who's probing its industrial ports. [Conpot](https://github.com/mushorg/conpot) is one cheap way to start finding out.

Conpot is an open source ICS/SCADA honeypot from the mushorg project, and its Docker image is published as `honeynet/conpot` under the Honeynet Project. It isn't my project. The README describes its goal as collecting intelligence about the motives and methods of adversaries targeting industrial control systems. In practice, it pretends to be industrial gear and logs what people try to do to it.

## It's not as old as it looked

For a long time Conpot looked like a project that had stopped. The last release was 0.6.0 in August 2018, the Python 3 beta.

That changed on 20 September 2026 with 1.0.0. The release notes call it a platform rewrite rather than a point release on the old code:

- Protocol servers moved from gevent to asyncio, on current Python.
- Old libraries were replaced rather than patched, for example `cryptography` instead of PyCrypto, plus pymodbus, bacpypes3 and aiohttp.
- Templates moved from XML to TOML, with a `template.toml` per template and a TOML file per protocol.
- Attack logging is structured, with a versioned event schema, and can go to JSON, SQLite, syslog, HPFeeds or TAXII.
- CI moved to GitHub Actions.

It's kept moving since. The repo has had more than 80 commits in 2026, the most recent on 12 October, and it's licensed GPL-2.0.

## What it emulates

The 1.0.0 release ships servers for:

- Modbus
- Siemens S7 (s7comm)
- BACnet
- IEC 60870-5-104
- EtherNet/IP and CIP
- Kamstrup smart meter and management protocols
- Guardian AST tank gauges
- SNMP, HTTP, FTP, TFTP and IPMI

Since 1.0.0, the main branch has added DNP3, OPC UA, ICCP, R-GOOSE, KNXnet/IP, HART-IP and Beckhoff ADS, plus a standalone EtherNet/IP template. Those aren't in a tagged release yet, so if you want them you're running from `main`.

For Australian operators, DNP3 and IEC 104 matter because they show up in energy and water SCADA, and ICCP is used between control centres. Having decoys that speak those protocols is a lot more convincing than a generic open port.

## Why I think it fits SOCI-regulated teams

The SOCI Act asks responsible entities for critical infrastructure assets to manage risk across cyber, physical, personnel and supply chain hazards. Nothing in it says "run a honeypot", and I'm not suggesting it does. But a lot of OT environments have thin detection, and a honeypot is one of the cheapest ways to add some.

- **It's cheap to try.** The docs have a Docker quick start, and the templates let you shape the decoy to look like the kind of kit you actually run.
- **The signal is clean.** A decoy placed where nothing legitimate should talk to it means any connection is worth looking at. That's useful inside an OT network, where a scan from an engineering workstation or a jump host is a real lead.
- **It fits what you already run.** Structured JSON or syslog output can go into your existing SIEM, so it isn't another console nobody watches.

On the internet side, a decoy shows you who's scanning for industrial protocols and what they try. That's context rather than an alarm, but it's handy when you're explaining OT exposure to people who think nobody would bother.

## Cautions before you deploy

- **1.0.0 is a breaking upgrade.** If you have an old install, templates need converting to TOML, log consumers need to handle the new schema, and the default SNMP port is now 16100. MAC address spoofing and custom MIB compilation were removed.
- **Be careful with proxy mode.** It can bridge to a real backend device. The release notes are blunt that misconfiguration exposes live systems.
- **Check the Docker image tag.** The quick start pulls `honeynet/conpot`. The 1.0.0 release notes say to treat the current Dockerfile and docs as the source of truth and that older compose snippets will be wrong, so build from source if you're unsure what the image contains.
- **It's a detection aid, not a control.** It doesn't replace segmentation, asset inventory or monitoring of the real network. Put it somewhere that's isolated from production, and talk to whoever owns the OT network before you do.

## Where to start

The documentation is at [conpot.readthedocs.io](https://conpot.readthedocs.io/), and the quick install uses Docker. I'd start with one decoy inside the OT network that looks like the PLCs you already run, send its logs to your SIEM and see what turns up over a month.
