import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-accent">
          04 / Get in Touch
        </p>
        <h2 className="mt-4 font-display text-3xl font-light text-foreground sm:text-4xl">
          For collaboration, technology transfer, or speaking engagements
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground-muted">
          Reach out through the contact form — every message is reviewed
          personally.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/contact">
            <Button>Start a Conversation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
