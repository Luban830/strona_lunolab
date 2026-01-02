'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const longTermSteps = [
  {
    step: 1,
    title: 'Konsultacja',
    description: 'Rozmawiamy o Twoich potrzebach, celach biznesowych i wyzwaniach. Analizujemy obecne procesy i identyfikujemy możliwości automatyzacji.',
  },
  {
    step: 2,
    title: 'Analiza potrzeb',
    description: 'Przeprowadzamy dogłębną analizę Twojej firmy, definiujemy ścieżkę wdrożenia AI i przygotowujemy szczegółowy plan działania.',
  },
  {
    step: 3,
    title: 'Wdrożenie',
    description: 'Implementujemy rozwiązania AI dostosowane do Twoich potrzeb. Tworzymy i wdrażamy systemy automatyzacji procesów biznesowych.',
  },
  {
    step: 4,
    title: 'Wsparcie i optymalizacja',
    description: 'Zapewniamy ciągłe wsparcie techniczne, monitorujemy wydajność systemów i optymalizujemy rozwiązania w miarę rozwoju Twojej firmy.',
  },
]

const oneTimeSteps = [
  {
    step: 1,
    title: 'Brief',
    description: 'Zbieramy wszystkie informacje o projekcie, określamy wymagania, zakres prac i oczekiwane rezultaty. Ustalamy szczegóły techniczne.',
  },
  {
    step: 2,
    title: 'Projektowanie',
    description: 'Tworzymy szczegółowy projekt rozwiązania, przygotowujemy architekturę systemu i planujemy implementację zgodnie z Twoimi potrzebami.',
  },
  {
    step: 3,
    title: 'Realizacja',
    description: 'Programujemy i wdrażamy rozwiązanie zgodnie z projektem. Tworzymy w pełni funkcjonalny produkt gotowy do użycia.',
  },
  {
    step: 4,
    title: 'Dostarczenie',
    description: 'Przekazujemy gotowe rozwiązanie wraz z kompletną dokumentacją. Zapewniamy wsparcie wdrożeniowe i szkolenia z obsługi.',
  },
]

