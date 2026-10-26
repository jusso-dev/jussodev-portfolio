---
title: "Token spraying: what Huntress saw in a Microsoft 365 campaign"
date: 2026-10-27
summary: "Huntress tracked attackers replaying stolen Microsoft 365 sign-in tokens to compromise 97 accounts at 79 organisations. Here's what they did after getting in and what I'd check in your own tenant."
tags: ["microsoft-365", "entra", "identity", "mfa", "conditional-access"]
draft: false
---

Huntress has written up a Microsoft 365 campaign it watched between 14 July and 22 September 2026, and The Hacker News covered it on 26 October. The attackers didn't guess passwords. They replayed sign-in tokens they'd already stolen, across a lot of organisations at once. Huntress calls it token spraying.

## The numbers

- More than 200,000 login attempts, traced back to one IP range.
- 497 successful Microsoft 365 sign-ins across the victim organisations.
- 97 accounts compromised at 79 organisations.
- 48 rogue devices registered in Entra.

## How the tokens were stolen

Mostly through an adversary-in-the-middle login page. It sits between the user and the real Microsoft sign-in, passes the password and MFA code through, and keeps the token Microsoft hands back. Huntress also saw tokens come from device code phishing and from social engineering during a real login. The attacker then replayed those tokens from their own machines, often within minutes.

The point is that MFA did its job at sign-in. The token issued afterwards was what got taken.

## What they did once they were in

This is the part I'd pay attention to, because it's all about staying in after the token expires or gets revoked.

- **New MFA methods.** In at least 19 organisations the victim's existing MFA methods were removed and a new one registered within three hours of the first sign-in. In one case an authenticator app called "iPhone 13" was added less than 51 minutes after the session was hijacked.
- **Rogue devices.** At least 48 fake computers were registered in victims' directories. A registered device can be a more durable way to get tokens, and it stays there until someone deletes it.
- **Hidden inbox rules.** Rules with names like "." or "sss" deleted or moved mail mentioning payroll, deposits and bonuses. One mailbox was then used to send spam to hundreds of outside recipients.

## What I'd check

If you look after a Microsoft 365 tenant, these are worth a look this week:

- Recently registered Entra devices you can't account for.
- MFA methods added in the last few months, especially where an old method was removed at the same time.
- Inbox rules with short or meaningless names that delete, mark as read or move mail.
- Whether device code flow is blocked with Conditional Access for anyone who doesn't need it.
- Whether your Conditional Access policies cover all users, all cloud apps and all client app types.

If you find something, Huntress's advice is to revoke sessions, reset the password, and then clean up devices, MFA methods, inbox rules and any new enterprise apps.

The Hacker News coverage: https://thehackernews.com/2026/10/microsoft-365-token-replay-attacks.html
