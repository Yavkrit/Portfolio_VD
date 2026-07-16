import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { honors } from "@/data/recognition";
import { professionalAffiliations, visionStatement } from "@/data/profile";

export const metadata: Metadata = {
  title: "Recognition — Dr. V. D. Shivling",
  description:
    "Institutional leadership, honors, and professional affiliations of Dr. V. D. Shivling.",
};

export default function RecognitionPage() {
  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Institutional leadership & professional standing"
        description="Beyond the bench — committee leadership, national-level policy input, and professional fellowships built over three decades at CSIR-CSIO."
      />

      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Honors & Leadership" title="Institutional roles held" />
          <div className="mt-10 divide-y divide-border border-t border-border">
            {honors.map((honor) => (
              <div
                key={honor.title}
                className="flex flex-wrap items-baseline justify-between gap-2 py-5"
              >
                <div>
                  <p className="font-display text-lg text-foreground">{honor.title}</p>
                  <p className="text-sm text-foreground-muted">{honor.org}</p>
                </div>
                {honor.period && (
                  <span className="font-mono text-xs text-foreground-subtle">
                    {honor.period}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Professional Affiliations"
            title="Societies & fellowships"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {professionalAffiliations.map((item) => (
              <li
                key={item}
                className="border border-border p-5 text-sm text-foreground-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Vision"
            title="On leading CSIR-CSIO into the next decade"
          />
          <p className="mt-8 text-lg leading-relaxed text-foreground-muted">
            {visionStatement}
          </p>
        </div>
      </section>
    </>
  );
}
