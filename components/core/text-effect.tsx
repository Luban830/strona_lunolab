'use client'

import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'

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
} as const

// Style stałe dla lepszej wydajności
const inlineBlockStyle = { display: 'inline-block' } as const
const wordStyle = { display: 'inline-block', whiteSpace: 'nowrap' as const }
const wordWithMarginStyle = { display: 'inline-block', marginRight: '0.25em' }

export const TextEffect = memo(function TextEffect({
  children,
  per = 'char',
  preset = 'fade',
  className = ''
}: TextEffectProps) {
  const presetConfig = presets[preset]
  const delayStep = 0.03

  // Memoizacja parsowania tekstu
  const parsedData = useMemo(() => {
    const words = children.split(' ')
    const textWithoutSpaces = children.replace(/\s/g, '')
    const isLastTwoAI = textWithoutSpaces.slice(-2) === 'AI'
    return { words, isLastTwoAI }
  }, [children])

  if (per === 'char') {
    let globalCharIndex = 0

    return (
      <span className={className}>
        {parsedData.words.map((word, wordIndex) => {
          const chars = word.split('')
          const isLastWord = wordIndex === parsedData.words.length - 1
          
          return (
            <span key={wordIndex} style={wordStyle}>
              {chars.map((char, charIndex) => {
                const currentGlobalIndex = globalCharIndex++
                // Sprawdź czy to ostatnie 2 znaki (ignorując spacje) i są to "AI"
                const isPartOfAI = parsedData.isLastTwoAI && isLastWord && word === 'AI' && (char === 'A' || char === 'I')

                return (
                  <motion.span
                    key={charIndex}
                    initial={presetConfig.initial}
                    animate={presetConfig.animate}
                    transition={{
                      ...presetConfig.transition,
                      delay: currentGlobalIndex * delayStep,
                    }}
                    style={inlineBlockStyle}
                    className={isPartOfAI ? 'text-[#27F579] neon-glow-subtle' : ''}
                  >
                    {char}
                  </motion.span>
                )
              })}
              {wordIndex < parsedData.words.length - 1 && (
                <span style={inlineBlockStyle}>{'\u00A0'}</span>
              )}
            </span>
          )
        })}
      </span>
    )
  } else {
    return (
      <span className={className}>
        {parsedData.words.map((word, index) => (
          <motion.span
            key={index}
            initial={presetConfig.initial}
            animate={presetConfig.animate}
            transition={{
              ...presetConfig.transition,
              delay: index * delayStep,
            }}
            style={wordWithMarginStyle}
          >
            {word}
          </motion.span>
        ))}
      </span>
    )
  }
})

