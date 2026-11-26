# Portfolio guide

What was implemented, where to edit it, and what still has to be done by hand.

## Where to edit

| To change | Edit |
| --- | --- |
| Name, titles, hero copy, biography, quotes, contact links | `src/data/profile.ts` |
| Navigation | `src/data/navigation.ts` |
| Skills | `src/data/expertise.ts` |
| Tech stack carousel | `src/data/techStack.ts`, logos in `public/tech/` |
| Work history | `src/data/experience.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Questions and answers | `src/data/faq.ts` |
| Articles | `src/data/insights.ts` |
| Site URL, home title and description | `src/lib/site.ts` |
| JSON-LD | `src/lib/schema.ts` |
| Resume | replace `public/docs/Resume_Jade_Atyla_Madigal.pdf` |
| Colors, type and corners (light and dark) | `src/app/globals.css` |
| Portrait | `src/data/portrait.ts` (instructions inside) |
| Share image | `src/app/opengraph-image.tsx` |

## Routes

| Route | Notes |
| --- | --- |
| `/` | Eight sections, recruiters first: hero, experience, expertise, projects, about, insights, FAQ, contact |
| `/projects` | Every case study |
| `/projects/[slug]` | Generated from `projects.ts` |
| `/insights` | `noindex` until the first article exists |
| `/insights/[slug]` | Generated from `insights.ts`, with Article JSON-LD |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated |

All pages are static HTML. The only client component is the mobile menu, and it works without JavaScript.

## SEO and AEO

- `pageMetadata()` gives each page its title, description, canonical URL, Open Graph and X card. Use it on every new page.
- `Person` and `WebSite` JSON-LD are on every page. `BreadcrumbList` is on subpages, `FAQPage` on the homepage, `Article` on articles.
- FAQ schema uses the same strings as the visible answers. It helps machines read the page, but doesn't guarantee a rich result.
- There is no `llms.txt`: it doesn't guarantee indexing or citation.

## Content rules

- Publish only what can be verified. Omit `outcomes` when there is nothing to verify.
- For company work, never publish hosts, addresses, customers, staff data, internal rules, incidents or roadmaps.
- State the organization and role on every project, and mention other contributors.
- Don't link private repositories.

## Before going live

- [x] Public mobile number (WhatsApp, Viber, resume): approved by Jade on 2026-11-22.
- [ ] Replace the resume. The current PDF predates graduation and the developer role.
- [ ] Get company approval for the Bishnoi One case study.
- [ ] Confirm individual roles on team projects, especially Cognify and the company websites.
- [ ] Confirm whether other jobs on the resume belong on the site.
- [ ] Make the LinkedIn titles match the site.
- [ ] Add the portrait (4:5, at least 800 x 1000 px) through `src/data/portrait.ts`.
- [ ] Add approved screenshots for the projects that have none.
- [ ] Link Getmeds Healthcare again once the site responds (HTTP 530 on 2026-11-22).
- [x] Replace the wireframe look and bracketed placeholders (2026-11-23).
- [ ] Replace the orange logo icon, or decide to keep it. Orange is no longer the brand color.

## Asset sources

| Asset | Source |
| --- | --- |
| `mooserage-chatbot-conversation.png` | Project screenshot restored from commit `f5cb68b`. Original author not recorded. |
| `bank-simulator-screen.png` | Crop of the bank simulator screenshot in commit `f5cb68b`, without the device frame. Original author not recorded. |
| `src/assets/fonts/PublicSans-*.ttf` | Google Fonts, SIL Open Font License (`OFL.txt`). Used for the share image. |
| `getmeds-website-home.png` | Screenshots of https://getmeds.ph/ taken on 2026-11-25 at 1440 x 900 and 390 x 844, with the floating chat buttons hidden. Retake after a redesign. |
| `getmeds-card-app-screens.png` | Composite of `web/img/screens/online.webp` and `offline.webp` from github.com/jeydweirdough/digital_business_id, bottom whitespace cropped. Sample data only (Juan Dela Cruz). |
| `public/tech/*.svg` | [theSVG](https://thesvg.org), commit `551229c188b4ab6e2d8b5763b9633ec91206d04c`, unmodified. Trademarks belong to their owners. |

### Adding a tech logo

1. Find the slug on thesvg.org and read that brand's own trademark rules. theSVG grants no trademark rights.
2. If the owner requires permission, add the name to `techNamesOnly` instead.
3. Otherwise save `default.svg` as `public/tech/<slug>.svg`. If it disappears on one theme, save `light.svg` as `<slug>.svg` and `dark.svg` as `<slug>-dark.svg`, and set `dark: true`.
4. Don't recolor or edit the file. Add any required attribution to Logo credits in `src/components/TechStack.tsx`.

Checked on 2026-11-23:

- Names only, because the policy restricts logo use: PostgreSQL, MySQL, Node.js, Express, Docker, GitHub Pages, Sanity, Claude, Groq, Zoho. Kotlin (its mark may not be shown without the wordmark) and GitHub Actions (GitHub rules) were added on 2026-11-25. Tesseract.js has no icon on theSVG.
- Shown under published terms: Next.js, Vercel, TypeScript, Python, Tailwind CSS, Supabase, WordPress, PHP, Linux (Tux), Android (robot, CC BY 3.0, added 2026-11-25).
- Shown without a published logo policy found, to identify the tool only: React, JavaScript, FastAPI, Flask, SQLAlchemy, Coolify, Three.js. Remove one if its owner objects.

## Search engine setup

1. In Google Search Console, add the URL-prefix property and choose the HTML tag method.
2. In Bing Webmaster Tools, choose the meta tag method (or import from Search Console).
3. In Vercel, set `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` for Production to each tag's `content` value.
4. Redeploy, verify, then submit `https://jade-atyla-portfolio.vercel.app/sitemap.xml` in both.
5. After deploying, check a page in Google's Rich Results Test and the Schema.org validator.

For a custom domain, change `SITE_URL` in `src/lib/site.ts` first.

## Checks

```
npx tsc --noEmit
npm run lint
npm run build
```

Stop `npm run dev` before building, because both write to `.next`.
