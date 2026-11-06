---
title: "AlloyDB Express is fine for throwaway tests. Keep real data out of it."
date: 2026-11-09
summary: "Google Cloud put AlloyDB Express into preview: PostgreSQL in under two seconds for developers and coding agents. Useful for prototypes, so long as production data stays out."
tags: ["google-cloud", "databases", "ai-agents", "security"]
draft: false
---

Google Cloud has put [AlloyDB Express](https://cloud.google.com/blog/products/databases/introducing-alloydb-express-for-rapid-testing-and-prototyping) into preview. It is AlloyDB for PostgreSQL aimed at developers and AI coding agents: a database you can create in under two seconds, that pauses after 15 minutes of idle time, and that upgrades to full AlloyDB in one click while keeping data, schemas, users and connection strings.

## What Google is selling

- create a ready-to-use PostgreSQL database in under two seconds via gcloud, REST, MCP, Terraform or the console
- scale to zero after 15 minutes of inactivity, then wake on the next query
- built-in vector, text and hybrid search, plus Gemini helpers inside SQL
- a free monthly allowance, then pay for active compute and used storage
- one-click upgrade to AlloyDB with high availability, read replicas and disaster recovery

## The security bit that matters

Google's pitch for platform and security teams is that you set IAM, network and organisation policies once, and every Express database a developer or coding agent creates stays inside those guardrails. Defaults hide the IP behind a public DNS endpoint and block inbound traffic until you allow it. Private Service Connect, VPC Service Controls and native PostgreSQL roles are there for least privilege on the internal path.

That is a better starting point than a random Postgres container on someone's laptop. It is not a substitute for thinking about what data ends up in the instance.

## What I'd do with it

Treat Express as throwaway. Fast provisioning is useful for tests, CI and prototypes. It is also a fast way to put real customer data somewhere nobody is watching. Keep production dumps out of Express. Make sure the agent that can create a database cannot also pull a production snapshot into it. And remember that paused compute is free, but storage is not empty: the data is still sitting there until you delete the instance.
