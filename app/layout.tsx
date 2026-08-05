import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import PageTracker from "./components/Analytics/PageTracker";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "REACreative.idn — Bangun Website & Sistem Bisnis Digital",
  description:
    "Kami membantu Anda membangun website, e-commerce, sistem kasir, hingga aplikasi mobile yang siap jualan dan operasional. Tampilan menarik, loading cepat, dan fokus pada konversi.",
  keywords: [
    "jasa pembuatan website",
    "website bisnis",
    "e-commerce",
    "aplikasi mobile",
    "sistem kasir",
    "digital agency indonesia",
    "reacreative",
  ],
  authors: [{ name: "REACreative.idn" }],
  creator: "REACreative.idn",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: defaultUrl,
    title: "REACreative.idn — Bangun Website & Sistem Bisnis Digital",
    description:
      "Website, e-commerce, sistem kasir, hingga aplikasi mobile yang siap jualan.",
    siteName: "REACreative.idn",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "REACreative.idn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REACreative.idn — Bangun Website & Sistem Bisnis Digital",
    description:
      "Website, e-commerce, sistem kasir, hingga aplikasi mobile yang siap jualan.",
    images: ["/twitter-image.png"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Suspense fallback={null}>
          <PageTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
