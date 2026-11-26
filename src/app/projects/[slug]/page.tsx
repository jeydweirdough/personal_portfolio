import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Icon from "@/components/Icon";
import { profile } from "@/data/profile";
import { getProject, getProjects, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} Case Study`,
    description: `${project.summary} A case study by ${profile.shortName}.`,
    path: `/projects/${project.slug}`,
  });
}

const heading = "mb-3 text-xl font-semibold";

export default async function CaseStudy({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <div className="container-page pt-8 pb-16">
      <Breadcrumbs
        trail={[
          { name: "Projects", path: "/projects" },
          { name: project.name, path: `/projects/${project.slug}` },
        ]}
      />
      <article>
        <div className="border-b border-line py-8">
          <h1 className="page-title max-w-4xl">{project.name}</h1>
          <p className="mt-4 max-w-[62ch] text-lg text-muted">{project.summary}</p>
          {project.links && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a className="button button-secondary" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid gap-x-8 gap-y-10 pt-8 lg:grid-cols-12">
          <dl className="grid content-start gap-5 text-sm leading-normal sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:pr-8">
            <div>
              <dt className="text-muted">Author</dt>
              <dd className="mt-1 font-semibold">
                <Link className="text-link" href="/#about">
                  {profile.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-1 font-semibold">{project.role}</dd>
            </div>
            <div>
              <dt className="text-muted">Context</dt>
              <dd className="mt-1 font-semibold">{project.context}</dd>
            </div>
            <div>
              <dt className="text-muted">Technology stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <li key={item} className="rounded-control bg-surface px-2.5 py-1 font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="min-w-0 space-y-10 lg:col-span-8">
            {project.screenshots?.map((shot) => (
              <figure key={shot.image.src}>
                <Image
                  src={shot.image}
                  alt={shot.alt}
                  priority
                  sizes="(min-width: 1152px) 715px, (min-width: 1024px) 62vw, 92vw"
                  className="h-auto w-full rounded-media border border-line"
                />
                <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>
              </figure>
            ))}
            <section className="max-w-[68ch]">
              <h2 className={heading}>Problem</h2>
              <p>{project.problem}</p>
            </section>
            <section className="max-w-[68ch]">
              <h2 className={heading}>Solution</h2>
              <p>{project.solution}</p>
            </section>
            <section className="max-w-[68ch]">
              <h2 className={heading}>My responsibilities</h2>
              <ul className="bullets">
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className={heading}>Architecture overview</h2>
              <p className="max-w-[68ch]">{project.architecture.summary}</p>
              <ol className="mt-5 flex flex-col gap-2 text-sm leading-normal md:flex-row md:items-stretch">
                {project.architecture.layers.map((layer, index) => (
                  <li key={layer} className="flex flex-col items-center gap-2 md:min-w-0 md:flex-1 md:flex-row">
                    {index > 0 && <Icon name="arrow" className="rotate-90 text-muted md:rotate-0" />}
                    <span className="flex w-full min-w-0 flex-1 items-center justify-center self-stretch rounded-control border border-line bg-surface p-3 text-center font-medium">
                      {layer}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
            {project.outcomes && (
              <section className="max-w-[68ch]">
                <h2 className={heading}>Outcomes</h2>
                <ul className="bullets">
                  {project.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      <nav
        aria-label="Related"
        className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-line pt-6"
      >
        <div>
          <p className="text-sm text-muted">Related case studies</p>
          <ul className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
            {getProjects(project.related).map((item) => (
              <li key={item.slug}>
                <Link className="text-link" href={`/projects/${item.slug}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <a className="button button-primary" href={profile.resume.href} download={profile.resume.fileName}>
            Download Resume
            <Icon name="download" />
          </a>
          <Link className="button button-secondary" href="/#contact">
            Discuss a similar project
          </Link>
        </div>
      </nav>
    </div>
  );
}
