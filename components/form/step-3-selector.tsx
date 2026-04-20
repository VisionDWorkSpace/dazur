"use client"

import { useFormContext } from "@/lib/form-context"
import { Step3Portfolio } from "./step-3-portfolio"

export function Step3Selector() {
  const { formData } = useFormContext()

  // All types now use the simplified portfolio component
  if (formData.opportunityType) {
    return <Step3Portfolio />
  }

  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">Por favor, selecione primeiro o tipo de oportunidade no passo anterior.</p>
    </div>
  )
}
