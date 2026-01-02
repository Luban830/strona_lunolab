'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { LayoutTextFlip } from '@/components/ui/layout-text-flip'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-20 sm:pt-24 lg:pt-8 pb-0 bg-[#0a0b0a]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]"></div>

      {/* Green gradient blob */}
      <div className="absolute top-20 right-0 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-[#27F579]/15 via-[#27F579]/5 to-transparent rounded-full blur-3xl"></div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#0a0b0a] to-transparent"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-24">

          {/* Left side - Content */}
          <div className="w-full lg:w-[55%] lg:pr-8 xl:pr-16 space-y-6 sm:space-y-8 text-center lg:text-left">

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6">
                Automatyzacja
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start lg:items-start gap-3 sm:gap-4 mb-6 overflow-visible">
                <LayoutTextFlip
                  text=""
                  words={[
                    "z AI dla Firm",
                    "procesów biznesowych",
                    "zadań powtarzalnych",
                    "workflow firmy"
                  ]}
                  duration={3000}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0 border-l-4 border-[#27F579]/40 pl-3 sm:pl-4">
              Odblokuj potencjał swojej firmy. Kompleksowe rozwiązania AI stworzone z myślą o nowoczesnych przedsiębiorstwach.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/umow-spotkanie" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#27F579] to-[#20c46a] text-[#151716] font-semibold px-6 sm:px-7 py-3 sm:py-4 rounded-full shadow-lg shadow-[#27F579]/25 hover:shadow-xl hover:shadow-[#27F579]/30 transition-all duration-300 hover:scale-105" aria-label="Umów się na darmową konsultację">
                  Darmowa konsultacja
                  <span className="w-8 h-8 bg-[#0a0b0a]/20 rounded-full flex items-center justify-center group-hover:bg-[#0a0b0a]/30 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </Link>

              <Link href="/projekty" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 text-white font-semibold px-6 sm:px-7 py-3 sm:py-4 rounded-full border border-white/20 hover:border-[#27F579]/50 hover:bg-[#27F579]/10 transition-all duration-300" aria-label="Zobacz wszystkie projekty automatyzacji AI">
                  Zobacz nasze projekty
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pl-4 xl:pl-8">
            <div className="relative w-full max-w-[450px] sm:max-w-[550px] lg:max-w-[600px] xl:max-w-[700px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
              <Image
                src="/1.jpg"
                alt="Automatyzacja procesów biznesowych z wykorzystaniem AI - Lunolab pomaga firmom zwiększać efektywność poprzez inteligentne rozwiązania"
                fill
                className="object-contain"
                priority
              />
              {/* Green gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#27F579]/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b0a]/60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
