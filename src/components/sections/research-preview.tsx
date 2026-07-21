import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { researchAreas } from "@/data/projects";
import { SectionHeading } from "./section-heading";
import { Card } from "@/components/ui/card";

export function ResearchPreview() {
  return (
    <section id="research" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="01 / Research"
            title="Thirty-two years of instrumentation, one throughline"
            description="From patch-antenna moisture sensors to microwave-absorbing nanomaterials and prosthetic mechanisms: applied electronics built to leave the lab."
          />
          <Link
            href="/research"
            className="flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
          >
            View all research <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {researchAreas.map((area, i) => (
            <Card key={area.title} className="group">
              <span className="font-mono text-xs text-foreground-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl text-foreground">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {area.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
