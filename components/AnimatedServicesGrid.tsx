"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { AnimatedCard } from "@/components/ui/animated-card"
import { motion, useInView } from "framer-motion"
import { BarChart3, Zap, Database, Lightbulb, Settings, Briefcase } from "lucide-react"
import { ImageSkeleton } from "@/components/ui/image-skeleton"

// Icon map to convert string names to components
const iconMap: Record<string, any> = {
  Zap,
  BarChart3,
  Database,
  Lightbulb,
  Settings,
  Briefcase,
}

interface Service {
  title: string
  serviceDescription?: string
  image?: string
  showInServiceSection?: boolean
  category?: string
  _sys?: {
    filename: string
  }
}

interface AnimatedServicesGridProps {
  services: Service[]
  title?: string
  subtitle?: string
}

export default function AnimatedServicesGrid({ 
  services, 
  title = "Our Services",
  subtitle = "Comprehensive solutions designed to unlock the full potential of your data"
}: AnimatedServicesGridProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px -15% 0px" })
  const subtitleInView = useInView(subtitleRef, { once: true, margin: "-15% 0px -15% 0px" })

  // Take only first 6 services
  const displayedServices = services.slice(0, 6)

  return (
    <section id="animated-services-grid" className="relative py-16 bg-linear-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950" style={{ isolation: 'isolate' }}>
      <div className="px-4 md:px-28 mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 60 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => {
            // Generate link based on category and filename
            let serviceLink = ''
            const filename = service._sys?.filename?.replace('.mdx', '').replace('.md', '') || service.title.toLowerCase().replace(/\s+/g, '-')
            
            switch(service.category) {
              case 'business-intelligent':
                serviceLink = `/consulting/business-intelligent/${filename}`
                break
              case 'data-integration':
                serviceLink = `/consulting/data-integration/${filename}`
                break
              case 'data-services':
                serviceLink = `/consulting/data-services/${filename}`
                break
              case '247-service':
                serviceLink = `/247-service/${filename}`
                break
              case 'engagement-modes':
                serviceLink = `/engagement-modes/${filename}`
                break
              case 'services':
                serviceLink = `/services/${filename}`
                break
              default:
                serviceLink = `/${filename}`
            }
            
            return (
              <AnimatedCard
                key={`${service.title}-${index}`}
                index={index}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-primary/5 border-2 border-transparent hover:border-primary/30 cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Image */}
                    <div className="mb-4 flex items-center justify-center">
                      {service.image ? (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden">
                          <ImageSkeleton 
                            src={service.image} 
                            alt={service.title}
                            fill
                            className="group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            objectFit="cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                          <BarChart3 className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>

                    {/* Description */}
                    {service.serviceDescription && (
                      <CardDescription className="text-sm text-muted-foreground grow line-clamp-4">
                        {service.serviceDescription}
                      </CardDescription>
                    )}

                    {/* Learn More Link */}
                    <a
                      href={serviceLink}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group-hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Learn More
                      <svg
                        className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
