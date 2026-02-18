'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

// Typ projektu
type Project = {
  id: number
  client: string
  title: string
  category: string
  metric: string
  metricLabel: string
  description: string
  images: string[]
  details: string
}

// Tablica projektów - dodaj tutaj nowe projekty
// Struktura projektu:
// {
//   id: number,
//   client: string,
//   title: string,
//   category: string,
//   metric: string,
//   metricLabel: string,
//   description: string,
//   images: string[],
//   details: string
// }
const projects: Project[] = []

// Funkcja do mapowania kategorii na etykiety
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'AI Chatbot': 'AI CHATBOT',
    'Automatyzacja': 'AUTOMATYZACJA',
    'Machine Learning': 'MACHINE LEARNING',
    'Computer Vision': 'COMPUTER VISION',
    'NLP': 'NLP',
  }
  return labels[category] || category.toUpperCase()
}

export default function ProjektyPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  // Blokuj scroll na body gdy modal jest otwarty
  useEffect(() => {
    if (selectedProject) {
      // Zapisz aktualną pozycję scrolla
      const scrollY = window.scrollY
      // Zablokuj scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Przywróć scroll
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        const scrollPosition = parseInt(scrollY.replace('px', '').replace('-', ''))
        window.scrollTo(0, scrollPosition)
      }
    }

    // Cleanup przy unmount
    return () => {
      if (!selectedProject) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
      }
    }
  }, [selectedProject])

  return (
    <div className="min-h-screen bg-[#0a0b0a] pt-20">
      <main className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tytuł w lewym górnym rogu */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 sm:mb-12 text-left">
            Case studies
            </h1>

          {/* Grid projektów */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectDetails(project)}
                className="bg-[#111211] rounded-2xl overflow-hidden border border-white/10 hover:border-[#27F579]/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-[#27F579]/10"
              >
                {/* Galeria screenshotów */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <div className="flex h-full">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full h-full relative"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Projekt automatyzacji AI - Zrzut ekranu ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tytuł projektu */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    {project.title}
                  </h3>

                  {/* Etykieta kategorii */}
                  <div className="inline-block">
                    <span className="px-3 py-1.5 bg-[#27F579] text-[#0a0b0a] text-xs sm:text-sm font-semibold rounded-full">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Jeśli brak projektów */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Brak projektów
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal ze szczegółami projektu */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeProjectDetails}
        >
          <div
            className="bg-[#111211] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#27F579]/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modala */}
            <div className="sticky top-0 bg-[#111211] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {selectedProject.title}
              </h2>
              <button
                onClick={closeProjectDetails}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Zawartość modala */}
            <div className="p-6">
              {/* Metryki */}
              <div className="mb-6 p-6 bg-gradient-to-br from-[#0a2f1a] via-[#0d4025] to-[#0a2a16] rounded-xl border border-[#27F579]/20">
                <div className="text-[#27F579] text-sm font-semibold mb-2">
                  {selectedProject.category}
                </div>
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {selectedProject.metric}
                </h3>
                <p className="text-xl font-bold text-white/90 mb-4">
                  {selectedProject.metricLabel}
                </p>
                <p className="text-white/70">
                  {selectedProject.description}
                </p>
              </div>

              {/* Szczegóły */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-3">Szczegóły projektu</h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.details}
                </p>
              </div>

              {/* Galeria screenshotów */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-4">Screenshoty</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10"
                    >
                      <Image
                        src={image}
                        alt={`${selectedProject.title} - Projekt automatyzacji AI - Zrzut ekranu rozwiązania ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Przycisk CTA */}
              <div className="flex justify-center">
                <a
                  href="/umow-spotkanie"
                  className="inline-block rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-8 py-4 text-[#0a0b0a] font-semibold text-lg shadow-lg shadow-[#27F579]/25 hover:shadow-xl hover:shadow-[#27F579]/30 transition-all duration-300 hover:scale-105"
                >
                  Umów spotkanie
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
