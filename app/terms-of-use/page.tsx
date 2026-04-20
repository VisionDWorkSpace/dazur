"use client"

import { GrainOverlay } from "@/components/grain-overlay"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { useEffect } from "react"

export default function TermsOfUsePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <SharedHeader currentPage="other" />

      <div className="relative pt-32 pb-24 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8">Terms of Use</h1>
          <p className="text-sm text-foreground/60 mb-12">Last updated: January 31, 2025</p>

          <div className="space-y-8 text-foreground/80 font-light">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                Welcome to Dazur Capital. By accessing and using this website, you accept and agree to be bound by the
                terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">2. Use License</h2>
              <p className="leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on Dazur Capital's website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">3. Disclaimer</h2>
              <p className="leading-relaxed">
                The materials on Dazur Capital's website are provided on an 'as is' basis. Dazur Capital makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">4. Limitations</h2>
              <p className="leading-relaxed">
                In no event shall Dazur Capital or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on Dazur Capital's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">5. Accuracy of Materials</h2>
              <p className="leading-relaxed">
                The materials appearing on Dazur Capital's website could include technical, typographical, or
                photographic errors. Dazur Capital does not warrant that any of the materials on its website are
                accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">6. Links</h2>
              <p className="leading-relaxed">
                Dazur Capital has not reviewed all of the sites linked to its website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by Dazur Capital
                of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">7. Modifications</h2>
              <p className="leading-relaxed">
                Dazur Capital may revise these terms of use for its website at any time without notice. By using this
                website you are agreeing to be bound by the then current version of these terms of use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">8. Contact</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Use, please contact us at info@dazur.capital
              </p>
            </section>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
