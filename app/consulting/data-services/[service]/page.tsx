import { getPage } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BreadcrumbSchema, { ServiceSchema } from "@/components/StructuredData"

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
      />

      <ContentPageLayout
        title={pageData.title}
        subtitle={pageData.subtitle}
        image={pageData.image}
        body={pageData.body}
      />
    </>
  )
}
