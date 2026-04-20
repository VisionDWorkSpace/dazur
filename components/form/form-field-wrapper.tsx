"use client"

import type { ReactNode } from "react"
import { TooltipHelp } from "./tooltip-help"
import { cn } from "@/lib/utils"

interface FormFieldWrapperProps {
  label: string
  description?: string
  tooltip?: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

export function FormFieldWrapper({
  label,
  description,
  tooltip,
  required,
  error,
  children,
  className,
}: FormFieldWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-1">
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        {tooltip && <TooltipHelp content={tooltip} />}
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
