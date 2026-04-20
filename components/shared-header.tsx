"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { MobileMenuTrigger } from "@/components/mobile-menu-trigger"
import { LanguageDropdown } from "@/components/language-dropdown"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface SharedHeaderProps {
  currentPage?: "home" | "other"
}

export function SharedHeader({ currentPage = "other" }: SharedHeaderProps) {
  const [hasScroll, setHasScroll] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { label: t("nav.marketValue"), href: "#analysis-section", isExternal: false },
    { label: t("nav.forBusinesses"), href: "/for-businesses", isExternal: true },
    { label: t("nav.forInvestors"), href: "/for-investors", isExternal: true },
    { label: t("nav.techVenture"), href: "/tech-venture", isExternal: true },
  ]

  useEffect(() => {
    const onScroll = () => setHasScroll(window.scrollY > 0)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = (href: string, isExternal: boolean) => {
    if (isExternal) {
      router.push(href)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
    } else if (pathname !== "/") {
      router.push(`/${href}`)
    } else {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl md:px-12 transition-all duration-500 ${
        hasScroll || currentPage === "other"
          ? "border-b border-foreground/10 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <div
          className={`text-xl font-light tracking-tight transition-all duration-300 ${
            hasScroll || currentPage === "other" ? "text-foreground" : "text-white"
          } group-hover:scale-105`}
        >
          Dazur<span className="text-accent">.</span>
        </div>
        <div
          className={`text-xs font-light transition-all duration-300 ${
            hasScroll || currentPage === "other" ? "text-foreground/60" : "text-white/60"
          }`}
        >
          capital
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavClick(item.href, item.isExternal)}
            className={`text-sm font-light transition-all hover:scale-105 ${
              hasScroll || currentPage === "other"
                ? "text-foreground/80 hover:text-foreground"
                : "text-white/80 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <a
          href="/for-businesses#calculator"
          onClick={(e) => {
            e.preventDefault()
            router.push("/for-businesses")
            setTimeout(() => {
              const element = document.querySelector("#calculator")
              element?.scrollIntoView({ behavior: "smooth" })
            }, 300)
          }}
        >
          <MagneticButton
            variant="secondary"
            size="default"
            className={`hidden md:flex transition-all hover:scale-105 ${
              hasScroll || currentPage === "other" ? "" : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            {t("nav.start")}
          </MagneticButton>
        </a>

        <div className="hidden md:block">
          <LanguageDropdown hasScroll={hasScroll || currentPage === "other"} />
        </div>

        <MobileMenuTrigger hasScroll={hasScroll || currentPage === "other"} />
      </div>
    </header>
  )
}