function Timeline({ steps, title }: { steps: typeof longTermSteps; title: string }) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const impulseRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!timelineRef.current) return

    // Start impulse animation immediately
    const startTimer = setTimeout(() => {
      startImpulseAnimation()
    }, 500) // Small delay to ensure DOM is ready

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate vertical line
            if (lineRef.current) {
              gsap.fromTo(
                lineRef.current,
                { scaleY: 0, transformOrigin: 'top' },
                {
                  scaleY: 1,
                  duration: 1.2,
                  ease: 'power3.out',
                  delay: 0.2,
                }
              )
            }

            // Animate steps sequentially
            stepsRef.current.forEach((step, index) => {
              if (step) {
                gsap.fromTo(
                  step,
                  {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    delay: 0.4 + index * 0.15,
                  }
                )
              }
            })

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(timelineRef.current)

    return () => {
      clearTimeout(startTimer)
      observer.disconnect()
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [])

  const startImpulseAnimation = () => {
    if (!timelineRef.current || !impulseRef.current || stepsRef.current.length === 0) return

    // Wait for layout to stabilize
    setTimeout(() => {
      // Calculate positions of each step relative to timeline container
      const stepPositions: number[] = []
      stepsRef.current.forEach((step) => {
        if (step && timelineRef.current) {
          // Get the dot element position
          const dotElement = step.querySelector('.step-dot-container')
          if (dotElement) {
            const dotRect = dotElement.getBoundingClientRect()
            const timelineRect = timelineRef.current.getBoundingClientRect()
            const relativeY = dotRect.top + dotRect.height / 2 - timelineRect.top
            stepPositions.push(relativeY)
          }
        }
      })

      if (stepPositions.length === 0) return

      const startY = stepPositions[0]

      // Create timeline animation
      const tl = gsap.timeline({ repeat: -1 })

      // Reset to start
      gsap.set(impulseRef.current, {
        y: startY - 16, // Center impulse on dot (impulse height is 32px, so -16 to center)
        opacity: 1
      })

      // Animate through each step
      stepPositions.forEach((y, index) => {
        const targetY = y - 16 // Center on dot

        if (index === 0) {
          // Start at first step
          tl.to(impulseRef.current, {
            y: targetY,
            duration: 0.3,
            ease: 'power2.out',
          })
        } else {
          // Move to next step
          tl.to(impulseRef.current, {
            y: targetY,
            duration: 1.0,
            ease: 'power2.inOut',
          })
        }

        // Highlight current step dot
        if (stepsRef.current[index]) {
          const dot = stepsRef.current[index]?.querySelector('.step-dot')
          if (dot) {
            tl.to(
              dot,
              {
                scale: 1.4,
                duration: 0.2,
                ease: 'power2.out',
              },
              '<0.1'
            )
            tl.to(
              dot,
              {
                scale: 1,
                duration: 0.3,
                ease: 'power2.in',
              },
              '>0.2'
            )
          }
        }
      })

      // Pause at end, then return to start
      tl.to(impulseRef.current, {
        duration: 0.5,
      })
      tl.to(impulseRef.current, {
        y: startY - 16,
        duration: 0.8,
        ease: 'power2.in',
      })
      tl.to(impulseRef.current, {
        opacity: 0.3,
        duration: 0.2,
      })
      tl.to(impulseRef.current, {
        opacity: 1,
        duration: 0.2,
      })

      animationRef.current = tl
    }, 100)
  }

  return (
    <div ref={timelineRef} className="relative">
      {/* Vertical line */}
      <div
        ref={lineRef}
        className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0a0b0a] via-[#0a0b0a] to-[#0a0b0a]"
      ></div>

      {/* Impulse indicator */}
      <div
        ref={impulseRef}
        className="absolute left-6 sm:left-8 w-0.5 h-8 bg-[#27F579] z-20 opacity-0"
        style={{
          transform: 'translateY(0px)',
          boxShadow: '0 0 20px rgba(39, 245, 121, 0.8), 0 0 40px rgba(39, 245, 121, 0.4)',
        }}
      ></div>

      {/* Timeline steps */}
      <div className="space-y-12 sm:space-y-16">
        {steps.map((stepItem, index) => (
          <div
            key={index}
            ref={(el) => {
              stepsRef.current[index] = el
            }}
            className="relative pl-16 sm:pl-24"
          >
            {/* Step indicator and dot */}
            <div className="step-dot-container absolute left-0 top-0 flex items-center">
              <div className="relative">
                {/* Green dot */}
                <div className="step-dot w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#27F579] border-4 border-[#0a0b0a] z-10 transition-transform duration-200"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#27F579] opacity-50 blur-md"></div>
              </div>
            </div>

            {/* Step number label */}
            <div className="absolute left-8 sm:left-12 top-0 -translate-y-1/2">
              <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">
                {stepItem.step}
              </span>
            </div>

            {/* Content */}
            <div className="pt-4 sm:pt-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                {stepItem.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                {stepItem.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header
            gsap.fromTo(
              headerRef.current,
              {
                opacity: 0,
                y: -30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
              }
            )

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Działamy na dwa sposoby
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Wybierz formę współpracy, która najlepiej odpowiada Twoim potrzebom
          </p>
        </div>

        {/* Two Timelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {/* Long-term collaboration */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center lg:text-left">
              Współpraca długoterminowa
            </h3>
            <Timeline steps={longTermSteps} title="Współpraca długoterminowa" />
          </div>

          {/* One-time product */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center lg:text-left">
              Dostarczanie jednorazowego produktu
            </h3>
            <Timeline steps={oneTimeSteps} title="Dostarczanie jednorazowego produktu" />
          </div>
        </div>
      </div>
    </section>
  )
}

