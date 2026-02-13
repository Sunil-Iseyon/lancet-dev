import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

export { gsap, ScrollTrigger, ScrollSmoother }

// Utility function to create fade-in animations
export const fadeInUp = (element: string | Element, delay = 0) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })
}

// Utility function to create stagger animations
export const staggerFadeIn = (elements: string | Element[], delay = 0) => {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elements,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  })
}

// Utility function to create parallax effect
export const parallax = (element: string | Element, speed = 0.5) => {
  return gsap.to(element, {
    y: () => -window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}
