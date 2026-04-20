"use client"
import type { ReactElement } from "react"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { useEffect } from "react"

export default function TechVenturePage(): ReactElement {
  const { t } = useLanguage()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://api.klick-agency.com/js/form_embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const creationsForClients = [
    {
      name: "Multipark",
      subtitle: "webapp",
      image: "/images/1.png",
    },
    {
      name: "Incentivio",
      subtitle: "webapp + app",
      image: "/images/2.png",
    },
    {
      name: "Forrestry AI",
      subtitle: "webapp",
      image: "/images/3.png",
    },
    {
      name: "We love night",
      subtitle: "marketplace",
      image: "/images/4.png",
    },
  ]

  const ongoingCreations = [
    {
      name: "Regnity",
      amount: "3 M",
      image: "/images/7.png",
    },
    {
      name: "Worklab",
      amount: "1.5 M",
      image: "/images/8.png",
    },
    {
      name: "Live Commerce",
      amount: "1.7 M",
      image: "/images/9.png",
    },
    {
      name: "Incentivio",
      amount: "2.4 M",
      image: "/images/10.png",
    },
    {
      name: "Iventora",
      amount: "7.8 M",
      image: "/images/11.png",
    },
  ]

  const portfolioLogos = [
    "/images/56-RS87a.svg",
    "/images/57-hCT5D.svg",
    "/images/58-Wn8JS.svg",
    "/images/59-2usyN.svg",
    "/images/60-NNGN9.svg",
    "/images/61-1tOTQ.svg",
    "/images/62-C4VQA.svg",
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

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
            {t("Pioneering the future")} <br />
            <span className="font-bold">{t("of investment.")}</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-white/80 mb-12">{t("The new Intelligence of Capital")}</p>

          <a
            href="#venture-form"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all hover:scale-105 font-light shadow-2xl"
          >
            {t("Start Now")}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Portfolio Logos - Removed blur/opacity overlay */}
      <section className="py-16 px-6 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-12 animate-scroll">
            {[...portfolioLogos, ...portfolioLogos].map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Portfolio company"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creations for Clients - Image zooms on hover, card doesn't expand */}
      <section id="ventures" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">{t("Creations for Clients")}</h2>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {creationsForClients.map((creation, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 md:w-96 snap-start rounded-3xl overflow-hidden relative h-96 group"
              >
                <Image
                  src={creation.image || "/placeholder.svg"}
                  alt={creation.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 h-full flex flex-col justify-end p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{creation.name}</h3>
                  <p className="text-lg font-light opacity-90">{creation.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Ongoing Creations - Updated to use background images with text overlay */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-light">{t("Our Ongoing Creations")}</h2>
            <span className="text-sm font-light italic text-gray-500">{t("Pre-seed to IPO")}</span>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {ongoingCreations.map((creation, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 md:w-96 snap-start rounded-3xl overflow-hidden relative h-96 group"
              >
                <Image
                  src={creation.image || "/placeholder.svg"}
                  alt={creation.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="relative z-20 h-full flex flex-col justify-end p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{creation.name}</h3>
                  <p className="text-lg font-light opacity-90">
                    {t("Raising")} {creation.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideas to co-invest */}
      <section id="venture-form" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">{t("Ideas to co-invest")}</h2>
          <p className="text-lg font-light text-gray-600 mb-12">{t("min. ticket 250k")}</p>

          <p className="text-xl font-light mb-8">{t("Want to invest with us or want to create together, pitch us!")}</p>

          <div className="max-w-3xl mx-auto">
            <iframe
              src="https://api.klick-agency.com/widget/survey/6bGWviw7IJnjJEUE5VyM"
              style={{ border: "none", width: "100%" }}
              scrolling="no"
              id="6bGWviw7IJnjJEUE5VyM"
              title="survey"
            />
          </div>
        </div>
      </section>

      <FooterSection />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}
