---
title: "Epic v Apple: what the Federal Court's orders mean for iPhones in Australia"
date: 2026-10-22
summary: "Justice Beach has made the relief orders in Epic v Apple. From 1 March 2027 Apple has to allow other app stores, direct downloads and other payment methods for Australian users, and Fortnite can come back now."
tags: ["apple", "ios", "competition", "security", "australia"]
draft: false
---

Justice Beach handed down the relief orders in Epic Games Inc v Apple Inc (No 2) [2026] FCA 1552 today. Last year he found Apple had misused its market power. Today's judgment is about what Apple actually has to do about it, and it's going to change how iPhones work in Australia.

I've read through the orders. Here's my summary of what they say, and what I think of them from a security point of view.

## The declaration

The court declared that since 6 November 2017 Apple has contravened s 46(1) of the Competition and Consumer Act 2010. It found Apple had substantial power in two markets: iOS app distribution and iOS in-app payments.

On distribution, Apple locked developers into the App Store through its non-negotiable developer agreement and review guidelines, and backed that up with OS-level restrictions that stop apps running unless they came from the App Store or Apple installed them. On payments, Apple forced developers to use its in-app purchase system for digital content and banned them from pointing users to other ways to pay.

The declaration also records that Apple enforced those terms against Epic by refusing Epic Direct Pay, pulling Fortnite on 13 August 2020 and terminating Epic's developer account on 28 August 2020.

## Who the orders cover

The declaration isn't limited by geography, but the injunctions are. They apply to the Australian App Store storefront and to users with an Australian Apple Account, meaning an account with its country or region set to Australia.

Developers can be anywhere in the world, as long as they're in Apple's Developer Program. Alternative payment providers can be anywhere too. Epic wanted a much wider geographic reach, and that's one of the points it lost.

## Other app stores and direct downloads

Apple has to let Australian users find, install and update iOS apps from outside the App Store, including through direct downloads and alternative app stores. The condition is that those apps have gone through an automated scan for genuine security or privacy reasons and been notarised by Apple or a suitably qualified third party.

Developers have to get the tools and APIs they need to build and distribute these apps, including apps that act as app stores, on substantially the same terms as App Store developers. Apple also can't:

- charge fees or set conditions for using these alternative channels
- stop developers offering cheaper prices outside the App Store
- make developers sell content as an in-app purchase just because they sell it elsewhere
- block pre-installed third-party apps, including other app stores
- penalise or discriminate against developers for distributing outside the App Store

## Payments and anti-steering

Apple can't make App Store developers use its in-app purchase system for digital content, and it can't stop them linking or directing users to another way to pay. Developers can charge less outside Apple's system, and they don't have to report those transactions to Apple or give it audit rights.

For apps outside the App Store, Apple can't charge any fee on those payments. For App Store apps, the fee on alternative payments for digital content is capped at what Apple charges for physical goods and services paid for outside its system, plus any extra costs Apple genuinely and reasonably incurs. Apple also can't add friction to alternative payments beyond what users already see when buying physical goods in an app.

## When Apple can remove a sideloaded app

This was the part I was most interested in. Apple can only remove or disable an app installed from outside the App Store if:

- it contains illicit, objectionable or harmful content
- it's malware or malicious code posing a genuine security risk that either needs urgent removal without notice, or hasn't been fixed after Apple gave the developer reasonable notice of the risk
- the Online Safety Act 2021 requires it

Apple also can't put friction in front of installing or running these apps if that friction is out of proportion to the actual security risk.

## Security requirements on other payment methods

Apple can still put security requirements on payment methods other than its own, but they have to be necessary and proportionate to the extra risk. Before it imposes them, it has to give affected developers reasonable written notice that explains the risk, what's causing it and why the requirements are needed. It can publish that on its website when contacting developers directly isn't practical.

## When it all starts

The orders on distribution, payments and non-discrimination start at noon on 1 March 2027, Melbourne time. Apple gets one chance to push that back. If it applies between 1 and 15 February 2027 with its evidence, and the court agrees, the start date moves to noon on 3 May 2027.

The declaration and the Fortnite order apply straight away. Once Epic applies in writing, Apple has to readmit Fortnite and Epic's other iOS apps to the Australian App Store, as long as Epic follows Apple's rules where they're consistent with the orders.

The injunctions have no sunset date. Apple can apply to vary them later if circumstances change materially. The judge also flagged that he'll need to talk to the parties about whether any stay is needed if there's an appeal.

## What Epic didn't get

Epic asked the court to declare the offending contract terms void under s 87. The judge refused. He hadn't found that Epic suffered loss from the contraventions, US courts had already found Apple's termination of Epic's account was lawful, and the proposed order would have reached future contracts anywhere in the world.

Because of that and the narrower geographic scope, Apple has to pay 85% of Epic's costs up to and including the liability trial, rather than all of them. Costs of the relief hearing are reserved for now.

## My take as a security person

I'll admit I expected a ruling like this to treat Apple's security arguments as cover. It didn't. The liability findings accepted that a centralised system has real security benefits and that Apple's security is part of what makes its product good. The court just found that those benefits don't excuse shutting out competitors, and the orders reflect that balance.

Apple keeps a lot of levers. There's mandatory scanning and notarisation, removal for genuine malware, removal for Online Safety Act obligations, and room for proportionate payment security. What it loses is the ability to use security as a blanket reason for friction.

For those of us who look after fleets of iPhones, that's the bit to watch. Sideloading in Australia is going to be real from March or May next year, so it's worth checking now what your MDM can restrict on managed devices. The bigger question is how Apple ends up defining "genuine" and "proportionate" in practice, and I suspect that's where the next round of arguments will be.

You can read the full judgment on the [Federal Court website](https://www.judgments.fedcourt.gov.au/judgments/Judgments/fca/single/2026/2026fca1552).
