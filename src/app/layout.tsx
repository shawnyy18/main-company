import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FSK Codehouse Corp. — We build apps people actually use.",
    template: "%s | FSK Codehouse Corp.",
  },
  description:
    "FSK Codehouse Corp. is a Philippine-based software company that builds mobile apps and digital products people actually use.",
  keywords: [
    "FSK Codehouse",
    "mobile apps",
    "Philippines",
    "software company",
    "digital products",
  ],
  authors: [{ name: "FSK Codehouse Corp." }],
  metadataBase: new URL("https://fskcodehouse.com"),
  openGraph: {
    title: "FSK Codehouse Corp.",
    description: "We build apps people actually use.",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/og-fsk.svg",
        width: 1200,
        height: 630,
        alt: "FSK Codehouse Corp.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FSK Codehouse Corp.",
    description: "We build apps people actually use.",
    images: ["/og-fsk.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-bg-primary font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
