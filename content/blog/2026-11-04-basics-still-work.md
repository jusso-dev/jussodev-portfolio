---
title: "The basics still work, the urgency changed"
date: 2026-11-04
summary: "Jack Cable's practical guide to security in November 2026 makes a point I agree with. The last few weeks of incidents were mostly stopped or blunted by boring controls, and most of them are cheap."
tags: ["security", "identity", "supply-chain", "developer-security"]
draft: false
---

Jack Cable has written [A Practical Guide to Security in November 2026](https://x.com/jackhcable/status/2117731409246978489), and it's worth reading in full. It walks through what's happened over the last few weeks and lands on a point I've been making to clients for a while. The basics still work. What's changed is how quickly you need to get them done.

## What happened

Binance lost $6.34 billion. The way in wasn't exotic. A fake job interview and a tampered installer got onto engineers' laptops, and a deployment token sitting on one of those laptops was enough to reach wallet signing. Around the same time, a tampered Claude Code extension for Cursor tried to backdoor developer machines through auto-update. It had fewer than 5,000 installs, but auto-update meant those installs didn't need anyone to click anything.

Neither of these needed clever AI. An attacker doesn't need AI to use a stolen credential or an unpatched server. AI just makes the work faster and cheaper, so the gap between a weakness existing and someone using it keeps shrinking.

## Identity first

- Turn on phishing-resistant MFA for your identity provider, cloud accounts, GitHub and email.
- Only allow sign-in from managed devices, so a stolen password or session from a personal laptop doesn't get far.
- Use a password manager across the team.

If you only do one thing this week, do this. Most of the incidents I see still start with an identity.

## Protect the machines people work on

- Run an ad blocker. The Binance chain reportedly started from a search for an AI coding tool, and search ads are an easy place to plant a fake download.
- Put devices under MDM and run EDR on them.
- Keep an allowlist of browser and editor extensions, and add a delay on auto-updates so a bad release has time to get caught before it reaches you.

## Get secrets off laptops

- Scan developer machines for secrets. TruffleHog is a good place to start.
- Move what you find into a secrets manager and rotate it.
- Where you can, use cloud or remote dev environments so long-lived credentials don't live on a laptop at all.

A deployment token on a laptop is the detail from the Binance story that stuck with me. That's a very common setup, and it's the kind of thing you can fix in an afternoon.

## Slow down your dependencies

- Set a minimum package age of 7 days for npm and PyPI installs.
- Pin and commit your lockfiles.

Most malicious package releases get spotted and pulled within days. A one week delay costs you almost nothing and takes you out of the blast radius for a lot of them.

## Logs you can trust

- Send logs somewhere an attacker with production access can't delete them.
- Alert on new admins, MFA changes and large data exports.

When something does go wrong, these are what tell you how far it went.

## Most of this is cheap

What I like about Jack's list is that very little of it needs a new product or a big budget. Most of it is configuration you already have access to. Phishing-resistant MFA, conditional access, an extension allowlist, a package age setting and a log destination you don't let prod touch. None of that is glamorous, and that's the point. Pick two items this week and two next week, and you'll be in a much better spot than you were a month ago.
