"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { ScrollSmoother, ScrollTrigger } from "@/lib/gsap"

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const smoothRef = useRef<ScrollSmoother | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Reset scroll position on route change
  useEffect(() => {
    if (smoothRef.current) {
      smoothRef.current.scrollTo(0, false)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    // Initialize ScrollSmoother
    if (wrapperRef.current && contentRef.current) {
      smoothRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true, // Helps with scroll normalization
        ignoreMobileResize: true, // Prevents issues on mobile
      })

      // Refresh ScrollTrigger after content loads
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      // Also refresh after images/fonts load
      const handleLoad = () => {
        ScrollTrigger.refresh()
      }
      window.addEventListener('load', handleLoad)

      // Handle hash navigation
      const handleHashChange = () => {
        const hash = window.location.hash
        if (hash && smoothRef.current) {
          const element = document.querySelector(hash)
          if (element) {
            const offset = element.getBoundingClientRect().top + window.scrollY - 100
            smoothRef.current.scrollTo(offset, true, "power2.inOut")
          }
        }
      }
      window.addEventListener('hashchange', handleHashChange)
      
      // Trigger on initial load if hash exists
      if (window.location.hash) {
        setTimeout(handleHashChange, 500)
      }

      return () => {
        clearTimeout(refreshTimer)
        window.removeEventListener('load', handleLoad)
        window.removeEventListener('hashchange', handleHashChange)
        smoothRef.current?.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    return () => {
      smoothRef.current?.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
