---
title: Cloudflare's Void gives vibe-coded apps somewhere to live
date: 2026-10-17
summary: Cloudflare has open-sourced Void, a self-hosted platform for staff-built apps, and it fixes where those apps run but not what they do.
tags: [security, ai, cloudflare, open-source]
draft: false
---

Every organisation I work with has the same problem brewing. Someone in finance or operations sits down with a coding agent, builds a handy little app in an afternoon, and puts it somewhere their colleagues can reach it. Nobody in IT knows it exists. It's shadow IT again, just faster to build.

On Thursday Cloudflare open-sourced Void, and it's aimed squarely at that problem. [The New Stack's write-up by Paul Sawers](https://thenewstack.io/cloudflare-voidzero-void-vibe-coding/) is a good read, and it asks the questions I'd ask. Here's what Void is, and where I think it helps and where it doesn't.

## What Cloudflare released

Void comes from VoidZero, the company Evan You (creator of Vue and Vite) started in 2024. Cloudflare acquired it in June. Void began as a commercial deployment service for Vite apps. After the acquisition the team rebuilt it so companies can run their own copy, and released it as open source.

According to [Cloudflare's announcement](https://blog.cloudflare.com/deploy-with-void/), it has three parts, all shipped in one npm package and Vite plugin:

- **Void SDK** turns a Vite app into a full-stack Cloudflare Workers app, with file-based API routing, database access and types that carry from the database through to the UI. Import `void/db` and you get a local database in development and D1 in production.
- **Void CLI** builds the app, applies migrations, provisions whatever Cloudflare resources the code needs and deploys it with `void deploy`. It can also read logs and roll back a bad deployment.
- **Void Platform** is a shared deployment environment you install into your own Cloudflare account on top of Workers for Platforms. Staff connect to it with the CLI and deploy their apps there.

Cloudflare's own framing is blunt: companies want to encourage vibe-coded internal apps, but they're worried about security and don't want to hand cloud access to every employee.

## What the platform gives an admin

As the admin of a Void Platform you decide who can deploy and who can access each app. You can inspect deployments, read logs, watch resource use and set limits. It plugs into identity providers and Cloudflare Access, so an app can sit behind your corporate login.

Cloudflare runs its own instance that only employees can reach. Michael Dong, a strategy lead there, told The New Stack this prevents "data leaks through vibe coded apps by default".

That's a real improvement on the status quo. A known platform behind SSO, with logs and an inventory of what's deployed, beats a dozen apps scattered across personal cloud accounts and free hosting tiers. If your staff are going to build apps anyway (and they are), giving them one paved road is the sensible move.

## Where I'd be careful

The New Stack article is good on the gaps, and they're the ones I'd raise with a client.

**Access control isn't data control.** Putting an app behind SSO stops outsiders reaching it. It doesn't stop the app pulling sensitive data from somewhere it shouldn't, or sending it somewhere else. A vibe-coded app is code nobody has reviewed, and it runs with whatever bindings and secrets it was given.

**Public can be the default.** According to the article, Void's docs say an admin can set new apps to be public by default, and project owners can make their own apps public later. If you deploy this, check that setting on day one, and decide whether project owners should be allowed to change it.

**There's no review step.** The documented deploy process has no mandatory security review before an app goes live. Asked about it, Christoph Nakazawa from Cloudflare pointed to the access controls and the fact that the platform is open source, so companies can add their own approval steps. Fair enough, but that's work you'll have to build and maintain.

**It's tied to Cloudflare for now.** Self-hosting needs a paid Workers for Platforms plan (from US$25 a month plus usage), R2 storage and a PostgreSQL database you host somewhere else. There's no managed version yet. Cloudflare says it wants community help to support other providers, but hasn't committed to it.

## What I'd do with it

If I were rolling this out, I'd treat Void Platform as the deployment layer and put the controls I care about around it:

1. Keep every app private and behind SSO by default, and lock that setting so a project owner can't flip it alone.
2. Decide which data sources staff apps can bind to, and keep production databases and secrets off that list.
3. Add a lightweight approval step before an app can go wider than its owner's team. Even a short checklist and a second pair of eyes catches a lot.
4. Send the platform's logs to wherever your security team already looks, and review the inventory of deployed apps every quarter. Apps that nobody has touched in months should be switched off.
5. Give each app a named owner, so when it breaks or leaks there's someone to call.

None of that is unique to Void. It's the same thinking you'd apply to any internal platform. What Void changes is that the platform part now costs you an install command instead of a project.

Vibe-coded apps aren't going away, and banning them just pushes them further out of sight. Giving them somewhere visible to live is the right first step. Just don't mistake a login page for a security review.

Sources: [The New Stack](https://thenewstack.io/cloudflare-voidzero-void-vibe-coding/), [Cloudflare blog](https://blog.cloudflare.com/deploy-with-void/), [Void platform prerequisites](https://void.cloud/guide/platform/installation/prerequisites).
