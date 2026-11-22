import { profile } from "./profile";

// Plain text: the same strings are rendered on the page and in the FAQPage JSON-LD.
export const faq = [
  {
    question: "Who is Jade Atyla L. Madigal?",
    answer: `${profile.name} is a Philippines-based full-stack developer, systems engineer, and IT infrastructure specialist. He works as a System & Web Developer and IT Support at ${profile.company.name}, building business software and supporting the infrastructure it runs on.`,
  },
  {
    question: "What does Jade Madigal specialize in?",
    answer:
      "Jade Madigal specializes in full-stack web development, systems engineering and architecture, IT infrastructure and networking, cloud hosting and DevOps, business software, and AI integration and automation.",
  },
  {
    question: "What types of software does Jade develop?",
    answer:
      "Jade develops company websites, APIs, content management tools, internal business systems, and AI assistants. His work includes Bishnoi One, a modular business platform built with other contributors, and the AI assistant and digital business cards for Getmeds Philippines Inc.",
  },
  {
    question: "Does Jade work with cloud infrastructure and servers?",
    answer:
      "Yes. Jade deploys applications to Vercel, GitHub Pages, and Linux servers using Docker and Coolify. He also provides hands-on hardware, software, and network support.",
  },
  {
    question: "What technologies does Jade use?",
    answer:
      "Jade's project work uses Next.js, React, TypeScript, Tailwind CSS, Python, FastAPI, Flask, Express, PostgreSQL, Sanity, and WordPress. His AI work includes the Claude API and Groq.",
  },
  {
    question: "Is Jade available for freelance projects?",
    answer: `Yes. Jade is open to freelance, collaboration, and project opportunities alongside his work at ${profile.company.name} You can reach him by email at ${profile.email}.`,
  },
];
