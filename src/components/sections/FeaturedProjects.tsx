import Link from "next/link";
import Icon from "@/components/Icon";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";

export default function FeaturedProjects() {
  return (
    <Section id="projects" title="Featured Projects" quote={profile.quotes.projects}>
      <ul className="-mt-6 divide-y divide-line">
        {featuredProjects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <Link href="/projects" className="button button-secondary mt-4">
        View all projects
        <Icon name="arrow" />
      </Link>
    </Section>
  );
}
