"use client"

import { useMobileMenu } from "@/contexts/mobile-menu-context"

interface MobileMenuTriggerProps {
  hasScroll: boolean
}

export function MobileMenuTrigger({ hasScroll }: MobileMenuTriggerProps) {
  const { isOpen, toggle } = useMobileMenu()

  return (
    <button
      onClick={toggle}
      className={`md:hidden z-[101] relative flex flex-col gap-2 p-2 transition-colors ${
        hasScroll ? "text-foreground" : "text-white"
      }`}
      aria-label="Toggle menu"
    >
      <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`} />
      <span
        className={`w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
      />
    </button>
  )
}
