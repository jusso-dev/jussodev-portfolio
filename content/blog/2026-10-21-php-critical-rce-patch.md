---
title: "Two critical PHP RCE bugs land overnight. Plan your patch window now"
date: 2026-10-21
summary: "PHP ships emergency fixes for CVE-2026-109618 and CVE-2026-109619 at 14:00 UTC on 21 October, after details leaked early."
tags: ["security", "php", "patching"]
draft: false
---

The PHP security team has given advance notice of an emergency security release on Wednesday 21 October at 14:00 UTC. That's 1am Thursday here in Canberra.

## Update, 22 October: the fixes are out

PHP has released 8.5.12, 8.4.27, 8.3.36 and 8.2.35. I've written up the fixed versions and what to do next in [The PHP RCE fixes are out](https://justin.middler.io/blog/php-rce-fixes-released/).

## Update, 21 October, 10pm AEDT

The picture on exploitation has moved since this morning, and the reports don't agree yet.

- [Sansec](https://sansec.io/research/php2shell) says Cloudflare reported early attacks on PHP sites at 07:43 UTC on 21 October. [Aikido](https://www.aikido.dev/blog/critical-vulnerabilities-in-php-php2shell) also says exploitation has been reported in the wild.
- The ACSC's alert, [Critical vulnerabilities in PHP](https://www.cyber.gov.au/alert/critical-vulnerabilities-in-php), says all versions from PHP 5 on may be affected and that it isn't aware of active exploitation.
- Unverified proof-of-concept code for CVE-2026-109618 has appeared on GitHub. One repo only reaches the vulnerable code. Another claims code execution, but only with a non-default session config.
- Aikido says the config workarounds going around don't protect you.

My advice hasn't changed, it's just more urgent. If you can take internet-facing PHP offline until the fix lands, do it. Patch as soon as it ships, then check for signs of compromise.

## What we know

It fixes two critical vulnerabilities, both rated 9.2 under CVSS v4.0. According to [BleepingComputer](https://www.bleepingcomputer.com/news/security/php-warns-admins-of-two-critical-flaws-emergency-patches-coming-tomorrow/), they're tracked as CVE-2026-109618 and CVE-2026-109619.

watchTowr told BleepingComputer they're remote code execution bugs believed to affect PHP 5, 6, 7 and 8. It says it has reproduced one of them.

Details leaked before the embargo lifted. PHP says it may release early if that leak turns into public detail or active exploitation.

## What we don't know yet

PHP hasn't published the affected versions, the fixed versions, or how the bugs are triggered. All of that is due with the release.

## What I'd do today

- Find every place you run PHP, including old boxes and the containers nobody owns.
- Line up a patch window for Thursday morning so you're not scrambling.
- Check how fast your hosting provider or distro usually ships PHP updates.
- If you've got internet-facing PHP on an end-of-life version, now's the time to work out a plan for it.

A leaked embargo shortens the gap between the fix and the first exploit. I'd treat this one as urgent.
