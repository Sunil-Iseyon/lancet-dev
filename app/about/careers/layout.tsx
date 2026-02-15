import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Careers in Business Intelligence & Data Analytics | Lancet Software India",
  description:
    "Careers in Business Intelligence and Data Analytics at Lancet Software India. Build skills across 800+ BI projects with 95% employee satisfaction and structured growth.",
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
    title: "Careers in Business Intelligence & Data Analytics | Lancet Software India",
    description:
      "Explore BI and data analytics careers backed by enterprise delivery and structured learning.",
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
