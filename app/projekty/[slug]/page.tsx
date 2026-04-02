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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 mt-4">

          {/* LEWA STRONA (Tekst i metadane) */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-[#27F579]/50 bg-[#27F579]/10 px-3 py-1 text-xs sm:text-sm font-semibold text-[#27F579] shadow-[0_0_12px_rgba(39,245,121,0.25)]">
                {project.category}
              </span>
            </div>

            <h1 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
              {project.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-base sm:text-lg text-gray-400">
              <span className="flex items-center gap-2">
                Klient: <span className="text-white/90 font-medium">{project.client_name}</span>
              </span>
            </div>

            {technologies.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#27F579]/80 mb-3">
                  Wdrożone technologie
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
          </div>

          {/* PRAWA STRONA (Kwadratowy lub prostokątny kafel na logo/zdjęcie z object-contain) */}
          {project.image_url && (
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-video max-w-[500px] mx-auto lg:ml-auto lg:mr-0 rounded-2xl overflow-hidden border border-[#27F579]/20">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>

        {/* --- SEKCJA TREŚCI (Tylko czysty tekst i ewentualne fotki w tekście) --- */}
        <article className="max-w-3xl mx-auto bg-[#111211]/80 backdrop-blur-md border border-[#27F579]/15 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
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
        </article>
      </div>
    </section>
  )
}
