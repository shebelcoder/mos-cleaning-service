import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mo's Cleaning Service | Professional Cleaning in Edmonton, AB",
  description:
    "Reliable, affordable, and professional residential and commercial cleaning services in Edmonton, Alberta. Book online today!",
  keywords:
    "Cleaning Services Edmonton, House Cleaning Edmonton, Office Cleaning Edmonton, Move-in Move-out Cleaning",
  openGraph: {
    title: "Mo's Cleaning Service | Edmonton, AB",
    description: "Professional cleaning services for homes and businesses in Edmonton.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Mo's Cleaning Service",
              description: "Professional residential and commercial cleaning services",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Edmonton",
                addressRegion: "Alberta",
                addressCountry: "CA",
              },
              telephone: "+17805550100",
              email: "info@moscleaning.ca",
              areaServed: "Edmonton, Alberta",
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
