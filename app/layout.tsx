import type { Metadata } from "next";
import { Familjen_Grotesk, Literata } from "next/font/google";
import { SITE, getPublicOrigin } from "@/lib/site";
import "./globals.css";

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getPublicOrigin()),
  title: {
    default: SITE.title,
    template: "%s — Merit Branding",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: SITE.legalName,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  icons: {
    icon: [{ url: "/brand/favicon-1.png", type: "image/png" }],
    apple: [{ url: "/brand/favicon-2.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${familjen.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-field text-ink">{children}</body>
    </html>
  );
}
