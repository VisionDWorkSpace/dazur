"use client"

import { useFormContext } from "@/lib/form-context"
import type { RelationType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { FormFieldWrapper } from "./form-field-wrapper"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const relationOptions: { value: RelationType; label: string }[] = [
  { value: "owner", label: "Sou o proprietário" },
  { value: "mandatary", label: "Sou mandatário" },
  { value: "consultant", label: "Sou consultor / angariador" },
  { value: "other", label: "Outro" },
]

export function Step4Contact() {
  const { formData, updateFormData, validationErrors } = useFormContext()

  const senderData = formData.sender || {
    fullName: "",
    email: "",
    phone: "",
    relation: "owner",
    declarationAccepted: false,
    contactAuthorized: false,
  }

  const updateSender = (field: string, value: unknown) => {
    updateFormData({
      sender: {
        ...senderData,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Dados de Contacto</h2>
        <p className="text-muted-foreground">
          Informação para podermos entrar em contacto consigo relativamente a esta oportunidade.
        </p>
      </div>

      <div className="space-y-6">
        <FormFieldWrapper label="Nome completo" required error={validationErrors.fullName}>
          <Input
            placeholder="Ex.: João Manuel Silva"
            value={senderData.fullName}
            onChange={(e) => updateSender("fullName", e.target.value)}
          />
        </FormFieldWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldWrapper label="Email" required error={validationErrors.email}>
            <Input
              type="email"
              placeholder="Ex.: joao.silva@email.com"
              value={senderData.email}
              onChange={(e) => updateSender("email", e.target.value)}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Telemóvel" required error={validationErrors.phone}>
            <Input
              type="tel"
              placeholder="Ex.: +351 912 345 678"
              value={senderData.phone}
              onChange={(e) => updateSender("phone", e.target.value)}
            />
          </FormFieldWrapper>
        </div>

        <FormFieldWrapper
          label="Relação com o ativo/negócio"
          tooltip="Indique qual a sua relação com o ativo ou negócio que pretende vender."
          required
        >
          <RadioGroup
            value={senderData.relation}
            onValueChange={(v) => updateSender("relation", v)}
            className="grid gap-3"
          >
            {relationOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={`relation-${option.value}`} />
                <Label htmlFor={`relation-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FormFieldWrapper>

        {senderData.relation === "other" && (
          <FormFieldWrapper label="Especifique a sua relação">
            <Input
              placeholder="Descreva a sua relação com o ativo/negócio"
              value={senderData.relationOther || ""}
              onChange={(e) => updateSender("relationOther", e.target.value)}
            />
          </FormFieldWrapper>
        )}

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="declaration"
              checked={senderData.declarationAccepted}
              onCheckedChange={(checked) => updateSender("declarationAccepted", checked)}
            />
            <label htmlFor="declaration" className="text-sm text-foreground cursor-pointer leading-relaxed">
              Declaro que a informação prestada é verdadeira e corresponde à realidade, assumindo total responsabilidade
              pela mesma. <span className="text-destructive">*</span>
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="contact"
              checked={senderData.contactAuthorized}
              onCheckedChange={(checked) => updateSender("contactAuthorized", checked)}
            />
            <label htmlFor="contact" className="text-sm text-foreground cursor-pointer leading-relaxed">
              Autorizo o contacto por parte da equipa e de potenciais investidores interessados nesta oportunidade.{" "}
              <span className="text-destructive">*</span>
            </label>
          </div>
        </div>

        {(validationErrors.declarationAccepted || validationErrors.contactAuthorized) && (
          <p className="text-xs text-destructive">É necessário aceitar ambas as declarações para continuar.</p>
        )}
      </div>

      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Privacidade:</strong> Os seus dados serão tratados de acordo com o Regulamento Geral de Proteção de
          Dados (RGPD) e utilizados exclusivamente para fins de análise e contacto relativamente a esta oportunidade de
          investimento.
        </p>
      </div>
    </div>
  )
}
