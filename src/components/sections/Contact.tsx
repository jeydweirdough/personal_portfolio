import Icon from "@/components/Icon";
import Section from "@/components/Section";
import { profile } from "@/data/profile";

const { social, resume } = profile;

const channels = [
  { label: "WhatsApp", href: social.whatsapp },
  { label: "Viber (opens the app)", href: social.viber },
  { label: "LinkedIn", href: social.linkedin },
  { label: "GitHub", href: social.github },
  { label: "GitHub (Getmeds work)", href: social.workGithub },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact" quote={profile.quotes.contact} inverse>
      <p className="max-w-[60ch] text-lg">
        Have a system to build, fix, or untangle? Tell me what the problem is and how you handle it today. A rough
        description is enough to start.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          className="button border-on-field bg-on-field text-field hover:bg-field-muted"
          href={resume.href}
          download={resume.fileName}
        >
          Download Resume
          <Icon name="download" />
        </a>
        <a
          className="button border-field-muted hover:border-on-field hover:underline"
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Project collaboration")}`}
        >
          Start a project conversation
        </a>
      </div>
      <address className="mt-7 text-sm leading-normal not-italic">
        <a className="text-link text-base break-all text-on-field hover:text-on-field" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          {channels.map((channel) => (
            <li key={channel.href}>
              <a className="text-link text-field-muted hover:text-on-field" href={channel.href}>
                {channel.label}
              </a>
            </li>
          ))}
        </ul>
      </address>
    </Section>
  );
}
