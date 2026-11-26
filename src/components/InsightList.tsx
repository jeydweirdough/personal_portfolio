import Link from "next/link";
import { insights } from "@/data/insights";

export default function InsightList() {
  if (insights.length === 0) {
    return (
      <p className="text-muted">
        No articles published yet. For now, the{" "}
        <Link className="text-link" href="/projects">
          case studies
        </Link>{" "}
        explain how each project works.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-line">
      {insights.map((post) => (
        <li key={post.slug} className="py-5 first:pt-0">
          <Link className="text-link text-lg font-semibold" href={`/insights/${post.slug}`}>
            {post.title}
          </Link>
          <p className="mt-1">{post.description}</p>
          <time className="text-sm text-muted" dateTime={post.published}>
            {post.published}
          </time>
        </li>
      ))}
    </ul>
  );
}
