import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Business Intelligence & Data Analytics Experts",
  description:
    "Meet the Lancet Software India business intelligence and data analytics experts. Leadership and consulting team delivering enterprise BI, analytics, and data engineering solutions since 2010.",
  alternates: {
    canonical: "https://www.lancetindia.com/about/team",
    languages: {
      en: "https://www.lancetindia.com/about/team",
      "x-default": "https://www.lancetindia.com/about/team",
    },
  },
  openGraph: {
    title: "Business Intelligence & Data Analytics Experts | Lancet Software India",
    description:
      "Business intelligence and data analytics experts delivering enterprise BI, analytics, and data engineering at Lancet Software India.",
    url: "https://www.lancetindia.com/about/team",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Intelligence & Data Analytics Experts | Lancet Software India",
    description:
      "Business intelligence and data analytics experts at Lancet Software India.",
  },
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
