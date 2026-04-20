"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function OpportunitySection() {
  const { ref, isVisible } = useReveal(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} className="relative w-full px-6 py-20 md:px-12 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl flex flex-col items-center">
        <div className="mb-16 w-full max-w-3xl">
          <p
            className={`mb-8 font-light italic text-foreground/80 md:text-lg text-center transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {t("opportunity.text")}
          </p>

          <div
            className={`mb-12 aspect-video w-full overflow-hidden rounded-3xl border border-black/10 bg-black transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/bSNiGzdhBsU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <Link href="/for-businesses#calculator">
              <MagneticButton variant="primary" size="lg">
                {t("opportunity.startBusiness")}
              </MagneticButton>
            </Link>
            <Link href="/for-investors#finder">
              <MagneticButton variant="secondary" size="lg">
                {t("opportunity.startInvestor")}
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
