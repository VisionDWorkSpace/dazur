"use client"

import * as React from "react"
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2, Shield, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DocumentUpload, DocumentRequirement, DocumentValidationStatus } from "@/lib/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AssetDocumentUploadProps {
  requirements: DocumentRequirement[]
  documents: DocumentUpload[]
  onUpload: (requirementId: string, file: File) => void
  onRemove: (documentId: string) => void
  isValidating?: boolean
}

export function AssetDocumentUpload({
  requirements,
  documents,
  onUpload,
  onRemove,
  isValidating,
}: AssetDocumentUploadProps) {
  const [selectedDoc, setSelectedDoc] = React.useState<DocumentUpload | null>(null)

  const getDocumentForRequirement = (reqId: string) => {
    return documents.find((d) => d.requirementId === reqId)
  }

  const getStatusConfig = (status: DocumentValidationStatus) => {
    switch (status) {
      case "valid":
        return {
          icon: CheckCircle2,
          color: "text-[oklch(0.45_0.12_160)]",
          bg: "bg-[oklch(0.45_0.12_160)]/10",
          label: "Validado",
        }
      case "invalid":
        return { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Inválido" }
      case "analyzing":
        return { icon: Loader2, color: "text-amber-600", bg: "bg-amber-50", label: "A analisar...", spin: true }
      default:
        return { icon: Loader2, color: "text-muted-foreground", bg: "bg-muted", label: "Pendente", spin: true }
    }
  }

  const handleFileChange = (reqId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(reqId, file)
    }
    e.target.value = ""
  }

  const requiredDocs = requirements.filter((r) => r.required)
  const optionalDocs = requirements.filter((r) => !r.required)

  const renderDocumentCard = (req: DocumentRequirement) => {
    const doc = getDocumentForRequirement(req.id)
    const statusConfig = doc ? getStatusConfig(doc.validationStatus) : null
    const StatusIcon = statusConfig?.icon

    return (
      <Card
        key={req.id}
        className={cn("overflow-hidden", doc?.validationStatus === "invalid" && "border-destructive/50")}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{req.name}</span>
                {req.required ? (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                    Obrigatório
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                    Opcional
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{req.description}</p>
            </div>

            {doc ? (
              <div className="flex items-center gap-2 shrink-0">
                <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-md text-xs", statusConfig?.bg)}>
                  {StatusIcon && (
                    <StatusIcon
                      className={cn("w-3.5 h-3.5", statusConfig?.color, statusConfig?.spin && "animate-spin")}
                    />
                  )}
                  <span className={statusConfig?.color}>{statusConfig?.label}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedDoc(doc)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => onRemove(doc.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="shrink-0">
                <input
                  id={`doc-${req.id}`}
                  type="file"
                  accept={req.acceptedFormats.join(",")}
                  onChange={handleFileChange(req.id)}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById(`doc-${req.id}`)?.click()}
                  disabled={isValidating}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Carregar
                </Button>
              </div>
            )}
          </div>

          {doc && (
            <div className="mt-3 flex items-center gap-3 p-2 bg-secondary/50 rounded-md">
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{doc.fileName}</p>
                <p className="text-[10px] text-muted-foreground">{(doc.fileSize / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}

          {doc?.validationStatus === "invalid" && doc.validationMessage && (
            <div className="mt-2 p-2 bg-destructive/10 rounded-md">
              <p className="text-xs text-destructive">{doc.validationMessage}</p>
            </div>
          )}

          {doc?.aiAnalysis && doc.validationStatus === "valid" && (
            <div className="mt-2 p-2 bg-[oklch(0.45_0.12_160)]/10 rounded-md">
              <p className="text-xs text-[oklch(0.45_0.12_160)]">
                Documento autenticado com {Math.round(doc.aiAnalysis.confidence * 100)}% de confiança
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <div>
          <h4 className="text-sm font-semibold">Documentos de Comprovação</h4>
          <p className="text-xs text-muted-foreground">
            Os documentos serão analisados por IA para validar a autenticidade e propriedade
          </p>
        </div>
      </div>

      {requiredDocs.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Documentos Obrigatórios</p>
          {requiredDocs.map(renderDocumentCard)}
        </div>
      )}

      {optionalDocs.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Documentos Opcionais <span className="font-normal">(fortalecem a sua proposta)</span>
          </p>
          {optionalDocs.map(renderDocumentCard)}
        </div>
      )}

      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Análise do Documento</DialogTitle>
            <DialogDescription>Resultado da validação por inteligência artificial</DialogDescription>
          </DialogHeader>
          {selectedDoc?.aiAnalysis && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">Tipo detectado</p>
                  <p className="font-medium mt-1">{selectedDoc.aiAnalysis.documentType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">Nível de confiança</p>
                  <p className="font-medium mt-1">{Math.round(selectedDoc.aiAnalysis.confidence * 100)}%</p>
                </div>
              </div>
              {Object.entries(selectedDoc.aiAnalysis.extractedData).length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Dados extraídos</p>
                  <div className="space-y-1 bg-secondary/50 rounded-lg p-3">
                    {Object.entries(selectedDoc.aiAnalysis.extractedData).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedDoc.aiAnalysis.issues.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Problemas detectados</p>
                  <ul className="text-sm text-destructive space-y-1">
                    {selectedDoc.aiAnalysis.issues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
