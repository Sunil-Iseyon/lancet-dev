"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const companyLinks = [
    { name: "Team", url: "/about/team" },
    { name: "Careers", url: "/about/careers" },
    { name: "Blog", url: "/blog" },
    { name: "Contact", url: "/contact" }
  ]

  const contactInfo = {
    email: process.env.NEXT_PUBLIC_EMAIL || "infoindia@lancetindia.com",
    headOfficeLandline: process.env.NEXT_PUBLIC_HEAD_OFFICE_LANDLINE || "+91 80-68785101",
    headOfficePhone: process.env.NEXT_PUBLIC_HEAD_OFFICE_PHONE || "+91 9741277911",
    branchPhone1: process.env.NEXT_PUBLIC_BRANCH_OFFICE_PHONE_1 || "+91 79782 75945",
    branchPhone2: process.env.NEXT_PUBLIC_BRANCH_OFFICE_PHONE_2 || "+91 6360551763"
  }

  return (
    <footer className="bg-cyan-600 text-background py-8 sm:py-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="md:flex gap-20 mb-8">

          {/* Logo */}
         <motion.div variants={fadeUp} className="md:col-span-1">
            <Link href="/">
              <Image
                src="/lancet-logo-white.png"
                alt="Lancet Logo"
                width={170}
                height={170}
                priority
              />
            </Link>
          </motion.div>

          {/* Head Office Address */}
          <motion.div variants={fadeUp} className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">Head Office</h4>
            <div className="text-xs sm:text-sm leading-relaxed space-y-1 sm:space-y-2">
              <p className="font-medium mb-1 sm:mb-2">LANCET SOFTWARE INDIA PVT. LTD.</p>
              <p>
                The Empyrean, No 517, Phase II, Anchemuskur Village,<br />
                Chikkathirupathi Post, Malur Taluk, Karnataka 563130
              </p>
              <p className="pt-2">
                Email:{" "}
                <a href={`mailto:${contactInfo.email}`} className="font-bold hover:underline">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                Landline:{" "}
                <span className="font-bold">
                  {contactInfo.headOfficeLandline}
                </span>
              </p>
              <p>
                Phone:{" "}
                <span className="font-bold">
                  {contactInfo.headOfficePhone}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Branch Office Address */}
          <motion.div variants={fadeUp} className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">Branch Office</h4>
            <div className="text-xs sm:text-sm leading-relaxed space-y-1 sm:space-y-2">
              <p className="font-medium mb-1 sm:mb-2">LANCET SOFTWARE INDIA PVT. LTD.</p>
              <p>
                1st Floor, DM-12, DL Chowk, Basanti Nagar, <br />
                Rourkela, Sundargarh, Odisha 769012
              </p>
              <p className="pt-2">
                Phone 1:{" "}
                <span className="font-bold">
                  {contactInfo.branchPhone1}
                </span>
              </p>
              <p>
                Phone 2:{" "}
                <span className="font-bold">
                  {contactInfo.branchPhone2}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Company Menu */}
          <motion.div variants={fadeUp} className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="relative inline-block after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-background after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Copyright */}
        <motion.div
          variants={fadeUp}
          className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-background/80"
        >
          <p>
            © {currentYear} Lancet Software India. All rights reserved.
          </p>

          <Link
            target="_blank"
            href="https://www.linkedin.com/company/lancet-software-india-pvt-ltd-/"
            className="mt-4 md:mt-0 relative inline-block after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-background/80 after:transition-all after:duration-300 hover:after:w-full"
          >
            LinkedIn
          </Link>
        </motion.div>
      </motion.div>
    </footer>
  )
}
