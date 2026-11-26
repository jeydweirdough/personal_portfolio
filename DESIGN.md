---
name: Jade Madigal Portfolio
description: A resume that became a website, set in one typeface with one pine accent.
colors:
  background: "#ffffff"
  surface: "#f3f5f4"
  foreground: "#17201d"
  muted: "#53605b"
  line: "#dce2df"
  edge: "#7e8b86"
  accent: "#1d5a4b"
  accent-hover: "#143f35"
  on-accent: "#ffffff"
  field: "#1d5a4b"
  on-field: "#ffffff"
  field-muted: "#c9ddd6"
  background-dark: "#111513"
  surface-dark: "#191e1c"
  foreground-dark: "#e7ecea"
  muted-dark: "#a3aeaa"
  line-dark: "#2b3330"
  edge-dark: "#6c7975"
  accent-dark: "#8fc7b5"
  accent-hover-dark: "#b0dccd"
  on-accent-dark: "#10211c"
  field-dark: "#17362e"
  on-field-dark: "#f1f6f4"
  field-muted-dark: "#b4cdc5"
typography:
  display:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  display-compact:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  page-title-compact:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  headline-compact:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  statement:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.375
  statement-compact:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
  subhead:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
  lead:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.556
  body:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-compact:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
  action:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.625
  label:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "6px"
  media: "8px"
spacing:
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "28px"
  "8": "32px"
  "10": "40px"
  "11": "44px"
  "12": "48px"
  "16": "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "8px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    textColor: "{colors.foreground}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "8px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  button-field:
    backgroundColor: "{colors.on-field}"
    textColor: "{colors.field}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "8px 20px"
  button-field-hover:
    backgroundColor: "{colors.field-muted}"
  button-field-outline:
    textColor: "{colors.on-field}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "8px 20px"
  text-link:
    textColor: "{colors.accent}"
  text-link-hover:
    textColor: "{colors.accent-hover}"
  site-header:
    backgroundColor: "{colors.background}"
    height: "64px"
  project-row:
    padding: "24px 0"
  tech-tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "4px 10px"
  architecture-step:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "12px"
  contact-field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-field}"
---

# Design System: Jade Madigal Portfolio

## Overview

**Creative North Star: "A resume that became a website"**

The site reads like a resume: clean, professional, medium density, experience before proof. Section titles sit in a left column, content sits on the right, and lists are rows separated by thin rules.

It is the standard portfolio format played straight. Public Sans does all the type work, pine is the only accent, and a solid pine band closes the home page.

**Key Characteristics:**

- One typeface, with hierarchy from size and weight.
- Neutral ground, one accent, light and dark following the system.
- Title column, content column, rows with rules.
- Flat, with slightly rounded controls and media.
- One authored entrance, plus the tech stack carousel.

The tokens above are normative and mirror `src/app/globals.css`. Change both together.

## Colors

Green-tinted neutrals with one pine accent. Every token has a `-dark` pair. In code the name stays the same and `prefers-color-scheme` swaps the value, so components never pick a theme. There is no theme switch.

### Primary

- **Pine** (`accent`, `accent-hover`, `on-accent`): primary buttons, links, the catchphrase, "Present", project-row arrows, focus rings, selection. It is deep on light and pale on dark, so the text on it flips.
- **Pine Field** (`field`, `on-field`, `field-muted`): the closing Contact band and the band on the social image. It stays deep in both themes. `field-muted` is for secondary text and outlines on it.

### Neutral

- **Ground** (`background`): page, header and mobile menu. White or green-black.
- **Surface** (`surface`): tags, architecture steps, portrait slot, secondary hover.
- **Ink** (`foreground`): headings and body.
- **Muted Ink** (`muted`): metadata, supporting text, resting navigation.
- **Hairline** (`line`): dividers and non-interactive borders. Decorative contrast only.
- **Edge** (`edge`): outlined controls, list markers, the hero rule. At least 3:1 on ground and surface.

### Named Rules

**The One Accent Rule.** Pine is the only accent. Everything else in the interface is a neutral; screenshots and third-party logos keep their own colors.

**The Two Pines Rule.** Use `accent` for marks and controls on the ground and `field` for a solid band. They match in light and differ in dark, so they are not interchangeable.

## Typography

**Font:** Public Sans through `next/font`, with Arial and sans-serif as fallback. The social image uses the bundled 400, 600 and 700 files.

**Character:** plain and legible. Weight 700 is for names, page titles and section titles, 600 for subheads and actions, 500 for tags and diagram steps, 400 for reading.

### Hierarchy

| Role | Use | Responsive behavior |
| --- | --- | --- |
| Display | Name in the hero | `display-compact`, then 48px at `sm`, 44px at `md`, `display` at `lg` |
| Page title | H1 on inner pages | `page-title-compact`, then `page-title` at `md` |
| Headline | Home section H2 | `headline-compact`, then `headline` at `md` |
| Statement | Catchphrase, one sentence per line | `statement-compact`, then `statement` at `lg` |
| Subhead | H2 inside case studies and articles | Fixed |
| Title | Row and item headings | Fixed. Minor headings use body size at 600 |
| Lead | Page summaries, Contact opening | Fixed |
| Body | Reading text | `body-compact` for FAQ answers and the phone introduction |
| Action | Buttons | Fixed |
| Label | Metadata, navigation, captions, field labels | Fixed, sentence or title case |

