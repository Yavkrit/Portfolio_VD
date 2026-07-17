import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { ProfileLinks } from "@/components/sections/profile-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-display text-xl text-foreground">{profile.name}</p>
            <p className="mt-2 max-w-sm text-sm text-foreground-muted">
              {profile.title}, {profile.division}, {profile.institute}
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
              Navigate
            </p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
              Affiliation
            </p>
            <p className="mt-3 text-sm text-foreground-muted">
              CSIR – Central Scientific Instruments Organisation
              <br />
              Sector 30-C, Chandigarh 160030, India
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
              Profiles
            </p>
            <ProfileLinks className="mt-3" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="font-mono">CSIR-CSIO / IMCS Division</p>
        </div>
      </div>
    </footer>
  );
}
