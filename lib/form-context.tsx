"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { OpportunityFormData, FormStep, SenderData } from "./types"

interface FormContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  formData: Partial<OpportunityFormData>
  updateFormData: (data: Partial<OpportunityFormData>) => void
  steps: FormStep[]
  updateStepCompletion: (stepId: number, isComplete: boolean) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
  validationErrors: Record<string, string>
  setValidationErrors: (errors: Record<string, string>) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

const initialSteps: FormStep[] = [
  { id: 1, title: "Seus Ativos", description: "Adicione o que pretende vender", isComplete: false },
  { id: 2, title: "Dados de Contacto", description: "Para receber propostas", isComplete: false },
]

const initialSender: SenderData = {
  fullName: "",
  email: "",
  phone: "",
  relation: "owner",
  declarationAccepted: false,
  contactAuthorized: false,
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<OpportunityFormData>>({
    portfolioItems: [],
    sender: initialSender,
    status: "pending-analysis",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const [steps, setSteps] = useState<FormStep[]>(initialSteps)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const updateFormData = (data: Partial<OpportunityFormData>) => {
    setFormData((prev) => ({ ...prev, ...data, updatedAt: new Date() }))
  }

  const updateStepCompletion = (stepId: number, isComplete: boolean) => {
    setSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, isComplete } : step)))
  }

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        steps,
        updateStepCompletion,
        isSubmitting,
        setIsSubmitting,
        validationErrors,
        setValidationErrors,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
