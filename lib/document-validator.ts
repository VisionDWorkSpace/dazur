// Document Validation Service Layer
// This service provides the logic structure for AI-based document validation
// The actual AI model integration can be swapped in without changing the interface

import type { DocumentUpload } from "./types"

export interface ValidationResult {
  isValid: boolean
  confidence: number
  documentType: string
  expectedType: string
  issues: string[]
  suggestions: string[]
}

export interface DocumentValidatorConfig {
  aiEndpoint?: string
  aiApiKey?: string
  fallbackToManual: boolean
}

// Expected document patterns for validation
const DOCUMENT_PATTERNS: Record<string, { keywords: string[]; structure: string[] }> = {
  "permanent-certificate": {
    keywords: ["certidão permanente", "registo comercial", "matrícula", "nif", "denominação social"],
    structure: ["número de certidão", "entidade", "data de validade"],
  },
  "financial-statements": {
    keywords: ["balanço", "demonstração de resultados", "ativo", "passivo", "capital próprio"],
    structure: ["período", "valores", "rubricas contabilísticas"],
  },
  "annual-report": {
    keywords: ["relatório de gestão", "prestação de contas", "resultado líquido"],
    structure: ["exercício", "resumo de atividade", "indicadores"],
  },
  "tax-booklet": {
    keywords: ["caderneta predial", "finanças", "valor patrimonial", "artigo matricial"],
    structure: ["número de artigo", "freguesia", "área", "valor"],
  },
  "land-registry": {
    keywords: ["certidão de registo predial", "conservatória", "descrição predial"],
    structure: ["número de descrição", "freguesia", "proprietário"],
  },
  "energy-certificate": {
    keywords: ["certificado energético", "sce", "classe energética", "adene"],
    structure: ["classe", "validade", "número de certificado"],
  },
  "purchase-invoice": {
    keywords: ["fatura", "nif", "valor total", "iva"],
    structure: ["número de fatura", "data", "vendedor", "comprador"],
  },
  "vehicle-document": {
    keywords: ["documento único automóvel", "matrícula", "chassis", "proprietário"],
    structure: ["matrícula", "marca", "modelo", "cilindrada"],
  },
}

export class DocumentValidatorService {
  private config: DocumentValidatorConfig

  constructor(config: DocumentValidatorConfig = { fallbackToManual: true }) {
    this.config = config
  }

  // Main validation method - can be connected to AI service
  async validateDocument(document: DocumentUpload, expectedType: string): Promise<ValidationResult> {
    // In production, this would call an AI service
    // For now, we simulate the validation logic structure

    const result: ValidationResult = {
      isValid: false,
      confidence: 0,
      documentType: "unknown",
      expectedType,
      issues: [],
      suggestions: [],
    }

    // Check if we have patterns for this document type
    const patterns = DOCUMENT_PATTERNS[expectedType]
    if (!patterns) {
      result.suggestions.push("Tipo de documento não reconhecido. Verifique se carregou o documento correto.")
      return result
    }

    // Simulate AI validation call
    // In production: const aiResult = await this.callAIService(document, expectedType)
    const simulatedValidation = await this.simulateAIValidation(document, expectedType)

    return simulatedValidation
  }

  // Batch validation for multiple documents
  async validateDocuments(
    documents: { document: DocumentUpload; expectedType: string }[],
  ): Promise<Map<string, ValidationResult>> {
    const results = new Map<string, ValidationResult>()

    await Promise.all(
      documents.map(async ({ document, expectedType }) => {
        const result = await this.validateDocument(document, expectedType)
        results.set(document.id, result)
      }),
    )

    return results
  }

  // Simulate AI validation - placeholder for actual AI integration
  private async simulateAIValidation(document: DocumentUpload, expectedType: string): Promise<ValidationResult> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // For demo purposes, return a positive validation
    // In production, this would analyze the document content
    return {
      isValid: true,
      confidence: 0.85,
      documentType: expectedType,
      expectedType,
      issues: [],
      suggestions: [],
    }
  }

  // Method to call external AI service (to be implemented)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async callAIService(_document: DocumentUpload, _expectedType: string): Promise<ValidationResult> {
    // This would be the actual AI API call
    // Example structure:
    /*
    const response = await fetch(this.config.aiEndpoint!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.aiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentUrl: document.fileUrl,
        expectedType,
        patterns: DOCUMENT_PATTERNS[expectedType],
      }),
    })
    
    return await response.json()
    */

    throw new Error("AI service not configured")
  }

  // Get validation error message in Portuguese
  getErrorMessage(result: ValidationResult): string {
    if (result.isValid) return ""

    if (result.issues.length > 0) {
      return result.issues.join(". ")
    }

    return `O documento submetido não corresponde ao tipo pedido (${result.expectedType}). Por favor carregue a versão correta.`
  }
}

// Export singleton instance
export const documentValidator = new DocumentValidatorService()
