'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2, Upload, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function BuyerOnboardingPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    investmentThesis: '',
    industries: [] as string[],
    minDealSize: '',
    maxDealSize: '',
    preferredLocations: [] as string[],
    assetTypes: [] as string[]
  })

  const [aiAnalysis, setAiAnalysis] = useState({
    summary: '',
    focusAreas: [] as string[],
    matchedListings: 0,
    confidence: 0
  })

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Real Estate', 'Manufacturing',
    'Retail', 'Hospitality', 'Education', 'Energy', 'Transportation',
    'Media', 'Telecommunications', 'Agriculture', 'Construction'
  ]

  const assetTypes = [
    'Service Business', 'SaaS', 'E-commerce', 'Marketing Agency',
    'Real Estate', 'Manufacturing', 'Content Business'
  ]

  const locations = [
    'Portugal', 'Spain', 'United States', 'United Kingdom', 'Germany',
    'France', 'Italy', 'Singapore', 'Australia', 'Canada', 'Brazil'
  ]

  const handleAnalyzeThesis = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock AI analysis result
    const mockAnalysis = {
      summary: 'You are focused on technology-enabled service businesses with strong recurring revenue models and proven unit economics. Your investment strategy emphasizes cash-flowing businesses in the $250K-$2M range with sustainable competitive advantages.',
      focusAreas: [
        'SaaS and subscription-based models',
        'Technology-enabled services',
        'Businesses with recurring revenue',
        'Established customer bases',
        'Strong unit economics'
      ],
      matchedListings: 23,
      confidence: 92
    }
    
    setAiAnalysis(mockAnalysis)
    setIsAnalyzing(false)
    setAnalysisComplete(true)
  }

  const handleAnalyzeWebsite = async () => {
    setIsAnalyzing(true)
    
    // Simulate website analysis
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    setFormData(prev => ({
      ...prev,
      investmentThesis: `We are a growth-focused investment firm specializing in technology-enabled businesses. We seek companies with proven business models, strong management teams, and clear paths to scale. Our investment thesis focuses on recurring revenue models, high-margin businesses, and opportunities in emerging markets. We provide not just capital, but strategic guidance and operational support to help businesses reach their full potential.`
    }))
    
    setIsAnalyzing(false)
  }

  const handleUploadPDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setIsAnalyzing(true)
    
    // Simulate PDF analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setFormData(prev => ({
      ...prev,
      investmentThesis: `Investment Thesis (Extracted from PDF):\n\nWe are a specialized investment fund focusing on digital businesses with strong fundamentals. Our core investment criteria include: minimum 3 years operational history, proven revenue model with 20%+ margins, scalable operations, and defensible market position. We typically invest $500K-$5M per deal and maintain an active portfolio management approach.`
    }))
    
    setIsAnalyzing(false)
  }

  const handleSubmit = async () => {
    await register(formData.email, 'password', formData.name, 'buyer')
    router.push('/buyer/dashboard')
  }

  const toggleSelection = (field: 'industries' | 'assetTypes' | 'preferredLocations', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Buyer Registration</h1>
          <p className="text-muted-foreground">
            Tell us about your investment criteria to get matched with relevant opportunities
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company/Fund Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Investment Partners LLC"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://company.com"
              />
              {formData.website && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAnalyzeWebsite}
                  disabled={isAnalyzing}
                  className="w-full gap-2 bg-transparent"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing website...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Auto-generate thesis from website
                    </>
                  )}
                </Button>
              )}
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full mt-6"
              size="lg"
              disabled={!formData.name || !formData.email || !formData.company}
            >
              Continue
            </Button>
          </Card>
        )}

        {/* Step 2: Investment Thesis */}
        {step === 2 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Investment Thesis</h2>
            
            <div className="space-y-2">
              <Label htmlFor="thesis">Describe your investment criteria and focus areas *</Label>
              <Textarea
                id="thesis"
                value={formData.investmentThesis}
                onChange={(e) => setFormData(prev => ({ ...prev, investmentThesis: e.target.value }))}
                placeholder="We invest in technology-enabled service businesses with recurring revenue models..."
                rows={8}
                required
              />
              <p className="text-xs text-muted-foreground">
                Minimum 100 characters. Be specific about your investment criteria, preferred industries, deal sizes, and strategic focus.
              </p>
            </div>

            {/* Upload PDF */}
            <div className="border-2 border-dashed border-muted p-6 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">Upload Investment Thesis PDF</p>
              <p className="text-xs text-muted-foreground mb-3">
                We'll analyze your document and extract key criteria
              </p>
              <Input
                type="file"
                accept=".pdf"
                onChange={handleUploadPDF}
                className="max-w-xs mx-auto"
              />
            </div>

            {/* AI Analysis */}
            {formData.investmentThesis.length >= 100 && (
              <div className="pt-4">
                {!analysisComplete ? (
                  <Button
                    onClick={handleAnalyzeThesis}
                    disabled={isAnalyzing}
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing your investment thesis...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze Thesis with AI
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">Analysis Complete ({aiAnalysis.confidence}% confidence)</span>
                    </div>

                    <div className="p-4 bg-muted/30 border">
                      <h3 className="font-semibold mb-2">AI Summary</h3>
                      <p className="text-sm text-muted-foreground">{aiAnalysis.summary}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Identified Focus Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.focusAreas.map((area, idx) => (
                          <Badge key={idx} variant="secondary">{area}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                      <div>
                        <div className="font-semibold text-blue-900">
                          {aiAnalysis.matchedListings} Businesses Match Your Criteria
                        </div>
                        <div className="text-sm text-blue-700">
                          Based on your investment thesis analysis
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1"
                disabled={!analysisComplete}
              >
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Investment Criteria */}
        {step === 3 && (
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Investment Criteria</h2>
            
            <div className="space-y-2">
              <Label>Industries of Interest *</Label>
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <Badge
                    key={industry}
                    variant={formData.industries.includes(industry) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleSelection('industries', industry)}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Asset Types *</Label>
              <div className="flex flex-wrap gap-2">
                {assetTypes.map(type => (
                  <Badge
                    key={type}
                    variant={formData.assetTypes.includes(type) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleSelection('assetTypes', type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Locations *</Label>
              <div className="flex flex-wrap gap-2">
                {locations.map(location => (
                  <Badge
                    key={location}
                    variant={formData.preferredLocations.includes(location) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleSelection('preferredLocations', location)}
                  >
                    {location}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minDealSize">Minimum Deal Size (EUR) *</Label>
                <Input
                  id="minDealSize"
                  type="number"
                  value={formData.minDealSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, minDealSize: e.target.value }))}
                  placeholder="250000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDealSize">Maximum Deal Size (EUR) *</Label>
                <Input
                  id="maxDealSize"
                  type="number"
                  value={formData.maxDealSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxDealSize: e.target.value }))}
                  placeholder="5000000"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1"
                size="lg"
                disabled={
                  formData.industries.length === 0 ||
                  formData.assetTypes.length === 0 ||
                  formData.preferredLocations.length === 0 ||
                  !formData.minDealSize ||
                  !formData.maxDealSize
                }
              >
                Complete Registration
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
