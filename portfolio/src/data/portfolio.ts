export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category?: string;
  mockupUrl?: string;
  description: string;
  tags: { label: string; href?: string }[];
  github: string;
  demo?: string;
  images: { src: string; alt: string; label?: string }[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  companyTagline?: string;
  companyLogo?: string;
  period: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
  certificate?: {
    title: string;
    imageSrc: string;
    pdfSrc: string;
    hours: string;
    mentor?: string;
    officer?: string;
  };
};

export const profile = {
  name: "John Lyster T. Arbiol",
  tagline: "4th · Year · Computer Science",
  bio: "Full Stack Developer passionate about building scalable web applications and integrating AI to create intelligent, efficient, and user-centered digital experiences. Currently exploring the space where good engineering meets genuinely useful AI.",
  email: "arbioljohnlyster25@gmail.com",
  resumeHref: "/resume.pdf",
  socials: [
    { label: "Github", href: "https://github.com/Pakibabes" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/john-lyster-arbiol-24a09a3ba/",
    },
    { label: "Facebook", href: "https://www.facebook.com/larbiol1" },
  ],
};

export const aboutParagraphs = [
  "Hi, I'm John Lyster — a 4th-year Computer Science student at CIT-U who loves building things for the web. I learn best by doing, so I treat every project as a chance to improve, whether it's a class requirement or something I built just to explore an idea.",
  "I'm especially interested in combining full-stack development with AI — building tools that actually adapt to the people using them. Neuropath and ShareEth both came from that interest: one helps special education teachers plan lessons faster with AI, the other explores decentralized file-sharing for students.",
  "Outside of code, I'm usually at the gym. Training keeps me disciplined and focused, which carries over into how I work — curious, consistent, and always learning something new.",
];

export const stats = [
  { num: "350h", desc: "DevOps OJT @ Metawatt" },
  { num: "3+", desc: "Full-stack projects shipped" },
  { num: "4th", desc: "Year in CS @ CIT-U" },
  { num: "24/7", desc: "Learning & improving" },
];

export const focusAreas = [
  {
    title: "Full-Stack Engineering",
    desc: "Building complete systems — from the database to the final interface.",
  },
  {
    title: "AI-Integrated Apps",
    desc: "Adding AI to real products in ways that make them genuinely more useful.",
  },
  {
    title: "Web3 & Decentralization",
    desc: "Experimenting with wallet auth and decentralized storage through dApps.",
  },
];

export const currentlyExploring = [
  "Agent orchestration",
  "Next.js App Router",
  "Cardano dApps",
  "Prompt engineering",
  "System design",
];

