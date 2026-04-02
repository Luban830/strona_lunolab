import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lunolab.pl'),
  title: {
    default: "Lunolab - Automatyzacje procesów w AI dla Firm",
    template: "%s | Lunolab"
  },
  description: "Lunolab oferuje zaawansowane automatyzacje procesów biznesowych z wykorzystaniem sztucznej inteligencji. Automatyzujemy zadania powtarzalne, optymalizujemy workflow i zwiększamy efektywność Twojej firmy.",
  keywords: [
    "automatyzacja AI",
    "automatyzacja procesów",
    "AI dla firm",
    "automatyzacja biznesu",
    "sztuczna inteligencja",
    "automatyzacja workflow",
    "automatyzacja zadań",
    "AI automatyzacja",
    "inteligentna automatyzacja",
    "automatyzacja procesów biznesowych"
  ],
  authors: [{ name: "Lunolab" }],
  creator: "Lunolab",
  publisher: "Lunolab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://lunolab.pl",
    siteName: "Lunolab",
    title: "Lunolab - Automatyzacje procesów w AI dla Firm",
    description: "Zaawansowane automatyzacje procesów biznesowych z wykorzystaniem sztucznej inteligencji. Automatyzujemy zadania powtarzalne i optymalizujemy workflow Twojej firmy.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Lunolab - Automatyzacja procesów AI dla firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunolab - Automatyzacje procesów w AI dla Firm",
    description: "Zaawansowane automatyzacje procesów biznesowych z wykorzystaniem sztucznej inteligencji.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lunolab.pl",
  },
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Zalando+Sans+Expanded:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased bg-[#0a0b0a] text-white`}
        style={{ fontFamily: '"Zalando Sans Expanded", "Montserrat", sans-serif' }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
