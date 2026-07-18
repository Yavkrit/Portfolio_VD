import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { patents, technologyTransfers } from "@/data/recognition";

export const metadata: Metadata = {
  title: "Patents & Innovations — Dr Dattatraya Vhatkar",
  description:
    "Filed patents and technologies transferred to industry partners across India.",
};

export default function InnovationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patents & Innovations"
        title="From filed patent to licensed technology"
        description="Two patents filed in prosthetic mechanism design, and seven technologies carried from CSIR-CSIO's labs into commercial use by industry partners across India."
      />

      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Patents Filed" title="Prosthetics & mechanism design" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {patents.map((patent) => (
              <Card key={patent.title}>
                <Badge>{patent.country} &middot; Filed {patent.filedOn}</Badge>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  {patent.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-foreground-subtle">
                  Application No. {patent.applicationNumber}
                </p>
                <p className="mt-4 text-sm text-foreground-muted">
                  {patent.inventors.join(", ")}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Technology Transfer"
            title="Licensed to industry partners"
          />
          <div className="mt-10 divide-y divide-border border-t border-border">
            {technologyTransfers.map((tech) => (
              <div
                key={`${tech.title}-${tech.transferDate}`}
                className="grid gap-2 py-6 sm:grid-cols-[8rem_1fr_1fr] sm:gap-6"
              >
                <span className="font-mono text-xs text-foreground-subtle">
                  {tech.transferDate}
                </span>
                <div>
                  <p className="font-display text-lg text-foreground">{tech.title}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{tech.partner}</p>
                </div>
                <p className="text-sm text-foreground-subtle">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
