import type { MetadataRoute } from "next";
import { insights } from "@/data/insights";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

// No lastModified unless the date is real: a build timestamp would be misleading.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/projects") },
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}`) })),
    ...(insights.length > 0 ? [{ url: absoluteUrl("/insights") }] : []),
    ...insights.map((post) => ({
      url: absoluteUrl(`/insights/${post.slug}`),
      lastModified: post.updated ?? post.published,
    })),
  ];
}
