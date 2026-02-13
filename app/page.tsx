import HeroSection from "@/components/HeroSection"
import ServicesSection from "@/components/ServicesSection"
import AnimatedServicesGrid from "@/components/AnimatedServicesGrid"
import FeaturesSection from "@/components/features"
import PartnersSection from "@/components/PartnersSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import { getTestimonials, getFeatures, getServices } from "@/lib/tina"
import StatsSection from "@/components/StatsSection"

export default async function Home() {
  const testimonials = await getTestimonials()
  const features = await getFeatures()
  const services = await getServices()

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
      {/* <RubiksLanding /> */}
    </>
  )
}
