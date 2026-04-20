"use client"

import { useFormContext } from "@/lib/form-context"
import { COUNTRIES, type SaleType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormFieldWrapper } from "./form-field-wrapper"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const saleTypes: { value: SaleType; label: string }[] = [
  { value: "total", label: "Venda total (100%)" },
  { value: "partial", label: "Venda parcial" },
  { value: "control", label: "Venda de controlo (>50%)" },
  { value: "asset-set", label: "Conjunto de ativos" },
]

export function Step2GeneralData() {
  const { formData, updateFormData, validationErrors } = useFormContext()

  const updateBase = (field: string, value: string | number) => {
    updateFormData({
      base: {
        ...formData.base!,
        [field]: value,
      },
    })
  }

  const requestedValue = formData.base?.requestedValue || 0
  const showValueWarning = requestedValue > 0 && requestedValue < 1000000

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Dados Gerais</h2>
        <p className="text-sm text-muted-foreground mt-1">Informação base da oportunidade</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormFieldWrapper label="Título" required error={validationErrors.title}>
          <Input
            placeholder="Ex.: Hotel 4 estrelas no Algarve"
            value={formData.base?.title || ""}
            onChange={(e) => updateBase("title", e.target.value)}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Valor pretendido" required error={validationErrors.requestedValue}>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
            <Input
              type="number"
              min={0}
              step={10000}
              placeholder="1.000.000"
              value={formData.base?.requestedValue || ""}
              onChange={(e) => updateBase("requestedValue", Number.parseFloat(e.target.value) || 0)}
              className="pl-7"
            />
          </div>
        </FormFieldWrapper>
      </div>

      {showValueWarning && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200">Apenas analisamos oportunidades ≥ 1.000.000 €</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormFieldWrapper label="País" required error={validationErrors.country}>
          <Select value={formData.base?.country || "Portugal"} onValueChange={(v) => updateBase("country", v)}>
            <SelectTrigger>
              <SelectValue placeholder="País" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Cidade" required error={validationErrors.city}>
          <Input
            placeholder="Ex.: Lisboa"
            value={formData.base?.city || ""}
            onChange={(e) => updateBase("city", e.target.value)}
          />
        </FormFieldWrapper>
      </div>

      <FormFieldWrapper label="Descrição breve" required error={validationErrors.description}>
        <Textarea
          placeholder="Pitch em 2-3 frases sobre a oportunidade de investimento..."
          value={formData.base?.description || ""}
          onChange={(e) => updateBase("description", e.target.value)}
          className="min-h-[80px] resize-none"
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Tipo de venda" required>
        <div className="flex flex-wrap gap-2">
          {saleTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateBase("saleType", type.value)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full border transition-colors",
                formData.base?.saleType === type.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50",
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </FormFieldWrapper>
    </div>
  )
}
