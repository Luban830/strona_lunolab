'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false) // Start with sound ON
  const hasAutoplayedRef = useRef(false)
  const isUserPausedRef = useRef(false)

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true)
        isUserPausedRef.current = false
      }).catch(() => {
        // Autoplay blocked
      })
    } else {
      video.pause()
      setIsPlaying(false)
      isUserPausedRef.current = true
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }, [])

  // Autoplay with sound when visible
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const tryAutoplay = async () => {
      if (hasAutoplayedRef.current || isUserPausedRef.current) return

      // Try with sound first
      try {
        video.muted = false
        setIsMuted(false)
        await video.play()
        setIsPlaying(true)
        hasAutoplayedRef.current = true
      } catch {
        // Browser blocked - try muted as fallback
        try {
          video.muted = true
          setIsMuted(true)
          await video.play()
          setIsPlaying(true)
          hasAutoplayedRef.current = true
        } catch {
          // Autoplay completely blocked
        }

      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isUserPausedRef.current) {
            tryAutoplay()
          } else if (!entry.isIntersecting) {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Sync state with video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  return (
    <section id="video" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      {/* Moon Logo - decorative elements */}
      <div className="absolute top-8 left-4 sm:left-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={70}
          height={70}
          className="w-10 h-10 sm:w-14 sm:h-14 -rotate-12"
          unoptimized
        />
      </div>
      <div className="absolute top-1/4 left-12 sm:left-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10 rotate-30"
          unoptimized
        />
      </div>
      <div className="absolute top-1/6 left-20 sm:left-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute bottom-8 right-4 sm:right-8 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={70}
          height={70}
          className="w-10 h-10 sm:w-14 sm:h-14 rotate-12"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/4 right-12 sm:right-20 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={50}
          height={50}
          className="w-8 h-8 sm:w-10 sm:h-10 -rotate-30"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/6 right-20 sm:right-28 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 -rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute top-1/2 left-8 sm:left-16 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-60"
          unoptimized
        />
      </div>
      <div className="absolute top-2/3 right-16 sm:right-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt="Moon Logo"
          width={35}
          height={35}
          className="w-5 h-5 sm:w-7 sm:h-7 rotate-120"
          unoptimized
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Poznaj <span className="bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">Lunolab</span>
          </h2>
          <p className="text-xl text-gray-400">
            Zobacz jak działamy i co możemy dla Ciebie zrobić
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-video bg-[#111211] border border-[#27F579]/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group"
        >
          <video
            ref={videoRef}
            src="/film.MOV"
            className="absolute inset-0 w-full h-full object-cover"
            loop
            playsInline
            preload="auto"
          />

          {/* Clickable overlay for play/pause */}
          <div
            className="absolute inset-0 cursor-pointer z-10"
            onClick={togglePlay}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />

          {/* Play button overlay - visible when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#27F579] flex items-center justify-center shadow-lg shadow-[#27F579]/30">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#0a0b0a] ml-1" fill="#0a0b0a" />
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


