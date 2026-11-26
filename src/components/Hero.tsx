// Introduction left, portrait right. Copy lives in src/data/profile.ts.

import Image from "next/image";
import Icon from "@/components/Icon";
import { portrait } from "@/data/portrait";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";

export default function Hero() {
  const { education, social } = profile;

  return (
    <section id="hero" aria-labelledby="hero-title" className="container-page pt-6 md:pt-9">
      <div className="grid items-center gap-6 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col md:col-span-7">
          <h1
            id="hero-title"
            className="text-[2.25rem] font-bold tracking-[-0.025em] sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem] lg:leading-[1.08]"
          >
            {profile.givenName} <span className="whitespace-nowrap">{profile.name.slice(profile.givenName.length + 1)}</span>
          </h1>
          <p className="mt-3 text-sm leading-normal text-muted lg:text-base">{profile.titles.join(" · ")}</p>

          <p className="mt-4 text-xl leading-snug font-semibold text-balance text-accent lg:mt-6 lg:text-[1.625rem]">
            {/* One sentence per line. The space keeps the text intact for crawlers. */}
            {profile.catchphrase.split(/(?<=[.]) /).map((sentence) => (
              <span key={sentence} className="block">
                {sentence}{" "}
              </span>
            ))}
          </p>

          {/* On phones the actions come before the longer description, to stay above the fold. */}
          <p className="order-last mt-4 max-w-[58ch] text-[0.9375rem] text-muted md:order-none md:mt-3 md:text-base">{profile.introduction}</p>

          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3 lg:mt-6">
            <a href={profile.resume.href} download={profile.resume.fileName} className="button button-primary grow px-3 sm:grow-0 sm:px-5">
              Download Resume
              <Icon name="download" className="max-sm:hidden" />
            </a>
            <a href="#projects" className="button button-secondary grow px-3 sm:grow-0 sm:px-5">
              Explore My Work
            </a>
          </div>
          <p className="mt-3 text-sm leading-normal text-muted">{profile.availability}</p>
        </div>

        {/* Hidden on phones until there is a photo, so it never pushes the actions down. */}
        <div
          className={`relative aspect-[4/5] overflow-hidden rounded-media bg-surface md:col-span-5 md:block md:w-full md:max-w-[19rem] md:justify-self-end ${
            portrait ? "order-first w-20 md:order-none" : "hidden"
          }`}
        >
          {portrait ? (
            <Image
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 768px) 336px, 80px"
              className="object-cover"
            />
          ) : (
            <svg aria-hidden="true" viewBox="0 0 320 400" className="size-full text-line" fill="currentColor">
              <circle cx="160" cy="170" r="62" />
              <path d="M38 400c0-80 50-134 122-134s122 54 122 134z" />
            </svg>
          )}
        </div>
      </div>

      <div className="hero-rule mt-5 md:mt-7" />
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 pb-5 text-sm leading-normal md:grid-cols-4 md:gap-x-6 md:pb-6">
        <div>
          <dt className="text-muted">Currently at</dt>
          <dd className="mt-1 font-semibold">
            {experience[0].role}
            <span className="block font-normal text-muted">{profile.company.name}</span>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Education</dt>
          <dd className="mt-1 font-semibold">BS Computer Science, {education.years}</dd>
        </div>
        <div>
          <dt className="text-muted">Based in</dt>
          <dd className="mt-1 font-semibold">{profile.location}</dd>
        </div>
        <div>
          <dt className="text-muted">Profiles</dt>
          <dd className="mt-1 flex flex-wrap gap-x-4 font-semibold">
            <a className="text-link" href={social.linkedin}>LinkedIn</a>
            <a className="text-link" href={social.github}>GitHub</a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
