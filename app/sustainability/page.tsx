"use client"

import { GrainOverlay } from "@/components/grain-overlay"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { useEffect } from "react"

export default function SustainabilityPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <SharedHeader currentPage="other" />

      <div className="relative pt-32 pb-24 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8">Sustainability & ESG</h1>
          <p className="text-sm text-foreground/60 mb-12">
            Our commitment to Environmental, Social, and Governance excellence
          </p>

          <div className="space-y-8 text-foreground/80 font-light">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Our ESG Commitment</h2>
              <p className="leading-relaxed">
                At Dazur Capital, we believe that sustainable business practices are essential for long-term value
                creation. We integrate Environmental, Social, and Governance (ESG) considerations into our advisory
                services and operations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Environmental Responsibility</h2>
              <p className="leading-relaxed mb-4">We are committed to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Promoting sustainable business practices among our clients</li>
                <li>Reducing our carbon footprint through digital-first operations</li>
                <li>Supporting businesses that prioritize environmental stewardship</li>
                <li>Encouraging renewable energy adoption and resource efficiency</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Social Impact</h2>
              <p className="leading-relaxed mb-4">Our social commitments include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Promoting diversity and inclusion in business leadership</li>
                <li>Supporting fair labor practices and employee well-being</li>
                <li>Fostering community engagement and economic development</li>
                <li>Ensuring ethical supply chain management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Governance Excellence</h2>
              <p className="leading-relaxed mb-4">We uphold the highest standards of governance:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Transparent and ethical business practices</li>
                <li>Strong corporate governance frameworks</li>
                <li>Compliance with all applicable regulations</li>
                <li>Protection of stakeholder interests</li>
                <li>Regular ESG reporting and accountability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">ESG Integration in Our Services</h2>
              <p className="leading-relaxed">
                We help our clients integrate ESG factors into their business strategies, recognizing that companies
                with strong ESG performance often achieve better financial results and are more attractive to investors.
                Our advisory services include ESG assessment, strategy development, and implementation support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Continuous Improvement</h2>
              <p className="leading-relaxed">
                We are committed to continuously improving our ESG performance and helping our clients do the same. We
                regularly review and update our practices to align with evolving best practices and stakeholder
                expectations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Contact</h2>
              <p className="leading-relaxed">
                For more information about our sustainability initiatives, please contact us at esg@dazur.capital
              </p>
            </section>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
