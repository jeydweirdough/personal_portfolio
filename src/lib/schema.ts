import { expertise } from "@/data/expertise";
import { faq } from "@/data/faq";
import type { Insight } from "@/data/insights";
import { profile } from "@/data/profile";
import { absoluteUrl, HOME_DESCRIPTION } from "./site";

const personId = absoluteUrl("/#person");
const websiteId = absoluteUrl("/#website");

export const identitySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.shortName,
      givenName: profile.givenName,
      familyName: profile.familyName,
      url: absoluteUrl(),
      description: profile.biography,
      jobTitle: [...profile.titles, profile.additionalTitle],
      worksFor: { "@type": "Organization", name: profile.company.name, url: profile.company.url },
      alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
      address: { "@type": "PostalAddress", addressCountry: "PH" },
      email: profile.email,
      knowsAbout: expertise.map((area) => area.title),
      // Personal profiles only: the work GitHub belongs to the company.
      sameAs: [profile.social.github, profile.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl(),
      name: profile.name,
      description: HOME_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const articleSchema = (post: Insight) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  datePublished: post.published,
  dateModified: post.updated ?? post.published,
  image: absoluteUrl("/opengraph-image"),
  mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
  author: { "@type": "Person", "@id": personId, name: profile.name, url: absoluteUrl() },
  publisher: { "@id": personId },
  isPartOf: { "@id": websiteId },
});
