import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Build Your Career in Business Intelligence & Data Analytics",
  description:
    "Build your career in business intelligence and data analytics with Lancet Software India. Develop skills across enterprise BI projects with structured growth and mentoring.",
  alternates: {
    canonical: "https://www.lancetindia.com/about/careers",
    languages: {
      en: "https://www.lancetindia.com/about/careers",
      "x-default": "https://www.lancetindia.com/about/careers",
    },
  },
  openGraph: {
    title: "Build Your Career in Business Intelligence & Data Analytics | Lancet Software India",
    description:
      "Build your career in business intelligence and data analytics at Lancet Software India with structured learning and enterprise project exposure.",
    url: "https://www.lancetindia.com/about/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Career in Business Intelligence & Data Analytics | Lancet Software India",
    description:
      "Build your career in business intelligence and data analytics with enterprise delivery and structured learning at Lancet Software India.",
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
