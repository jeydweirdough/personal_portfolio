import { techNamesOnly, techStack } from "@/data/techStack";

function Logos({ copy = false }: { copy?: boolean }) {
  return (
    <ul aria-hidden={copy || undefined} className={`stack-list ${copy ? "stack-copy" : ""}`}>
      {techStack.map(({ name, slug, dark }) => (
        <li key={slug} className="flex items-center gap-2.5 whitespace-nowrap font-medium">
          <picture>
            {dark && <source media="(prefers-color-scheme: dark)" srcSet={`/tech/${slug}-dark.svg`} />}
            {/* The name is beside the logo, so the image is decorative. */}
            <img src={`/tech/${slug}.svg`} alt="" width={32} height={32} decoding="async" className="size-8 object-contain" />
          </picture>
          {name}
        </li>
      ))}
    </ul>
  );
}

/** A CSS-only carousel: it pauses on hover and is a static list under reduced motion. */
export default function TechStack() {
  return (
    <div className="mb-6 border-b border-line pb-4">
      <h3 className="text-lg font-semibold">Tech stack</h3>

      <div className="stack-window">
        <div className="stack-track">
          <Logos />
          <Logos copy />
        </div>
      </div>

      <p className="text-sm leading-normal text-muted">Also {techNamesOnly.join(", ")}.</p>

      <details className="mt-1 text-sm leading-normal text-muted">
        <summary className="w-fit cursor-pointer py-1.5 hover:text-foreground">Logo credits</summary>
        <p className="max-w-[68ch] pb-1">
          Icons from{" "}
          <a className="text-link" href="https://thesvg.org">
            theSVG
          </a>
          . PHP logo by Colin Viebrock, in a version without the ellipse, under{" "}
          <a className="text-link" href="https://creativecommons.org/licenses/by-sa/4.0/">
            CC BY-SA 4.0
          </a>
          . The Android robot is reproduced or modified from work created and shared by Google and used according to terms described in the Creative Commons 3.0 Attribution License. Android is a trademark of Google LLC. Tux by Larry Ewing (lewing@isc.tamu.edu) and The GIMP. Python is a trademark of the Python Software
          Foundation. Next.js and Vercel are trademarks or registered trademarks of Vercel, Inc. or its affiliates in
          the US and other countries. All other marks belong to their owners. They identify tools I have used and do
          not imply endorsement.
        </p>
      </details>
    </div>
  );
}
