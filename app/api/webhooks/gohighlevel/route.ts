import { NextResponse } from "next/server"

// Webhook endpoint to receive callbacks from GoHighLevel
// This can be used to sync status changes or receive notifications

export async function POST(request: Request) {
  try {
    // Verify webhook signature if configured
    const signature = request.headers.get("x-webhook-signature")
    const webhookSecret = process.env.GOHIGHLEVEL_WEBHOOK_SECRET

    if (webhookSecret && signature) {
      // In production, verify HMAC signature
      // const isValid = verifySignature(await request.text(), signature, webhookSecret)
      // if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = await request.json()

    console.log("[v0] GoHighLevel webhook received:", payload)

    // Handle different event types
    switch (payload.eventType) {
      case "contact.updated":
        // Handle contact update from GoHighLevel
        break
      case "opportunity.stage_changed":
        // Sync status back to our system
        break
      default:
        console.log("[v0] Unhandled webhook event type:", payload.eventType)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] GoHighLevel webhook error:", error)
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 })
  }
}
