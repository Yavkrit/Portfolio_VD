import { Hero } from "@/components/hero/hero";
import { ResearchPreview } from "@/components/sections/research-preview";
import { CitationsChart } from "@/components/sections/citations-chart";
import { InnovationsPreview } from "@/components/sections/innovations-preview";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ResearchPreview />
      <CitationsChart />
      <InnovationsPreview />
      <ClosingCta />
    </>
  );
}
