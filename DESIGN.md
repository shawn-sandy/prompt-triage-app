---
name: Prompt Triage
description: The logo's ink and green on a terminal-quiet ground — a code-forward kit whose single accent is a machine-checked signal, not decoration.
colors:
  ink: '#131313'
  ink-soft: '#5d5d5d'
  paper: '#fcfcfc'
  paper-sunk: '#f1f1f1'
  island: '#127a3a'
  island-bg: '#e6f4ea'
  rule: '#e0e0e0'
  success: '#22c55e'
  warning: '#f59e0b'
  error: '#ef4444'
  info: '#3b82f6'
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontSize: 'clamp(3rem, 6.6vw, 4.5rem)'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.035em'
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontWeight: 600
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontWeight: 600
    letterSpacing: '-0.015em'
  deck:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontSize: 'clamp(1.125rem, 0.9vw + 0.9rem, 1.5rem)'
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    letterSpacing: '0.12em'
  button:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: '0.875rem'
    fontWeight: 600
rounded:
  none: '0'
  base: '4px'
  lg: '8px'
  2xl: '16px'
  full: '9999px'
spacing:
  1: '4px'
  2: '8px'
  3: '12px'
  4: '16px'
  6: '24px'
  8: '32px'
  11: '44px'
  12: '48px'
  16: '64px'
components:
  button-primary:
    backgroundColor: '{colors.island}'
    textColor: '{colors.paper}'
    rounded: '{rounded.base}'
    padding: '11px 20px'
    typography: '{typography.button}'
    height: '44px'
  button-primary-hover:
    backgroundColor: '#186c36'
    textColor: '{colors.paper}'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.island}'
    rounded: '{rounded.base}'
    padding: '11px 20px'
    typography: '{typography.button}'
    height: '44px'
  button-ghost-hover:
    backgroundColor: '{colors.island-bg}'
    textColor: '{colors.island}'
  card:
    backgroundColor: '{colors.paper-sunk}'
    textColor: '{colors.ink}'
    rounded: '{rounded.base}'
    padding: '24px'
  code-block:
    backgroundColor: '{colors.paper-sunk}'
    textColor: '{colors.ink-soft}'
    rounded: '{rounded.none}'
    padding: '16px 20px'
  input:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.base}'
    padding: '8px 12px'
  nav-toggle:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.base}'
    height: '44px'
    width: '44px'
  eyebrow:
    textColor: '{colors.ink-soft}'
    typography: '{typography.label}'
---

# Design System: Prompt Triage

## Overview

**Creative North Star: "The Instrument Reading"**

Prompt Triage looks like the face of a measuring instrument, read in a terminal. Its colours come
off the logo — the `#131313` ink stroke, its dark tile, and the green arc — and its annotations
speak in mono, the way a coding agent's output does: eyebrows open on the logo's `>` chevron as a
shell prompt, buttons and navigation are set in mono, and the specimen sits in a terminal window.
The ground is neutral and quiet, the
scale is precise and legible at a glance, and exactly one thing on the dial is lit. Nothing is
decorated for its own sake; every mark on the surface is there because it reports something. The
palette's own token names say it out loud — `ink`, `paper`, `island` — and the accent behaves like
a needle rather than a brand flourish.

The density is calm and generous. Content sits on an 80rem measure with real air around it, prose
is capped at 60ch, and surfaces separate by tone and a single hairline rather than by shadow or
ornament. Type does the structural work: one display face at one weight, the system sans for
reading, and small mono capitals for anything that annotates rather than speaks. When a component
needs to explain itself, it does so by standing next to the source that produced it — the
instrument shows its reading and its calibration together.

What makes the system unusual is that its central rule is enforced by tests rather than taste.
Colour marks hydration: static content is ink on paper, and the accent appears only on things a
visitor can operate. `e2e/homepage-design-direction.spec.ts` walks the rendered homepage and fails
the build if a non-interactive element computes to the accent, and `e2e/home-accessibility.spec.ts`
asserts the 4.5:1 contrast floor against the tokens the page actually resolves. Breaking the
direction is a build failure, not a disagreement. Confirmed rejections: the violet/indigo family
every generated palette converges on, and stock Tailwind sky-500 — the accent is deliberately
neither.

**Key Characteristics:**

- One lit indicator: the accent is a signal, never decoration
- Ink-on-paper neutrals with tonal layering instead of shadow
- Three type roles and no fourth
- Small mono capitals for every annotation and label
- Measured, not estimated — contrast ratios are recorded and asserted
- The rendered artifact and its source shown together

## Colors

A neutral ink-and-paper ground read off the logo, carrying exactly one chromatic voice: the
logo's green arc. The logo's red arc stays in the logo — on a page it would read as an error.

### Primary

