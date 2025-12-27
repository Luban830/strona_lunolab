'use client'

import { clsx } from 'clsx'

interface NoiseBackgroundProps {
  children: React.ReactNode
  containerClassName?: string
  gradientColors?: string[]
}

export function NoiseBackground({
  children,
  containerClassName = '',
  gradientColors = ['rgb(255, 100, 150)', 'rgb(100, 150, 255)', 'rgb(255, 200, 100)'],
}: NoiseBackgroundProps) {
  return (
    <div className={clsx('relative', containerClassName)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
          mixBlendMode: 'overlay',
        }}
      />
      {children}
    </div>
  )
}

