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
      answer: "Lancet provides business intelligence consulting, data engineering, analytics implementation, and managed support services.",
    },
    {
      question: "How does Lancet ensure measurable outcomes?",
      answer: "Lancet uses delivery benchmarks, governance checkpoints, and continuous optimization cycles to track measurable business outcomes.",
    },
    {
      question: "Can Lancet support enterprise-scale deployments?",
      answer: "Yes. Lancet supports enterprise deployments with scalable architecture, security controls, and 24×7 support options.",
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
            Global digital commerce crossed <strong>$6.4T in 2025</strong> and enterprise AI investment continues to grow, increasing demand for reliable BI and data analytics capabilities (<a className="text-primary hover:underline" href="https://www.shopify.com/blog/global-ecommerce-sales" target="_blank" rel="nofollow noopener">Shopify</a>, <a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey</a>). Last refreshed <time dateTime="2026-02-13">February 13, 2026</time>.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
            <p>"Without data, you're just another person with an opinion."</p>
            <footer>— Widely cited data strategy principle</footer>
          </blockquote>
        </div>
      </section>
      <FAQSchema questions={faqItems} />
      {/* <RubiksLanding /> */}
    </>
  )
}
