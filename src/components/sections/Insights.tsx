import InsightList from "@/components/InsightList";
import Section from "@/components/Section";

export default function Insights() {
  return (
    <Section id="insights" title="Technical Insights">
      <p className="mb-4 max-w-[68ch]">
        A place for my engineering articles, development experiences, infrastructure notes, and lessons learned.
      </p>
      <InsightList />
    </Section>
  );
}
