---
title: Duo Sketch, a two-dial drawing toy for the iPhone Duo
date: 2026-10-19
summary: I built an open source two-dial drawing toy where folding the iPhone Duo shut and opening it again shakes the drawing clean.
tags: [apple, iphone, swift, apps]
draft: false
---

Duo Sketch is a drawing toy I've built for the iPhone Duo, Apple's foldable iPhone, which goes on sale on 23 October. There are two dials. Turn the left one to draw across, turn the right one to draw up and down, and turn both together for diagonals and curves.

Yes, it turns a $4,699 AUD phone (the 1TB model, at Apple's Australian price) into an Etch A Sketch. I think that's a totally sensible use of it.

The fun part is clearing it. Fold the phone shut, open it again, and the board gives a little shake and the drawing is gone. If you didn't mean to, Undo clear in the toolbar brings it back for a few seconds.

## How it uses the fold

| Pose | What happens |
| --- | --- |
| Open | The full board on the inner screen, with a large canvas and both dials along the bottom |
| Half open (20 to 160 degrees) | Easel mode: the canvas sits on the top half and the dials on the bottom half, like a little desk toy |
| Closed | A compact board on the outer screen, and your drawing carries over |
| Closed for 0.4 seconds, then opened to 20 degrees or more | The board shakes and clears |

A hinge settling by a degree or two after you close it doesn't count as opening, so it won't clear by accident.

Hinge data comes from Apple's SwiftUI hinge API in iOS 27.1 (`onHingeChange`, `DeviceHingeContext` and `DeviceHinge`), wrapped behind my own `FoldStateService` protocol. Apple's advice is to use hinge data for live effects and size classes for layout, so that's what I did. The hinge only drives the clear gesture and easel mode.

## On every other iPhone

It runs on any iPhone with iOS 18 or later. With no hinge, you shake the phone instead. Each shake fades the drawing a bit more, and three good shakes clear it. There's also a Clear button in the toolbar for accessibility, with the same few seconds of undo.

## How it's built

The drawing model, dial mapping, clear state machine and fold logic live in a pure Swift package, `SketchCore`, which builds and tests on Linux. The SwiftUI app sits on top, and CI builds it and runs its tests on a hosted macOS runner with an iOS 27 simulator.

## Where it's at

It's early. CI builds and tests the app on a simulator, but the phone isn't out yet, so I haven't tried it on a real Duo.

The design is my own. It isn't affiliated with or based on any toy brand, and the name, frame, colours, dials and artwork were all made for this project.

The code is MIT licensed at [github.com/jusso-dev/duo-sketch](https://github.com/jusso-dev/duo-sketch). You'll need Xcode 27.1 or later for the app and the Duo simulator. If you'd like to see what other builders are doing with the hinge, I rounded up [10 of my favourite Duo builds](/blog/duo-foldable-iphone-app-ideas/).
