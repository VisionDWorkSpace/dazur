"use client"

import { useState } from "react"
import { SharedHeader } from "@/components/shared-header"
import { FooterSection } from "@/components/sections/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Check, Info, Calendar } from "lucide-react"

interface FormData {
  // Step 1: Company Info
  companyName: string
  vat: string
  website: string
  noWebsite: boolean
  linkedin: string
  email: string
  phone: string

  // Step 2: Business Details
  industry: string
  yearsInBusiness: string
  employees: string
  description: string

  // Step 3: Current Challenges
  challenges: string[]

  // Step 4: Financial Info
  annualRevenue: string
  ebitda: string
  assets: string
  liabilities: string

  // Step 5: Growth Goals
  growthGoals: string[]
  targetRevenue: string
  timeline: string

  // Step 6: Investment Readiness
  fundingNeeded: string
  fundingPurpose: string
  previousFunding: string

  // Step 7: Operational Maturity
  hasFinancialStatements: boolean
  hasBusinessPlan: boolean
  hasLegalCompliance: boolean
  hasIPProtection: boolean

  // Step 8: Service Interest
  interestedServices: string[]
}

const initialFormData: FormData = {
  companyName: "",
  vat: "",
  website: "",
  noWebsite: false,
  linkedin: "",
  email: "",
  phone: "",
  industry: "",
  yearsInBusiness: "",
  employees: "",
  description: "",
  challenges: [],
  annualRevenue: "",
  ebitda: "",
  assets: "",
  liabilities: "",
  growthGoals: [],
  targetRevenue: "",
  timeline: "",
  fundingNeeded: "",
  fundingPurpose: "",
  previousFunding: "",
  hasFinancialStatements: false,
  hasBusinessPlan: false,
  hasLegalCompliance: false,
  hasIPProtection: false,
  interestedServices: [],
}

