'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { Stream, type StreamPlayerApi } from '@cloudflare/stream-react'
import Image from 'next/image'

export default function VideoSection() {
  const videoId = '4107a8ef5773967d3d2219b9b1ea5f6d'
  const containerRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<StreamPlayerApi | undefined>(undefined)
  const hasAutoplayedRef = useRef(false)
  const autoplayRetryRef = useRef<number | null>(null)

  const [isInView, setIsInView] = useState(false)
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const attemptSmartAutoplay = useCallback(async () => {
    const player = streamRef.current
    if (!player || !isInView || hasAutoplayedRef.current) return false

    try {
      // Always try autoplay with sound first.
      player.muted = false
      setIsMuted(false)
      await player.play()
      hasAutoplayedRef.current = true
      return true
    } catch {
      // If browser blocks unmuted autoplay, fallback to muted autoplay.
      try {
        player.muted = true
        setIsMuted(true)
        await player.play()
        hasAutoplayedRef.current = true
        return true
      } catch {
        return false
      }
    }
  }, [isInView])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting
          setIsInView(intersecting)

          if (intersecting) {
            setShouldLoadPlayer(true)
          } else {
            const player = streamRef.current
            if (player && !player.paused) {
              player.pause()
            }
            setIsBuffering(false)
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoadPlayer || !isInView || hasAutoplayedRef.current) return

    let cancelled = false
    let attempts = 0
    const maxAttempts = 18

    const run = async () => {
      if (cancelled || hasAutoplayedRef.current || !isInView) return
      const played = await attemptSmartAutoplay()
      if (played || cancelled) return

      attempts += 1
      if (attempts <= maxAttempts) {
        autoplayRetryRef.current = window.setTimeout(run, 180)
      }
    }

    void run()

    return () => {
      cancelled = true
      if (autoplayRetryRef.current) {
        window.clearTimeout(autoplayRetryRef.current)
        autoplayRetryRef.current = null
      }
    }
  }, [attemptSmartAutoplay, isInView, shouldLoadPlayer])

  return (
    <section id="video" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27F57910_1px,transparent_1px),linear-gradient(to_bottom,#27F57910_1px,transparent_1px)] bg-[length:60px_60px]" />
      {/* Moon Logo - decorative elements */}
      <div className="absolute top-8 left-4 sm:left-8 opacity-15 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={70} height={70} className="w-10 h-10 sm:w-14 sm:h-14 -rotate-12" unoptimized />
      </div>
      <div className="absolute top-1/4 left-12 sm:left-20 opacity-12 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={50} height={50} className="w-8 h-8 sm:w-10 sm:h-10 rotate-30" unoptimized />
      </div>
      <div className="absolute top-1/6 left-20 sm:left-28 opacity-10 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 rotate-60" unoptimized />
      </div>
      <div className="absolute bottom-8 right-4 sm:right-8 opacity-15 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={70} height={70} className="w-10 h-10 sm:w-14 sm:h-14 rotate-12" unoptimized />
      </div>
      <div className="absolute bottom-1/4 right-12 sm:right-20 opacity-12 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={50} height={50} className="w-8 h-8 sm:w-10 sm:h-10 -rotate-30" unoptimized />
      </div>
      <div className="absolute bottom-1/6 right-20 sm:right-28 opacity-10 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 -rotate-60" unoptimized />
      </div>
      <div className="absolute top-1/2 left-8 sm:left-16 opacity-10 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 rotate-60" unoptimized />
      </div>
      <div className="absolute top-2/3 right-16 sm:right-24 opacity-10 pointer-events-none z-0">
        <Image src="/Moon Logo (1).png" alt="Moon Logo" width={35} height={35} className="w-5 h-5 sm:w-7 sm:h-7 rotate-120" unoptimized />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Poznaj <span className="bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">Lunolab</span>
          </h2>
          <p className="text-xl text-gray-400">Zobacz jak działamy i co możemy dla Ciebie zrobić</p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-video bg-[#111211] border border-[#27F579]/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
        >
          {shouldLoadPlayer ? (
            <Stream
              src={videoId}
              streamRef={streamRef}
              title="Lunolab intro video"
              className="absolute top-0 left-[2px] w-[calc(100%-2px)] h-full"
              responsive={false}
              width="100%"
              height="100%"
              controls={false}
              muted={isMuted}
              preload="metadata"
              loop
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onCanPlay={() => setIsBuffering(false)}
              onPause={() => setIsBuffering(false)}
            />
          ) : (
            <div className="absolute top-0 left-[2px] w-[calc(100%-2px)] h-full bg-black/40" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-20" />

          {isBuffering && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 pointer-events-none" role="status" aria-live="polite">
              <div className="rounded-full bg-black/65 px-4 py-2 text-sm text-white flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Ladowanie...
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}


