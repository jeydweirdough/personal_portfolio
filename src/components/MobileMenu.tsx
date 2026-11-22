"use client";

import Link from "next/link";
import { useRef } from "react";
import { navigation } from "@/data/navigation";

// Native <details>, so the menu also opens without JavaScript.
// JS only adds closing on selection and on Escape.
export default function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);

  const close = () => menu.current?.removeAttribute("open");

  return (
    <details
      ref={menu}
      className="group lg:hidden"
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        close();
        summary.current?.focus();
      }}
    >
      <summary
        ref={summary}
        className="button button-secondary cursor-pointer list-none px-2.5 sm:px-4 group-open:bg-surface [&::-webkit-details-marker]:hidden"
      >
        Menu
      </summary>
      <nav
        aria-label="Primary"
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-background"
      >
        <ul className="container-page py-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close} className="flex min-h-11 items-center hover:text-accent">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
