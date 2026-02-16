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
      text: "Global eCommerce sales are projected at $6.4 trillion, increasing pressure for faster analytics-driven decisions.",
      href: "https://www.statista.com/outlook/dmo/ecommerce/worldwide",
    },
    {
      text: "Most organizations continue scaling analytics and AI investment programs for enterprise productivity.",
      href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    },
    {
      text: "AI for analytics remains a strategic enterprise priority across data and BI platforms.",
      href: "https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics",
    },
    {
      text: "Web performance and Core Web Vitals continue to influence digital conversion outcomes.",
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
            {!subtitle && <p className="text-xl text-muted-foreground">Expert {title} consulting, implementation, and support services from Lancet Software India.</p>}
            <p className="text-sm text-muted-foreground mt-2">By <a className="text-primary hover:underline" href="/about/team">Lancet Software India Team</a></p>
            <p className="text-sm text-muted-foreground mt-4">Published <time dateTime="2026-02-13">February 13, 2026</time> · Updated <time dateTime="2026-02-16">February 16, 2026</time></p>
          </motion.header>

          <motion.figure 
            ref={imageRef}
            initial={{ opacity: 0, x: 80 }}
            animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-3 rounded-lg overflow-hidden shadow-sm"
          >
            <img src={image || "/placeholder.svg"} alt={`${title} - business intelligence and data analytics consulting service illustration by Lancet Software India`} className="w-full h-full" loading="lazy" />
          </motion.figure>
        </section>

        <section id="service-overview" className="mb-10" aria-labelledby="industry-benchmarks-heading">
          <h2 id="industry-benchmarks-heading" className="text-2xl font-bold mb-3 text-foreground">Industry Benchmarks</h2>
          <p className="text-lg text-foreground mb-4">Industry data suggests that digital commerce, analytics, and <abbr title="Artificial Intelligence">AI</abbr> programs continue to grow. Investment and delivery expectations are accelerating. Consequently, delivery teams are typically expected to ship outcomes faster. Measurable governance is essential.</p>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            {benchmarkLinks.map((item) => (
              <li key={item.href}>
                <a className="text-primary hover:underline" href={item.href} rel="nofollow noopener" target="_blank">{item.text}</a>
              </li>
            ))}
          </ul>
          <blockquote className="border-l-4 border-primary pl-4 mt-6 text-muted-foreground" cite="https://en.wikipedia.org/wiki/Peter_Sondergaard">
            <p>&ldquo;Information is the oil of the 21st century, and analytics is the combustion engine.&rdquo;</p>
            <footer>&mdash; Peter Sondergaard, former Gartner Research executive vice president</footer>
          </blockquote>
          <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
            <p>&ldquo;The core advantage of data is that it tells you something about the world that you didn&rsquo;t know before.&rdquo;</p>
            <footer>&mdash; Hilary Mason, data scientist and founder of Fast Forward Labs</footer>
          </blockquote>
        </section>

        <section className="mb-12" aria-labelledby="evidence-methodology-heading">
          <h2 id="evidence-methodology-heading" className="text-2xl font-bold mb-3 text-foreground">Evidence, References, and Methodology</h2>
          <p className="text-foreground mb-4">Lancet Software India validates delivery outcomes through internal project benchmarking, post-implementation reviews, and alignment with <abbr title="National Institute of Standards and Technology">NIST</abbr> data governance guidance. Furthermore, industry-standard references are used to contextualize delivery benchmarks.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-border rounded-lg">
              <thead className="bg-muted/40">
                <tr>
                  <th className="p-3">Metric</th>
                  <th className="p-3">Observed Value</th>
                  <th className="p-3">Methodology</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-3">Delivery Success Rate</td>
                  <td className="p-3">95%</td>
                  <td className="p-3">Internal project tracking and governance reviews</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3">Enterprise BI Projects</td>
                  <td className="p-3">800+</td>
                  <td className="p-3">Historical delivery portfolio since 1997</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ol className="list-decimal pl-6 mt-4 space-y-2 text-foreground">
            <li><a className="text-primary hover:underline" href="https://www.statista.com/outlook/dmo/ecommerce/worldwide" target="_blank" rel="nofollow noopener">Statista eCommerce Outlook</a></li>
            <li><a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey State of AI</a></li>
            <li><a className="text-primary hover:underline" href="https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics" target="_blank" rel="nofollow noopener">Gartner AI for Data Analytics</a></li>
            <li><a className="text-primary hover:underline" href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="nofollow noopener">W3C WCAG 2.2</a></li>
          </ol>
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
          <p className="text-muted-foreground mb-4">Interested in our services? Additionally, you can review a structured service brief before booking a consultation.</p>
          <div className="mb-4">
            <a
              href="/llms.txt"
              className="text-primary hover:underline"
              download
            >
              Download Service Reference Brief
            </a>
          </div>
          <button 
            onClick={() => router.push("/contact")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Contact Lancet Software India
          </button>
        </div>
        
      </div>
    </main>
  )
}
