---
title: The NIST P-256 seed was lrand48 and a 1997 timestamp
date: 2026-10-20
summary: Anthropic says Claude worked out where the NSA-supplied NIST curve seeds came from. They weren't hashes of a secret phrase but output from the C library's lrand48, seeded with Unix timestamps from 1997 and 1998. It's not a break, and there's nothing to patch.
tags: [security, cryptography, ai]
draft: false
---

For more than 25 years, one of the most widely used pieces of internet crypto carried an unexplained number. Anthropic has now published where it came from, in [Claude reveals ECDSA curve origins](https://www.anthropic.com/research/ecdsa-curve-origins). The short answer is a 1990s C random number generator and the system clock.

## The mystery

When NIST adopted ECDSA in FIPS 186-2 in 2000, the standard listed a set of elliptic curves. For the prime and binary curves, it also published a seed, and the hash of that seed defines the curve's coefficient b. The NSA supplied the seeds with no explanation. P-256's was `C49D3608 86E70493 6A6678E1 139D26B7 819F7E90`, and that was all anyone knew about it.

P-256 matters because it's everywhere. RFC 8446, the TLS 1.3 specification, says a compliant implementation must support key exchange with secp256r1 (NIST P-256) and must support ecdsa_secp256r1_sha256 signatures. A number nobody could explain, sitting under that, invited suspicion that it had been picked to hide a weakness. Anthropic notes that most researchers trusted the curves anyway, but the question never went away, and there was a public bounty for the answer.

The best story was from Jerry Solinas, a long-time NSA employee, who said in 2015 that the seeds came from hashing a humorous phrase along the lines of "Give Bob and Jerry a raise" or "Bob and Jerry rule". Nobody could find the phrase. Solinas died in 2023.

## What Claude found

In October 2026, an Anthropic employee asked an internal research model whether it could work out how the seeds were generated, without pointing it at the passphrase story. According to Anthropic, in under half an hour Claude found the origins of the P-192, P-224, P-256, P-384 and P-521 seeds.

None of them were hashes. They were output from `lrand48`, the random number generator in the C library, seeded with a Unix timestamp. The program drew 20 bytes at a time from the generator, and each 20-byte block was a candidate seed. P-256's published seed is candidate 1,842 from a run seeded with the timestamp 1997-08-16 01:52:34 UTC.

The same approach recovered seeds for five example curves in the ANSI X9.62 standard, and four NIST binary curves (B-233, B-283, B-409 and B-571). The prime-curve timestamps fall between May 1997 and April 1998. The binary-curve values read as February 1984, but doubled they land on 17 April 1998, which suggests the program halved the clock.

## How it got there

Instead of hunting for the phrase, Claude asked how 1990s software would have produced the numbers. Old C library generators are weak enough that their output can be recognised.

It scanned each seed for runs of consecutive outputs from 1990s-era generators and noticed that, for four of the ten seeds it was looking at, the top bit of every 32-bit word was zero. That's the fingerprint of `lrand48`, which returns only the top 31 bits of a 48-bit state. From there it recovered the internal state, using a lattice reduction (LLL) for the prime-curve seeds that kept fewer bits of each output, then stepped the generator backwards until it reached the form `srand48` sets from a timestamp.

Anthropic published short Python code that regenerates every one of those seeds from the timestamp and candidate number. Each recovered state reproduces all 160 bits of its seed, which isn't going to happen by chance.

It also explained some base points. The base points of P-192 and five ANSI X9.62 example curves came from the random number generator in Arjen Lenstra's FreeLIP library, seeded with small integers like 20000.

## What it means

It's not a cryptographic break, a new attack or a weakness in the curves. There's nothing to patch and nothing to change.

If anything it's reassuring. A seed generated from the clock by a common generator that anyone can rerun leaves much less room for someone to have quietly steered the result. Anthropic's view is that it makes a deliberate backdoor much less plausible.

## What's still open

- For P-256, candidate 876 from the same run would also have given a prime-order curve of the right size, built the same way, but it was passed over. P-224's run skipped three such curves, and the ANSI runs skipped seven more. Nobody knows the selection criteria, or whether it was accidental. Anthropic argues the numbers are too small for weak curves to have been picked deliberately.
- The seed for the binary curve B-163 doesn't fit anything Claude tried.
- The base points for P-224, P-256, P-384 and P-521, and for the NIST binary curves, are still unexplained.

## The bounty

Anthropic says the $36,864 bounty for finding the seeds will be donated to the Internet Security Research Group. The write-up also thanks Filippo Valsorda for organising the bounty, and recognises Jerry Solinas, who took being called an "evil Internet meme" with good humour.

What I like most is the method. Years of searching for a phrase came up empty. The answer came from thinking about how the software of the time worked and recognising its fingerprints in the output.
