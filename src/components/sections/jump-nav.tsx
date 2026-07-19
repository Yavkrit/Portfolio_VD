export function JumpNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Sections on this page"
      className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-6 py-4">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
