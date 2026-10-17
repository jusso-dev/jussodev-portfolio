---
title: Fold Fortune, a fortune toy that answers when you open the iPhone Duo
date: 2026-10-19
summary: I built an open source fortune toy for the iPhone Duo where you ask on the outer screen and the answer unfolds when you open the phone.
tags: [apple, iphone, swift, apps]
draft: false
---

Fold Fortune is a fortune toy I've built for the iPhone Duo, Apple's foldable iPhone. With the phone closed, you type a question on the outer screen. Open it, and the answer unfolds on the inner screen. On an iPhone without a hinge, you tap to reveal instead.

## The design

The fortune is a two-shell seed pod that opens with the hinge and reveals a glowing answer card. The palette is eucalyptus green, wattle gold, ochre and cream. The answers are my own wording, grouped by tone (yes, maybe, no and playful), and you can change every one of them.

It's an original design. It isn't affiliated with or based on any toy brand or existing fortune toy, so there's no ball, no numbers and no liquid-filled imagery.

## Feel and sound

Opening the phone gives a light haptic tick for every 15 degrees of hinge travel, and a short creak as the pod starts to open. Each tone has its own reveal: a success haptic and chime for yes, a warning for no, and a soft tap for maybe and playful. In tap mode, only the reveal gives feedback.

The sounds are synthesised by a script in the repo. They use an ambient audio session, so the silent switch mutes them, and you can turn them off in the answers sheet.

## Sharing an answer

After a reveal, Share opens the system share sheet with a 1080 by 1350 image of the question, the open pod and the answer. Apps that only take text get plain text instead. Nothing leaves the phone except through the share sheet.

## How it uses the Duo APIs

There's no dedicated outer display API. Apple's guidance is that a closed Duo behaves like a normal compact iPhone, so the app treats a closed hinge as "asking on the outer screen" and uses size classes for layout. Live hinge data from SwiftUI's `onHingeChange` drives the opening and the haptics. That goes through a small `FoldStateService` protocol in a pure Swift package, so the logic is tested on Linux with a scriptable mock and falls back to tap mode on iPhones without a hinge.

It needs iOS 27.1 or later, because that's where the hinge APIs start.

## Try it

The code is MIT licensed at [github.com/jusso-dev/duo-fortune-ball](https://github.com/jusso-dev/duo-fortune-ball). You'll need Xcode 27.1 or later and XcodeGen to build the app, and the iPhone Duo simulator lets you open, close and fold it. For what other builders are doing with the hinge, here are [10 of my favourite Duo builds](/blog/duo-foldable-iphone-app-ideas/).