- **Prompt Green** (`#127a3a` light / `#3fd46c` dark): The single accent. It appears on links,
  buttons, focus rings, and the interactive-specimen badge — and nowhere else. The logo's raw
  `#28d05a` measures 2.04:1 on white, so light mode uses a darker shade of the same hue and dark
  mode a bright tint. Measures 5.28:1 on paper in light and 9.59:1 in dark.
- **Green Wash** (`#e6f4ea` light / `#10291a` dark): The accent's tinted background. Backs
  interactive affordances on hover, and paints `::selection`. Prompt Green on Green Wash is the
  lowest pair in light: 4.77:1.

### Neutral

- **Ink** (`#131313` light / `#ececec` dark): The logo's stroke colour. Primary text and the
  default `color` on `body`. 18.11:1 on paper.
- **Soft Ink** (`#5d5d5d` light / `#a3a3a3` dark): Secondary text — decks, eyebrows, labels,
  captions, inline code. 6.41:1 on paper.
- **Paper** (`#fcfcfc` light / `#131313` dark): The page background. In dark it is the logo's own
  tile.
- **Sunk Paper** (`#f1f1f1` light / `#1c1c1c` dark): Recessed surfaces — the header band, card
  backgrounds, code blocks, terminal title bars. Soft Ink on Sunk Paper is the lowest pair in dark:
  6.75:1 (5.82:1 light).
- **Rule** (`#e0e0e0` light / `#2c2c2c` dark): Hairlines and dividers. Never text.

### Tertiary

Status colours, used only in alerts, form validation, and system feedback — never as brand colour:
**Success** (`#22c55e`), **Warning** (`#f59e0b`), **Error** (`#ef4444`), **Info** (`#3b82f6`).

### Named Rules

**The Hydration Rule.** Colour marks interactivity. Static content renders in ink on paper; the
accent appears only where something responds — links, buttons, focus rings, the specimen badge.
Never a decorative border, a heading, a hairline, or a card surface. This is machine-checked, not a
preference: `e2e/homepage-design-direction.spec.ts` fails the build when a non-interactive element
computes to the accent. Treat it exactly as you would a type error.

**The Legacy Family Rule.** The `--color-primary-*` sky-blue ramp and the `--color-neutral-*` grey
ramp exist for backward compatibility with earlier component tokens. They are not the palette. New
work reaches for the seven direction tokens; a sky-blue that reaches the screen is a regression.

**The Three Scopes Rule.** Both palette families flip together in all three theming scopes —
`:root`, `@media (prefers-color-scheme: dark)`, and `:root[data-theme]`. Redefining only `:root`
looks correct in light mode and silently keeps the old values the moment the visitor's OS is dark.

## Typography

**Display Font:** Inter 600 (self-hosted, latin subset, single weight; falls back through the
system sans)
**Body Font:** System sans stack (`ui-sans-serif, system-ui, -apple-system, …`)
**Label/Mono Font:** System mono stack (`ui-monospace, SFMono-Regular, Menlo, …`)

**Character:** Neutral and instrument-like. The display face is tight and confident — negative
tracking, one weight, no italic — and the system sans underneath it is deliberately anonymous so
that reading feels like reading rather than like being marketed to. The mono capitals are the
system's annotation voice: everything that labels, measures, or points at something else speaks in
them.

### Hierarchy

- **Display** (600, `clamp(3rem, 6.6vw, 4.5rem)`, 1.02, `-0.035em`): The homepage hero `h1` only.
  One knob drives both display and deck size, so the ratio between them stays pinned at 3.2 at
  every viewport width instead of collapsing at desktop.
- **Headline** (600, `h1` scale, `-0.02em`): Page-level `h1` on every other route. Capitalized.
- **Title** (600, `h2`/`h3` scale, `-0.015em`): Section and card titles. Capitalized.
- **Deck** (400, `clamp(1.125rem, 0.9vw + 0.9rem, 1.5rem)`, 1.5): The paragraph under a page
  heading, in Soft Ink. Its clamp runs a shallower slope than the heading's, so the two separate as
  the viewport grows rather than converging.
- **Body** (400, 1rem, 1.5): Prose and lists, capped at 60ch — 80ch inside `article`.
- **Label** (400, 0.75rem, `0.12em`, uppercase, Soft Ink): Eyebrows, figure captions, specimen
  badges, inline code. Opted into with `data-ui="eyebrow"` or `data-ui="label"`. Eyebrows open on a
  `>` prompt, the logo's chevron, hidden from screen readers.
- **Button** (600, 0.875rem): Interactive control labels, and the links in the navigation panel.
  On the mono face, so every control reads like a command. This widens the mono role; it adds no
  fourth family.

### Named Rules

**The Three Roles Rule.** Display for `h1`–`h6`, body sans for everything that reads, mono for
everything that annotates or operates. There is no fourth role. A new face is a new decision about the whole
system, not a local one.

