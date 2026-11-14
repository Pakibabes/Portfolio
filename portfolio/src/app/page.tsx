import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CommandPalette />
      <Starfield />
      <Nav />
      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
