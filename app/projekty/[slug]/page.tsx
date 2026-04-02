import Image from 'next/image'
import { notFound } from 'next/navigation'
import { supabase, Project } from '@/lib/supabase'

export const revalidate = 3600

const proseCaseStudyClasses =
  'prose prose-invert max-w-none text-white/85 prose-headings:text-white prose-a:text-[#27F579]'

async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  return data as Project
}

function normalizeTechnologies(
  value: Project['technologies'] | string | null | undefined
): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const technologies = normalizeTechnologies(project.technologies)

  return (
    <section className="min-h-screen bg-[#0a0b0a] relative overflow-hidden pt-24 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#27F579]/12 via-[#27F579]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-[220px] bg-gradient-to-t from-[#0a0b0a] to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <article className="bg-[#111211]/90 border border-[#27F579]/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(39,245,121,0.08)]">
          {project.image_url && (
            <div className="relative h-64 sm:h-80 md:h-96 border-b border-[#27F579]/15">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a]/80 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-8 md:p-10">
            <span className="inline-flex items-center rounded-full border border-[#27F579]/50 bg-[#27F579]/10 px-3 py-1 text-xs sm:text-sm font-semibold text-[#27F579] shadow-[0_0_12px_rgba(39,245,121,0.25)]">
              {project.category}
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-gray-400">
              Klient:{' '}
              <span className="text-white/90 font-medium">{project.client_name}</span>
            </p>

            {technologies.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-3">
                  Technologie
                </h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#27F579]/35 bg-[#27F579]/5 px-3 py-1 text-sm text-[#b8ffd8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-8">
              {project.content && (
                <div
                  className={proseCaseStudyClasses}
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              )}

              {project.content_image_1 && (
                <div className="relative w-full h-80 sm:h-96 my-10 rounded-2xl overflow-hidden border border-[#27F579]/20 shadow-[0_0_20px_rgba(39,245,121,0.08)]">
                  <Image
                    src={project.content_image_1}
                    alt={`${project.title} — ilustracja w treści`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                  />
                </div>
              )}

              {project.content_bottom && (
                <div
                  className={proseCaseStudyClasses}
                  dangerouslySetInnerHTML={{ __html: project.content_bottom }}
                />
              )}

              {project.content_image_2 && (
                <div className="relative w-full h-80 sm:h-96 my-10 rounded-2xl overflow-hidden border border-[#27F579]/20 shadow-[0_0_20px_rgba(39,245,121,0.08)]">
                  <Image
                    src={project.content_image_2}
                    alt={`${project.title} — ilustracja na końcu treści`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                  />
                </div>
              )}

              {!project.content &&
                !project.content_bottom &&
                !project.content_image_1 &&
                !project.content_image_2 && (
                  <p className="text-white/75 leading-relaxed">{project.description}</p>
                )}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
