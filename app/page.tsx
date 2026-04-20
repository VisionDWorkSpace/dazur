"use client"

import { GrainOverlay } from "@/components/grain-overlay"
import { SharedHeader } from "@/components/shared-header"
import { HeroSection } from "@/components/sections/hero-section"
import { OpportunitySection } from "@/components/sections/opportunity-section"
import { FooterSection } from "@/components/sections/footer-section"
import { WhatWeDoSection } from "@/components/sections/what-we-do-section"
import { AnalysisSection } from "@/components/sections/analysis-section"
import { IndustriesSection } from "@/components/sections/industries-section"
import { InvestorSection } from "@/components/sections/investor-section"

export default function Home() {
  const scrollToSection = (href: string) => {
    if (href === "#hero-section") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Dazur Capital",
            description: "Market Value Optimization & Capital Advisory",
            url: "https://dazur.capital",
            logo: "https://dazur.capital/favicon.png",
            image: "https://dazur.capital/og-image.png",
            telephone: "+351910800680",
            priceRange: "$$$$",
            areaServed: "Global",
            serviceType: ["Capital Advisory", "Market Value Optimization", "Business Valuation", "M&A Advisory"],
            address: {
              "@type": "PostalAddress",
              addressCountry: "PT",
            },
          }),
        }}
      />

      <main className="relative min-h-screen w-full bg-background">
        <GrainOverlay />

        <SharedHeader currentPage="home" />

        <div className="relative">
          <HeroSection scrollToSection={scrollToSection} />
          <WhatWeDoSection />
          <AnalysisSection />
          <InvestorSection scrollToSection={scrollToSection} />
          <IndustriesSection />
          <OpportunitySection />
          <FooterSection />
        </div>
      </main>
    </>
  )
}
