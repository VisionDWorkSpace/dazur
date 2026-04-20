"use client"

import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import {
  TrendingUp,
  Cpu,
  FileCheck,
  Briefcase,
  Shield,
  Target,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const services = [
  {
    icon: TrendingUp,
    title: "Capital & Transaction Strategy",
    description: "Strategic guidance for capital operations and M&A transactions",
    details: [
      "Comprehensive valuation analysis using multiple methodologies",
      "Market positioning strategy development",
      "Due diligence preparation and execution",
      "Deal structuring optimization",
      "Negotiation support with experienced advisors",
      "Exit strategy planning with timeline optimization",
    ],
    pricing: "Deposit + Success Fee",
    subServices: [
      {
        name: "Internationalize by Acquisition",
        description:
          "Strategic cross-border M&A to expand your market presence and accelerate international growth through targeted acquisitions.",
      },
      {
        name: "Vertical Acquisition",
        description:
          "Strengthen your supply chain and market position by acquiring suppliers or distributors to capture more value.",
      },
      {
        name: "M&A Mandate",
        description:
          "Full-service M&A advisory from target identification to deal closure, ensuring optimal transaction outcomes.",
      },
      {
        name: "Private Debt",
        description:
          "Access alternative financing solutions with flexible terms to fuel growth without diluting equity ownership.",
      },
      {
        name: "Private Placement",
        description:
          "Secure strategic capital from institutional investors with customized investment structures aligned with your goals.",
      },
      {
        name: "Divestiture Strategy",
        description:
          "Optimize portfolio value through strategic asset sales and carve-outs to unlock shareholder value.",
      },
    ],
  },
  {
    icon: Cpu,
    title: "Tech Development & AI",
    description: "Cutting-edge technology solutions and AI integration",
    details: [
      "Technology stack assessment and modernization",
      "Custom software development with agile methodology",
      "AI/ML implementation for automation",
      "Digital transformation consulting",
      "Cloud migration strategy and execution",
      "Integration of emerging technologies",
    ],
    pricing: "Project-based or Retainer",
    subServices: [
      {
        name: "AI Process Automation",
        description:
          "Implement intelligent automation to streamline operations, reduce costs, and improve efficiency across your organization.",
      },
      {
        name: "Predictive Analytics",
        description:
          "Leverage machine learning to forecast trends, optimize decisions, and gain competitive advantages through data insights.",
      },
      {
        name: "Custom Software Development",
        description:
          "Build tailored solutions that perfectly fit your business needs with modern, scalable technology stacks.",
      },
      {
        name: "Cloud Infrastructure",
        description:
          "Migrate and optimize your infrastructure for cloud-native performance, security, and cost efficiency.",
      },
      {
        name: "Digital Transformation",
        description:
          "Modernize your entire technology ecosystem to drive innovation and competitive advantage in the digital age.",
      },
      {
        name: "API Integration",
        description:
          "Connect systems seamlessly with robust API architecture for improved data flow and operational efficiency.",
      },
    ],
  },
  {
    icon: FileCheck,
    title: "Incentives Applications",
    description: "Maximize government grants and incentive programs",
    details: [
      "Comprehensive grant landscape analysis",
      "Eligibility assessment with gap analysis",
      "Application preparation with compelling narratives",
      "Compliance management and reporting",
      "R&D tax credit optimization",
      "Strategic planning for cumulative incentive capture",
    ],
    pricing: "Deposit + Success Fee",
    subServices: [
      {
        name: "PRR Incentives",
        description:
          "Navigate Portugal's Recovery and Resilience Plan to secure funding for digital transformation and sustainability projects.",
      },
      {
        name: "European Subsidies",
        description:
          "Access EU funding programs including Horizon Europe, COSME, and regional development funds for innovation and growth.",
      },
      {
        name: "Institutional Grants and Prizes",
        description:
          "Identify and apply for competitive grants and innovation prizes from foundations, accelerators, and industry bodies.",
      },
      {
        name: "R&D Subsidies (ANI)",
        description:
          "Maximize R&D tax credits and innovation subsidies through Portugal's National Innovation Agency programs.",
      },
      {
        name: "Green Transition Funding",
        description:
          "Secure environmental and sustainability grants for decarbonization, circular economy, and green technology projects.",
      },
      {
        name: "Export Support Programs",
        description: "Access internationalization grants and export financing to expand your global market presence.",
      },
    ],
  },
  {
    icon: Briefcase,
    title: "Public Contracts & Tenders Strategy",
    description: "Win more public sector contracts and tenders",
    details: [
      "Tender opportunity identification",
      "Bid/no-bid decision framework",
      "Proposal development with competitive pricing",
      "Compliance verification",
      "Contract negotiation support",
      "Post-award contract management",
    ],
    pricing: "Deposit + Success Fee",
    subServices: [
      {
        name: "Infrastructure Tenders",
        description:
          "Win large-scale public infrastructure projects with strategic bid development and competitive positioning.",
      },
      {
        name: "IT & Digital Services",
        description:
          "Secure government technology contracts for software, systems integration, and digital transformation projects.",
      },
      {
        name: "Consulting Services",
        description:
          "Position your firm to win public sector advisory and professional services contracts across multiple domains.",
      },
      {
        name: "Framework Agreements",
        description:
          "Establish long-term framework contracts with public entities for recurring service delivery and revenue stability.",
      },
      {
        name: "PPP Structuring",
        description:
          "Navigate complex public-private partnerships with optimal risk allocation and financial structuring.",
      },
      {
        name: "Bid Consortium Formation",
        description:
          "Build winning consortia with complementary partners to strengthen technical and financial capacity.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Procurement & Risk Management",
    description: "Optimize procurement processes and mitigate operational risks",
    details: [
      "Supplier diversification strategy",
      "Cost optimization through strategic sourcing",
      "Risk assessment framework",
      "Contract management system implementation",
      "Supply chain resilience planning",
      "Vendor performance monitoring",
    ],
    pricing: "Customized per request",
    subServices: [
      {
        name: "Supplier Diversification",
        description:
          "Reduce dependency risks by building a resilient multi-source supply network with strategic backup suppliers.",
      },
      {
        name: "Strategic Sourcing",
        description:
          "Optimize procurement costs through category management, competitive bidding, and supplier negotiations.",
      },
      {
        name: "Contract Optimization",
        description:
          "Restructure supplier agreements to improve terms, reduce costs, and enhance service level guarantees.",
      },
      {
        name: "Supply Chain Risk Assessment",
        description:
          "Identify and mitigate vulnerabilities across your supply chain with comprehensive risk mapping and contingency planning.",
      },
      {
        name: "Vendor Performance Management",
        description:
          "Implement KPI tracking and performance scorecards to ensure supplier accountability and continuous improvement.",
      },
      {
        name: "Procurement Technology",
        description:
          "Deploy e-procurement platforms and automation tools to streamline purchasing and improve spend visibility.",
      },
    ],
  },
  {
    icon: Target,
    title: "Market Value Optimization",
    description: "Maximize your company's market valuation and investor appeal",
    details: [
      "EBITDA optimization through margin improvement",
      "Multiple expansion strategies",
      "Investor readiness assessment",
      "Financial narrative development",
      "Strategic positioning for capital events",
      "Valuation bridge analysis",
    ],
    pricing: "Retainer + Performance Fee",
    subServices: [],
  },
]

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeSlides, setActiveSlides] = useState<{ [key: number]: number }>({})
  const scrollRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlides((prev) => {
        const newSlides = { ...prev }
        services.forEach((service, i) => {
          const currentSlide = newSlides[i] || 0
          newSlides[i] = (currentSlide + 1) % service.subServices.length
        })
        return newSlides
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    Object.entries(activeSlides).forEach(([serviceIndex, slideIndex]) => {
      const scrollContainer = scrollRefs.current[Number(serviceIndex)]
      if (scrollContainer) {
        const cardWidth = scrollContainer.scrollWidth / services[Number(serviceIndex)].subServices.length
        scrollContainer.scrollTo({
          left: cardWidth * slideIndex,
          behavior: "smooth",
        })
      }
    })
  }, [activeSlides])

  const handlePrevSlide = (serviceIndex: number) => {
    setActiveSlides((prev) => {
      const currentSlide = prev[serviceIndex] || 0
      const newSlide = currentSlide === 0 ? services[serviceIndex].subServices.length - 1 : currentSlide - 1
      return { ...prev, [serviceIndex]: newSlide }
    })
  }

  const handleNextSlide = (serviceIndex: number) => {
    setActiveSlides((prev) => {
      const currentSlide = prev[serviceIndex] || 0
      const newSlide = (currentSlide + 1) % services[serviceIndex].subServices.length
      return { ...prev, [serviceIndex]: newSlide }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader currentPage="other" />

      <section className="relative min-h-[70vh] w-full overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dazur%20Video-3O9qE9fWqfj6V8CvmRAXeKsYRNaaIW.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
              Core <span className="font-bold">Services</span>
            </h1>
            <p className="mb-12 text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto">
              Comprehensive solutions to optimize your company's value and accelerate growth through strategic execution
            </p>
            <Link href="/readiness-form">
              <button className="rounded-full bg-white text-black px-8 py-3 font-light transition-all duration-300 hover:bg-white/90 hover:scale-105">
                Start Assessment
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl space-y-12">
          {services.map((service, i) => {
            const Icon = service.icon
            const isOpen = openIndex === i
            const activeSlide = activeSlides[i] || 0
            const isMarketValueOptimization = service.title === "Market Value Optimization"

            return (
              <div key={i} className="space-y-6">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:hidden"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-foreground" />
                    <h3 className="text-lg font-bold text-foreground text-left">{service.title}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div className={`${isOpen ? "block" : "hidden"} md:block p-6 md:p-8`}>
                  <div className="hidden md:flex items-center gap-4 mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/5">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h2>
                  </div>

                  <p className="text-foreground/70 mb-6">{service.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">How We Help</h4>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        {service.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-foreground mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="p-4 rounded-lg bg-foreground/5">
                        <p className="font-semibold text-foreground mb-1">Pricing</p>
                        <p className="text-sm text-foreground/80">{service.pricing}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {isMarketValueOptimization ? (
                  <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                    <div className="flex flex-col items-center justify-center py-8 px-6 rounded-xl border border-foreground/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-xl">
                      <p className="text-foreground/70 mb-6 text-center max-w-2xl">
                        Discover our comprehensive 5-pillar analysis system to maximize your company's market value and
                        prepare for successful capital operations.
                      </p>
                      <Link href="/market-value-optimization">
                        <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-light transition-all duration-300 hover:scale-105 hover:shadow-lg">
                          View Full Analysis System
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-foreground">Our Expertise</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePrevSlide(i)}
                          className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="w-5 h-5 text-foreground" />
                        </button>
                        <button
                          onClick={() => handleNextSlide(i)}
                          className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                          aria-label="Next"
                        >
                          <ChevronRight className="w-5 h-5 text-foreground" />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={(el) => {
                        scrollRefs.current[i] = el
                      }}
                      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {service.subServices.map((subService, j) => (
                        <div key={j} className="flex-shrink-0 w-[85vw] md:w-[calc(33.333%-12px)] snap-start">
                          <div className="p-6 rounded-xl border border-foreground/10 bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                            <h5 className="font-semibold text-foreground text-base mb-3">{subService.name}</h5>
                            <p className="text-sm text-foreground/70 leading-relaxed flex-grow">
                              {subService.description}
                            </p>
                            <div className="flex gap-1.5 mt-4 pt-4 border-t border-foreground/5">
                              {service.subServices.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`h-1 rounded-full transition-all duration-300 ${
                                    idx === activeSlide ? "w-8 bg-[#0decfa]" : "w-1.5 bg-foreground/20"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
