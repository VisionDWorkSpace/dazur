"use client"

import { useFormContext } from "@/lib/form-context"
import type { OpportunityType } from "@/lib/types"
import { Building2, Building, Car, Lightbulb, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const opportunityOptions: {
  value: OpportunityType
  label: string
  description: string
  example: string
  icon: typeof Building2
}[] = [
  {
    value: "business",
    label: "Um único negócio / empresa",
    description: "Empresa com operação ativa",
    example: "Ex.: empresa de tecnologia, clínica, fábrica, restaurante, hotel.",
    icon: Building2,
  },
  {
    value: "real-estate",
    label: "Um único ativo imobiliário",
    description: "Imóvel ou terreno",
    example: "Ex.: prédio, apartamento, armazém, hotel, terreno.",
    icon: Building,
  },
  {
    value: "movable-asset",
    label: "Um único ativo mobiliário",
    description: "Equipamento ou veículo",
    example: "Ex.: máquinas industriais, frota de veículos, barco, equipamento médico.",
    icon: Car,
  },
  {
    value: "intangible-asset",
    label: "Um único ativo intangível",
    description: "Propriedade intelectual ou digital",
    example: "Ex.: patente, marca registada, software, franquia, base de dados.",
    icon: Lightbulb,
  },
  {
    value: "portfolio",
    label: "Portefólio de vários ativos ou negócios",
    description: "Conjunto de ativos diversos",
    example: "Ex.: 3 prédios + 2 lojas, ou grupo com 4 empresas.",
    icon: FolderOpen,
  },
]

export function Step1OpportunityType() {
  const { formData, updateFormData } = useFormContext()

  const handleSelect = (type: OpportunityType) => {
    updateFormData({
      opportunityType: type,
      base: formData.base ? { ...formData.base, type } : undefined,
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">O que pretende vender?</h2>
        <p className="text-muted-foreground">
          Selecione o tipo de oportunidade que melhor descreve o que pretende transacionar.
        </p>
      </div>

      <div className="grid gap-3">
        {opportunityOptions.map((option) => {
          const Icon = option.icon
          const isSelected = formData.opportunityType === option.value

          return (
            <Card
              key={option.value}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:border-primary/50",
                isSelected && "border-primary ring-2 ring-primary/20 bg-primary/5",
              )}
              onClick={() => handleSelect(option.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-foreground">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30",
                        )}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-1">{option.example}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
