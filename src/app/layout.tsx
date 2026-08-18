import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/blog/structured-data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display face. Used only for headings via the `.display` class — body copy
 * stays on Inter, so a slow font load can never delay reading text.
 */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FSK Codehouse — Real-estate platforms and mobile products.",
    template: "%s | FSK Codehouse",
  },
  description:
    "FSK Codehouse is a Philippine software studio building real-estate platforms and web and mobile applications for clients, partners, and its own portfolio.",
  keywords: [
    "FSK Codehouse",
    "mobile apps",
    "Philippines",
    "software company",
    "real estate websites",
    "listing management",
    "web applications",
  ],
  authors: [{ name: "FSK Codehouse" }],
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/fsk-logo-icon.png", type: "image/png" }],
    shortcut: "/fsk-logo-icon.png",
    apple: "/fsk-logo-icon.png",
  },
  openGraph: {
    title: "FSK Codehouse",
    description: "Real-estate platforms and web and mobile applications, built in the Philippines.",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/og-fsk.svg",
        width: 1200,
        height: 630,
        alt: "FSK Codehouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FSK Codehouse",
    description: "Real-estate platforms and web and mobile applications, built in the Philippines.",
    images: ["/og-fsk.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${instrument.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg-primary font-[family-name:var(--font-inter)]">
        {children}
        <CookieConsent />
        {/* Site-wide publisher entity. Page-level schemas (BlogPosting,
            Blog, CollectionPage) reference this node by @id instead of
            repeating it. */}
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
