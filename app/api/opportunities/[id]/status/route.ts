import { NextResponse } from "next/server"
import type { OpportunityStatus } from "@/lib/types"
import { webhookService } from "@/lib/webhook-service"
import { emailService } from "@/lib/email-service"

// This endpoint allows internal team to update opportunity status
// In production, this should be protected with authentication

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { status, metadata } = (await request.json()) as {
      status: OpportunityStatus
      metadata?: Record<string, string>
    }

    // Validate status
    const validStatuses: OpportunityStatus[] = [
      "pending-analysis",
      "accepted",
      "rejected-no-profile",
      "pending-documents",
      "rejected-invalid-docs",
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
    }

    // In production, fetch from database
    // const opportunity = await db.opportunities.findUnique({ where: { id } })

    // For demo, simulate update
    const previousStatus: OpportunityStatus = "pending-analysis"

    // Send status change webhook
    const webhookPayload = webhookService.prepareStatusChangePayload(id, previousStatus, status, metadata)
    webhookService.broadcastWebhook(webhookPayload)

    // Send email based on new status
    // In production, fetch actual opportunity data
    const mockOpportunity = {
      opportunityType: "business" as const,
      base: {
        type: "business" as const,
        title: "Oportunidade de Exemplo",
        description: "",
        country: "Portugal",
        city: "Lisboa",
        requestedValue: 1500000,
        saleType: "total" as const,
      },
      sender: {
        fullName: "Nome do Cliente",
        email: metadata?.email || "cliente@exemplo.com",
        phone: "+351 912 345 678",
        relation: "owner" as const,
        declarationAccepted: true,
        contactAuthorized: true,
      },
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await emailService.sendStatusEmail(mockOpportunity, metadata)

    return NextResponse.json({
      success: true,
      message: `Estado atualizado para: ${status}`,
    })
  } catch (error) {
    console.error("[v0] Error updating status:", error)
    return NextResponse.json({ error: "Erro ao atualizar estado" }, { status: 500 })
  }
}
