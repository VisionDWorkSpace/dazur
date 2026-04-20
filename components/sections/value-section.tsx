"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function ValueSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const insights = [
    {
      title: t("value.scenario"),
      content: t("value.formula"),
    },
    {
      title: t("value.keyInsight"),
      content: t("value.keyInsightText"),
    },
    {
      title: t("value.solution"),
      content: t("value.solutionText"),
      highlight: true,
    },
    {
      title: t("value.dueDiligence"),
      content: t("value.dueDiligenceText"),
    },
  ]

  return (
    <section id="value-section" ref={sectionRef} className="relative w-full px-6 py-20 md:px-12 md:py-32 bg-background">
      <div className="mx-auto max-w-4xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 font-light text-4xl md:text-5xl text-foreground leading-tight">
            {t("value.title")} <span className="font-bold">{t("value.titleBold1")}</span> {t("value.titleBold2")}
          </h2>
          <p className="text-lg font-light text-foreground/70">
            {t("value.subtitle")} <span className="font-bold">{t("value.subtitleBold")}</span>
          </p>
        </div>

        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="relative h-2 w-2">
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
              <div className="relative h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p className="font-light text-sm text-foreground/70">
              <span className="font-bold">{t("value.company")}</span> {t("value.realTimeValue")}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto hover:shadow-xl transition-shadow duration-300">
          <div
            className={`overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white/30 via-white/15 to-white/5 backdrop-blur-xl min-w-[600px] transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="px-6 py-4 text-left text-sm font-light text-foreground/70">{t("value.year")}</th>
                  <th className="px-6 py-4 text-left text-sm font-light text-foreground/70">{t("value.ebitda")}</th>
                  <th className="px-6 py-4 text-left text-sm font-light text-foreground/70">{t("value.multiple")}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">{t("value.finalValue")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5 transition-all duration-300 hover:bg-black/5 hover:scale-[1.01]">
                  <td className="px-6 py-4 text-sm font-bold text-foreground">2020</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">1M</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">6.2x</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">6.2M</td>
                </tr>
                <tr className="border-b border-black/5 transition-all duration-300 hover:bg-orange-500/5 hover:scale-[1.01]">
                  <td className="px-6 py-4 text-sm font-bold text-orange-500">2025</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-500">2M ↑</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-500">2.8x ↓</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-500">5.6M ↓</td>
                </tr>
                <tr className="border-b border-black/5 transition-all duration-300 hover:bg-green-500/5 hover:scale-[1.01] bg-black/5">
                  <td className="px-6 py-4 text-sm font-bold text-green-500">2027</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-500">3M ↑</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-500">6x ↑</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-500">12M ↑</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-2">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`rounded-xl border border-black/10 bg-gradient-to-br from-white/30 via-white/15 to-white/5 p-8 backdrop-blur-md hover:border-black/20 hover:shadow-lg transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <h4 className="mb-3 text-lg font-bold text-foreground/80">{insight.title}</h4>
              {insight.highlight ? (
                <p className="text-base font-light text-foreground/70 leading-relaxed">
                  {insight.content}{" "}
                  <span className="font-bold block mt-2">
                    <span className="text-green-500">↑</span> <span className="font-bold">{t("value.ebitda")}</span>{" "}
                    <span className="text-green-500">↑</span> <span className="font-bold">{t("value.multiple")}</span>
                  </span>
                </p>
              ) : (
                <p className="text-base font-light text-foreground/70 leading-relaxed">{insight.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
