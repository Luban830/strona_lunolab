'use client'

import { motion } from 'framer-motion'
import { TextEffect } from '@/components/core/text-effect'

const stats = [
  { label: 'Zaoszczędzone godziny', value: '10,000+', unit: 'h' },
  { label: 'Zautomatyzowane procesy', value: '500+', unit: '' },
  { label: 'Klienci zadowoleni', value: '98%', unit: '' },
  { label: 'Zrealizowane projekty', value: '200+', unit: '' },
]

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
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr_1.5fr] gap-6 items-center">
          {/* Left side - Stats cards */}
          <div className="relative lg:min-h-[300px] min-h-0 hidden lg:block">
            {stats.slice(0, 2).map((stat, index) => {
              // Nieregularne pozycje dla kart po lewej
              const positions = [
                { top: '5%', left: '0%', rotate: '-3deg' },
                { top: '45%', left: '20%', rotate: '2deg' },
              ]
              const position = positions[index]
              
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="absolute w-full max-w-[240px]"
                  style={{
                    top: position.top,
                    left: position.left,
                    transform: `rotate(${position.rotate})`,
                  }}
                >
                  <div className="w-full max-w-[240px] mx-auto bg-[#242424] border border-[#27F579]/30 rounded-2xl transition-all duration-300 hover:border-[#27F579]/60 hover:scale-105 hover:shadow-[0_0_30px_rgba(39,245,121,0.3)] cursor-pointer">
                    <div className="relative text-center z-10 px-6 py-8 rounded-2xl w-full">
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-bold text-[#27F579]">
                          {stat.value}
                          {stat.unit && <span className="text-2xl">{stat.unit}</span>}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Center - Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center"
          >
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontSize: '50px', width: '780px', maxWidth: '100%', margin: '0 auto' }}
            >
              <TextEffect per="char" preset="fade">
                Automatyzujemy przyszłość z AI
              </TextEffect>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed text-center">
              Lunolab tworzy zaawansowane rozwiązania automatyzacyjne, które 
              przyspieszają Twoje procesy biznesowe i zwiększają efektywność.
            </p>
          </motion.div>

          {/* Right side - Stats cards */}
          <div className="relative lg:min-h-[300px] min-h-[300px] sm:min-h-[250px] hidden lg:block">
            {stats.slice(2, 4).map((stat, index) => {
              // Nieregularne pozycje dla kart po prawej
              const positions = [
                { top: '0%', right: '0%', rotate: '3deg' },
                { top: '40%', right: '15%', rotate: '-2deg' },
              ]
              const position = positions[index]
              
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index + 2) * 0.1 }}
                  className="absolute w-full max-w-[240px]"
                  style={{
                    top: position.top,
                    right: position.right,
                    transform: `rotate(${position.rotate})`,
                  }}
                >
                  <div className="w-full max-w-[240px] mx-auto bg-[#242424] border border-[#27F579]/30 rounded-2xl transition-all duration-300 hover:border-[#27F579]/60 hover:scale-105 hover:shadow-[0_0_30px_rgba(39,245,121,0.3)] cursor-pointer">
                    <div className="relative text-center z-10 px-6 py-8 rounded-2xl w-full">
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-bold text-[#27F579]">
                          {stat.value}
                          {stat.unit && <span className="text-2xl">{stat.unit}</span>}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile stats - shown below text on mobile */}
        <div className="grid grid-cols-2 gap-4 mt-12 lg:hidden">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="bg-[#242424] border border-[#27F579]/30 rounded-2xl transition-all duration-300 hover:border-[#27F579]/60 hover:scale-105 hover:shadow-[0_0_30px_rgba(39,245,121,0.3)] cursor-pointer">
                <div className="text-center px-4 py-6">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-[#27F579]">
                      {stat.value}
                      {stat.unit && <span className="text-lg">{stat.unit}</span>}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

