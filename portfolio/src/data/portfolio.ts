export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: { label: string; href?: string }[];
  github: string;
};

export const profile = {
  name: "John Lyster T. Arbiol",
  tagline: "3rd · Year · Computer Science",
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
  "Hi, I'm John Lyster — a 3rd-year Computer Science student at CIT-U who loves building things for the web. I learn best by doing, so I treat every project as a chance to improve, whether it's a class requirement or something I built just to explore an idea.",
  "I'm especially interested in combining full-stack development with AI — building tools that actually adapt to the people using them. Neuropath and ShareEth both came from that interest: one helps special education teachers plan lessons faster with AI, the other explores decentralized file-sharing for students.",
  "Outside of code, I'm usually at the gym. Training keeps me disciplined and focused, which carries over into how I work — curious, consistent, and always learning something new.",
];

export const stats = [
  { num: "3rd", desc: "Year in CS at CIT-U" },
  { num: "3+", desc: "Full-stack projects shipped" },
  { num: "24/7", desc: "Learning & improving" },
  { num: "01", desc: "Goal — become a web developer" },
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
    description:
      "A web-based platform for verified students to buy, sell, and share academic materials within a secure campus environment, featuring course-based categorization and built-in communication tools.",
    tags: [
      { label: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
      {
        label: "React + Vite",
        href: "https://react.dev/learn/build-a-react-app-from-scratch",
      },
      { label: "MySQL", href: "https://www.mysql.com/" },
    ],
    github: "https://github.com/Pakibabes/wildcats-marketplace.git",
  },
  {
    id: "shareeth",
    number: "02",
    title: "ShareEth",
    description:
      "A decentralized academic file-sharing platform built on Cardano and IPFS, featuring wallet-based authentication, on-chain upload records, and course-based access control.",
    tags: [
      { label: "React + Vite" },
      { label: "Node.js" },
      { label: "MongoDB" },
    ],
    github: "https://github.com/Spynxxxx/BlockChain-dApp.git",
  },
  {
    id: "neuropath",
    number: "03",
    title: "Neuropath",
    description:
      "A full-stack web application for special education teachers to streamline managing student IEP goals, lesson plans, teaching strategies, and visual aids — with AI-powered tools that generate personalized lesson plans based on each student's learning goals.",
    tags: [{ label: "Django" }, { label: "React" }, { label: "Supabase" }],
    github: "https://github.com/jones21312321313213/NeuroPath.git",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML & CSS", "JavaScript", "React", "Nest.js"],
  },
  { title: "Backend", items: ["Node.js", "Python", "Java"] },
  {
    title: "Frameworks",
    items: ["Django", "Spring Boot", "Express.js", "Next.js"],
  },
  {
    title: "Tools",
    items: ["Git & GitHub", "Linux basics", "TypeScript", "Postman"],
  },
  {
    title: "Languages",
    items: ["C & C++", "C#", "Python", "Java", "JavaScript"],
  },
  {
    title: "AI tools",
    items: [
      "Prompt Engineering",
      "Antigravity",
      "Codex",
      "Agent Orchestration",
    ],
  },
  {
    title: "Soft skills",
    items: [
      "Problem solving",
      "Adaptability",
      "Self-motivation",
      "Critical thinking",
    ],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
