import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ToastProvider } from "@/providers/toast-provider";
import { PointsInitializer } from "@/components/points/points-initializer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StartupDB | The Ultimate Startup Database",
    template: `%s | StartupDB`,
  },
  description: "StartupDB is the largest and most up-to-date database of startup ideas. Find your next big idea, get feedback, and connect with other entrepreneurs.",
  keywords: ["startup", "ideas", "database", "entrepreneur", "business", "innovation"],
  authors: [{ name: "StartupDB" }],
  creator: "StartupDB",
  publisher: "StartupDB",
  openGraph: {
    title: "StartupDB | The Ultimate Startup Database",
    description: "The largest and most up-to-date database of startup ideas.",
    url: "https://lion-inky.vercel.app/",
    siteName: "StartupDB",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StartupDB | The Ultimate Startup Database",
    description: "The largest and most up-to-date database of startup ideas.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ToastProvider />
        <PointsInitializer />
        <Header />
        {children}
      </body>
    </html>
  );
}
