import { projects } from "@/data/portfolio";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="What I've built" title="Projects" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
