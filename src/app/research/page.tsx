import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { JumpNav } from "@/components/sections/jump-nav";
import { BackToTop } from "@/components/sections/back-to-top";
import { Card } from "@/components/ui/card";
import {
  researchAreas,
  flagshipProjects,
  technologiesAsPI,
  prototypesDeveloped,
} from "@/data/projects";
import { researchImpactSummary } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Research",
  description:
    "Research areas, funded projects, and supervised scholarship in agrionics, sensor instrumentation, and applied electronics.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Instrumentation built to leave the lab"
        description="Thirty-four funded projects spanning agrionics, microwave-absorbing nanomaterials, and biomechanics, engineered with field deployment, not publication alone, as the goal."
      />

      <JumpNav
        items={[
          { href: "#focus-areas", label: "Focus Areas" },
          { href: "#funded-projects", label: "Funded Projects" },
          { href: "#technologies", label: "Technologies & Prototypes" },
          { href: "#scale", label: "Programme Scale" },
        ]}
      />

      <section id="focus-areas" className="scroll-mt-32 border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Focus Areas" title="Where the work concentrates" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {researchAreas.map((area) => (
              <Card key={area.title}>
                <h3 className="font-display text-xl text-foreground">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {area.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="funded-projects" className="scroll-mt-32 border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Funded Projects"
            title="Flagship projects as Principal Investigator & coordinator"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {flagshipProjects.map((project) => (
              <Card key={project.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-foreground">
                    {project.title}
                  </h3>
                  {project.funding && (
                    <span className="font-mono text-xs tabular-nums text-accent">
                      {project.funding}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                  {project.role}
                  {project.years ? ` · ${project.years}` : ""}
                  {project.fundingAgency ? ` · ${project.fundingAgency}` : ""}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {project.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="technologies" className="scroll-mt-32 border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Technologies"
              title="Developed as Principal Investigator"
            />
            <ul className="mt-8 space-y-3">
              {technologiesAsPI.map((tech) => (
                <li
                  key={tech}
                  className="border-b border-border pb-3 text-sm text-foreground-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Prototypes" title="Taken to working prototype" />
            <ul className="mt-8 space-y-3">
              {prototypesDeveloped.map((proto) => (
                <li
                  key={proto}
                  className="border-b border-border pb-3 text-sm text-foreground-muted"
                >
                  {proto}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="scale" className="scroll-mt-32 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Scale" title="Research programme at a glance" />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              {
                label: "Externally Funded",
                value: researchImpactSummary.externallyFundedProjects.count,
                sub: researchImpactSummary.externallyFundedProjects.value,
              },
              {
                label: "CSIR Projects",
                value: researchImpactSummary.csirProjects.count,
                sub: researchImpactSummary.csirProjects.value,
              },
              {
                label: "Departmental Projects",
                value: researchImpactSummary.departmentalProjects.count,
                sub: researchImpactSummary.departmentalProjects.value,
              },
              {
                label: "PG Theses Supervised",
                value: researchImpactSummary.pgThesisSupervised,
                sub: "M.Tech scholars",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-foreground tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                  {stat.label}
                </p>
                <p className="text-xs text-foreground-subtle">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
}
