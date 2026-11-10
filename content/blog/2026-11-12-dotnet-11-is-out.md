---
title: ".NET 11 is out. It's STS, and C# 15 brings union types."
date: 2026-11-12
summary: "Microsoft has released .NET 11 as a two-year Standard Term Support release, with C# 15 as the default language and union types as the headline language change. .NET 10 remains the LTS option."
tags: ["dotnet", "csharp", "development"]
draft: false
---

Microsoft has released [.NET 11](https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/). The announcement landed on 10 November, alongside the opening of .NET Conf.

It's a Standard Term Support release, so you get two years of support under the .NET support policy. Microsoft is clear that STS and Long Term Support releases have the same quality and servicing. The difference is how long they are supported. .NET 10 remains a supported LTS option if that lifecycle fits better.

If you're still on .NET 8 or .NET 9, support for both ended on 10 November 2026, the same day .NET 11 shipped. That's the bit I'd act on first.

## C# 15 and the rest of the language

C# 15 is the default language version for projects targeting .NET 11. The headline addition is union types: a value can be one of a declared set of case types, with conversions from those types and exhaustiveness checking in switch expressions. You can return a `Product` or a `ProductNotFound` as a single `ProductLookup` union, and the compiler checks that a switch covers the cases. Closed hierarchies are the other new modelling tool, for when you own the inheritance relationship and want the same kind of checking.

There are smaller everyday features too: collection expression arguments (so you can pass a comparer into a collection expression), extension indexers, and labelled `break` and `continue`. Microsoft says these don't require a preview language version. The separate memory safety work is still in preview.

F# 11 is in the same release. It improves compiler memory use, reduces allocations in FSharp.Core collection operations, and adds ways to bound concurrent asynchronous work.

## Platform changes I'd actually notice

The SDK turns on a Native AOT CLI host by default, so commands such as help and version queries can run without starting the managed CLI. The MSBuild server also stays warm between invocations by default. Microsoft says that cuts repeated startup work, though I'd still measure it in my own repos.

ASP.NET Core gets asynchronous validation, OpenAPI 3.2 as the default for generated documents, and new Blazor and SignalR behaviour, including a way for a SignalR connection to refresh authentication without reconnecting. Application types, including C# unions, work in JSON request and response bodies for Minimal APIs and MVC, and show up in OpenAPI as an `anyOf` schema. That support is for JSON bodies, not route, query, header or form binding.

.NET MAUI now uses CoreCLR as its default runtime across its platforms. That's a real runtime change, so I'd exercise navigation, custom handlers and trimmed publishing as part of an upgrade. The optional `Microsoft.Maui.Controls.Compatibility` package no longer ships.

The libraries add built-in Zstandard compression, one-shot process APIs, new in-memory stream adapters, LINQ `FullJoin`, and `System.Text.Json` support for C# unions. Entity Framework Core 11 requires .NET 11, and it can now translate `FullJoin` on relational providers that support it.

There's also a lot of AI and agent tooling in this release: Microsoft.Extensions.AI, an MCP server template, Microsoft Agent Framework, and experimental Blazor AI components that speak the Agent User Interaction Protocol. I'd treat those last pieces carefully. The Blazor AI components package is experimental and stays prerelease throughout .NET 11. The AG-UI hosting integration is prerelease too. Runtime Async, which moves asynchronous suspension into the runtime, is still a preview feature you opt into.

NuGet source configuration also gains a minimum package publication age setting, so a team can wait before a newly published version becomes eligible for selection. Microsoft is clear that this is an extra policy control, not a substitute for vulnerability checks or reviewing dependencies.

## What I'd check before upgrading

Installing the new SDK doesn't retarget an existing app. Microsoft's own upgrade advice is the boring, correct sequence: put the .NET 11 SDK on development machines and build agents, update target frameworks and packages, then read the .NET 11 breaking changes, including the updated minimum CPU requirements. After that, run your tests against the publishing mode, container images and hosts you actually use.

If you're choosing between .NET 11 and .NET 10, the question is mostly support length versus new capability. .NET 11 has the new language and platform work. .NET 10 is still the LTS release. Either is a supported landing place if you're leaving .NET 8 or 9.

The official write-up, with the language examples and workload detail, is on the [.NET blog](https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/).
