import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Careers in Business Intelligence & Data Analytics",
  description:
    "Build your career in Business Intelligence and Data Analytics with Lancet Software India. Join projects across BI, data engineering, and analytics consulting.",
  alternates: {
    canonical: "https://www.lancetindia.com/about/careers",
    languages: {
      en: "https://www.lancetindia.com/about/careers",
      "x-default": "https://www.lancetindia.com/about/careers",
    },
  },
  openGraph: {
    title: "Careers in Business Intelligence & Data Analytics | Lancet Software India",
    description:
      "Explore BI and data analytics career opportunities at Lancet Software India with structured learning and enterprise project exposure.",
    url: "https://www.lancetindia.com/about/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers in Business Intelligence & Data Analytics",
    description:
      "Explore BI and data analytics career opportunities at Lancet Software India.",
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