export default function ReadinessFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const totalSteps = 8

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.companyName) newErrors.companyName = "Company name is required"
      if (!formData.vat) newErrors.vat = "VAT number is required"
      else if (!/^[A-Z]{0,2}[0-9]{8,12}$/.test(formData.vat.replace(/\s/g, ""))) {
        newErrors.vat = "Invalid VAT number format"
      }
      if (!formData.noWebsite && !formData.website) {
        newErrors.website = "Website is required"
      } else if (!formData.noWebsite && formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        newErrors.website = "Please enter a valid URL (starting with http:// or https://)"
      }
      if (formData.noWebsite && formData.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(formData.linkedin)) {
        newErrors.linkedin = "Please enter a valid LinkedIn URL"
      }
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format"
      }
      if (!formData.phone) newErrors.phone = "Phone is required"
    }

    if (step === 2) {
      if (!formData.industry) newErrors.industry = "Industry is required"
      if (!formData.yearsInBusiness) newErrors.yearsInBusiness = "Years in business is required"
      if (!formData.employees) newErrors.employees = "Number of employees is required"
      if (!formData.description) newErrors.description = "Business description is required"
    }

    if (step === 3) {
      if (formData.challenges.length === 0) {
        newErrors.challenges = "Please select at least one challenge"
      }
    }

    if (step === 4) {
      if (!formData.annualRevenue) newErrors.annualRevenue = "Annual revenue is required"
      if (!formData.ebitda) newErrors.ebitda = "EBITDA is required"
    }

    if (step === 5) {
      if (formData.growthGoals.length === 0) {
        newErrors.growthGoals = "Please select at least one growth goal"
      }
      if (!formData.targetRevenue) newErrors.targetRevenue = "Target revenue is required"
      if (!formData.timeline) newErrors.timeline = "Timeline is required"
    }

    if (step === 6) {
      if (!formData.fundingNeeded) newErrors.fundingNeeded = "Funding amount is required"
      if (!formData.fundingPurpose) newErrors.fundingPurpose = "Funding purpose is required"
    }

    if (step === 8) {
      if (formData.interestedServices.length === 0) {
        newErrors.interestedServices = "Please select at least one service"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        setShowResults(true)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const toggleArrayItem = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const calculateValuation = () => {
    const revenue = Number.parseFloat(formData.annualRevenue) || 0
    const ebitda = Number.parseFloat(formData.ebitda) || 0
    const multiple = ebitda > 0 ? Math.min(Math.max(3, revenue / ebitda), 8) : 4
    const minValuation = ebitda * (multiple - 1)
    const maxValuation = ebitda * (multiple + 2)
    return {
      min: Math.round(minValuation),
      max: Math.round(maxValuation),
      multiple: multiple.toFixed(1),
    }
  }

  const HelpTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2">
      <Info className="w-4 h-4 text-gray-400 cursor-help transition-colors group-hover:text-[#0decfa]" />
      <div className="absolute left-0 top-6 hidden group-hover:block z-50 w-64 p-3 bg-black text-white text-sm rounded-lg shadow-lg">
        {text}
        <div className="absolute -top-1 left-4 w-2 h-2 bg-black transform rotate-45" />
      </div>
    </div>
  )

  if (showResults) {
    const valuation = calculateValuation()

    return (
      <div className="min-h-screen bg-white">
        <SharedHeader currentPage="other" />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Business Readiness Report</h1>
              <p className="text-sm md:text-base text-gray-600">Based on your responses, here's your valuation range</p>
            </div>

            {/* Valuation Range - Clear */}
            <div className="bg-gradient-to-br from-black to-gray-900 text-white p-6 md:p-8 rounded-2xl mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Estimated Valuation Range</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Minimum</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#0decfa]">€{valuation.min.toLocaleString()}</p>
                </div>
                <div className="text-2xl md:text-4xl text-gray-600">-</div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Maximum</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#0decfa]">€{valuation.max.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-center text-xs md:text-sm text-gray-400 mt-4">
                Based on {valuation.multiple}x EBITDA multiple
              </p>
            </div>

            {/* Blurred Results */}
            <div className="relative mb-8">
              <div className="filter blur-sm pointer-events-none select-none">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 mb-6">
                  <h3 className="text-lg md:text-xl font-bold mb-4">Financial Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">Revenue Growth Potential</p>
                      <p className="text-xl md:text-2xl font-bold">+45%</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">EBITDA Margin</p>
                      <p className="text-xl md:text-2xl font-bold">23%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold mb-4">5 Pillars Overview</h3>
                  <div className="space-y-4">
                    {["Tangible Assets", "Intangible Assets", "Finance & Capital", "Human Resources", "Commercial"].map(
                      (pillar) => (
                        <div
                          key={pillar}
                          className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm md:text-base font-medium">{pillar}</span>
                          <div className="flex gap-2">
                            <div className="w-16 md:w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: "70%" }} />
                            </div>
                            <span className="text-xs md:text-sm text-gray-600">70%</span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Overlay CTA */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-md text-center border-2 border-[#0decfa]">
                  <Calendar className="w-12 h-12 md:w-16 md:h-16 text-[#0decfa] mx-auto mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Unlock Your Full Report</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-6">
                    Book a call to see your complete analysis and discover how we can help optimize your business for
                    maximum valuation
                  </p>
                  <Button
                    className="w-full bg-[#0decfa] hover:bg-[#0decfa]/90 text-black font-semibold py-4 md:py-6 text-base md:text-lg"
                    onClick={() => (window.location.href = "https://calendly.com/your-link")}
                  >
                    Book Your Strategy Call
                  </Button>
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8">
              <h3 className="text-lg md:text-xl font-bold mb-4">Services You're Interested In</h3>
              <div className="space-y-3">
                {formData.interestedServices.map((service) => (
                  <div key={service} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-[#0decfa] flex-shrink-0" />
                    <span className="text-sm md:text-base">{service}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-6">
                We'll discuss these services in detail during your strategy call and create a customized implementation
                plan.
              </p>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="other" />
      <main className="pt-20 md:pt-24 pb-8 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Business Readiness Assessment</h1>
            <p className="text-sm md:text-base text-gray-600">
              Help us understand your business to provide tailored recommendations
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-4 overflow-x-auto pb-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all flex-shrink-0 ${
                      index + 1 < currentStep
                        ? "bg-[#0decfa] text-black"
                        : index + 1 === currentStep
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index + 1 < currentStep ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-1 mx-1 md:mx-2 transition-all ${
                        index + 1 < currentStep ? "bg-[#0decfa]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs md:text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
            {/* Step 1: Company Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Company Information</h2>

                <div>
                  <Label htmlFor="companyName" className="flex items-center">
                    Company Name *
                    <HelpTooltip text="Your registered legal company name" />
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="mt-2"
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <Label htmlFor="vat" className="flex items-center">
                    VAT Number *
                    <HelpTooltip text="Your company's VAT identification number" />
                  </Label>
                  <Input
                    id="vat"
                    value={formData.vat}
                    onChange={(e) => handleInputChange("vat", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., PT123456789"
                  />
                  {errors.vat && <p className="text-red-500 text-sm mt-1">{errors.vat}</p>}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="noWebsite"
                      checked={formData.noWebsite}
                      onCheckedChange={(checked) => handleInputChange("noWebsite", checked)}
                    />
                    <Label htmlFor="noWebsite" className="cursor-pointer">
                      I don't have a website
                    </Label>
                  </div>
                </div>

                {!formData.noWebsite && (
                  <div>
                    <Label htmlFor="website" className="flex items-center">
                      Website *
                      <HelpTooltip text="Your company's website URL" />
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="mt-2"
                      placeholder="https://www.example.com"
                    />
                    {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
                  </div>
                )}

                {formData.noWebsite && (
                  <div>
                    <Label htmlFor="linkedin" className="flex items-center">
                      LinkedIn Profile
                      <HelpTooltip text="Your company's LinkedIn page" />
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      className="mt-2"
                      placeholder="https://www.linkedin.com/company/..."
                    />
                    {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="flex items-center">
                    Email *
                    <HelpTooltip text="Your business email address" />
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2"
                    placeholder="contact@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    Phone *
                    <HelpTooltip text="Your business phone number" />
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-2"
                    placeholder="+351 123 456 789"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Business Details</h2>

                <div>
                  <Label htmlFor="industry" className="flex items-center">
                    Industry *
                    <HelpTooltip text="The primary industry your business operates in" />
                  </Label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => handleInputChange("industry", e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0decfa]"
                  >
                    <option value="">Select an industry</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                    <option value="Hospitality">Hospitality & Tourism</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                </div>

                <div>
                  <Label htmlFor="yearsInBusiness" className="flex items-center">
                    Years in Business *
                    <HelpTooltip text="How long has your company been operating" />
                  </Label>
                  <Input
                    id="yearsInBusiness"
                    type="number"
                    min="0"
                    value={formData.yearsInBusiness}
                    onChange={(e) => handleInputChange("yearsInBusiness", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 5"
                  />
                  {errors.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness}</p>}
                </div>

                <div>
                  <Label htmlFor="employees" className="flex items-center">
                    Number of Employees *
                    <HelpTooltip text="Total number of people working in your company" />
                  </Label>
                  <Input
                    id="employees"
                    type="number"
                    min="0"
                    value={formData.employees}
                    onChange={(e) => handleInputChange("employees", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 25"
                  />
                  {errors.employees && <p className="text-red-500 text-sm mt-1">{errors.employees}</p>}
                </div>

                <div>
                  <Label htmlFor="description" className="flex items-center">
                    Business Description *
                    <HelpTooltip text="Brief description of what your company does" />
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="mt-2"
                    rows={4}
                    placeholder="Describe your business, products, and services..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Current Challenges */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Current Challenges</h2>
                <p className="text-gray-600 mb-4">Select all that apply</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Cash Flow Management",
                    "Access to Capital",
                    "Market Competition",
                    "Talent Acquisition",
                    "Operational Efficiency",
                    "Technology Integration",
                    "Regulatory Compliance",
                    "Customer Acquisition",
                  ].map((challenge) => (
                    <div
                      key={challenge}
                      onClick={() => toggleArrayItem("challenges", challenge)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.challenges.includes(challenge)
                          ? "border-[#0decfa] bg-[#0decfa]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox checked={formData.challenges.includes(challenge)} className="pointer-events-none" />
                        <span className="font-medium">{challenge}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.challenges && <p className="text-red-500 text-sm mt-1">{errors.challenges}</p>}
              </div>
            )}

            {/* Step 4: Financial Info */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Financial Information</h2>

                <div>
                  <Label htmlFor="annualRevenue" className="flex items-center">
                    Annual Revenue (€) *
                    <HelpTooltip text="Your company's total annual revenue" />
                  </Label>
                  <Input
                    id="annualRevenue"
                    type="number"
                    min="0"
                    value={formData.annualRevenue}
                    onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 1000000"
                  />
                  {errors.annualRevenue && <p className="text-red-500 text-sm mt-1">{errors.annualRevenue}</p>}
                </div>

                <div>
                  <Label htmlFor="ebitda" className="flex items-center">
                    EBITDA (€) *
                    <HelpTooltip text="Earnings Before Interest, Taxes, Depreciation, and Amortization" />
                  </Label>
                  <Input
                    id="ebitda"
                    type="number"
                    value={formData.ebitda}
                    onChange={(e) => handleInputChange("ebitda", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 200000"
                  />
                  {errors.ebitda && <p className="text-red-500 text-sm mt-1">{errors.ebitda}</p>}
                </div>

                <div>
                  <Label htmlFor="assets" className="flex items-center">
                    Total Assets (€)
                    <HelpTooltip text="Total value of company assets" />
                  </Label>
                  <Input
                    id="assets"
                    type="number"
                    min="0"
                    value={formData.assets}
                    onChange={(e) => handleInputChange("assets", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 500000"
                  />
                </div>

                <div>
                  <Label htmlFor="liabilities" className="flex items-center">
                    Total Liabilities (€)
                    <HelpTooltip text="Total company debts and obligations" />
                  </Label>
                  <Input
                    id="liabilities"
                    type="number"
                    min="0"
                    value={formData.liabilities}
                    onChange={(e) => handleInputChange("liabilities", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 200000"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Growth Goals */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Growth Goals</h2>
                <p className="text-gray-600 mb-4">What are your primary growth objectives?</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    "Increase Revenue",
                    "Expand Market Share",
                    "Enter New Markets",
                    "Improve Profitability",
                    "Scale Operations",
                    "Acquire Competitors",
                    "Develop New Products",
                    "Attract Investment",
                  ].map((goal) => (
                    <div
                      key={goal}
                      onClick={() => toggleArrayItem("growthGoals", goal)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.growthGoals.includes(goal)
                          ? "border-[#0decfa] bg-[#0decfa]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox checked={formData.growthGoals.includes(goal)} className="pointer-events-none" />
                        <span className="font-medium">{goal}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.growthGoals && <p className="text-red-500 text-sm mt-1">{errors.growthGoals}</p>}

                <div>
                  <Label htmlFor="targetRevenue" className="flex items-center">
                    Target Revenue in 3 Years (€) *
                    <HelpTooltip text="Your revenue goal for the next 3 years" />
                  </Label>
                  <Input
                    id="targetRevenue"
                    type="number"
                    min="0"
                    value={formData.targetRevenue}
                    onChange={(e) => handleInputChange("targetRevenue", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 5000000"
                  />
                  {errors.targetRevenue && <p className="text-red-500 text-sm mt-1">{errors.targetRevenue}</p>}
                </div>

                <div>
                  <Label htmlFor="timeline" className="flex items-center">
                    Timeline to Achieve Goals *
                    <HelpTooltip text="When do you plan to achieve these goals" />
                  </Label>
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0decfa]"
                  >
                    <option value="">Select timeline</option>
                    <option value="1 year">Within 1 year</option>
                    <option value="2 years">Within 2 years</option>
                    <option value="3 years">Within 3 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                  {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
                </div>
              </div>
            )}

            {/* Step 6: Investment Readiness */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Investment Readiness</h2>

                <div>
                  <Label htmlFor="fundingNeeded" className="flex items-center">
                    Funding Needed (€) *
                    <HelpTooltip text="How much capital are you looking to raise" />
                  </Label>
                  <Input
                    id="fundingNeeded"
                    type="number"
                    min="0"
                    value={formData.fundingNeeded}
                    onChange={(e) => handleInputChange("fundingNeeded", e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 500000"
                  />
                  {errors.fundingNeeded && <p className="text-red-500 text-sm mt-1">{errors.fundingNeeded}</p>}
                </div>

                <div>
                  <Label htmlFor="fundingPurpose" className="flex items-center">
                    Purpose of Funding *
                    <HelpTooltip text="How will you use the capital" />
                  </Label>
                  <Textarea
                    id="fundingPurpose"
                    value={formData.fundingPurpose}
                    onChange={(e) => handleInputChange("fundingPurpose", e.target.value)}
                    className="mt-2"
                    rows={4}
                    placeholder="Describe how you plan to use the funding..."
                  />
                  {errors.fundingPurpose && <p className="text-red-500 text-sm mt-1">{errors.fundingPurpose}</p>}
                </div>

                <div>
                  <Label htmlFor="previousFunding" className="flex items-center">
                    Previous Funding Rounds
                    <HelpTooltip text="Have you raised capital before?" />
                  </Label>
                  <Textarea
                    id="previousFunding"
                    value={formData.previousFunding}
                    onChange={(e) => handleInputChange("previousFunding", e.target.value)}
                    className="mt-2"
                    rows={3}
                    placeholder="Describe any previous funding rounds (optional)"
                  />
                </div>
              </div>
            )}

            {/* Step 7: Operational Maturity */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Operational Maturity</h2>
                <p className="text-gray-600 mb-4">Check all that apply to your business</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg">
                    <Checkbox
                      id="hasFinancialStatements"
                      checked={formData.hasFinancialStatements}
                      onCheckedChange={(checked) => handleInputChange("hasFinancialStatements", checked)}
                    />
                    <Label htmlFor="hasFinancialStatements" className="cursor-pointer flex-1">
                      <span className="font-medium">Audited Financial Statements</span>
                      <p className="text-sm text-gray-600">We have audited financial statements for the last 3 years</p>
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg">
                    <Checkbox
                      id="hasBusinessPlan"
                      checked={formData.hasBusinessPlan}
                      onCheckedChange={(checked) => handleInputChange("hasBusinessPlan", checked)}
                    />
                    <Label htmlFor="hasBusinessPlan" className="cursor-pointer flex-1">
                      <span className="font-medium">Comprehensive Business Plan</span>
                      <p className="text-sm text-gray-600">
                        We have a detailed business plan with financial projections
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg">
                    <Checkbox
                      id="hasLegalCompliance"
                      checked={formData.hasLegalCompliance}
                      onCheckedChange={(checked) => handleInputChange("hasLegalCompliance", checked)}
                    />
                    <Label htmlFor="hasLegalCompliance" className="cursor-pointer flex-1">
                      <span className="font-medium">Legal Compliance</span>
                      <p className="text-sm text-gray-600">All legal and regulatory requirements are up to date</p>
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg">
                    <Checkbox
                      id="hasIPProtection"
                      checked={formData.hasIPProtection}
                      onCheckedChange={(checked) => handleInputChange("hasIPProtection", checked)}
                    />
                    <Label htmlFor="hasIPProtection" className="cursor-pointer flex-1">
                      <span className="font-medium">Intellectual Property Protection</span>
                      <p className="text-sm text-gray-600">We have patents, trademarks, or other IP protections</p>
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Service Interest */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Services of Interest</h2>
                <p className="text-gray-600 mb-4">Which services would you like to explore?</p>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Tangible Assets Optimization",
                    "Intangible Assets Development",
                    "Finance & Capital Structuring",
                    "Human Resources Development",
                    "Commercial Growth Strategy",
                    "Public Contracts & Procurement",
                    "B2B Networking & Partnerships",
                    "Valuation & Exit Strategy",
                    "Private Capital Operations",
                    "Operational Excellence",
                  ].map((service) => (
                    <div
                      key={service}
                      onClick={() => toggleArrayItem("interestedServices", service)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.interestedServices.includes(service)
                          ? "border-[#0decfa] bg-[#0decfa]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={formData.interestedServices.includes(service)}
                          className="pointer-events-none"
                        />
                        <span className="font-medium">{service}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.interestedServices && <p className="text-red-500 text-sm mt-1">{errors.interestedServices}</p>}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center gap-2 bg-transparent text-sm md:text-base px-4 md:px-6"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-[#0decfa] hover:bg-[#0decfa]/90 text-black font-semibold text-sm md:text-base px-4 md:px-6"
            >
              <span className="hidden sm:inline">{currentStep === totalSteps ? "View Results" : "Next"}</span>
              <span className="sm:hidden">{currentStep === totalSteps ? "Results" : "Next"}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