export const projects: Project[] = [
  {
    id: "wildcats-marketplace",
    number: "01",
    title: "CIT-U: Wildcats Marketplace",
    subtitle: "Campus E-Commerce & Academic Exchange Platform",
    category: "Full Stack • Campus Web",
    mockupUrl: "wildcats.citu.edu.ph/marketplace",
    description:
      "A web-based platform for verified students to buy, sell, and share academic materials within a secure campus environment, featuring course-based categorization and built-in communication tools.",
    images: [
      {
        src: "/projects/wildcats.png",
        alt: "Wildcats Marketplace Login and Landing",
        label: "Portal Login",
      },
    ],
    tags: [
      { label: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
      {
        label: "React + Vite",
        href: "https://react.dev/learn/build-a-react-app-from-scratch",
      },
      { label: "Tailwind CSS" },
      { label: "MySQL", href: "https://www.mysql.com/" },
    ],
    github: "https://github.com/Pakibabes/wildcats-marketplace.git",
  },
  {
    id: "shareeth",
    number: "02",
    title: "ShareEth",
    subtitle: "Decentralized Academic File-Sharing dApp",
    category: "Web3 • Decentralized Storage",
    mockupUrl: "shareeth.dapp/explore-notes",
    description:
      "A decentralized academic file-sharing platform built on Cardano and IPFS, featuring wallet-based authentication, on-chain upload records, and course-based access control.",
    images: [
      {
        src: "/projects/shareth.png",
        alt: "ShareEth Cardano & IPFS dApp Explorer",
        label: "dApp Explorer",
      },
    ],
    tags: [
      { label: "React + Vite" },
      { label: "Cardano Blockchain" },
      { label: "IPFS" },
      { label: "Node.js" },
      { label: "MongoDB" },
    ],
    github: "https://github.com/Spynxxxx/BlockChain-dApp.git",
  },
  {
    id: "neuropath",
    number: "03",
    title: "Neuropath",
    subtitle: "Special Ed Workspace & AI-Powered IEP Generator",
    category: "AI Integrated • EdTech",
    mockupUrl: "neuropath.edu/teacher-workspace",
    description:
      "A full-stack web application for special education teachers to streamline managing student IEP goals, lesson plans, teaching strategies, and visual aids — with AI-powered tools that generate personalized lesson plans based on each student's learning goals.",
    images: [
      {
        src: "/projects/neuropath-1.png",
        alt: "Neuropath Landing Page & Progress Dashboard KPI",
        label: "Landing & KPI",
      },
      {
        src: "/projects/neuropath-3.png",
        alt: "Neuropath Special Ed Teacher Workspace Dashboard",
        label: "Teacher Workspace",
      },
      {
        src: "/projects/neuropath-2.png",
        alt: "Neuropath Authentication Portal",
        label: "Sign-in Portal",
      },
    ],
    tags: [
      { label: "React" },
      { label: "Django" },
      { label: "Supabase" },
      { label: "AI Pipeline" },
    ],
    github: "https://github.com/jones21312321313213/NeuroPath.git",
  },
];

export const experiences: Experience[] = [
  {
    id: "metawatt-devops",
    role: "DevOps Intern",
    company: "Metawatt LLC",
    companyTagline: "Build · Automate · Scale · Impact",
    companyLogo: "/icons/metawatt.png",
    period: "June 8, 2026 – August 17, 2026",
    duration: "350 Hours Completed",
    location: "Remote / Hybrid",
    description: [
      "Configured and maintained automated CI/CD pipelines using GitHub Actions to streamline test, build, and deployment lifecycles.",
      "Engineered full-stack features and resolved engineering tickets across Next.js, NestJS, and Supabase systems.",
      "Implemented assigned engineering issues using the ORCA framework, working directly with CLI AI agents and prompt engineering for autonomous workflows.",
      "Completed 350 verified curriculum hours with official Certificate of Completion issued under mentor Mark Lestat Agustin and CEO Derick Clark.",
    ],
    skills: [
      "DevOps",
      "GitHub Actions",
      "CI/CD Pipelines",
      "Next.js",
      "NestJS",
      "Supabase",
      "ORCA Framework",
      "CLI AI Agents",
      "Prompt Engineering",
    ],
    certificate: {
      title: "Certificate of Completion",
      imageSrc: "/certificates/metawatt-certificate.png",
      pdfSrc: "/certificates/metawatt-certificate.pdf",
      hours: "350 Hours",
      mentor: "Mark Lestat Agustin",
      officer: "Derick Clark (CEO)",
    },
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML & CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  { title: "Backend", items: ["NestJS", "Node.js", "Python", "Java", "Supabase"] },
  {
    title: "Frameworks & Dev",
    items: ["Next.js", "NestJS", "Django", "Spring Boot", "Express.js"],
  },
  {
    title: "DevOps & Tools",
    items: ["GitHub Actions", "CI/CD", "Git & GitHub", "Linux basics", "TypeScript", "Postman"],
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C & C++", "C#"],
  },
  {
    title: "AI & Agents",
    items: [
      "ORCA Framework",
      "CLI AI Agents",
      "Agent Orchestration",
      "Prompt Engineering",
      "Antigravity",
    ],
  },
  {
    title: "Soft skills",
    items: [
      "Problem solving",
      "Agile teamwork",
      "Adaptability",
      "Self-motivation",
      "Critical thinking",
    ],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
