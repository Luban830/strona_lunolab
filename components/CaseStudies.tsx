'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Carousel } from '@/components/ui/carousel'

// Hardkodowane projekty portfolio z rozszerzoną strukturą
const projects = [
  {
    id: 1,
    client: "Hospitadent",
    metric: "88+",
    metricLabel: "nowych rezerwacji pacjentów w miesiąc",
    description: "Automatyczne odpowiedzi 24/7 zwiększyły satysfakcję klientów i napędziły stały wzrost rezerwacji miesiąc do miesiąca.",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
    ],
    category: "AI Chatbot",
  },
  {
    id: 2,
    client: "TechCorp",
    metric: "250K+",
    metricLabel: "PLN zaoszczędzonych rocznie",
    description: "Automatyzacja procesów HR pozwoliła zredukować koszty operacyjne i przyspieszyć onboarding nowych pracowników.",
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    ],
    category: "Automatyzacja",
  },
  {
    id: 3,
    client: "E-Shop Pro",
    metric: "95%",
    metricLabel: "redukcja czasu odpowiedzi",
    description: "Inteligentny chatbot obsługuje pytania klientów natychmiast, zwiększając konwersję i lojalność klientów.",
    images: [
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
    ],
    category: "AI Chatbot",
  },
  {
    id: 4,
    client: "Marketing Agency",
    metric: "3x",
    metricLabel: "szybsze tworzenie treści",
    description: "AI generuje spersonalizowane treści marketingowe, które zwiększają zaangażowanie i konwersję.",
    images: [
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    ],
    category: "Marketing AI",
  },
  {
    id: 5,
    client: "Legal Partners",
    metric: "500+",
    metricLabel: "dokumentów przetworzonych dziennie",
    description: "OCR i AI automatycznie kategoryzują i analizują dokumenty prawne, oszczędzając godziny pracy prawników.",
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    ],
    category: "Automatyzacja",
  },
]

// Mini galeria zdjęć z płynnym ciągłym przewijaniem (marquee)
function MarqueeGallery({ images }: { images: string[] }) {
  // Duplikujemy zdjęcia dla płynnego loopa
  const duplicatedImages = [...images, ...images, ...images]

  return (
    <div className="relative w-full overflow-hidden">
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .marquee-track {
          animation: marquee-scroll 25s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div 
        className="marquee-track flex"
        style={{ width: 'max-content', gap: '2px' }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 overflow-hidden"
            style={{ width: 'clamp(160px, 30vw, 220px)', aspectRatio: '16/10' }}
          >
            <img
              src={image}
              alt={`Screenshot ${(index % images.length) + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Pojedynczy kafelek projektu
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="h-full w-full relative overflow-hidden rounded-xl sm:rounded-2xl flex flex-col" style={{ minHeight: 'clamp(480px, 70vh, 580px)' }}>
      {/* Górna sekcja z gradientem zielonym */}
      <div className="bg-gradient-to-b from-[#0a2f1a] via-[#0d4025] to-[#0a2a16] p-4 sm:p-6 md:p-8 pb-6 sm:pb-8 md:pb-10 flex-shrink-0 border-t border-l border-r border-[#27F579]/20 rounded-t-xl sm:rounded-t-2xl text-center">
        {/* Logo/nazwa klienta */}
        <div className="text-[#27F579] text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-5 tracking-wide">
          {project.client}
        </div>

        {/* Metryka - duży headline */}
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-1 sm:mb-2 leading-tight">
          {project.metric}
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white/90 leading-tight mb-3 sm:mb-4 md:mb-5">
          {project.metricLabel}
        </p>

        {/* Opis */}
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          {project.description}
        </p>
      </div>

      {/* Dolna sekcja z galerią */}
      <div className="bg-[#0a1a10] flex-1 flex flex-col border-b border-l border-r border-[#27F579]/20 rounded-b-xl sm:rounded-b-2xl">
        <MarqueeGallery images={project.images} />

        {/* CTA */}
        <div className="p-3 sm:p-4 md:p-5 pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <span className="text-white/60 text-xs sm:text-sm hidden sm:block">
            Zobacz jak możemy Ci pomóc →
          </span>
          <Link href="/umow-spotkanie" onClick={(e) => e.stopPropagation()}>
            <button className="cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-5 sm:px-6 py-2.5 sm:py-3 text-[#151716] font-semibold text-sm sm:text-base shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95 hover:scale-105 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_4px_12px_0px_rgba(39,245,121,0.4)] hover:brightness-110">
              Umów spotkanie
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      {/* Moon Logo - decorative elements */}
      <div className="absolute top-20 left-4 sm:left-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10"
          unoptimized
        />
      </div>
      <div className="absolute top-1/3 left-12 sm:left-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={45}
          height={45}
          className="w-6 h-6 sm:w-9 sm:h-9 rotate-45"
          unoptimized
        />
      </div>
      <div className="absolute top-1/6 left-20 sm:left-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute bottom-20 right-4 sm:right-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10 rotate-90"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/3 right-12 sm:right-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={45}
          height={45}
          className="w-6 h-6 sm:w-9 sm:h-9 -rotate-45"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/6 right-20 sm:right-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 -rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute top-1/2 right-8 sm:right-16 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-30"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/4 left-8 sm:left-16 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 -rotate-30"
          unoptimized
        />
      </div>
      <div className="absolute top-2/3 left-16 sm:left-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={35}
          height={35}
          className="w-5 h-5 sm:w-7 sm:h-7 rotate-120"
          unoptimized
        />
      </div>
      <div className="absolute bottom-2/3 right-16 sm:right-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={35}
          height={35}
          className="w-5 h-5 sm:w-7 sm:h-7 -rotate-120"
          unoptimized
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Nasze <span className="bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">projekty</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Zobacz jak pomagamy firmom osiągać lepsze rezultaty
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel
            options={{ loop: true, align: 'center' }}
            slides={projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10 sm:mt-12"
        >
          <Link href="/projekty">
            <button className="cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-6 sm:px-8 py-3 sm:py-4 text-[#151716] font-semibold text-base sm:text-lg shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95 hover:scale-105 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_4px_12px_0px_rgba(39,245,121,0.4)] hover:brightness-110">
              Zobacz wszystkie projekty
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
