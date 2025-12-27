'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { NoiseBackground } from '@/components/ui/noise-background'

const longTermDetails = [
  'Indywidualne podejście do Twojego biznesu',
  'Ciągłe wsparcie i optymalizacja rozwiązań',
  'Regularne przeglądy i raporty postępów',
  'Elastyczne dostosowanie do zmieniających się potrzeb',
  'Długoterminowa relacja partnerska',
]

const oneTimeDetails = [
  'Szybka realizacja projektu',
  'Kompletna dokumentacja dostarczona wraz z produktem',
  'Jednorazowa inwestycja bez dodatkowych opłat',
  'Wsparcie wdrożeniowe po dostarczeniu',
  'Gotowe rozwiązanie do natychmiastowego użycia',
]

const services = [
  {
    title: 'Automatyzacja procesów biznesowych',
    description: 'Tworzymy inteligentne systemy, które automatyzują powtarzalne zadania i optymalizują przepływ pracy w Twojej firmie.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="8" x="3" y="3" rx="2"></rect>
        <path d="M7 11v4a2 2 0 0 0 2 2h4"></path>
        <rect width="8" height="8" x="13" y="13" rx="2"></rect>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1635776063328-153b13e3c245?w=800&q=80',
    stat: '40+ godzin tygodniowo',
  },
  {
    title: 'Rozwiązania AI i Machine Learning',
    description: 'Wdrażamy zaawansowane modele uczenia maszynowego dostosowane do specyfiki Twojego biznesu.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1635776062360-af423602aff3?w=800&q=80',
    stat: '95% dokładności',
  },
  {
    title: 'Integracje systemowe',
    description: 'Łączymy różne systemy i narzędzia, tworząc spójne środowisko pracy dla Twojego zespołu.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 18 6-6-6-6"></path>
        <path d="m8 6-6 6 6 6"></path>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=800&q=80',
    stat: 'Bezproblemowe połączenia',
  },
  {
    title: 'Optymalizacja workflow',
    description: 'Analizujemy i usprawniamy procesy, eliminując wąskie gardła i zwiększając produktywność.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="20" y2="10"></line>
        <line x1="18" x2="18" y1="20" y2="4"></line>
        <line x1="6" x2="6" y1="20" y2="16"></line>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&q=80',
    stat: 'Do 300% wydajności',
  },
]

export default function Services() {
  const [openModal, setOpenModal] = useState<'long-term' | 'one-time' | null>(null)

  // Block body scroll when modal is open
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [openModal])

  return (
    <section id="uslugi" className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-[#151716]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Nasze <span className="text-[#27F579] neon-glow">usługi</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Kompleksowe rozwiązania automatyzacyjne dostosowane do Twoich potrzeb
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group visible cursor-pointer"
            >
              <div
                className="relative transform overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-[0_0_30px_rgba(39,245,121,0.3)]"
                style={{
                  background: `linear-gradient(rgba(39, 245, 121, 0.25), rgba(21, 23, 22, 0.75)), url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#27F579]/20 border border-[#27F579]/30">
                    <div className="h-6 w-6 text-[#27F579]">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="mb-2 font-sans text-lg font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mb-4 font-sans text-sm text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center text-[#27F579]/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 h-4 w-4"
                    >
                      <path d="M12 6v6l4 2"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span className="font-sans text-xs font-medium">{service.stat}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ways of collaboration */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Działamy na dwa sposoby
            </h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Wybierz formę współpracy, która najlepiej odpowiada Twoim potrzebom
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Long-term collaboration */}
            <div className="bg-[#1a1a1a] border border-[#27F579]/20 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-[#27F579] mb-8">Współpraca długoterminowa</h4>
              <div className="space-y-6">
                {[
                  { step: 1, label: 'Konsultacja', active: true },
                  { step: 2, label: 'Analiza potrzeb', active: true },
                  { step: 3, label: 'Wdrożenie', active: true },
                  { step: 4, label: 'Wsparcie i optymalizacja', active: false },
                ].map((item, index, array) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          item.active
                            ? 'bg-[#27F579] text-[#151716]'
                            : 'bg-[#1a7a4a] text-white'
                        }`}
                      >
                        {item.step}
                      </div>
                      {index < array.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 mt-2 ${
                            item.active ? 'bg-[#27F579]' : 'bg-[#1a7a4a]'
                          }`}
                          style={{ minHeight: '40px' }}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <p
                        className={`text-lg font-medium ${
                          item.active ? 'text-[#27F579]' : 'text-[#1a7a4a]'
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Button */}
              <div className="mt-8 flex justify-end">
                <NoiseBackground
                  containerClassName="w-fit"
                  gradientColors={['rgb(39, 245, 121)', 'rgb(26, 122, 74)', 'rgb(39, 245, 121)']}
                >
                  <button
                    onClick={() => setOpenModal('long-term')}
                    className="cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-6 py-3 text-[#151716] font-semibold shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-100 active:scale-95 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_1px_2px_0px_rgba(0,0,0,0.4)]"
                  >
                    Szczegóły &rarr;
                  </button>
                </NoiseBackground>
              </div>
            </div>

            {/* One-time product */}
            <div className="bg-[#1a1a1a] border border-[#27F579]/20 rounded-2xl p-8 relative">
              <h4 className="text-2xl font-bold text-[#27F579] mb-8">Dostarczanie jednorazowego produktu</h4>
              <div className="space-y-6">
                {[
                  { step: 1, label: 'Brief', active: true },
                  { step: 2, label: 'Projektowanie', active: true },
                  { step: 3, label: 'Realizacja', active: true },
                  { step: 4, label: 'Dostarczenie', active: false },
                ].map((item, index, array) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          item.active
                            ? 'bg-[#27F579] text-[#151716]'
                            : 'bg-[#1a7a4a] text-white'
                        }`}
                      >
                        {item.step}
                      </div>
                      {index < array.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 mt-2 ${
                            item.active ? 'bg-[#27F579]' : 'bg-[#1a7a4a]'
                          }`}
                          style={{ minHeight: '40px' }}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <p
                        className={`text-lg font-medium ${
                          item.active ? 'text-[#27F579]' : 'text-[#1a7a4a]'
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Button */}
              <div className="mt-8 flex justify-end">
                <NoiseBackground
                  containerClassName="w-fit"
                  gradientColors={['rgb(39, 245, 121)', 'rgb(26, 122, 74)', 'rgb(39, 245, 121)']}
                >
                  <button
                    onClick={() => setOpenModal('one-time')}
                    className="cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-6 py-3 text-[#151716] font-semibold shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-100 active:scale-95 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_1px_2px_0px_rgba(0,0,0,0.4)]"
                  >
                    Szczegóły &rarr;
                  </button>
                </NoiseBackground>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {openModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpenModal(null)}
          >
            <div
              className="bg-[#1a1a1a] border border-[#27F579]/30 rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-[#27F579]">
                  {openModal === 'long-term' ? 'Współpraca długoterminowa' : 'Dostarczanie jednorazowego produktu'}
                </h3>
                <button
                  onClick={() => setOpenModal(null)}
                  className="text-gray-400 hover:text-[#27F579] transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left side - Text details */}
                <div className="space-y-4">
                  {(openModal === 'long-term' ? longTermDetails : oneTimeDetails).map((detail, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#27F579]/20 border border-[#27F579]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#27F579]" />
                      </div>
                      <p className="text-gray-300 text-lg">{detail}</p>
                    </div>
                  ))}
                </div>

                {/* Right side - Image */}
                <div className="relative flex justify-center items-center">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/1.jpg"
                      alt="Współpraca"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

