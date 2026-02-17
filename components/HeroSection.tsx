"use client"

import { motion } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("animated-services-grid")
    if (servicesSection) {
      const navbarHeight = 80
      const elementPosition = servicesSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
  {/* Background Image */}
  <Image
    src="/lancetBg.webp"
    alt="Hero background depicting data artistry for Lancet Software India business intelligence and data analytics solutions"
    fill
    priority
    quality={85}
    className="object-cover"
    sizes="100vw"
  />

      {/* Radial Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-2 sm:px-4 lg:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 sm:pb-12 max-w-6xl mx-auto min-h-screen">
        
        {/* Heading */}
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            aria-label="Business Intelligence and Data Analytics Solutions - Organizing data is an art"
            className="flex flex-col items-center justify-center gap-2 sm:gap-3"
          >
            <TextGenerateEffect
              words="Organizing data"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight uppercase text-center"
              wordClasses={[
                "text-white",
                "bg-gradient-to-r from-yellow-500 via-yellow-300 to-white bg-clip-text text-transparent",
              ]}
            />
            <TextGenerateEffect
              words="is an art"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center uppercase"
              wordClasses={[
                "text-white",
                "text-white",
                "bg-gradient-to-r from-yellow-500 via-yellow-300 to-white bg-clip-text text-transparent",
              ]}
            />
            {/* <span className="sr-only">Business Intelligence and Data Analytics Solutions by Lancet Software India — Organizing data is an art</span> */}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-slate-100 text-sm sm:text-base lg:text-lg max-w-2xl text-center"
        >
         We are obsessed with collecting, analyzing and presenting data for your Business Intelligence needs.
        </motion.p>

        {/* CTA Buttons (ONE ROW on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 sm:gap-4 mt-5 w-full"
        >
          <button
            onClick={scrollToServices}
            className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-yellow-500 border-2 border-yellow-500 text-white text-sm sm:text-base font-semibold rounded hover:bg-amber-400 hover:border-amber-400 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap"
          >
            Learn more
          </button>

          <Link
            href="/contact"
            className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 border-2 font-bold border-white/50 text-white text-sm sm:text-base rounded hover:bg-cyan-500/10 transition-all whitespace-nowrap"
          >
            Contact us
          </Link>
        </motion.div>

        {/* Stats (ONE ROW on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-8 w-full max-w-3xl"
        >
          {[
            { value: "800+", label: "Projects Delivered", srLabel: "Over 800 business intelligence projects delivered, based on internal delivery records" },
            { value: "98%", label: "Client Satisfaction", srLabel: "Up to 98% client satisfaction, according to internal client feedback surveys" },
            { value: "24/7", label: "Support Available", srLabel: "24/7 managed support services available for enterprise clients" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-3 sm:p-4 rounded-lg backdrop-blur-md border border-white/20 hover:border-white/30 transition-all"
              role="figure"
              aria-label={stat.srLabel}
            >
              <div className="text-xl sm:text-3xl font-bold bg-linear-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-sm text-slate-200 font-medium text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
