type Expertise = {
  title: string;
  description: string;
  skills: string[];
  /** Slugs from projects.ts that demonstrate this area. */
  evidence: string[];
};

export const expertise: Expertise[] = [
  {
    title: "Full-Stack Web Development",
    description: "Websites and applications, from the interface to the API and the database.",
    skills: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "Flask"],
    evidence: ["getmeds-website", "cognify"],
  },
  {
    title: "Systems Engineering and Architecture",
    description: "Dividing a business system into clear modules with shared sign-in, defined APIs, and permissions.",
    skills: ["API design", "Modular systems", "Access control", "PostgreSQL"],
    evidence: ["bishnoi-one"],
  },
  {
    title: "IT Infrastructure and Networking",
    description: "Hands-on support for the devices, software, and networks an office works on every day.",
    skills: ["Workstation setup", "OS installation", "Network troubleshooting", "Technical support"],
    evidence: [],
  },
  {
    title: "Cloud Hosting and DevOps",
    description: "Getting software deployed and keeping it maintainable, on managed platforms or Linux servers.",
    skills: ["Linux", "Docker", "Coolify", "Vercel", "GitHub Pages"],
    evidence: ["bishnoi-one", "bishnoi-heritage"],
  },
  {
    title: "Business Software and ERP Development",
    description: "Internal tools that replace repeated manual work and give teams one place to do it.",
    skills: ["CRM", "Inventory", "Finance modules", "Zoho", "Sanity"],
    evidence: ["bishnoi-one", "getmeds-digital-business-cards"],
  },
  {
    title: "AI Integration and Automation",
    description: "AI and automation inside working products, grounded in real data and reviewed where it matters.",
    skills: ["Claude API", "Groq", "OCR", "Scheduled jobs", "AI-assisted development"],
    evidence: ["getmeds-ai-assistant", "mooserage-chatbot"],
  },
];
