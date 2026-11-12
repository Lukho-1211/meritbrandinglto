import type { MetadataRoute } from "next";
import { getPublicOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/desk", "/portal", "/auth"],
    },
    sitemap: `${getPublicOrigin()}/sitemap.xml`,
  };
}
