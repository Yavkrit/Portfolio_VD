"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="schematic-grid flex min-h-[calc(100vh-4rem)] items-center py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-accent">
          Error
        </p>
        <h1 className="mt-4 font-display text-4xl font-light text-foreground sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="mt-8 flex justify-center">
          <Button onClick={reset}>Try Again</Button>
        </div>
      </div>
    </section>
  );
}
