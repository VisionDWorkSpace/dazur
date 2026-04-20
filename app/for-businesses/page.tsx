"use client"
import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ForBusinessesPage(): ReactElement {
  const { t, language } = useLanguage()
  const [transactionCount, setTransactionCount] = useState(1247)
  const [dealType, setDealType] = useState<"company" | "asset">("company")
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.message === "Script error." ||
        event.message === "" ||
        (event.filename && event.filename.includes("klick-agency.com"))
      ) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
        return true
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && typeof event.reason === "string" && event.reason.includes("klick-agency")) {
        event.preventDefault()
        event.stopPropagation()
        return true
      }
    }

    window.addEventListener("error", handleError, true)
    window.addEventListener("unhandledrejection", handleUnhandledRejection, true)
    return () => {
      window.removeEventListener("error", handleError, true)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection, true)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactionCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
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

  const faqs = [
    {
      question: t("How long does the process take?"),
      answer: t(
        "The typical process takes 3-18 months depending on the asset type and market conditions. We provide weekly updates on buyer pipeline and match count throughout the entire process.",
      ),
    },
    {
      question: t("What is the retainer and how does it work?"),
      answer: t(
        "The retainer covers all costs including document creation, marketing materials, and buyer sourcing. If we don't close within the planned timeline, we refund the full retainer. Upon successful sale, the retainer is deducted from the success fee.",
      ),
    },
    {
      question: t("What documents do I need to provide?"),
      answer: t(
        "After verification, we'll provide a detailed list of required documents specific to your asset type. This typically includes financial statements, legal documents, and operational data. We help you prepare everything needed.",
      ),
    },
    {
      question: t("How do you protect my confidentiality?"),
      answer: t(
        "We use blind teasers initially, revealing your identity only after investors sign NDAs. All buyer prospects are pre-qualified and vetted before receiving any detailed information about your asset.",
      ),
    },
    {
      question: t("What types of assets do you handle?"),
      answer: t(
        "We handle companies, commercial real estate, intellectual property, and other high-value assets. Each asset is evaluated individually to ensure we can provide the best service and buyer matching.",
      ),
    },
    {
      question: t("How are buyers matched to my asset?"),
      answer: t(
        "We maintain a curated network of verified investors and buyers. Using our proprietary matching system, we identify prospects based on investment criteria, industry focus, ticket size, and strategic fit.",
      ),
    },
  ]

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
          <h1 className="text-4xl md:text-7xl font-light text-white mb-6 leading-tight text-balance">
            {t("Find Out What Your Asset Is")} {t("Really Worth")}
          </h1>

          <p className="text-xl md:text-2xl font-light text-white/80 mb-8 max-w-3xl mx-auto">
            {t("Before the Market Decides for You")}
          </p>

          <p className="text-lg font-light text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t(
              "Real estate, companies and high-value assets, changes value with time. Knowing what buyers will pay before it's too late.",
            )}
          </p>

          <a
            href="#calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all hover:scale-105 font-light shadow-2xl shadow-white/20"
          >
            {t("Check Your Asset Value Now")}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md border border-black/10 rounded-full mb-8">
              <div className="relative h-3 w-3">
                <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping" />
                <div className="relative h-3 w-3 rounded-full bg-orange-500" />
              </div>
              <span className="font-light text-gray-700">
                <span className="font-bold text-2xl text-black">{transactionCount.toLocaleString()}</span>{" "}
                {t("Live transactions")}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight max-w-3xl mx-auto">
              {t("Market Timing Is")} <span className="font-bold">{t("Everything")}</span>
            </h2>

            <p className="text-xl font-light text-gray-600 mb-6 max-w-2xl mx-auto">
              {t("Every deal, every buyer, every valuation shift happens in real-time across the market.")}
            </p>

            <div className="my-12 max-w-3xl mx-auto">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/my-8RINJ5ow"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="font-light text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto">
              {t(
                "Whether it's a business, commercial real estate, or intellectual property — assets are constantly changing value. Don't waste years of work and potential returns.",
              )}
            </p>

            <p className="text-lg font-bold text-gray-900 mb-8 max-w-3xl mx-auto">
              {t(
                "Fill the form and get the fastest, most dedicated sale process in the market. We only accept verified projects with matched buyers.",
              )}
            </p>

            <a
              href="#calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-black/90 transition-all hover:scale-105 font-light"
            >
              {t("Get Started Now")}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light mb-6">{t("businesses.form.heading")}</h2>
            <p className="text-lg font-light text-gray-600 mb-8">
              {t(
                "Complete the form below and our team will analyze your asset and match you with qualified buyers within 48 hours.",
              )}
            </p>

            <div className="flex flex-col items-center gap-4 mb-8">
              <p className="text-base font-medium text-gray-700">{t("Select your type of Deal")}:</p>
              <div className="inline-flex items-center gap-2 p-1 bg-gray-100 rounded-full">
                <button
                  onClick={() => setDealType("company")}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    dealType === "company"
                      ? "bg-black text-white shadow-lg"
                      : "bg-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("Company")}
                </button>
                <button
                  onClick={() => setDealType("asset")}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    dealType === "asset"
                      ? "bg-black text-white shadow-lg"
                      : "bg-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("Asset")}
                </button>
              </div>
            </div>
          </div>

          {dealType === "company" ? (
            <iframe
              src="https://api.klick-agency.com/widget/survey/7BXHqilbIVX0uA7eaeVG"
              style={{ border: "none", width: "100%", height: mounted ? "3000px" : "800px" }}
              id="7BXHqilbIVX0uA7eaeVG"
              title="survey"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <iframe
              src="https://api.klick-agency.com/widget/survey/1wOoWUzOfs1Q8wAjeEyK"
              style={{ border: "none", width: "100%", height: mounted ? "3000px" : "800px" }}
              id="1wOoWUzOfs1Q8wAjeEyK"
              title="survey"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            />
          )}
        </div>
      </section>

      {/* Call Booking Section */}
      <section className="py-12 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            {t("Need Help?")} <span className="font-bold">{t("Let's Talk")}</span>
          </h2>
          <p className="text-lg font-light text-gray-600 mb-8">
            {t("Schedule a free consultation to discuss your asset valuation and sale strategy.")}
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

      {/* FAQs Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              {t("Frequently Asked")} <span className="font-bold">{t("Questions")}</span>
            </h2>
            <p className="text-lg font-light text-gray-600">{t("Everything you need to know about our process")}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-lg pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="font-light text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
