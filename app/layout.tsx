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
  title: "Lunolab - Automatyzacje procesów w AI",
  description: "Lunolab - Zaawansowane automatyzacje procesów w sztucznej inteligencji dla Twojej firmy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${montserrat.variable} font-sans antialiased bg-[#151716] text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
