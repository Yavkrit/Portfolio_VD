import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-light text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-foreground-muted">
          {description}
        </p>
      )}
    </div>
  );
}
