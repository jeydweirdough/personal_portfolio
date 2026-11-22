import Link from "next/link";
import Icon from "@/components/Icon";
import type { Project } from "@/data/projects";

/** One project as a row in a list. */
export default function ProjectCard({ project, heading: Heading = "h3" }: { project: Project; heading?: "h2" | "h3" }) {
  return (
    <article className="group relative grid gap-x-8 gap-y-3 py-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        <Heading className="text-lg font-semibold">
          {/* The ::after stretches this link over the row. */}
          <Link
            href={`/projects/${project.slug}`}
            className="underline-offset-4 group-hover:text-accent after:absolute after:inset-0 hover:underline"
          >
            {project.name}
            <span className="sr-only"> case study</span>
          </Link>
        </Heading>
        <p className="mt-1 text-sm leading-normal text-muted">{project.context}</p>
      </div>
      <div className="pr-8">
        <p>{project.summary}</p>
        <p className="mt-2 text-sm leading-normal text-muted">{project.stack.slice(0, 4).join(", ")}</p>
      </div>
      <Icon name="arrow" className="absolute top-7 right-0 text-accent" />
    </article>
  );
}
