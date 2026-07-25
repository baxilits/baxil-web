import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Domain utama Anda saat ini
const baseUrl = "https://baxil-store.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Baxil Store - Toko Online Resmi Baxil Store - Belanja Mudah & Cepat",
    template: "%s | Baxil Store",
  },
  description: "Toko Online Resmi Baxil Store - Belanja Mudah & Cepat. Dapatkan produk berkualitas dengan pelayanan terbaik.",
  keywords: ["Baxil Store", "Toko Online", "Belanja Mudah", "Belanja Cepat", "E-Commerce"],
  authors: [{ name: "Baxil Store" }],
  openGraph: {
    title: "Baxil Store - Toko Online Resmi",
    description: "Toko Online Resmi Baxil Store - Belanja Mudah & Cepat",
    url: baseUrl,
    siteName: "Baxil Store",
    images: [
      {
        url: `${baseUrl}/images/carbon-variant-3.png`,
        width: 1200,
        height: 630,
        alt: "Baxil Store - Carbon Variant",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baxil Store - Toko Online Resmi",
    description: "Toko Online Resmi Baxil Store - Belanja Mudah & Cepat",
    images: [`${baseUrl}/images/carbon-variant-3.png`],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 dark">{children}</body>
    </html>
  );
}