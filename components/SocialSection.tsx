'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function SocialSection() {
  const socialLinks = {
    youtube: {
      name: 'YouTube',
      url: 'https://www.youtube.com/@LunoLab_AI',
      iconUrl: '/Ikony Youtube.png',
      description: 'Obejrzyj nasze tutoriale i case studies',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-400 hover:to-red-500',
      imageUrl: '/youtube1.png',
    },
    skool: {
      name: 'Skool',
      url: 'https://www.skool.com/automatyzacjaai-polskalunolab-2698',
      iconUrl: '/skoolicon1.png',
      description: 'Dołącz do naszej grupy AI',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-400 hover:to-purple-500',
      imageUrl: '/skool.png',
    },
    tiktok: {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@lunolab',
      iconUrl: '/Tik Tok Icon.png',
      description: 'Śledź nasze krótkie formy',
      color: 'from-black to-gray-900',
      hoverColor: 'hover:from-gray-800 hover:to-gray-900',
      imageUrl: '/tiktok1.png',
    },
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative">

      {/* Moon Logo - decorative elements */}
      <div className="absolute top-16 left-4 sm:left-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10"
          unoptimized
        />
      </div>
      <div className="absolute top-1/3 left-12 sm:left-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={45}
          height={45}
          className="w-6 h-6 sm:w-9 sm:h-9 rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute top-1/6 left-20 sm:left-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-90"
          unoptimized
        />
      </div>
      <div className="absolute bottom-16 right-4 sm:right-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10 rotate-120"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/3 right-12 sm:right-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={45}
          height={45}
          className="w-6 h-6 sm:w-9 sm:h-9 -rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/6 right-20 sm:right-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 -rotate-90"
          unoptimized
        />
      </div>
      <div className="absolute top-1/2 left-16 sm:left-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={35}
          height={35}
          className="w-5 h-5 sm:w-7 sm:h-7 rotate-30"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/2 right-16 sm:right-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={35}
          height={35}
          className="w-5 h-5 sm:w-7 sm:h-7 -rotate-30"
          unoptimized
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Śledź nas{' '}
            <span className="bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">w social media</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Dołącz do naszej społeczności i bądź na bieżąco z najnowszymi trendami AI
          </p>
        </div>

        {/* Social Links Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-[500px] sm:h-[600px] lg:h-[700px]">
          {/* YouTube - Left side (50%) */}
          <Link
            href={socialLinks.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full lg:w-1/2 h-full"
          >
            <div className="relative h-full bg-[#111211] border border-white/10 rounded-2xl overflow-hidden hover:border-[#27F579]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#27F579]/10 hover:-translate-y-1 flex flex-col">
              {/* Image/Background Section - Top */}
              <div className="relative h-2/3 flex-shrink-0">
                {socialLinks.youtube.imageUrl ? (
                  <>
                    <Image
                      src={socialLinks.youtube.imageUrl}
                      alt="YouTube thumbnail"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0a]/60 via-[#0a0b0a]/40 to-[#0a0b0a]/60"></div>
                    {/* Red gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.youtube.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </>
                ) : (
                  /* Fallback gradient if no image */
                  <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.youtube.color} opacity-20`}></div>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-[length:20px_20px] opacity-30"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b0a]/60 via-[#0a0b0a]/40 to-[#0a0b0a]/60"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.youtube.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                )}

                {/* Icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={socialLinks.youtube.iconUrl}
                      alt="YouTube icon"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Content Section - Bottom */}
              <div className="relative z-10 flex-1 flex flex-col justify-between p-6 sm:p-8 bg-[#111211]">
                <div>
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#27F579] transition-colors duration-300">
                    {socialLinks.youtube.name}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-gray-300">
                    {socialLinks.youtube.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center text-[#27F579] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                  <span className="text-sm sm:text-base font-medium">Obejrzyj nasze filmy</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Right side (50%) - Skool and TikTok */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 h-full">
            {/* Skool - Top (50% of right side) */}
            <Link
              href={socialLinks.skool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1"
            >
              <div className="relative h-full bg-[#111211] border border-white/10 rounded-2xl overflow-hidden hover:border-[#27F579]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#27F579]/10 hover:-translate-y-1 flex flex-col">
                {/* Image/Background Section - Top */}
                <div className="relative h-2/3 flex-shrink-0">
                  {socialLinks.skool.imageUrl ? (
                    <>
                      <Image
                        src={socialLinks.skool.imageUrl}
                        alt="Skool thumbnail"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0a]/60 via-[#0a0b0a]/40 to-[#0a0b0a]/60"></div>
                      {/* Purple gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.skool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    </>
                  ) : (
                    /* Fallback gradient if no image */
                    <div className="absolute inset-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.skool.color} opacity-20`}></div>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-[length:15px_15px] opacity-30"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b0a]/70 via-[#0a0b0a]/50 to-[#0a0b0a]/70"></div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.skool.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    </div>
                  )}

                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={socialLinks.skool.iconUrl}
                        alt="Skool icon"
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section - Bottom */}
                <div className="relative z-10 flex-1 flex flex-col justify-between p-6 sm:p-8 bg-[#111211]">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#27F579] transition-colors duration-300">
                      {socialLinks.skool.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-400">
                      {socialLinks.skool.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-[#27F579] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                    <span className="text-sm font-medium">Dołącz do grupy</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* TikTok - Bottom (50% of right side) */}
            <Link
              href={socialLinks.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1"
            >
              <div className="relative h-full bg-[#111211] border border-white/10 rounded-2xl overflow-hidden hover:border-[#27F579]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#27F579]/10 hover:-translate-y-1 flex flex-col">
                {/* Image Section - Top */}
                <div className="relative h-2/3 flex-shrink-0">
                  {socialLinks.tiktok.imageUrl ? (
                    <>
                      <Image
                        src={socialLinks.tiktok.imageUrl}
                        alt="TikTok thumbnail"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0a]/60 via-[#0a0b0a]/40 to-[#0a0b0a]/60"></div>
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.tiktok.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    </>
                  ) : (
                    /* Fallback gradient if no image */
                    <div className="absolute inset-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.tiktok.color} opacity-20`}></div>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.03)_25%,rgba(255,255,255,.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.03)_75%,rgba(255,255,255,.03))] bg-[length:15px_15px] opacity-30"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b0a]/70 via-[#0a0b0a]/50 to-[#0a0b0a]/70"></div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${socialLinks.tiktok.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    </div>
                  )}

                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={socialLinks.tiktok.iconUrl}
                        alt="TikTok icon"
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section - Bottom */}
                <div className="relative z-10 flex-1 flex flex-col justify-between p-6 sm:p-8 bg-[#111211]">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#27F579] transition-colors duration-300">
                      {socialLinks.tiktok.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-400">
                      {socialLinks.tiktok.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-[#27F579] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                    <span className="text-sm font-medium">Śledź nas</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
