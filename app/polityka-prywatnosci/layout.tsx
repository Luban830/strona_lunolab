import type { Metadata } from 'next'
import BreadcrumbList from '@/components/BreadcrumbList'

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności serwisu Lunolab. Dowiedz się jak przetwarzamy Twoje dane osobowe zgodnie z RODO.",
  openGraph: {
    title: "Polityka prywatności | Lunolab",
    description: "Polityka prywatności serwisu Lunolab. Zasady przetwarzania danych osobowych zgodnie z RODO.",
    url: "https://lunolab.pl/polityka-prywatnosci",
  },
  alternates: {
    canonical: "https://lunolab.pl/polityka-prywatnosci",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PolitykaPrywatnosciLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbList
        items={[
          { name: "Strona główna", url: "https://lunolab.pl" },
          { name: "Polityka prywatności", url: "https://lunolab.pl/polityka-prywatnosci" },
        ]}
      />
      {children}
    </>
  )
}
