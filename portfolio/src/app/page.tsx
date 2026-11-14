import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import CosmicCursor from "@/components/CosmicCursor";
import TelemetryHUD from "@/components/TelemetryHUD";
import SingularityIntro from "@/components/SingularityIntro";

export default function Home() {
  return (
    <>
      <SingularityIntro />
      <CommandPalette />
      <CosmicCursor />
      <TelemetryHUD />
      <Starfield />
      <Nav />
      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
