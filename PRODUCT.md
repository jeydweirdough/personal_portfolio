# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: prospective freelance and project clients.** A business owner, operations lead, or office manager with a concrete problem — no website, an internal process still running on manual spreadsheets, hardware and networks that keep breaking — deciding whether Jade is the person to hire for it. Typically non-technical or semi-technical. They are evaluating *trust and capability*, not code style. They will not read a stack list and know what it means.

**Secondary, reachable but not designed for:**
- Recruiters and hiring managers — must be able to find and download the resume, but the site is not optimized for them. Jade is employed and is not job hunting.
- Fellow developers — must be able to reach the public repos to verify the work is real. Two GitHub accounts are linked: personal (`jeydweirdough`) and the company account (`backenddepartment`), which is public and hosts the Bishnoi repos.

## Product Purpose

A personal portfolio whose job is to turn a cold visitor into an inquiry.

Success is a prospective client arriving without prior context and reaching out — via the contact route, Viber, WhatsApp, or email. Not a resume archive, not a credential wall, not a job-search asset.

## Positioning

**Runs the systems a business depends on.**

Jade covers *building* and *keeping alive* as a single capability: builds internal systems and web content, and maintains the hardware, software, and networks underneath them. A freelance web developer cannot truthfully claim the operations half. An IT support contractor cannot claim the build half. The proof is one continuous employment story at Getmeds — support first, then development on top of it — not two unrelated skill lists sitting side by side.

This is the claim the site must make legible to a non-technical buyer, because it is the one a neighboring portfolio cannot copy.

## Operating Context

- **Contact happens on messaging apps.** Viber and WhatsApp are primary channels in the Philippine market; email is secondary. Contact must survive on mobile.
- **Location:** Bacoor, Cavite. Audience is local and regional PH clients plus remote work.
- **Devices:** assume mid-range Android on variable connections as the realistic primary case, not desktop.
- **Content is data, not markup.** All site content lives in JSON under `src/data/` (profile, education, experience, journey, projects, socials, faq). Future work must keep content editable there rather than hardcoding it into components.
- **Deployment:** Vercel. Live at https://jade-atyla-portfolio.vercel.app/

## Capabilities and Constraints

- Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. Node >= 20.19.
- **One server route: `GET /api/status`.** Probes each project's real `demoUrl` server-side and returns status plus round-trip time, edge-cached 5 minutes (`s-maxage=300, stale-while-revalidate=900`). Only URLs from the committed data file are probed. The panel schedule, the hero tally and the record sheet all read it, so live status is measured rather than claimed — and a failure is shown rather than hidden. The rest of the site remains statically prerendered.
- Light and dark themes are both shipped and must both survive any visual change.
- Existing surfaces: Home, About, Journey, Education, Experience, Projects, Project Details, Contact.
- Resume PDF served from `/docs/Resume_Jade_Atyla_Madigal.pdf`.

**Open / unverified — must not be treated as fact:**
- `src/data/faq.json` claims Jade's backend stack is "Node.js and PostgreSQL" and that Jade uses "Agile methodologies." Neither is corroborated by `profile.json`, `experience.json`, or the project data. Treat as unconfirmed scaffold copy pending Jade's rewrite or removal; do not build design decisions on it and do not restate the claims elsewhere.
- Getmeds internal-system screenshots are permitted but do not exist yet. Two projects (Cognify CvSU-B, Getmeds Test Creation) have no demo URL and no screenshots; the schedule shows em-dashes rather than inventing links.

## Brand Commitments

- **Name:** Jade Atyla L. Madigal. **Title:** System & Web Developer + IT Support.
- **Voice is first-person, plain, and deliberately unpolished.** The existing `journey.json` copy is the reference standard — "the year it started feeling like engineering," "not a throwaway class exercise," "what actually breaks in production." Keep it. Do not corporatize it into third-person agency prose.
- Stated personal line: "knowledge comes from challenges."
- Existing assets: `public/images/profile-avatar.png`, `public/avatar.png`, `public/images/school-logo.png`, `public/favicon.svg`, `public/mooserage_icon.svg`.
- **Orange is a pinned brand commitment (2026-09-10).** Jade asked for the site to be orange-themed and left the exact combination open. Future visual work keeps orange as the committed colour unless Jade says otherwise; the specific values live in DESIGN.md, not here.

## Evidence on Hand

**Production systems built and maintained for Getmeds Philippines Inc.** (Jade confirmed on 2026-09-10 that all four may be shown publicly, and that the role on each is *built and still maintain*):
- **getmeds.ph** — the company's public site. React + Tailwind on Vercel.
- **getmedshealthcare.com** — the export-facing site for certified pharmaceutical exports from India. WordPress/PHP on LiteSpeed.
- **bishnoi.ai** — heritage site for the Bishnoi community. Next.js static export on GitHub Pages, custom domain. Public repo: `backenddepartment/bishnoi`.
- **backenddepartment.github.io/bishnoi-omniverse** — global medical supply and specialty sourcing. Next.js static export on GitHub Pages. Public repo: `backenddepartment/bishnoi-omniverse`.

Stacks and hosts above were **fingerprinted from the live sites** (response headers plus markup markers), not supplied by Jade — they are evidence, but Jade should confirm them. Descriptions were written from the sites' own page titles and Jade's stated role; they are placeholders in Jade's voice and are his to rewrite.

**Real and verifiable:**
- **Jecati Construction Services** — a live site for a working construction business. Demo + public repo. Built during second year of university. *No screenshots captured yet.*
- **Mooserage Chatbot** — Flask + Groq (LLaMA 3.3 70B), streaming responses, Supabase persistence. Demo + repo. 4 screenshots in `public/images/`.
- **Mooserage Bank Simulator** — Flask/Python. Demo + repo. 3 screenshots in `public/images/`.
- **Cognify CvSU-B** — React, React Native, Express, Node, PostgreSQL. *No demo URL, no screenshots.*
- **Getmeds Test Creation** — *No demo URL, no screenshots.*
- **Getmeds Philippines Inc.** — IT Intern (Aug–Sept 2025), then System & Web Developer + IT Support (Jan 2025 – present). ZOHO product inventory migration, WordPress content management, internal systems, hardware/software/network support.
- **Education:** BS Computer Science, Cavite State University – Bacoor, 2022–2026, Graduate.
- **Resume PDF** on file.

**Permission:** Jade has confirmed the Getmeds internal system work may be shown in full, including screenshots and specifics. Those assets do not exist in the repo yet and must be supplied by Jade — they are a real opportunity, not something to approximate or mock up as if real.

**Absences future work must not fill by invention:** there are no client testimonials, no quotes, no metrics or performance numbers, no case-study writeups, no press, no logos of client companies, and no named references. None of these may be fabricated, placeheld with realistic-looking fakes, or implied through layout.

## Product Principles

1. **Lead with what it does for the business, not what it was built with.** The primary visitor cannot evaluate a stack list; they can evaluate an outcome.
2. **Build and keep-alive are one story.** Never split development and IT support into two disconnected sections — the combination is the entire positioning.
3. **Every claim traces to something real.** Where evidence is missing, say less rather than inventing more.
4. **Contact is never more than one action away, and it works on a phone.**
5. **First-person and plain.** The voice that already exists in the journey copy is the asset; polish must not sand it off.
