import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { publications, scholarMetrics } from "@/data/publications";

export const metadata: Metadata = {
  title: "Publications — Dr. V. D. Shivling",
  description:
    "Peer-reviewed publications and citation metrics for Dr. V. D. Shivling, sourced from Google Scholar.",
};

export default function PublicationsPage() {
  const sorted = [...publications].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Peer-reviewed research, 2004–present"
        description="Thirty-four publications across sensor instrumentation, microwave-absorbing nanomaterials, and biomechanics — spanning journals in the US, Germany, UK, Switzerland, and India."
      />

      <section className="border-b border-border py-16">
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
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Complete List" title="Publications by year" />

          <div className="mt-10 divide-y divide-border border-t border-border">
            {sorted.map((pub) => (
              <div
                key={pub.title}
                className="grid gap-2 py-5 sm:grid-cols-[4rem_1fr_5rem] sm:gap-6"
              >
                <span className="font-mono text-sm text-foreground-subtle">
                  {pub.year ?? "—"}
                </span>
                <div>
                  <p className="text-base leading-snug text-foreground">{pub.title}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{pub.authors}</p>
                  <p className="mt-0.5 text-sm italic text-foreground-subtle">
                    {pub.venue}
                  </p>
                </div>
                <span className="font-mono text-sm tabular-nums text-foreground-subtle sm:text-right">
                  {pub.citations !== null ? `${pub.citations} cit.` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
