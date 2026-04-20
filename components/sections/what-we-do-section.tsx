"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { useLanguage } from "@/contexts/language-context"
import { PillarPopup } from "@/components/pillar-popup"

export function WhatWeDoSection() {
  const { ref, isVisible } = useReveal(0.2)
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [rotation, setRotation] = useState(0)
  const { t } = useLanguage()
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)

  const industries = [
    {
      title: t("industry.realEstate"),
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    },
    {
      title: t("industry.infrastructure"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-11-08%2C%20a%CC%80s%2019.29.12-XgPoly6Ijt22UkyKQNLyO2gk9GtUna.png",
    },
    {
      title: t("industry.lifeSciences"),
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80",
    },
    {
      title: t("industry.hospitality"),
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
    },
    {
      title: t("industry.industrial"),
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
    },
    {
      title: t("industry.commodities"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20ecra%CC%83%202025-11-08%2C%20a%CC%80s%2019.28.53-jZyk6WGxhRMf0ypOZG7yKTOuigkAFd.png",
    },
    {
      title: t("industry.consulting"),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
    },
    {
      title: t("industry.financial"),
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    },
    {
      title: t("industry.transport"),
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80",
    },
    {
      title: t("industry.tmt"),
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    },
  ]

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360)
    }, 16)
    return () => clearInterval(rotationInterval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industries.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [industries.length])

  const getPosition = (index: number, isMobile = false) => {
    const angle = (index * 360) / industries.length
    const radius = isMobile ? 100 : 180
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = Math.sin((angle * Math.PI) / 180) * radius
    return { x, y }
  }

  return (
    <section id="what-we-do-section" ref={ref} className="relative w-full px-6 py-16 md:py-24 bg-background">
      <PillarPopup pillarKey={selectedPillar || ""} isOpen={!!selectedPillar} onClose={() => setSelectedPillar(null)} />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-3 font-light text-xs md:text-sm text-foreground/60 tracking-wide">
            {t("whatWeDo.header")}
          </h2>
          <h3 className="mb-4 font-light text-2xl md:text-4xl lg:text-5xl text-foreground leading-tight px-4">
            {t("whatWeDo.title")} <span className="font-bold">{t("whatWeDo.titleBold")}</span>
          </h3>
          <p className="text-xs md:text-base text-foreground/70 max-w-3xl mx-auto leading-relaxed px-4">
            {t("whatWeDo.subtitle")}
          </p>
        </div>

        <div
          className={`relative mx-auto mb-12 md:mb-20 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Circular layout - responsive for all screen sizes */}
          <div className="relative w-full h-[280px] md:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {industries.map((industry, i) => {
                  const pos = getPosition(i, typeof window !== "undefined" && window.innerWidth < 768)
                  const isActive = i === activeIndustry
                  return (
                    <div
                      key={i}
                      onClick={() => setActiveIndustry(i)}
                      className="absolute transition-all duration-700 cursor-pointer"
                      style={{
                        left: `calc(50% + ${pos.x}px)`,
                        top: `calc(50% + ${pos.y}px)`,
                        transform: `translate(-50%, -50%) rotate(${-rotation}deg) scale(${isActive ? 1.1 : 0.9})`,
                        opacity: isActive ? 1 : 0.6,
                        zIndex: isActive ? 10 : 1,
                      }}
                    >
                      <div
                        className={`w-12 h-12 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-700 hover:scale-110 ${
                          isActive
                            ? "border-accent shadow-lg shadow-accent/20"
                            : "border-foreground/20 hover:border-accent/50"
                        }`}
                      >
                        <img
                          src={industry.image || "/placeholder.svg"}
                          alt={industry.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Center: Active industry name */}
              <div className="relative z-20 text-center px-4 pointer-events-none">
                <h4 className="text-sm md:text-3xl font-light text-foreground whitespace-pre-line leading-tight transition-all duration-500">
                  {industries[activeIndustry].title}
                </h4>
              </div>
            </div>
          </div>

          {/* EBITDA Target */}
          <div className="text-center mt-8 md:mt-12">
            <p className="text-lg md:text-2xl font-light text-foreground mb-4">{t("whatWeDo.ebitda")}</p>
            <a
              href="https://wa.me/351910800680?text=I%20am%20interested%20to%20know%20my%20business%20market%20value"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-foreground text-background rounded-full font-light text-sm md:text-base hover:scale-105 transition-all duration-300"
            >
              {t("whatWeDo.target")}
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <TextBlock delay={400}>
            <div className="flex flex-col items-center gap-2">
              <span>
                {t("whatWeDo.pillar1")} <strong className="font-semibold">{t("whatWeDo.pillar1Bold")}</strong>:
              </span>
              <span className="flex flex-wrap justify-center gap-1 items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedPillar("commercial")
                  }}
                  className="font-bold hover:text-accent transition-colors cursor-pointer"
                >
                  Commercial
                </button>
                <span className="font-bold text-foreground/40">|</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedPillar("intangible")
                  }}
                  className="font-bold hover:text-accent transition-colors cursor-pointer"
                >
                  Intangible
                </button>
                <span className="font-bold text-foreground/40">|</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedPillar("physical")
                  }}
                  className="font-bold hover:text-accent transition-colors cursor-pointer"
                >
                  Physical
                </button>
                <span className="font-bold text-foreground/40">|</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedPillar("people")
                  }}
                  className="font-bold hover:text-accent transition-colors cursor-pointer"
                >
                  People
                </button>
                <span className="font-bold text-foreground/40">|</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedPillar("financial")
                  }}
                  className="font-bold hover:text-accent transition-colors cursor-pointer"
                >
                  Financial
                </button>
              </span>
            </div>
          </TextBlock>

          <TextBlock delay={500}>
            {t("whatWeDo.pillar2")} <strong className="font-semibold">{t("whatWeDo.pillar2Bold")}</strong>{" "}
            {t("whatWeDo.pillar2Text")} <strong className="font-semibold">{t("whatWeDo.pillar2Bold2")}</strong>{" "}
            {t("whatWeDo.pillar2Text2")} <strong className="font-semibold">{t("whatWeDo.pillar2Bold3")}</strong>.
          </TextBlock>

          <TextBlock delay={600}>
            {t("whatWeDo.pillar3")} <strong className="font-semibold">{t("whatWeDo.pillar3Bold")}</strong>{" "}
            {t("whatWeDo.pillar3Text")} <strong className="font-semibold">{t("whatWeDo.pillar3Bold2")}</strong>:{" "}
            {t("whatWeDo.pillar3Text2")}
          </TextBlock>

          <TextBlock delay={700}>
            {t("whatWeDo.pillar4")} <strong className="font-semibold">{t("whatWeDo.pillar4Bold")}</strong>
            {t("whatWeDo.pillar4Text")} <strong className="font-semibold">{t("whatWeDo.pillar4Bold2")}</strong>{" "}
            {t("whatWeDo.pillar4Text2")}
          </TextBlock>
        </div>
      </div>
    </section>
  )
}

function TextBlock({ children, delay }: { children: React.ReactNode; delay: number }) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <div
      ref={ref}
      className={`text-center px-4 md:px-8 py-4 transition-all duration-700 hover:scale-[1.02] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-sm md:text-lg font-light text-foreground/80 leading-relaxed">{children}</p>
    </div>
  )
}
