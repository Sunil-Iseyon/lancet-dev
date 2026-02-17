import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact Our Business Intelligence & Data Analytics Team",
  description:
    "Contact our business intelligence and data analytics team at Lancet Software India. Discuss BI strategy, data engineering, and enterprise analytics requirements with certified professionals.",
  alternates: {
    canonical: "https://www.lancetindia.com/contact",
    languages: {
      en: "https://www.lancetindia.com/contact",
      "x-default": "https://www.lancetindia.com/contact",
    },
  },
  openGraph: {
    title: "Contact Our Business Intelligence & Data Analytics Team | Lancet Software India",
    description:
      "Contact our business intelligence and data analytics team at Lancet Software India for BI consulting and enterprise analytics enquiries.",
    url: "https://www.lancetindia.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Our Business Intelligence & Data Analytics Team | Lancet Software India",
    description:
      "Contact our business intelligence and data analytics team at Lancet Software India.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
