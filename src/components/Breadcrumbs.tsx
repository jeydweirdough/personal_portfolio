import Link from "next/link";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";

export default function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const items = [{ name: "Home", path: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className="text-sm leading-normal text-muted">
      <JsonLd data={breadcrumbSchema(items)} />
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-foreground">{item.name}</span>
            ) : (
              <Link className="text-link" href={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
