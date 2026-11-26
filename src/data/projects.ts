import type { StaticImageData } from "next/image";
import bankLogin from "@/assets/projects/bank-simulator-screen.png";
import cardAppScreens from "@/assets/projects/getmeds-card-app-screens.png";
import websiteHome from "@/assets/projects/getmeds-website-home.png";
import gettestDashboard from "@/assets/projects/gettest-dashboard.png";
import sdlcPlannerProject from "@/assets/projects/sdlc-planner-project.png";
import chatbotConversation from "@/assets/projects/mooserage-chatbot-conversation.png";

// Public case studies. Keep hosts, addresses, customers, internal rules and
// unreleased plans out of this file: everything here is published.

export type Project = {
  slug: string;
  name: string;
  context: string;
  role: string;
  /** Section on the projects page. */
  group: "work" | "team" | "freelance" | "personal";
  featured?: boolean;
  /** Card text and meta description. */
  summary: string;
  problem: string;
  solution: string;
  responsibilities: string[];
  stack: string[];
  architecture: { summary: string; layers: string[] };
  /** Only what can be checked. Omit when nothing can. */
  outcomes?: string[];
  links?: { label: string; href: string }[];
  screenshots?: { image: StaticImageData; alt: string; caption: string }[];
  related: string[];
};

const getmeds = "Getmeds Philippines Inc.";

