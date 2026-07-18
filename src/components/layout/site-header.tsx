"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-tight text-foreground whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          DATTATRAYA VHATKAR
          <span className="ml-2 hidden text-foreground-subtle xl:inline">
            / Chief Scientist, CSIR-CSIO
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap font-mono text-[12px] uppercase tracking-wider text-foreground-muted transition-colors hover:text-foreground",
                pathname === link.href && "text-accent"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-foreground xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/60 xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-2 font-mono text-sm uppercase tracking-wider text-foreground-muted transition-colors hover:text-foreground",
                    pathname === link.href && "text-accent"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
