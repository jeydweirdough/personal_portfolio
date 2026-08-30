# Jade Atyla L. Madigal — Personal Portfolio

My portfolio website as a System & Web Developer and IT Support at Getmeds Philippines Inc., showcasing my background, skills, work experience, and project work.

**Live site:** https://jade-atyla-portfolio.vercel.app/

## About This Site

- **Home** — introduction, current status, and quick links to socials
- **About** — bio, core strengths, and technical skills (Frontend, Backend, Database, IT Support & Networking, AI Management, WordPress & Inventory Management)
- **Journey** — a timeline of how I got here, from starting Computer Science in 2022 to developing systems today
- **Education** — academic background at Cavite State University
- **Experience** — work history at Getmeds Philippines, from IT support into system and web development
- **Projects** — a showcase of built projects, each with description, tech stack, and links to a live demo and repository
- **Contact** — a way for visitors to get in touch, plus links to GitHub, LinkedIn, Viber, and WhatsApp

## Project Structure (High Level)

```
public/          → images, docs, and static assets used across the site
src/views/       → About, Journey, Projects, Project Details, and Contact sections
src/components/  → shared UI pieces (navbar, footer, cards, etc.)
src/data/        → site content (profile, education, experience, projects, socials, FAQ)
```

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

To lint and build in one step:

```bash
npm run check
```

## Deployment

The site is deployed and hosted on **Vercel**, and updates to the codebase are automatically published when changes are pushed.

## Ownership

This project is the personal portfolio of **Jade Atyla L. Madigal**.

## License

This project is proprietary. All rights reserved — no copying, reuse, or distribution is permitted without written permission. See [LICENSE](./LICENSE) for details.
