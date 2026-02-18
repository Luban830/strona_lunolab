'use client'

import Image from 'next/image'

export default function OurApproach() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Left side - Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] sm:max-w-[600px] lg:max-w-[650px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
              <Image
                src="https://pub-7713d4f0b3634fa085d0153341a85fef.r2.dev/DSCF8700.jpg"
                alt="Nasze podejście do współpracy z klientami - Lunolab automatyzacja AI"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Header */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-4 sm:mb-6">
                Nasze <span className="bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">podejście</span>
              </h2>
            </div>

            {/* Content */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Ceny ustalamy w zależności od projektu i ścieżki wybranej przez klienta. Staramy się iść na kompromis, ponieważ najbardziej nam zależy, żeby współpracować z naszymi klientami.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Dla nas to <span className="text-[#27F579] font-semibold">współpraca</span>, a nie wynajem. Budujemy długoterminowe relacje partnerskie, gdzie razem pracujemy nad osiągnięciem Twoich celów biznesowych.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Każdy projekt traktujemy indywidualnie, dostosowując rozwiązania do unikalnych potrzeb Twojej firmy. Nasze podejście opiera się na zrozumieniu, elastyczności i wspólnym dążeniu do sukcesu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

