# Design

Visual system for `jussodev-portfolio`. Aesthetic: Declassified Dossier — a single-page personal portfolio styled as a public-release government file.

## Theme

**Scene sentence:** A reader at a desk under late-afternoon office light, holding a printed declassified file folder, scanning it for substance before passing it on.

That sentence forces **light**. Paper is the metaphor; dark mode would betray it. There is no dark mode toggle. A `prefers-color-scheme: dark` user still sees paper — the contrast is high enough for low-light reading and the metaphor is non-negotiable.

## Color

**Strategy:** Restrained — tinted warm-paper neutrals plus one accent color (declassified-stamp red) used at ≤8% surface coverage for classification banners, stamps, and the cursor mark.

All values OKLCH. No `#fff` or `#000`. Neutrals carry chroma 0.008–0.014 toward a warm hue (~75°) so the page reads as paper, not screen.

| Token | OKLCH | Role |
|---|---|---|
| `--paper` | `oklch(0.965 0.012 75)` | Page background. Warm off-white. |
| `--paper-deep` | `oklch(0.935 0.018 70)` | Inset panel, dossier frame fill. |
| `--ink` | `oklch(0.18 0.012 60)` | Primary text. Warm near-black. |
| `--ink-muted` | `oklch(0.42 0.010 60)` | Metadata, labels, secondary copy. |
| `--ink-faint` | `oklch(0.62 0.008 60)` | Hairlines, separators, decorative rules. |
| `--redact` | `oklch(0.22 0.010 60)` | Solid bar covering redacted content. Slightly lifted from `--ink` so the bar reads as a stamp, not text. |
| `--stamp` | `oklch(0.55 0.182 28)` | Declassified-red. Single accent. Classification banners, stamp marks, link underlines on hover. |
| `--stamp-deep` | `oklch(0.46 0.190 28)` | Pressed / active stamp state. |

Accent budget: classification top + bottom banners + at most two stamp marks per fold. Anything more dilutes the metaphor.

## Typography

**Strategy:** Single-family mono pairing — deliberate, not by reflex. Typewriter is the literal physical reference (declassified document), not a "developer" costume.

- **Display (`--font-display`):** `Special Elite` (Google Fonts). Authentic worn-typewriter cuts. Used for the dossier header, classification banners, section markers.
- **Body / labels (`--font-body`):** `JetBrains Mono` (Google Fonts), weights 400 / 500 / 700. Highly legible at body sizes, neutral enough to carry long form without fighting the display face.

Neither font is on the reflex-reject list (no IBM Plex Mono, no Space Mono). Both loaded via `next/font` with `display: swap` and subsetted to Latin.

**Scale (modular, ratio 1.333):**

```
--text-xs:   0.75rem   ; labels, control numbers
--text-sm:   0.875rem  ; metadata
--text-base: 1rem      ; body
--text-md:   1.333rem  ; subheads
--text-lg:   1.777rem  ; section titles
--text-xl:   2.369rem  ; dossier subject line
--text-2xl:  clamp(2.8rem, 5vw + 1rem, 4.5rem) ; hero stamp
```

Line-height: 1.55 for body, 1.15 for display. Letter-spacing on `Special Elite`: +0.02em; on small-caps labels: +0.12em.

## Spacing & layout

- **Grid:** 12-column on `≥1024px`, 6-column `≥640px`, single-column below. Asymmetric: the dossier frame sits in columns 2–10, marginalia (control numbers, classification stripes) lives in columns 1 and 11–12.
- **Container max-width:** 72rem. Body copy clamped to 68ch inside.
- **Spacing scale:** `4 8 12 16 24 32 48 64 96 144` (px). Vary rhythm — generous between sections, tight within metadata blocks.
- **Borders:** 1px hairlines in `--ink-faint`. Dossier frame uses a 2px solid `--ink` with 4px inner offset (double-rule, like a real classified-document frame).
- **No side-stripe borders. No nested cards.**

## Components

### Classification banner
Top and bottom of page. Full-width stripe, `--stamp` background, `--paper` text, `Special Elite` 0.75rem, letter-spacing 0.18em, 6px vertical padding. Content: `// UNCLASSIFIED // PUBLIC RELEASE // FOR REVIEW //`.

### Dossier frame
The page's primary container. Double-rule border (2px `--ink` outer, 1px `--ink-faint` inner at 4px offset). Top-right corner carries the page-of-page indicator (`P. 01 OF 01`). Top-left carries `DOSSIER 001 — SUBJECT: J. MIDDLER`.

### Redaction reveal
Span wrapped around sensitive-but-public content (employer, project names a visitor doesn't expect). Default state: solid `--redact` background covering the text, text color matched to background so the word is invisible. On hover, focus, or tap: background transitions to transparent over 240ms `cubic-bezier(0.16, 1, 0.3, 1)`, text color returns to `--ink`. A subtle 1px `--ink-faint` underline persists in both states to keep the affordance visible.

Accessibility: the underlying text is in the DOM at full contrast for screen readers (the redaction is a `::before` pseudo-element overlay, not a text-color trick). `aria-label="declassify on activation"` on each instance. Operable via keyboard `Enter` / `Space`.

### Stamp mark
Decorative red angled stamp ("DECLASSIFIED", "REVIEW COMPLETE", "AUTHENTICATED — J.M."). Rendered as an SVG with a slight rotation (-7deg to -12deg), 70% opacity, `--stamp` color. Used sparingly: one per major section maximum.

### Field-artifact row (project listing)
Not a card. A dense row with: leading index number (`3.1`, `3.2`...), project name in display face, one-line description, metadata trail (`LANG · STARS · LAST-UPDATED`), and an inline `>` glyph that animates 4px right on hover. Rows separated by 1px `--ink-faint` hairlines, not by gap.

### Marginalia
Small monospaced labels in the outer columns: `CONTROL №`, `SEC. 02`, `REV. 2026.05`, `// PAGE BREAK //`. Set in `--text-xs`, `--ink-muted`, vertical or horizontal depending on placement.

## Motion

- Page load: 320ms staggered fade-up on the dossier frame children (40ms stagger), exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Redaction reveal: 240ms opacity + color transition, same easing.
- Stamp ink: zero motion. Stamps are static — moving them breaks the metaphor.
- All motion gated behind `@media (prefers-reduced-motion: no-preference)`. Reduced-motion users get static reveal-on-focus with no transition.
- Never animate `width`, `height`, `top`, `left`, or any layout property. Use `opacity` and `transform` only.

## Imagery

This is a developer brief, not a restaurant. **Zero photography is correct here** — see brand.md exception. Voice is carried entirely by typography, paper texture, and document-craft. The only visual non-text elements are:

- A faint repeating paper-grain texture (SVG noise, 4% opacity, `--paper-deep` over `--paper`).
- A subtle horizontal rule pattern at the top of each major section (5px tall, 1px dash, `--ink-faint`).
- SVG stamp marks (described above).

No icons. No illustrations. No hero photo.

## Don'ts (project-specific)

- No dark mode.
- No emoji anywhere in the UI.
- No avatar / headshot. The dossier metaphor requires anonymity-with-attribution.
- No "Hi, I'm Justin" hero copy. The dossier header does that work.
- No third-party analytics, no cookie banner. Static site, zero JS network requests after load.
- No client-side router transitions. One page, scroll-driven.
