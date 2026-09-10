# Jade Atyla L. Madigal — Personal Portfolio

My portfolio website as a System & Web Developer and IT Support at Getmeds Philippines Inc., showcasing my background, skills, work experience, and project work.

**Live site:** https://jade-atyla-portfolio.vercel.app/

## About This Site

The site is built in the graphic language of infrastructure tagging — enamel
plates, stencil labels, panel schedules — because the claim it makes is that I
build and maintain the systems a business runs on.

- **Identity plate** — the record header: what I do, since when, and whether I am taking work
- **Equipment record** — bio, employment, schooling, capability, and how to reach me
- **Service history** — a line diagram from starting Computer Science in 2022 to developing systems today
- **Systems built** — every project as a numbered circuit with its real status, stack, and host
- **Record sheet** — the full detail for one system, including documentation plates
- **Service request** — the contact form, plus direct channels on GitHub, LinkedIn, Viber, and WhatsApp

Day and night plates both ship; the theme switch is in the top rail.

## Project Structure (High Level)

```
public/               → images, docs, and static assets used across the site
src/app/globals.css   → the design system: plate tokens, stencil type, browser surfaces
src/views/            → About, Journey, Projects, Project Details, and Contact sections
src/components/ui/    → plate primitives (Plate, Button, Input, Accordion, Badge, Card, TechIcon)
src/components/parts/ → footer
src/data/             → site content (profile, education, experience, journey, projects, socials, FAQ)
```

All copy lives in `src/data/*.json`. Editing the site's words never means editing
a component. `DESIGN.md` records the visual system; `PRODUCT.md` records who the
site is for and what it may claim.

## Running the Project Locally

```bash
npm install
npm run dev
```

This starts a local development server. Open the URL shown in the terminal to view the site.

To build a production-ready version of the site:

```bash
npm run build
```

To lint the project:

```bash
npm run lint
```

## Deployment

The site is deployed and hosted on **Vercel**, and updates to the codebase are automatically published when changes are pushed.

## Ownership

This project is the personal portfolio of **Jade Atyla L. Madigal**.

## License

This project is proprietary. All rights reserved — no copying, reuse, or distribution is permitted without written permission. See [LICENSE](./LICENSE) for details.
