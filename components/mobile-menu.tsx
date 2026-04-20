"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LanguageDropdown } from "@/components/language-dropdown"
import { X } from "lucide-react"
import { useMobileMenu } from "@/contexts/mobile-menu-context"
import { useLanguage } from "@/contexts/language-context"

export function MobileMenu() {
  const { isOpen, close } = useMobileMenu()
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuItems = [
    { label: t("nav.marketValue"), href: "#analysis-section", isExternal: false },
    { label: t("nav.forBusinesses"), href: "/for-businesses", isExternal: true },
    { label: t("nav.forInvestors"), href: "/for-investors", isExternal: true },
    { label: t("nav.techVenture"), href: "/tech-venture", isExternal: true },
  ]

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
    close()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div className="absolute inset-0 bg-white" />

      <div className="relative h-full w-full flex flex-col px-6 py-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="text-2xl font-light text-foreground">
            Dazur<span className="text-accent">.</span>
          </div>
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
                close()
              }}
              className="px-6 py-2 border border-foreground/20 rounded-full text-sm font-light hover:bg-foreground/5 transition-colors"
            >
              {t("nav.start")}
            </a>
            <button
              onClick={close}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href, item.isExternal)}
              className="block w-full text-left text-3xl md:text-4xl font-light py-6 border-b border-foreground/10 hover:text-accent transition-all duration-300 animate-in fade-in slide-in-from-left-8"
              style={{ animationDelay: `${(i + 1) * 100}ms`, animationFillMode: "backwards" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
          <LanguageDropdown hasScroll={true} />
        </div>
      </div>
    </div>
  )
}
