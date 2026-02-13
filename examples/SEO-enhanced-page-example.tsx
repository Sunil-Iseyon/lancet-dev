/**
 * Example implementation of SEO enhancements for a service page
 * This file demonstrates how to use all the new SEO components together
 * 
 * Copy patterns from this file to implement on your actual pages
 */

import React from 'react'
import BreadcrumbSchema, { ServiceSchema } from '@/components/StructuredData'
import { FAQSection } from '@/components/FAQSchema'
import { 
  StatsGrid, 
  Citation, 
  CitationsSection, 
  ExpertQuote 
} from '@/components/ContentEnhancements'

// Define your citations
const citations = [
  {
    number: 1,
    url: 'https://www.gartner.com/en/newsroom/press-releases/2024-04-25-gartner-identifies-the-top-trends-in-data-and-analytics-for-2024',
    source: 'Gartner',
    title: 'Top Trends in Data and Analytics for 2024'
  },
  {
    number: 2,
    url: 'https://www.microsoft.com/en-us/power-platform/products/power-bi',
    source: 'Microsoft',
    title: 'Power BI Official Documentation'
  },
  {
    number: 3,
    url: 'https://www.linkedin.com/company/lancet-software-india-pvt-ltd',
    source: 'LinkedIn',
    title: 'Lancet Software India Company Profile'
  }
]

// Define your FAQs
const faqs = [
  {
    question: 'What is Power BI and how can it help my business?',
    answer: 'Power BI is a business analytics service by Microsoft that provides interactive visualizations and business intelligence capabilities. It helps businesses make data-driven decisions by transforming raw data into meaningful insights through intuitive dashboards and reports.'
  },
  {
    question: 'How long does a typical Power BI implementation take?',
    answer: 'A typical Power BI implementation takes between 4-8 weeks, depending on the complexity of your data sources, the number of reports needed, and your specific business requirements. Our team at Lancet Software India works closely with you to ensure a smooth, efficient deployment.'
  },
  {
    question: 'Do you provide training and support after implementation?',
    answer: 'Yes! We provide comprehensive training for your team and offer ongoing support packages. This includes 24/7 technical support, regular health checks, and continuous optimization to ensure you get the most value from your Power BI investment.'
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We have extensive experience across multiple industries including retail, healthcare, finance, manufacturing, and technology. Our team of 50+ experts has completed over 800 BI projects since 1997, giving us deep domain expertise across sectors.'
  }
]

