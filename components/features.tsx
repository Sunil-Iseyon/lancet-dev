"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { createAnimationContext, ANIMATION_CONFIG } from "@/lib/animations"

interface Feature {
  title: string
  description: string
}

interface FeaturesClientProps {
  features: Feature[]
}

export default function FeaturesClient({ features }: FeaturesClientProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = createAnimationContext(() => {
      // Header animation - once only
      gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
        },
      })
      .fromTo(titleRef.current, {
        opacity: 0,
        y: 60,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: ANIMATION_CONFIG.EASING.OUT,
      })
      .fromTo(descRef.current, {
        opacity: 0,
        y: 40,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: ANIMATION_CONFIG.EASING.OUT,
      }, "-=0.4")

      // Features section initial state - hidden below
      gsap.set(sectionRef.current, {
        opacity: 0,
        y: 50,
      })

      // Reveal features section on scroll - once only
      gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
      .to(sectionRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: ANIMATION_CONFIG.EASING.OUT,
      })

      // Background fill and subtitle animation from left to right - once only
      const bgTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
        },
      })
      
      bgTimeline.fromTo(bgRef.current, {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: 1.2,
        ease: ANIMATION_CONFIG.EASING.IN_OUT,
      })
      .fromTo(subtitleRef.current, {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: ANIMATION_CONFIG.EASING.OUT,
      }, 0.2)

      // Features items animation - once only
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: ANIMATION_CONFIG.SCROLL.TOGGLE_ACTIONS_ONCE,
        },
      })
      .fromTo(".feature-item", {
        opacity: 0,
        x: 50,
      }, {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: ANIMATION_CONFIG.EASING.OUT,
        delay: 0.8,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Header Section */}
      <div ref={headerRef} className="text-center py-8 md:py-12 bg-white  flex items-center justify-center">
        <div className="max-w-xl mx-auto ">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2  bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
            Turning Data into Confident Decisions
          </h2>
          <p ref={descRef} className="text-xl text-foreground/70 max-w-xl mx-auto">
            Comprehensive solutions designed to unlock the full potential of your data
          </p>
        </div>
      </div>

      {/* Features Content */}
      <section ref={sectionRef} className="min-h-max py-8 md:py-12 relative overflow-hidden">
        {/* Animated background that fills from left to right */}
        <div 
          ref={bgRef}
          className="absolute inset-0 origin-left bg-linear-to-r from-[#004D6D] via-[#007EB0] to-[#0099CC]"
          style={{ transform: 'scaleX(0)' }}
        />
        
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
            {/* Left side - Title */}
            <div>
              <h2 
                ref={subtitleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              >
                Data You Can Trust with
              </h2>
            </div>

            {/* Right side - Features */}
            <div ref={featuresRef} className="space-y-4 md:space-y-8">
              {features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <div className="feature-item flex gap-4 items-start">
      {/* Dot indicator */}
      <div className="shrink-0 mt-2">
        <div className="w-4 h-4 rounded-full bg-white" />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-300 text-base md:text-lg">
          {feature.description}
        </p>
      </div>
    </div>
  )
}
