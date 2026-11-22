// Who Jade is. Every page, the metadata and the JSON-LD read from here.

export const profile = {
  name: "Jade Atyla L. Madigal",
  shortName: "Jade Madigal",
  givenName: "Jade Atyla",
  familyName: "Madigal",
  titles: ["Full-Stack Developer", "Systems Engineer", "IT Infrastructure Specialist"],
  additionalTitle: "AI-Assisted Software Developer",
  location: "Philippines",
  availability: "Open to freelance, collaboration, and project opportunities.",
  catchphrase: "I don't just build websites. I build the systems behind them.",
  introduction:
    "I design and develop scalable web applications, business platforms, and IT infrastructure—turning complex technical challenges into practical, reliable solutions.",
  company: { name: "Getmeds Philippines Inc.", url: "https://getmeds.ph/" },
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "Cavite State University – Bacoor",
    years: "2022–2026",
  },
  // Third person on purpose: it has to make sense when quoted on its own.
  biography:
    "Jade Atyla L. Madigal is a full-stack developer, systems engineer, and IT infrastructure specialist based in the Philippines. He works at Getmeds Philippines Inc., where he started in IT support in January 2025 and moved into system and web development in January 2026. He builds web applications, business systems, and AI integrations, and supports the hardware, software, and networks they run on. He holds a Bachelor of Science in Computer Science from Cavite State University – Bacoor.",
  about: [
    "I started on the support side, fixing hardware, software, and networks. That is where I learned what actually breaks once real people depend on a system. When I moved into development, I kept that job's main habit: think about who runs this after launch.",
    "Now I do both. I build websites, APIs, admin panels, and business modules, and I help keep the machines, deployments, and connections behind them working. As an AI-assisted software developer, I use AI while building and build it into products, with a person checking wherever a wrong answer matters.",
  ],
  principles: [
    {
      title: "Start with the problem",
      text: "I look at how the work is done today before choosing what to build.",
    },
    {
      title: "Build for the people who run it",
      text: "If staff need to update content, they get an admin panel, so they don't have to wait for a developer.",
    },
    {
      title: "Own what happens after launch",
      text: "One person who understands both the code and what it runs on means fewer handoffs when something fails.",
    },
  ],
  quotes: {
    about: "Beyond the code. Behind the systems.",
    expertise: "Building smarter software. Engineering stronger systems.",
    projects: "Turning complex problems into systems that work.",
    experience: "From the first line of code to the last server running.",
    contact: "I build what solves problems, not just what looks impressive.",
  },
  resume: {
    href: "/docs/Resume_Jade_Atyla_Madigal.pdf",
    fileName: "Resume_Jade_Atyla_Madigal.pdf",
  },
  email: "jamadigal@gmail.com",
  social: {
    github: "https://github.com/jeydweirdough",
    linkedin: "https://linkedin.com/in/mooserage",
    workGithub: "https://github.com/backenddepartment",
    whatsapp: "https://wa.me/639513192584",
    viber: "viber://chat?number=639513192584",
  },
} as const;
