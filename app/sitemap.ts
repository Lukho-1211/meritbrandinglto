import type { MetadataRoute } from "next";
import { getPublicOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getPublicOrigin();
  const lastModified = new Date("2026-11-07");

  return [
    { url: origin, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${origin}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${origin}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
