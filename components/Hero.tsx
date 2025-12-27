'use client'

import { motion } from 'framer-motion'
import { TextEffect } from '@/components/core/text-effect'

export default function Hero() {
  const opacity = 0.01

  return (
    <section className="min-h-screen lg:min-h-[80vh] xl:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12 lg:py-20">
      {/* Noise effect background */}
      <div
        className="absolute top-0 left-0 w-full h-full content-[''] z-0 pointer-events-none bg-[url('https://www.ui-layouts.com/noise.gif')]"
        style={{ opacity: opacity }}
      ></div>

      {/* Grid pattern with radial mask */}
      <div className="absolute bottom-0 left-[-2px] top-[19px] right-0 h-[500px] bg-[linear-gradient(to_right,#27F57915_1px,transparent_1px),linear-gradient(to_bottom,#27F57915_1px,transparent_1px)] bg-[length:35px_34px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-0 text-center mb-12"
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontSize: '50px', width: '780px', maxWidth: '100%', margin: '0 auto' }}
          >
            <TextEffect per="char" preset="fade">
              Automatyzujemy przyszłość z AI
            </TextEffect>
          </h1>
          <p className="text-xl sm:text-2xl text-white leading-relaxed text-center max-w-3xl mx-auto -mt-6">
            Lunolab tworzy zaawansowane rozwiązania automatyzacyjne, które
            przyspieszają Twoje procesy biznesowe i zwiększają efektywność w Twojej firmie.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

