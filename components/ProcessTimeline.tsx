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
      // Use requestAnimationFrame to ensure layout is fully rendered
      requestAnimationFrame(() => {
        // Double RAF to ensure all layouts are fully calculated
        requestAnimationFrame(() => {
          // Triple RAF for extra safety with dynamic content
          requestAnimationFrame(() => {
            // Quadruple RAF to ensure all steps are fully rendered
            requestAnimationFrame(() => {
            // Calculate positions of each step relative to timeline container
            const stepPositions: number[] = []

            if (!timelineRef.current || !impulseRef.current) return

            // Calculate positions using getBoundingClientRect for accurate positioning
            // Ensure all positions are calculated relative to the same timeline container
            const positions: Array<{ index: number; y: number }> = []

            // Force a layout recalculation to ensure all elements are positioned
            void timelineRef.current.offsetHeight

            // Get timeline container position once - critical for consistency
            // Recalculate after forcing layout to ensure accuracy
            const timelineRect = timelineRef.current.getBoundingClientRect()
            const timelineTop = timelineRect.top

            stepsRef.current.forEach((step, stepIndex) => {
              if (step && timelineRef.current) {
                // Get the actual dot element (the pulsating green dot)
                const dotElement = step.querySelector('.step-dot') as HTMLElement

                if (dotElement) {
                  // Force layout recalculation for this specific element
                  void dotElement.offsetHeight

                  // Get dot position - use the same timeline reference for all calculations
                  const dotRect = dotElement.getBoundingClientRect()

                  // Recalculate timeline position to ensure consistency
                  const currentTimelineRect = timelineRef.current.getBoundingClientRect()

                  // Calculate relative Y: dot center relative to timeline top
                  // Always use the same reference point (current timeline top) for consistency
                  const relativeY = dotRect.top - currentTimelineRect.top + (dotRect.height / 2)

                  positions.push({ index: stepIndex, y: relativeY })
                }
              }
            })

            // Sort by index to ensure correct order
            positions.sort((a, b) => a.index - b.index)

            // Extract just the Y positions in order
            positions.forEach(({ y }) => {
              stepPositions.push(y)
            })

            if (stepPositions.length === 0) return

            // Verify all positions are valid numbers
            const validPositions = stepPositions.filter(pos => !isNaN(pos) && isFinite(pos))
            if (validPositions.length !== stepPositions.length) {
              console.warn('Some step positions are invalid:', stepPositions)
              return
            }

            // Ensure positions are in ascending order (they should be)
            for (let i = 1; i < stepPositions.length; i++) {
              if (stepPositions[i] < stepPositions[i - 1]) {
                console.warn('Step positions are not in ascending order:', stepPositions)
                // Sort them to fix the order
                stepPositions.sort((a, b) => a - b)
                break
              }
            }

            const startY = stepPositions[0]

            // Create timeline animation (loops infinitely)
            const tl = gsap.timeline({ repeat: -1 })

            // Reset to start - use y property which GSAP handles via transform
            gsap.set(impulseRef.current, {
              y: startY - 16, // Center impulse on dot (impulse height is 32px, so -16 to center)
              opacity: 1,
              clearProps: 'transform' // Clear any existing transform styles
            })

            // Animate through each step with dynamic duration based on distance
            stepPositions.forEach((y, index) => {
              const targetY = y - 16 // Center on dot

              // Calculate duration based on distance traveled
              let duration: number
              if (index === 0) {
                // First step - quick start
                duration = 0.3
              } else {
                // Calculate distance from previous position
                const prevY = stepPositions[index - 1] - 16
                const distance = Math.abs(targetY - prevY)
                // Base duration of 0.8s per 100px, minimum 0.5s, maximum 2s
                duration = Math.max(0.5, Math.min(2.0, (distance / 100) * 0.8))
              }

              // Move to step position
              tl.to(impulseRef.current, {
                y: targetY,
                duration: duration,
                ease: 'power2.inOut',
              })

              // Highlight current step dot - start pulsation exactly when slider reaches the dot
              if (stepsRef.current[index]) {
                const dot = stepsRef.current[index]?.querySelector('.step-dot')
                if (dot) {
                  // Start pulsation exactly when slider reaches the dot position
                  tl.to(
                    dot,
                    {
                      scale: 1.4,
                      duration: 0.2,
                      ease: 'power2.out',
                    },
                    '>' // Start immediately after slider reaches position
                  )
                  tl.to(
                    dot,
                    {
                      scale: 1,
                      duration: 0.3,
                      ease: 'power2.in',
                    },
                    '>0.2' // Start 0.2s after scale up animation
                  )
                }
              }

              // Pause at each step before moving to next (except for the last step)
              if (index < stepPositions.length - 1) {
                tl.to(impulseRef.current, {
                  duration: 0.8, // Pause duration at each step
                })
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
            })
          })
        })
      })
    }, 500) // Increased timeout for better layout stabilization with dynamic content
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
              Dostarczenie produktu
            </h3>
            <Timeline steps={oneTimeSteps} title="Dostarczenie produktu" />
          </div>
        </div>
      </div>
    </section>
  )
}

