---
title: "Defender exclusions don't have to be all or nothing"
date: 2026-10-28
summary: "SwiftOnSecurity points out that Microsoft Defender Antivirus can lock exclusions down to a process, path type and scan trigger, and almost nobody does it."
tags: ["security", "microsoft-defender", "endpoint", "windows"]
draft: false
---

## What SwiftOnSecurity said

SwiftOnSecurity posted on X that Microsoft Defender can restrict exclusions so they only apply when certain processes access certain folders, triggered by certain reasons. Their point is that this is almost entirely unused, and that broad exclusions open machines to wide abuse. SwiftOnSecurity is teasing a tool called Swiftfender that would suggest those locked-down restrictions to you and your admins. It isn't out yet, so I can't say anything about how it works.

Source: [SwiftOnSecurity on X](https://x.com/SwiftOnSecurity/status/2115123332685148563)

## The feature SwiftOnSecurity is talking about

Microsoft calls them contextual file and folder exclusions. You take a normal path exclusion and add restrictions to it with this syntax:

`<path>\:{Keyword:value,Keyword:value}`

The restrictions Microsoft documents are:

- **PathType**: `file` or `folder`, so a wildcard path only matches the type of item you meant.
- **ScanType**: `quick` or `full`.
- **ScanTrigger**: `OnDemand` (admin or scheduled scans), `OnAccess` (real-time protection) or `BM` (behaviour monitoring).
- **Process**: the exclusion only applies when a named process touches the file or folder. You can list more than one, and they're matched with OR logic.

Microsoft's own example excludes a Word document only when Word opens it during an on-demand scan:

`C:\documents\design.docx\:{PathType:file,ScanTrigger:OnDemand,Process:"winword.exe"}`

It needs Defender Antivirus platform 4.18.2205.7 and engine 1.1.19300.2 or later, both from May 2022. It's Windows only, and the Windows Security app can't set these, so you'll be using Intune, Group Policy or PowerShell.

## Why this matters

Every exclusion is a trade between performance and protection. A plain folder exclusion like `D:\AppData\` tells Defender to ignore anything dropped there by anything, which is exactly where an attacker would like to stage a payload. Excluding a whole process is worse, because Defender then ignores everything that process does.

Exclusion lists tend to grow one vendor support ticket at a time, and they rarely get tightened afterwards.

## What I'd do this week

- Export your current Defender exclusions from Intune or Group Policy and put them in a list.
- For each one, find out which process actually needed it and why. Vendor docs and the original ticket usually say.
- Rewrite the broad ones as contextual exclusions scoped to that process, the right path type and, where it fits, a single scan trigger.
- Remove anything nobody can explain.
- Keep watching performance after the change. Microsoft notes that other processes like backup or indexing can still trigger scans, and that lots of process restrictions on one device can slow it down.

The reference is Microsoft's page on [contextual file and folder exclusions](https://learn.microsoft.com/en-us/defender-endpoint/configure-contextual-file-folder-exclusions-microsoft-defender-antivirus).
