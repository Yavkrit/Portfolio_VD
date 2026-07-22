import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { patents, technologyTransfers, technologyTransferStatesReached } from "@/data/recognition";
import { SectionHeading } from "./section-heading";
import { Card } from "@/components/ui/card";

export function InnovationsPreview() {
  const totalTransfers = technologyTransfers.length;

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="03 / Patents & Innovations"
            title="From prototype to licensed technology"
            description="Two filed patents and seven technologies transferred to industry partners across India: electrostatic disinfection, prosthetics, and precision sensing."
          />
          <Link
            href="/innovations"
            className="flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
          >
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="font-display text-4xl text-foreground tabular-nums">
              {patents.length}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
              Patents Filed
            </p>
          </Card>
          <Card>
            <p className="font-display text-4xl text-foreground tabular-nums">
              {totalTransfers}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
              Technologies Transferred
            </p>
          </Card>
          <Card>
            <p className="font-display text-4xl text-foreground tabular-nums">
              {technologyTransferStatesReached}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
              States Reached
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
