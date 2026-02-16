"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Mail, Phone, MapPin, Send, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import {
  createAnimationContext,
  heroAnimation as animateHero,
  fadeInLeft,
  fadeInRight,
  fadeInUp
} from "@/lib/animations"
import Image from "next/image"
import { ArticleSchema, FAQSchema } from "@/components/StructuredData"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState("")

  const contactInfo = {
    email: process.env.NEXT_PUBLIC_EMAIL || "infoindia@lancetindia.com",
    headOfficeLandline: process.env.NEXT_PUBLIC_HEAD_OFFICE_LANDLINE || "+91 80-68785101",
    headOfficePhone: process.env.NEXT_PUBLIC_HEAD_OFFICE_PHONE || "+91 9741277911",
    branchPhone1: process.env.NEXT_PUBLIC_BRANCH_OFFICE_PHONE_1 || "+91 79782 75945",
    branchPhone2: process.env.NEXT_PUBLIC_BRANCH_OFFICE_PHONE_2 || "+91 6360551763"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setSubmittedEmail(formData.email)
      setSubmitted(true)
      setFormData({ name: "", email: "", company: "", message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBackToForm = () => {
    setSubmitted(false)
    setError("")
  }

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const mapRef = useRef(null)
  const pageUrl = "https://www.lancetindia.com/contact"

  const faqItems = [
    {
      question: "How quickly does Lancet respond to contact requests?",
      answer: "Lancet reviews contact requests promptly and shares next-step guidance after initial assessment.",
    },
    {
      question: "Can we discuss BI and data analytics projects before formal onboarding?",
      answer: "Yes. The team can run a discovery discussion to align goals, scope, and technical constraints before project kickoff.",
    },
    {
      question: "Do you support remote and onsite engagement models?",
      answer: "Yes. Lancet supports remote, hybrid, and onsite engagement modes based on project and client requirements.",
    },
  ]

  useEffect(() => {
    const ctx = createAnimationContext(() => {
      // Hero animation - immediate on load
      animateHero(heroRef.current, { duration: 1.2, offset: 80 })

      // Form animation - slide from left (once only)
      fadeInLeft(formRef.current, { duration: 1, offset: 80, retriggerable: false })

      // Info animation - slide from right (once only)
      fadeInRight(infoRef.current, { duration: 1, offset: 80, retriggerable: false })

      // Map animation - fade up (once only)
      fadeInUp(mapRef.current, { duration: 1, offset: 60, retriggerable: false })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-24 focus:left-4 focus:bg-background focus:px-3 focus:py-2 focus:rounded-md">Skip to contact content</a>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center px-4 md:px-28 py-20 overflow-hidden"
        role="banner"
      >
        <Image src="/lancetBg.webp" width={1920} height={1080} alt="Lancet Software India office background image for contact and consulting enquiries" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0  z-10" />
        <div className="mx-auto text-center relative z-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Contact Our Business Intelligence &amp; Data Analytics Team</h1>
          <p className="text-xl text-white/90">
            Organizations with strong data governance and analytics programs deliver faster decisions across business units (<a className="underline" href="https://www.mckinsey.com/capabilities/operations/our-insights/the-data-driven-enterprise-of-2025" target="_blank" rel="nofollow noopener">McKinsey</a>).
          </p>
          <p className="text-xl text-white/90 ">Send us a message and Lancet Software India will respond as soon as possible.</p>
          <p className="text-sm text-white/80 mt-2">Published <time dateTime="2026-02-13">February 13, 2026</time> · Updated <time dateTime="2026-02-13">February 13, 2026</time></p>
        </div>
      </section>

      {/* Contact Content */}
      <section id="main" className="py-20 px-4 md:px-28" role="main" aria-label="Contact content">
        <div className="mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="relative p-8 md:p-10 rounded-2xl border border-green-500/30 bg-linear-to-br from-green-500/10 to-green-600/10 text-center">

                  {/* Success Icon */}
                  <div className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                    <div className="relative z-10 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Message Sent Successfully
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Thanks for reaching out! We’ve received your message and will respond within 24 hours.
                  </p>

                  {/* Email Confirmation */}
                  <div className="flex items-center justify-center gap-2 text-sm text-foreground/60 mb-6">
                    <Mail className="w-4 h-4" />
                    <span>A confirmation email has been sent to <strong>{submittedEmail}</strong></span>
                  </div>

                  {/* Action */}
                  <button
                    onClick={handleBackToForm}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <ArrowLeft size={16} />
                    Send another message
                  </button>
                </div>

              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg space-y-2">
                      <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                      <p className="text-sm text-foreground/70">
                        Or email us directly at{" "}
                        <a 
                          href={`mailto:${contactInfo.email}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {contactInfo.email}
                        </a>
                      </p>
                    </div>
                  )}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:border-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-semibold mb-2">Company</label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin text-primary-foreground"
                        />
                        <span>Sending...</span>
                      </>

                    ) : (
                      <>
                        Send Message
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div ref={infoRef}>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/20 border border-primary rounded-lg flex items-center justify-center text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-foreground/70 hover:text-primary hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/20 border border-primary rounded-lg flex items-center justify-center text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-foreground/70">{contactInfo.headOfficeLandline}</p>
                      <p className="text-foreground/70">{contactInfo.headOfficePhone}</p>
                      <p className="text-foreground/70">{contactInfo.branchPhone1}</p>
                      <p className="text-foreground/70">{contactInfo.branchPhone2}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/20 border border-primary rounded-lg flex items-center justify-center text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Address</h3>
                    <h4 className="font-bold ">Head Office</h4>
                    <p className="text-foreground/70">The Empyrean, No 517, Phase II, Anchemuskur Village,
                      Chikkathirupathi Post, Malur Taluk, Karnataka 563 130</p>
                      <h4 className="font-bold ">Branch Office</h4>
                    <p className="text-foreground/70">1st Floor, DM-12, DL Chowk, Basanti Nagar,
                      Rourkela, Sundargarh, Odisha 769012</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-12 p-6 bg-linear-to-br from-secondary/10 to-primary/10 rounded-xl border border-secondary/20">
                <p>
                  If you are applying for a career opportunity, Select career as a subject, attach your resume in PDF,
                  DOC or XLS format and mention in your message which position you are looking for. A list of available
                  opportunities is listed in the
                  <Link href="/about/careers" className="text-primary">
                    {" "}
                    careers page
                  </Link>
                  .
                </p>
                <blockquote className="border-l-4 border-primary pl-4 mt-4 text-sm text-foreground/80" cite="https://en.wikipedia.org/wiki/Carly_Fiorina">
                  <p>&ldquo;The goal is to turn data into information, and information into insight.&rdquo;</p>
                  <footer>&mdash; Carly Fiorina, former CEO of Hewlett-Packard</footer>
                </blockquote>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-3">Engagement Response Benchmarks</h2>
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
                  <td className="p-3">Initial response target</td>
                  <td className="p-3">Prompt review after form submission</td>
                  <td className="p-3">Contact form ticket timestamp audit</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3">Discovery turnaround window</td>
                  <td className="p-3">Scheduled based on project scope and availability</td>
                  <td className="p-3">Pre-sales planning and meeting workflow records</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3">Supported engagement models</td>
                  <td className="p-3">Remote, Hybrid, Onsite</td>
                  <td className="p-3">Delivery governance model documentation</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-3">Methodology: Our analysis uses internal pre-sales and project onboarding records from Lancet Software India delivery operations.</p>
            <p className="text-sm mt-2 text-muted-foreground">References: <a className="text-primary hover:underline" href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="nofollow noopener">W3C WCAG 2.2</a>, <a className="text-primary hover:underline" href="https://www.iso.org/standard/27001" target="_blank" rel="nofollow noopener">ISO/IEC 27001</a>, <a className="text-primary hover:underline" href="https://www.reuters.com/technology/" target="_blank" rel="nofollow noopener">Reuters Technology</a>.</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-12 px-4 md:px-28 bg-linear-to-b from-background to-secondary/5">
        <div className="mx-auto">
          <div className="h-120 bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/20 overflow-hidden">
            <img src="/LancetIndia-Map2 (1).png" alt="Map showing Lancet Software India head office and branch office locations" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <ArticleSchema
        headline="Contact Lancet Software India for Business Intelligence and Data Analytics Services"
        description="Contact Lancet Software India to discuss business intelligence, analytics, and data engineering requirements with our consulting team."
        datePublished="2026-02-13"
        dateModified="2026-02-16"
        author="Thomas Niccum"
        authorUrl="https://www.lancetindia.com/about/team"
        authorSameAs={["https://www.linkedin.com/company/lancet-software-india-pvt-ltd"]}
        url={pageUrl}
      />

      <FAQSchema questions={faqItems} />
    </>
  )
}
