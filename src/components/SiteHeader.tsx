import Link from "next/link";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const { resume } = profile;

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background">
      <div className="container-page flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex min-h-11 items-center text-base font-bold sm:text-[1.0625rem] whitespace-nowrap">
          {profile.shortName}
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-6">
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-4 text-sm xl:gap-5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-muted hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={resume.href}
            download={resume.fileName}
            className="button button-secondary px-2.5 sm:px-4"
          >
            Resume
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
