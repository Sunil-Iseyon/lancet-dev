import { getPage } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BreadcrumbSchema, { FAQSchema, ServiceSchema } from "@/components/StructuredData"

const pageUrl = "https://www.lancetindia.com/services/shopify"
const publishedDate = "2026-02-13"

export const metadata: Metadata = {
  title: 'Shopify Solutions: Custom Development & Integrations | Lancet Software India',
  description: 'Shopify business intelligence and e-commerce solutions from Lancet Software India. Custom development, integrations, performance optimization, and managed support.',
  openGraph: {
    title: 'Shopify Solutions: Custom Development & Integrations',
    description: 'Shopify business intelligence and e-commerce solutions with custom development and integrations.',
    url: 'https://www.lancetindia.com/services/shopify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Solutions: Custom Development & Integrations',
    description: 'Shopify business intelligence and e-commerce solutions with custom development and integrations.',
  },
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      'x-default': pageUrl,
    },
  },
  other: {
    'DC.title': 'Shopify Solutions by Lancet Software India',
    'DC.description': 'Professional Shopify development and consulting services',
    'DC.creator': 'Lancet Software India',
  },
}

export default async function ShopifyPage() {
  const pageData = await getPage("shopify")
  
  if (!pageData) {
    notFound()
  }

  const faqItems = [
    {
      question: "How long does a Shopify implementation usually take?",
      answer: "Typical projects take 4 to 10 weeks depending on integrations, custom app requirements, and migration complexity.",
    },
    {
      question: "Can Lancet integrate Shopify with ERP and CRM systems?",
      answer: "Yes. We integrate Shopify with ERP, CRM, payment gateways, shipping tools, and analytics platforms for near real-time operations.",
    },
    {
      question: "Do you provide ongoing Shopify support after launch?",
      answer: "Yes. We provide managed support, performance monitoring, security updates, and feature enhancements after go-live.",
    },
  ]

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Shopify Solutions', url: '/services/shopify' }
      ]} />

      {/* Service Schema */}
      <ServiceSchema
        name="Shopify E-commerce Solutions"
        description="Expert Shopify development, customization, and consulting services. Transform your e-commerce with custom themes, apps, and integrations."
        url={pageUrl}
        serviceType="E-commerce Development"
        areaServed="Worldwide"
        inLanguage="en"
        datePublished={publishedDate}
        dateModified={publishedDate}
        author={{
          name: "Lancet Software India",
          url: "https://www.lancetindia.com/about/team",
          sameAs: ["https://www.linkedin.com/company/lancet-software-india-pvt-ltd"],
        }}
        offerCatalog={{
          name: "Shopify Services",
          items: [
            "Shopify Store Design & Development",
            "Custom Shopify App Development",
            "Payment Gateway & Checkout Integration",
            "Shopify Integration Services",
          ],
        }}
        citation={[
          "https://www.statista.com/outlook/dmo/ecommerce/worldwide",
          "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          "https://apps.shopify.com/",
          "https://www.w3.org/TR/WCAG22/",
        ]}
        potentialAction={[
          {
            type: "ContactAction",
            name: "Schedule Shopify Consultation",
            target: "https://www.lancetindia.com/contact?service=shopify",
          },
          {
            type: "DownloadAction",
            name: "Download Shopify Service Brief",
            target: "https://www.lancetindia.com/llms.txt",
          },
        ]}
      />

      <FAQSchema questions={faqItems} />

      <ContentPageLayout
        title={pageData.title}
        subtitle={pageData.subtitle}
        image={pageData.image}
        body={pageData.body}
      />
    </>
  )
}
