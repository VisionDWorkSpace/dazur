"use client"

import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { useReveal } from "@/hooks/use-reveal"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = ["Tech Venture", "Private Equity", "Real Estate"]

const projects = {
  "Tech Venture": [
    {
      name: "Radika",
      subtitle: "Creative Tech Platform",
      description: "Revolutionary 3D design and creative collaboration platform for modern creators",
      image: "/3d-design-platform-interface.jpg",
      tag: ">250k Tickets + % Equity",
      status: "Active Development",
    },
    {
      name: "SmartSolution",
      subtitle: "AI Productivity Platform",
      description: "AI-powered productivity tools transforming how teams work and collaborate",
      image: "/ai-productivity-dashboard.png",
      tag: "Series A",
      status: "Growth Stage",
    },
    {
      name: "CyberShield",
      subtitle: "Cybersecurity",
      description: "Next-generation cybersecurity solutions protecting digital assets",
      image: "/cybersecurity-dashboard.png",
      tag: "Seed Round",
      status: "Early Stage",
    },
    {
      name: "CloudNative",
      subtitle: "Infrastructure",
      description: "Cloud-native infrastructure and edge computing for the modern web",
      image: "/cloud-infrastructure-dashboard.png",
      tag: "Pre-Seed",
      status: "Incubation",
    },
  ],
  "Private Equity": [
    {
      name: "IndustrialTech",
      subtitle: "Manufacturing Innovation",
      description: "Advanced manufacturing and industrial automation solutions",
      image: "/industrial-manufacturing-facility.png",
      tag: "Growth Stage",
      status: "Portfolio Company",
    },
    {
      name: "HealthCare Plus",
      subtitle: "Healthcare Services",
      description: "Integrated healthcare service platform improving patient outcomes",
      image: "/healthcare-platform.png",
      tag: "Expansion",
      status: "Portfolio Company",
    },
  ],
  "Real Estate": [
    {
      name: "Urban Spaces",
      subtitle: "Mixed-Use Development",
      description: "Premium mixed-use urban development projects in key markets",
      image: "/modern-urban-development.png",
      tag: "Development",
      status: "Active Project",
    },
    {
      name: "Green Living",
      subtitle: "Sustainable Housing",
      description: "Eco-friendly residential communities for sustainable living",
      image: "/sustainable-housing.jpg",
      tag: "Pre-Launch",
      status: "Planning Phase",
    },
  ],
}

export default function VenturesPage() {
  const { ref, isVisible } = useReveal(0.2)
  const [activeCategory, setActiveCategory] = useState("Tech Venture")
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      return () => scrollContainer.removeEventListener("scroll", checkScroll)
    }
  }, [activeCategory])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SharedHeader currentPage="other" />

      <section className="relative min-h-[70vh] w-full overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dazur%20Video-3O9qE9fWqfj6V8CvmRAXeKsYRNaaIW.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
              <span className="font-bold">Ventures</span>
            </h1>
            <p className="mb-12 text-lg md:text-xl font-light text-white/80 leading-relaxed">
              Pioneering the Future of Investment across Tech Venture, Private Equity, and Real Estate
            </p>
            <Link href="/contact">
              <button className="rounded-full bg-white text-black px-8 py-3 font-light transition-all duration-300 hover:bg-white/90 hover:scale-105">
                Invest with us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <main className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <div className="inline-block rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-light mb-4">Invest with us</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-lg font-light">
                <div>
                  <span className="text-white/60">Minimum Ticket:</span>{" "}
                  <span className="font-bold text-white">250k</span>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/20" />
                <div>
                  <span className="text-white/60">Expected Yield:</span>{" "}
                  <span className="font-bold text-[#0decfa]">10%+</span>
                </div>
              </div>
              <Link href="/contact">
                <button className="mt-8 rounded-full bg-white text-black px-8 py-3 font-light transition-all duration-300 hover:bg-white/90 hover:scale-105">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-light transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#0decfa] text-black scale-105"
                    : "bg-transparent border border-white/20 text-white hover:border-white/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-light">Featured Projects</h2>
              <div className="flex gap-2">
                {canScrollLeft && (
                  <button
                    onClick={() => scroll("left")}
                    className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                {canScrollRight && (
                  <button
                    onClick={() => scroll("right")}
                    className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div ref={ref} className="relative">
              <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                {projects[activeCategory as keyof typeof projects].map((project, i) => (
                  <div
                    key={i}
                    className={`flex-shrink-0 w-[350px] md:w-[400px] transition-all duration-700 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#0decfa]/50 hover:scale-105 hover:shadow-2xl hover:shadow-[#0decfa]/20">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-light border border-white/20">
                            {project.tag}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-[#0decfa]/20 backdrop-blur-sm text-xs font-light border border-[#0decfa]/40 text-[#0decfa]">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
                        <p className="text-[#0decfa] text-sm mb-3">{project.subtitle}</p>
                        <p className="text-sm text-white/70 leading-relaxed">{project.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
