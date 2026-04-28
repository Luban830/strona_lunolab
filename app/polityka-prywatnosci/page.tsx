'use client'

import { motion } from 'framer-motion'

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-[#0a0b0a] pt-20">
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Polityka <span className="text-[#27F579] neon-glow">prywatności</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Zasady przetwarzania Twoich danych osobowych w serwisie Lunolab
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#242424] border border-gray-700 rounded-lg p-6 sm:p-10 lg:p-12 space-y-10 text-gray-300 leading-relaxed"
          >
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">1. Definicje</h2>
              <ul className="space-y-3">
                <li><span className="text-[#27F579] font-semibold">1.1. Administrator</span> – LUNOLAB sp. z o. o. z siedzibą w Warszawie przy ul. Marcina Kasprzaka 31/119, 01-234 Warszawa.</li>
                <li><span className="text-[#27F579] font-semibold">1.2. Dane osobowe</span> – informacje o osobie fizycznej zidentyfikowanej lub możliwej do zidentyfikowania poprzez jeden bądź kilka szczególnych czynników określających fizyczną, fizjologiczną, genetyczną, psychiczną, ekonomiczną, kulturową lub społeczną tożsamość, w tym IP urządzenia, dane o lokalizacji, identyfikator internetowy oraz informacje gromadzone za pośrednictwem plików cookie oraz innej podobnej technologii.</li>
                <li><span className="text-[#27F579] font-semibold">1.3. Polityka</span> – niniejsza Polityka prywatności.</li>
                <li><span className="text-[#27F579] font-semibold">1.4. RODO</span> – Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE.</li>
                <li><span className="text-[#27F579] font-semibold">1.5. Serwis</span> – serwis internetowy prowadzony przez Administratora pod adresem <a href="https://www.lunolab.pl/" className="text-[#27F579] hover:underline">https://www.lunolab.pl/</a></li>
                <li><span className="text-[#27F579] font-semibold">1.6. Użytkownik</span> – każda osoba fizyczna odwiedzająca Serwis lub korzystająca z jednej albo kilku usług czy funkcjonalności opisanych w Polityce.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">2. Przetwarzanie danych w związku z korzystaniem z serwisu</h2>
              <p>
                <span className="text-[#27F579] font-semibold">2.1.</span> W związku z korzystaniem przez Użytkownika z Serwisu Administrator zbiera dane w zakresie niezbędnym do świadczenia poszczególnych oferowanych usług, a także informacje o aktywności Użytkownika w Serwisie. Poniżej zostały opisane szczegółowe zasady oraz cele przetwarzania Danych osobowych gromadzonych podczas korzystania z Serwisu przez Użytkownika.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">3. Cele i podstawy prawne przetwarzania danych w serwisie</h2>
              <h3 className="text-xl font-semibold text-white mb-3">Korzystanie z serwisu</h3>
              <p className="mb-4">
                <span className="text-[#27F579] font-semibold">3.1.</span> Dane osobowe wszystkich osób korzystających z Serwisu (w tym adres IP lub inne identyfikatory oraz informacje gromadzone za pośrednictwem plików cookies czy innych podobnych technologii), a niebędących zarejestrowanymi Użytkownikami (tj. osób, które nie posiadają profilu w Serwisie), przetwarzane są przez Administratora:
              </p>
              <ul className="space-y-3 list-disc list-inside ml-2 mb-6">
                <li><span className="text-[#27F579] font-semibold">3.1.1.</span> w celu świadczenia usług drogą elektroniczną w zakresie udostępniana Użytkownikom treści gromadzonych w Serwisie – wówczas podstawą prawną przetwarzania jest niezbędność przetwarzania do wykonania umowy (art. 6 ust. 1 lit. b RODO);</li>
                <li><span className="text-[#27F579] font-semibold">3.1.2.</span> w celach analitycznych i statystycznych – wówczas podstawą prawną przetwarzania jest prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO), polegający na prowadzeniu analiz aktywności Użytkowników, a także ich preferencji w celu poprawy stosowanych funkcjonalności i świadczonych usług;</li>
                <li><span className="text-[#27F579] font-semibold">3.1.3.</span> w celu ewentualnego ustalenia i dochodzenia roszczeń lub obrony przed roszczeniami – podstawą prawną przetwarzania jest prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO), polegający na ochronie jego praw;</li>
                <li><span className="text-[#27F579] font-semibold">3.1.4.</span> w celach marketingowych Administratora oraz innych podmiotów, w szczególności związanych z prezentowaniem reklamy behawioralnej – zasady przetwarzania Danych osobowych w celach marketingowych zostały opisane w sekcji Marketing.</li>
              </ul>
              <p className="mb-6">
                <span className="text-[#27F579] font-semibold">3.2.</span> Aktywność Użytkownika w Serwisie, w tym jego Dane osobowe, są rejestrowane w logach systemowych. Zebrane w logach informacje przetwarzane są przede wszystkim w celach związanych ze świadczeniem usług. Administrator przetwarza je również w celach technicznych, administracyjnych, na potrzeby zapewnienia bezpieczeństwa systemu informatycznego oraz zarządzania tym systemem, a także w celach analitycznych i statystycznych – w tym zakresie podstawą prawną przetwarzania jest prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO).
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Formularze kontaktowe</h3>
              <p className="mb-4">
                <span className="text-[#27F579] font-semibold">3.3.</span> Administrator zapewnia możliwość skontaktowania się z nim przy wykorzystaniu elektronicznych formularzy kontaktowych. Skorzystanie z formularza wymaga podania Danych osobowych niezbędnych do nawiązania kontaktu z Użytkownikiem i udzielenia odpowiedzi na zapytanie.
              </p>
              <p className="mb-3"><span className="text-[#27F579] font-semibold">3.4.</span> Dane osobowe są przetwarzane:</p>
              <ul className="space-y-3 list-disc list-inside ml-2">
                <li><span className="text-[#27F579] font-semibold">3.4.1.</span> w celu identyfikacji nadawcy oraz obsługi jego zapytania – podstawą prawną przetwarzania jest niezbędność przetwarzania do wykonania umowy o świadczenie usługi (art. 6 ust. 1 lit. b RODO); w zakresie danych podanych fakultatywnie podstawą prawną jest zgoda (art. 6 ust. 1 lit. a RODO);</li>
                <li><span className="text-[#27F579] font-semibold">3.4.2.</span> w celach analitycznych i statystycznych – podstawą prawną przetwarzania jest prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">4. Marketing</h2>
              <p className="mb-4"><span className="text-[#27F579] font-semibold">4.1.</span> Administrator przetwarza Dane osobowe Użytkowników w celu realizowania działań marketingowych (reklama kontekstowa, behawioralna, newsletter, marketing bezpośredni).</p>
              <p className="mb-6"><span className="text-[#27F579] font-semibold">4.2.</span> W celu realizowania działań marketingowych Administrator w niektórych przypadkach wykorzystuje profilowanie.</p>

              <h3 className="text-xl font-semibold text-white mb-3">Reklama kontekstowa</h3>
              <p className="mb-6"><span className="text-[#27F579] font-semibold">4.3.</span> Przetwarzanie odbywa się w związku z realizacją prawnie uzasadnionego interesu Administratora (art. 6 ust. 1 lit. f RODO).</p>

              <h3 className="text-xl font-semibold text-white mb-3">Reklama behawioralna</h3>
              <p className="mb-3"><span className="text-[#27F579] font-semibold">4.4.</span> Administrator oraz jego zaufani partnerzy przetwarzają Dane osobowe dla celów reklamy behawioralnej.</p>
              <p className="mb-6"><span className="text-[#27F579] font-semibold">4.5.</span> Lista zaufanych partnerów Administratora: Google Analytics, Google Tag Manager, Google AdWords, Google AdSense, Facebook Custom Audiences, Facebook, Meta, Twitter, LinkedIn, Hotjar, SoundCloud, YouTube.</p>

              <h3 className="text-xl font-semibold text-white mb-3">Newsletter</h3>
              <p className="mb-3"><span className="text-[#27F579] font-semibold">4.6.</span> Administrator świadczy usługę newslettera osobom, które podały swój adres e-mail.</p>
              <p className="mb-6"><span className="text-[#27F579] font-semibold">4.7.</span> Dane są przetwarzane w celu świadczenia usługi (art. 6 ust. 1 lit. b RODO) oraz w celach analitycznych i marketingowych (art. 6 ust. 1 lit. f RODO).</p>

              <h3 className="text-xl font-semibold text-white mb-3">Kontrahenci i reprezentanci</h3>
              <p className="mb-6"><span className="text-[#27F579] font-semibold">4.9.</span> Dane są przetwarzane w celu wykonania umowy handlowej oraz ochrony roszczeń – podstawą prawną jest uzasadniony interes Administratora (art. 6 ust. 1 lit f RODO).</p>

              <h3 className="text-xl font-semibold text-white mb-3">Marketing bezpośredni</h3>
              <p><span className="text-[#27F579] font-semibold">4.10.</span> Działania (e-mail, SMS/MMS, telefon) są podejmowane wyłącznie w przypadku, gdy Użytkownik wyraził na nie zgodę.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">5. Portale społecznościowe</h2>
              <p><span className="text-[#27F579] font-semibold">5.1.</span> Administrator przetwarza dane Użytkowników odwiedzających profile w mediach społecznościowych (Facebook, YouTube, Instagram, Twitter) w celu promowania własnej marki (art. 6 ust. 1 lit. f RODO).</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">6. Pliki cookies oraz podobna technologia</h2>
              <p><span className="text-[#27F579] font-semibold">6.1.</span> Cookies zbierają informacje ułatwiające korzystanie ze strony. Administrator wykorzystuje cookies „serwisowe” (niezbędne) oraz „marketingowe” (wymagające zgody).</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">7. Narzędzia analityczne i marketingowe</h2>
              <p>Administrator stosuje narzędzia takie jak: Google Analytics (7.2), Google AdWords (7.3), Piksele Facebooka (7.4), Wtyczki społecznościowe (7.5) oraz Hotjar (7.6).</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">8. Zarządzanie ustawieniami cookies</h2>
              <p><span className="text-[#27F579] font-semibold">8.1.</span> Wykorzystanie cookies (poza niezbędnymi) wymaga zgody, którą można wycofać w ustawieniach przeglądarki.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">9. Okres przetwarzania danych osobowych</h2>
              <p><span className="text-[#27F579] font-semibold">9.1.</span> Dane przetwarzane są przez czas świadczenia usługi, do czasu wycofania zgody lub zgłoszenia skutecznego sprzeciwu. Okres ten może zostać przedłużony o czas przedawnienia roszczeń.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">10. Uprawnienia użytkownika</h2>
              <p><span className="text-[#27F579] font-semibold">10.1.</span> Użytkownikowi przysługuje prawo dostępu do danych, sprostowania, usunięcia, ograniczenia, przenoszenia, wniesienia sprzeciwu oraz skargi do organu nadzorczego (Prezesa UODO).</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">11. Odbiorcy danych</h2>
              <p><span className="text-[#27F579] font-semibold">11.1.</span> Dane mogą być ujawniane zewnętrznym dostawcom (IT, księgowość, kurierzy, agencje marketingowe) oraz organom publicznym na podstawie przepisów prawa.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">12. Przekazywanie danych poza EOG</h2>
              <p><span className="text-[#27F579] font-semibold">12.1.</span> Administrator przekazuje dane poza EOG tylko z zapewnieniem odpowiedniego stopnia ochrony (standardowe klauzule umowne, decyzje KE, Tarcza Prywatności/następcze mechanizmy).</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">13. Bezpieczeństwo danych osobowych</h2>
              <p><span className="text-[#27F579] font-semibold">13.1.</span> Administrator na bieżąco prowadzi analizę ryzyka i dba, aby dostęp do danych miały jedynie osoby upoważnione.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">14. Dane kontaktowe</h2>
              <p>
                <span className="text-[#27F579] font-semibold">14.1.</span> Kontakt z Administratorem jest możliwy poprzez adres e-mail:{' '}
                <a href="mailto:lunolabx@gmail.com" className="text-[#27F579] hover:underline">lunolabx@gmail.com</a>
                {' '}lub adres korespondencyjny: LUNOLAB sp. z o. o., ul. Marcina Kasprzaka 31/119, 01-234 Warszawa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">15. Zmiany polityki prywatności</h2>
              <p><span className="text-[#27F579] font-semibold">15.2.</span> Aktualna wersja Polityki została przyjęta i obowiązuje od 18.02.2026 r.</p>
            </section>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
