import type { Metadata } from "next";

// Root layout for routes outside the [locale] segment (currently just
// /studio — the embedded Sanity Studio, which renders its own full UI).
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
