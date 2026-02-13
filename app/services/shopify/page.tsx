import { getPage } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BreadcrumbSchema, { ServiceSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: 'Shopify Solutions - E-commerce Excellence | Lancet Software India',
  description: 'Transform your e-commerce with expert Shopify solutions from Lancet Software India. Custom development, integrations, and optimization services.',
  openGraph: {
    title: 'Shopify Solutions - E-commerce Excellence',
    description: 'Transform your e-commerce with expert Shopify solutions.',
    url: 'https://www.lancetindia.com/services/shopify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Solutions - E-commerce Excellence',
    description: 'Transform your e-commerce with expert Shopify solutions.',
  },
  alternates: {
    canonical: 'https://www.lancetindia.com/services/shopify',
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

  const pageUrl = "https://www.lancetindia.com/services/shopify"

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
