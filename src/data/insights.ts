export type Insight = {
  slug: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  published: string;
  updated?: string;
  /** Slugs from projects.ts. */
  relatedProjects?: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

// Add an article here and its page, Article JSON-LD and sitemap entry are generated.
// While this is empty, /insights is noindex and left out of the sitemap.
export const insights: Insight[] = [];

export const getInsight = (slug: string) => insights.find((item) => item.slug === slug);
