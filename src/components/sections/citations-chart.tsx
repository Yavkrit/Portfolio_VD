"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scholarMetrics } from "@/data/publications";
import { SectionHeading } from "./section-heading";

export function CitationsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const max = Math.max(...scholarMetrics.citationsPerYear.map((d) => d.citations));

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="02 / Research Impact"
            title="Citation momentum, live from Google Scholar"
            description={`${scholarMetrics.totalCitations} total citations · h-index ${scholarMetrics.hIndex} · i10-index ${scholarMetrics.i10Index}. Updated ${scholarMetrics.lastUpdated}.`}
          />
          <Link
            href="/publications"
            className="flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
          >
            View publications <ArrowUpRight size={14} />
          </Link>
        </div>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-12 items-end gap-2 border-b border-border pb-4 sm:gap-4"
        >
          {scholarMetrics.citationsPerYear.map((d, i) => (
            <div key={d.year} className="col-span-1 flex flex-col items-center gap-3">
              <span className="font-mono text-xs tabular-nums text-foreground-subtle">
                {d.citations}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={inView ? { height: `${(d.citations / max) * 160}px` } : {}}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-t-sm bg-accent/80"
              />
              <span className="font-mono text-[10px] text-foreground-subtle">
                &apos;{String(d.year).slice(2)}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-foreground-subtle">
          Source: Google Scholar public profile
        </p>
      </div>
    </section>
  );
}
