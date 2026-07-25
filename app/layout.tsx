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

export const metadata: Metadata = {
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
    url: "https://baxilstore.com",
    siteName: "Baxil Store",
    images: [
      {
        url: "/images/carbon-variant-3.png", // Gambar No. 3 - Carbon Variant
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
    images: ["/images/carbon-variant-3.png"],
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
```eof

### Ringkasan Perubahan:
1. **Metadata Lengkap**: Mengatur judul (`Baxil Store`), deskripsi resmi, serta *keywords* untuk keperluan SEO.
2. **OpenGraph & Twitter Cards**: Menambahkan path gambar varian Carbon No. 3 (`/ images / carbon - variant - 3.jpg`) agar pratinjau tautan di media sosial tampil elegan.
3. **Bahasa & Tema Dark Carbon**: Mengubah tag HTML `lang = "id"` dan memberikan dasar tema gelap/carbon pada elemen `body`.

Pastikan Anda menyimpan file gambar varian Carbon No. 3 di dalam folder `public / images / carbon - variant - 3.jpg` pada proyek Next.js Anda. Jika ada penyesuaian lain yang diinginkan, silakan beri tahu saya!