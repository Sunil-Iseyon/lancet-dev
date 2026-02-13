"use client"

import { BarChart3, Zap, Database, Lightbulb } from "lucide-react"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { ImageSkeleton } from "@/components/ui/image-skeleton"
import { useEffect, useRef } from "react"
import { createAnimationContext, fadeInUp } from "@/lib/animations"

// Icon map to convert string names to components
const iconMap: Record<string, any> = {
  Zap,
  BarChart3,
  Database,
  Lightbulb,
}

interface ServicesSectionProps {
  services: any[]
}

export default function ServicesSection({ services: servicesData }: ServicesSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = createAnimationContext(() => {
      // Title animation - once only
      fadeInUp(titleRef.current, {
        duration: 1,
        offset: 60,
        retriggerable: false,
        start: "top 85%"
      })

      // Subtitle animation - once only
      fadeInUp(subtitleRef.current, {
        duration: 0.8,
        delay: 0.2,
        offset: 40,
        retriggerable: false,
        start: "top 85%",
        trigger: titleRef.current
      })

      // Cards animation - once only
      fadeInUp(cardsRef.current, {
        duration: 1,
        delay: 0.4,
        offset: 60,
        retriggerable: false,
        start: "top 85%"
      })
    })

    return () => ctx.revert()
  }, [])
  
  const services = servicesData.map((service: any) => {
    const IconComponent = iconMap[service.icon] || BarChart3
    return {
      id: service.serviceId,
      icon: <IconComponent className="w-8 h-8" />,
      title: service.title,
      description: service.description,
      image: service.image,
      link: service.link,
    }
  })

  const stickyContent = services.map((service: any) => ({
  title: (
    <span className="flex items-center gap-3">
      <span className="text-primary">{service.icon}</span>
      {service.title}
    </span>
  ),
  description: service.description,
  learn: (
    <a
      href={service.link}
      className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
    >
      Learn More
    </a>
  ),
  content: (
    <div className="relative h-full w-full">
      {service.image ? (
        <ImageSkeleton 
          src={service.image || "/placeholder.svg"} 
          alt={service.title} 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          objectFit="cover"
        />
      ) : (
        <span className="text-primary" style={{ fontSize: 96 }}>
          {service.icon}
        </span>
      )}
    </div>
  ),
}))

  return (
    <section id="services" className="relative py-20 px-4 bg-white dark:bg-slate-950">
      <div className="px-24 mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2  bg-linear-to-r from-slate-900 via-primary to-slate-900  bg-clip-text text-transparent">
            Our Services
          </h2>
          <p ref={subtitleRef} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Comprehensive solutions designed to unlock the full potential of your data
          </p>
        </div>
        <div ref={cardsRef}>
          <StickyScroll content={stickyContent} contentClassName="bg-card" />
        </div>
      </div>
    </section>
  )
}
