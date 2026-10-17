---
title: Proa renders HTML for people and Markdown for agents from one Rust component
date: 2026-10-19
summary: A look at Proa, an Apache 2.0 Rust web framework from Proa Labs with typed components, streaming SSR, small JavaScript islands and a Markdown render target.
tags: [rust, web, ai-agents]
draft: false
---

[Proa](https://proa.so) is a Rust web framework from Proa Labs. The part that caught my eye is the programming model. You write one typed component, and it can render to HTML for a browser, Markdown for an agent, or any other target you write a renderer for.

Agents now read a lot of the web. Most sites serve them the same HTML they serve people and leave the agent, or a proxy like Cloudflare's Markdown conversion, to strip it back down. Proa lets the same component produce both, from the same data, so the Markdown version isn't an afterthought scraped off the page.

## One component, several outputs

A component implements `WebRenderSync` with the `html_sync!` macro for HTML, and `MdRenderSync` with `md_sync!` for Markdown. When a component has to await data, it switches to the async versions, `WebRender` with `html!` and `MdRender` with `md!`. The macros check templates at compile time, merge adjacent static markup and escape dynamic values.

Proa's README describes the bigger goal as one compiled interface layer that gives each caller the right representation: complete HTML for people, targeted behaviour for browsers and dense machine-readable output for agents. Other targets, such as JSON or a native rendering backend, can add their own render implementations.

## The framework around it

It isn't only a templating engine. Rendering shares a typed `WebContext` with the rest of the framework:

- streaming server-side rendering, either in document order or out of order with Suspense boundaries, so slow data doesn't hold up the whole page
- request-scoped data, response metadata, route state and loader caching through a DataLoader-backed context
- layouts, routing, metadata, static assets, forms, mutations and progressive navigation in the same Rust component model

## JavaScript only where it's needed

Pages stay as server-rendered HTML. When a control needs to be interactive, you make it an RSJS island with typed signals and event handlers written in Rust. The compiler turns just that behaviour into a small vanilla JavaScript module, and Proa says the shared runtime is about 1.3 KB gzipped. The browser starts from the HTML the server already sent and doesn't re-run the component tree to hydrate it.

## Moving one route at a time

You don't have to rewrite an app to try it. Proa runs natively on Axum, or you can call the render core over FFI from Node, Go, Python, Ruby or Java. The suggested path is to proxy one route to Proa, leave the rest on Next.js or Rails, and compare latency and cost in production.

## Security and accessibility defaults

Output is auto-escaped, and cross-origin request protection, security headers and fixed-upstream proxying are part of the framework. WCAG and WAI-ARIA checks run during `cargo build`, so common markup mistakes fail the build rather than reaching production.

## Proa UI

Proa UI is a shadcn-style component library. The source lives in your repo as typed Rust, so you theme and change it like your own code. There are 58 components with live examples, split into free ones (accordion, table, button, field, card and more) and Pro ones (calendar, chart, input OTP, chat and code block). The accordion has a CSS-only build that ships no JavaScript at all.

## The speed claim

Proa's site quotes a render p50 of 23.5 µs against 5.56 ms for React's `renderToString`, which it calls 237 times faster, measured as warm production p50s on an 8 vCPU AMD EPYC-Milan VPS. Those are Proa's numbers. I haven't run them, but the benchmark code is public in the Proa-Labs/proa-benchmarks repo if you want to check.

## Should you look at it

It's young. The repo was created in September, and the latest stable CLI is v0.1.3. The framework is Apache 2.0 licensed, and the Pro components in Proa UI are a paid tier on top. If you already run Rust services, or you want the pages you serve to agents to be as deliberate as the ones you serve people, it's worth an afternoon.

To try it:

```bash
cargo install proa-cli --locked
```

Then follow the quickstart at [proa.so/docs](https://proa.so/docs). The source is at [github.com/Proa-Labs/proa](https://github.com/Proa-Labs/proa).
