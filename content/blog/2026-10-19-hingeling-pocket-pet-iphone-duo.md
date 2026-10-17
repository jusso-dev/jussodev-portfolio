---
title: Hingeling, a pixel-art pocket pet that lives in the iPhone Duo's fold
date: 2026-10-19
summary: I'm building Hingeling, an open source pocket pet for the iPhone Duo that naps when you close the phone and puts on a show when you half fold it.
tags: [apple, iphone, swift, apps]
draft: false
---

Hingeling is a small pixel-art pocket pet I'm building for the iPhone Duo, Apple's foldable iPhone. It lives in the fold, so how you hold the phone decides what the pet is doing.

## What the fold does

- **Closed:** a closed Duo acts like a compact iPhone, so you get a quick glance at your pet and its mood. Closing the phone tucks it in for a nap.
- **Open:** the inner screen becomes the pet's home, where you feed it, clean up after it and play with it.
- **Half folded:** the phone turns into a little stage and the pet puts on a show.
- **Any other iPhone:** you get the same home screen, with a bedtime button in place of the fold.

The hinge picks the scene (glance, home or stage), and the layout inside each scene uses standard SwiftUI containers. That follows Apple's advice to use hinge data for live effects and its layout APIs for layout.

## Reminders that leave you alone

Pocket pets can turn into nag machines, so I kept this one quiet. It only uses local notifications, with no server. It asks for permission after your first feed, never at launch, and plans at most two reminders at a time, for hunger and a wash. Feeding cancels a pending hunger reminder. Quiet hours run from 9pm to 8am, and while the pet sleeps there are no reminders unless you turn on a good morning note.

## Checking Apple's APIs

The Duo APIs are new, so the README marks every Apple name I use as verified, with a link to Apple's docs or tech talk code, or as assumed and needing a check in Xcode before release. The fold handling sits behind a `FoldStateService` protocol in a core Swift package, which means the pet logic is tested on Linux with a mock, and a normal iPhone gets a clean fallback.

## The name

The repo is called duo-pocket-pet, but the app is Hingeling. When I searched on 17 October, "PocketPet" was already taken by a virtual companion app and a pet care app, and "Duo-Pet" was an existing iOS app. Hingeling turned up nothing, though it still needs a proper trademark search before it goes to the App Store.

## Where it's at

It's early development, tracked as GitHub issues under two milestones, MVP and Later. The creature, art, animations and game rules are all original, and it isn't affiliated with any toy, game or virtual pet brand, or with Apple.

The code is MIT licensed at [github.com/jusso-dev/duo-pocket-pet](https://github.com/jusso-dev/duo-pocket-pet). For more ideas from other builders, here are [10 of my favourite Duo builds](/blog/duo-foldable-iphone-app-ideas/).
