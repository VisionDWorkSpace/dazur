import { NextResponse } from "next/server"
import type { OpportunityFormData } from "@/lib/types"
import { webhookService } from "@/lib/webhook-service"
import { emailService } from "@/lib/email-service"
import { documentValidator } from "@/lib/document-validator"

// In-memory storage for demo (use database in production)
const opportunities: Map<string, OpportunityFormData & { id: string }> = new Map()

export async function POST(request: Request) {
  try {
    const data: OpportunityFormData = await request.json()

    // Validate minimum value
    if (!data.base?.requestedValue || data.base.requestedValue < 1000000) {
      return NextResponse.json({ error: "Valor mínimo de 1.000.000 € não atingido" }, { status: 400 })
    }

    // Validate required fields
    if (!data.opportunityType) {
      return NextResponse.json({ error: "Tipo de oportunidade não especificado" }, { status: 400 })
    }

    if (!data.sender?.email || !data.sender?.fullName) {
      return NextResponse.json({ error: "Dados de contacto incompletos" }, { status: 400 })
    }

    // Generate ID
    const id = `opp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Set status and timestamps
    const opportunity: OpportunityFormData & { id: string } = {
      ...data,
      id,
      status: "pending-analysis",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Store opportunity
    opportunities.set(id, opportunity)

    // Validate documents (async, non-blocking for response)
    validateDocumentsAsync(opportunity)

    // Send webhook to GoHighLevel (async, non-blocking)
    sendWebhookAsync(opportunity)

    // Send confirmation email (async, non-blocking)
    sendEmailAsync(opportunity)

    return NextResponse.json({
      success: true,
      id,
      message: "Oportunidade submetida com sucesso",
    })
  } catch (error) {
    console.error("[v0] Error creating opportunity:", error)
    return NextResponse.json({ error: "Erro ao processar oportunidade" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const opportunity = opportunities.get(id)
    if (!opportunity) {
      return NextResponse.json({ error: "Oportunidade não encontrada" }, { status: 404 })
    }
    return NextResponse.json(opportunity)
  }

  // Return all opportunities (in production, add auth and pagination)
  return NextResponse.json(Array.from(opportunities.values()))
}

// Async document validation
async function validateDocumentsAsync(opportunity: OpportunityFormData & { id: string }) {
  try {
    // Collect all documents from the opportunity based on type
    const documents: {
      document: {
        id: string
        type: string
        fileName: string
        fileUrl: string
        fileSize: number
        uploadedAt: Date
        validationStatus: "pending" | "valid" | "invalid"
      }
      expectedType: string
    }[] = []

    if (opportunity.businessData?.documents) {
      opportunity.businessData.documents.forEach((doc) => {
        documents.push({ document: doc, expectedType: doc.type })
      })
    }

    if (opportunity.realEstateData?.documents) {
      opportunity.realEstateData.documents.forEach((doc) => {
        documents.push({ document: doc, expectedType: doc.type })
      })
    }

    if (documents.length > 0) {
      const results = await documentValidator.validateDocuments(documents)
      console.log(`[v0] Document validation results for ${opportunity.id}:`, results)
    }
  } catch (error) {
    console.error("[v0] Document validation error:", error)
  }
}

// Async webhook sending
async function sendWebhookAsync(opportunity: OpportunityFormData & { id: string }) {
  try {
    const payload = webhookService.prepareOpportunityPayload(opportunity, "opportunity.created")
    await webhookService.broadcastWebhook(payload)
  } catch (error) {
    console.error("[v0] Webhook error:", error)
  }
}

// Async email sending
async function sendEmailAsync(opportunity: OpportunityFormData & { id: string }) {
  try {
    await emailService.sendStatusEmail(opportunity)
  } catch (error) {
    console.error("[v0] Email error:", error)
  }
}
