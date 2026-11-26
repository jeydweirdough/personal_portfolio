import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Expertise from "@/components/sections/Expertise";
import Faq from "@/components/sections/Faq";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Insights from "@/components/sections/Insights";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Expertise />
      <FeaturedProjects />
      <About />
      <Insights />
      <Faq />
      <Contact />
    </>
  );
}
