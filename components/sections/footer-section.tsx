"use client"

import { useLanguage } from "@/contexts/language-context"

export function FooterSection() {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full border-t border-black/10 px-6 py-16 md:px-12 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-2 text-lg font-light text-foreground">
              Dazur<span className="text-accent">.</span>
            </div>
            <p className="text-xs font-light text-foreground/60">capital</p>

            <div className="mt-4 text-xs font-light text-foreground/50">
              <p>Amoreiras Torre 3 piso 6</p>
              <p>sala 604, Lisboa</p>
            </div>
            {/* </CHANGE> */}

            <a
              href="https://www.linkedin.com/company/dazurcapital"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* </CHANGE> */}

            <p className="mt-4 text-xs font-light text-foreground/50">© 2025 Dazur Capital</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-light text-foreground">{t("footer.knowledge")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("nav.marketValue"), href: "/market-value-optimization" },
                { label: t("nav.forBusinesses"), href: "/for-businesses" },
                { label: t("nav.forInvestors"), href: "/for-investors" },
                { label: t("nav.techVenture"), href: "/tech-venture" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-light text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-light text-foreground">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("footer.terms"), href: "/terms-conditions" },
                { label: t("footer.privacy"), href: "/privacy-policy" },
                { label: t("footer.sustainability"), href: "/sustainability" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-light text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white/30 backdrop-blur-md transition-all duration-300 hover:border-black/40 hover:bg-white/40 hover:scale-110"
            aria-label="Scroll to top"
          >
            <svg className="h-5 w-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
