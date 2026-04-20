"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { formatCurrency, parseCurrency } from "@/lib/format-utils"
import { cn } from "@/lib/utils"

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  min?: number
}

export function CurrencyInput({ value, onChange, placeholder, className, min }: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = React.useState(() => (value ? formatCurrency(value) : ""))

  React.useEffect(() => {
    if (value && value !== parseCurrency(displayValue)) {
      setDisplayValue(formatCurrency(value))
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "")
    if (raw === "") {
      setDisplayValue("")
      onChange(0)
      return
    }
    const num = Number.parseInt(raw, 10)
    setDisplayValue(formatCurrency(num))
    onChange(num)
  }

  const handleBlur = () => {
    if (displayValue) {
      const num = parseCurrency(displayValue)
      setDisplayValue(formatCurrency(num))
    }
  }

  const isValid = !min || value >= min

  return (
    <div className="relative">
      <Input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cn("pr-8", !isValid && value > 0 && "border-destructive", className)}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
    </div>
  )
}
