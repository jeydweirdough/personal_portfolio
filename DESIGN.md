---
name: Jade Atyla L. Madigal — Asset Tag
description: An asset plate for a person — Philippine utility signage rendered as a portfolio.
colors:
  signal: "#b8400b"
  signal-deep: "#8a2f07"
  signal-lit: "#d24d0e"
  signal-day: "#a8380a"
  signal-night: "#ff9e1b"
  signal-field: "#ffd24a"
  caution: "#5e0d12"
  caution-night: "#ff7b93"
  signal-hover-day: "#8e2f08"
  signal-hover-night: "#ffb347"
  signal-hover-field: "#ffe07a"
  stencil: "#fff6f2"
  stencil-dim: "#f9e7de"
  asphalt: "#16181a"
  asphalt-deep: "#0e0f11"
  concrete: "#eae8e6"
  concrete-dim: "#d8d5d2"
  ink: "#17150f"
  ink-dim: "#5c5854"
  ink-dim-night: "#c9beb8"
  rule-day: "#cfc9c5"
  rule-night: "#302b28"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 8.2vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1rem, 2.4vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
    fontFeature: "tabular-nums"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 88"
rounded:
  plate: "0px"
spacing:
  hairline: "2px"
  bolt: "5px"
  tight: "6px"
  row: "16px"
  control: "28px"
  plate: "48px"
  section: "64px"
components:
  plate-field:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.plate}"
  plate-field-night:
    backgroundColor: "{colors.signal-deep}"
    textColor: "{colors.stencil}"
  button-primary:
    backgroundColor: "{colors.signal-day}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.plate}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.signal-lit}"
    textColor: "{colors.stencil}"
  button-primary-night:
    backgroundColor: "{colors.signal-night}"
    textColor: "{colors.ink}"
  button-primary-on-field:
    backgroundColor: "{colors.signal-field}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.concrete}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.plate}"
    padding: "12px 24px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "6px 10px"
    typography: "{typography.label}"
  tag-live:
    backgroundColor: "transparent"
    textColor: "{colors.signal-day}"
    rounded: "{rounded.plate}"
    padding: "6px 10px"
  status-lamp:
    backgroundColor: "{colors.signal-day}"
    textColor: "{colors.signal-day}"
    rounded: "{rounded.plate}"
    size: "8px"
  status-lamp-on-field:
    backgroundColor: "{colors.signal-field}"
    textColor: "{colors.stencil}"
    size: "8px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "12px 14px"
  card-plate:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "0px"
  rail-nav:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.plate}"
    height: "56px"
---

# Design System: Jade Atyla L. Madigal — Asset Tag

## Overview

**Creative North Star: "The Asset Plate"**

This is not a portfolio arrangement wearing a colour scheme. It is the graphic language of Philippine utility and municipal signage — meter boxes, pole tags, panel schedules — applied to a person. The claim the product makes is that Jade *is* the infrastructure a business runs on, so the surface is built out of the materials infrastructure is labelled with: enamel plates that own whole regions of ground, stencil paint for field names, 1px rules that measure rows, and stamped bolt marks that say the plate is fixed to something rather than floating.

The committed colour is signal orange, and it is not arbitrary. In the utility marking code, orange marks communication and signal lines — the layer this person builds and keeps alive. That is the whole rationale; the colour is a legend entry, not a mood. It behaves as a material: it fills the rail, the identity plate, the footer maker's plate, and the one lit schedule row, and it is never spent on a word, an icon tint, or a border accent.

Density is the record, not the page. Information arrives as field rows — a condensed stencil label in a fixed 9.5rem column, the value beside it, a hairline rule between. Hierarchy is produced by three things only: how big the plate is, what ground colour it carries, and where the rules fall. It is never produced by expressive type, because there is only one typeface and it is an engineering face. Light is the primary read — these plates live outdoors, and the day plate is the design. Night is the same plates under sodium light: the orange deepens, the ground goes asphalt, the ink goes stencil white. It is not a neon inversion. The confirmed rejections are the developer-portfolio kit itself: greeting hero, skills grid, badge-covered project cards, glass, glow.

