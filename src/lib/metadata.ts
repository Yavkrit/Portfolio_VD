import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { profile } from "@/data/profile";

/**
 * `title` should be the short, page-specific label (e.g. "Career Journey").
 * The root layout's title template appends ", {name}" for the <title> tag
 * automatically. Open Graph / Twitter titles aren't affected by that
 * template, so this builds the full composed string for those explicitly.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title}, ${profile.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: profile.name,
      type: "profile",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