**The One Weight Rule.** The self-hosted display face ships exactly one weight (600) as a single
latin-subset woff2, preloaded, no CDN, one font request total. Every heading level renders at that
weight — so covering `h4`–`h6` costs nothing. A design that needs a second weight is asking for a
second network request; make that trade deliberately or not at all.

**The Labels Keep Their Case Rule.** `text-transform: capitalize` applies to `h1`–`h3`, which are
titles. `h4`–`h6` are used as UI labels — the contact form renders its error summary as an `h6` —
and capitalizing a sentence produces "Please Correct The Following Errors".

## Layout

A single centred measure of 80rem (`--max-content-width`, 1280px) governs `main`, direct `section`
children of `body`, and the inner column of full-bleed bands. Bands that paint a background span
the full viewport and push their content in with
`padding-inline: max(1.25rem, calc((100% - 80rem) / 2))` rather than being constrained themselves —
that keeps the band edge-to-edge while its contents stay on the shared measure, with no wrapper
element.

Vertical rhythm runs on an 8pt grid (`--space-*`). `main` carries 2rem block padding; sections take
2rem inline padding; sibling sections separate by 2rem; elements inside an `article` separate by
1.5rem. Composed pages own the space between their own regions — a reusable component never carries
page-specific margin, which is why the homepage sets `.home-features { margin-block-start: 4rem }`
at the call site rather than inside `FeatureCards`.

The homepage hero is a two-column grid (`minmax(0, 1fr)` beside a 420px-max specimen column) with a
3.5rem gutter, collapsing to a single column at 60rem. Interactive controls hold a 44px minimum
target (`--space-11`, WCAG 2.2 SC 2.5.8).

### Named Rules

**The 320 Rule.** Nothing may widen the document at a 320px viewport (WCAG 2.1 SC 1.4.10 Reflow).
Grid children declare `min-width: 0`, long headings set `overflow-wrap: break-word` and
`hyphens: auto`, and any content wider than the viewport — code samples above all — scrolls inside
its own `overflow-x: auto` box rather than pushing the page.

**The Composition Owns Spacing Rule.** Space between two components belongs to the page that
composes them, never to either component. Components are exported for reuse; a margin baked into
one is a bug at every other call site.

## Elevation & Depth

Depth is tonal, not cast. Surfaces separate by stepping between Paper and Sunk Paper and by a
single 1px Rule hairline; the header band, cards, and code blocks are all recessed by tone alone.
The full eight-step shadow scale (`--shadow-sm` through `--shadow-2xl`) exists in the token file and
remains available, but resting surfaces do not spend it.

### Shadow Vocabulary

- **`--shadow-sm`** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`): The lightest available lift. Hover response
  on an interactive card.
- **`--shadow-base`** (`0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): Aliased by
  `--card-shadow`. Reserved for a card that is genuinely lifting under interaction.
- **`--shadow-lg`** (`0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`):
  Overlays and popovers that float above the page.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces are flat at rest. A shadow is a response to state — hover,
focus, or genuine overlay — never a resting property of a card, a band, or a section. If a surface
needs to read as separate while sitting still, step its tone or draw a hairline.

## Shapes

Terminal-sharp, never pill-shaped. The system default is 4px (`--radius`, `--btn-radius` and
`--card-radius`, all pointed at `--radius-base`) and it covers buttons, cards, the specimen frame,
terminal frames, blockquotes, and the navigation toggle and panel. The scale itself is unchanged,
so `--radius-lg` is still 8px for the dashboard panels that read it directly. Form fields take
the same 4px through `--input-radius`. Images take 16px
(`--img-radius`, `--radius-2xl`), the one place the geometry is allowed to soften noticeably.
Fully-round (`--radius-full`) is reserved for avatars and status dots.

Borders are always exactly 1px in Rule; there is no 2px border anywhere in the resting system. The
only 2px stroke in the language is the focus ring, which is a 2px Prompt Green outline offset by
2px — deliberately the heaviest line the system draws, because it is the one a keyboard user needs
to find.

### Named Rules

**The Squared-Insert Rule.** An element that spans its container edge-to-edge drops its own radius
to zero and separates with a hairline instead. The code block inside a specimen card is the
canonical case: it runs the full card width, so a rounded corner inside a rounded corner would read
as a mistake.

## Components

### Buttons

- **Shape:** Terminal-sharp (4px), 1px border, 44px minimum height.
- **Primary:** Prompt Green fill with a matching border, label in Paper — not white. The accent
  lightens in dark mode, so white label text would fall to 1.93:1 there; inverting to Paper
  measures 5.28:1 light and 9.59:1 dark. Padding `0.6875rem 1.25rem`, mono, weight 600, 0.875rem.
