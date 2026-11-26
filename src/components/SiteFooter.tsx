import Link from "next/link";
import { profile } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm leading-normal md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold">{profile.name}</span>
          <span className="block text-muted">
            {profile.titles[0]} and {profile.titles[1]}
          </span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link className="text-link" href="/projects">All projects</Link></li>
          <li><Link className="text-link" href="/insights">Technical insights</Link></li>
          <li><a className="text-link" href="#top">Back to top</a></li>
        </ul>
      </div>
    </footer>
  );
}