Headings use balanced wrapping and paragraphs use pretty wrapping. Dates use tabular numerals. Measures are 58ch for the hero introduction, 60-62ch for leads, 68ch for long text and 32ch for a line under a section title.

### Named Rules

**The One Family Rule.** Public Sans sets everything, technical content included.

## Layout

- **Container:** 72rem maximum, centered, with 20px gutters and 32px from `md`. Articles use 48rem.
- **Breakpoints:** Tailwind defaults: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem.
- **Section:** one column, then 12 at `lg`: title and optional line in 4, content in 8. Column gap 32px, row gap 28px.
- **Hero:** one column, then 7 and 5 at `md`. The 4:5 portrait is capped at 19rem and aligned right, which reads narrower than its five columns. Four facts sit under the rule, in two columns on phones and four from `md`.
- **Phones:** actions precede the introduction. The empty portrait slot is hidden; a real photo becomes an 80px image above the name.
- **Rows:** stack, then split 5:7 at `sm`. Experience uses a 10rem date column.
- **Case study:** header over a rule, then facts in 4 columns and narrative in 8 at `lg`.
- **Rhythm:** a 4px base. Sections have 32px above and 48px below, then 44px and 64px at `md`; the pine band is 48px, then 64px on both sides. Rows use 16-28px, case-study blocks are 40px apart.
- **Header:** sticky and 64px. Anchor jumps clear it with matching scroll padding.

## Elevation & Depth

There are no shadows, gradients or blur. Rules separate content, `surface` marks small contained items and the pine band marks the close. The sticky header and open menu are opaque with a bottom hairline.

### Named Rules

**The Flat Rule.** State changes use color, border or underline. Nothing lifts.

## Shapes

- **Controls (6px):** buttons, tags, architecture steps.
- **Media (8px):** portrait slot and screenshots. Screenshots also take a hairline border.
- **Square:** header, rows and the pine band.
- **Rules:** 1px. `line` divides content and `edge` draws the hero rule.
- **Icons:** inline SVG through the shared `Icon` component, 18px, 1.75 stroke, round caps. The set is arrow and download. Tech logos are separate unmodified files in `public/tech`, 32px, beside their names.

## Components

### Buttons

- At least 44px high, 1px border, 8px icon gap. Horizontal padding tightens in the header and in the phone hero.
- **Primary:** filled pine, darker on hover in light and lighter in dark. Download Resume is primary and comes first.
- **Secondary:** transparent with an `edge` border. Hover takes an ink border and surface fill.
- **On pine:** the filled button is `on-field` with `field` text and hovers to `field-muted`. The outlined one has a `field-muted` border, and hover brightens it and underlines the label.

### Links

Pine with a 1px underline, 4px offset, at least 24px high. Hover changes color and thickens the underline to 2px. On pine they use `on-field` or `field-muted`.

### Navigation

- **Header:** name, muted 14px links that turn to ink on hover, outlined Resume button. Links are at least 44px high.
- **Below `lg`:** a native `details` Menu button opens a full-width opaque list. It works without JavaScript; selection and Escape close it when JavaScript runs.
- **Breadcrumbs:** small links with slash separators and the current page in ink.
- **Footer:** hairline, name and titles left, links right from `md`.

### Section

One H2 and an optional muted line on the left, content on the right, hairline on top. Reuse `Section` for home sections. Its inverse form is the pine band, without the hairline.

### Rows

- **Project:** name and context, then summary and up to four technologies, arrow at top right. The whole row links; hover turns the name pine.
- **Experience:** dates, then role, company, summary and bullets.
- **Expertise and principles:** term left, explanation right.
- **FAQ:** always expanded, two columns from `sm`.

### Case-study pieces

- **Facts:** muted label over a semibold value.
- **Tags:** surface fill, no border, not interactive. Used for the technology stack; rows use comma-separated text.
- **Architecture:** bordered surface steps joined by arrows, vertical on phones and horizontal from `md`.

### Portrait slot

A 4:5 surface with a silhouette in `line` until a photo is set in `src/data/portrait.ts`. The photo crops to cover.

### States and motion

- Focus is a 2px outline at 3px offset: pine on the ground, light ink on pine. It must contrast with the ground around the control.
- With no reduced-motion preference, links and Menu change color over 150ms ease-out, scrolling is smooth and the hero rule draws in once over 900ms with `cubic-bezier(0.16, 1, 0.3, 1)`. Under reduced motion all three are off.
- The tech stack at the top of Expertise loops linearly over 55s. It pauses on hover and has no pause button. Under reduced motion and in print it is a static wrapped list.

## Do's and Don'ts

### Do:

- **Do** use semantic tokens so both themes work, and define both values for any new token.
- **Do** build new sections with the title column and content column, and lists as ruled rows.
- **Do** keep the resume action filled and first in the hero and in closing action groups.
- **Do** keep text at 4.5:1, control borders at 3:1 and focus visible on every ground.
- **Do** reuse the `Icon` stroke style for any new icon.

### Don't:

- **Don't** turn projects, skills or experience into card grids. Tags and diagram steps are the small contained exceptions.
- **Don't** add decorative developer tropes. Arrows, diagrams and stack names that carry information belong here.
- **Don't** add a second accent or typeface.
- **Don't** add shadows or another animation beyond the hero rule and the tech stack carousel.
- **Don't** replace the portrait slot with a stock or generated person.
