'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import '@/components/MagicBento.css'

const DEFAULT_PARTICLE_COUNT = 8
const DEFAULT_GLOW_COLOR = '39, 245, 121'

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div')
  el.className = 'particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect()
  const relativeX = ((mouseX - rect.left) / rect.width) * 100
  const relativeY = ((mouseY - rect.top) / rect.height) * 100

  card.style.setProperty('--glow-x', `${relativeX}%`)
  card.style.setProperty('--glow-y', `${relativeY}%`)
  card.style.setProperty('--glow-intensity', glow.toString())
  card.style.setProperty('--glow-radius', `${radius}px`)
}

interface StatCardProps {
  label: string
  value: string
  valueClassName?: string
  particleCount?: number
  glowColor?: string
}

function StatCard({
  label,
  value,
  valueClassName,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return

    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle)
        }
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return

    if (!particlesInitialized.current) {
      initializeParticles()
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return

        const clone = particle.cloneNode(true) as HTMLDivElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        })

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        })
      }, index * 100)

      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles])

  useEffect(() => {
    if (!cardRef.current) return

    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()

      gsap.to(element, {
        rotateX: 5,
        rotateY: 5,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      })
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()

      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const distanceX = x - centerX
      const distanceY = y - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)

      const glow = Math.max(0, 1 - distance / maxDistance)
      const radius = 300

      updateCardGlowProperties(element, e.clientX, e.clientY, glow, radius)
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles])

  return (
    <div
      ref={cardRef}
      className="magic-bento-card magic-bento-card--border-glow particle-container"
      style={{
        backgroundColor: '#0a0b0a',
        minHeight: '160px',
        aspectRatio: 'auto',
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      <div className="magic-bento-card__content h-full flex flex-col justify-center">
        <div className="magic-bento-card__label mb-3">{label}</div>
        <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent ${valueClassName ?? ''}`}>
          {value}
        </div>
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="-mt-32 sm:-mt-40 lg:-mt-48 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0a0b0a] relative z-20">
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#0a0b0a] to-transparent pointer-events-none"></div>

      {/* Moon Logo - decorative elements */}
      <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 opacity-15 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={60}
          height={60}
          className="w-8 h-8 sm:w-12 sm:h-12"
          unoptimized
        />
      </div>
      <div className="absolute top-1/4 left-4 sm:left-8 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={50}
          height={50}
          className="w-6 h-6 sm:w-10 sm:h-10 rotate-45"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/4 right-8 sm:right-12 opacity-12 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={50}
          height={50}
          className="w-6 h-6 sm:w-10 sm:h-10 -rotate-45"
          unoptimized
        />
      </div>
      <div className="absolute top-1/6 left-12 sm:left-20 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 rotate-90"
          unoptimized
        />
      </div>
      <div className="absolute bottom-1/6 right-16 sm:right-24 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 -rotate-90"
          unoptimized
        />
      </div>
      <div className="absolute top-2/3 left-8 sm:left-16 opacity-10 pointer-events-none z-0">
        <Image
          src="/Moon Logo (1).png"
          alt=""
          width={35}
          height={35}
          className="w-5 h-5 sm:w-7 sm:h-7 rotate-30"
          unoptimized
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Info text */}
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-sm sm:text-base text-gray-400 italic">
            Poniższe dane opierają się wyłącznie na zrealizowanych przez nas projektach
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <div className="flex-1 min-w-0">
            <StatCard
              label="Zaoszczędzony czas"
              value="100+ godzin miesięcznie"
              particleCount={8}
              glowColor="39, 245, 121"
            />
          </div>
          <div className="flex-1 min-w-0">
            <StatCard
              label="Zaoszczędzone pieniądze"
              value="3 000 zł miesięcznie"
              valueClassName="relative left-[2px]"
              particleCount={8}
              glowColor="39, 245, 121"
            />
          </div>
          <div className="flex-1 min-w-0">
            <StatCard
              label="satysfakcja"
              value="100% zadowolonych klientów"
              particleCount={8}
              glowColor="39, 245, 121"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

