import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/research", priority: 0.8, changeFrequency: "monthly" },
    { path: "/publications", priority: 0.9, changeFrequency: "weekly" },
    { path: "/innovations", priority: 0.7, changeFrequency: "monthly" },
    { path: "/recognition", priority: 0.7, changeFrequency: "monthly" },
    { path: "/career-journey", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resume", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
