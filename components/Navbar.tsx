'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/#video', label: 'O nas' },
    { href: '/#uslugi', label: 'Usługi' },
    { href: '/#case-studies', label: 'Projekty' },
    { href: '/projekty', label: 'Case studies' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false)

    // Smooth scroll for anchor links
    if (href.startsWith('/#')) {
      e.preventDefault()
      const targetId = href.replace('/#', '')

      // If we're on a different page, navigate to home with hash
      if (pathname !== '/') {
        window.location.href = '/#' + targetId
        return
      }

      // We're on the home page, scroll to element
      const element = document.getElementById(targetId)
      if (element) {
        const offset = 80 // Navbar height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else if (href === '/#') {
        // Scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0b0a]/95 backdrop-blur-md border-b border-[#27F579]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            <Image
              src="/logo_lunolab.png"
              alt="Lunolab - Automatyzacja procesów AI dla firm"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href.replace('/#', '/') ||
                (link.href.startsWith('/#') && pathname === '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#27F579]'
                      : 'text-gray-300 hover:text-[#27F579]'
                  }`}
                  aria-label={`Przejdź do sekcji ${link.label}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="/umow-spotkanie"
              className="cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-6 py-3 text-[#151716] font-semibold text-sm shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95 hover:scale-105 hover:shadow-[0px_2px_0px_0px_rgba(39,245,121,0.5)_inset,0px_4px_12px_0px_rgba(39,245,121,0.4)] hover:brightness-110"
            >
              Umów spotkanie
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-[#27F579] transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 right-0 z-[9999] h-[calc(100vh-5rem)] w-full overflow-y-auto bg-[#050505] border-t border-[#27F579]/20 px-4 sm:px-6 py-6">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href.replace('/#', '/') ||
                  (link.href.startsWith('/#') && pathname === '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#27F579]'
                        : 'text-gray-300 hover:text-[#27F579]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/umow-spotkanie"
                onClick={() => setIsMobileMenuOpen(false)}
                className="cursor-pointer rounded-full bg-gradient-to-r from-[#27F579] via-[#27F579] to-[#1a7a4a] px-6 py-3 text-[#151716] font-semibold text-center mt-3 shadow-[0px_2px_0px_0px_rgba(39,245,121,0.3)_inset,0px_0.5px_1px_0px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95"
              >
                Umów spotkanie
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

