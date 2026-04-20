"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ValueInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  min?: number
  className?: string
  showHelp?: boolean
}

export function ValueInput({ value, onChange, placeholder = "0", min, className, showHelp = true }: ValueInputProps) {
  const [displayValue, setDisplayValue] = React.useState("")

  React.useEffect(() => {
    if (value) {
      setDisplayValue(formatNumber(value))
    } else {
      setDisplayValue("")
    }
  }, [value])

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const parseNumber = (str: string): number => {
    const cleaned = str.replace(/\s/g, "").replace(/[^\d]/g, "")
    return Number.parseInt(cleaned) || 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const numericValue = parseNumber(rawValue)
    setDisplayValue(formatNumber(numericValue))
    onChange(numericValue)
  }

  const isValid = !min || value >= min

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Input
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn("pr-16", !isValid && value > 0 && "border-destructive focus-visible:ring-destructive")}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground">€</span>
          {showHelp && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs leading-relaxed">
                    <strong>Como determinar o valor pretendido:</strong>
                    <br />
                    <br />• Compare com transações recentes de ativos semelhantes
                    <br />• Considere avaliações profissionais existentes
                    <br />• Analise múltiplos de mercado do setor
                    <br />• Tenha em conta o potencial de valorização
                    <br />
                    <br />O valor mínimo para mediação é de 1.000.000 €
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      {!isValid && value > 0 && (
        <p className="text-xs text-destructive mt-1">Valor mínimo: {formatNumber(min || 0)} €</p>
      )}
    </div>
  )
}
