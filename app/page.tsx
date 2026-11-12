import type { Metadata } from "next";
import { HomeJsonLd } from "@/components/HomeJsonLd";
import { HomePage } from "@/components/HomePage";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SiteShell>
      <HomeJsonLd />
      <HomePage />
    </SiteShell>
  );
}
