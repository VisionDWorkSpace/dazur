"use client"

import * as React from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AddressSuggestion {
  placeId: string
  description: string
  mainText: string
  secondaryText: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Pesquisar morada...",
  className,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = React.useState<AddressSuggestion[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const debounceRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const searchAddresses = React.useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)

    // Simulate Google Places API response with realistic addresses
    await new Promise((r) => setTimeout(r, 300))

    const mockSuggestions: AddressSuggestion[] = [
      {
        placeId: "1",
        description: `${query}, Lisboa, Portugal`,
        mainText: query,
        secondaryText: "Lisboa, Portugal",
      },
      {
        placeId: "2",
        description: `${query}, Porto, Portugal`,
        mainText: query,
        secondaryText: "Porto, Portugal",
      },
      {
        placeId: "3",
        description: `${query}, Madrid, Espanha`,
        mainText: query,
        secondaryText: "Madrid, Espanha",
      },
      {
        placeId: "4",
        description: `${query}, Barcelona, Espanha`,
        mainText: query,
        secondaryText: "Barcelona, Espanha",
      },
    ]

    setSuggestions(mockSuggestions)
    setIsLoading(false)
    setIsOpen(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchAddresses(newValue)
    }, 300)
  }

  const handleSelect = (suggestion: AddressSuggestion) => {
    setInputValue(suggestion.description)
    onChange(suggestion.description)
    setIsOpen(false)
    setSuggestions([])
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="pl-9"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg overflow-hidden">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.placeId}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className="w-full px-3 py-2.5 text-left hover:bg-accent transition-colors flex items-start gap-2.5"
            >
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{suggestion.mainText}</p>
                <p className="text-xs text-muted-foreground truncate">{suggestion.secondaryText}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