- **Ghost / Secondary:** Transparent fill, label in Prompt Green, border in neutral Rule. The
  neutral border is what creates the hierarchy — an accent border here made the two buttons read as
  two equal calls to action.
- **Hover:** Fill mixes 12% toward ink in OKLCH (`color-mix(in oklch, …)`), and the label picks up
  an underline at 3px offset so the state never relies on hue alone. The ghost variant gains its
  Green Wash tint and trades its neutral border for the accent — hover is where it earns the
  border its resting state gave up.
- **Active:** Fill mixes 22% toward ink.
- **Focus:** 2px Prompt Green outline, 2px offset.
- **Transition:** Colour only, 150ms `ease-out`. Nothing moves, so there is nothing to suppress
  under `prefers-reduced-motion`.

### Cards

- **Corner Style:** Terminal-sharp (4px).
- **Background:** Sunk Paper, painted through `body [data-card]` so it flips with the theme.
- **Border:** 1px Rule.
- **Shadow Strategy:** None at rest — see Elevation & Depth.
- **Internal Padding:** 24px (`--card-padding`), 16px gap between children.
- **Behavior:** A card with a link renders a "Continue Reading" footer; the link, being
  interactive, carries the accent.

### Inputs / Fields

- **Style:** 4px radius, 1px border, Paper fill.
- **Focus:** The system focus ring — 2px Prompt Green outline, 2px offset.
- **Validation:** Deferred until blur (`:user-invalid:not(:focus)`), so a field never turns red
  while it is still being typed into. Invalid fields take an Error outline and a `⚠` prefixed
  message; valid fields take a Success outline and drop their hint. Required fields append a
  " required \*" marker generated from the label.

### Navigation

- **Style:** A single horizontal bar at every width, packed to the start, with the brand and a 44px
  hamburger toggle grouped left and the account slot pushed right by auto margin.
- **Mechanism:** The panel is a native HTML `popover` — toggle, Escape, and outside-click come from
  the platform, with no JavaScript involved. There is no open-state class; the only CSS hook is
  `:has(> [popover]:popover-open)`.
- **Colour:** The bar and panel both inherit their background rather than declaring one, so the
  chain body → nav → panel can never disagree about the active theme.
- **Toggle states:** Transparent border at rest (kept, not removed, so revealing it costs no layout
  shift), rising to 30% of the current text colour on hover and focus.

### The Specimen (signature component)

The system's signature pattern, and the clearest expression of the North Star: a rendered component
and the source that produced it, shown as one object. A framed panel carries a terminal title bar —
three neutral dots and a small mono-capital badge on a Sunk Paper strip, opted into with
`data-ui="terminal-bar"` — the live component in a padded body, and a full-width code
block below a hairline with squared corners and its own horizontal scroll.

The rule that makes it worth having: **the rendered instance and the printed snippet are built from
the same constants**, so the sample cannot drift from the component standing beside it. It appears
in the homepage hero and in the promoted tier of `FeatureCards`.

## Do's and Don'ts

### Do:

- **Do** reserve Prompt Green for things a visitor can operate — links, buttons, focus rings,
  specimen badges. Run the homepage e2e spec before assuming an exception is safe.
- **Do** use the seven direction tokens (`--ink`, `--ink-soft`, `--paper`, `--paper-sunk`,
  `--island`, `--island-bg`, `--rule`) for every new surface.
- **Do** flip both palette families in all three theming scopes when overriding, and load your
  sheet after the kit's.
- **Do** separate surfaces with a tone step and a 1px Rule hairline before reaching for a shadow.
- **Do** put annotations, eyebrows, and captions in mono capitals via `data-ui="eyebrow"` or
  `data-ui="label"` rather than styling them ad hoc.
- **Do** let long content scroll inside its own box; check 320px before shipping.
- **Do** pair a rendered component with the source that produced it, built from shared constants.
- **Do** re-measure contrast when repointing a token — the recorded ratios are a budget, not a
  decoration.

### Don't:

- **Don't** put the accent on a heading, a decorative border, a hairline, or a card surface. The
  test will catch it, and it is the one rule the whole system rests on.
- **Don't** reach for the legacy `--color-primary-*` sky-blue or `--color-neutral-*` greys in new
  work; they exist only for backward compatibility.
- **Don't** drift the accent toward violet, indigo, or Tailwind sky-500 — those are confirmed
  rejections, not untried options.
- **Don't** put white text on the accent. Use Paper; white fails contrast in dark mode.
- **Don't** add a shadow to a resting surface, or a second typeface, or a second display weight.
- **Don't** bake page-specific margin into a reusable component.
- **Don't** apply `text-transform: capitalize` to `h4`–`h6`; they carry sentence-cased UI labels.
- **Don't** style navigation state against `[aria-expanded]` — it is an implicit accessibility-tree
  mapping on a popover invoker, not a DOM attribute, and never matches.
