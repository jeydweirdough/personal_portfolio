import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getInsight, insights } from "@/data/insights";
import { profile } from "@/data/profile";
import { getProjects } from "@/data/projects";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => insights.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getInsight((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    article: { published: post.published, updated: post.updated },
  });
}

export default async function InsightPage({ params }: Props) {
  const post = getInsight((await params).slug);
  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-5 pt-8 pb-16 md:px-8">
      <Breadcrumbs
        trail={[
          { name: "Technical Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ]}
      />
      <article className="space-y-6">
        <JsonLd data={articleSchema(post)} />
        <h1 className="page-title">{post.title}</h1>
        <p className="text-sm text-muted">
          By{" "}
          <Link className="text-link" href="/#about">
            {profile.name}
          </Link>
          {" · Published "}
          <time dateTime={post.published}>{post.published}</time>
          {post.updated && (
            <>
              {" · Updated "}
              <time dateTime={post.updated}>{post.updated}</time>
            </>
          )}
        </p>
        {post.sections.map((section) => (
          <section key={section.heading} className="space-y-3 leading-relaxed">
            <h2 className="pt-4 text-xl font-semibold">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
      {getProjects(post.relatedProjects).map((project) => (
        <Link key={project.slug} className="text-link mr-4" href={`/projects/${project.slug}`}>
          Related: {project.name}
        </Link>
      ))}
    </div>
  );
}
