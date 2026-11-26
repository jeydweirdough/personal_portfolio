import Breadcrumbs from "@/components/Breadcrumbs";
import InsightList from "@/components/InsightList";
import { insights } from "@/data/insights";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Technical Insights",
  description:
    "Engineering articles, infrastructure notes, and lessons learned by Jade Atyla L. Madigal from building and maintaining software systems.",
  path: "/insights",
  index: insights.length > 0,
});

export default function InsightsPage() {
  return (
    <div className="container-page min-h-[60svh] pt-8 pb-16">
      <Breadcrumbs trail={[{ name: "Technical Insights", path: "/insights" }]} />
      <h1 className="page-title mt-8 mb-6">Technical Insights</h1>
      <InsightList />
    </div>
  );
}
