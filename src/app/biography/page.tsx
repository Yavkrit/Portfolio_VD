import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { careerTimeline, education, profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Biography — Dr. V. D. Shivling",
  description:
    "The career and education of Dr. V. D. Shivling, Chief Scientist at CSIR-CSIO, from Scientist B in 1993 to Chief Scientist today.",
};

export default function BiographyPage() {
  return (
    <>
      <PageHero
        eyebrow="Biography"
        title="Thirty-two years at CSIR-CSIO"
        description="A career built one instrument at a time — from an entry-level Scientist B post in 1993 to leading the Agrionics programme as Chief Scientist today."
      />

      <section className="border-b border-border py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-border-strong bg-background-inset">
            <Image
              src="/images/portrait-1.png"
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="object-cover"
            />
          </div>

          <div>
            <SectionHeading eyebrow="Career" title="Progression at CSIR-CSIO" />
            <ol className="mt-8 space-y-6 border-l border-border pl-6">
              {careerTimeline.map((step) => (
                <li key={step.role} className="relative">
                  <span className="absolute -left-[1.8rem] top-1.5 h-2 w-2 rounded-full bg-accent" />
                  <p className="font-mono text-xs text-foreground-subtle">
                    {step.from} &ndash; {step.to ?? "Present"}
                  </p>
                  <p className="mt-1 font-display text-lg text-foreground">
                    {step.role}
                  </p>
                  <p className="text-sm text-foreground-muted">{step.institute}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Education" title="Academic foundation" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {education.map((deg) => (
              <div key={deg.degree} className="border border-border p-6">
                <p className="font-mono text-xs text-foreground-subtle">{deg.year}</p>
                <p className="mt-2 font-display text-lg text-foreground">
                  {deg.degree}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">{deg.institute}</p>
                {deg.detail && (
                  <p className="mt-3 text-sm italic text-foreground-subtle">
                    {deg.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
