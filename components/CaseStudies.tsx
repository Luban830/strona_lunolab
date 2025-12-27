'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase, Project } from '@/lib/supabase'

export default function CaseStudies() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6)

        if (error) {
          // If table doesn't exist or Supabase is not configured, just show empty state
          if (error.code === 'PGRST116' || error.message.includes('placeholder')) {
            setProjects([])
          } else {
            throw error
          }
        } else {
          setProjects(data || [])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.min(projects.length, 3))
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.min(projects.length, 3)) % Math.min(projects.length, 3))
  }

  const displayedProjects = projects.slice(currentIndex, currentIndex + 3)

  if (loading) {
    return (
      <section id="case-studies" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#151716]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-[#27F579] text-xl">Ładowanie projektów...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="case-studies" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#151716]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Nasze <span className="text-[#27F579] neon-glow">projekty</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Zobacz jak pomagamy firmom osiągać lepsze rezultaty
          </p>
                  </div>

        {projects.length > 0 ? (
          <>
            {/* Carousel */}
            <div className="relative mb-12">
              <div className="grid md:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-[#242424] border border-gray-700 rounded-lg overflow-hidden hover:border-[#27F579]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(39,245,121,0.2)] group"
                  >
                    <div className="relative h-48 w-full bg-gray-900">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-600">
                          Brak zdjęcia
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-[#27F579] mb-2">{project.category}</div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="text-xs text-gray-500">Klient: {project.client_name}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              {projects.length > 3 && (
                <>
                  <button
                    onClick={prevProject}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#242424] border border-[#27F579]/30 text-[#27F579] w-12 h-12 rounded-full flex items-center justify-center hover:border-[#27F579] hover:shadow-[0_0_15px_rgba(39,245,121,0.5)] transition-all"
                    aria-label="Poprzedni projekt"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextProject}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#242424] border border-[#27F579]/30 text-[#27F579] w-12 h-12 rounded-full flex items-center justify-center hover:border-[#27F579] hover:shadow-[0_0_15px_rgba(39,245,121,0.5)] transition-all"
                    aria-label="Następny projekt"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* View all button */}
            <div className="text-center">
              <Link
                href="/projekty"
                className="inline-block bg-[#242424] border-2 border-[#27F579] text-[#27F579] px-8 py-4 rounded-lg font-semibold hover:bg-[#27F579] hover:text-[#151716] transition-all duration-300 hover:shadow-[0_0_25px_rgba(39,245,121,0.5)]"
              >
                Zobacz wszystkie nasze zrealizowane projekty
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 py-12">
            Brak projektów do wyświetlenia. Projekty pojawią się tutaj po dodaniu ich do bazy danych.
          </div>
        )}
      </div>
    </section>
  )
}

