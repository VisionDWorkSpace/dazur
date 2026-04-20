"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useEffect, useRef, useState } from "react"
import { PillarPopup } from "@/components/pillar-popup"
import { useLanguage } from "@/contexts/language-context"

const pillars = [
  {
    number: "1",
    title: "Commercial",
    pillarKey: "commercial",
    items: [
      "Sales & Revenue Growth",
      "Strategic Contracts & Procurement Intelligence",
      "55% visible opportunities via Marketing & Networking",
      "45% hidden contract upside through RFPs (Public & Private)",
      "Eligibility & Tracking tools (Regnity - our venture)",
    ],
    metrics: "+ Recurring Revenue",
  },
  {
    number: "2",
    title: "Intangible",
    pillarKey: "intangible",
    items: [
      "Intellectual Property",
      "Brand Equity & Recognition",
      "Technology & Operating Systems",
      "Proprietary Know-How",
      "Process Optimization & Innovation",
    ],
    metrics: "+ Valuation Spread Multiples",
  },
  {
    number: "3",
    title: "Tangible",
    pillarKey: "physical",
    items: [
      "Real Estate & Property Assets",
      "Equipment & Machinery",
      "Inventory & Goods",
      "Strategic Asset Requalification",
      "Monetization Opportunities",
    ],
    metrics: "+ Asset Value",
  },
  {
    number: "4",
    title: "People",
    pillarKey: "people",
    items: [
      "Talent Optimization & Development",
      "Motivation & Engagement Programs",
      "Assessment & Training (Worklab - our venture)",
      "Reduce Dependency, Increase Productivity",
      "Organizational Readiness & Scalability",
    ],
    metrics: "+ Productivity",
  },
  {
    number: "5",
    title: "Finance & Capital",
    pillarKey: "financial",
    items: [
      "Non-Diluted Financing Structures",
      "Government Incentives & Subsidies",
      "Strategic Credit Access",
      "Tax Optimization Strategies",
    ],
    metrics: "+ Liquidity",
  },
]

export function AnalysisSection() {
  const { ref, isVisible } = useReveal(0.2)
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [activePillar, setActivePillar] = useState(0)
  const [openPopup, setOpenPopup] = useState<string | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile || !isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible")
          }
        })
      },
      { threshold: 0.2 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [isMobile, isVisible])

  useEffect(() => {
    if (!isMobile) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft
      const cardWidth = scrollContainer.offsetWidth
      const index = Math.round(scrollLeft / cardWidth)
      setActivePillar(Math.min(index, pillars.length - 1))
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  return (
    <section id="analysis-section" ref={ref} className="relative w-full px-6 py-20 md:px-12 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 font-light text-4xl md:text-5xl text-foreground">
            {t("methodology.title")} <span className="font-bold">{t("methodology.titleBold")}</span>
          </h2>
          <p className="max-w-2xl font-light text-foreground/70 leading-relaxed">{t("methodology.description")}</p>
        </div>

        {/* Pillars grid */}
        {isMobile ? (
          <>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth mb-8"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {pillars.map((pillar, i) => (
                <div key={i} className="flex-shrink-0 w-[85vw] snap-center">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:bg-gradient-to-br hover:from-white/50 hover:via-white/30 flex flex-col">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative z-10 flex-1">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-2xl font-light text-accent">{pillar.number}</span>
                        <h3 className="text-lg font-bold text-foreground">{pillar.title}</h3>
                      </div>

                      <ul className="mb-6 space-y-2 text-sm font-light text-foreground/70">
                        {pillar.items.map((item, j) => (
                          <li key={j} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="border-t border-black/10 pt-4 text-xs font-bold text-foreground/80 mb-6">
                        {pillar.metrics}
                      </div>
                    </div>

                    <button
                      onClick={() => setOpenPopup(pillar.pillarKey)}
                      className="w-full rounded-full border border-black/20 bg-gradient-to-r from-white/30 to-white/20 px-4 py-2 text-sm font-light text-foreground/80 backdrop-blur-md transition-all duration-300 hover:border-black/40 hover:bg-gradient-to-r hover:from-white/40 hover:to-white/30 hover:text-foreground text-center"
                    >
                      Know more
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mb-16">
              {pillars.map((pillar, i) => (
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
                  className={`w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center text-sm font-light ${
                    activePillar === i
                      ? "border-accent bg-accent/10 text-accent font-medium scale-110"
                      : "border-foreground/20 text-foreground/60 hover:border-foreground/40"
                  }`}
                  aria-label={`Go to pillar ${i + 1}`}
                >
                  {pillar.number}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5 mb-16">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className={`group transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:bg-gradient-to-br hover:from-white/50 hover:via-white/30 flex flex-col">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 flex-1">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-2xl font-light text-accent">{pillar.number}</span>
                      <h3 className="text-lg font-bold text-foreground">{pillar.title}</h3>
                    </div>

                    <ul className="mb-6 space-y-2 text-sm font-light text-foreground/70">
                      {pillar.items.map((item, j) => (
                        <li key={j} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-black/10 pt-4 text-xs font-bold text-foreground/80 mb-6">
                      {pillar.metrics}
                    </div>
                  </div>

                  <button
                    onClick={() => setOpenPopup(pillar.pillarKey)}
                    className="w-full rounded-full border border-black/20 bg-gradient-to-r from-white/30 to-white/20 px-4 py-2 text-sm font-light text-foreground/80 backdrop-blur-md transition-all duration-300 hover:border-black/40 hover:bg-gradient-to-r hover:from-white/40 hover:to-white/30 hover:text-foreground text-center"
                  >
                    Know more
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="mb-6 text-lg md:text-xl font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {t("analysis.cta")}
          </p>
          <a
            href="/for-businesses"
            className="inline-block rounded-full bg-black text-white px-8 py-4 font-light transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/30"
          >
            {t("analysis.ctaButton")}
          </a>
        </div>
      </div>

      {openPopup && <PillarPopup pillarKey={openPopup} isOpen={!!openPopup} onClose={() => setOpenPopup(null)} />}
    </section>
  )
}
