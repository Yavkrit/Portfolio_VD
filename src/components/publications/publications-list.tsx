"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Publication } from "@/data/publications";

export function PublicationsList({ publications }: { publications: Publication[] }) {
  const [query, setQuery] = useState("");

  const years = useMemo(() => {
    const set = new Set(publications.map((p) => p.year).filter((y): y is number => y !== null));
    return Array.from(set).sort((a, b) => b - a);
  }, [publications]);

  const [yearFilter, setYearFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications
      .filter((p) => yearFilter === "all" || String(p.year) === yearFilter)
      .filter(
        (p) =>
          q === "" ||
          p.title.toLowerCase().includes(q) ||
          p.venue.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q)
      )
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }, [publications, query, yearFilter]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="publication-search">
          Search publications by title, author, or venue
        </label>
        <input
          id="publication-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or venue…"
          className="w-full border border-border bg-background-elevated px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle transition-colors focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:max-w-sm"
        />
        <label className="sr-only" htmlFor="publication-year-filter">
          Filter by year
        </label>
        <select
          id="publication-year-filter"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border border-border bg-background-elevated px-4 py-3 font-mono text-sm text-foreground transition-colors focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <p className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle sm:ml-auto">
          {filtered.length} of {publications.length}
        </p>
      </div>

      <div className="mt-10 divide-y divide-border border-t border-border">
        {filtered.length === 0 && (
          <p className="py-10 text-sm text-foreground-muted">
            No publications match &ldquo;{query}&rdquo;.
          </p>
        )}
        {filtered.map((pub) => (
          <div
            key={pub.title}
            className="grid gap-2 py-5 sm:grid-cols-[4rem_1fr_6rem] sm:gap-6"
          >
            <span className="font-mono text-sm text-foreground-subtle">
              {pub.year ?? "—"}
            </span>
            <div>
              <p className="text-base leading-snug text-foreground">{pub.title}</p>
              <p className="mt-1 text-sm text-foreground-muted">{pub.authors}</p>
              <p className="mt-0.5 text-sm italic text-foreground-subtle">{pub.venue}</p>
              {pub.doi && (
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline"
                >
                  View Paper <ExternalLink size={11} />
                </a>
              )}
            </div>
            <span className="font-mono text-sm tabular-nums text-foreground-subtle sm:text-right">
              {pub.citations !== null ? `${pub.citations} cit.` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
