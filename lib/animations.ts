/**
 * Global Animation Configuration
 * Unified animation utilities for consistent behavior across all pages
 * Performance-optimized with proper cleanup and re-trigger support
 */

import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Animation configuration constants
export const ANIMATION_CONFIG = {
  // Durations
  DURATION: {
    FAST: 0.4,
    NORMAL: 0.6,
    SLOW: 0.8,
    VERY_SLOW: 1.2,
  },
  // Easings
  EASING: {
    OUT: "power3.out",
    IN_OUT: "power2.inOut",
    ELASTIC: "elastic.out(1, 0.5)",
  },
  // Scroll trigger settings
  SCROLL: {
    START: "top 80%",
    START_HERO: "top 90%",
    END: "bottom 20%",
    // Re-trigger animations on scroll (both directions)
    TOGGLE_ACTIONS: "play reverse play reverse", // enter, leave, enter-back, leave-back
    // Only play once
    TOGGLE_ACTIONS_ONCE: "play none none none",
  },
  // Offsets
  OFFSET: {
    SMALL: 20,
    MEDIUM: 40,
    LARGE: 60,
    XL: 80,
  },
}

/**
 * Create a reusable GSAP context for animations
 * Ensures proper cleanup and memory management
 */
export function createAnimationContext(callback: () => void) {
  if (typeof window === "undefined") return { revert: () => {} }
  
  const ctx = gsap.context(callback)
  return ctx
}

/**
 * Fade in from bottom animation with scroll trigger
 * @param element - Target element(s)
 * @param options - Animation options
 */
export function fadeInUp(
  element: gsap.TweenTarget,
  options: {
    duration?: number
    delay?: number
    offset?: number
    trigger?: gsap.TweenTarget
    start?: string
    retriggerable?: boolean
  } = {}
) {
  const {
    duration = ANIMATION_CONFIG.DURATION.NORMAL,
    delay = 0,
    offset = ANIMATION_CONFIG.OFFSET.MEDIUM,
    trigger = element,
    start = ANIMATION_CONFIG.SCROLL.START,
    retriggerable = false,
  } = options

  return gsap.fromTo(
    element,
    {
      y: offset,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: ANIMATION_CONFIG.EASING.OUT,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: retriggerable 
          ? ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS 
          : ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
      },
    }
  )
}

/**
 * Fade in from left animation with scroll trigger
 */
export function fadeInLeft(
  element: gsap.TweenTarget,
  options: {
    duration?: number
    delay?: number
    offset?: number
    trigger?: gsap.TweenTarget
    start?: string
    retriggerable?: boolean
  } = {}
) {
  const {
    duration = ANIMATION_CONFIG.DURATION.NORMAL,
    delay = 0,
    offset = ANIMATION_CONFIG.OFFSET.LARGE,
    trigger = element,
    start = ANIMATION_CONFIG.SCROLL.START,
    retriggerable = false,
  } = options

  return gsap.fromTo(
    element,
    {
      x: -offset,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: ANIMATION_CONFIG.EASING.OUT,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: retriggerable 
          ? ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS 
          : ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
      },
    }
  )
}

/**
 * Fade in from right animation with scroll trigger
 */
export function fadeInRight(
  element: gsap.TweenTarget,
  options: {
    duration?: number
    delay?: number
    offset?: number
    trigger?: gsap.TweenTarget
    start?: string
    retriggerable?: boolean
  } = {}
) {
  const {
    duration = ANIMATION_CONFIG.DURATION.NORMAL,
    delay = 0,
    offset = ANIMATION_CONFIG.OFFSET.LARGE,
    trigger = element,
    start = ANIMATION_CONFIG.SCROLL.START,
    retriggerable = false,
  } = options

  return gsap.fromTo(
    element,
    {
      x: offset,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: ANIMATION_CONFIG.EASING.OUT,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: retriggerable 
          ? ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS 
          : ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
      },
    }
  )
}

/**
 * Staggered fade in animation for multiple elements
 */
export function staggerFadeInUp(
  elements: gsap.TweenTarget,
  options: {
    duration?: number
    stagger?: number
    offset?: number
    trigger?: gsap.TweenTarget
    start?: string
    retriggerable?: boolean
  } = {}
) {
  const {
    duration = ANIMATION_CONFIG.DURATION.NORMAL,
    stagger = 0.1,
    offset = ANIMATION_CONFIG.OFFSET.MEDIUM,
    trigger = elements,
    start = ANIMATION_CONFIG.SCROLL.START,
    retriggerable = false,
  } = options

  return gsap.fromTo(
    elements,
    {
      y: offset,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: ANIMATION_CONFIG.EASING.OUT,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: retriggerable 
          ? ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS 
          : ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
      },
    }
  )
}

/**
 * Scale in animation
 */
export function scaleIn(
  element: gsap.TweenTarget,
  options: {
    duration?: number
    delay?: number
    from?: number
    trigger?: gsap.TweenTarget
    start?: string
    retriggerable?: boolean
  } = {}
) {
  const {
    duration = ANIMATION_CONFIG.DURATION.NORMAL,
    delay = 0,
    from = 0.8,
    trigger = element,
    start = ANIMATION_CONFIG.SCROLL.START,
    retriggerable = false,
  } = options

  return gsap.fromTo(
    element,
    {
      scale: from,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: ANIMATION_CONFIG.EASING.OUT,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: retriggerable 
          ? ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS 
          : ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
      },
    }
  )
}

/**
 * Hero section animation (no scroll trigger, immediate)
 */
export function heroAnimation(
  element: gsap.TweenTarget,
  options: {
    duration?: number
    delay?: number
    offset?: number
  } = {}
) {
  const {
    duration = ANIMATION_CONFIG.DURATION.VERY_SLOW,
    delay = 0,
    offset = ANIMATION_CONFIG.OFFSET.XL,
  } = options

  return gsap.fromTo(
    element,
    {
      y: offset,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: ANIMATION_CONFIG.EASING.OUT,
    }
  )
}

/**
 * Refresh all ScrollTrigger instances
 * Call this after dynamic content changes
 */
export function refreshScrollTriggers() {
  if (typeof window !== "undefined") {
    ScrollTrigger.refresh()
  }
}

/**
 * Kill all ScrollTrigger instances
 * Use for cleanup
 */
export function killAllScrollTriggers() {
  if (typeof window !== "undefined") {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}

/**
 * Framer Motion variants for consistent animations
 * Use these instead of inline animations
 */
export const motionVariants = {
  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  
  // Fade in from left
  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  
  // Fade in from right
  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  
  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  
  // Stagger container
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  // Stagger item
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
}

/**
 * Viewport configuration for Framer Motion
 * Consistent scroll reveal settings
 */
export const motionViewport = {
  // Re-trigger on every scroll (both directions)
  retriggerable: { once: false, amount: 0.2 },
  
  // Only trigger once
  once: { once: true, amount: 0.2 },
  
  // Trigger when more visible
  halfVisible: { once: false, amount: 0.5 },
}
