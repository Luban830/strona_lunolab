'use client'

interface VideoSectionProps {
  videoUrl?: string
}

export default function VideoSection({ videoUrl }: VideoSectionProps) {
  return (
    <section id="video" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#151716]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Poznaj <span className="text-[#27F579] neon-glow">Lunolab</span>
          </h2>
          <p className="text-xl text-gray-400">
            Zobacz jak działamy i co możemy dla Ciebie zrobić
          </p>
        </div>

        <div className="relative aspect-video bg-[#2a2a2a] border border-gray-700 rounded-lg overflow-hidden">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title="Lunolab - Film o firmie"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-lg">Tutaj zostanie umieszczony film o firmie</p>
                <p className="text-sm text-gray-600 mt-2">
                  Dodaj URL filmu (YouTube/Vimeo) w komponencie VideoSection
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


