export interface Listing {
  id: string
  title: string
  type: 'Service' | 'Marketing Agency' | 'SaaS' | 'E-commerce' | 'Content'
  industry: string
  description: string
  location: string
  siteAge: string
  monthlyProfit: number
  profitMargin: number
  revenue: number
  askingPrice: number
  pageViews: number
  profitMultiple: number
  revenueMultiple: number
  monetization: string
  status: 'pending' | 'active' | 'under-review' | 'sold'
  dealStage: 'submission' | 'document-verification' | 'investor-matching' | 'negotiation' | 'due-diligence' | 'closing'
  verified: boolean
  confidential: boolean
  editorChoice: boolean
  sponsored: boolean
  views: number
  watchers: number
  comments: number
  matchedInvestors: number
  createdAt: Date
  feedback?: DealFeedback[]
  notifications?: DealNotification[]
}

export interface DealFeedback {
  id: string
  investorName: string
  timestamp: Date
  interested: boolean
  reason?: string
  stage: string
}

export interface DealNotification {
  id: string
  type: 'document-request' | 'document-approved' | 'investor-interest' | 'offer-received'
  message: string
  timestamp: Date
  read: boolean
  actionRequired: boolean
}

export interface InvestorProfile {
  id: string
  name: string
  email: string
  investmentThesis: string
  industries: string[]
  minDealSize: number
  maxDealSize: number
  preferredLocations: string[]
  assetTypes: string[]
  matchedListings: number
}

export const mockListings: Listing[] = [
  {
    id: 'lst-001',
    title: 'Service Business | Business',
    type: 'Service',
    industry: 'Business',
    description: 'AI-driven agency with an existing MNC client. $400k+ recurring revenue paid 12 months in advance. Exceptional cash flow, lean operations & 30% profit margins.',
    location: 'Singapore',
    siteAge: '8 years',
    monthlyProfit: 6626,
    profitMargin: 20,
    revenue: 477840,
    askingPrice: 388996,
    pageViews: 1210,
    profitMultiple: 4.2,
    revenueMultiple: 0.8,
    monetization: 'Other',
    status: 'active',
    dealStage: 'investor-matching',
    verified: true,
    confidential: true,
    editorChoice: true,
    sponsored: true,
    views: 1043,
    watchers: 53,
    comments: 0,
    matchedInvestors: 12,
    createdAt: new Date('2026-01-15'),
    feedback: [
      {
        id: 'fb-001',
        investorName: 'TechVentures Capital',
        timestamp: new Date('2026-01-20'),
        interested: true,
        stage: 'reviewing-documents'
      },
      {
        id: 'fb-002',
        investorName: 'Global Investment Group',
        timestamp: new Date('2026-01-19'),
        interested: false,
        reason: 'Geographic location does not match our investment thesis',
        stage: 'initial-review'
      }
    ],
    notifications: [
      {
        id: 'not-001',
        type: 'investor-interest',
        message: 'TechVentures Capital expressed interest in your listing',
        timestamp: new Date('2026-01-20'),
        read: false,
        actionRequired: false
      },
      {
        id: 'not-002',
        type: 'document-request',
        message: 'Additional financial statements requested',
        timestamp: new Date('2026-01-19'),
        read: false,
        actionRequired: true
      }
    ]
  },
  {
    id: 'lst-002',
    title: 'Marketing Agency | Health and Beauty',
    type: 'Marketing Agency',
    industry: 'Health and Beauty',
    description: 'Specialist Healthcare Digital Agency | 80% Recurring Revenue | SEO, Paid, Web | Loyal Clients & Long-Term Contracts | Team in place',
    location: 'Australia',
    siteAge: '10 years',
    monthlyProfit: 13544,
    profitMargin: 25,
    revenue: 650112,
    askingPrice: 587060,
    pageViews: 3420,
    profitMultiple: 3.6,
    revenueMultiple: 0.6,
    monetization: 'Services & Subscriptions',
    status: 'active',
    dealStage: 'investor-matching',
    verified: true,
    confidential: true,
    editorChoice: true,
    sponsored: true,
    views: 2341,
    watchers: 89,
    comments: 5,
    matchedInvestors: 8,
    createdAt: new Date('2026-01-10')
  },
  {
    id: 'lst-003',
    title: 'SaaS Platform | Project Management',
    type: 'SaaS',
    industry: 'Technology',
    description: 'Modern project management tool with 500+ paying customers. Strong MRR growth, low churn rate, automated operations.',
    location: 'United States',
    siteAge: '5 years',
    monthlyProfit: 22000,
    profitMargin: 35,
    revenue: 756000,
    askingPrice: 1200000,
    pageViews: 5600,
    profitMultiple: 4.5,
    revenueMultiple: 1.6,
    monetization: 'Subscriptions',
    status: 'under-review',
    dealStage: 'document-verification',
    verified: false,
    confidential: false,
    editorChoice: false,
    sponsored: false,
    views: 423,
    watchers: 21,
    comments: 2,
    matchedInvestors: 0,
    createdAt: new Date('2026-01-22'),
    notifications: [
      {
        id: 'not-003',
        type: 'document-request',
        message: 'Please upload audited financial statements for 2024-2025',
        timestamp: new Date('2026-01-22'),
        read: false,
        actionRequired: true
      }
    ]
  },
  {
    id: 'lst-004',
    title: 'E-commerce Store | Fashion',
    type: 'E-commerce',
    industry: 'Fashion',
    description: 'Profitable fashion e-commerce with strong social media presence. Dropshipping model with established supplier relationships.',
    location: 'United Kingdom',
    siteAge: '3 years',
    monthlyProfit: 8500,
    profitMargin: 18,
    revenue: 566400,
    askingPrice: 320000,
    pageViews: 12000,
    profitMultiple: 3.1,
    revenueMultiple: 0.56,
    monetization: 'Product Sales',
    status: 'active',
    dealStage: 'negotiation',
    verified: true,
    confidential: false,
    editorChoice: false,
    sponsored: false,
    views: 876,
    watchers: 34,
    comments: 8,
    matchedInvestors: 5,
    createdAt: new Date('2026-01-08')
  }
]

export const mockInvestorProfiles: InvestorProfile[] = [
  {
    id: 'inv-001',
    name: 'TechVentures Capital',
    email: 'contact@techventures.com',
    investmentThesis: 'We invest in technology-enabled service businesses with recurring revenue models and strong unit economics.',
    industries: ['Technology', 'Business', 'SaaS'],
    minDealSize: 250000,
    maxDealSize: 2000000,
    preferredLocations: ['Singapore', 'United States', 'United Kingdom'],
    assetTypes: ['Service', 'SaaS'],
    matchedListings: 23
  },
  {
    id: 'inv-002',
    name: 'Healthcare Growth Partners',
    email: 'invest@healthgrowth.com',
    investmentThesis: 'Focus on healthcare and wellness businesses with proven track records and scalable operations.',
    industries: ['Health and Beauty', 'Healthcare', 'Wellness'],
    minDealSize: 500000,
    maxDealSize: 5000000,
    preferredLocations: ['Australia', 'United States', 'Canada'],
    assetTypes: ['Marketing Agency', 'Service', 'E-commerce'],
    matchedListings: 15
  }
]

export function getListingById(id: string): Listing | undefined {
  return mockListings.find(l => l.id === id)
}

export function getListingsByStatus(status: Listing['status']): Listing[] {
  return mockListings.filter(l => l.status === status)
}

export function getMatchedListingsForInvestor(investorId: string): Listing[] {
  // Mock matching algorithm
  return mockListings.filter(l => l.status === 'active' && l.verified)
}
