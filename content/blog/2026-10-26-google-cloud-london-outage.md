---
title: "What Google Cloud's London outage says about multi-zone plans"
date: 2026-10-26
summary: "A power fault in one europe-west2 zone on 20 October knocked out Google Cloud services across the London region for just over six hours, and took Revolut down with it. Here's what Google's preliminary report says and what I'd take from it."
tags: ["cloud", "resilience", "google-cloud", "outage", "cps-230"]
draft: false
---

Google has published its preliminary incident report on the europe-west2 outage from 20 October, the one that took Revolut down. If your team runs on a single cloud region, it's worth reading in full. Here's my summary and what I think it means for the rest of us.

## What happened

At 6:53am London time the grid supply dropped at the data centre hosting zone europe-west2-b. The facility switched to its UPS battery banks, which were meant to carry the load while the diesel generators started.

The generators never took over. The programmable logic controllers that run the automatic start and transfer, both the primary and the backup, failed to start them. The batteries ran out from 7:00am, about seven minutes later, and the servers, network switching and storage in that zone lost power.

Google says on-site engineers restored a stable utility feed within an hour of supply coming back, then reset and tested the generator controllers before bringing infrastructure back up and slowly letting traffic back into the zone.

## Why the other zones felt it too

A region with three zones is supposed to ride out losing one. That only partly happened.

Two things hurt customers in europe-west2-a and europe-west2-c, according to Google:

- Demand surged onto the healthy zones all at once. Redirected queries, database failovers and compute workloads used up the spare capacity, which led to admission queues, slow failovers and intermittent 500 and 503 errors.
- Regional control planes made cross-zone calls to metadata and catalog components in the dead zone. Those calls timed out, so job submissions stalled and APIs slowed down even for workloads that weren't in europe-west2-b.

Google lists BigQuery, Looker, Compute Engine, GKE, Regional Persistent Disk and Cloud SQL among the services that saw this unexpected impact. It puts the whole incident at 6 hours 10 minutes, ending at 1:10pm London time, with a small tail of workloads recovering after that.

## Revolut and the regulators

Better Stack's rundown notes that Revolut didn't say it was back until that evening. It also points out that the UK named Google Cloud a critical third party to its financial system in July, and that on the day of the outage the chair of the Treasury Committee wrote to the Bank of England and the FCA asking when they were told.

## What I'd take from it

Multi-zone isn't a plan until you've tested losing a zone at peak load. The failover itself is only half the job. You also need enough spare capacity in the surviving zones to absorb everything that lands on them at once, and everyone else on the same region will be failing over at the same time.

Know what your provider's control plane depends on. Your workload can be healthy in a healthy zone and still stall because a management call is waiting on something in the zone that's gone. That's hard to see from the outside, so look for it in provider documentation and in your own game days.

Backup power is a control like any other. Here it was the automation that starts the generators that failed, twice over, not the generators themselves. If you run your own facilities, test the whole sequence and not just the parts.

For Australian financial services this is CPS 230 territory. Material service providers, tested scenarios for losing them, and knowing how quickly you'd tell APRA are all part of that standard. An outage like this one is a good tabletop scenario to run against your own setup.

## Sources

- [Google Cloud preliminary incident report](https://status.cloud.google.com/incidents/Xs2XTHzAVC9YnafnPyzj)
- [Better Stack's rundown](https://www.youtube.com/watch?v=qLAcIYRVRiA)
