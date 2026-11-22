import Link from "next/link";
import Section from "@/components/Section";
import TechStack from "@/components/TechStack";
import { expertise } from "@/data/expertise";
import { profile } from "@/data/profile";
import { getProjects } from "@/data/projects";

export default function Expertise() {
  return (
    <Section id="expertise" title="Expertise" quote={profile.quotes.expertise}>
      <TechStack />
      <ul className="divide-y divide-line">
        {expertise.map((area) => (
          <li key={area.title} className="grid gap-x-8 gap-y-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <h3 className="text-lg font-semibold">{area.title}</h3>
            <div>
              <p>{area.description}</p>
              <p className="mt-1.5 text-sm leading-normal text-muted">{area.skills.join(", ")}</p>
              {area.evidence.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-x-4 text-sm leading-normal">
                  {getProjects(area.evidence).map((project) => (
                    <Link key={project.slug} className="text-link" href={`/projects/${project.slug}`}>
                      {project.name}
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
