import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCard from "@/components/ProjectCard";
import { projects, type Project } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Projects and Case Studies",
  description:
    "Case studies by Jade Atyla L. Madigal covering business systems, company websites, AI assistants, team projects, and freelance work, with architecture and responsibilities.",
  path: "/projects",
});

const groups: { id: Project["group"]; title: string; note: string }[] = [
  { id: "work", title: "At Getmeds", note: "Systems and websites Jade built for Getmeds Philippines Inc." },
  {
    id: "team",
    title: "Team projects",
    note: "Projects built with the 2MG and Getmeds team. Each one lists the parts Jade built.",
  },
  { id: "freelance", title: "Freelance", note: "Built for clients outside Getmeds." },
  { id: "personal", title: "Personal and university", note: "Tools, experiments, and coursework." },
];

export default function ProjectsPage() {
  return (
    <div className="container-page pt-8 pb-16">
      <Breadcrumbs trail={[{ name: "Projects", path: "/projects" }]} />
      <h1 className="page-title mt-8">Projects and Case Studies</h1>
      <p className="mt-4 max-w-[62ch] text-lg text-muted">
        Systems and software Jade Atyla L. Madigal has worked on, at Getmeds Philippines Inc., with the team, and
        independently.
      </p>
      {groups.map((group) => {
        const items = projects.filter((project) => project.group === group.id);
        if (items.length === 0) return null;
        return (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className="mt-12">
            <h2 id={`group-${group.id}`} className="text-xl font-semibold tracking-tight">
              {group.title}
            </h2>
            <p className="mt-1 text-muted">{group.note}</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {items.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} heading="h3" />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
