"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useRef, useState } from "react"

interface InvestorSectionProps {
  scrollToSection: (href: string) => void
}

export function InvestorSection({ scrollToSection }: InvestorSectionProps) {
  const { ref, isVisible } = useReveal(0.2)
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft
      const cardWidth = scrollContainer.offsetWidth
      const index = Math.round(scrollLeft / cardWidth)
      setActiveCard(Math.min(index, 2))
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const benefits = [
    {
      title: t("investors.benefit1.title"),
      description: t("investors.benefit1.description"),
      points: [
        "Live qualified deal pipeline",
        "Pre-screened across 5 value pillars",
        "Multi-industry coverage",
        "Detailed company profiles",
        "Direct access to principals",
      ],
    },
    {
      title: t("investors.benefit2.title"),
      description: t("investors.benefit2.description"),
      points: [
        "EBITDA optimization completed",
        "Multiple spread enhancement",
        "Risk factors mitigated",
        "Clear value creation roadmap",
        "Investment-ready structures",
      ],
    },
    {
      title: t("investors.benefit3.title"),
      description: t("investors.benefit3.description"),
      points: [
        "Transparent valuation models",
        "Historical & projected metrics",
        "Market timing analysis",
        "Exit strategy alignment",
        "Portfolio diversification options",
      ],
    },
  ]

  return (
    <section id="investors-section" ref={ref} className="relative w-full px-6 py-20 md:px-12 md:py-32 bg-black">
      <div className="mx-auto max-w-7xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-4xl md:text-6xl font-light text-white">
            {t("investors.title")} <span className="font-bold">{t("investors.titleBold")}</span>
          </h2>
          <p className="text-lg md:text-xl font-light text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t("investors.subtitle")}
          </p>
        </div>

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
              {benefits.map((benefit, i) => (
                <div key={i} className="flex-shrink-0 w-[85vw] snap-center">
                  <div className="h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-base font-light text-white/70 mb-6 leading-relaxed">{benefit.description}</p>
                    <ul className="space-y-3">
                      {benefit.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-orange-500 mt-1.5 flex-shrink-0 text-lg">•</span>
                          <span className="text-sm font-light text-white/90 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mb-12">
              {benefits.map((_, i) => (
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCard === i ? "bg-orange-500 w-8" : "bg-white/30"
                  }`}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-8 md:grid-cols-3 mb-12 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-base font-light text-white/70 mb-6 leading-relaxed">{benefit.description}</p>
                  <ul className="space-y-3">
                    {benefit.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-orange-500 mt-1.5 flex-shrink-0 text-lg">•</span>
                        <span className="text-sm font-light text-white/90 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`flex justify-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <a
            href="/for-investors"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full hover:bg-white/90 transition-all hover:scale-105 text-lg font-light shadow-xl hover:shadow-2xl"
          >
            {t("investors.cta")}
          </a>
        </div>
      </div>
    </section>
  )
}
