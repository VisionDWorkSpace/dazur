"use client"

import { useFormContext, FormProvider } from "@/lib/form-context"
import { ProgressIndicator } from "./progress-indicator"
import { Step1Portfolio } from "./step-1-portfolio"
import { Step2Contact } from "./step-2-contact"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, Sparkles, TrendingUp } from "lucide-react"
import { useState } from "react"
import { formatCurrency } from "@/lib/format-utils"
import { getDocumentRequirements } from "@/lib/types"
import type { OpportunityType } from "@/lib/types"

const MIN_VALUE = 1000000

function FormContent() {
  const {
    currentStep,
    setCurrentStep,
    formData,
    updateStepCompletion,
    isSubmitting,
    setIsSubmitting,
    setValidationErrors,
  } = useFormContext()
  const [isSuccess, setIsSuccess] = useState(false)

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    if (step === 1) {
      const items = formData.portfolioItems || []
      if (items.length === 0) {
        errors.portfolio = "Adicione pelo menos um ativo ao portefólio"
      } else {
        const invalidItems = items.filter((item) => {
          if (!item) return true
          const value = item.estimatedValue || 0
          if (value < MIN_VALUE) return true

          // Check required documents
          const reqs = getDocumentRequirements(item.itemType as OpportunityType)
          const requiredDocs = reqs.filter((r) => r.required)
          const validDocs = item.documents?.filter((d) => d.validationStatus === "valid") || []
          const hasAllDocs = requiredDocs.every((req) => validDocs.some((d) => d.requirementId === req.id))

          // Check photos
          const hasPhotos = (item.photos?.length || 0) > 0

          return !hasAllDocs || !hasPhotos
        })

        if (invalidItems.length > 0) {
          const missingValue = invalidItems.some((i) => (i?.estimatedValue || 0) < MIN_VALUE)
          const missingDocs = invalidItems.some((i) => {
            const reqs = getDocumentRequirements(i?.itemType as OpportunityType)
            const requiredDocs = reqs.filter((r) => r.required)
            const validDocs = i?.documents?.filter((d) => d.validationStatus === "valid") || []
            return !requiredDocs.every((req) => validDocs.some((d) => d.requirementId === req.id))
          })
          const missingPhotos = invalidItems.some((i) => (i?.photos?.length || 0) === 0)

          if (missingValue) {
            errors.portfolio = "Cada ativo deve ter valor mínimo de 1 000 000 €"
          } else if (missingDocs) {
            errors.portfolio = "Complete os documentos obrigatórios de todos os ativos"
          } else if (missingPhotos) {
            errors.portfolio = "Adicione pelo menos uma fotografia a cada ativo"
          }
        }
      }
    }

    if (step === 2) {
      if (!formData.sender?.fullName?.trim()) errors.fullName = "Indique o seu nome completo"
      if (!formData.sender?.email?.trim()) errors.email = "Indique o seu email"
      if (!formData.sender?.phone?.trim()) errors.phone = "Indique o seu telemóvel"
      if (!formData.sender?.declarationAccepted) errors.declarationAccepted = "Aceite a declaração para continuar"
      if (!formData.sender?.contactAuthorized) errors.contactAuthorized = "Autorize o contacto para continuar"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      updateStepCompletion(currentStep, true)
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    setValidationErrors({})
    setCurrentStep(currentStep - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Redirect to submission success page
        window.location.href = '/submission-success'
      }
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    const totalValue = (formData.portfolioItems || []).reduce((sum, item) => sum + (item?.estimatedValue || 0), 0)
    const itemCount = formData.portfolioItems?.length || 0

    return (
      <div className="text-center py-12 md:py-16">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-success/10 border-2 border-success flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-success" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Oportunidade Recebida com Sucesso!</h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-6 px-4">
          Estamos a analisar o seu portefólio de {formatCurrency(totalValue)} € ({itemCount}{" "}
          {itemCount === 1 ? "ativo" : "ativos"}) e a identificar investidores qualificados.
        </p>

        <div className="max-w-sm mx-auto bg-gradient-to-r from-primary/5 to-success/5 border border-primary/20 p-5 md:p-6 mb-8">
          <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-primary mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-2">Próximos passos</p>
          <ul className="text-xs md:text-sm text-muted-foreground space-y-2 text-left">
            <li>1. Validação dos documentos submetidos (24-48h)</li>
            <li>2. Análise do perfil de investimento</li>
            <li>3. Matching com investidores da nossa rede</li>
            <li>4. Contacto com propostas qualificadas</li>
          </ul>
        </div>

        <Button onClick={() => window.location.reload()} variant="outline" size="lg">
          Submeter Nova Oportunidade
        </Button>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Portfolio />
      case 2:
        return <Step2Contact />
      default:
        return null
    }
  }

  const portfolioItems = formData.portfolioItems || []
  const validItems = portfolioItems.filter((item) => (item?.estimatedValue || 0) >= MIN_VALUE)

  return (
    <div className="space-y-4 md:space-y-6">
      <ProgressIndicator />

      <Card className="border shadow-lg">
        <CardContent className="p-4 md:p-8 lg:p-10">{renderStep()}</CardContent>
      </Card>

      <div className="flex justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2 bg-transparent"
          size="lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>

        {currentStep < 2 ? (
          <Button onClick={handleNext} className="gap-2" disabled={validItems.length === 0} size="lg">
            <span className="hidden sm:inline">Seguinte</span>
            <span className="sm:hidden">Continuar</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2" size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">A submeter...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Procurar Investidores</span>
                <span className="sm:hidden">Submeter</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export function MasterForm() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  )
}
