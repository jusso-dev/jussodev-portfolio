---
title: "Qwen4-Max is in a time-boxed preview. It isn't a general release."
date: 2026-11-12
summary: "Alibaba's Qwen team has put Qwen4-Max into preview on its Token Plan. The official docs say pay-as-you-go isn't available, and the preview model will be retired after 25 November."
tags: ["ai", "qwen", "developers"]
draft: false
---

Alibaba's Qwen team has announced [Qwen4](https://x.com/Alibaba_Qwen/status/2120335993643684315), and put [Qwen4-Max](https://docs.qwencloud.com/developer-guides/getting-started/latest-model) into preview. The official announcement landed on 11 November. The useful part is how limited this access is, not the marketing around it.

## What's actually available

The preview model is `qwen4-max-preview`. According to [Qwen Cloud's latest-model page](https://docs.qwencloud.com/developer-guides/getting-started/latest-model), it is available through the [Token Plan](https://www.qwencloud.com/pricing/token-plan) only. Pay-as-you-go access is not supported.

The preview window is official and short. It runs from 10:00 on 11 November 2026 to 24:00 on 25 November 2026, China standard time (UTC+8). The docs say no changes will be made during that period, and that the model will be retired after the preview ends.

The Qwen team also says you can get early access on QwenWork, Qoder, the Qwen app and QwenStudio.

## What the docs claim

Qwen Cloud describes Qwen4-Max-Preview as the next flagship multimodal model in the Qwen family, with text generation, image and video understanding, and reasoning. It lists coding, office work, front-end design and agent tasks as the intended uses, and says the model supports web search, tool calling and structured outputs. The API is compatible with the OpenAI and Anthropic interfaces.

The published limits are a 1 million token context window, and a maximum output of 393,216 tokens, shared between the model's thinking step and the final answer. Thinking is on by default. I haven't independently verified any of that, and the announcement does not include a public benchmark table.

## What I'd check first

Treat this as a preview you can try, not as a model you should hang a production workflow on. The retirement date is in the official docs, two weeks after the preview opened. If you subscribe to the Token Plan just to call `qwen4-max-preview`, have a plan for what happens on 25 November.

The official write-up, with the model ID, endpoints and usage notes, is in the [Qwen Cloud docs](https://docs.qwencloud.com/developer-guides/getting-started/latest-model).
