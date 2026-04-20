"use client"

import { useLanguage } from "@/contexts/language-context"

interface HeroSectionProps {
  scrollToSection: (href: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 bg-black">
        <video autoPlay loop muted playsInline preload="auto" className="h-full w-full object-cover opacity-70">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dazur%20Video%20%281%29-VzqE0aVb2b0g18Zqn59M3qXRjJPrp9.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 py-20 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl md:text-7xl font-light tracking-tight text-white leading-tight animate-in fade-in slide-in-from-bottom duration-700">
            {t("hero.title")}
          </h1>

          <p className="mb-12 text-lg md:text-xl font-light text-white/80 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-150">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <a
              href="/for-businesses#calculator"
              className="rounded-full bg-white text-black px-8 py-3 font-light transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
            >
              {t("hero.forBusinesses")}
            </a>
            <a
              href="/for-investors#finder"
              className="rounded-full border-2 border-white text-white px-8 py-3 font-light transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
            >
              {t("hero.forInvestors")}
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center gap-2 animate-in fade-in duration-1000 delay-700">
            <span className="text-sm font-light text-white/60">{t("hero.scrollToExplore")}</span>
            <div className="flex items-center gap-2 animate-bounce">
              <div className="h-1 w-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
