import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Projects and Case Studies",
  description:
    "Case studies by Jade Atyla L. Madigal covering business systems, company websites, AI assistants, and software projects, with architecture and responsibilities.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="container-page pt-8 pb-16">
      <Breadcrumbs trail={[{ name: "Projects", path: "/projects" }]} />
      <h1 className="page-title mt-8">Projects and Case Studies</h1>
      <p className="mt-4 max-w-[62ch] text-lg text-muted">
        Systems and software Jade Atyla L. Madigal has worked on, at Getmeds Philippines Inc. and independently.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} heading="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
