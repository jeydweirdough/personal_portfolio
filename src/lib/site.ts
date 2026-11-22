import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const SITE_URL = "https://jade-atyla-portfolio.vercel.app";

export const HOME_TITLE = "Jade Atyla L. Madigal | Full-Stack Developer & Systems Engineer";
export const HOME_DESCRIPTION =
  "Explore the portfolio of Jade Atyla L. Madigal, a Philippines-based developer specializing in web applications, systems engineering, IT infrastructure, and AI integration.";

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

type PageMeta = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  article?: { published: string; updated?: string };
};

// A child page's openGraph replaces the parent's entirely, so every page sets the full object.
export function pageMetadata({ title, description, path, index = true, article }: PageMeta): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${profile.name}`;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: HOME_TITLE };
  const shared = {
    title: fullTitle,
    description,
    url: path,
    siteName: profile.name,
    locale: "en_PH",
    images: [image],
  };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: { index, follow: true },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.published,
          modifiedTime: article.updated ?? article.published,
          authors: [absoluteUrl("/#about")],
        }
      : { ...shared, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
