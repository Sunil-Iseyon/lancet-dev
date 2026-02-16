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

  if (!pageData || pageData.category !== "data-integration") {
    return {
      title: "Page Not Found",
    }
  }

  const title = `${pageData.title} - Data Integration Consulting | Lancet Software India`
  const description = pageData.subtitle || `Expert ${pageData.title} data integration services by Lancet Software India.`
  const url = `https://www.lancetindia.com/consulting/data-integration/${service}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: pageData.image ? [{ url: pageData.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: pageData.image ? [pageData.image] : [],
    },
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    other: {
      "DC.title": pageData.title,
      "DC.description": description,
      "DC.creator": "Lancet Software India",
    },
  }
}

export default async function DataIntegrationServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  
  // Fetch the current page content
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "data-integration") {
    notFound()
  }

  // Fetch related pages from the same category
  const relatedPages = await getPagesByCategory("data-integration")
  const relatedItems = relatedPages
    .filter((page: any) => getPageSlug(page) !== service)
    .map((page: any) => ({
      path: `/consulting/data-integration/${getPageSlug(page)}`,
      title: page.title,
      subtitle: page.subtitle,
      image: page.image,
    }))

  const pageUrl = `https://www.lancetindia.com/consulting/data-integration/${service}`
  const faqItems = [
    {
      question: `What does ${pageData.title} data integration include?`,
      answer: `Lancet Software India covers ingestion, transformation, quality controls, and monitored enterprise data pipelines for ${pageData.title}.`,
    },
    {
      question: `Can ${pageData.title} connect with existing enterprise systems?`,
      answer: `Yes. Lancet Software India integrates ${pageData.title} with cloud warehouses, CRMs, ERPs, and analytics tools with governed access.`,
    },
    {
      question: `How is data governance handled in integration projects?`,
      answer: `Lancet Software India implements validation rules, lineage visibility, role-based access, and operational monitoring across delivery environments.`,
    },
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Consulting', url: '/consulting' },
        { name: 'Data Integration', url: '/consulting/data-integration' },
        { name: pageData.title, url: `/consulting/data-integration/${service}` },
      ]} />

      <ServiceSchema
        name={`${pageData.title} Data Integration Services`}
        description={pageData.subtitle || `Expert ${pageData.title} integration implementation and optimization services from Lancet Software India.`}
        url={pageUrl}
        serviceType="Data Integration Services"
        areaServed="Worldwide"
        inLanguage="en"
        datePublished={publishedDate}
        dateModified={publishedDate}
        author={{
          name: "Lancet Software India",
          url: "https://www.lancetindia.com/about/team",
          sameAs: ["https://www.linkedin.com/company/lancet-software-india-pvt-ltd"],
        }}
        citation={[
          "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          "https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics",
          "https://www.w3.org/TR/WCAG22/",
        ]}
        potentialAction={[
          {
            type: "ContactAction",
            name: "Schedule Data Integration Consultation",
            target: "https://www.lancetindia.com/contact?service=data-integration",
          },
          {
            type: "ViewAction",
            name: "Review Data Integration Service Overview",
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
