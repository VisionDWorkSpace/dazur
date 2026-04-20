"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { DocumentUpload as DocUploadType } from "@/lib/types"

interface DocumentUploadProps {
  label: string
  description?: string
  example?: string
  required?: boolean
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  documents: DocUploadType[]
  onUpload: (files: File[]) => void
  onRemove: (id: string) => void
}

export function DocumentUpload({
  label,
  description,
  example,
  required,
  accept = ".pdf",
  multiple = false,
  maxSize = 10,
  documents,
  onUpload,
  onRemove,
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      onUpload(files)
    },
    [onUpload],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : []
      onUpload(files)
      e.target.value = ""
    },
    [onUpload],
  )

  const getStatusIcon = (status: DocUploadType["validationStatus"]) => {
    switch (status) {
      case "valid":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      case "invalid":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {example && <p className="text-xs text-muted-foreground/80 italic">{example}</p>}

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`upload-${label}`)?.click()}
      >
        <input
          id={`upload-${label}`}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Arraste ficheiros para aqui ou <span className="text-primary font-medium">clique para selecionar</span>
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Máximo {maxSize}MB por ficheiro • {accept.replace(/\./g, "").toUpperCase()}
        </p>
      </div>

      {documents.length > 0 && (
        <div className="space-y-2 mt-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border",
                doc.validationStatus === "invalid" ? "bg-destructive/5 border-destructive/30" : "bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{doc.fileName}</p>
                  <p className="text-xs text-muted-foreground">{(doc.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(doc.validationStatus)}
                <Button variant="ghost" size="icon" onClick={() => onRemove(doc.id)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
