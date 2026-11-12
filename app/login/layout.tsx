import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Log in — Merit Branding" },
  description: "Sign in to your Merit Branding portal with an email link.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
