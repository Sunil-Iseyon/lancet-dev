"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { Briefcase, Users, TrendingUp, Heart, Lightbulb, Globe, GraduationCap, Award } from "lucide-react"
import client from "@/tina/__generated__/client"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import ApplicationForm from "@/components/ApplicationForm"
import BreadcrumbSchema from "@/components/StructuredData"
import { ArticleSchema, FAQSchema } from "@/components/StructuredData"

type JobOpening = {
  id: string
  title: string
  location: string
  type: string
  description: any
  requirements: string[]
}

export default function CareerPage() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([])
  const [isLoadingJobs, setIsLoadingJobs] = useState(true)
  const heroRef = useRef(null)
  const whyUsRef = useRef(null)
  const openingsRef = useRef(null)
  const cultureRef = useRef(null)
  const applicationRef = useRef(null)
  const pageUrl = "https://www.lancetindia.com/about/careers"

  // Handle smooth scroll to anchor
  const handleAnchorClick = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navbarHeight = 80 // Approximate navbar height
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Fetch job openings from Tina CMS
  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const response = await client.queries.jobOpeningConnection()
        const jobs =
          response.data.jobOpeningConnection.edges?.map((edge) => ({
            id: edge?.node?.id || "",
            title: edge?.node?.title || "",
            location: edge?.node?.location || "",
            type: edge?.node?.type || "",
            description: edge?.node?.description || "",
            requirements: edge?.node?.requirements || [],
          })) || []
        setJobOpenings(jobs)
      } catch (error) {
        console.error("Error fetching job openings:", error)
        setJobOpenings([])
      } finally {
        setIsLoadingJobs(false)
      }
    }

    fetchJobOpenings()
  }, [])

  // Immediate animations for hero and why us sections
  useEffect(() => {
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // Hero animation - immediate
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          {
            y: isMobile ? 40 : 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.8 : 1.2,
            ease: "power3.out",
            clearProps: "all"
          },
        )
      }

      // Why Us section - immediate with slight delay
      if (whyUsRef.current) {
        gsap.fromTo(
          whyUsRef.current,
          {
            y: isMobile ? 40 : 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.8 : 1.2,
            ease: "power3.out",
            delay: isMobile ? 0 : 0.2,
            clearProps: "all"
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  // Data-dependent animations for job listings, culture, and application sections
  useEffect(() => {
    if (isLoadingJobs) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {

      // Job openings section
      if (jobOpenings.length > 0 && openingsRef.current) {
        gsap.fromTo(
          openingsRef.current,
          {
            y: isMobile ? 40 : 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.8 : 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: openingsRef.current,
              start: isMobile ? "top 90%" : "top 80%",
              toggleActions: "play none none none",
            },
            clearProps: "all"
          },
        )

        // Job cards with stagger on scroll
        const jobCards = gsap.utils.toArray(".job-card")
        if (jobCards.length > 0) {
          jobCards.forEach((card: any) => {
            gsap.fromTo(
              card,
              {
                y: isMobile ? 20 : 30,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: isMobile ? 0.6 : 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 95%",
                  toggleActions: "play none none none",
                },
                clearProps: "all"
              },
            )
          })
        }
      }

      // Culture section
      if (cultureRef.current) {
        gsap.fromTo(
          cultureRef.current,
          {
            y: isMobile ? 40 : 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.8 : 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cultureRef.current,
              start: isMobile ? "top 90%" : "top 80%",
              toggleActions: "play none none none",
            },
            clearProps: "all"
          },
        )

        // Culture cards with stagger
        const cultureCards = gsap.utils.toArray(".culture-card")
        if (cultureCards.length > 0) {
          cultureCards.forEach((card: any, index: number) => {
            gsap.fromTo(
              card,
              {
                y: isMobile ? 30 : 50,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: isMobile ? 0 : index * 0.15,
                scrollTrigger: {
                  trigger: cultureRef.current,
                  start: isMobile ? "top 85%" : "top 70%",
                  toggleActions: "play none none none",
                },
                clearProps: "all"
              },
            )
          })
        }

        // Stats cards with stagger
        const statsCards = gsap.utils.toArray(".stats-card")
        if (statsCards.length > 0) {
          statsCards.forEach((card: any, index: number) => {
            gsap.fromTo(
              card,
              {
                y: isMobile ? 20 : 30,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: isMobile ? 0 : index * 0.1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
                clearProps: "all"
              },
            )
          })
        }
      }

      // Application section
      if (applicationRef.current) {
        gsap.fromTo(
          applicationRef.current,
          {
            y: isMobile ? 40 : 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.8 : 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: applicationRef.current,
              start: isMobile ? "top 90%" : "top 80%",
              toggleActions: "play none none none",
            },
            clearProps: "all"
          },
        )
      }
    })

    // Initial ScrollTrigger refresh to catch elements already in viewport
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [isLoadingJobs, jobOpenings.length])

  const faqItems = [
    {
      question: "What types of roles does Lancet Software India hire for?",
      answer: "Lancet hires for business intelligence, data engineering, analytics consulting, and support operations across multiple delivery models.",
    },
    {
      question: "Does Lancet support continuous learning and certifications?",
      answer: "Yes. Lancet provides structured training, project-based mentoring, and certification-oriented development plans.",
    },
    {
      question: "How quickly does the hiring process move?",
      answer: "Most candidates receive an update within a few business days after application review and initial screening.",
    },
  ]

  return (
    <main id="main" className="min-h-screen pt-20 pb-12" role="main" aria-label="Careers page content">
      <a href="#careers-overview" className="sr-only focus:not-sr-only focus:absolute focus:top-24 focus:left-4 focus:bg-background focus:px-3 focus:py-2 focus:rounded-md">Skip to careers overview</a>
      <div className="mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="text-center space-y-6 px-4 md:px-28" style={{ opacity: 0 }} aria-labelledby="careers-overview">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-semibold text-primary">Join Our Team</span>
          </div>
          {/* Main H1 heading for the careers page */}
            <h1 id="careers-overview" className="text-5xl md:text-6xl  font-bold  mb-2 text-center bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
        Build Your Career in Business Intelligence & Data Analytics with Lancet Software India
      </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            India's analytics talent demand has expanded rapidly in recent years, making high-quality BI and data engineering skills a strategic career path (<a className="text-primary hover:underline" href="https://www.statista.com/outlook/tmo/software/enterprise-software/business-intelligence-software/india" target="_blank" rel="nofollow noopener">Statista market outlook</a>). Lancet Software India builds careers through real client delivery in business intelligence and data analytics.
          </p>
          <p className="text-sm text-muted-foreground">Published <time dateTime="2026-02-13">February 13, 2026</time> · Updated <time dateTime="2026-02-13">February 13, 2026</time></p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button
              onClick={(e) => handleAnchorClick( "openings")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              View Open Positions
            </button>
            <button
              onClick={(e) => handleAnchorClick( "culture")}
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Our Culture
            </button>
          </div>
        </section>

        {/* Why Work With Us */}
        <section ref={whyUsRef} className="mt-20 px-4 md:px-28" style={{ opacity: 0 }} aria-labelledby="why-choose-lancet">
          <div className="text-center space-y-4 mb-12">
            <h2 id="why-choose-lancet" className="text-3xl md:text-4xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
              Why Choose Lancet?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lancet Software India combines mentoring, enterprise delivery, and measurable growth opportunities for analytics professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 bg-linear-to-br from-primary/5 to-accent/5 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                  <p className="text-muted-foreground">
                    Lancet Software India invests in professional development through training programs, certifications, and clear progression paths. The global analytics and BI market is projected to continue growing through 2026 (<a className="text-primary hover:underline" href="https://www.mordorintelligence.com/industry-reports/global-business-intelligence-bi-vendors-market-industry" target="_blank" rel="nofollow noopener">Mordor Intelligence</a>).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Collaborative Environment</h3>
                  <p className="text-muted-foreground">
                    Lancet Software India teams work in a collaborative environment that values teamwork, peer learning, and innovation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-linear-to-br from-accent/5 to-primary/5 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cutting-Edge Projects</h3>
                  <p className="text-muted-foreground">
                    Lancet Software India delivers projects across modern BI and data engineering platforms. Industry analysts continue to rank modern analytics platforms as mission-critical enterprise technology (<a className="text-primary hover:underline" href="https://www.gartner.com/en/documents/6576602" target="_blank" rel="nofollow noopener">Gartner analytics coverage</a>).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
                  <p className="text-muted-foreground">
                    Lancet Software India supports healthy work-life balance with flexible work arrangements and structured time-off policies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <blockquote className="border-l-4 border-primary pl-4 mt-8 text-muted-foreground">
            <p>"Information is the oil of the 21st century, and analytics is the combustion engine."</p>
            <footer>— Widely cited analytics leadership perspective</footer>
          </blockquote>
        </section>

        {/* Open Positions */}
        {!isLoadingJobs && jobOpenings.length > 0 && (
          <div ref={openingsRef} id="openings" className="mt-20 px-4 md:px-28" style={{ opacity: 0 }}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
                Current Openings
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore opportunities to join our growing team
              </p>
            </div>

            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div
                  key={job.id}
                  className="job-card p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                            <span>📍 {job.location}</span>
                            <span>•</span>
                            <span>⏰ {job.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-muted-foreground mb-4">
                        <TinaMarkdown content={job.description} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Key Requirements:</p>
                        <ul className="space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="md:ml-4">
                      <button
                        onClick={() => handleAnchorClick( "apply")}
                        className="block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all text-center whitespace-nowrap cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-xl text-center">
              <p className="text-muted-foreground">
                Don't see a perfect fit?{" "}
                <button
                  onClick={() => handleAnchorClick("apply")}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Send us your resume
                </button>{" "}
                and we'll keep you in mind for future opportunities!
              </p>
            </div>
          </div>
        )}

        {/* Culture */}
        <section ref={cultureRef} id="culture" className="mt-20 px-4 md:px-28" style={{ opacity: 0 }}>
          <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
              Our Culture
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lancet Software India fosters an environment where innovation thrives and everyone can do their best work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="culture-card group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <div className="mb-4 inline-flex p-4 bg-linear-to-br from-blue-500/10 to-blue-600/10 rounded-xl group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation First</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Lancet Software India encourages experimentation and creative problem-solving. Team ideas directly influence delivery practices.
              </p>
            </div>

            <div
              className="culture-card group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary transition-all duration-300 "
              style={{ opacity: 0 }}
            >
              <div className="mb-4 inline-flex p-4 bg-linear-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl group-hover:from-yellow-500/20 group-hover:to-yellow-600/20 transition-all">
                <Globe className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diversity & Inclusion</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Lancet Software India values diverse perspectives and maintains an inclusive workplace where everyone belongs.
              </p>
            </div>

            <div
              className="culture-card group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <div className="mb-4 inline-flex p-4 bg-linear-to-br from-green-500/10 to-green-600/10 rounded-xl group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Lancet Software India teams stay current through training, mentorship, and practical exposure to modern analytics tools.
              </p>
            </div>

            <div
              className="culture-card group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary transition-all duration-300 hover:-translate-y-2"
              style={{ opacity: 0 }}
            >
              <div className="mb-4 inline-flex p-4 bg-linear-to-br from-orange-500/10 to-orange-600/10 rounded-xl group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Impact & Recognition</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your work directly impacts clients and is recognized and rewarded accordingly.
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div
              className="stats-card bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
            <div
              className="stats-card bg-linear-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 text-center"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">800+</div>
              <p className="text-sm text-muted-foreground">BI Projects</p>
            </div>
            <div
              className="stats-card bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-sm text-muted-foreground">Employee Satisfaction</p>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            <h3 className="text-xl font-bold mb-3">Careers Data Snapshot</h3>
            <table className="w-full text-left border border-border rounded-lg">
              <thead className="bg-muted/40">
                <tr>
                  <th className="p-3">Metric</th>
                  <th className="p-3">Value</th>
                  <th className="p-3">Methodology</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-3">Team Members</td>
                  <td className="p-3">50+</td>
                  <td className="p-3">Internal HR records, Q1 2026</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3">BI Projects</td>
                  <td className="p-3">800+</td>
                  <td className="p-3">Project delivery tracking since 1997</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3">Employee Satisfaction</td>
                  <td className="p-3">95%</td>
                  <td className="p-3">Internal employee feedback review</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-3">Methodology: Proprietary internal data from Lancet Software India HR and delivery systems.</p>
          </div>
        </section>

        {/* Application Form */}
        {!isLoadingJobs && jobOpenings.length > 0 && (
          <div ref={applicationRef} id="apply" className="mt-20 px-4 md:px-28" style={{ opacity: 0 }}>
            <ApplicationForm jobOpenings={jobOpenings} />
          </div>
        )}
      </div>

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Careers', url: '/about/careers' }
      ]} />

      <ArticleSchema
        headline="Build Your Career in Business Intelligence & Data Analytics with Lancet Software India"
        description="Build careers in Business Intelligence and Data Analytics at Lancet Software India with enterprise projects, structured learning, and long-term growth opportunities."
        datePublished="2026-02-13"
        dateModified="2026-02-13"
        author="Lancet Software India"
        url={pageUrl}
      />

      <FAQSchema questions={faqItems} />
    </main>
  )
}
