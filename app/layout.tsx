import type { Metadata, Viewport } from "next";
import { restaurant, SITE_URL } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "샤브74 | 진주 평거동 한우 투뿔 샤브샤브 · 유기농 채소",
    template: "%s | 샤브74",
  },
  description: restaurant.description,
  applicationName: restaurant.name,
  keywords: ["샤브74", "진주 샤브샤브", "평거동 맛집", "진주 한우샤브샤브", "진주 단체모임", "진주 밀키트"],
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: `${restaurant.name} (${restaurant.alternateName})`,
    images: [{ url: restaurant.media.heroPoster, width: 1408, height: 768, alt: restaurant.media.heroPosterAlt }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Pretendard: Hangul-optimised UI font (dynamic subset keeps payload small) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Material Symbols Outlined: line icons used by the Stitch design.
            display=block on purpose: with swap, ligature names ("calendar_month") flash as text. */}
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..500,0..1,0&display=block"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
