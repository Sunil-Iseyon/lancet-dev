"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"

const stats = [
  {
    number: "2010",
    label: "Focused on BI since 2010",
  },
  {
    number: "812",
    label: "Hundreds of successful BI projects completed",
  },
  {
    number: "126",
    label: "More than 100 consultants serving clients worldwide",
  },
  {
    number: "10k+",
    raw: 10000,
    label: "Over 10 thousands hours of services performed",
  },
]

export default function StatsSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px -15% 0px" })
  const subtitleInView = useInView(subtitleRef, { once: true, margin: "-15% 0px -15% 0px" })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-8 md:py-12 px-4 bg-white relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-[#007EB0]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-72 h-72 bg-[#55C4D6]/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 md:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-8"
        >
          <motion.h2 
            ref={titleRef}
            initial={{ opacity: 0, y: 60 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent"
          >
            We Are
          </motion.h2>
          <motion.p 
            ref={subtitleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-gray-600"
          >
            Delivering Excellence Since Day One
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function StatCard({ stat, index, isInView }: { stat: (typeof stats)[0]; index: number; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState("0")
  const hasAnimated = useRef(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isInView) {
      // Reset when out of view
      hasAnimated.current = false
      setDisplayValue("0")
      return
    }

    if (hasAnimated.current) return

    hasAnimated.current = true
    const delay = index * 100

    setTimeout(() => {
      let start = 0
      let end, formatFn
      if (stat.number === "10k+") {
        end = stat.raw || 10000
        formatFn = (val: number) => `${Math.floor(val / 1000)}k+`
      } else {
        end = Number.parseInt(stat.number.replace(/\D/g, ""))
        formatFn = (val: number) => Math.floor(val).toString()
      }
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayValue(stat.number)
          clearInterval(timer)
        } else {
          setDisplayValue(formatFn(start))
        }
      }, 16)
    }, delay)
  }, [isInView, stat, index])

  return (
    <AnimatedCard index={index} className="h-full">
      <div className="relative h-full p-3 md:p-5 rounded-2xl bg-linear-to-br from-white to-gray-50 border-2 border-[#E0F0F5] shadow-sm flex flex-col">
        <div className="relative z-10">
          <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent mb-3">
            {displayValue}
          </div>
        </div>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed relative z-10 mt-auto">
          {stat.label}
        </p>
      </div>
    </AnimatedCard>

  )
}
