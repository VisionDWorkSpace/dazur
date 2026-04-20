"use client"

import { GrainOverlay } from "@/components/grain-overlay"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { useEffect } from "react"

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <SharedHeader currentPage="other" />

      <div className="relative pt-32 pb-24 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8">Privacy Policy</h1>
          <p className="text-sm text-foreground/60 mb-12">Last updated: January 31, 2025</p>

          <div className="space-y-8 text-foreground/80 font-light">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Dazur Capital ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website or use
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Business information (company name, VAT number, website, LinkedIn profile)</li>
                <li>Financial information (revenue, costs, EBITDA)</li>
                <li>Business operational data (employees, assets, intellectual property)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Assess your business readiness for investment</li>
                <li>Communicate with you about our services</li>
                <li>Analyze and understand how you use our services</li>
                <li>Develop new products and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">4. Information Sharing and Disclosure</h2>
              <p className="leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                with trusted partners who assist us in operating our website, conducting our business, or servicing you,
                as long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">6. Your Rights</h2>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">7. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@dazur.capital
              </p>
            </section>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
