const LOCAL_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

/** Public origin for canonicals, the sitemap, and structured data. */
export function getPublicOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ?? "";
  if (configured && !LOCAL_ORIGIN.test(configured)) return configured;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/\/$/, "");
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return "https://meritbranding.com";
}

export const SITE = {
  name: "Merit Branding",
  legalName: "Merit Branding LTO",
  title: "Merit Branding — Websites, stores, apps, hosting, and CRM",
  description:
    "Merit Branding is an online studio. We build websites, online stores, web apps, hosting, and CRM for South African businesses.",
  email: "lukho@meritbranding.com",
  phoneDisplay: "+27 721 172 942",
  phoneTel: "+27721172942",
  whatsapp: "https://wa.me/27721172942",
  facebook: "https://web.facebook.com/meritbrandingL",
  instagram: "https://www.instagram.com/meritbrandinglto/",
  updated: "7 November 2026",
} as const;
