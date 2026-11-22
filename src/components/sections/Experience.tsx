import Link from "next/link";
import Section from "@/components/Section";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";

const row = "grid gap-x-6 gap-y-2 border-b border-line py-7 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)]";

export default function Experience() {
  const { education } = profile;

  return (
    <Section id="experience" title="Professional Experience" quote={profile.quotes.experience}>
      <ol>
        {experience.map((job) => (
          <li key={job.role} className={row}>
            <p className="text-sm leading-7 text-muted">
              <time dateTime={job.start.iso}>{job.start.label}</time>
              {" – "}
              <span className="sm:block">
                {job.end ? (
                  <time dateTime={job.end.iso}>{job.end.label}</time>
                ) : (
                  <span className="font-semibold text-accent">Present</span>
                )}
              </span>
            </p>
            <div>
              <h3 className="text-lg leading-7 font-semibold">{job.role}</h3>
              <p className="text-muted">{job.company}</p>
              <p className="mt-3">{job.summary}</p>
              <h4 className="sr-only">Responsibilities</h4>
              <ul className="bullets mt-3">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {job.contributions.length > 0 && (
                <>
                  <h4 className="mt-5 mb-2 font-semibold">Technical contributions</h4>
                  <ul className="bullets">
                    {job.contributions.map((item) => (
                      <li key={item.project}>
                        <Link className="text-link" href={`/projects/${item.project}`}>
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-x-6 gap-y-2 pt-7 sm:grid-cols-[10rem_minmax(0,1fr)]">
        <h3 className="text-lg leading-7 font-semibold">Education</h3>
        <div>
          <p className="font-semibold">{education.degree}</p>
          <p className="text-muted">
            {education.school}, <span className="whitespace-nowrap tabular-nums">{education.years}</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
