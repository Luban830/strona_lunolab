'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Carousel } from '@/components/ui/carousel'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'
import { projects, type Project } from '@/lib/projects'

// Pojedynczy kafelek projektu
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  const handleOpen = () => {
    onOpen(project)
  }

  return (
    <article
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen()
        }
      }}
      role="button"
      tabIndex={0}
      className="h-full w-full relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#111211] border border-white/10 hover:border-[#27F579]/40 transition-all duration-300 flex flex-col cursor-pointer"
      style={{ minHeight: 'clamp(420px, 60vh, 520px)' }}
      aria-label={`Otwórz case study: ${project.title}`}
    >
      <div className="bg-black p-4 sm:p-6 border-b border-white/10 flex items-center justify-center min-h-[220px]">
        <Image
          src={project.logo}
          alt={`Logo klienta dla case study: ${project.title}`}
          width={360}
          height={180}
          className="w-full h-auto max-h-44 sm:max-h-52 object-contain"
          unoptimized
        />
      </div>

      <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full border border-[#27F579]/50 bg-[#27F579]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#27F579]">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
          {project.shortDescription}
        </p>

        <div className="mt-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleOpen()
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-6 py-3 text-[#151716] font-semibold text-sm sm:text-base shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-105 hover:brightness-110 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_4px_12px_0px_rgba(39,245,121,0.4)] active:scale-95"
          >
            Zobacz case study
          </button>
        </div>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  return (
    <section id="case-studies" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      {/* Moon Logo - decorative elements */}
      <div className="absolute top-20 left-4 sm:left-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10"
          unoptimized
        />
      </div>
      <div className="absolute top-1/3 left-12 sm:left-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={45}
          height={45}
          className="w-6 h-6 sm:w-9 sm:h-9 rotate-45"
          unoptimized
        />
      </div>
      <div className="absolute top-1/6 left-20 sm:left-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute bottom-20 right-4 sm:right-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10 rotate-90"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/3 right-12 sm:right-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={45}
          height={45}
          className="w-6 h-6 sm:w-9 sm:h-9 -rotate-45"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/6 right-20 sm:right-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 -rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute top-1/2 right-8 sm:right-16 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-30"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/4 left-8 sm:left-16 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 -rotate-30"
          unoptimized
        />
      </div>
      <div className="absolute top-2/3 left-16 sm:left-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={35}
          height={35}
          className="w-5 h-5 sm:w-7 sm:h-7 rotate-120"
          unoptimized
        />
      </div>
      <div className="absolute bottom-2/3 right-16 sm:right-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
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

        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Carousel
              options={{ loop: true, align: 'center' }}
              slides={projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={openProjectDetails}
                />
              ))}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10 sm:mt-12"
        >
          <Link
            href="/projekty"
            className="cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-6 sm:px-8 py-3 sm:py-4 text-[#151716] font-semibold text-base sm:text-lg shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95 hover:scale-105 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_4px_12px_0px_rgba(39,245,121,0.4)] hover:brightness-110"
          >
            Zobacz wszystkie projekty
          </Link>
        </motion.div>
      </div>

      <ProjectDetailsModal
        selectedProject={selectedProject}
        onClose={closeProjectDetails}
      />
    </section>
  )
}
