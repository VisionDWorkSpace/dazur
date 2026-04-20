"use client"

import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

interface StakeholdersSectionProps {
  scrollToSection: (href: string) => void
}

export function StakeholdersSection({ scrollToSection }: StakeholdersSectionProps) {
  const { ref, isVisible } = useReveal(0.2)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeStakeholder, setActiveStakeholder] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

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
      setActiveStakeholder(Math.min(index, stakeholders.length - 1))
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStakeholder((prev) => (prev + 1) % stakeholders.length)

      if (scrollRef.current && isMobile) {
        const nextIndex = (activeStakeholder + 1) % stakeholders.length
        scrollRef.current.scrollTo({
          left: nextIndex * scrollRef.current.offsetWidth,
          behavior: "smooth",
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeStakeholder, isMobile])

  const stakeholders = [
    {
      number: "1",
      title: t("stakeholders.founder.title"),
      description: t("stakeholders.founder.description"),
      points: [
        t("stakeholders.founder.point1"),
        t("stakeholders.founder.point2"),
        t("stakeholders.founder.point3"),
        t("stakeholders.founder.point4"),
      ],
    },
    {
      number: "2",
      title: t("stakeholders.investor.title"),
      description: t("stakeholders.investor.description"),
      points: [
        t("stakeholders.investor.point1"),
        t("stakeholders.investor.point2"),
        t("stakeholders.investor.point3"),
        t("stakeholders.investor.point4"),
        t("stakeholders.investor.point5"),
      ],
    },
    {
      number: "3",
      title: t("stakeholders.partner.title"),
      description: t("stakeholders.partner.description"),
      points: [
        t("stakeholders.partner.point1"),
        t("stakeholders.partner.point2"),
        t("stakeholders.partner.point3"),
        t("stakeholders.partner.point4"),
        t("stakeholders.partner.point5"),
      ],
    },
  ]

  return (
    <section id="stakeholders-section" ref={ref} className="relative w-full px-6 py-20 md:px-12 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 font-light text-4xl md:text-5xl text-foreground">
            <span className="font-bold">{t("stakeholders.title")}</span>
          </h2>
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
              {stakeholders.map((stakeholder, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-[85vw] snap-center transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:bg-gradient-to-br hover:from-white/50 hover:via-white/30">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-4">
                        <span className="text-3xl font-light text-accent">{stakeholder.number}</span>
                      </div>

                      <h3 className="mb-3 text-2xl font-light text-foreground">
                        <span className="font-bold">{stakeholder.title}</span>
                      </h3>
                      <p className="mb-6 text-sm font-light text-foreground/70">{stakeholder.description}</p>

                      <ul className="mb-8 space-y-2 text-sm font-light text-foreground/70">
                        {stakeholder.points.map((point, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-accent">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="https://wa.me/351910800680?text=I%20am%20interested%20to%20know%20my%20business%20market%20value"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MagneticButton variant="secondary" size="default">
                          {t("stakeholders.startNow")}
                        </MagneticButton>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mb-16">
              {stakeholders.map((stakeholder, i) => (
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
                    activeStakeholder === i
                      ? "border-accent bg-accent/10 text-accent font-medium scale-110"
                      : "border-foreground/20 text-foreground/60 hover:border-foreground/40"
                  }`}
                  aria-label={`Go to stakeholder ${i + 1}`}
                >
                  {stakeholder.number}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {stakeholders.map((stakeholder, i) => (
              <div
                key={i}
                className={`transition-all duration-700 md:translate-y-0 ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{
                  transitionDelay: `${i * 150}ms`,
                  transform: isVisible ? "translateY(0) scale(1)" : `translateY(${(3 - i) * 20}px) scale(0.95)`,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`group relative h-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:border-black/20 hover:bg-gradient-to-br hover:from-white/50 hover:via-white/30 hover:scale-105 hover:shadow-2xl ${
                    hoveredCard === i ? "z-10" : ""
                  }`}
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4">
                      <span className="text-3xl font-light text-accent">{stakeholder.number}</span>
                    </div>

                    <h3 className="mb-3 text-2xl font-light text-foreground">
                      <span className="font-bold">{stakeholder.title}</span>
                    </h3>
                    <p className="mb-6 text-sm font-light text-foreground/70">{stakeholder.description}</p>

                    <ul className="mb-8 space-y-2 text-sm font-light text-foreground/70">
                      {stakeholder.points.map((point, j) => (
                        <li key={j} className="flex gap-2 transition-all duration-300 hover:translate-x-1">
                          <span className="text-accent">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/351910800680?text=I%20am%20interested%20to%20know%20my%20business%20market%20value"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MagneticButton variant="secondary" size="default">
                        {t("stakeholders.startNow")}
                      </MagneticButton>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
