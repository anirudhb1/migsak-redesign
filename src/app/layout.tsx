import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b1020",
};

export const metadata: Metadata = {
  title: "Migsak · Web and mobile apps, connected to the way your business runs",
  description:
    "We design and build websites, mobile apps and the backend behind them, then connect them to payments, WhatsApp, CRM and ERP. Based in Bengaluru, India.",
  metadataBase: new URL("https://migsak.com"),
  keywords: [
    "Migsak",
    "software development Bengaluru",
    "web development",
    "mobile app development",
    "automation",
    "integrations",
    "Flutter",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Migsak", url: "https://migsak.com" }],
  openGraph: {
    title: "Migsak · Web and mobile apps, connected to the way your business runs",
    description:
      "Design and build websites, mobile apps, and backend integrations. One team from first screen to production.",
    url: "https://migsak.com",
    siteName: "Migsak",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Migsak · Web and mobile apps",
    description:
      "Web and mobile apps, connected to the way your business runs. Bengaluru, India.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#080c1d] text-[#f8fafc]">{children}</body>
    </html>
  );
}
