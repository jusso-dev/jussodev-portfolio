---
title: "I added an ASD Essential Eight and ISM suite to Maester"
date: 2026-11-11
summary: "Maester is open-source security testing for Microsoft 365. I added 14 checks against the ASD Essential Eight and the ISM, and they're in the 3.0 preview."
tags: ["maester", "microsoft-365", "security", "essential-eight", "asd"]
draft: false
---

[Maester](https://maester.dev/) is an open-source PowerShell framework that tests your Microsoft 365 tenant against CIS, CISA, Microsoft's Zero Trust Assessment and more, then writes a report you can act on. It runs on Windows, macOS and Linux, and nothing leaves your tenant.

I added the ASD Essential Eight and ISM suite, which is in the 3.0 preview. It is 14 checks, each named for the ISM control it implements, plus the framework catalogues that map those controls to Essential Eight maturity levels. A few of the checks, such as the account lockout threshold, cover ISM controls outside the Essential Eight.

## What's in the suite

The Entra ID checks cover MFA for human users, phishing-resistant MFA, just-in-time privileged role activation, disabling privileged access after 45 days of inactivity, keeping privileged accounts off mailbox-providing plans unless they're explicitly authorised, and a lockout threshold of five failed attempts or fewer.

The Intune checks cover blocking Office macros from the internet, enabling macro antivirus scanning, attack surface reduction rules that stop Office creating child processes, creating executable content, injecting code into other processes, or making Win32 API calls from macros, disabling or removing Internet Explorer 11, and a one-month deadline for workstation quality updates.

## How to run it

You can run just that suite with `Invoke-Maester -Suite asd`, or include it in a full run. Use the 3.0 preview for this. The suite is not in the 2.3.0 stable release.

The checks are documented at [maester.dev/docs/tests/asd](https://maester.dev/docs/tests/asd/).
