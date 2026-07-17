import { GraduationCap, Network, BarChart3, Landmark, type LucideIcon } from "lucide-react";
import { profileLinks } from "@/data/profile-links";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  scholar: GraduationCap,
  researchgate: Network,
  adindex: BarChart3,
  csio: Landmark,
};

export function ProfileLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {profileLinks.map((link) => {
        const Icon = ICONS[link.key];
        return (
          <li key={link.key}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              title={link.label}
              aria-label={`${link.label} (opens in a new tab)`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
