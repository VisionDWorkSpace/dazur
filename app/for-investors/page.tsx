"use client"
import { useEffect } from "react"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ForInvestorsPage() {
  const { t, language } = useLanguage()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://api.klick-agency.com/js/form_embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const getLanguageCode = () => {
    switch (language) {
      case "pt":
        return "pt"
      case "es":
        return "es"
      default:
        return "en"
    }
  }

  const scrollToForm = () => {
    document.getElementById("finder")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-white">
      <SharedHeader currentPage="home" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <video autoPlay loop muted playsInline preload="auto" className="h-full w-full object-cover opacity-70">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dazur%20Video%20%281%29-VzqE0aVb2b0g18Zqn59M3qXRjJPrp9.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <div className="relative h-2 w-2">
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
              <div className="relative h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-light text-white/80">{t("Exclusive Investment Opportunities")}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
            {t("investors.title")} <span className="font-bold">{t("investors.titleBold")}</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("investors.subtitle")}
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all hover:scale-105 font-light shadow-2xl shadow-white/20"
          >
            {t("Explore Live Opportunities")}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Precision Section */}
      <section id="opportunities" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-center">
              {t("Precision Over")} <span className="font-bold">{t("Volume")}</span>
            </h2>
            <p className="text-xl font-light text-gray-600 mb-4 text-center max-w-2xl mx-auto">
              {t("You don't need more deals. You need the right ones.")}
            </p>
            <p className="font-light text-gray-600 mb-12 leading-relaxed text-center max-w-3xl mx-auto">
              {t(
                "We screen every opportunity through our internal due diligence process, ensuring you see only assets aligned with institutional standards — not open-market noise.",
              )}
            </p>

            <div className="flex justify-center mb-12">
              <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/3I9wULyoIwE?hl=${getLanguageCode()}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            <p className="text-center text-gray-600 mt-8 font-light text-lg">
              {t("Our goal: to save your time, reduce risk, and expand your access to real value.")}
            </p>

            <div className="text-center mt-8">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-black/90 transition-all hover:scale-105 font-light"
              >
                {t("Start Your Search")}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Finder Form */}
      <section id="finder" className="py-32 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-center">
            {t("Investment Opportunity")} <span className="font-bold">{t("Finder")}</span>
          </h2>
          <p className="text-center font-light text-gray-600 mb-12">
            {t("Define your investment profile and access opportunities that fit your criteria.")}
          </p>

          <iframe
            src="https://api.klick-agency.com/widget/survey/IyUILWlFp9bO9LUJyMLX"
            style={{ border: "none", width: "100%" }}
            scrolling="no"
            id="IyUILWlFp9bO9LUJyMLX"
            title="survey"
          />
        </div>
      </section>

      {/* Call Booking Section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            {t("Ready to")} <span className="font-bold">{t("Discuss Opportunities?")}</span>
          </h2>
          <p className="text-lg font-light text-gray-600 mb-8">
            {t("Schedule a call with our team to explore investment opportunities tailored to your criteria.")}
          </p>
          <a
            href="https://calendar.app.google/iyk2egiYB3Cp7bHq8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-black/90 transition-all hover:scale-105 font-light"
          >
            {t("Schedule a Call")}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
