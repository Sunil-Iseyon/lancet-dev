"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { User2 } from "lucide-react"

export type Testimonial = {
  name: string
  position?: string
  company?: string
  review: string
  avatarUrl?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const AUTO_CHANGE_INTERVAL = 10000

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px -15% 0px" })

  const total = testimonials.length

  /* ---------------- Auto Slide ---------------- */
  useEffect(() => {
    startAutoSlide()
    return stopAutoSlide
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const startAutoSlide = () => {
    stopAutoSlide()
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % total)
    }, AUTO_CHANGE_INTERVAL)
  }

  const stopAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const next = () => setIndex((prev) => (prev + 1) % total)
  const prev = () => setIndex((prev) => (prev - 1 + total) % total)

  if (!testimonials || testimonials.length === 0) return null

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-10 sm:py-14 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="px-4 sm:px-8 md:px-24">
        {/* ---------------- Header ---------------- */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3">
            Hear from the teams we&apos;ve helped succeed
          </p>
        </div>

        {/* ---------------- Carousel ---------------- */}
        <div
          className="relative max-w-3xl mx-auto overflow-hidden min-h-[260px] sm:min-h-[300px]"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <TestimonialCard testimonial={testimonials[index]} />
            </motion.div>
          </AnimatePresence>

          {/* ---------------- Controls ---------------- */}
          <div className="flex justify-between items-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-lg border border-border hover:bg-muted transition"
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-3 rounded-full transition-all ${
                    i === index ? "bg-primary w-8" : "bg-white w-3"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-lg border border-border hover:bg-muted transition"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ---------------- Card ---------------- */
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 md:p-7 shadow-md h-[250px]">
      <p className="text-foreground/90 text-base sm:text-lg italic leading-relaxed mb-6 text-center">
        “{testimonial.review}”
      </p>

      <div className="flex items-center justify-center gap-3 sm:gap-4 border-t border-border pt-5">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <User2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>

        <div className="text-center">
          <p className="font-semibold text-sm sm:text-base">
            {testimonial.position}
          </p>
          {testimonial.company && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
