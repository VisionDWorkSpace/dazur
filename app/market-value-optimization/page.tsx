"use client"

import Link from "next/link"
import { useEffect } from "react"
import { GrainOverlay } from "@/components/grain-overlay"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"

export default function PillarsAnalysisPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />

      <SharedHeader currentPage="other" />

      <section className="relative min-h-[70vh] w-full overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dazur%20Video-3O9qE9fWqfj6V8CvmRAXeKsYRNaaIW.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 md:px-12">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <p className="text-xl md:text-2xl text-white/80">
              Diversify your operational suppliers while supervision is aligned with the market
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white">Executions based in Investors Due Diligence</h1>
            <p className="text-xl md:text-2xl text-white/80">coming through us will decrease risks</p>
            <div className="pt-6">
              <Link href="/readiness-form">
                <button className="rounded-full bg-white text-black px-8 py-3 font-light transition-all duration-300 hover:bg-white/90 hover:scale-105">
                  Start Analysis
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl space-y-16">
          <section className="animate-fade-in-up">
            <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 md:p-12 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Commercial</h2>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Features */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Core Services</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Sales & Revenue Growth: B2B/G2B Transactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Strategic Contracts & Procurement Intelligence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>55% visible opportunities via Marketing & Networking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>45% hidden contract upside through RFPs (Public & Private)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>RFPs Tracking tools (Regnity - our venture)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Eligibility Readiness & Compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Marketplaces for visibility</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-black/10">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Transform your commercial strategy from reactive to predictive. We help you capture both visible
                      market opportunities and hidden contract value through strategic RFP positioning and procurement
                      intelligence.
                    </p>
                  </div>
                </div>

                {/* Right: Pricing & Examples */}
                <div className="space-y-8">
                  <div>
                    <p className="font-bold text-foreground mb-3">Pricing</p>
                    <p className="text-lg text-foreground/80 mb-2">Deposit + Success Fee</p>
                    <p className="text-xs text-foreground/60">*must collaborate in the proposed strategies</p>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">In-House Core Services</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Public Contracts & RFP Management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>B2B Procurement Networks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Strategic Sales Pipeline Development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Contract Intelligence & Analytics</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">Operational Partners</p>
                    <div className="flex gap-6 items-center overflow-hidden">
                      <div className="animate-marquee flex gap-6">
                        <div className="text-sm text-foreground/60 whitespace-nowrap">M company</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Xlent</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">M company</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Xlent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 md:p-12 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Intangible Assets Value</h2>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Features */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Core Services</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Intellectual Property Development & Protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Brand Equity & Recognition Strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Technology and AI Integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Process Optimization & Innovation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Industry Certifications & Standards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Patent Portfolio Management</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-black/10">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Maximize your exit multiples by building defensible intellectual property. We help you create
                      proprietary systems and knowledge assets that make your business irreplaceable in the market.
                    </p>
                  </div>
                </div>

                {/* Right: Pricing & Examples */}
                <div className="space-y-8">
                  <div>
                    <p className="font-bold text-foreground mb-3">Pricing</p>
                    <p className="text-lg text-foreground/80">Customized per request</p>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">In-House Core Services</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>AI Process Optimization & Personalized ERPs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Custom Software Development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Content & Media Production</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Patent Filing & IP Strategy</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">Operational Partners</p>
                    <div className="flex gap-6 items-center overflow-hidden">
                      <div className="animate-marquee flex gap-6">
                        <div className="text-sm text-foreground/60 whitespace-nowrap">ITGEST</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Deloitte Digital</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Ceionis</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">ITGEST</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 md:p-12 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Tangible Assets</h2>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Features */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Core Services</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>
                          <strong>Real Estate & Infrastructure Assets</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>
                          <strong>Construction and Maintenance</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>
                          <strong>Equipment & Machinery</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Inventory & Goods Management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Strategic Asset Requalification</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-black/10">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Optimize your physical asset portfolio for maximum operational efficiency and valuation impact. We
                      help you strategically acquire, maintain, and requalify tangible assets to support sustainable
                      growth.
                    </p>
                  </div>
                </div>

                {/* Right: Pricing & Examples */}
                <div className="space-y-8">
                  <div>
                    <p className="font-bold text-foreground mb-3">Pricing</p>
                    <p className="text-lg text-foreground/80">Customized per request</p>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">In-House Core Services</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Civil Construction Projects</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Forest Construction and Maintenance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Infrastructure Maintenance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>SIC for Asset Valuation</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">Operational Partners</p>
                    <div className="flex gap-6 items-center overflow-hidden">
                      <div className="animate-marquee flex gap-6">
                        <div className="text-sm text-foreground/60 whitespace-nowrap">JOFERFER developments</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">consagri</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">JOFERFER developments</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 md:p-12 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Human Resources (People)</h2>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Features */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Core Services</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Talent Optimization & Development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Motivation & Engagement Programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Assessment & Training (Worklab - our venture)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Reduce Dependency, Increase Productivity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Organizational Readiness & Scalability</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-black/10">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Build your dream team as a strategic asset. We help you attract, develop, and retain top talent
                      with market-aligned compensation structures and engagement programs that drive productivity and
                      reduce dependency risks.
                    </p>
                  </div>
                </div>

                {/* Right: Pricing & Examples */}
                <div className="space-y-8">
                  <div>
                    <p className="font-bold text-foreground mb-3">Pricing</p>
                    <p className="text-lg text-foreground/80">Customized per request</p>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">In-House Core Services</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Outplacement Services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Training & Development Programs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Motivational SOPs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Staffing and Outsourcing</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">Operational Partners</p>
                    <div className="flex gap-6 items-center overflow-hidden">
                      <div className="animate-marquee flex gap-6">
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Prime Group</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">randstad</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">code for all</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Prime Group</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 md:p-12 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Finance and Capital</h2>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Features */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Core Services</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Accounting and Audit Knowledge (TOC, ROC)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Non-Diluted Financing Structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>
                          <strong>Government Incentives & Subsidies</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Strategic Credit Access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Tax Optimization Strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Insurance & Risk Management</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-black/10">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Access better capital at better terms. We structure non-dilutive financing solutions, unlock
                      government incentives, and optimize your financial position to fuel growth without sacrificing
                      equity.
                    </p>
                  </div>
                </div>

                {/* Right: Pricing & Examples */}
                <div className="space-y-8">
                  <div>
                    <p className="font-bold text-foreground mb-3">Pricing</p>
                    <p className="text-lg text-foreground/80">Deposit + Success Fee</p>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">In-House Core Services</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Government Incentive Applications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Credit & Debt Raise Structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Tax Optimization Planning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>Financial Due Diligence</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-foreground mb-3">Operational Partners</p>
                    <div className="flex gap-6 items-center overflow-hidden">
                      <div className="animate-marquee flex gap-6">
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Crédito Agrícola</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">BPI</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">PRR</div>
                        <div className="text-sm text-foreground/60 whitespace-nowrap">Crédito Agrícola</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center py-16 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-4xl md:text-6xl font-light text-foreground mb-6">Final Goal</h2>
            <p className="text-xl md:text-2xl font-light text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Align the business with the expected Max Level of Valuation outcomes.
            </p>
          </section>

          <section className="py-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Private Capital Operations
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-foreground mb-6">Sell Side</h3>
                <p className="text-foreground/80 mb-4 font-semibold">Structure the type of Raise</p>
                <p className="text-sm text-foreground/70 mb-6">+ Re-invest options to maintain wealth</p>
                <ul className="space-y-3 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Private Funds Opportunities (Real Estate, PE and Venture)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>New Project Development — Tangible or Intangible Asset (buy or creation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Fiscal Optimization</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-black/10">
                  <p className="text-sm font-semibold text-foreground">Pricing: Deposit + Success Fee</p>
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-8 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-foreground mb-6">Buy Side</h3>
                <p className="text-foreground/80 mb-4 font-semibold">Structure the type of Acquisition</p>
                <p className="text-sm text-foreground/70 mb-6">+ Re-invest options to maintain wealth</p>
                <ul className="space-y-3 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Target Screening and Deal Sourcing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Comprehensive Due Diligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Valuation and Negotiation Strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Post-Close Integration Planning</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-black/10">
                  <p className="text-sm font-semibold text-foreground">Partner Model: (retainer + % on uplift)</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Trivial Partners to all services
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Accountants and Auditors</h3>
                <p className="text-foreground/70 mb-8">Be ready to deliver all taxes to government policies</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">EY</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">PwC</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">KPMG</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">BDO</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">BKD</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">CBIZ</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">RSM</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">UHY</div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Legal Partners (Lawyers)</h3>
                <p className="text-foreground/70 mb-8">Ensure you are compliance in all procedures</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">Dentons</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">Gowling</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">Parry Field</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">S&C</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">Paine Licks</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Duncan Cotterill
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">Lavery</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">Hedges</div>
                  <div className="text-sm text-foreground/60 hover:text-foreground transition-colors">Skadden</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-2xl font-light text-foreground mb-6">Ensure you are always prepared!</p>
              <Link
                href="/#opportunity-section"
                className="inline-block px-12 py-4 rounded-full bg-foreground text-background font-light text-lg hover:scale-105 transition-transform cursor-pointer"
              >
                start now
              </Link>
            </div>
          </section>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