**Key Characteristics:**
- Zero radius, zero shadow, zero gradient, zero backdrop-filter — anywhere, at any state
- Signal orange owns whole regions as ground via `.plate-field`, and is never used as an accent
- The signal does exactly two jobs: live status and the primary action
- One signal, three readings — one per ground, resolved through `--plate-signal`
- One typeface, two width settings — 88% condensed for labels, 118% expanded for plate display
- 1px rules and 5px bolt marks are the only chrome; every mark is drawn, never a font glyph
- Motion is luminance only; nothing translates, scales, or slides

## Colors

A committed orange field against a deliberately neutral two-ground palette, with a single dark caution tone held in reserve for failure.

### Primary
- **Signal Orange** (`{colors.signal}`): The committed field. It fills entire regions — the bolted top rail, the identity plate, the footer maker's plate, section title blocks, and the one lit schedule row — through the `.plate-field` class and its `--plate-field` alias. It is a *surface*, never a text colour on neutral ground, never a border accent, never a highlight.
- **Signal Deep** (`{colors.signal-deep}`): The night value of the same field. Under `html.dark`, `--plate-field` resolves here; it is also the ground of the open mobile index panel.
- **Signal Lit** (`{colors.signal-lit}`): The hover value of the primary action fill, and the scrollbar-thumb hover.

### Secondary
The signal read as a mark rather than a ground. These are not three accent colours; they are one signal with one reading per ground, and code never picks between them directly — it reads `--plate-signal`.

- **Signal Day** (`{colors.signal-day}`): The signal read against concrete. Live lamps, live tag strokes and text, and the primary action fill on neutral ground.
- **Signal Night** (`{colors.signal-night}`): The signal read against asphalt. Same three jobs; also the night caret and `accent-color`.
- **Signal Field** (`{colors.signal-field}`): The signal read against the orange field itself. It is the lamp square, the selection background, and the focus outline. It is a graphic-object colour and is never used for type.

### Tertiary
- **Caution** (`{colors.caution}` day / `{colors.caution-night}` night, via `--plate-caution`): Errors and destructive states only — invalid field strokes, error stencil text, failed-submit lamps. Two readings for the same reason the signal has three: a red dark enough to carry on concrete (11.14:1) collapses on asphalt, so night takes a lighter red (7.21:1). Both are held clearly redder than the signal so neither can be mistaken for live status.
- **Signal hover** (`{colors.signal-hover-day}` / `{colors.signal-hover-night}` / `{colors.signal-hover-field}`, via `--plate-signal-hover`): The primary action's hover fill. It darkens on a light ground and brightens on a dark one, so the label keeps its contrast in both directions rather than washing out at one end.

### Neutral
- **Concrete** (`{colors.concrete}`) / **Concrete Dim** (`{colors.concrete-dim}`): The day ground (`--plate-ground`) and its recessed variant. A true neutral grey — deliberately not cream, so nothing on the page reads as warm paper competing with the field.
- **Asphalt** (`{colors.asphalt}`) / **Asphalt Deep** (`{colors.asphalt-deep}`): The night ground and its recessed variant.
- **Ink** (`{colors.ink}`) / **Ink Dim** (`{colors.ink-dim}`): Day reading text and its secondary weight (`--plate-ink`, `--plate-ink-dim`). Ink is also the text colour that sits on the night and field readings of the signal.
- **Ink Dim Night** (`{colors.ink-dim-night}`): The secondary text weight on asphalt. Warm enough to belong to the orange world without gaining chroma.
- **Stencil** (`{colors.stencil}`) / **Stencil Dim** (`{colors.stencil-dim}`): Paint colour for text on the orange field, and the night reading text. Consumed as `--plate-field-ink` / `--plate-field-ink-dim` and, inside `.plate-field`, as `--plate-ink` / `--plate-ink-dim`.
- **Rule Day** (`{colors.rule-day}`) / **Rule Night** (`{colors.rule-night}`): The 1px measured rule and the scrollbar thumb, per theme, via `--plate-rule`. Inside the field the rule becomes stencil at 22%.

### Named Rules

