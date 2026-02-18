'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Volume2 } from 'lucide-react'
import { Stream, type StreamPlayerApi } from '@cloudflare/stream-react'
import Image from 'next/image'

export default function VideoSection() {
  const videoId = '4107a8ef5773967d3d2219b9b1ea5f6d'
  const containerRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<StreamPlayerApi | undefined>(undefined)
  const retryTimeoutRef = useRef<number | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [showUnmuteButton, setShowUnmuteButton] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const playWithSmartAudio = useCallback(async () => {
    const player = streamRef.current
    if (!player) return false

    try {
      player.muted = false
      setIsMuted(false)
      await player.play()
      setShowUnmuteButton(false)
      return true
    } catch {
      try {
        player.muted = true
        setIsMuted(true)
        await player.play()
        // Show button only when browser forced muted fallback.
        setShowUnmuteButton(true)
        return true
      } catch {
        return false
      }
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nowInView = entry.isIntersecting
          setIsInView(nowInView)

          if (!nowInView) {
            const player = streamRef.current
            if (player && !player.paused) {
              player.pause()
            }
            if (retryTimeoutRef.current) {
              window.clearTimeout(retryTimeoutRef.current)
              retryTimeoutRef.current = null
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    let cancelled = false
    let attempts = 0
    const maxAttempts = 20

    const run = async () => {
      if (cancelled || !isInView) return

      const played = await playWithSmartAudio()
      if (played || cancelled) return

      attempts += 1
      if (attempts <= maxAttempts) {
        retryTimeoutRef.current = window.setTimeout(run, 150)
      }
    }

    void run()

    return () => {
      cancelled = true
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }
    }
  }, [isInView, playWithSmartAudio])

  const handleUnmute = async () => {
    const player = streamRef.current
    if (!player) return

    setShowUnmuteButton(false)
    player.muted = false
    player.volume = 1
    setIsMuted(false)

    try {
      await player.play()
    } catch {
      // If browser still blocks, keep playing muted but do not force button visibility.
      player.muted = true
      setIsMuted(true)
    }
  }

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
          className="relative aspect-video bg-[#111211] border border-[#27F579]/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
        >
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
            loop
            preload="metadata"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />

          {showUnmuteButton && (
            <button
              type="button"
              onClick={handleUnmute}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto z-40 w-fit rounded-full bg-[#27F579] px-6 py-3 text-[#101110] font-semibold shadow-lg shadow-[#27F579]/35 hover:brightness-110 transition-all"
              aria-label="Wlacz dzwiek"
            >
              <span className="inline-flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Unmute / Wlacz dzwiek
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}


