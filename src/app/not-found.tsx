import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="schematic-grid flex min-h-[calc(100vh-4rem)] items-center py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-light text-foreground sm:text-5xl">
          Signal not found
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or the link may be out of date.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
