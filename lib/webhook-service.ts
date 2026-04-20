// Webhook Service for GoHighLevel and other integrations

import type { OpportunityFormData, OpportunityStatus } from "./types"

export interface WebhookPayload {
  eventType: "opportunity.created" | "opportunity.updated" | "opportunity.status_changed" | "document.validated"
  timestamp: string
  data: Record<string, unknown>
}

export interface WebhookConfig {
  url: string
  secret?: string
  retryCount?: number
  retryDelay?: number
}

export class WebhookService {
  private configs: Map<string, WebhookConfig> = new Map()

  // Register a webhook endpoint
  registerWebhook(name: string, config: WebhookConfig): void {
    this.configs.set(name, config)
  }

  // Send webhook to a specific registered endpoint
  async sendWebhook(name: string, payload: WebhookPayload): Promise<boolean> {
    const config = this.configs.get(name)
    if (!config) {
      console.error(`[v0] Webhook "${name}" not registered`)
      return false
    }

    return this.executeWebhook(config, payload)
  }

  // Send webhook to all registered endpoints
  async broadcastWebhook(payload: WebhookPayload): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>()

    await Promise.all(
      Array.from(this.configs.entries()).map(async ([name, config]) => {
        const success = await this.executeWebhook(config, payload)
        results.set(name, success)
      }),
    )

    return results
  }

  // Execute webhook with retry logic
  private async executeWebhook(config: WebhookConfig, payload: WebhookPayload): Promise<boolean> {
    const maxRetries = config.retryCount || 3
    const retryDelay = config.retryDelay || 1000

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(config.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(config.secret && { "X-Webhook-Secret": config.secret }),
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          console.log(`[v0] Webhook sent successfully to ${config.url}`)
          return true
        }

        console.warn(`[v0] Webhook failed (attempt ${attempt}): ${response.status}`)
      } catch (error) {
        console.error(`[v0] Webhook error (attempt ${attempt}):`, error)
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt))
      }
    }

    return false
  }

  // Prepare opportunity data for webhook
  prepareOpportunityPayload(opportunity: OpportunityFormData, eventType: WebhookPayload["eventType"]): WebhookPayload {
    return {
      eventType,
      timestamp: new Date().toISOString(),
      data: {
        id: `opp_${Date.now()}`,
        type: opportunity.opportunityType,
        title: opportunity.base?.title,
        description: opportunity.base?.description,
        country: opportunity.base?.country,
        city: opportunity.base?.city,
        requestedValue: opportunity.base?.requestedValue,
        saleType: opportunity.base?.saleType,
        status: opportunity.status,
        sender: {
          name: opportunity.sender?.fullName,
          email: opportunity.sender?.email,
          phone: opportunity.sender?.phone,
          relation: opportunity.sender?.relation,
        },
        // Include type-specific data based on opportunity type
        businessData: opportunity.businessData,
        realEstateData: opportunity.realEstateData,
        movableAssetData: opportunity.movableAssetData,
        intangibleAssetData: opportunity.intangibleAssetData,
        portfolioItems: opportunity.portfolioItems,
        // Metadata
        createdAt: opportunity.createdAt,
        updatedAt: opportunity.updatedAt,
      },
    }
  }

  // Prepare status change payload
  prepareStatusChangePayload(
    opportunityId: string,
    previousStatus: OpportunityStatus,
    newStatus: OpportunityStatus,
    metadata?: Record<string, unknown>,
  ): WebhookPayload {
    return {
      eventType: "opportunity.status_changed",
      timestamp: new Date().toISOString(),
      data: {
        opportunityId,
        previousStatus,
        newStatus,
        ...metadata,
      },
    }
  }
}

// Export singleton instance
export const webhookService = new WebhookService()

// Pre-configure GoHighLevel webhook if environment variable exists
if (typeof process !== "undefined" && process.env?.GOHIGHLEVEL_WEBHOOK_URL) {
  webhookService.registerWebhook("gohighlevel", {
    url: process.env.GOHIGHLEVEL_WEBHOOK_URL,
    secret: process.env.GOHIGHLEVEL_WEBHOOK_SECRET,
    retryCount: 3,
    retryDelay: 2000,
  })
}
