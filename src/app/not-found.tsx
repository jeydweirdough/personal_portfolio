import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Page Not Found | ${profile.name}`,
  description: "The requested page does not exist.",
};

export default function NotFound() {
  return (
    <div className="container-page space-y-5 py-20">
      <h1 className="page-title">Page not found</h1>
      <p>That page doesn&apos;t exist or has moved.</p>
      <div className="flex flex-wrap gap-3">
        <Link className="button button-primary" href="/">Go to the homepage</Link>
        <Link className="button button-secondary" href="/projects">View all projects</Link>
      </div>
    </div>
  );
}
