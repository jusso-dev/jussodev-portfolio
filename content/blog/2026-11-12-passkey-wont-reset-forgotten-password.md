---
title: "A passkey for sign-in won't reset a forgotten password"
date: 2026-11-12
summary: "Microsoft is retiring the SMS and voice options it provides for Entra self-service password reset from February 2027. A passkey for sign-in doesn't automatically count as a recovery method."
tags: ["microsoft", "entra", "identity", "security"]
draft: false
---

[This week's Entra News roundup](https://entra.news/p/entra-news-174-this-week-in-microsoft) flagged a change that's easy to miss if you've already started moving people to passkeys.

Microsoft is retiring the SMS and voice options it provides for Entra self-service password reset. [Message Center item MC1536049](https://mc.merill.net/message/MC1536049) says that for most users, this starts on 1 February 2027, once the related sign-in retirement rollout reaches your tenant, and you then have 50 days. Global Administrators and external users follow on 1 July 2027. After the transition, Microsoft-provided SMS and voice can no longer be used to reset a forgotten password.

The catch, and Microsoft is explicit about this, is that a passkey or Windows Hello doesn't automatically count as an SSPR recovery method. Someone can sign in just fine and still have no way to reset a password they've forgotten. Microsoft also says it won't automatically change your SSPR policy.

## What to do before the transition ends

Identify who still relies on Microsoft-provided SMS or voice for password reset, even if they already have another way to sign in. Then make sure those people have enough eligible recovery methods under your current SSPR policy.

If you still need a phone-based recovery option, you have to bring your own telephony provider through Microsoft Security Store. Microsoft's [retirement guidance](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sms-voice-retirement) and [FAQ](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sms-voice-retirement-faq) cover the sign-in side of the same retirement, and note that native SMS and voice are going away for SSPR as well. Microsoft says it is planning a way for people who sign in without a password to change that password, with more details to come.

The February date is only a few months away. This is the week to check the queue, not the week after the rollout hits your tenant.
