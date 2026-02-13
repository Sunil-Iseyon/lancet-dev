import { getPage } from "@/lib/tina"
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
  
  if (!pageData || pageData.category !== "data-services") {
    return {
      title: 'Page Not Found',
    }
  }

  const title = `${pageData.title} - Data Services | Lancet Software India`
  const description = pageData.subtitle || `Professional ${pageData.title} data services. Enterprise-grade data solutions from Lancet Software India since 1997.`
  const url = `https://www.lancetindia.com/consulting/data-services/${service}`

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

export default async function DataServicesServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  
  // Fetch the current page content
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "data-services") {
    notFound()
  }

  const pageUrl = `https://www.lancetindia.com/consulting/data-services/${service}`
  const faqItems = [
    {
      question: `What is included in your ${pageData.title} service delivery?`,
      answer: `We provide architecture planning, implementation, security, performance tuning, and long-term managed support for ${pageData.title}.`
    },
    {
      question: `Can ${pageData.title} be integrated with our current data stack?`,
      answer: `Yes. We integrate ${pageData.title} with cloud platforms, databases, BI tools, and enterprise applications with minimal disruption.`
    },
    {
      question: `How does Lancet ensure data quality and governance?`,
      answer: `We implement validation rules, lineage controls, access governance, and monitoring processes to maintain trusted enterprise data.`
    },
  ]

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Consulting', url: '/consulting' },
        { name: 'Data Services', url: '/consulting/data-services' },
        { name: pageData.title, url: `/consulting/data-services/${service}` }
      ]} />

      {/* Service Schema */}
      <ServiceSchema
        name={`${pageData.title} Services`}
        description={pageData.subtitle || `Professional ${pageData.title} implementation and consulting services from Lancet Software India. Enterprise-grade data solutions tailored to your needs.`}
        url={pageUrl}
        serviceType="Data Services"
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
            `${pageData.title} Assessment & Architecture`,
            `${pageData.title} Implementation`,
            `${pageData.title} Optimization`,
            `${pageData.title} Managed Operations`,
          ],
        }}
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
