import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// "*" already covers search and AI crawlers, so none are listed by name.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
