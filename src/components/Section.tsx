import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  quote?: string;
  /** The closing pine band. */
  inverse?: boolean;
  children: ReactNode;
};

/** One H2 in the left column, content in the right. */
export default function Section({ id, title, quote, inverse = false, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={inverse ? "field" : undefined}>
      <div className="container-page">
        <div
          className={`grid gap-x-8 gap-y-7 pb-12 md:pb-16 lg:grid-cols-12 ${inverse ? "pt-12 md:pt-16" : "border-t border-line pt-8 md:pt-11"}`}
        >
          <div className="lg:col-span-4 lg:pr-8">
            <h2 id={`${id}-title`} className="text-[1.75rem] font-bold tracking-[-0.015em] md:text-[2rem]">
              {title}
            </h2>
            {quote && (
              <p className={`mt-3 max-w-[32ch] leading-normal ${inverse ? "text-field-muted" : "text-muted"}`}>
                {quote}
              </p>
            )}
          </div>
          <div className="min-w-0 lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
