import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border border-border bg-background-elevated p-6 transition-colors hover:border-border-strong",
        className
      )}
    >
      {children}
    </div>
  );
}
