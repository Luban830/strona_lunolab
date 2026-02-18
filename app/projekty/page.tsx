'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'
import { projects, type Project } from '@/lib/projects'

export default function ProjektyPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

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
                <div className="relative h-72 sm:h-96 bg-black p-3 sm:p-4 border-b border-white/10">
                  <Image
                    src={project.logo}
                    alt={`Logo klienta dla case study: ${project.title}`}
                    fill
                    className="object-contain p-0 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    unoptimized
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <p className="inline-flex items-center rounded-full border border-[#27F579]/60 bg-[#27F579]/15 px-3 py-1 text-base sm:text-lg text-[#27F579] font-bold tracking-wide mb-3">
                    {project.client}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    {project.title}
                  </h3>

                  <div className="inline-block">
                    <span className="px-3 py-1.5 bg-[#27F579] text-[#0a0b0a] text-xs sm:text-sm font-semibold rounded-full">
                      {project.category}
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

      <ProjectDetailsModal
        selectedProject={selectedProject}
        onClose={closeProjectDetails}
      />
    </div>
  )
}