**The Two Jobs Rule.** The signal has exactly two jobs: live status and the primary action. If a proposed signal-coloured element is neither a live indicator nor the one action the surface is asking for, it is not orange. Audit test: count the signal-coloured elements in a viewport; every one must be answerable as "this is live" or "this is the action."

**The Hottest-Against-Its-Ground Rule.** There is one signal, and it has one reading per ground: day on concrete, night on asphalt, field on the orange field. Always the hottest legible value against the ground it sits on. Components never name a reading directly — they read `--plate-signal`, and the ground supplies the value. Three hex codes in the palette are not permission for three accent colours.

**The Lamp Carries The Colour Rule.** On the orange field the lamp square is Signal Field (3.86:1 as a graphic object, above the 3:1 floor) while its status *label* goes stencil white through `--plate-signal-label` (5.22:1). The bright field signal is legible as an 8px square and not as 11px stencil type, so the colour rides the object and the words ride the ink. Never set the field reading as text.

**The Ground, Not Accent Rule.** Signal orange is applied as a region ground and never as an accent. An orange word, an orange icon, an orange underline, or an orange border on a neutral plate is out of system. Regions take the field by adding `.plate-field`, which re-points `--plate-ink`, `--plate-ink-dim`, `--plate-rule`, `--plate-signal` and `--plate-signal-label` for everything inside it — so a component dropped into a field re-reads itself without a single override.

**The Same Plates Rule.** Night is the day plates under a different light. Themes swap through the `--plate-*` semantic aliases and nothing else; no token gains chroma, and no element gains a glow, in the dark theme.

**The Lamp States Rule.** A circuit lamp carries its state in FORM first and colour second: **lit** is a solid square, **faulted** is a hollow square struck through corner to corner, **unwired** is an empty holder, and **checking** is a solid square at 60% pulsing on the luminance keyframe. Form leads because the healthy colour here is the brand orange, and a red fault lamp sits too close to it to be told apart at 8px — measured at 1.37:1 on the day ground and 1.34:1 at night, where both lamps must be bright to read at all. Colour alone could not carry this distinction, so it does not have to.

**Live, Not Labelled.** Status on this site is measured, never asserted. The panel reads `/api/status`, which probes each system's real URL server-side and reports what came back. A circuit with no answer yet reads *Checking*; a circuit whose probe failed reads *Down*; a circuit with no public endpoint says so. If the probe endpoint itself is unreachable the panel reads *No reading* — it never falls back to a hardcoded "In service", because a status that cannot fail is decoration.

**The Two Readings Rule.** Any colour that must carry *text* on more than one ground gets one value per ground, resolved through a `--plate-*` alias — never a single hex asserted everywhere. This is why the signal has three readings and caution has two. A one-value colour is only safe where it sits on exactly one ground. The blue system this replaced failed precisely here: its single amber measured 5.34:1 on the plate and 1.78:1 on the light ground, and shipped.

**The Legend Rule.** Orange is here because the utility marking code assigns orange to communication and signal lines. If a future colour question has no answer in the legend, the answer is a neutral.

### Contrast Floors

Every pairing was measured before it shipped. The system holds to: **4.5:1 for all body and label text** (day ink 14.93:1, day dim ink 5.77:1, night stencil 16.71:1, night dim ink 9.78:1, stencil on field 5.22:1, stencil-dim on field 4.64:1, stencil on the night field 7.92:1); **4.5:1 for signal text on a page ground** (day 5.31:1, night 8.61:1); **4.5:1 for an action fill against its own label** (day 6.09:1, night 8.83:1, on-field 12.66:1); and **3:1 for graphic objects** — lamps, strokes, focus rings (field lamp 3.86:1, night-field lamp 5.85:1). Caution is validated on the day ground at 7.29:1.

## Typography

**Display Font:** Archivo Variable, width axis enabled (with system-ui, sans-serif)
**Body Font:** Archivo Variable — the same family
**Label Font:** Archivo Variable at 88% width — the same family

