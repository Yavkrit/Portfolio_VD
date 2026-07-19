import { BarChart3, Briefcase, Landmark, type LucideIcon } from "lucide-react";
import { profileLinks } from "@/data/profile-links";
import { cn } from "@/lib/utils";
import { GoogleScholarMark, ResearchGateMark, OrcidMark } from "./brand-icons";

const LUCIDE_ICONS: Record<string, LucideIcon> = {
  adindex: BarChart3,
  csio: Landmark,
  // LinkedIn has no license-safe mark available (see brand-icons.tsx note),
  // so it gets the same generic-icon treatment as the institutional links.
  linkedin: Briefcase,
};

export function ProfileLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {profileLinks.map((link) => {
        const LucideMark = LUCIDE_ICONS[link.key];
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
              {link.key === "scholar" && <GoogleScholarMark size={16} />}
              {link.key === "researchgate" && <ResearchGateMark size={16} />}
              {link.key === "orcid" && <OrcidMark size={16} />}
              {LucideMark && <LucideMark size={16} strokeWidth={1.75} />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
