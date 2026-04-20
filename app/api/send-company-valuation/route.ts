import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    // Calculate valuation based on form data
    const revenue = parseFloat(formData.revenue?.replace(/[^\d.-]/g, '') || '0')
    const ebitda = parseFloat(formData.ebitda?.replace(/[^\d.-]/g, '') || '0')
    const cash = parseFloat(formData.cash?.replace(/[^\d.-]/g, '') || '0')
    const debt = parseFloat(formData.debt?.replace(/[^\d.-]/g, '') || '0')
    
    // Industry-specific multiples
    const industryMultiples: Record<string, { revenue: number; ebitda: number }> = {
      'real-estate': { revenue: 1.5, ebitda: 8.0 },
      'infrastructure': { revenue: 2.0, ebitda: 10.0 },
      'life-sciences': { revenue: 3.5, ebitda: 15.0 },
      'hospitality': { revenue: 1.2, ebitda: 7.0 },
      'industrial': { revenue: 1.0, ebitda: 6.5 },
      'commodities': { revenue: 0.8, ebitda: 5.5 },
      'consulting': { revenue: 2.5, ebitda: 9.0 },
      'financial': { revenue: 2.0, ebitda: 12.0 },
      'transport': { revenue: 1.5, ebitda: 7.5 },
      'tmt': { revenue: 3.0, ebitda: 12.0 },
      'other': { revenue: 1.5, ebitda: 8.0 },
    }
    
    const multiples = industryMultiples[formData.sector] || industryMultiples['other']
    
    // Calculate valuations using different methods
    const revenueValuation = revenue * multiples.revenue
    const ebitdaValuation = ebitda * multiples.ebitda
    const averageValuation = (revenueValuation + ebitdaValuation) / 2
    const enterpriseValue = averageValuation - debt + cash
    
    // Prepare email content
    const emailBody = `
      New Company Valuation Request
      
      Company Information:
      - Sector: ${formData.sector}
      - Revenue: €${revenue.toLocaleString()}
      - EBITDA: €${ebitda.toLocaleString()}
      - Cash: €${cash.toLocaleString()}
      - Debt: €${debt.toLocaleString()}
      
      Contact Information:
      - Name: ${formData.name}
      - Email: ${formData.email}
      - Phone: ${formData.phone}
      
      Valuation Results:
      - Revenue Multiple Valuation: €${revenueValuation.toLocaleString()} (${multiples.revenue}x)
      - EBITDA Multiple Valuation: €${ebitdaValuation.toLocaleString()} (${multiples.ebitda}x)
      - Average Valuation: €${averageValuation.toLocaleString()}
      - Enterprise Value: €${enterpriseValue.toLocaleString()}
      
      Upload Method: ${formData.uploadMethod}
      ${formData.iesFile ? `IES File: ${formData.iesFile}` : ''}
    `
    
    // Send email to company
    console.log('[v0] Sending valuation email:', emailBody)
    
    // Return valuation results
    return NextResponse.json({
      success: true,
      valuation: {
        revenueValuation,
        ebitdaValuation,
        averageValuation,
        enterpriseValue,
        multiples,
      },
    })
  } catch (error) {
    console.error('[v0] Error processing company valuation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process valuation request' },
      { status: 500 }
    )
  }
}