**Character:** One engineering grotesque doing every job, separated only by its width axis. The wide setting reads as lettering cut into enamel; the condensed setting reads as spray stencil on a field label. Because the family never changes, nothing on the page can look art-directed — the variation is mechanical, not expressive. Every figure on the site is tabular (`font-variant-numeric: tabular-nums` on body), so dates, counts, and record numbers align down a column.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 8.2vw, 5.5rem)`, 0.94 line-height, -0.025em, width 118%): The `.plate-display` treatment. The asset name on the identity plate and the maker's-plate name in the footer. Uppercase.
- **Headline** (700, `clamp(2rem, 6vw, 4.25rem)`, 0.94 line-height, width 118%): Plate lettering inside section views.
- **Title** (500, `clamp(1rem, 2.4vw, 1.6rem)`, snug): Field values that carry weight — the role line, the location line.
- **Body** (400, 15px, relaxed): Record values and prose. There is exactly one body step; measure is capped between 36ch and 64ch depending on column, with 60–64ch the standard reading width.
- **Label** (600, 0.6875rem, 0.14em tracking, uppercase, width 88%): The `.stencil` treatment. Every field name, nav item, tag, status readout, and footer line. This is the highest-frequency type role in the system.

### Named Rules

**The One Face Rule.** One family, two width settings. Hierarchy comes from plate size, ground colour, and rules — never from a second typeface, an italic, a script, or a decorative weight.

**The Stencil Label Rule.** Every field name is `.stencil`: 88% width, 600, uppercase, 0.14em, 0.6875rem. Labels are never sentence case, never body weight, and never larger.

**The One Body Step Rule.** Reading text is 15px. There is no 13px or 14px off-ramp for dense areas; if a block feels crowded, cut it or give it a column, don't shrink it.

**The Tabular Figure Rule.** All numerals are tabular. Counts, years, and record totals must align vertically wherever they stack.

## Layout

A single measured column of plates on an `86rem` max-width container with `16px` gutters at mobile and `24px` from `sm` up. Inside that container every region is bounded left and right by a 1px rule (`border-x`), so the page reads as one continuous plate edge running its full height rather than as a stack of separate cards.

Region padding steps `16px → 32px → 48px` across mobile / `sm` / `lg`, with `40px` to `64px` of vertical breathing inside a section body. The record row is the atomic unit: a `grid-cols-[9.5rem_1fr]` two-column grid from `sm` up (collapsing to a single stacked column on mobile), `24px` column gap, `6px` row gap, `16px` vertical padding, and a `border-top` hairline. Section headers are a measured strip — field name left, reading right — at `14px` vertical padding, closed by a rule.

The bolted top rail is fixed at `56px` and carries the field ground; every section sets a matching `56px` scroll margin so anchored navigation lands below it rather than under it. The rail collapses its nav into a stencil "Index" panel below `md`. Mid-range Android portrait is the assumed primary case, so every grid declares its mobile single-column state first.

## Elevation & Depth

**This system has no shadow vocabulary at all.** There is no `box-shadow`, no `drop-shadow`, no `backdrop-filter`, and no gradient anywhere in the built stylesheet or in any component — verified across `src/`. Depth is entirely material: a region is *in front* because its ground is the orange field and the surrounding ground is concrete, or because a 1px rule closes it. The bolt mark — a 5px square of `currentColor` at 32% opacity, inset 8px at each of the four plate corners — is the system's only depth signal, and it signals the opposite of elevation: it says the plate is fixed down, not floating.

Motion is luminance and nothing else. Two keyframes exist: `lamp` (opacity 1 → 0.45 → 1 over 3.2s, infinite) for live indicators and for the button loading strip, and `ink` (opacity 0.35 → 1 over 0.5s) for entrance. Entrance begins from an already-visible 0.35 opacity, so content is legible before the animation resolves and nothing pops in. Everything eases on `cubic-bezier(0.22, 1, 0.36, 1)`. Colour transitions run 200–250ms. `prefers-reduced-motion: reduce` is honoured globally by clamping every animation and transition to 0.01ms and disabling smooth scroll.

### Named Rules

**The Flat Plate Rule.** No shadow, no gradient, no glass, no glow — at rest or in any state. If a surface needs to separate from another surface, change its ground or draw a rule.

**The Luminance-Only Rule.** Things light and dim. Nothing translates, scales, rotates, or bounces. A proposed motion that changes an element's position or size is out of system.

## Shapes

Every corner in the system is square. `--radius-plate` is defined as `0px` and it is the only radius token; there is no `sm`/`md`/`lg` ladder to reach for. This applies without exception to buttons, tags, inputs, cards, avatars, image frames, and the focus outline.

The form vocabulary is four shapes. The **field** (`.plate-field`) is the system's region primitive: a block that takes the committed orange as its ground and re-points its own ink, rule, signal and signal-label variables so every descendant re-reads itself against the new ground. The **plate** is a region bounded by 1px rules, filled with a ground or left transparent. The **rule** is a 1px `--plate-rule` hairline, exposed as `.rule-t` / `.rule-b`, used to separate rows and close headers. The **bolt** is a 5px `currentColor` square at 32% opacity, inset 8px from a plate corner, always in sets of four. Borders are always exactly 1px. Fills are for grounds and for the primary action only — a tag, a badge, and an input are stroke-and-text, never filled.

## Components

### The Field (signature region primitive)
`.plate-field` is how a region takes the committed colour. It sets the orange ground and stencil colour, then re-points five variables for its whole subtree: `--plate-ink` and `--plate-ink-dim` to stencil, `--plate-rule` to stencil at 22%, `--plate-signal` to the field reading, and `--plate-signal-label` to stencil. Buttons, lamps, tags, record rows, and nav cells dropped inside it re-read correctly with no variant prop and no `dark:` override. It carries the top rail, the identity plate, section title blocks, the footer maker's plate, the project-detail header, and the single lit schedule row.

### Buttons
- **Shape:** Square (0px), stencil caps at 0.12em tracking, bold.
- **Primary:** `--plate-signal` fill with `--plate-signal-ink` text, so it resolves per ground automatically; hover lifts to Signal Lit. This is the only filled button in the system and there is at most one per surface.
- **Secondary:** Ink-stroked, transparent; hover inverts to ink ground with the page ground as text.
- **Outline:** Rule-stroked and transparent; hover darkens the stroke to ink. Used beside the primary action.
- **Ghost:** Dim ink text, no stroke; hover resolves to full ink.
- **Sizes:** `xs` 11px / 12×6px, `sm` 11px / 16×8px, `md` 12px / 24×12px, `lg` 14px / 28×14px.
- **Loading:** A 2px `currentColor` strip pinned to the button's bottom edge running the `lamp` keyframe — a lamp on the plate edge, not a spinner.
- **Focus:** The global 2px Signal Field outline at 2px offset.
- **Disabled:** 45% opacity, pointer events off. No colour change.

### Chips
- **Style:** `.stencil` text inside a 1px stroke, 10×6px padding, no fill, square. Four tones: default (rule stroke, ink text), accent (ink stroke, ink text), live (`--plate-signal` stroke and text), muted (rule stroke, dim ink).
- **State:** Live is the only tone that may take the signal, and only when the record it labels is actually in service.

### Cards / Containers
- **Corner Style:** Square (0px).
- **Background:** Transparent by default; a container gets a ground only when it is a full region plate (the field or the page ground).
- **Shadow Strategy:** None — see Elevation & Depth.
- **Border:** A single 1px `--plate-rule` frame.
- **Internal Padding:** Zero on the frame itself; content supplies the `16 / 32 / 48px` step.

### Inputs / Fields
- **Style:** Transparent ground, 1px rule stroke, 14×12px padding, 15px ink text, square. Labels are `.stencil` in dim ink, 8px above the field. Placeholders use dim ink.
- **Focus:** The stroke darkens from rule to full ink; the global focus ring supplies the visible state. No glow, no ground change.
- **Error:** Stroke swaps to Caution and a `.stencil` caution message appears 8px below, wired through `aria-describedby`.

### Navigation
- **Style:** A fixed 56px `.plate-field` rail with a stencil wordmark at left and stencil nav items at right, each separated by a 1px left rule so the nav reads as a run of adjacent plate cells rather than as floating links.
- **States:** Default dim stencil; hover resolves to full stencil; active takes a 14% ink wash behind full stencil text. No underline, no indicator bar, no pill.
- **Mobile:** Below `md` the items collapse behind a stencil "Index" toggle that opens a full-width panel of stacked rule-separated rows on Signal Deep.

### Record Row (signature)
The system's only list primitive and the shape everything else defers to: a stencil field name in a fixed 9.5rem label column, the value beside it, closed by a 1px top rule. The identity plate's field row is the same primitive on the orange field, inheriting stencil ink and the 22% stencil rule from `.plate-field`. Spec rows, contact details, education entries, and project metadata are all this one row — the system has no second list style.

### Status Lamp (signature)
An 8px `--plate-signal` square running the `lamp` keyframe beside a `.stencil` readout in `--plate-signal-label`, at 10px gap. On a neutral ground the label matches the lamp; on the orange field the lamp goes bright and the label goes stencil white. Off-state drops to `currentColor` at 30% with dim text and no animation. This is the single element that carries "live" across the whole site — the identity plate's availability, a project's in-service flag, a journey milestone's current marker.

### Mark (icon set)
Every arrow, close and external-link mark on the site is drawn in-system: a 16px viewBox, `currentColor` stroke at 1.6, square linecaps, `1em` box, `aria-hidden`. Five directions — up, down, back, external, close — matching the accordion mark and the journey station geometry. No font glyphs, no icon package, no `<img>`: a typographic arrow belongs to the text face and drifts in weight and alignment against the type around it, which is exactly what this set exists to prevent.

## Do's and Don'ts

### Do:
- **Do** build every region as a plate: bounded by 1px `--plate-rule` hairlines, square, with the ground doing the separating.
- **Do** take the committed colour by adding `.plate-field` to a region, and let its descendants re-read themselves through the re-pointed variables.
- **Do** consume colour through the `--plate-*` semantic aliases so a component themes correctly in day, night, and field without a `dark:` variant or a tone prop.
- **Do** reserve the signal for live status and the primary action, and use at most one primary action per surface.
- **Do** let the lamp carry the colour and the label carry the ink whenever the signal sits on the orange field.
- **Do** use `.stencil` for every field name, nav item, tag, and status readout — 88% width, 600, uppercase, 0.14em.
- **Do** hold 4.5:1 for all text, 3:1 for graphic marks, and measure the pairing before shipping a new one.
- **Do** set numerals tabular and let counts and years align down their column.
- **Do** start every entrance animation from a legible 0.35 opacity, and animate opacity only.
- **Do** keep browser-drawn surfaces in the system: themed selection, caret, accent-color, scrollbar, and a 2px square focus ring at 2px offset.
- **Do** draw new marks into the `Mark` set at 1.6 stroke with square caps.
- **Do** design the day plate first and treat night as the same plates under a different light.

### Don't:
- **Don't** introduce a border radius. `--radius-plate` is `0px` and there is no other radius token.
- **Don't** add a box-shadow, drop-shadow, gradient, glass, or backdrop-filter — the built system contains none at any state.
- **Don't** treat the three signal values as three accent colours or pick one by hand; read `--plate-signal` and let the ground decide.
- **Don't** set Signal Field as type. It is a graphic-object colour: lamps, rings, selection.
- **Don't** let the signal decorate anything: no orange headings, dividers, hover washes, icon tints, or secondary buttons.
- **Don't** use signal orange as an accent on a neutral plate — it is a region ground only.
- **Don't** warm the page ground toward cream. Concrete and asphalt are neutral so the field stays the only chromatic surface.
- **Don't** lighten Caution toward the signal; its darkness is what keeps an error from reading as live.
- **Don't** add a second typeface, an italic, or a decorative weight to create hierarchy; change plate size, ground, or rules instead.
- **Don't** add a smaller body step to fit more in. Reading text is 15px.
- **Don't** animate position or size. Nothing slides, floats, scales, or bounces.
- **Don't** hide scrollbars — they are an affordance, and are themed rather than removed.
- **Don't** use a font glyph, icon font, or icon package for a mark; extend the drawn `Mark` set instead.
- **Don't** ship third-party vendor logos or any runtime external image dependency.
- **Don't** fill a tag, badge, or input — those are stroke-and-text.
