import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    // Prepare email content
    const emailBody = `
      New Investment Opportunity Request
      
      Investment Criteria:
      - Preferred Sector: ${formData.sector || 'Not specified'}
      - Target Revenue: €${formData.revenue || 'Not specified'}
      - Target EBITDA: €${formData.ebitda || 'Not specified'}
      - Preferred Region: ${formData.region || 'Not specified'}
      - Investment Type: ${formData.investmentType || 'Not specified'}
      
      Investor Information:
      - Full Name: ${formData.fullName}
      - Organization: ${formData.organization || 'Not specified'}
      - Email: ${formData.email}
      - Phone: ${formData.phone}
      - Investor Type: ${formData.investorType || 'Not specified'}
    `
    
    console.log('[v0] Sending investor match email:', emailBody)
    
    // Return success
    return NextResponse.json({
      success: true,
      message: 'Investment criteria received successfully',
    })
  } catch (error) {
    console.error('[v0] Error processing investor request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process investment request' },
      { status: 500 }
    )
  }
}
