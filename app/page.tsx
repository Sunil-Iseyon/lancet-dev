import HeroSection from "@/components/HeroSection"
import ServicesSection from "@/components/ServicesSection"
import AnimatedServicesGrid from "@/components/AnimatedServicesGrid"
import FeaturesSection from "@/components/features"
import PartnersSection from "@/components/PartnersSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import { getTestimonials, getFeatures, getServices } from "@/lib/tina"
import StatsSection from "@/components/StatsSection"
import { FAQSchema } from "@/components/StructuredData"

export default async function Home() {
  const testimonials = await getTestimonials()
  const features = await getFeatures()
  const services = await getServices()
  const faqItems = [
    {
      question: "What core services does Lancet Software India provide?",
      answer: "Lancet provides business intelligence consulting, data engineering, analytics implementation, dashboard development, and managed support services across platforms including Power BI, Tableau, and Databricks.",
    },
    {
      question: "How does Lancet ensure measurable outcomes?",
      answer: "Lancet uses delivery benchmarks, governance checkpoints, and continuous optimization cycles to track measurable business outcomes. According to internal records, over 800 BI projects have been delivered since 1997.",
    },
    {
      question: "Can Lancet support enterprise-scale deployments?",
      answer: "Yes. Lancet supports enterprise deployments with scalable architecture, security controls, and 24×7 support options across industries including BFSI, retail, and healthcare.",
    },
    {
      question: "What is business intelligence?",
      answer: "Business intelligence (BI) is the practice of transforming operational and historical data into actionable insights for decision making, typically using tools like Power BI, Tableau, and Databricks.",
    },
    {
      question: "How long has Lancet Software India been in operation?",
      answer: "Lancet Software India has been delivering business intelligence and data analytics solutions since 1997, with over 800 projects completed across multiple industries.",
    },
  ]

  return (
    <>
      <HeroSection />
      {/* <ServicesSection services={services} /> */}
      <AnimatedServicesGrid 
        services={services}
        title="Explore Our Solutions"
        subtitle="Transform your business with our cutting-edge data solutions and expert consulting services"
      />
      <FeaturesSection features={features} />
      <StatsSection/>
      <TestimonialsSection testimonials={testimonials} />
      
      <PartnersSection />
      <section className="px-4 md:px-28 py-10" aria-labelledby="home-evidence-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="home-evidence-heading" className="text-2xl font-bold mb-3">Why Data-Led Transformation Matters</h2>
          <p className="text-muted-foreground">
            According to McKinsey research, data-driven organizations are 23× more likely to acquire customers and 6× more likely to retain them (<a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey, 2024</a>).
            Global digital commerce crossed <strong>$6.4 trillion in 2025</strong>, increasing demand for reliable <abbr title="Business Intelligence">BI</abbr> and data analytics capabilities (<a className="text-primary hover:underline" href="https://www.shopify.com/blog/global-ecommerce-sales" target="_blank" rel="nofollow noopener">Shopify</a>).
            Gartner reports that organizations investing in <abbr title="Artificial Intelligence">AI</abbr>-augmented analytics typically see 25% faster time-to-insight (<a className="text-primary hover:underline" href="https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics" target="_blank" rel="nofollow noopener">Gartner</a>).
            The U.S. Bureau of Labor Statistics projects 35% growth in data science roles through 2032 (<a className="text-primary hover:underline" href="https://www.bls.gov/ooh/math/data-scientists.htm" target="_blank" rel="nofollow noopener">BLS.gov</a>).
            Last refreshed <time dateTime="2026-02-16">February 16, 2026</time>.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground" cite="https://en.wikipedia.org/wiki/W._Edwards_Deming">
            <p>&ldquo;Without data, you&rsquo;re just another person with an opinion.&rdquo;</p>
            <footer>&mdash; W. Edwards Deming, statistician and quality-management pioneer</footer>
          </blockquote>
          <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
            <p>&ldquo;The goal is to turn data into information, and information into insight.&rdquo;</p>
            <footer>&mdash; Carly Fiorina, former CEO of Hewlett-Packard</footer>
          </blockquote>
          <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
            <p>&ldquo;Data are just summaries of thousands of stories &mdash; tell a few of those stories to help make the data meaningful.&rdquo;</p>
            <footer>&mdash; Chip Heath, Stanford University professor and author</footer>
          </blockquote>
        </div>
      </section>
      <FAQSchema questions={faqItems} />
      {/* <RubiksLanding /> */}
    </>
  )
}
