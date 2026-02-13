"use client"

import { useEffect, useRef, useState } from "react"
import { useAnimation } from "framer-motion"

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean // Control re-trigger behavior
}

/**
 * Enhanced scroll reveal hook with re-trigger support
 * @param options - Intersection observer options
 * @returns Animation controls and ref
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin, once = false } = options
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If 'once' is true, only animate the first time
        if (once && hasAnimated) return

        if (entry.isIntersecting) {
          setHasAnimated(true)
          controls.start({
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          })
        } else if (!once) {
          // Re-trigger: animate out when leaving viewport
          controls.start({
            opacity: 0,
            y: 40,
            transition: {
              duration: 0.4,
              ease: "easeIn",
            },
          })
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls, hasAnimated, once, threshold, rootMargin])

  return {
    ref,
    initial: { opacity: 0, y: 40 },
    animate: controls,
  }
}
