"use client"

import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface PillarPopupProps {
  pillarKey: string
  isOpen: boolean
  onClose: () => void
}

const pillarData: Record<
  string,
  {
    coreServices: string[]
    pricing: string
    pricingNote?: string
    inHouseServices: string[]
    partners: string[]
  }
> = {
  commercial: {
    coreServices: [
      "Sales & Revenue Growth: B2B/G2B Transactions",
      "Strategic Contracts & Procurement Intelligence",
      "55% visible opportunities via Marketing & Networking",
      "45% hidden contract upside through RFPs (Public & Private)",
      "RFPs Tracking tools (Regnity - our venture)",
      "Eligibility Readiness & Compliance",
      "Marketplaces for visibility",
    ],
    pricing: "Deposit + Success Fee",
    pricingNote: "*must collaborate in the proposed strategies",
    inHouseServices: [
      "Public Contracts & RFP Management",
      "B2B Procurement Networks",
      "Strategic Sales Pipeline Development",
      "Contract Intelligence & Analytics",
    ],
    partners: ["M company", "Xlent"],
  },
  intangible: {
    coreServices: [
      "Intellectual Property Development & Protection",
      "Brand Equity & Recognition Strategy",
      "Technology and AI Integration",
      "Process Optimization & Innovation",
      "Industry Certifications & Standards",
      "Patent Portfolio Management",
    ],
    pricing: "Customized per request",
    inHouseServices: [
      "AI Process Optimization & Personalized ERPs",
      "Custom Software Development",
      "Content & Media Production",
      "Patent Filing & IP Strategy",
    ],
    partners: ["ITGEST", "Deloitte Digital", "Ceionis"],
  },
  physical: {
    coreServices: [
      "Real Estate & Infrastructure Assets",
      "Construction and Maintenance",
      "Equipment & Machinery",
      "Inventory & Goods Management",
      "Strategic Asset Requalification",
    ],
    pricing: "Customized per request",
    inHouseServices: [
      "Civil Construction Projects",
      "Forest Construction and Maintenance",
      "Infrastructure Maintenance",
      "SIC for Asset Valuation",
    ],
    partners: ["JOFERFER developments", "consagri"],
  },
  people: {
    coreServices: [
      "Talent Optimization & Development",
      "Motivation & Engagement Programs",
      "Assessment & Training (Worklab - our venture)",
      "Reduce Dependency, Increase Productivity",
      "Organizational Readiness & Scalability",
    ],
    pricing: "Customized per request",
    inHouseServices: [
      "Outplacement Services",
      "Training & Development Programs",
      "Motivational SOPs",
      "Staffing and Outsourcing",
    ],
    partners: ["Prime Group", "randstad", "code for all"],
  },
  financial: {
    coreServices: [
      "Accounting and Audit Knowledge (TOC, ROC)",
      "Non-Diluted Financing Structures",
      "Government Incentives & Subsidies",
      "Strategic Credit Access",
      "Tax Optimization Strategies",
      "Insurance & Risk Management",
    ],
    pricing: "Deposit + Success Fee",
    inHouseServices: [
      "Incentive, Grants & Subsidies Applications",
      "Credit & Debt Raise Structuring",
      "Tax Optimization Planning",
      "Financial Due Diligence",
    ],
    partners: ["Crédito Agrícola", "BPI", "PRR"],
  },
}

export function PillarPopup({ pillarKey, isOpen, onClose }: PillarPopupProps) {
  const { t } = useLanguage()

  if (!pillarKey) return null

  const data = pillarData[pillarKey]
  if (!data) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[900px] max-h-[90vh] p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <div className="p-4 md:p-6 border-b bg-gradient-to-br from-background to-muted/20">
          <DialogTitle className="text-xl md:text-3xl font-bold text-foreground pr-8">
            {t(`pillar.${pillarKey}.title`)}
          </DialogTitle>
        </div>

        <div className="p-4 md:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">Core Services</h3>
                <ul className="space-y-2 text-xs md:text-sm text-foreground/80">
                  {data.coreServices.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {t(`pillar.${pillarKey}.description`)}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <p className="font-bold text-foreground mb-2 text-sm md:text-base">Pricing</p>
                <p className="text-base md:text-lg text-foreground mb-1">{data.pricing}</p>
                {data.pricingNote && (
                  <p className="text-[10px] md:text-xs text-muted-foreground italic">{data.pricingNote}</p>
                )}
              </div>

              <div>
                <p className="font-bold text-foreground mb-3 text-sm md:text-base">In-House Core Services</p>
                <ul className="space-y-2 text-xs md:text-sm text-foreground/70">
                  {data.inHouseServices.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-foreground mb-3 text-sm md:text-base">Operational Partners</p>
                <div className="flex flex-wrap gap-2">
                  {data.partners.map((partner, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs md:text-sm border border-accent/20"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6 mt-6 border-t border-border">
            <a
              href="https://wa.me/351910800680?text=I%20am%20interested%20to%20know%20more%20about%20this%20pillar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-foreground text-background rounded-full font-medium text-sm md:text-base hover:scale-105 transition-all duration-300 text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
