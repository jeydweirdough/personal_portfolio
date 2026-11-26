import Section from "@/components/Section";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <Section id="about" title="About Me" quote={profile.quotes.about}>
      <div className="max-w-[68ch] space-y-4">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h3 className="mt-10 text-lg font-semibold">How I work</h3>
      <dl className="mt-3">
        {profile.principles.map((principle) => (
          <div
            key={principle.title}
            className="grid gap-x-8 gap-y-1 border-b border-line py-4 last:border-0 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <dt className="font-semibold">{principle.title}</dt>
            <dd className="text-muted">{principle.text}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-x-8 gap-y-1 border-t border-line pt-4 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <h3 className="font-semibold">Professional biography</h3>
        {/* A no-break space keeps the campus dash off the start of a line. */}
        <p className="text-muted">{profile.biography.replace(" –", " –")}</p>
      </div>
    </Section>
  );
}
