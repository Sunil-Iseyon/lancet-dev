"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import RelatedServicesCarousel from "@/components/RelatedServicesCarousel"

interface ContentPageLayoutProps {
  title: string
  subtitle?: string
  image: string
  body: any
  relatedItems?: Array<{
    path: string
    title: string
    subtitle?: string
    image: string
  }>
}

export default function ContentPageLayout({
  title,
  subtitle,
  image,
  body,
  relatedItems = [],
}: ContentPageLayoutProps) {
  const router = useRouter()
  const headingRef = useRef(null)
  const imageRef = useRef(null)
  const bodyRef = useRef(null)
  
  const headingInView = useInView(headingRef, { once: true, margin: "-15% 0px -15% 0px" })
  const imageInView = useInView(imageRef, { once: true, margin: "-15% 0px -15% 0px" })
  const bodyInView = useInView(bodyRef, { once: true, margin: "-15% 0px -15% 0px" })

  const benchmarkLinks = [
    {
      text: "Global retail eCommerce sales reached $6.4T in 2025 and continue to grow in 2026",
      href: "https://www.shopify.com/blog/global-ecommerce-sales",
    },
    {
      text: "Most organizations are scaling analytics and AI investment programs",
      href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    },
    {
      text: "Web performance and Core Web Vitals remain critical for digital conversion outcomes",
      href: "https://web.dev/articles/vitals",
    },
  ]

  return (
    <main id="main" className=" px-4 md:px-28 pt-20" role="main" aria-label="Main service content">
      <a href="#service-overview" className="sr-only focus:not-sr-only focus:absolute focus:top-24 focus:left-4 focus:bg-background focus:px-3 focus:py-2 focus:rounded-md">Skip to service overview</a>
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <section className="mb-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center" aria-labelledby="service-page-title">
          <motion.header 
            ref={headingRef}
            initial={{ opacity: 0, x: -80 }}
            animate={headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-2 text-center"
          >
            <h1 id="service-page-title" className="text-4xl sm:text-5xl font-bold mb-4 text-balance bg-linear-to-r from-slate-900 via-primary to-slate-900  bg-clip-text text-transparent">{title}</h1>
            {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
            <p className="text-sm text-muted-foreground mt-4">Published <time dateTime="2026-02-13">February 13, 2026</time> · Updated <time dateTime="2026-02-13">February 13, 2026</time></p>
          </motion.header>

          <motion.figure 
            ref={imageRef}
            initial={{ opacity: 0, x: 80 }}
            animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-3 rounded-lg overflow-hidden shadow-sm"
          >
            <img src={image || "/placeholder.svg"} alt={`${title} service illustration for Lancet Software India consulting delivery`} className="w-full h-full" />
          </motion.figure>
        </section>

        <section id="service-overview" className="mb-10" aria-labelledby="industry-benchmarks-heading">
          <h2 id="industry-benchmarks-heading" className="text-2xl font-bold mb-3 text-foreground">Industry Benchmarks</h2>
          <p className="text-lg text-foreground mb-4">Industry data shows digital commerce, analytics, and AI programs continue to accelerate investment and delivery expectations.</p>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            {benchmarkLinks.map((item) => (
              <li key={item.href}>
                <a className="text-primary hover:underline" href={item.href} rel="nofollow noopener" target="_blank">{item.text}</a>
              </li>
            ))}
          </ul>
          <blockquote className="border-l-4 border-primary pl-4 mt-6 text-muted-foreground">
            <p>"The value of analytics comes from making faster, better decisions with trusted data."</p>
            <footer>— Gartner analytics leadership perspective</footer>
          </blockquote>
        </section>

        <motion.section
          ref={bodyRef}
          initial={{ opacity: 0, y: 40 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="prose prose-lg max-w-none mb-12"
          aria-label="Service detail content"
        >
          {typeof body === 'string' ? (
            // Local mode: body is a markdown string
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl font-bold mb-4 text-foreground" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-bold mt-8 mb-3 text-foreground" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-semibold mt-6 mb-2 text-foreground" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-lg text-foreground mb-4" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2 text-foreground" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-lg leading-relaxed" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-primary hover:underline" {...props} />
                ),
              }}
            >
              {body}
            </ReactMarkdown>
          ) : (
            // Tina Cloud mode: body is a TinaMarkdown rich-text object
            <div className="tina-content">
              <TinaMarkdown content={body} />
            </div>
          )}
        </motion.section>

        {relatedItems.length > 0 && (
          <RelatedServicesCarousel items={relatedItems} />
        )}

        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-muted-foreground mb-4">Interested in our services?</p>
          <button 
            onClick={() => router.push("/contact")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </button>
        </div>
        
      </div>
    </main>
  )
}
