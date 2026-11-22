import type { StaticImageData } from "next/image";
import bankLogin from "@/assets/projects/bank-simulator-screen.png";
import chatbotConversation from "@/assets/projects/mooserage-chatbot-conversation.png";

// Public case studies. Keep hosts, addresses, customers, internal rules and
// unreleased plans out of this file: everything here is published.

export type Project = {
  slug: string;
  name: string;
  context: string;
  role: string;
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
    ],
    stack: ["Next.js", "React", "TypeScript", "Sanity Studio"],
    architecture: {
      summary: "Content management is separate from presentation, so a content edit doesn't need a code change.",
      layers: ["Employee admin panel", "Sanity content database", "Next.js website"],
    },
    outcomes: ["The website is live, and employees can manage its content through the admin panel."],
    links: [{ label: "Visit getmeds.ph", href: "https://getmeds.ph/" }],
    related: ["getmeds-ai-assistant", "getmeds-digital-business-cards"],
  },
  {
    slug: "getmeds-ai-assistant",
    name: "Getmeds API and AI Assistant",
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
    context: getmeds,
    role: "Built and maintained",
    featured: true,
    summary: "QR-linked employee contact pages, created from card artwork with OCR and checked by a person.",
    problem:
      "A printed card can't be tapped to call or message someone, and copying each employee's details by hand invites mistakes.",
    solution:
      "Each card's QR code opens a contact page. An administrator uploads the card artwork, OCR proposes the details, and a person checks them before they are applied.",
    responsibilities: [
      "Build the employee contact pages.",
      "Build the admin workflow, OCR extraction, and human review step.",
    ],
    stack: ["React", "TypeScript", "Tesseract.js", "Sanity"],
    architecture: {
      summary: "OCR only suggests values. A person approves them before they are saved.",
      layers: ["Card artwork", "OCR extraction", "Human review", "Contact page opened by QR"],
    },
    related: ["getmeds-website", "bishnoi-one"],
  },
  {
    slug: "cognify",
    name: "Cognify CvSU-B",
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
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getProjects = (slugs: string[] = []) =>
  slugs.map(getProject).filter((project): project is Project => project !== undefined);
