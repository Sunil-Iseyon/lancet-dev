import { getPage } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BreadcrumbSchema, { FAQSchema, ServiceSchema } from "@/components/StructuredData"

const pageUrl = "https://www.lancetindia.com/services/installation-and-upgrades"
const publishedDate = "2026-02-13"

export const metadata: Metadata = {
  title: 'Installation & Upgrades - BI Platform Services | Lancet Software India',
  description: 'Professional BI platform installation and upgrade services from Lancet Software India. Expert deployment, migration, and version upgrades for enterprise analytics systems.',
  openGraph: {
    title: 'Installation & Upgrades - BI Platform Services',
    description: 'Professional BI platform installation, migration, and upgrade services.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Installation & Upgrades | Lancet Software India',
    description: 'Expert BI platform installation and upgrade services.',
  },
  alternates: {
    canonical: pageUrl,
    languages: { en: pageUrl, 'x-default': pageUrl },
  },
  other: {
    'DC.title': 'Installation & Upgrades by Lancet Software India',
    'DC.description': 'Professional BI platform installation and upgrade services',
    'DC.creator': 'Lancet Software India',
  },
}

export default async function InstallationAndUpgradesPage() {
  const pageData = await getPage("installation-and-upgrades")
  
  if (!pageData) {
    notFound()
  }

  const faqItems = [
    {
      question: "What BI platforms does Lancet support for installation and upgrades?",
      answer: "Lancet supports MicroStrategy, Power BI, Tableau, Databricks, Informatica, and other enterprise BI and data platforms.",
    },
    {
      question: "How does Lancet handle version migrations?",
      answer: "Lancet follows a structured migration methodology including pre-migration assessment, testing, rollback planning, and post-upgrade validation.",
    },
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Installation & Upgrades', url: pageUrl },
      ]} />
      <ServiceSchema
        name="BI Platform Installation & Upgrade Services"
        description="Expert installation, migration, and upgrade services for enterprise BI and analytics platforms."
        url={pageUrl}
        serviceType="IT Installation Services"
        datePublished={publishedDate}
        dateModified={publishedDate}
        author={{ name: "Lancet Software India", url: "https://www.lancetindia.com/about/team" }}
        potentialAction={[
          { type: "ContactAction", name: "Request Installation Support", target: "https://www.lancetindia.com/contact" },
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
