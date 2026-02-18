'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '@/lib/projects'

type ProjectDetailsModalProps = {
  selectedProject: Project | null
  onClose: () => void
}

export default function ProjectDetailsModal({
  selectedProject,
  onClose,
}: ProjectDetailsModalProps) {
  useEffect(() => {
    if (!selectedProject) {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      return
    }

    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      const savedTop = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''

      if (savedTop) {
        const scrollPosition = parseInt(savedTop.replace('px', '').replace('-', ''), 10)
        window.scrollTo(0, scrollPosition)
      }
    }
  }, [selectedProject])

  if (!selectedProject) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#111211] rounded-2xl w-[98vw] h-[95vh] max-w-[98vw] max-h-[95vh] overflow-y-auto border border-[#27F579]/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#111211] border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {selectedProject.title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Zamknij modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6">
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
            <div className="mb-4 inline-flex items-center rounded-full border border-[#27F579]/70 bg-[#27F579]/20 px-4 py-2 text-sm sm:text-base font-bold tracking-wide text-[#27F579]">
              Zrealizowano dla: {selectedProject.client}
            </div>
            <p className="text-white/70">
              {selectedProject.description}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-3">Szczegóły projektu</h4>
            <p className="text-gray-300 leading-relaxed">
              {selectedProject.details}
            </p>
          </div>

          <div className="mb-6 rounded-xl overflow-hidden border border-white/10 bg-black p-4 sm:p-6">
            <div className="relative h-48 sm:h-64">
              <Image
                src={selectedProject.logo}
                alt={`Logo klienta dla case study: ${selectedProject.title}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

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
  )
}

