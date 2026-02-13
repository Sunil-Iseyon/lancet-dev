"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

interface RelatedService {
  path: string
  title: string
  subtitle?: string
  image: string
}

interface RelatedServicesCarouselProps {
  items: RelatedService[]
}

export default function RelatedServicesCarousel({ items }: RelatedServicesCarouselProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  const totalDots = Math.ceil(items.length / getItemsPerView())

  function getItemsPerView() {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const itemsPerView = getItemsPerView()
      const scrollAmount = index * (carouselRef.current.scrollWidth / totalDots)
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : totalDots - 1
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentIndex < totalDots - 1 ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Update current index based on scroll position
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      const scrollPosition = carousel.scrollLeft
      const itemWidth = carousel.scrollWidth / totalDots
      const newIndex = Math.round(scrollPosition / itemWidth)
      setCurrentIndex(newIndex)
    }

    carousel.addEventListener('scroll', handleScroll)
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [totalDots])

  if (items.length === 0) return null

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-12 pt-8 border-t border-border"
    >
      <h2 className="text-xl font-bold mb-6">Related Services</h2>
      
      <div className="relative">
        {/* Navigation Buttons - Desktop */}
        {items.length > 3 && (
          <>
            <button
              onClick={handlePrevious}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center bg-white dark:bg-slate-800 border border-border rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center bg-white dark:bg-slate-800 border border-border rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Scrollable Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <div
              key={item.path}
              className="flex-shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] snap-start"
            >
              <button
                onClick={() => !isDragging && router.push(item.path)}
                className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-300 bg-muted/30 hover:bg-muted/60 w-full"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        {totalDots > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  )
}
