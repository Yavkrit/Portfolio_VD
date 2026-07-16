import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
