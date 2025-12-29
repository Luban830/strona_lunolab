'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
        prefill?: object
        utm?: object
      }) => void
    }
  }
}

export default function UmowSpotkaniePage() {
  const calendlyRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Calendly CSS
    const existingLink = document.querySelector(
      'link[href="https://assets.calendly.com/assets/external/widget.css"]'
    )
    if (!existingLink) {
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    // Load Calendly script and initialize widget
    const initCalendly = () => {
      if (window.Calendly && calendlyRef.current) {
        // Clear any existing content
        calendlyRef.current.innerHTML = ''
        
        // Initialize the widget
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/lunolabx/30min',
          parentElement: calendlyRef.current,
        })
        setIsLoaded(true)
      }
    }

    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    )

    if (existingScript) {
      // Script already exists, just init
      if (window.Calendly) {
        initCalendly()
      } else {
        // Script exists but not loaded yet, wait for it
        existingScript.addEventListener('load', initCalendly)
      }
    } else {
      // Load the script
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = initCalendly
      document.head.appendChild(script)
    }

    return () => {
      // Cleanup on unmount
      if (calendlyRef.current) {
        calendlyRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#151716] pt-20">
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Umów <span className="text-[#27F579] neon-glow">spotkanie</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Wybierz dogodny termin i umów się na bezpłatną konsultację
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#242424] border border-gray-700 rounded-lg overflow-hidden p-4 sm:p-8"
          >
            {/* Loading state */}
            {!isLoaded && (
              <div className="flex items-center justify-center h-[700px]">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[#27F579]/30 border-t-[#27F579] rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400">Ładowanie kalendarza...</p>
                </div>
              </div>
            )}
            
            {/* Calendly widget container */}
            <div
              ref={calendlyRef}
              style={{ 
                minWidth: '320px', 
                height: '700px',
                display: isLoaded ? 'block' : 'none'
              }}
            />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
