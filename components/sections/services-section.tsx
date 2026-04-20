"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

const services = [
  {
    title: "Capital & Transaction Strategy",
    description:
      "We manage end-to-end capital transactions — Internacionalize by Acquisition, Vertical Acquisitions, M&A mandates, private equity placements, IPO preparation, assets transactions and debt structuring — aligning every deal with investor expectations, market timing, and post-exit re-investment strategies.",
  },
  {
    title: "Tech Development & AI",
    description:
      "We understand that every business is unique, and we work with you to develop tech solutions that meet your specific needs. Our team of experts will work with you to develop a personalized solution that will help you achieve your goals.",
  },
  {
    title: "Incentives Applications",
    description:
      "We secure access to grants and government incentives that fuel growth and liquidity without equity dilution, aligning funding with long-term value creation.",
  },
  {
    title: "Public Contracts & Tenders Strategy",
    description:
      "We position companies to win public tenders and institutional contracts, creating predictable recurring revenues and stronger commercial valuation multiples.",
  },
  {
    title: "Procurement & Risk Management",
    description:
      "We integrate businesses into private procurement networks, supply chain optimization and corporate frameworks, expanding deal flow and reinforcing enterprise-grade valuation.",
  },
  {
    title: "Market Value Optimization",
    description:
      "We align your operations and our partner ecosystem with investor expectations, ensuring every execution enhances scalability, efficiency, and valuation potential — making your business more attractive to investors.",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.2)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="services-section" ref={ref} className="relative w-full px-6 py-20 md:px-12 md:py-32 bg-background">
      <div className="mx-auto max-w-4xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 font-light text-4xl md:text-5xl text-foreground">Our Services</h2>
          <p className="mb-2 font-light text-lg text-foreground/80">Where Value Becomes Capital</p>
          <p className="font-light text-sm text-foreground/60 max-w-3xl mx-auto">
            Our core business: converting operational excellence into realized market value through strategic capital
            transactions.
          </p>
        </div>

        <div className="mb-12 space-y-4">
          {services.map((service, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full text-left border border-black/10 rounded-2xl p-6 hover:border-black/20 transition-all duration-300 bg-gradient-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-light text-foreground pr-4">{service.title}</h3>
                  <div
                    className={`flex-shrink-0 transition-transform duration-300 ${expandedIndex === i ? "rotate-180" : ""}`}
                  >
                    <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === i ? "max-h-96 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-sm font-light text-foreground/70 leading-relaxed">{service.description}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:border-black/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-light text-foreground mb-4">Ready to Optimize Your Value?</h3>
              <p className="text-sm font-light text-foreground/70 mb-8">
                Whether you're seeking capital or looking to invest, we're here to help
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/for-investors#finder"
                className="px-8 py-4 bg-accent text-white rounded-full hover:bg-accent/90 transition-all hover:scale-105 font-medium text-center"
              >
                Start as Investor
              </a>
              <a
                href="/for-businesses#calculator"
                className="px-8 py-4 border-2 border-accent text-accent rounded-full hover:bg-accent/10 transition-all hover:scale-105 font-medium text-center"
              >
                Start as Company
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
