import { getPage, getPagesByCategory, getPageSlug } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BreadcrumbSchema, { FAQSchema, ServiceSchema } from "@/components/StructuredData"

const publishedDate = "2026-02-13"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service } = await params
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "business-intelligent") {
    return {
      title: 'Page Not Found',
    }
  }

  const title = `${pageData.title} - Business Intelligence Consulting | Lancet Software India`
  const description = pageData.subtitle || `Expert ${pageData.title} consulting services. Transform your data with professional business intelligence solutions from Lancet Software India.`
  const url = `https://www.lancetindia.com/consulting/business-intelligent/${service}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: pageData.image ? [{ url: pageData.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: pageData.image ? [pageData.image] : [],
    },
    alternates: {
      canonical: url,
      languages: {
        en: url,
        'x-default': url,
      },
    },
    other: {
      'DC.title': pageData.title,
      'DC.description': description,
      'DC.creator': 'Lancet Software India',
    },
  }
}

export default async function BusinessIntelligentServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  
  // Fetch the current page content
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "business-intelligent") {
    notFound()
  }

  // Fetch related pages from the same category
  const relatedPages = await getPagesByCategory("business-intelligent")
  const relatedItems = relatedPages
    .filter((page: any) => getPageSlug(page) !== service)
    .map((page: any) => ({
      path: `/consulting/business-intelligent/${getPageSlug(page)}`,
      title: page.title,
      subtitle: page.subtitle,
      image: page.image,
    }))

  const pageUrl = `https://www.lancetindia.com/consulting/business-intelligent/${service}`
  const faqItems = [
    {
      question: `What business outcomes can ${pageData.title} consulting deliver?`,
      answer: `Lancet Software India's ${pageData.title} consulting focuses on faster reporting, stronger data quality, and better executive decision support.`
    },
    {
      question: `Does Lancet support end-to-end ${pageData.title} implementation?`,
      answer: `Yes. Lancet Software India covers solution design, implementation, optimization, governance, and managed support for ${pageData.title}.`
    },
    {
      question: `Can ${pageData.title} be integrated with existing enterprise systems?`,
      answer: `Yes. Lancet Software India integrates ${pageData.title} with data warehouses, cloud platforms, CRMs, ERPs, and operational data sources.`
    },
  ]

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Consulting', url: '/consulting' },
        { name: 'Business Intelligence', url: '/consulting/business-intelligent' },
        { name: pageData.title, url: `/consulting/business-intelligent/${service}` }
      ]} />

      {/* Service Schema */}
      <ServiceSchema
        name={`${pageData.title} Consulting Services`}
        description={pageData.subtitle || `Expert ${pageData.title} consulting, implementation, and support services from Lancet Software India. Transform your data into actionable insights.`}
        url={pageUrl}
        serviceType="Business Intelligence Consulting"
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
          name: `${pageData.title} Service Portfolio`,
          items: [
            `${pageData.title} Assessment & Roadmap`,
            `${pageData.title} Implementation`,
            `${pageData.title} Optimization`,
            `${pageData.title} Managed Support`,
          ],
        }}
        citation={[
          "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          "https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics",
          "https://www.w3.org/TR/WCAG22/",
        ]}
        potentialAction={[
          {
            type: "ContactAction",
            name: "Schedule BI Consulting Session",
            target: "https://www.lancetindia.com/contact?service=business-intelligence",
          },
          {
            type: "ViewAction",
            name: "View Service Details",
            target: pageUrl,
          },
        ]}
      />

      <FAQSchema questions={faqItems} />

      <ContentPageLayout
        title={pageData.title}
        subtitle={pageData.subtitle}
        image={pageData.image}
        body={pageData.body}
        relatedItems={relatedItems}
      />
    </>
  )
}
