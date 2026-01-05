'use client'

export default function Footer() {
  return (
    <footer className="bg-[#0a0b0a] border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent mb-4">Lunolab</h3>
            <p className="text-gray-400">
              Automatyzujemy przyszłość z AI. Tworzymy inteligentne rozwiązania
              dla Twojego biznesu.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: kontakt@lunolab.pl</li>
              <li>Telefon: +48 538 522 778</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              <li>
                <a href="#uslugi" className="text-gray-400 hover:text-[#27F579] transition-colors" aria-label="Przejdź do sekcji Usługi">
                  Usługi
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-gray-400 hover:text-[#27F579] transition-colors" aria-label="Przejdź do sekcji Projekty">
                  Projekty
                </a>
              </li>
              <li>
                <a href="#video" className="text-gray-400 hover:text-[#27F579] transition-colors" aria-label="Przejdź do sekcji O nas">
                  O nas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Lunolab. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}


