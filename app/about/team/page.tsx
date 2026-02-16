"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArticleSchema, FAQSchema } from "@/components/StructuredData"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function AboutPage() {
  const headerRef = useRef(null)
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const teamRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true })
  const missionInView = useInView(missionRef, { once: true })
  const valuesInView = useInView(valuesRef, { once: true })
  const teamInView = useInView(teamRef, { once: true })
  const pageUrl = "https://www.lancetindia.com/about/team"
  const faqItems = [
    {
      question: "What expertise does the Lancet team provide?",
      answer: "The team typically provides expertise across business intelligence, data engineering, dashboard development, and enterprise analytics consulting.",
    },
    {
      question: "Does Lancet leadership support strategic BI roadmaps?",
      answer: "Yes. Leadership and senior consultants generally support roadmap planning, governance setup, and phased enterprise rollout.",
    },
    {
      question: "How does Lancet maintain delivery quality?",
      answer: "Lancet applies structured delivery standards, peer reviews, and performance monitoring across implementations.",
    },
  ]

  return (
    <main className="min-h-screen pt-20 pb-12" role="main" aria-label="Team page content">
      <div className="mx-auto">

        {/* ================= HEADER ================= */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900  bg-clip-text text-transparent">
            Business Intelligence &amp; Data Analytics Experts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organizations with strong analytics leadership are generally more likely to improve decision quality and business agility (<a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey, 2024</a>). Consequently, the Lancet Software India team has delivered <abbr title="Business Intelligence">BI</abbr> and data programs since 2010.
          </p>
          <p className="text-sm text-muted-foreground">Published <time dateTime="2026-02-13">February 13, 2026</time> · Updated <time dateTime="2026-02-13">February 13, 2026</time></p>
        </motion.div>

        {/* ================= MISSION ================= */}
        {/* Company Overview */}
        <motion.div
          ref={missionRef}
          initial={{ opacity: 0, y: 60 }}
          animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-12 items-center mt-12  px-4 md:px-28"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Lancet Software India believes that data is the foundation of modern business success. The mission is to empower organizations
              of all sizes with business intelligence solutions. These solutions transform raw data into strategic
              advantages. Data quality and governance are central to this mission (<a className="text-primary hover:underline" href="https://www.nist.gov/publications/data-quality-foundations-ai-and-analytics" target="_blank" rel="nofollow noopener">NIST guidance</a>).
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since inception in 2010, the team has been dedicated to helping businesses make smarter decisions.
              This includes advanced analytics, predictive modeling, and comprehensive data visualization.
            </p>
          </div>
          <div className="relative bg-linear-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 overflow-hidden group">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary/30 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-yellow-500/30 rounded-bl-3xl"></div>

            <div className="relative space-y-6">
  <div className="text-center pb-4">
    <h3 className="text-2xl font-bold bg-linear-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
      Why Choose Lancet?
    </h3>
  </div>

  <div className="space-y-4">
    {/* Item 1 – Sky */}
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300 group/item">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">Industry-Leading Expertise</h4>
        <p className="text-xs text-muted-foreground">Certified professionals in top BI platforms</p>
      </div>
    </div>

    {/* Item 2 – Yellow */}
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-yellow-500/50 transition-all duration-300 group/item">
      <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-yellow-500/20 transition-colors">
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">Rapid Implementation</h4>
        <p className="text-xs text-muted-foreground">Go live faster with our proven methodologies</p>
      </div>
    </div>

    {/* Item 3 – Sky */}
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300 group/item">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">24/7 Support</h4>
        <p className="text-xs text-muted-foreground">Round-the-clock assistance when you need it</p>
      </div>
    </div>

    {/* Item 4 – Yellow */}
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-yellow-500/50 transition-all duration-300 group/item">
      <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-yellow-500/20 transition-colors">
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">Enterprise Security</h4>
        <p className="text-xs text-muted-foreground">Bank-level encryption and data protection</p>
      </div>
    </div>
  </div>
</div>

          </div>
        </motion.div>
        <div className="px-4 md:px-28 mt-8">
          <blockquote className="border-l-4 border-primary pl-4 text-muted-foreground" cite="https://hbr.org/2020/02/use-data-to-accelerate-your-business-strategy">
            <p>&ldquo;High-quality analytics programs combine domain expertise, governance, and continuous optimization.&rdquo;</p>
            <footer>&mdash; Harvard Business Review, analytics leadership perspective</footer>
          </blockquote>
        </div>
        <motion.section
          ref={valuesRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={fadeUp}
          className="mt-16 px-4 md:px-28 space-y-8"
        >
          <h2 className="text-3xl font-bold">Our Core Values</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Innovation",
                description:
                  "The Lancet team constantly pushes the boundaries of what\u2019s possible in BI technology, applying emerging tools and methods to enterprise analytics.",
              },
              {
                title: "Integrity",
                description:
                  "Lancet Software India builds trust through transparent communication, reliable solutions, and adherence to data governance standards.",
              },
              {
                title: "Excellence",
                description:
                  "Lancet delivers exceptional results that typically exceed client expectations, backed by 800+ project delivery records.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl border bg-card hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.section>


        {/* ================= TEAM ================= */}
        <motion.section
          ref={teamRef}
          variants={fadeUp}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          className="mt-20 px-4"
        >
          
          <div className="relative mt-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-6 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">


            {/* Team Member 1 */}
            <div className="text-center group relative z-10">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="/chandan.png"
                  alt="Chandan Pandey, Managing Director and Co-Founder of Lancet Software India"
                  className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl mx-auto shadow-lg ring-4 ring-white dark:ring-slate-800 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 group-hover:border-primary/50 transition-all duration-300">
                <h3 className="text-xl font-bold mb-1 bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Chandan Pandey
                </h3>
                <p className="text-primary text-sm font-semibold mb-2">Managing Director</p>
              </div>
            </div>

            {/* Center Text */}
            <div className="text-center relative z-10 flex flex-col items-center w-full md:w-auto">
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
                {/* Upper section - centered */}
                <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 flex flex-col items-center">
                  <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 rounded-full">
                    <span className="text-xs md:text-sm font-semibold text-primary">Leadership Team</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
                    Our Team
                  </h2>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>

                {/* Bottom section - text aligned */}
                <div className="px-6 md:px-8 pt-4 md:pt-6 pb-6 md:pb-8">
                  <p className="text-base text-muted-foreground leading-relaxed text-left">
                    The diverse team of data scientists, engineers, and consultants brings decades of combined experience
                    in business intelligence, data analytics, and enterprise software solutions. The Lancet team is passionate about
                    helping clients succeed.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="text-center group relative z-10">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="/tom.jpg"
                  alt="Thomas Niccum, President and CEO of Lancet Software India"
                  className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl mx-auto shadow-lg ring-4 ring-white dark:ring-slate-800 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 group-hover:border-primary/50 transition-all duration-300">
                <h3 className="text-xl font-bold mb-1 bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Thomas Niccum
                </h3>
                <p className="text-primary text-sm font-semibold mb-2">President and CEO</p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
      <ArticleSchema
        headline="Team: Business Intelligence & Data Analytics Experts at Lancet Software India"
        description="Meet the leadership and consulting experts delivering BI, analytics, and enterprise data solutions at Lancet Software India."
        datePublished="2026-02-13"
        dateModified="2026-02-16"
        author="Thomas Niccum"
        authorUrl="https://www.lancetindia.com/about/team"
        authorSameAs={["https://www.linkedin.com/company/lancet-software-india-pvt-ltd"]}
        url={pageUrl}
      />
      <FAQSchema questions={faqItems} />
    </main>
  )
}
