import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Dr Dattatraya Vhatkar for research collaboration, technology transfer, or speaking engagements.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation"
        description="For research collaboration, technology transfer, invited talks, or student supervision inquiries — send a message below."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-wider text-foreground-subtle">
              Institutional Address
            </p>
            <p className="mt-3 text-lg text-foreground">{profile.institute}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {profile.division}
              <br />
              Sector 30-C, Chandigarh 160030
              <br />
              India
            </p>
            <p className="mt-8 text-sm leading-relaxed text-foreground-muted">
              Messages sent through this form are routed directly and reviewed
              personally. Please allow a few business days for a response.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
