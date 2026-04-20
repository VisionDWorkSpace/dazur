import { NextResponse } from "next/server"
import { documentValidator } from "@/lib/document-validator"
import type { DocumentUpload } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const { document, expectedType } = (await request.json()) as {
      document: DocumentUpload
      expectedType: string
    }

    if (!document || !expectedType) {
      return NextResponse.json({ error: "Documento ou tipo esperado em falta" }, { status: 400 })
    }

    const result = await documentValidator.validateDocument(document, expectedType)

    return NextResponse.json({
      ...result,
      message: result.isValid ? "Documento validado com sucesso" : documentValidator.getErrorMessage(result),
    })
  } catch (error) {
    console.error("[v0] Document validation error:", error)
    return NextResponse.json({ error: "Erro ao validar documento" }, { status: 500 })
  }
}
