import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ResumeViewer } from "@/components/resume/resume-viewer";
import { researchImpactSummary } from "@/data/profile";
import { scholarMetrics } from "@/data/publications";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description:
    "View or download the resume of Dr Dattatraya Vhatkar, Chief Scientist at CSIR-CSIO.",
  path: "/resume",
});

const quickFacts = [
  { label: "Experience", value: "32+ years" },
  { label: "Cumulative Project Value", value: "₹25 Cr+" },
  { label: "Peer-Reviewed Publications", value: "34" },
  { label: "Citations", value: `${scholarMetrics.totalCitations}` },
  { label: "Patents Filed", value: "2" },
  { label: "PG Theses Supervised", value: researchImpactSummary.pgThesisSupervised },
];

export default function ResumePage() {
  return (
    <>
      <PageHero
        eyebrow="Resume"
        title="A single-page summary of the career"
        description="For a formal record of the roles, projects, and output behind the research shown across this site — view it inline or download the PDF."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
              At a Glance
            </p>
            <dl className="mt-6 space-y-5">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between border-b border-border pb-3"
                >
                  <dt className="text-sm text-foreground-muted">{fact.label}</dt>
                  <dd className="font-mono text-sm tabular-nums text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ResumeViewer />
        </div>
      </section>
    </>
  );
}
