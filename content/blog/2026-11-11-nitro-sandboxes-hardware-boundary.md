---
title: "Nitro Sandboxes give untrusted and agent workloads a hardware boundary"
date: 2026-11-11
summary: "AWS has launched Nitro Sandboxes for EKS, ECS and EC2. Each workload gets its own hardware-isolated VM on a shared instance, which is the boundary I'd want before an agent runs untrusted code."
tags: ["aws", "security", "containers", "ai-agents"]
draft: false
---

AWS has launched [Nitro Sandboxes](https://aws.amazon.com/about-aws/whats-new/2026/11/nitro-sandboxes-eks-ecs-ec2/) for Amazon EKS pods, ECS tasks and EC2 virtual machines. Each workload runs in its own lightweight VM, isolated by the Nitro hypervisor, so it no longer shares a kernel with its neighbours on the same instance.

That's the bit that matters for untrusted or agent workloads. If a container escape or some LLM-generated code goes wrong, it hits the sandbox boundary, not the rest of the node. AWS also offers cryptographic attestation, so you can have KMS release secrets only to a sandbox that has proven its image and policy.

## How you turn it on

On EKS it's opt-in per pod: set `runtimeClassName` to `isolated-sandbox` or `confidential-sandbox`. Isolated mode trusts the parent node and protects it from the workload. Confidential mode treats the parent as untrusted and protects the workload's memory from the node operator. AWS says the usual EKS plumbing still works, including Pod Identity, VPC CNI, EBS, EFS, S3 and CloudWatch. ECS has equivalent isolated and confidential task modes.

If you want more control, you can run Nitro Sandboxes directly on EC2 with your own AMI, orchestrator and virtual machine monitor. Amazon Linux and Firecracker are natively supported.

## Caveats I'd check first

Confidential mode only holds if you actually gate the KMS key on the attestation measurements. AWS's own docs say that without that check, the measurement is recorded but never verified.

The sandbox primitive is available on most Nitro-based EC2 instances (specifically, instance types that support Nitro Enclaves), in all commercial regions, at no extra charge. Isolated and confidential pods on EKS are narrower: US commercial regions, and the cluster needs Kubernetes 1.36 or later. GPU passthrough isn't available yet. And the parent instance's network stack is still shared, so one sandbox can exhaust connection tracking or DNS and affect the others.

If you're packing agents or multi-tenant workloads onto a single instance, this is the isolation model I'd look at first. The official write-up is in the [EC2 user guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/amazon-ec2-nitro-sandboxes.html), with EKS detail in the [sandboxing guide](https://docs.aws.amazon.com/eks/latest/userguide/sandboxing.html).
