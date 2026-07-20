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
    default: "FSK Codehouse Corp. — Software for real business.",
    template: "%s | FSK Codehouse Corp.",
  },
  description:
    "FSK Codehouse Corp. builds real-estate platforms, digital product storefronts, and web and mobile applications for clients, partners, and its own portfolio.",
  keywords: [
    "FSK Codehouse",
    "mobile apps",
    "Philippines",
    "software company",
    "digital products",
    "real estate websites",
    "listing management",
    "web applications",
  ],
  authors: [{ name: "FSK Codehouse Corp." }],
  metadataBase: new URL("https://fskcodehouse.com"),
  icons: {
    icon: [{ url: "/fsk-logo-icon.png", type: "image/png" }],
    shortcut: "/fsk-logo-icon.png",
    apple: "/fsk-logo-icon.png",
  },
  openGraph: {
    title: "FSK Codehouse Corp.",
    description: "Real-estate platforms, digital commerce, and web and mobile applications built for real business.",
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
    description: "Real-estate platforms, digital commerce, and web and mobile applications built for real business.",
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
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg-primary font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
