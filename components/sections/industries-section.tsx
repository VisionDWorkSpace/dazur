"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

const industries = [
  {
    title: "Real Estate &\nConstruction",
    slug: "real-estate-construction",
    image: "/modern-skyscrapers-construction-real-estate.jpg",
  },
  {
    title: "Infrastructure\n& Energy",
    slug: "infrastructure-energy",
    image: "/energy-infrastructure-power-plant.jpg",
  },
  {
    title: "Life Sciences\n& Deep Tech",
    slug: "life-sciences-deep-tech",
    image: "/laboratory-science-technology-research.jpg",
  },
  {
    title: "Hospitality\n& Tourism",
    slug: "hospitality-tourism",
    image: "/luxury-hotel-resort-tourism.jpg",
  },
  {
    title: "Industrial\n& Deep Tech",
    slug: "industrial-deep-tech",
    image: "/industrial-factory-manufacturing-technology.jpg",
  },
  {
    title: "Commodities &\nNatural Resources",
    slug: "commodities-natural-resources",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-11-08%2C%20a%CC%80s%2019.28.53-jZyk6WGxhRMf0ypOZG7yKTOuigkAFd.png",
  },
  {
    title: "Consulting &\nBusiness Services",
    slug: "consulting-business-services",
    image: "/business-consulting-meeting.jpg",
  },
  {
    title: "Financial &\nPrivate Capital",
    slug: "financial-private-capital",
    image: "/finance-trading-stock-market-investment.jpg",
  },
  {
    title: "Transport &\nDistribution",
    slug: "transport-distribution",
    image: "/logistics-shipping-transport-distribution.jpg",
  },
  {
    title: "Technology, Media &\nTelecommunications",
    slug: "technology-media-telecommunications",
    image: "/technology-telecommunications-digital-network.jpg",
  },
]

export function IndustriesSection() {
  const { ref, isVisible } = useReveal(0.2)
  const { t } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft
      const cardWidth = scrollContainer.offsetWidth
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.min(index, industries.length - 1))
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="industries-section" ref={ref} className="relative w-full px-6 py-20 md:px-12 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 font-light text-4xl md:text-5xl text-foreground">{t("industries.title")}</h2>
        </div>

        <div
          ref={scrollRef}
          className="mb-8 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {industries.map((industry, i) => (
            <Link
              key={i}
              href="/industries"
              className={`group relative flex-shrink-0 w-[85vw] md:w-[350px] h-[450px] rounded-3xl overflow-hidden snap-center transition-all duration-700 cursor-pointer ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={industry.image || "/placeholder.svg"}
                alt={industry.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 350px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="mb-2 text-2xl font-light text-white whitespace-pre-line leading-tight">
                  {industry.title}
                </h3>
                <div
                  className={`text-sm font-light text-white/80 transition-opacity duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"}`}
                >
                  + see more
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-16">
          {industries.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const scrollContainer = scrollRef.current
                if (scrollContainer) {
                  scrollContainer.scrollTo({
                    left: i * scrollContainer.offsetWidth,
                    behavior: "smooth",
                  })
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-8 bg-accent" : "w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
