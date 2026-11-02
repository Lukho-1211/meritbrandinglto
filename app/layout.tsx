import type { Metadata } from "next";
import { Familjen_Grotesk, Literata } from "next/font/google";
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
  title: "Merit Branding LTO — Websites, apps, hosting, Customer Relationship Management (CRM)",
  description:
    "Merit Branding builds custom websites, web apps, hosting, and Customer Relationship Management (CRM) for South African businesses.",
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
