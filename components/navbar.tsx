"use client"

import React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { gsap } from "@/lib/gsap"

export default function Navbar() {
  const pathname = usePathname();
    // Multi-level submenu state
    const [isBIOpen, setIsBIOpen] = useState(false)
    const [isDIOpen, setIsDIOpen] = useState(false)
    const [isDSOpen, setIsDSOpen] = useState(false)
    const [is247Open, setIs247Open] = useState(false)
    const [is247DevOpen, setIs247DevOpen] = useState(false)
    // Submenus for Consulting
    const businessIntelligent = [
      { label: "Strategy", href: "/consulting/business-intelligent/strategy" },
      { label: "Tableau", href: "/consulting/business-intelligent/tableau" },
      { label: "Power BI", href: "/consulting/business-intelligent/powerbi" },
    ]
    const dataIntegration = [
      { label: "Informatica", href: "/consulting/data-integration/informatica" },
      { label: "Microsoft SSIS", href: "/consulting/data-integration/microsoft-ssis" },
    ]
    const dataServices = [
      { label: "Databricks", href: "/consulting/data-services/databricks" },
      { label: "Microsoft SQL Services", href: "/consulting/data-services/microsoft-sql-services" },
    ]

    // 24 x 7 Service menu
    const service247 = [
      { label: "Development", href: "/services/247-service/development" },
      { label: "Administration", href: "/services/247-service/administration" },
      { label: "MicroStrategy Managed Services", href: "/services/247-service/microstrategy-managed" },
      { label: "Tableau Managed Services", href: "/services/247-service/tableau-managed" },
      { label: "Microsoft Managed Services", href: "/services/247-service/microsoft-managed" },
      { label: "SharePoint", href: "/services/247-service/sharepoint" },
    ];
    const service247Groups = [
      {
        label: "service",
        submenu: service247,
      },
      // Add more groups if needed
    ];
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isConsultingOpen, setIsConsultingOpen] = useState(false)
  const [isEngagementOpen, setIsEngagementOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    // Check scroll position immediately on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      })

      gsap.from(menuRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      })

      gsap.from(ctaRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      })
    })

    return () => ctx.revert()
  }, [])

  const services = [
    { label: "24 x 7 Services", href: "" },
    { label: "Shopify", href: "/services/shopify" },
    { label: "Installation and Upgrades", href: "/services/installation-and-upgrades" },
  ]

  const engagementModes = [
    { label: "Staff Augmentations", href: "/engagement-modes/staff-augmentations" },
    { label: "Delivery Modes", href: "/engagement-modes/delivery-modes" },
  ]

  const resources = [
    { label: "White Paper", href: "/resources/white-paper" },
    { label: "Dashboard Gallery", href: "/resources/dashboard-gallery" },
  ]

  const aboutUs = [
    { label: "Team", href: "/about/team" },
    { label: "Career", href: "/about/careers" },
    { label: "Blog", href: "/blog" },
  ]

  const handleNavigate = (href: string) => {
    setIsOpen(false)
    setIsServicesOpen(false)
    setIsConsultingOpen(false)
    setIsEngagementOpen(false)
    setIsResourcesOpen(false)
    setIsAboutOpen(false)
    setIs247Open(false)
    setIsBIOpen(false)
    setIsDIOpen(false)
    setIsDSOpen(false)
  }

  // Determine if on landing page
  const isLightTextPage = pathname === "/" || pathname === "/contact";
  // Menu text color: black if not landing or if scrolled, else white
  const menuTextColor = (!isLightTextPage || scrolled) ? "text-black" : "text-white";

  return (
    <nav className={`fixed top-0 z-50 w-full py-2 transition-colors duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* LEFT — Logo (flex-1) */}
          <div ref={logoRef} className="flex-1 flex items-center">
            <Link
              href="/"
              className=" gap-2 group"
              onClick={() => handleNavigate("/")}
            >
              
              <Image
                src="/logo.png"
                alt="Lancet Logo"
                width={120}
                height={120}
              />
              {/* <div className="text-xs text-slate-700 font-semibold uppercase hidden sm:inline self-center tracking-[0.27em]">Software India</div> */}
            </Link>
          </div>

          {/* CENTER — Desktop Menu (flex-1 centered) */}
          <div ref={menuRef} className="hidden md:flex flex-1 items-center justify-center gap-8 whitespace-nowrap">
            
            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => { setIsServicesOpen(false); setIs247Open(false); setIs247DevOpen(false); }}
            >
              <button className={`text-base font-medium transition-colors relative flex items-center gap-1 group ${menuTextColor}
              `}>
                Services
                <ChevronDown size={16} className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${menuTextColor} group-hover:w-full transition-all duration-300`} />
              </button>
              {isServicesOpen && (
                <div className="absolute left-0 mt-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                  {/* 24 x 7 Services with nested submenu */}
                  <div className="relative group"
                    onMouseEnter={() => setIs247Open(true)}
                    onMouseLeave={() => { setIs247Open(false); setIs247DevOpen(false); }}>
                    <button className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between">
                      24 x 7 Services
                      <ChevronDown size={16} className={`transition-transform ${is247Open ? "rotate-180" : ""}`} />
                    </button>
                    {is247Open && (
                            <div className="absolute left-full top-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                              {service247Groups[0].submenu.map((item) => (
                                <Link key={item.href} href={item.href} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors" onClick={() => handleNavigate(item.href)}>
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          )}
                  </div>
                  {/* Other services */}
                  {services.filter(s => s.label !== "24 x 7 Services").map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10  transition-colors"
                      onClick={() => handleNavigate(service.href)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Consulting Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsConsultingOpen(true)}
              onMouseLeave={() => { setIsConsultingOpen(false); setIsBIOpen(false); setIsDIOpen(false); setIsDSOpen(false); }}
            >
              <button className={`text-base font-medium transition-colors relative flex items-center gap-1 group ${menuTextColor}
              `}>
                Consulting
                <ChevronDown size={16} className={`transition-transform ${isConsultingOpen ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${menuTextColor} group-hover:w-full transition-all duration-300`} />
              </button>
              {isConsultingOpen && (
                <div className="absolute left-0 mt-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                  {/* Business Intelligent with submenu */}
                  <div className="relative group"
                    onMouseEnter={() => setIsBIOpen(true)}
                    onMouseLeave={() => setIsBIOpen(false)}>
                    <button className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between">
                      Business Intelligent
                      <ChevronDown size={16} className={`transition-transform ${isBIOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isBIOpen && (
                      <div className="absolute left-full top-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                        {businessIntelligent.map((sub) => (
                          <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors" onClick={() => handleNavigate(sub.href)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Data Integration with submenu */}
                  <div className="relative group"
                    onMouseEnter={() => setIsDIOpen(true)}
                    onMouseLeave={() => setIsDIOpen(false)}>
                    <button className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between">
                      Data Integration
                      <ChevronDown size={16} className={`transition-transform ${isDIOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isDIOpen && (
                      <div className="absolute left-full top-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                        {dataIntegration.map((sub) => (
                          <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors" onClick={() => handleNavigate(sub.href)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Data Services with submenu */}
                  <div className="relative group"
                    onMouseEnter={() => setIsDSOpen(true)}
                    onMouseLeave={() => setIsDSOpen(false)}>
                    <button className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between">
                      Data Services
                      <ChevronDown size={16} className={`transition-transform ${isDSOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isDSOpen && (
                      <div className="absolute left-full top-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                        {dataServices.map((sub) => (
                          <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors" onClick={() => handleNavigate(sub.href)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Engagement Modes Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsEngagementOpen(true)}
              onMouseLeave={() => setIsEngagementOpen(false)}
            >
              <button className={`text-base font-medium transition-colors relative flex items-center gap-1 group ${menuTextColor}
              `}>
                Engagement Modes
                <ChevronDown size={16} className={`transition-transform ${isEngagementOpen ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${menuTextColor} group-hover:w-full transition-all duration-300`} />
              </button>
              {isEngagementOpen && (
                <div className="absolute left-0 mt-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                  {engagementModes.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10  transition-colors"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button className={`text-base font-medium transition-colors relative flex items-center gap-1 group ${menuTextColor}
              `}>
                Resources
                <ChevronDown size={16} className={`transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${menuTextColor} group-hover:w-full transition-all duration-300`} />
              </button>
              {isResourcesOpen && (
                <div className="absolute left-0 mt-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                  {resources.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10  transition-colors"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className={`text-base font-medium transition-colors relative flex items-center gap-1 group ${menuTextColor}
              `}>
                About Us
                <ChevronDown size={16} className={`transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${menuTextColor} group-hover:w-full transition-all duration-300`} />
              </button>
              {isAboutOpen && (
                <div className="absolute left-0 mt-0 max-w-max bg-card border border-border rounded-lg shadow-xl animate-slide-in-up py-2">
                  {aboutUs.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10  transition-colors"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Contact Button (flex-1 right aligned) */}
          <div ref={ctaRef} className="hidden md:flex flex-1 items-center justify-end">
            <Link href="/contact">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 hover:bg-muted rounded-lg transition-colors ${menuTextColor}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 mt-2 p-5 bg-white rounded-lg shadow-xl border border-border animate-slide-in-up max-h-[calc(100vh-100px)] overflow-y-auto">
           
            {/* Mobile Services Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full text-left text-base font-medium text-foreground  flex items-center justify-between"
              >
                Services
                <ChevronDown size={16} className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesOpen && (
                <div className="mt-2 space-y-1">
                  {/* 24 x 7 Services with submenu */}
                  <div>
                    <button
                      onClick={() => setIs247Open(!is247Open)}
                      className="w-full text-left px-4 py-2 text-base text-foreground hover:bg-primary/10  rounded transition-colors flex items-center justify-between"
                    >
                      24 x 7 Services
                      <ChevronDown size={14} className={`transition-transform ${is247Open ? "rotate-180" : ""}`} />
                    </button>
                    {is247Open && (
                      <div className="mt-1 ml-4 space-y-1">
                        {service247.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10  rounded transition-colors"
                            onClick={() => handleNavigate(item.href)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Other services */}
                  {services.filter(s => s.label !== "24 x 7 Services").map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2 text-base text-foreground hover:bg-primary/10  rounded transition-colors"
                      onClick={() => handleNavigate(service.href)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Consulting Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsConsultingOpen(!isConsultingOpen)}
                className="w-full text-left text-base font-medium text-foreground  flex items-center justify-between"
              >
                Consulting
                <ChevronDown size={16} className={`transition-transform ${isConsultingOpen ? "rotate-180" : ""}`} />
              </button>
              {isConsultingOpen && (
                <div className="mt-2 space-y-1">
                  {/* Business Intelligent with submenu */}
                  <div>
                    <button onClick={() => setIsBIOpen(!isBIOpen)} className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between">
                      Business Intelligent
                      <ChevronDown size={16} className={`transition-transform ${isBIOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isBIOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {businessIntelligent.map((sub) => (
                          <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors" onClick={() => handleNavigate(sub.href)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Data Integration with submenu */}
                  <div>
                    <button onClick={() => setIsDIOpen(!isDIOpen)} className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between">
                      Data Integration
                      <ChevronDown size={16} className={`transition-transform ${isDIOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isDIOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {dataIntegration.map((sub) => (
                          <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors" onClick={() => handleNavigate(sub.href)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Data Services with submenu */}
                  <div>
                    <button onClick={() => setIsDSOpen(!isDSOpen)} className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors flex items-center justify-between">
                      Data Services
                      <ChevronDown size={16} className={`transition-transform ${isDSOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isDSOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {dataServices.map((sub) => (
                          <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-primary/10 transition-colors" onClick={() => handleNavigate(sub.href)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile 24 x 7 Service Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIs247Open(!is247Open)}
                className="w-full text-left text-base font-medium text-foreground  flex items-center justify-between"
              >
                24 x 7 Service
                <ChevronDown size={16} className={`transition-transform ${is247Open ? "rotate-180" : ""}`} />
              </button>
              {is247Open && (
                <div className="mt-2 space-y-1">
                  {service247.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base text-foreground hover:bg-primary/10  rounded transition-colors"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Engagement Modes Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsEngagementOpen(!isEngagementOpen)}
                className="w-full text-left text-base font-medium text-foreground  flex items-center justify-between"
              >
                Engagement Modes
                <ChevronDown size={16} className={`transition-transform ${isEngagementOpen ? "rotate-180" : ""}`} />
              </button>
              {isEngagementOpen && (
                <div className="mt-2 space-y-1">
                  {engagementModes.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base text-foreground hover:bg-primary/10  rounded transition-colors"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Resources Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="w-full text-left text-base font-medium text-foreground  flex items-center justify-between"
              >
                Resources
                <ChevronDown size={16} className={`transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {isResourcesOpen && (
                <div className="mt-2 space-y-1">
                  {resources.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base text-foreground hover:bg-primary/10  rounded transition-colors"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About Us Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="w-full text-left text-base font-medium text-foreground  flex items-center justify-between"
              >
                About Us
                <ChevronDown size={16} className={`transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {isAboutOpen && (
                <div className="mt-2 space-y-1">
                  {aboutUs.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base text-foreground hover:bg-primary/10  rounded transition-colors"
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" onClick={() => handleNavigate("/contact")}>
              <button className="w-full mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all">
                Contact Us
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
