import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { honors } from "@/data/recognition";
import { certifications } from "@/data/certifications";
import { professionalAffiliations } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Recognition",
  description:
    "Institutional leadership, honors, and professional affiliations of Dr Dattatraya Vhatkar.",
  path: "/recognition",
});

export default function RecognitionPage() {
  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Institutional leadership & professional standing"
        description="Beyond the bench — committee leadership, national-level policy input, and professional fellowships built over thirty-two years at CSIR-CSIO."
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
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Licenses & Certifications"
            title="Verified credentials"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <Card key={cert.title} className="flex gap-4">
                <BadgeCheck
                  className="mt-1 shrink-0 text-accent"
                  size={20}
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-display text-lg text-foreground">{cert.title}</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {cert.organization}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-foreground-subtle">
                    {cert.issued && <span>Issued {cert.issued}</span>}
                    <span>ID {cert.credentialId}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
