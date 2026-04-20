"use client"

import { useFormContext } from "@/lib/form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Shield, UserCheck, Briefcase } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import type { RelationType } from "@/lib/types"

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePhone = (phone: string): boolean => {
  return /^[\d\s+()-]{9,}$/.test(phone)
}

export function Step2Contact() {
  const { formData, updateFormData, validationErrors } = useFormContext()
  const sender = formData.sender || {}

  const handleChange = (field: string, value: string | boolean) => {
    updateFormData({
      sender: { ...sender, [field]: value },
    })
  }

  const relationOptions: { value: RelationType; label: string; description: string }[] = [
    { value: "owner", label: "Proprietário", description: "Sou o titular direto do(s) ativo(s)" },
    { value: "mandatary", label: "Mandatário", description: "Represento o proprietário com poderes" },
    { value: "consultant", label: "Consultor", description: "Assessoro a transação" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-semibold text-foreground">Dados de Contacto</h2>
        <p className="text-muted-foreground mt-2">
          Complete os seus dados para formalizar a submissão e receber propostas de investidores
        </p>
      </div>

      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Por favor, preencha todos os campos obrigatórios corretamente</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Nome completo *
          </Label>
          <Input
            id="fullName"
            placeholder="Ex.: João Manuel Silva"
            value={sender.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`mt-1.5 ${validationErrors.fullName ? "border-destructive" : ""}`}
            required
            aria-invalid={!!validationErrors.fullName}
          />
          {validationErrors.fullName && <p className="text-xs text-destructive mt-1">{validationErrors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Email profissional *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@empresa.com"
              value={sender.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`mt-1.5 ${validationErrors.email || (sender.email && !validateEmail(sender.email)) ? "border-destructive" : ""}`}
              required
              aria-invalid={!!validationErrors.email || (!!sender.email && !validateEmail(sender.email))}
            />
            {validationErrors.email && <p className="text-xs text-destructive mt-1">{validationErrors.email}</p>}
            {!validationErrors.email && sender.email && !validateEmail(sender.email) && (
              <p className="text-xs text-destructive mt-1">Email inválido</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Telemóvel *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+351 912 345 678"
              value={sender.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`mt-1.5 ${validationErrors.phone || (sender.phone && !validatePhone(sender.phone)) ? "border-destructive" : ""}`}
              required
              aria-invalid={!!validationErrors.phone || (!!sender.phone && !validatePhone(sender.phone))}
            />
            {validationErrors.phone && <p className="text-xs text-destructive mt-1">{validationErrors.phone}</p>}
            {!validationErrors.phone && sender.phone && !validatePhone(sender.phone) && (
              <p className="text-xs text-destructive mt-1">Telefone inválido</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="company" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Empresa <span className="font-normal">(opcional)</span>
            </Label>
            <Input
              id="company"
              placeholder="Nome da empresa"
              value={sender.company || ""}
              onChange={(e) => handleChange("company", e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="position" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Cargo <span className="font-normal">(opcional)</span>
            </Label>
            <Input
              id="position"
              placeholder="Ex.: CEO, Administrador"
              value={sender.position || ""}
              onChange={(e) => handleChange("position", e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
            Relação com o(s) ativo(s) *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {relationOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all ${
                  sender.relation === option.value
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:border-primary/50"
                }`}
                onClick={() => handleChange("relation", option.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center ${
                        sender.relation === option.value ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {option.value === "owner" ? (
                        <UserCheck className="w-5 h-5" />
                      ) : option.value === "mandatary" ? (
                        <Shield className="w-5 h-5" />
                      ) : (
                        <Briefcase className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t pt-8">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Declarações e Autorizações
        </h3>

        <div className="flex items-start gap-3 p-4 bg-secondary/50 border">
          <Checkbox
            id="declaration"
            checked={sender.declarationAccepted || false}
            onCheckedChange={(v) => handleChange("declarationAccepted", v as boolean)}
            className={validationErrors.declarationAccepted ? "border-destructive" : ""}
          />
          <div className="flex-1">
            <Label htmlFor="declaration" className="text-sm font-normal cursor-pointer leading-relaxed">
              Declaro que todas as informações prestadas são verdadeiras e que tenho legitimidade para submeter esta
              oportunidade de investimento.
            </Label>
            {validationErrors.declarationAccepted && (
              <p className="text-xs text-destructive mt-1">{validationErrors.declarationAccepted}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-secondary/50 border">
          <Checkbox
            id="contact"
            checked={sender.contactAuthorized || false}
            onCheckedChange={(v) => handleChange("contactAuthorized", v as boolean)}
            className={validationErrors.contactAuthorized ? "border-destructive" : ""}
          />
          <div className="flex-1">
            <Label htmlFor="contact" className="text-sm font-normal cursor-pointer leading-relaxed">
              Autorizo o contacto por parte de investidores qualificados e a análise dos documentos submetidos para
              efeitos de due diligence preliminar.
            </Label>
            {validationErrors.contactAuthorized && (
              <p className="text-xs text-destructive mt-1">{validationErrors.contactAuthorized}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-r from-[oklch(0.45_0.12_160)]/5 to-transparent border border-[oklch(0.45_0.12_160)]/20">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-[oklch(0.45_0.12_160)] mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground text-sm">Confidencialidade Total</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Os seus dados e documentos são tratados com rigorosa confidencialidade. A informação só é partilhada com
              investidores qualificados após a sua aprovação explícita e assinatura de NDA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