export const projects: Project[] = [
  {
    slug: "bishnoi-one",
    name: "Bishnoi One",
    group: "work",
    context: getmeds,
    role: "Developer, with other contributors",
    featured: true,
    summary: "A modular business platform that brings CRM, inventory, and finance work under one sign-in.",
    problem:
      "When each department works in a separate tool, people juggle several accounts and enter the same information more than once. The business needed its core work connected in one system.",
    solution:
      "Bishnoi One provides one web application and one account for separate business modules. Each module owns its API and data rules, and an administration layer manages accounts and roles.",
    responsibilities: [
      "Develop application screens and backend modules.",
      "Work on the platform's module structure, sign-in, and role-based access.",
      "Deploy and maintain the platform.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Python", "FastAPI", "SQLAlchemy", "PostgreSQL"],
    architecture: {
      summary: "A single front end talks to module APIs from the server. Each API enforces its own permissions.",
      layers: ["One web application", "Shared sign-in and roles", "Business module APIs", "PostgreSQL"],
    },
    outcomes: ["Core platform, CRM, inventory, and finance modules have been deployed. Development is ongoing."],
    related: ["getmeds-ai-assistant", "getmeds-digital-business-cards"],
  },
  {
    slug: "getmeds-website",
    name: "Getmeds Website and CMS",
    group: "work",
    context: getmeds,
    role: "Built and maintained",
    featured: true,
    summary: "The Getmeds Philippines website, with an admin panel that lets employees publish their own updates.",
    problem:
      "Products, FAQs, careers, team members, and page content change often. Employees needed to update them without waiting on a developer.",
    solution:
      "The public website reads its content from a structured CMS. Employees edit that content in an admin panel, and the changes appear on the website.",
    responsibilities: [
      "Build and maintain the public website.",
      "Build the content database and the admin panel employees use.",
      "Move the customer app screens out of the website into an Android app with Capacitor, with test builds made by GitHub Actions.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Sanity Studio", "Capacitor"],
    architecture: {
      summary: "Content management is separate from presentation, so a content edit doesn't need a code change.",
      layers: ["Employee admin panel", "Sanity content database", "Next.js website"],
    },
    outcomes: ["The website is live, and employees can manage its content through the admin panel."],
    links: [{ label: "Visit getmeds.ph", href: "https://getmeds.ph/" }],
    screenshots: [
      {
        image: websiteHome,
        alt: "The getmeds.ph home page on a desktop browser and a phone, headed Life-Saving Medicines for Patients, Doctors, Pharmacies & Hospitals in the Philippines",
        caption: "The getmeds.ph home page on desktop and phone, November 2026.",
      },
    ],
    related: ["getmeds-ai-assistant", "getmeds-digital-business-cards"],
  },
  {
    slug: "getmeds-ai-assistant",
    name: "Getmeds API and AI Assistant",
    group: "work",
    context: getmeds,
    role: "Built and maintained",
    featured: true,
    summary: "A FastAPI service with an AI sales assistant grounded in company content, plus inquiry automation.",
    problem:
      "A general AI model doesn't know a company's products and can make up answers. Website inquiries also needed to reach the team without manual forwarding.",
    solution:
      "The assistant is designed to answer from the company's published products, services, and FAQs. The same API routes inquiries to email and Discord and sends a scheduled analytics digest.",
    responsibilities: [
      "Build the API and its CMS integration.",
      "Integrate the AI assistant and ground it in company content.",
      "Automate inquiry routing and daily reporting.",
    ],
    stack: ["Python", "FastAPI", "Claude API", "Sanity"],
    architecture: {
      summary: "The API retrieves relevant company content before it asks the model for an answer.",
      layers: ["Website", "FastAPI service", "Company content", "Claude API"],
    },
    related: ["getmeds-website", "mooserage-chatbot"],
  },
  {
    slug: "getmeds-digital-business-cards",
    name: "Getmeds Digital Business Cards",
    group: "work",
    context: getmeds,
    role: "Built and maintained",
    featured: true,
    summary: "Employee business cards shared by phone tap, QR code, or link, with contact pages created from card artwork by OCR and checked by a person.",
    problem:
      "A printed card can't be tapped to call or message someone, copying each employee's details by hand invites mistakes, and employees needed to share their card on the spot, even with people who have no app and no internet connection.",
    solution:
      "Each employee has a contact page. An administrator uploads the card artwork, OCR proposes the details, and a person checks them before they are applied. Employees share the card from an Android app that acts as an NFC tag, so another phone opens it with a tap, or from an installable iPhone web app. An online QR code opens the contact page, and an offline QR code carries the contact itself.",
    responsibilities: [
      "Build the employee contact pages.",
      "Build the admin workflow, OCR extraction, and human review step.",
      "Build the Android app in Kotlin, including NFC card emulation, QR codes, and saving a QR code as an image.",
      "Build the installable web app for iPhone, which works offline after the first visit.",
      "Implement app sign-in by email and password, with an emailed one-time code for first sign-in and password resets.",
      "Automate signed Android release builds with GitHub Actions, and deliver in-app updates from GitHub Releases.",
    ],
    stack: ["React", "TypeScript", "Kotlin", "NFC", "Tesseract.js", "Sanity", "Android", "Progressive web app", "GitHub Actions"],
    architecture: {
      summary: "OCR only suggests values, and a person approves them before they are saved. The apps only display and share a card, so switching a card off signs its holder out.",
      layers: ["Card artwork", "OCR and human review", "Card records", "Contact page and apps", "NFC tap, QR code, or link"],
    },
    outcomes: ["The Android app reached version 1.15.1 in November 2026, and its source code is public."],
    links: [{ label: "View the Android app source", href: "https://github.com/jeydweirdough/digital_business_id" }],
    screenshots: [
      {
        image: cardAppScreens,
        alt: "The Getmeds Card app showing a sample employee's Online ID and Offline ID QR codes side by side",
        caption: "Online ID opens the contact page on getmeds.ph. Offline ID holds the contact itself. Sample data.",
      },
    ],
    related: ["getmeds-website", "getmeds-ai-assistant"],
  },
  {
    slug: "cognify",
    name: "Cognify CvSU-B",
    group: "personal",
    context: "Capstone, Cavite State University – Bacoor",
    role: "Capstone developer",
    featured: true,
    summary: "A licensure exam preparation system for psychology students, with web, mobile, and API components.",
    problem:
      "Psychology students preparing for licensure needed review that follows the official exam coverage and reflects their own performance, instead of one reviewer for everyone.",
    solution:
      "Cognify maps study material to the Professional Regulation Commission's Table of Specifications and uses student performance to guide review.",
    responsibilities: ["Develop the capstone system across its admin, mobile, and backend components."],
    stack: ["React", "React Native", "Node.js", "Express", "PostgreSQL"],
    architecture: {
      summary: "An admin application and a student mobile app share one backend.",
      layers: ["Admin web app and mobile app", "Express API", "PostgreSQL"],
    },
    related: ["mooserage-chatbot", "bishnoi-one"],
  },
  {
    slug: "mooserage-chatbot",
    name: "Mooserage Chatbot",
    group: "personal",
    context: "Personal project",
    role: "Designed and built",
    featured: true,
    summary: "An AI chat application with streamed responses, saved sessions, and PostgreSQL storage.",
    problem:
      "A useful chat assistant needs more than a model call: responses should arrive as they are written, and conversations should survive a reload.",
    solution:
      "A Flask server streams model responses to the browser and saves each session, keeping recent messages as context for the next answer.",
    responsibilities: [
      "Build the interface and Flask backend.",
      "Implement response streaming and conversation storage.",
    ],
    stack: ["Python", "Flask", "JavaScript", "Groq", "Supabase", "PostgreSQL"],
    architecture: {
      summary: "Responses are delivered with server-sent events and stored per session.",
      layers: ["Browser", "Flask server", "Groq API and Supabase PostgreSQL"],
    },
    outcomes: ["A working demo and the source code are public."],
    links: [
      { label: "Open the chatbot demo", href: "https://mooserage-chatbot.vercel.app/" },
      { label: "View the chatbot source", href: "https://github.com/jeydweirdough/mooserage_chatbot" },
    ],
    screenshots: [
      {
        image: chatbotConversation,
        alt: "Mooserage Chatbot answering a request to draft an email, with saved chats in the sidebar",
        caption: "A conversation with saved session history.",
      },
    ],
    related: ["getmeds-ai-assistant", "bank-simulator"],
  },
  {
    slug: "bank-simulator",
    name: "Mooserage Bank Simulator",
    group: "personal",
    context: "Personal project",
    role: "Designed and built",
    summary: "A Python banking simulation with QR card login, transfers, and an automated test client.",
    problem:
      "The project explores how accounts, authentication, and money movement fit together without touching real money.",
    solution:
      "A Flask application simulates registration, card login, deposits, withdrawals, and transfers. A robot client creates accounts and runs transactions to test it.",
    responsibilities: ["Build the web application and banking API.", "Build the automated transaction client."],
    stack: ["Python", "Flask", "JavaScript", "JSON storage"],
    architecture: {
      summary: "The browser and the test client exercise the same simulated banking operations.",
      layers: ["Browser and robot client", "Flask API", "Banking logic", "JSON storage"],
    },
    outcomes: ["A working demo and the source code are public."],
    links: [
      { label: "Open the simulator demo", href: "https://bank-simulator-lemon.vercel.app/" },
      { label: "View the simulator source", href: "https://github.com/jeydweirdough/bank_simulator" },
    ],
    screenshots: [
      {
        image: bankLogin,
        alt: "Bank simulator login screen asking the user to insert a debit card image",
        caption: "Login with a generated debit card.",
      },
    ],
    related: ["mooserage-chatbot", "cognify"],
  },
  {
    slug: "bishnoi-heritage",
    name: "Bishnoi Heritage Website",
    group: "work",
    context: getmeds,
    role: "Built and maintained",
    summary: "A statically exported website about the history and living legacy of the Bishnoi community.",
    problem: "The community's history needed a public home that is simple to host and maintain.",
    solution: "A Next.js site is exported as static files and served from GitHub Pages on a custom domain.",
    responsibilities: ["Build and maintain the website and its deployment."],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
    architecture: {
      summary: "Static delivery means there is no application server to operate.",
      layers: ["Next.js source", "Static export", "GitHub Pages"],
    },
    outcomes: ["The website and its source code are public."],
    links: [
      { label: "Visit bishnoi.ai", href: "https://bishnoi.ai/" },
      { label: "View the heritage site source", href: "https://github.com/backenddepartment/bishnoi" },
    ],
    related: ["bishnoi-omniverse", "bishnoi-one"],
  },
  {
    slug: "bishnoi-omniverse",
    name: "Bishnoi Omniverse Website",
    group: "work",
    context: getmeds,
    role: "Built and maintained",
    summary: "A static business website presenting global medical supply and specialty sourcing services.",
    problem: "The business needed a public website to explain its medical supply and sourcing services.",
    solution: "A Next.js website is exported statically and published through GitHub Pages.",
    responsibilities: ["Build and maintain the website."],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    architecture: {
      summary: "Pages are generated at build time and served as static files.",
      layers: ["Next.js source", "Static export", "GitHub Pages"],
    },
    outcomes: ["The website and its source code are public."],
    links: [
      { label: "Visit Bishnoi Omniverse", href: "https://bishnoiomniverse.com/" },
      { label: "View the Omniverse source", href: "https://github.com/backenddepartment/bishnoi-omniverse" },
    ],
    related: ["bishnoi-heritage", "getmeds-healthcare"],
  },
  {
    slug: "getmeds-healthcare",
    name: "Getmeds Healthcare Website",
    group: "work",
    context: getmeds,
    role: "Built and maintained",
    summary: "A WordPress website for a pharmaceutical export business, editable by non-developers.",
    problem: "The export business needed a website whose copy staff could change without a developer.",
    solution: "The site is built on WordPress, so content editing happens in a familiar admin interface.",
    responsibilities: ["Build and maintain the WordPress website."],
    stack: ["WordPress", "PHP", "MySQL"],
    architecture: {
      summary: "A conventional CMS keeps routine edits with the content team.",
      layers: ["WordPress admin", "PHP application", "MySQL"],
    },
    related: ["getmeds-website", "bishnoi-omniverse"],
  },
  {
    slug: "jecati-construction",
    name: "Jecati Construction Services",
    group: "personal",
    context: "Jecati Construction Services",
    role: "Built",
    summary: "A responsive website for a working construction business, built during university.",
    problem: "A construction business needed a place to present its services to potential customers.",
    solution: "A React website presents the business and its services on desktop and mobile.",
    responsibilities: ["Build and deploy the website."],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    architecture: {
      summary: "A front-end application with static content, so there is no database to maintain.",
      layers: ["Static content", "React application", "Vercel"],
    },
    outcomes: ["The website is live."],
    links: [{ label: "Visit Jecati Construction", href: "https://jecaticonstructionservices.vercel.app/" }],
    related: ["bishnoi-heritage", "cognify"],
  },
  {
    slug: "gettest",
    name: "GetTest Hiring Assessments",
    group: "work",
    context: getmeds,
    role: "Built and maintained",
    summary: "A web app for creating hiring tests, running timed candidate sessions, and scoring the answers, now in its second version.",
    problem: "Hiring tests were prepared and checked by hand. Staff needed one place to write tests, send them to candidates, and score the results consistently.",
    solution: "Staff build a test from eight question types and invite a candidate by email. The candidate takes it in a single-use, timed session. Answers are scored automatically where possible, and staff grade the rest and download a report.",
    responsibilities: [
      "Build version 1 with the team, including importing tests from PDF and Word files and AI-assisted checking of written answers.",
      "Rewrite the app from scratch as version 2, with new tables, server-rendered pages, and no paid AI service.",
      "Build eight question types, including matching, enumeration, and table completion, with automatic and manual scoring.",
      "Build single-use, email-gated test sessions with a timer and signals that flag unusual activity.",
      "Generate Word and PDF evaluation reports, and run the app in Docker on the company's server.",
    ],
    stack: ["Python", "Flask", "HTMX", "PostgreSQL", "Docker"],
    architecture: {
      summary: "A local answer matcher compares written answers against the key, so scoring doesn't depend on an outside AI service.",
      layers: ["Candidate session", "Flask app", "Scoring and reports", "PostgreSQL"],
    },
    outcomes: ["Version 2 is used for hiring assessments at Getmeds."],
    screenshots: [
      {
        image: gettestDashboard,
        alt: "The GetTest dashboard showing how many submissions cleared the pass mark, totals for tests and responses, and a list of recent tests",
        caption: "The version 2 dashboard. Sample data.",
      }
    ],
    related: ["it-support-desk", "getmeds-website"],
  },
  {
    slug: "it-support-desk",
    name: "IT Support Desk",
    group: "work",
    context: getmeds,
    role: "Designed and built",
    summary: "An internal ticketing system where staff report IT problems and support works them, with live updates and resolve-time targets.",
    problem: "IT requests came in by chat and in person, so they were easy to lose and there was no record of how long each one took.",
    solution: "Staff raise a ticket and follow its conversation. Support sees a live queue with a countdown to each ticket's resolve-time target, and IT keeps shared passwords in an encrypted vault.",
    responsibilities: [
      "Build separate dashboards for staff, support, and administrators, with permissions checked on the server.",
      "Build the ticket queue, conversation thread, internal notes, and resolve-time targets by priority.",
      "Add live updates, who-is-viewing indicators, and push notifications.",
      "Build an encrypted password vault that records who last revealed each entry.",
      "Harden sign-in with hashed session tokens, rate limiting, and strict security headers.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Ant Design", "Prisma", "PostgreSQL", "Ably"],
    architecture: {
      summary: "Every action passes a permission check before it reaches the database, and live events are pushed to open screens.",
      layers: ["Staff and support screens", "Server actions", "Permission checks", "Prisma and PostgreSQL"],
    },
    related: ["gettest", "getmeds-files"],
  },
  {
    slug: "twomg-system",
    name: "2MG Company System",
    group: "team",
    context: "2MG and Getmeds Philippines Inc.",
    role: "Contributor, with the 2MG and Getmeds team",
    summary: "A rebuilt company system for sales, medical representatives, HR, and administration. Jade built sign-in, the HR module, and deployment.",
    problem: "The company's sales, HR, and field teams worked across older tools that didn't share accounts or records.",
    solution: "The team is rebuilding them as one system with a shared API and web app. Each department signs in to its own area, with one account per person.",
    responsibilities: [
      "Build sign-in and accounts: one login per person, department sign-in pages, two-step sign-in, and sign-up with administrator approval.",
      "Build the HR module: change history for each person's record, documents and job history, attendance import, leave rules, holidays, and overtime.",
      "Build the customer and order pages and the medical representative menus.",
      "Set up checks that run only for the parts a change affects, and the Docker and Coolify deployment.",
    ],
    stack: ["TypeScript", "React", "Hono", "Drizzle", "PostgreSQL", "Docker", "Coolify"],
    architecture: {
      summary: "One API serves every department's screens, and HR history is recorded on the server, not in the browser.",
      layers: ["Department sign-in", "React web app", "Hono API", "PostgreSQL"],
    },
    related: ["getmeds-orders-app", "bishnoi-one"],
  },
  {
    slug: "getmeds-orders-app",
    name: "Getmeds Orders App",
    group: "team",
    context: getmeds,
    role: "Lead developer, with the Getmeds team",
    summary: "Orders raised, approved, paid, and dispatched in one place, with a dashboard for each role and approved orders sent to Zoho.",
    problem: "Orders passed between sales, team leaders, finance, and dispatch in messages, so it was hard to see where an order was.",
    solution: "Each role signs in to its own dashboard. An order moves from the salesperson through approval, payment, and dispatch, and an approved order becomes a Zoho sales order.",
    responsibilities: [
      "Design and build the first version, including orders with attachments, products, and a recycle bin.",
      "Build the team leader and dispatch dashboards, and search across orders, customers, and products.",
      "Move the data to the shared company database and connect role permissions to the company's sign-in system.",
    ],
    stack: ["Node.js", "Express", "JavaScript", "PostgreSQL", "Zoho"],
    architecture: {
      summary: "Each step of an order is limited to the role that owns it.",
      layers: ["Role dashboards", "Express API", "Company database", "Zoho sales orders"],
    },
    related: ["twomg-system", "getmeds-order-automation"],
  },
  {
    slug: "getmeds-files",
    name: "Getmeds Files",
    group: "team",
    context: getmeds,
    role: "Lead developer, with the Getmeds team",
    summary: "A portal where staff and outside users manage company files in Zoho WorkDrive without each needing a Zoho account.",
    problem: "Giving every person who needed company files their own Zoho account was costly and hard to control.",
    solution: "The portal connects to WorkDrive through one company connection. People sign in to the portal, and it decides which folders each person can see and change.",
    responsibilities: [
      "Build the WorkDrive connection and the create, view, edit, and delete actions for files.",
      "Build users, permissions, and sharing for files and folders.",
      "Add a scheduled job that keeps the file list up to date.",
    ],
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Zoho"],
    architecture: {
      summary: "People never get Zoho access directly. The server checks their permission, then acts through the single company connection.",
      layers: ["Portal sign-in", "Permission checks", "Next.js server", "Zoho WorkDrive"],
    },
    related: ["getmeds-orders-app", "it-support-desk"],
  },
  {
    slug: "qr-shield",
    name: "QR Shield",
    group: "team",
    context: getmeds,
    role: "Contributor, with the Getmeds team",
    summary: "Anti-counterfeit checks for medicine packs: a patient scans the pack's QR code to confirm it is genuine.",
    problem: "Patients had no simple way to check that a medicine pack was genuine, and the brand had no record of where codes were scanned.",
    solution: "Each pack carries a unique code. Scanning it opens a verification page, and the security team sees a scan log and an alert queue.",
    responsibilities: [
      "Move all data and files into PostgreSQL.",
      "Build pack-code QR downloads, an in-app file viewer, and product leaflets shown after a scan.",
      "Build the mobile-first verification portal with a redesigned scanner.",
      "Add the cookie notice and update the privacy notice.",
    ],
    stack: ["React", "Express", "PostgreSQL", "Sanity"],
    architecture: {
      summary: "The public scan page and the security dashboard read from the same record of codes and scans.",
      layers: ["Pack QR code", "Verification portal", "Express API", "PostgreSQL"],
    },
    related: ["getmeds-digital-business-cards", "getmeds-orders-app"],
  },
  {
    slug: "getmeds-order-automation",
    name: "Getmeds Order Automation Prototype",
    group: "team",
    context: getmeds,
    role: "Contributor, with the Getmeds team",
    summary: "A prototype from a seven-day challenge to automate order processing, kept in sync with Zoho.",
    problem: "Order processing involved many manual steps between sales, finance, and dispatch.",
    solution: "The team built a working prototype in seven days that automates the order steps and syncs with Zoho.",
    responsibilities: [
      "Sync the Zoho salesperson list live, including more than one salesperson per account.",
      "Build the Zoho workflow the prototype runs on.",
      "Set up the Docker and Coolify deployment for the frontend and backend.",
    ],
    stack: ["React", "Express", "PostgreSQL", "Zoho", "Docker"],
    architecture: {
      summary: "Zoho stays the source of truth for salespeople, and the prototype syncs from it.",
      layers: ["React dashboard", "Express API", "PostgreSQL", "Zoho"],
    },
    related: ["getmeds-orders-app", "twomg-system"],
  },
  {
    slug: "retro-camera-ph",
    name: "Retro Camera PH Online Store",
    group: "freelance",
    context: "Freelance project",
    role: "Built",
    summary: "An online shop for new and vintage cameras, paid by GCash or Maya QR, with receipts checked by OCR.",
    problem: "The shop sold through social media and checked every payment screenshot by hand.",
    solution: "Customers order online and pay by GCash or Maya QR. They upload the receipt, OCR reads the amount and reference number, and mismatches are flagged for the owner. Stock is held during checkout so the same camera can't be sold twice.",
    responsibilities: [
      "Build the catalogue in Sanity, with condition grades, lenses, promotions, and CSV import.",
      "Build the cart, promo codes, and checkout with stock holds and row locking.",
      "Build receipt upload with OCR checks of the amount, recipient, and reference number.",
      "Build the admin: order actions, sales reports, product margins, and CSV exports.",
      "Add structured data, a sitemap, and llms.txt for search and AI answers.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Sanity", "PostgreSQL", "Drizzle", "Tesseract.js"],
    architecture: {
      summary: "Products live in the CMS, while orders, stock holds, and payments live in PostgreSQL, where the locking happens.",
      layers: ["Shop pages", "Next.js server", "Sanity catalogue", "PostgreSQL orders and stock"],
    },
    links: [
      {
        label: "View the source",
        href: "https://github.com/jeydweirdough/retro-camera-ph",
      }
    ],
    related: ["bel-mante-hotel", "cher-clothing"],
  },
  {
    slug: "bel-mante-hotel",
    name: "Bel Mante Hotel Booking System",
    group: "freelance",
    context: "Freelance project",
    role: "Built",
    summary: "Hotel booking and front desk management where rooms are booked by the hour, in 3, 6, 12, or 22-hour blocks.",
    problem: "The hotel sells rooms in blocks of hours, not nights, which ordinary booking systems don't handle, and a room must never be booked twice.",
    solution: "Guests pick a start time and a block of hours. The front desk handles check-in, check-out, extensions, and housekeeping, and administrators manage rooms, prices, and reports.",
    responsibilities: [
      "Build booking, cancelling, rescheduling, extending, and add-ons for guests.",
      "Build front desk tools for check-in, check-out, no-shows, room assignment, and housekeeping.",
      "Prevent double booking three ways: a row lock, a re-check inside the transaction, and a database rule.",
      "Keep each booking under the policy in force when it was made.",
      "Schedule jobs that expire unpaid holds and mark no-shows.",
    ],
    stack: ["PHP", "Laravel", "Alpine.js", "Tailwind CSS", "PostgreSQL"],
    architecture: {
      summary: "Booking rules sit in one service, and the database itself refuses overlapping bookings.",
      layers: ["Guest and front desk pages", "Laravel controllers", "Booking service", "Database rules"],
    },
    outcomes: ["Covered by automated tests, including double-booking checks."],
    links: [
      {
        label: "View the source",
        href: "https://github.com/jeydweirdough/bl-mante",
      }
    ],
    related: ["cher-clothing", "retro-camera-ph"],
  },
  {
    slug: "cher-clothing",
    name: "Cher Clothing Online Store",
    group: "freelance",
    context: "Freelance project",
    role: "Built",
    summary: "An online clothing store with sizes, cart, checkout, and staff order handling, built so stock can never go negative.",
    problem: "Two customers must never both buy the last item, and every stock change needed a record.",
    solution: "All stock changes go through one ledger, and the database also refuses negative stock. Orders follow a fixed set of statuses, and unpaid online orders expire after 30 minutes.",
    responsibilities: [
      "Build the catalogue with categories and size variants, cart, wishlist, and checkout.",
      "Build the staff order board, stock adjustments, and replies to contact messages.",
      "Build the admin for products, delivery methods, refunds, reports, and staff.",
      "Write a test that races separate processes to prove the last item can't be sold twice.",
    ],
    stack: ["PHP", "Laravel", "Alpine.js", "Tailwind CSS", "PostgreSQL"],
    architecture: {
      summary: "One stock ledger is the only code allowed to change stock.",
      layers: ["Store pages", "Laravel controllers", "Order and stock services", "Database"],
    },
    links: [
      {
        label: "View the source",
        href: "https://github.com/jeydweirdough/cher-clothing",
      }
    ],
    related: ["retro-camera-ph", "bel-mante-hotel"],
  },
  {
    slug: "code-builder",
    name: "Code Builder for WordPress",
    group: "personal",
    context: "Personal project",
    role: "Designed and built",
    summary: "A WordPress plugin that builds a Git repository on your own server and publishes it as a website, with build logs and rollback.",
    problem: "Hosting a modern web app next to a WordPress site usually means paying for a separate hosting service.",
    solution: "The plugin clones a repository, detects its install and build commands, runs the build, and serves the result under the WordPress site. A push to GitHub can trigger a new build.",
    responsibilities: [
      "Detect install and build commands and the output folder from the project's files.",
      "Stream live build logs and keep the last five builds for rollback.",
      "Add GitHub webhooks, an endpoint for builds made in CI, and updates from GitHub Releases.",
      "Store old builds in S3-compatible storage and encrypt each project's environment variables.",
    ],
    stack: ["PHP", "WordPress", "JavaScript", "Git"],
    architecture: {
      summary: "Builds run on the server and are served from disk.",
      layers: ["WordPress admin", "Plugin services", "Git and build tools", "Published site"],
    },
    links: [
      {
        label: "View the source",
        href: "https://github.com/jeydweirdough/code-builder",
      }
    ],
    related: ["sdlc-planner", "getmeds-healthcare"],
  },
  {
    slug: "sdlc-planner",
    name: "SDLC Planner",
    group: "personal",
    context: "Personal project",
    role: "Designed and built",
    summary: "A desktop app for planning a software project through all seven stages, from planning to maintenance. Works offline.",
    problem: "General task tools don't follow the stages of a software project or show how far each stage has come.",
    solution: "Each project has seven stages, each with a goal, an exit checklist, and trackers you define. Progress rolls up to the stage and the project and is charted over time.",
    responsibilities: [
      "Build projects, stages, exit checklists, and custom trackers with items nested to any depth.",
      "Build table and drag-and-drop board views and progress charts.",
      "Add JSON and CSV import and export, image attachments, and automatic backups.",
      "Package it as a Windows desktop app with a local database.",
    ],
    stack: ["Electron", "Next.js", "React", "TypeScript", "SQLite", "Drizzle"],
    architecture: {
      summary: "Everything runs on the computer. The app starts a local server and stores data in a local database.",
      layers: ["Electron window", "Local Next.js server", "Drizzle", "SQLite file"],
    },
    screenshots: [
      {
        image: sdlcPlannerProject,
        alt: "SDLC Planner showing a sample project's Planning stage with its goal, exit checklist, and a progress chart, above the six other stages",
        caption: "A project's stages and progress. Sample data.",
      }
    ],
    related: ["code-builder", "mooserage-chatbot"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getProjects = (slugs: string[] = []) =>
  slugs.map(getProject).filter((project): project is Project => project !== undefined);
