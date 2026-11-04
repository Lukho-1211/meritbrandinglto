import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desk",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-10 sm:px-8">
      {children}
    </div>
  );
}
