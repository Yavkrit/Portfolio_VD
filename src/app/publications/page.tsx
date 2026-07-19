import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { JumpNav } from "@/components/sections/jump-nav";
import { BackToTop } from "@/components/sections/back-to-top";
import { PublicationsList } from "@/components/publications/publications-list";
import { publications, scholarMetrics } from "@/data/publications";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Publications",
  description:
    "Peer-reviewed publications and citation metrics for Dr Dattatraya Vhatkar, sourced from Google Scholar.",
  path: "/publications",
});

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Peer-reviewed research, 2004–present"
        description="Thirty-four publications across sensor instrumentation, microwave-absorbing nanomaterials, and biomechanics — spanning journals in the US, Germany, UK, Switzerland, and India."
      />

      <JumpNav
        items={[
          { href: "#metrics", label: "Citation Metrics" },
          { href: "#list", label: "Complete List" },
        ]}
      />

      <section id="metrics" className="scroll-mt-32 border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-3 divide-x divide-border border border-border">
            <div className="p-6 text-center">
              <p className="font-display text-4xl text-foreground tabular-nums">
                {scholarMetrics.totalCitations}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                Total Citations
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="font-display text-4xl text-foreground tabular-nums">
                {scholarMetrics.hIndex}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                h-index
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="font-display text-4xl text-foreground tabular-nums">
                {scholarMetrics.i10Index}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                i10-index
              </p>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-foreground-subtle">
            Live from{" "}
            <a
              href={scholarMetrics.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-accent"
            >
              Google Scholar
            </a>{" "}
            &middot; updated {scholarMetrics.lastUpdated}
          </p>
          {profile.formerName && (
            <p className="mt-2 text-center text-xs text-foreground-subtle">
              Indexed under {profile.formerName}, the name {profile.name} previously
              published under.
            </p>
          )}
        </div>
      </section>

      <section id="list" className="scroll-mt-32 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Complete List" title="Publications by year" />
          <div className="mt-10">
            <PublicationsList publications={publications} />
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
}
