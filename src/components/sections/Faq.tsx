import JsonLd from "@/components/JsonLd";
import Section from "@/components/Section";
import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/schema";

// Always expanded, so every answer is readable without interaction.
export default function Faq() {
  return (
    <Section id="faq" title="Frequently Asked Questions">
      <JsonLd data={faqSchema} />
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {faq.map((item) => (
          <div key={item.question}>
            <h3 className="font-semibold">{item.question}</h3>
            <p className="mt-2 text-[0.9375rem] break-words text-muted">{item.answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
