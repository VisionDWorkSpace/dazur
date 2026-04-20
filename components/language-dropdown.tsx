"use client"

import { useLanguage } from "@/contexts/language-context"
import { ChevronDown, Globe } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface LanguageDropdownProps {
  hasScroll?: boolean
}

export function LanguageDropdown({ hasScroll = false }: LanguageDropdownProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "EN" as const, name: "English" },
    { code: "ES" as const, name: "Español" },
    { code: "PT" as const, name: "Português" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
          hasScroll
            ? "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-light">{currentLanguage?.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 w-48 bg-white rounded-lg shadow-xl border border-foreground/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                language === lang.code
                  ? "bg-blue-900/10 text-blue-900 font-medium"
                  : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-sm">{lang.name}</span>
                <span className="text-xs opacity-60">{lang.code}</span>
              </div>
              {language === lang.code && (
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
