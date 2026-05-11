# Product

## Register

brand

## Users

Hiring managers, technical leaders, and government / cyber-adjacent peers landing on a personal portfolio. They arrive skeptical, scanning for proof of substance, often from a LinkedIn or GitHub referral. Most visits last under 90 seconds; the page has one chance to register credibility.

## Product Purpose

A personal portfolio for Justin Middler — a Sydney-based software engineer with 10+ years inside the Australian Federal Government's development and cyber-security practice, and prior experience as a Software Engineer at Microsoft (core Azure Networking). The site exists to:

1. Establish credibility quickly through specific, verifiable claims (tenure, employer, repos).
2. Showcase recent personal work pulled from `github.com/jusso-dev/` — ISMSearch, IOC-Dispatch, NRLPredictor, M365-Secure, quote-finder, OhmsLawCalculator, Rusty-files, Azure-flowlog-parser.
3. Hand off cleanly to GitHub for deeper inspection.

Success: a visitor leaves with a precise, distinctive impression of a senior practitioner — not a generic developer portfolio — and either visits a repo or remembers the page well enough to mention it.

## Brand Personality

Operator. Documentary. Restrained. Voice is confident and direct: short factual statements, no marketing-speak, no qualifying hedges. The interface borrows the visual language of declassified government files — paper, typewriter type, classification banners, redaction blocks, dossier numbering — and turns it into the brand's voice. The aesthetic is the credential.

## Anti-references

- Terminal-green-on-black "hacker" portfolios. Costume, not voice.
- Editorial-typographic landing pages (display serif italic + small mono labels + ruled separators). Saturated lane in 2026; skip.
- Linear / Vercel / Stripe-minimal SaaS clones repurposed as personal sites.
- Three-equal-card project grids with icon + title + paragraph.
- Hero-metric templates (big number + small label + supporting stats).
- Glassmorphism, gradient text, side-stripe borders.
- Generic "modern" centered-stack layouts.

## Design Principles

1. **The document is the design.** Treat the page as an artifact, not a marketing site. Frames, banners, control numbers, page-of-page indicators carry the voice.
2. **Specific claims beat adjectives.** "10 years Australian Federal Government cyber" beats "experienced security professional". Every line of copy names a thing.
3. **Reveal, don't list.** Redactions, stamps, and progressive disclosure invite curiosity. Static walls of text don't.
4. **Earned restraint.** One mark color (declassified-stamp red), one warm-paper ground, one ink black. Anything more dilutes the metaphor.
5. **Static, fast, durable.** Ships as a static export to GitHub Pages. No client-side data fetching, no analytics drag, no fonts that block paint.

## Accessibility & Inclusion

- WCAG 2.2 AA target. Contrast ratios verified against the paper/ink palette.
- All redaction reveals must be operable by keyboard and announced to screen readers; the "redacted" treatment is decorative, the content underneath is always reachable.
- `prefers-reduced-motion` respected — no scanline drift, no stamp jitter for users who opt out.
- No content gated behind hover only. Every reveal has a focus / tap equivalent.
- Body type stays within 65–75ch, scales fluidly down to 360px viewports.
