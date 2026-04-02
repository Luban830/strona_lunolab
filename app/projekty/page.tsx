import Image from 'next/image'
import Link from 'next/link'
import { supabase, Project } from '@/lib/supabase'

export const revalidate = 3600

async function getCaseStudies(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching case studies:', error.message)
    return []
  }

  return data as Project[]
}

export default async function ProjektyPage() {
  const projects = await getCaseStudies()

  return (
    <section className="min-h-screen bg-[#0a0b0a] relative overflow-hidden pt-24 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]" />
      <div className="absolute top-24 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#27F579]/12 via-[#27F579]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-[240px] bg-gradient-to-t from-[#0a0b0a] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Nasze{' '}
            <span className="bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">
              case studies
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Zobacz, jak automatyzujemy procesy AI dla naszych klientów.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projekty/${project.slug}`}
              aria-label={`Przejdź do case study: ${project.title}`}
              className="block"
            >
              <article className="bg-[#111211] rounded-2xl overflow-hidden border border-white/10 hover:border-[#27F579]/50 transition-all duration-300 group hover:shadow-lg hover:shadow-[#27F579]/10">
                {project.image_url && (
                  <figure className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a]/80 via-transparent to-transparent" />
                  </figure>
                )}

                {!project.image_url && (
                  <div className="h-56 bg-gradient-to-b from-[#0a2f1a] via-[#0d4025] to-[#0a2a16] border-b border-[#27F579]/20" />
                )}

                <div className="p-5 sm:p-6">
                  <div className="inline-block mb-3">
                    <span className="px-3 py-1.5 bg-[#27F579] text-[#0a0b0a] text-xs sm:text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h2>

                  <div className="text-sm sm:text-base font-medium text-gray-400 mb-3">
                    Klient:{' '}
                    <span className="text-white/90">{project.client_name}</span>
                  </div>

                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="mt-12 sm:mt-14 text-center border border-[#27F579]/20 bg-[#111211]/80 rounded-2xl p-8 sm:p-10">
            <p className="text-gray-300 text-lg sm:text-xl font-semibold mb-2">
              Brak projektów do wyświetlenia.
            </p>
            <p className="text-gray-400">
              Dodaj rekordy w tabeli `projects` w Supabase, aby pojawiły się tutaj.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
