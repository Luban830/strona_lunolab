'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase, Project } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function ProjektyPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

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

  return (
    <div className="min-h-screen bg-[#151716] pt-20">
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Wszystkie nasze <span className="text-[#27F579] neon-glow">projekty</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Zobacz pełną listę zrealizowanych przez nas projektów
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-[#27F579] text-xl py-12">
              Ładowanie projektów...
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#242424] border border-gray-700 rounded-lg overflow-hidden hover:border-[#27F579]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(39,245,121,0.2)] group"
                >
                  <div className="relative h-64 w-full bg-gray-900">
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
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-4">
                      {project.description}
                    </p>
                    <div className="text-sm text-gray-500 mb-2">Klient: {project.client_name}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(project.created_at).toLocaleDateString('pl-PL')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg mb-4">Brak projektów do wyświetlenia.</p>
              <p className="text-sm">Projekty pojawią się tutaj po dodaniu ich do bazy danych.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

