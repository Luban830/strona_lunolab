'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TextEffectProps {
  children: string
  per?: 'char' | 'word'
  preset?: 'fade' | 'slide' | 'scale'
  className?: string
}

const presets = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
}

export function TextEffect({ 
  children, 
  per = 'char', 
  preset = 'fade',
  className = ''
}: TextEffectProps) {
  const presetConfig = presets[preset]
  const delayStep = 0.03

  if (per === 'char') {
    const chars = children.split('')
    const textWithoutSpaces = children.replace(/\s/g, '')
    const isLastTwoAI = textWithoutSpaces.slice(-2) === 'AI'
    let nonSpaceIndex = 0
    
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const isSpace = char === ' '
          if (!isSpace) {
            nonSpaceIndex++
          }
          // Sprawdź czy to ostatnie 2 znaki (ignorując spacje) i są to "AI"
          const isPartOfAI = isLastTwoAI && nonSpaceIndex > textWithoutSpaces.length - 2 && !isSpace
          
          return (
            <motion.span
              key={index}
              initial={presetConfig.initial}
              animate={presetConfig.animate}
              transition={{
                ...presetConfig.transition,
                delay: index * delayStep,
              }}
              style={{ display: 'inline-block' }}
              className={isPartOfAI ? 'text-[#27F579] neon-glow' : ''}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          )
        })}
      </span>
    )
  } else {
    const words = children.split(' ')
    
    return (
      <span className={className}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={presetConfig.initial}
            animate={presetConfig.animate}
            transition={{
              ...presetConfig.transition,
              delay: index * delayStep,
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    )
  }
}