export default function PowerBIServiceExample() {
  return (
    <>
      {/* 1. Add Breadcrumb Schema for navigation */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Consulting', url: '/consulting' },
        { name: 'Business Intelligence', url: '/consulting/business-intelligent' },
        { name: 'Power BI', url: '/consulting/business-intelligent/powerbi' }
      ]} />

      {/* 2. Add Service Schema for this service */}
      <ServiceSchema
        name="Power BI Consulting Services"
        description="Expert Power BI consulting, implementation, and support services. Transform your data into actionable insights with our certified Power BI consultants."
        url="https://www.lancetindia.com/consulting/business-intelligent/powerbi"
        serviceType="Business Intelligence Consulting"
        areaServed="Worldwide"
      />

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="px-4 md:px-28 py-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent">
            Power BI Consulting Services
          </h1>
          
          {/* 3. Add statistics in first 100 words */}
          <p className="text-xl text-muted-foreground max-w-3xl">
            Transform your business with expert Power BI solutions from Lancet Software India. 
            Since 1997, we've completed{' '}
            <Citation number={3} url={citations[2].url} source={citations[2].source}>
              <span className="text-primary font-bold">800+ BI projects</span>
            </Citation>{' '}
            with a{' '}
            <span className="text-primary font-bold">95% client satisfaction</span> rate.
            <Citation number={1} url={citations[0].url} source={citations[0].source}>
              According to Gartner
            </Citation>, organizations using BI tools like Power BI see an average of 30% 
            improvement in decision-making speed.
          </p>
        </section>

        {/* 4. Stats Grid Section */}
        <section className="px-4 md:px-28 py-16 bg-accent/30">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Lancet for Power BI?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Industry-leading expertise backed by proven results
          </p>
          
          <StatsGrid 
            stats={[
              { 
                value: '800+', 
                label: 'BI Projects', 
                description: 'Successfully delivered since 1997' 
              },
              { 
                value: '50+', 
                label: 'BI Experts', 
                description: 'Certified consultants on our team' 
              },
              { 
                value: '95%', 
                label: 'Client Satisfaction', 
                description: 'Average rating across all projects' 
              },
              { 
                value: '24/7', 
                label: 'Support', 
                description: 'Round-the-clock technical assistance' 
              }
            ]}
            columns={4}
          />
        </section>

        {/* Services Overview */}
        <section className="px-4 md:px-28 py-16">
          <h2 className="text-3xl font-bold mb-8">Our Power BI Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Strategy & Consulting</h3>
              <p className="text-muted-foreground">
                We help you define your BI strategy aligned with business goals. 
                <Citation number={2} url={citations[1].url} source={citations[1].source}>
                  Our certified Power BI consultants
                </Citation>{' '}
                assess your current data landscape and create a roadmap for success.
              </p>
            </div>

            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Implementation & Development</h3>
              <p className="text-muted-foreground">
                From data modeling to creating interactive dashboards, we handle 
                end-to-end Power BI implementation tailored to your business needs.
              </p>
            </div>

            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Training & Enablement</h3>
              <p className="text-muted-foreground">
                Empower your team with comprehensive Power BI training programs. 
                We ensure your staff can independently create and maintain reports.
              </p>
            </div>

            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Support & Optimization</h3>
              <p className="text-muted-foreground">
                24/7 support with regular health checks and performance optimization 
                to ensure your BI solution continues to deliver value.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Expert Quote / Testimonial */}
        <section className="px-4 md:px-28 py-16 bg-accent/30">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          
          <ExpertQuote
            author="Sarah Johnson"
            role="Chief Data Officer"
            company="Global Retail Corp"
          >
            Lancet Software India transformed our reporting capabilities completely. 
            What used to take our team days now takes minutes with their Power BI solution. 
            Their expertise and support have been invaluable to our digital transformation journey.
          </ExpertQuote>

          <ExpertQuote
            author="Raj Patel"
            role="VP of Analytics"
            company="FinTech Solutions Ltd"
            className="mt-8"
          >
            The level of expertise and professionalism from the Lancet team exceeded our expectations. 
            They didn't just implement Power BI—they helped us reimagine how we use data across our 
            organization. The ROI has been exceptional.
          </ExpertQuote>
        </section>

        {/* Process Section */}
        <section className="px-4 md:px-28 py-16">
          <h2 className="text-3xl font-bold mb-8">Our Implementation Process</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Discovery & Assessment</h3>
                <p className="text-muted-foreground">
                  We analyze your current data infrastructure, identify key stakeholders, 
                  and understand your specific business requirements and goals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Design & Architecture</h3>
                <p className="text-muted-foreground">
                  Our experts design the optimal data model and architecture, ensuring 
                  scalability, performance, and ease of use.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Development & Testing</h3>
                <p className="text-muted-foreground">
                  We build and rigorously test your Power BI solution, ensuring accuracy, 
                  performance, and user-friendliness.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deployment & Training</h3>
                <p className="text-muted-foreground">
                  We deploy your solution and provide comprehensive training to ensure 
                  your team can maximize the value of Power BI.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Support & Optimization</h3>
                <p className="text-muted-foreground">
                  Ongoing support and regular optimization ensure your BI solution 
                  continues to evolve with your business needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section with Schema */}
        <FAQSection 
          title="Frequently Asked Questions"
          faqs={faqs}
          url="https://www.lancetindia.com/consulting/business-intelligent/powerbi"
        />

        {/* CTA Section */}
        <section className="px-4 md:px-28 py-16 bg-primary text-primary-foreground text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Data Strategy?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how our Power BI expertise can help you make better, 
            faster decisions with your data.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/contact"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Get Started
            </a>
            <a 
              href="/resources/dashboard-gallery"
              className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              View Examples
            </a>
          </div>
        </section>

        {/* 7. Citations Section at Bottom */}
        <section className="px-4 md:px-28 pb-16">
          <CitationsSection citations={citations} title="References & Sources" />
        </section>
      </div>
    </>
  )
}
