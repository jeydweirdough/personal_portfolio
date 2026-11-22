type Tech = {
  name: string;
  /** theSVG slug. The file is public/tech/<slug>.svg. */
  slug: string;
  /** Also has public/tech/<slug>-dark.svg, theSVG's variant for dark backgrounds. */
  dark?: true;
};

// List only what expertise.ts or projects.ts backs up.
// Before adding a logo, read the brand's trademark rules (see PORTFOLIO.md).
export const techStack: Tech[] = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React and React Native", slug: "react", dark: true },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Tailwind CSS", slug: "tailwind-css" },
  { name: "Python™", slug: "python" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Flask", slug: "flask", dark: true },
  { name: "SQLAlchemy", slug: "sqlalchemy" },
  { name: "Supabase", slug: "supabase" },
  { name: "Linux", slug: "linux" },
  { name: "Coolify", slug: "coolify" },
  { name: "Vercel", slug: "vercel", dark: true },
  { name: "Three.js", slug: "threedotjs", dark: true },
  { name: "WordPress", slug: "wordpress" },
  { name: "PHP", slug: "php", dark: true },
];

// Names only: these owners restrict use of their logos.
export const techNamesOnly = [
  "PostgreSQL",
  "MySQL",
  "Node.js",
  "Express",
  "Docker",
  "GitHub Pages",
  "Sanity",
  "Claude API",
  "Groq",
  "Zoho",
  "Tesseract.js",
];
