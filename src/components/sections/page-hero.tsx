export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="schematic-grid relative border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-light leading-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
