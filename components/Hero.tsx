'use client'

import { motion } from 'framer-motion'
import { TextEffect } from '@/components/core/text-effect'
import Image from 'next/image'
import Link from 'next/link'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { useEffect, useState, useRef, useMemo } from 'react'

// Zoptymalizowany hook do animacji licznika z pętlą
function useCountUp(end: number, duration: number = 2000, format: 'number' | 'k' | 'percent' = 'number', pauseDuration: number = 5000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [cycle, setCycle] = useState(0) // Używamy cycle zamiast isRising dla lepszej kontroli
  const ref = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const isRising = cycle % 2 === 0
    let startTime: number | null = null

    const frame = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Throttle: aktualizuj tylko co 30ms (około 33 FPS)
      if (currentTime - lastUpdateRef.current > 30) {
        lastUpdateRef.current = currentTime
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        const newCount = isRising 
          ? Math.floor(easeOut * end)
          : Math.floor((1 - easeOut) * end)

        setCount(newCount)
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(frame)
      } else {
        // Animacja zakończona
        if (isRising) {
          // Dotarliśmy do końca - czekamy pauseDuration
          timeoutRef.current = setTimeout(() => {
            setCycle(c => c + 1)
          }, pauseDuration)
        } else {
          // Wróciliśmy do 0 - od razu zaczynamy rosnąć
          setCycle(c => c + 1)
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(frame)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isVisible, cycle, end, duration, pauseDuration])

  // Memoizacja formatowania
  const formattedCount = useMemo(() => {
    if (format === 'k') {
      return `${count}K+`
    }
    if (format === 'percent') {
      return `${count}%`
    }
    return `${count}+`
  }, [count, format])

  return { count: formattedCount, ref }
}

export default function Hero() {
  const opacity = 0.01
  const count1 = useCountUp(500, 2000, 'number')
  const count2 = useCountUp(250, 2000, 'k')
  const count3 = useCountUp(95, 2000, 'percent')

  return (
    <section className="min-h-screen lg:min-h-[80vh] xl:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-20">
      {/* Noise effect background */}
      <div
        className="absolute top-0 left-0 w-full h-full content-[''] z-0 pointer-events-none bg-[url('https://www.ui-layouts.com/noise.gif')]"
        style={{ opacity: opacity }}
      ></div>

      {/* Grid pattern with radial mask */}
      <div className="absolute bottom-0 left-[-2px] top-[-1px] right-0 h-[500px] bg-[linear-gradient(to_right,#27F57915_1px,transparent_1px),linear-gradient(to_bottom,#27F57915_1px,transparent_1px)] bg-[length:35px_34px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero text */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-0 text-left mb-12"
            >
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                style={{ fontSize: '53px', width: '780px', maxWidth: '100%', margin: 0, wordBreak: 'keep-all', whiteSpace: 'normal' }}
              >
                <TextEffect per="char" preset="fade">
                  Zyskaj przewagę z AI
                </TextEffect>
              </h1>
            </motion.div>
            <p className="text-xl sm:text-2xl text-white leading-relaxed text-left max-w-3xl -mt-6" style={{ fontSize: '25px' }}>
              Lunolab tworzy zaawansowane rozwiązania automatyzacyjne, które
              przyspieszają Twoje procesy biznesowe i zwiększają efektywność w Twojej firmie.
            </p>
            <div className="mt-8">
              <Link
                href="/umow-spotkanie"
                className="inline-block cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-8 py-4 text-[#151716] font-semibold text-lg shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95 hover:scale-105 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_4px_12px_0px_rgba(39,245,121,0.4)] hover:brightness-110"
              >
                Rozwijaj swoją firmę z AI
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[500px] aspect-[4/3] rounded-lg overflow-hidden"
              style={{ marginTop: '8px' }}
            >
              <Image
                src="/1.jpg"
                alt="Lunolab"
                fill
                priority
                className="object-cover"
                style={{ borderWidth: '0px', borderStyle: 'none', borderImage: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 lg:mt-24 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full"
        >
          {/* Card 1 - Czas zaoszczędzony */}
          <NeonGradientCard
            className="w-full sm:w-auto sm:flex-1 max-w-[320px]"
            borderRadius={16}
            borderSize={2}
            neonColors={{
              firstColor: "#27F579",
              secondColor: "#00FFF1",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full min-h-[120px]">
              <div ref={count1.ref} className="text-2xl sm:text-3xl font-bold text-[#27F579]">{count1.count}</div>
              <div className="text-xs sm:text-sm text-center leading-tight text-white">godzin zaoszczędzonych miesięcznie</div>
            </div>
          </NeonGradientCard>

          {/* Card 2 - Pieniądze zaoszczędzone */}
          <NeonGradientCard
            className="w-full sm:w-auto sm:flex-1 max-w-[320px]"
            borderRadius={16}
            borderSize={2}
            neonColors={{
              firstColor: "#27F579",
              secondColor: "#00FFF1",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full min-h-[120px]">
              <div ref={count2.ref} className="text-2xl sm:text-3xl font-bold text-[#27F579]">{count2.count}</div>
              <div className="text-xs sm:text-sm text-center leading-tight text-white">PLN zaoszczędzonych rocznie</div>
            </div>
          </NeonGradientCard>

          {/* Card 3 - Redukcja błędów */}
          <NeonGradientCard
            className="w-full sm:w-auto sm:flex-1 max-w-[320px]"
            borderRadius={16}
            borderSize={2}
            neonColors={{
              firstColor: "#27F579",
              secondColor: "#00FFF1",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full min-h-[120px]">
              <div ref={count3.ref} className="text-2xl sm:text-3xl font-bold text-[#27F579]">{count3.count}</div>
              <div className="text-xs sm:text-sm text-center leading-tight text-white">redukcja błędów w procesach</div>
            </div>
          </NeonGradientCard>
        </motion.div>
      </div>
    </section>
  )
}

