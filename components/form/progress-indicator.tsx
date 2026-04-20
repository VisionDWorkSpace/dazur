"use client"

import { useFormContext } from "@/lib/form-context"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

function calculateStepStatus(stepId: number, formData: any): "empty" | "partial" | "complete" {
  if (stepId === 1) {
    const items = formData.portfolioItems || []
    if (items.length === 0) return "empty"

    const hasAnyField = items.some((item: any) => {
      if (!item) return false
      return (
        item.estimatedValue > 0 ||
        item.name ||
        item.address ||
        (item.documents && item.documents.length > 0) ||
        (item.photos && item.photos.length > 0)
      )
    })

    if (!hasAnyField) return "empty"

    // Check if all required fields are complete
    const allComplete = items.every((item: any) => {
      if (!item) return false
      return (
        item.estimatedValue >= 1000000 &&
        item.valueJustification &&
        item.documents?.some((d: any) => d.validationStatus === "valid") &&
        item.photos?.length > 0
      )
    })

    return allComplete ? "complete" : "partial"
  }

  if (stepId === 2) {
    const sender = formData.sender || {}
    if (!sender.fullName && !sender.email && !sender.phone) return "empty"

    const allComplete =
      sender.fullName && sender.email && sender.phone && sender.declarationAccepted && sender.contactAuthorized

    return allComplete ? "complete" : "partial"
  }

  return "empty"
}

export function ProgressIndicator() {
  const { steps, currentStep, formData } = useFormContext()

  return (
    <div className="w-full py-6 md:py-8">
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {steps.map((step, index) => {
          const status = calculateStepStatus(step.id, formData)

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
                    status === "complete"
                      ? "bg-success border-success text-success-foreground"
                      : status === "partial"
                        ? "bg-warning border-warning text-warning-foreground"
                        : currentStep === step.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-border text-muted-foreground",
                  )}
                >
                  {status === "complete" ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step.id}
                </div>
                <div className="mt-2 md:mt-3 text-center max-w-[100px] md:max-w-[140px]">
                  <p
                    className={cn(
                      "text-xs md:text-sm font-semibold",
                      currentStep === step.id ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 md:w-16 lg:w-24 h-0.5 mx-2 md:mx-4 transition-all duration-300",
                    status === "complete" ? "bg-success" : status === "partial" ? "bg-warning" : "bg-border",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
