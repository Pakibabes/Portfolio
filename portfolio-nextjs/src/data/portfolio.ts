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
  bio: "Aspiring web developer focused on learning by building and improving with every project.",
  email: "arbioljohnlyster25@gmail.com",
  resumeHref: "/resume.pdf",
  socials: [
    { label: "Github", href: "https://github.com/Pakibabes" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/john-lyster-arbiol-24a09a3ba/" },
    { label: "Facebook", href: "https://www.facebook.com/larbiol1" },
  ],
};

export const aboutParagraphs = [
  "Hi there, I am John Lyster — a 3rd-year Computer Science student at CIT-U with a genuine passion for building websites. I believe growth comes from consistent practice, which is why I focus on learning by building and improving with every project.",
  "When I'm not studying or building, I focus on training my body through working out. It keeps me disciplined, consistent, and mentally sharp — traits I carry into my work as an aspiring developer.",
  "I'm driven by curiosity, disciplined through consistency, fueled by caffeine, and excited by the endless possibilities the web has to offer.",
];

export const stats = [
  { num: "3rd", desc: "Year in CS at CIT-U" },
  { num: "24/7", desc: "Learning & improving" },
  { num: "01", desc: "Goal — become a web developer" },
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
      { label: "React + Vite", href: "https://react.dev/learn/build-a-react-app-from-scratch" },
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
    tags: [
      { label: "Django" },
      { label: "React" },
      { label: "Supabase" },
    ],
    github: "https://github.com/jones21312321313213/NeuroPath.git",
  },
];

export const skillGroups = [
  { title: "Frontend", items: ["HTML & CSS", "JavaScript", "React"] },
  { title: "Backend", items: ["Node.js", "Python", "Java"] },
  { title: "Frameworks", items: ["Django", "Spring Boot", "Express.js"] },
  { title: "Tools", items: ["Git & GitHub", "VS Code", "Figma", "Linux basics"] },
  { title: "Languages", items: ["C & C++", "C#", "Python", "Java", "JavaScript"] },
  { title: "AI tools I use", items: ["Claude", "ChatGPT", "Gemini"] },
  { title: "Soft skills", items: ["Problem solving", "Adaptability", "Self-motivation", "Critical thinking"] },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
