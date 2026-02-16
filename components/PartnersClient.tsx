"use client"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { useEffect, useRef } from "react"
import { createAnimationContext, fadeInUp } from "@/lib/animations"

interface Partner {
  name: string
  logo: string
}

interface PartnersClientProps {
  partners: Partner[]
}

export default function PartnersClient({ partners }: PartnersClientProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = createAnimationContext(() => {
      // ✅ Animate ONLY ONCE
      fadeInUp(titleRef.current, {
        duration: 1,
        offset: 60,
        start: "top 85%",
      })

      fadeInUp(cardsRef.current, {
        duration: 1,
        delay: 0.2,
        offset: 60,
        start: "top 85%",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="md:h-80 h-60 flex flex-col items-center justify-center relative overflow-hidden">
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center
        bg-linear-to-r from-slate-900 via-primary to-slate-900
        dark:from-white dark:via-primary dark:to-white
        bg-clip-text text-transparent"
      >
        Our Partners
      </h2>

      <div ref={cardsRef}>
        <InfiniteMovingCards
          items={partners.map((partner) => ({
            quote: "",
            name: partner.name,
            title: "",
            logo: partner.logo,
          }))}
          direction="right"
          speed="slow"
          // @ts-ignore
          renderItem={(item) => (
            <div className="flex flex-col items-center justify-center py-4">
              <img
                src={item.logo || "/placeholder.svg"}
                alt={`${item.name} - Lancet Software India technology partner logo`}
                className="md:h-12 h-7 w-auto mb-2"
                loading="lazy"
              />
            </div>
          )}
        />
      </div>
    </div>
  )
}
