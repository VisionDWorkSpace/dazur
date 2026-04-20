"use client"

import { GrainOverlay } from "@/components/grain-overlay"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { useEffect } from "react"

export default function TermsConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <SharedHeader currentPage="other" />

      <div className="relative pt-32 pb-24 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8">Terms & Conditions</h1>
          <p className="text-sm text-foreground/60 mb-12">Last updated: January 31, 2025</p>

          <div className="space-y-8 text-foreground/80 font-light">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using Dazur Capital's services, you agree to be bound by these Terms and Conditions. If
                you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">2. Services Description</h2>
              <p className="leading-relaxed">
                Dazur Capital provides business valuation, investment readiness assessment, and strategic advisory
                services. Our services are designed to help businesses optimize their operations and prepare for capital
                raising or exit opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">3. User Obligations</h2>
              <p className="leading-relaxed mb-4">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Use our services in compliance with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, features, and functionality of our services are owned by Dazur Capital and are protected by
                international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">5. Limitation of Liability</h2>
              <p className="leading-relaxed">
                Dazur Capital shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">6. Disclaimer</h2>
              <p className="leading-relaxed">
                Our services are provided "as is" without warranties of any kind. We do not guarantee specific results
                or outcomes from using our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">7. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Portugal, without regard
                to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">8. Contact Information</h2>
              <p className="leading-relaxed">
                For questions about these Terms and Conditions, please contact us at legal@dazur.capital
              </p>
            </section>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
