"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "EN" | "ES" | "PT"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
  EN: {
    // Header & Navigation
    "nav.marketValue": "Market Value",
    "nav.whatWeDo": "What we do",
    "nav.forBusinesses": "For Businesses",
    "nav.forInvestors": "For Investors",
    "nav.techVenture": "Tech Venture",
    "nav.investors": "Investors",
    "nav.start": "Start",

    // Hero Section
    "hero.title": "Globalizing Companies that investors can't ignore.",
    "hero.subtitle": "The volatility of Capital Markets is an opportunity for companies with operational excellence.",
    "hero.scrollToExplore": "Scroll to explore",
    "hero.forBusinesses": "For Businesses",
    "hero.forInvestors": "For Investors",
    "hero.valueNow": "Value now",

    // Value Section
    "value.title": "Companies miss",
    "value.titleBold1": "market timings",
    "value.titleBold2": "and value",
    "value.subtitle": "not because they had bad results,",
    "value.subtitleBold": "because markets fluctuate.",
    "value.realTimeValue": "Real-Time Value",
    "value.company": "Company",
    "value.year": "Year",
    "value.ebitda": "EBITDA",
    "value.multiple": "Multiple",
    "value.finalValue": "Final Value",
    "value.scenario": "Scenario with 0 Debt, calculation basis:",
    "value.formula": "Valuation= [ EBITDA x ( Market Multiple + Spread ) ] - Debt",
    "value.keyInsight": "Key Insight",
    "value.keyInsightText":
      "Raising just your EBITDA doesn't mean immediate company value raise, the markets fluctuate and risks can throw your valuation down (market indexes).",
    "value.solution": "The Solution",
    "value.solutionText": "You have to increase both",
    "value.dueDiligence": "Due Diligence Investors Know-How",
    "value.dueDiligenceText":
      "Raising your EBITDA & Multiples = Time is money. Save both having exit strategies knowledge.",

    // What We Do Section
    "whatWeDo.header": "What we do",
    "whatWeDo.title": "Market Value Optimization",
    "whatWeDo.titleBold": "& Capital Advisory",
    "whatWeDo.subtitle":
      "Transforming businesses through strategic capital advisory and comprehensive value optimization",
    "whatWeDo.ebitda": "+ 10M€ in EBITDA",
    "whatWeDo.target": "target",
    "whatWeDo.pillar1": "We help you thrive across all your",
    "whatWeDo.pillar1Bold": "5 Pillars",
    "whatWeDo.pillar1List": "Commercial, Intangible, Physical, People, and Financial.",
    "whatWeDo.pillar2": "We leverage",
    "whatWeDo.pillar2Bold": "proprietary know-how",
    "whatWeDo.pillar2Text": "based on our",
    "whatWeDo.pillar2Bold2": "Capital Partners Investors",
    "whatWeDo.pillar2Text2": "who acquire businesses knowing exactly what increases your",
    "whatWeDo.pillar2Bold3": "EBITDA and Multiples",
    "whatWeDo.pillar3": "From",
    "whatWeDo.pillar3Bold": "In-house vs outsource",
    "whatWeDo.pillar3Text": "for margin optimization. To",
    "whatWeDo.pillar3Bold2": "Legal Structures",
    "whatWeDo.pillar3Text2": "Holding vs Business Units.",
    "whatWeDo.pillar4": "Help operations align with",
    "whatWeDo.pillar4Bold": "private capital market timings",
    "whatWeDo.pillar4Text": ", and execute the needed",
    "whatWeDo.pillar4Bold2": "capital transactions",
    "whatWeDo.pillar4Text2": "from Debt leveraging to M&A deals.",

    // Stakeholders Section
    "stakeholders.title": "3 Stakeholders",
    "stakeholders.founder.title": "Founders & Shareholders",
    "stakeholders.founder.description": "Maximize your company valuation and capture the perfect exit moment",
    "stakeholders.founder.point1": "Valuation readiness assessment",
    "stakeholders.founder.point2": "Strategic positioning for investors",
    "stakeholders.founder.point3": "Capital execution support",
    "stakeholders.founder.point4": "Operational optimization",
    "stakeholders.investor.title": "Capital Investors",
    "stakeholders.investor.description": "Access qualified deal flow with pre-screened investment opportunities",
    "stakeholders.investor.point1": "Live qualified deal pipeline",
    "stakeholders.investor.point2": "Structurally optimized assets",
    "stakeholders.investor.point3": "Multi-region coverage",
    "stakeholders.investor.point4": "Transparent metrics & reporting",
    "stakeholders.investor.point5": "Co-Investment Opportunities and portfolio diversification",
    "stakeholders.partner.title": "Operational Partners",
    "stakeholders.partner.description": "Collaborate on the five pillars to unlock hidden company value",
    "stakeholders.partner.point1": "Commercial & procurement optimization",
    "stakeholders.partner.point2": "Operational efficiency gains",
    "stakeholders.partner.point3": "Asset valorization",
    "stakeholders.partner.point4": "Capital structuring support",
    "stakeholders.partner.point5": "Accounting, Legal works, Technological partners",
    "stakeholders.startNow": "Start Now",

    // Investors Section
    "investors.title": "For Capital",
    "investors.titleBold": "Investors",
    "investors.subtitle":
      "Access pre-qualified deal flow with structurally optimized assets ready for immediate value creation",
    "investors.benefit1.title": "Pre-Qualified Deal Pipeline",
    "investors.benefit1.description":
      "Live access to vetted investment opportunities across multiple industries and regions",
    "investors.benefit2.title": "Structurally Optimized Assets",
    "investors.benefit2.description":
      "Companies already analyzed and improved across all five pillars for maximum ROI potential",
    "investors.benefit3.title": "Transparent Value Metrics",
    "investors.benefit3.description":
      "Clear EBITDA projections and multiple spreads with detailed optimization roadmaps",
    "investors.benefit4.title": "Multi-Region Coverage",
    "investors.benefit4.description": "Deal flow across Europe, Americas, and emerging markets with local expertise",
    "investors.benefit5.title": "Co-Investment Opportunities",
    "investors.benefit5.description":
      "Partner with other qualified investors to diversify risk and maximize portfolio performance",
    "investors.benefit6.title": "Exit Strategy Alignment",
    "investors.benefit6.description":
      "Deals structured with clear exit paths and market timing optimization from day one",
    "investors.cta": "Access Deal Flow",
    "Access continuously vetted investment opportunities across multiple sectors and regions, ensuring you're always ahead of market trends.":
      "Access continuously vetted investment opportunities across multiple sectors and regions, ensuring you're always ahead of market trends.",
    "Every asset in our pipeline has been through our rigorous optimization process, reducing post-acquisition complexity and accelerating value realization.":
      "Every asset in our pipeline has been through our rigorous optimization process, reducing post-acquisition complexity and accelerating value realization.",
    "Expand your portfolio across Portugal, Spain, and emerging European markets with local expertise and on-the-ground intelligence.":
      "Expand your portfolio across Portugal, Spain, and emerging European markets with local expertise and on-the-ground intelligence.",
    "Ready to": "Ready to",
    "Discuss Opportunities?": "Discuss Opportunities?",
    "Schedule a call with our team to explore investment opportunities tailored to your criteria.":
      "Schedule a call with our team to explore investment opportunities tailored to your criteria.",
    "Schedule a Call": "Schedule a Call",
    "Need Help?": "Need Help?",
    "Let's Talk": "Let's Talk",
    "Schedule a free consultation to discuss your company valuation and growth strategy.":
      "Schedule a free consultation to discuss your company valuation and growth strategy.",
    "Quanto investidores pagam hoje pelo seu negócio?": "What would investors pay for your business today?",
    "Frequently Asked": "Frequently Asked",
    Questions: "Questions",
    "Everything you need to know about our process": "Everything you need to know about our process",
    "How long does the process take?": "How long does the process take?",
    "The typical process takes 3-18 months depending on the asset type and market conditions. We provide weekly updates on buyer pipeline and match count throughout the entire process.":
      "The typical process takes 3-18 months depending on the asset type and market conditions. We provide weekly updates on buyer pipeline and match count throughout the entire process.",
    "What is the retainer and how does it work?": "What is the retainer and how does it work?",
    "The retainer covers all costs including document creation, marketing materials, and buyer sourcing. If we don't close within the planned timeline, we refund the full retainer. Upon successful sale, the retainer is deducted from the success fee.":
      "The retainer covers all costs including document creation, marketing materials, and buyer sourcing. If we don't close within the planned timeline, we refund the full retainer. Upon successful sale, the retainer is deducted from the success fee.",
    "What documents do I need to provide?": "What documents do I need to provide?",
    "After verification, we'll provide a detailed list of required documents specific to your asset type. This typically includes financial statements, legal documents, and operational data. We help you prepare everything needed.":
      "After verification, we'll provide a detailed list of required documents specific to your asset type. This typically includes financial statements, legal documents, and operational data. We help you prepare everything needed.",
    "How do you protect my confidentiality?": "How do you protect my confidentiality?",
    "We use blind teasers initially, revealing your identity only after investors sign NDAs. All buyer prospects are pre-qualified and vetted before receiving any detailed information about your asset.":
      "We use blind teasers initially, revealing your identity only after investors sign NDAs. All buyer prospects are pre-qualified and vetted before receiving any detailed information about your asset.",
    "What types of assets do you handle?": "What types of assets do you handle?",
    "We handle companies, commercial real estate, intellectual property, and other high-value assets. Each asset is evaluated individually to ensure we can provide the best service and buyer matching.":
      "We handle companies, commercial real estate, intellectual property, and other high-value assets. Each asset is evaluated individually to ensure we can provide the best service and buyer matching.",
    "How are buyers matched to my asset?": "How are buyers matched to my asset?",
    "We maintain a curated network of verified investors and buyers. Using our proprietary matching system, we identify prospects based on investment criteria, industry focus, ticket size, and strategic fit.":
      "We maintain a curated network of verified investors and buyers. Using our proprietary matching system, we identify prospects based on investment criteria, industry focus, ticket size, and strategic fit.",

    // Analysis Section
    "analysis.cta": "Discover How We Can Optimize Your Business Value",
    "analysis.ctaButton": "Start Your Value Assessment",

    // Footer
    "footer.legal": "Legal",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.sustainability": "Sustainability",
    "footer.knowledge": "Knowledge",

    // Industries
    "industry.realEstate": "Real Estate &\nConstruction",
    "industry.infrastructure": "Infrastructure\n& Energy",
    "industry.lifeSciences": "Life Sciences\n& Healthcare",
    "industry.hospitality": "Hospitality\n& Tourism",
    "industry.industrial": "Industrial\n& Manufacturing",
    "industry.commodities": "Commodities &\nNatural Resources",
    "industry.consulting": "Consulting &\nBusiness Services",
    "industry.financial": "Financial Services\n& Private Capital",
    "industry.transport": "Transport &\nLogistics",
    "industry.tmt": "Technology, Media &\nTelecommunications",

    // Opportunity Section
    "opportunity.text": "Time is counting and you are losing opportunities...",
    "opportunity.startNow": "Start Now",
    "opportunity.startBusiness": "Start as Business",
    "opportunity.startInvestor": "Start as Investor",

    // Pillar Descriptions (from analysis-section)
    "pillar.commercial.title": "Commercial",
    "pillar.commercial.description":
      "Transform your commercial strategy from reactive to predictive. We help you capture both visible market opportunities and hidden contract value through strategic RFP positioning and procurement intelligence.",
    "pillar.intangible.title": "Intangible Assets Value",
    "pillar.intangible.description":
      "Maximize your exit multiples by building defensible intellectual property. We help you create proprietary systems and knowledge assets that make your business irreplaceable in the market.",
    "pillar.physical.title": "Tangible Assets",
    "pillar.physical.description":
      "Optimize your physical asset portfolio for maximum operational efficiency and valuation impact. We help you strategically acquire, maintain, and requalify tangible assets to support sustainable growth.",
    "pillar.people.title": "Human Resources (People)",
    "pillar.people.description":
      "Build your dream team as a strategic asset. We help you attract, develop, and retain top talent with market-aligned compensation structures and engagement programs that drive productivity and reduce dependency risks.",
    "pillar.financial.title": "Finance and Capital",
    "pillar.financial.description":
      "Access better capital at better terms. We structure non-dilutive financing solutions, unlock government incentives, and optimize your financial position to fuel growth without sacrificing equity.",

    // For Companies Page - Specific translations
    "Company Valuation Assessment": "Company Valuation Assessment",
    "Find Out What Your Company Is": "Find Out What Your Company Is",
    "Really Worth": "Really Worth",
    "Before the Market Decides for You": "Before the Market Decides for You",
    "You can be growing, expanding, doing everything right and still lose millions in company value just because the market moved.":
      "You can be growing, expanding, doing everything right — and still lose millions in company value just because the market moved.",
    "Check Your Company Value Now": "Check Your Company Value Now",
    "Live transactions": "Live transactions",
    "Market Alignment Is": "Market Alignment Is",
    Essential: "Essential",
    "for Strategic Decisions": "for Strategic Decisions",
    "Every contract, every supplier decision, every M&A move happens in real-time across the market.":
      "Every contract, every supplier decision, every M&A move happens in real-time across the market.",
    "To set the right strategy, you need to know what the market would actually pay for your company today. Before signing that supplier contract, consider: are there better alternatives? Will this decision increase or decrease your market value?":
      "To set the right strategy, you need to know what the market would actually pay for your company today. Before signing that supplier contract, consider: are there better alternatives? Will this decision increase or decrease your market value?",
    "Coming through us means seeing all alternatives before committing — and understanding exactly how each choice impacts your valuation.":
      "Coming through us means seeing all alternatives before committing — and understanding exactly how each choice impacts your valuation.",
    "Discover What Investors Would Pay Today": "Discover What Investors Would Pay Today",
    "Sabe quanto vale a sua empresa?": "Do You Know How Much Your Company Is Worth?",
    "Em poucos segundos e com apenas alguns dados, faça já uma pré-avaliação gratuita da sua empresa.":
      "In just a few seconds with just a few details, get a free preliminary valuation of your company.",
    "Realizar uma avaliação inicial é essencial para tomar decisões estratégicas em várias situações: venda, compra, reestruturação ou entrada de novos investidores.":
      "Conducting an initial valuation is essential for making strategic decisions in various situations: sale, purchase, restructuring, or entry of new investors.",
    "Passo 1 – Dados da empresa": "Step 1 – Company Data",
    "Preencher Manualmente": "Fill Manually",
    "Carregar IES": "Upload IES",
    "Clique para carregar o seu IES ou arraste aqui": "Click to upload your IES or drag here",
    "PDF ou XML": "PDF or XML",
    "Como obter o IES?": "How to get IES?",
    "Setor de atividade": "Business Sector",
    "Selecionar setor": "Select sector",
    "Volume de negócios (€)": "Revenue (€)",
    "ex: 2.500.000": "e.g., 2,500,000",
    "Resultado operacional (€)": "Operating Result (€)",
    "ex: 500.000": "e.g., 500,000",
    "Caixa e disponibilidades (€)": "Cash and Equivalents (€)",
    "ex: 200.000": "e.g., 200,000",
    "Dívida bancária (€)": "Bank Debt (€)",
    "ex: 150.000": "e.g., 150,000",
    "Please upload your IES document first": "Please upload your IES document first",
    "Please fill all required fields": "Please fill all required fields",
    "Continuar simulação": "Continue Simulation",
    Continue: "Continue",
    "Passo 2 – Dados do responsável": "Step 2 – Contact Information",
    Nome: "Name",
    "E-mail": "Email",
    Telefone: "Phone",
    "Ao continuar, está a concordar com os nossos termos, condições e política de privacidade.":
      "By continuing, you agree to our terms, conditions and privacy policy.",
    "Voltar ao Passo 1": "Back to Step 1",
    Back: "Back",
    "Ver resultado": "See Result",
    "See Result": "See Result",
    "Let's Capture Value": "Let's Capture Value",
    "Before It's Too Late": "Before It's Too Late",
    "Dazur works with company owners who want to know when to act.":
      "Dazur works with company owners who want to know when to act.",
    "We connect businesses with the right investors at the right moment — before the window closes.":
      "We connect businesses with the right investors at the right moment — before the window closes.",
    "Some decide to sell, others bring in partners or restructure for growth. All of them understand one thing: timing decides value.":
      "Some decide to sell, others bring in partners or restructure for growth. All of them understand one thing: timing decides value.",
    "Get Your Private Valuation": "Get Your Private Valuation",
    "How to Obtain Your Financial Statements": "How to Obtain Your Financial Statements",
    "Search your country...": "Search your country...",
    "Visit official website →": "Visit official website →",
    "Your Valuation Report": "Your Valuation Report",
    Preview: "Preview",
    "Company Valuation Analysis": "Company Valuation Analysis",
    "Full report will be sent to your email": "Full report will be sent to your email",
    "Detailed analysis...": "Detailed analysis...",
    "Your comprehensive valuation report will be sent to": "Your comprehensive valuation report will be sent to",
    "shortly.": "shortly.",
    "Continue to WhatsApp": "Continue to WhatsApp",
    "Please fill all required company fields": "Please fill all required company fields",
    "Please upload your IES document": "Please upload your IES document",
    "Please fill all contact fields": "Please fill all contact fields",
    "I filled out the company valuation form and want to proceed. Please send me the full report.":
      "I filled out the company valuation form and want to proceed. Please send me the full report.",
    "This field is required": "This field is required",
    "companies.form.heading": "What would investors pay for your business today?",
    "businesses.form.heading": "What would investors pay for your asset today?",
    "Asset Valuation Assessment": "Asset Valuation Assessment",
    "Find Out What Your Asset Is": "Find Out What Your Asset Is",
    "Market Timing Is": "Market Timing Is",
    Everything: "Everything",
    "Every deal, every buyer, every valuation shift happens in real-time across the market.":
      "Every deal, every buyer, every valuation shift happens in real-time across the market.",
    "Whether it's a business, commercial real estate, or intellectual property — assets are constantly changing value. Don't waste years of work and potential returns.":
      "Whether it's a business, commercial real estate, or intellectual property — assets are constantly changing value. Don't waste years of work and potential returns.",
    "Fill the form and get the fastest, most dedicated sale process in the market. We only accept verified projects with matched buyers.":
      "Fill the form and get the fastest, most dedicated sale process in the market. We only accept verified projects with matched buyers.",
    "Get Started Now": "Get Started Now",
    "Real estate, companies and high-value assets, changes value with time. Knowing what buyers will pay before it's too late.":
      "Real estate, companies and high-value assets, changes value with time. Knowing what buyers will pay before it's too late.",
    "Check Your Asset Value Now": "Check Your Asset Value Now",
    Our: "Our",
    Process: "Process",
    "From valuation to closing, we handle everything so you can focus on what matters.":
      "From valuation to closing, we handle everything so you can focus on what matters.",
    "Fill the Form": "Fill the Form",
    "Complete our comprehensive asset evaluation form with your business details.":
      "Complete our comprehensive asset evaluation form with your business details.",
    "Validation & Investor Match": "Validation & Investor Match",
    "If verified, you'll be notified with contract details, required documents, and retainer information ($, 3-18 months). If we don't sell within the planned timing, we refund the full retainer. Retainer is deducted from success fee afterwards. Includes all document creation, weekly buyer pipeline updates, and current match count.":
      "If verified, you'll be notified with contract details, required documents, and retainer information ($, 3-18 months). If we don't sell within the planned timing, we refund the full retainer. Retainer is deducted from success fee afterwards. Includes all document creation, weekly buyer pipeline updates, and current match count.",
    "Blind Teaser to Match Investors": "Blind Teaser to Match Investors",
    "We send anonymous teasers to pre-qualified investors matching your asset profile.":
      "We send anonymous teasers to pre-qualified investors matching your asset profile.",
    "NDA with Interested Investors": "NDA with Interested Investors",
    "Interested parties sign NDAs before receiving detailed information.":
      "Interested parties sign NDAs before receiving detailed information.",
    "Full Investment Memorandum": "Full Investment Memorandum",
    "Complete asset sale documentation and presentations (included in retainer).":
      "Complete asset sale documentation and presentations (included in retainer).",
    Negotiation: "Negotiation",
    "We handle all negotiations to secure the best terms for your asset.":
      "We handle all negotiations to secure the best terms for your asset.",
    "Closing & Transaction": "Closing & Transaction",
    "Deal closing and value transfer processed securely.": "Deal closing and value transfer processed securely.",
    "Re-investment Opportunities": "Re-investment Opportunities",
    "Access curated opportunities to diversify and grow your portfolio.":
      "Access curated opportunities to diversify and grow your portfolio.",
    "*Retainer refund applies if we don't close within the agreed timeline. Terms and conditions apply.":
      "*Retainer refund applies if we don't close within the agreed timeline. Terms and conditions apply.",
    "Complete the form below and our team will analyze your asset and match you with qualified buyers within 48 hours.":
      "Complete the form below and our team will analyze your asset and match you with qualified buyers within 48 hours.",
    "Schedule a free consultation to discuss your asset valuation and sale strategy.":
      "Schedule a free consultation to discuss your asset valuation and sale strategy.",

    // For Investors Page - Specific translations
    "Exclusive Investment Opportunities": "Exclusive Investment Opportunities",
    "Explore Live Opportunities": "Explore Live Opportunities",
    "Precision Over": "Precision Over",
    Volume: "Volume",
    "You don't need more deals. You need the right ones.": "You don't need more deals. You need the right ones.",
    "We screen every opportunity through our internal due diligence process, ensuring you see only assets aligned with institutional standards — not open-market noise.":
      "We screen every opportunity through our internal due diligence process, ensuring you see only assets aligned with institutional standards — not open-market noise.",
    "Our goal: to save your time, reduce risk, and expand your access to real value.":
      "Our goal: to save your time, reduce risk, and expand your access to real value.",
    "Start Your Search": "Start Your Search",
    "Pre-Screened": "Pre-Screened",
    "Institutional-grade opportunities only": "Institutional-grade opportunities only",
    "Risk Reduced": "Risk Reduced",
    "Verified metrics and structure": "Verified metrics and structure",
    "Multi-Region": "Multi-Region",
    "Europe & growth markets": "Europe & growth markets",
    "Real Value": "Real Value",
    "Timing-optimized deals": "Timing-optimized deals",
    "What You": "What You",
    Gain: "Gain",
    "Live deal pipeline under continuous evaluation": "Live deal pipeline under continuous evaluation",
    "Structurally optimized assets ready for transaction": "Structurally optimized assets ready for transaction",
    "Multi-region coverage across Europe and key growth markets":
      "Multi-region coverage across Europe and key growth markets",
    "Transparent metrics and investment structure clarity": "Transparent metrics and investment structure clarity",
    "Direct access to company principals and co-investment options":
      "Direct access to company principals and co-investment options",
    "You focus on capital; we handle structure, governance, and preparation.":
      "You focus on capital; we handle structure, governance, and preparation.",
    "Access These Opportunities Now": "Access These Opportunities Now",
    "Investment Opportunity": "Investment Opportunity",
    Finder: "Finder",
    "Define your investment profile and access opportunities that fit your criteria.":
      "Define your investment profile and access opportunities that fit your criteria.",
    "Step 1 – Investment Criteria": "Step 1 – Investment Criteria",
    "Preferred Sector": "Preferred Sector",
    "Select sector": "Select sector",
    "Target Company Revenue (€)": "Target Company Revenue (€)",
    "e.g., 5,000,000": "e.g., 5,000,000",
    "Target EBITDA (€)": "Target EBITDA (€)",
    "e.g., 1,000,000": "e.g., 1,000,000",
    "Preferred Region": "Preferred Region",
    "Select region": "Select region",
    Portugal: "Portugal",
    Spain: "Spain",
    Europe: "Europe",
    Global: "Global",
    "Type of Investment": "Type of Investment",
    "Select type": "Select type",
    Acquisition: "Acquisition",
    Partnership: "Partnership",
    "Co-Investment": "Co-Investment",
    "Growth Capital": "Growth Capital",
    Other: "Other",
    "Please fill the required fields": "Please fill the required fields",
    "Continue to Matching": "Continue to Matching",
    "Step 2 – Investor Information": "Step 2 – Investor Information",
    "Full Name": "Full Name",
    "Organization / Family Office / Fund": "Organization / Family Office / Fund",
    Email: "Email",
    "Phone / WhatsApp": "Phone / WhatsApp",
    "Investor Type": "Investor Type",
    Institutional: "Institutional",
    "Family Office": "Family Office",
    Fund: "Fund",
    "Individual Investor": "Individual Investor",
    "By continuing, you agree to our terms and privacy policy.":
      "By continuing, you agree to our terms and privacy policy.",
    "Back to Step 1": "Back to Step 1",
    "See Matching Opportunities": "See Matching Opportunities",
    "See Matches": "See Matches",
    Why: "Why",
    Now: "Now",
    "Private markets move in silence.": "Private markets move in silence.",
    "By the time a company becomes visible, its value has already been priced in. Access the next opportunities before they reach the surface — while the structure, returns, and timing still align with your investment criteria.":
      "By the time a company becomes visible, its value has already been priced in. Access the next opportunities before they reach the surface — while the structure, returns, and timing still align with your investment criteria.",
    "Access Exclusive Opportunities": "Access Exclusive Opportunities",
    "Investment Opportunities Report": "Investment Opportunities Report",
    "Matched Opportunities": "Matched Opportunities",
    "€250": "€250",
    "One-time access fee for full report": "One-time access fee for full report",
    "Includes detailed opportunity analysis and direct contact info":
      "Includes detailed opportunity analysis and direct contact info",
    "Your report preview will be sent to": "Your report preview will be sent to",
    "Pay €250 to unlock the full report with complete deal details and contact information":
      "Pay €250 to unlock the full report with complete deal details and contact information",
    Close: "Close",
    "Pay & Continue": "Pay & Continue",
    "After payment, schedule a call at cal.com/dazur": "After payment, schedule a call at cal.com/dazur",

    // Tech Venture Page
    "Pioneering the future": "Pioneering the future",
    "of investment.": "of investment.",
    "The new Intelligence of Capital": "The new Intelligence of Capital",
    "Creations for Clients": "Creations for Clients",
    "Our Ongoing Creations": "Our Ongoing Creations",
    "Pre-seed to IPO": "Pre-seed to IPO",
    "Ideas to co-invest": "Ideas to co-invest",
    "min. ticket 250k": "min. ticket 250k",
    "Want to invest with us or want to create together, pitch us!":
      "Want to invest with us or want to create together, pitch us!",
    Raising: "Raising",
    "Start Now": "Start Now",
    webapp: "webapp",
    "webapp + app": "webapp + app",
    marketplace: "marketplace",
    Million: "M",
    FORM: "FORM",

    "methodology.title": "Our",
    "methodology.titleBold": "Methodology",
    "methodology.description":
      "We analyze all five pillars simultaneously, identifying where value is hidden and where optimization creates the highest EBITDA and market multiples. Every decision is data-driven and tied to capital outcomes.",

    "industries.title": "Industries & Case Studies",

    "Select your type of Deal": "Select your type of Deal",
    Company: "Company",
    Asset: "Asset",
  },
  ES: {
    // Header & Navigation
    "nav.marketValue": "Valor de Mercado",
    "nav.whatWeDo": "Qué hacemos",
    "nav.forBusinesses": "Para Negocios",
    "nav.forInvestors": "Para Inversores",
    "nav.techVenture": "Tech Venture",
    "nav.investors": "Inversores",
    "nav.start": "Comenzar",

    // Hero Section
    "hero.title": "Globalizando Empresas que los inversores no pueden ignorar.",
    "hero.subtitle":
      "La volatilidad de los Mercados de Capital es una oportunidad para empresas con excelencia operacional.",
    "hero.scrollToExplore": "Desplázate para explorar",
    "hero.forBusinesses": "Para Negocios",
    "hero.forInvestors": "Para Inversores",
    "hero.valueNow": "Valor ahora",

    // Value Section
    "value.title": "Las empresas pierden",
    "value.titleBold1": "momentos de mercado",
    "value.titleBold2": "y valor",
    "value.subtitle": "no porque tengan malos resultados,",
    "value.subtitleBold": "porque los mercados fluctúan.",
    "value.realTimeValue": "Valor en Tiempo Real",
    "value.company": "Empresa",
    "value.year": "Año",
    "value.ebitda": "EBITDA",
    "value.multiple": "Múltiplo",
    "value.finalValue": "Valor Final",
    "value.scenario": "Escenario con 0 Deuda, base de cálculo:",
    "value.formula": "Valoración= [ EBITDA x ( Múltiplo del Mercado + Spread ) ] - Deuda",
    "value.keyInsight": "Insight Clave",
    "value.keyInsightText":
      "Aumentar solo tu EBITDA no significa un aumento inmediato del valor de la empresa, los mercados fluctúan y los riesgos pueden hacer que tu valoración baje (índices de mercado).",
    "value.solution": "La Solución",
    "value.solutionText": "Tienes que aumentar ambos",
    "value.dueDiligence": "Conocimiento de Due Diligence de Inversores",
    "value.dueDiligenceText":
      "Aumentar tu EBITDA y Múltiplos = El tiempo es dinero. Ahorra ambos teniendo conocimiento de estrategias de salida.",

    // What We Do Section
    "whatWeDo.header": "Qué hacemos",
    "whatWeDo.title": "Optimización del Valor de Mercado",
    "whatWeDo.titleBold": "& Asesoramiento Capital",
    "whatWeDo.subtitle":
      "Transformando negocios a través de asesoramiento estratégico de capital y optimización abrangente de valor",
    "whatWeDo.ebitda": "+ 10M€ en EBITDA",
    "whatWeDo.target": "objetivo",
    "whatWeDo.pillar1": "Te ayudamos a prosperar en todos tus",
    "whatWeDo.pillar1Bold": "5 Pilares",
    "whatWeDo.pillar1List": "Comercial, Intangible, Físico, Personas y Financiero.",
    "whatWeDo.pillar2": "Leverageamos",
    "whatWeDo.pillar2Bold": "conocimiento propio",
    "whatWeDo.pillar2Text": "basado en nuestro",
    "whatWeDo.pillar2Bold2": "Capital Partners Investors",
    "whatWeDo.pillar2Text2": "que adquieren negocios sabiendo exactamente qué aumenta tu",
    "whatWeDo.pillar2Bold3": "EBITDA y Múltiplos",
    "whatWeDo.pillar3": "Desde",
    "whatWeDo.pillar3Bold": "In-house vs outsource",
    "whatWeDo.pillar3Text": "para optimización de márgenes. Hasta",
    "whatWeDo.pillar3Bold2": "Estructuras Legales",
    "whatWeDo.pillar3Text2": "Holding vs Unidades de Negocio.",
    "whatWeDo.pillar4": "Ayudamos a las operaciones a alinearse con",
    "whatWeDo.pillar4Bold": "momentos de mercado de capital privado",
    "whatWeDo.pillar4Text": ", y ejecutar las necesarias",
    "whatWeDo.pillar4Bold2": "transacciones de capital",
    "whatWeDo.pillar4Text2": "desde leverageo de deuda a deals de M&A.",

    // Stakeholders Section
    "stakeholders.title": "3 Principales Interesados",
    "stakeholders.founder.title": "Fundadores y Accionistas",
    "stakeholders.founder.description": "Maximiza la valoración de tu empresa y captura el momento de salida perfecto",
    "stakeholders.founder.point1": "Evaluación de la preparación para la valoración",
    "stakeholders.founder.point2": "Posicionamiento estratégico para inversores",
    "stakeholders.founder.point3": "Soporte para la ejecución de capital",
    "stakeholders.founder.point4": "Optimización operativa",
    "stakeholders.investor.title": "Inversores de Capital",
    "stakeholders.investor.description":
      "Accede a un flujo de negocios calificado con oportunidades de inversión pre-seleccionadas",
    "stakeholders.investor.point1": "Pipeline de negocios calificados en vivo",
    "stakeholders.investor.point2": "Activos estructuralmente optimizados",
    "stakeholders.investor.point3": "Cobertura multi-región",
    "stakeholders.investor.point4": "Métricas y reportes transparentes",
    "stakeholders.investor.point5": "Oportunidades de co-inversión y diversificación del portafolio",
    "stakeholders.partner.title": "Partners Operativos",
    "stakeholders.partner.description": "Colabora en los cinco pilares para desbloquear el valor oculto de la empresa",
    "stakeholders.partner.point1": "Optimización comercial y de adquisiciones",
    "stakeholders.partner.point2": "Ganancias en eficiencia operativa",
    "stakeholders.partner.point3": "Valorización de activos",
    "stakeholders.partner.point4": "Soporte para estructura de capital",
    "stakeholders.partner.point5": "Partners de contabilidad, legal y tecnológico",
    "stakeholders.startNow": "Comenzar Ahora",

    // Investors Section
    "investors.title": "Para Capital",
    "investors.titleBold": "Inversores",
    "investors.subtitle":
      "Accede a un flujo de negocios precalificado con activos estructuralmente optimizados listos para la creación de valor inmediato",
    "investors.benefit1.title": "Pipeline de Negocios Precalificado",
    "investors.benefit1.description":
      "Acceso en vivo a oportunidades de inversión calificadas en múltiples industrias y regiones",
    "investors.benefit2.title": "Activos Estructuralmente Optimizados",
    "investors.benefit2.description":
      "Empresas ya analizadas e mejoradas en todos los cinco pilares para el máximo potencial de ROI",
    "investors.benefit3.title": "Métricas de Valor Transparentes",
    "investors.benefit3.description":
      "Proyecciones claras de EBITDA y spreads de múltiplos con roadmap de optimización detallado",
    "investors.benefit4.title": "Cobertura Multi-Región",
    "investors.benefit4.description":
      "Flujo de negocios a través de Europa, Américas y mercados emergentes con experiencia local",
    "investors.benefit5.title": "Oportunidades de Co-Inversión",
    "investors.benefit5.description":
      "Colabora con otros inversores calificados para diversificar el riesgo y maximizar el rendimiento del portafolio",
    "investors.benefit6.title": "Alineación con Estrategia de Salida",
    "investors.benefit6.description":
      "Negocios estructurados con caminos claros de salida y optimización de timing del mercado desde el día uno",
    "investors.cta": "Accede al Flujo de Negocios",
    "Access continuously vetted investment opportunities across multiple sectors and regions, ensuring you're always ahead of market trends.":
      "Accede a oportunidades de inversión continuamente revisadas en múltiples sectores y regiones, asegurándote de estar siempre por delante de las tendencias del mercado.",
    "Every asset in our pipeline has been through our rigorous optimization process, reducing post-acquisition complexity and accelerating value realization.":
      "Cada activo en nuestro pipeline ha pasado por nuestro proceso de optimización riguroso, reduciendo la complejidad post-adquisición y acelerando la realización de valor.",
    "Expand your portfolio across Portugal, Spain, and emerging European markets with local expertise e intelligence on the ground.":
      "Expande tu portafolio a través de Portugal, España y mercados europeos emergentes con experiencia local e inteligencia en el terreno.",
    "Ready to": "¿Listo para?",
    "Discuss Opportunities?": "Discutir Oportunidades?",
    "Schedule a call with our team to explore investment opportunities tailored to your criteria.":
      "Agenda una llamada con nuestro equipo para explorar oportunidades de inversión adaptadas a tus criterios.",
    "Schedule a Call": "Agendar una Llamada",
    "Need Help?": "¿Necesitas Ayuda?",
    "Let's Talk": "Hablemos",
    "Schedule a free consultation to discuss your company valuation and growth strategy.":
      "Agenda una consulta gratuita para discutir la valoración de tu empresa y estrategia de crecimiento.",
    "Quanto investidores pagam hoje pelo seu negócio?": "¿Cuánto pagaría un inversor por tu negocio hoy?",
    "Frequently Asked": "Preguntas",
    Questions: "Frecuentes",
    "Everything you need to know about our process": "Todo lo que necesitas saber sobre nuestro proceso",
    "How long does the process take?": "¿Cuánto tiempo tarda el proceso?",
    "The typical process takes 3-18 months depending on the asset type and market conditions. We provide weekly updates on buyer pipeline and match count throughout the entire process.":
      "El proceso típico tarda de 3 a 18 meses dependiendo del tipo de activo y las condiciones del mercado. Proporcionamos actualizaciones semanales sobre el pipeline de compradores y el número de coincidencias durante todo el proceso.",
    "What is the retainer and how does it work?": "¿Qué es el anticipo y cómo funciona?",
    "The retainer covers all costs including document creation, marketing materials, and buyer sourcing. If we don't close within the planned timeline, we refund the full retainer. Upon successful sale, the retainer is deducted from the success fee.":
      "El anticipo cubre todos los costos incluyendo la creación de documentos, materiales de marketing y búsqueda de compradores. Si no cerramos dentro del plazo planificado, reembolsamos el anticipo completo. Tras una venta exitosa, el anticipo se deduce de la comisión de éxito.",
    "What documents do I need to provide?": "¿Qué documentos necesito proporcionar?",
    "After verification, we'll provide a detailed list of required documents specific to your asset type. This typically includes financial statements, legal documents, and operational data. We help you prepare everything needed.":
      "Después de la verificación, proporcionaremos una lista detallada de documentos requeridos específicos para tu tipo de activo. Esto típicamente incluye estados financieros, documentos legales y datos operacionales. Te ayudamos a preparar todo lo necesario.",
    "How do you protect my confidentiality?": "¿Cómo protegen mi confidencialidad?",
    "We use blind teasers initially, revealing your identity only after investors sign NDAs. All buyer prospects are pre-qualified and vetted before receiving any detailed information about your asset.":
      "Utilizamos teasers ciegos inicialmente, revelando tu identidad solo después de que los inversores firmen NDAs. Todos los prospectos compradores son precalificados y verificados antes de recibir cualquier información detallada sobre tu activo.",
    "What types of assets do you handle?": "¿Qué tipos de activos manejan?",
    "We handle companies, commercial real estate, intellectual property, and other high-value assets. Each asset is evaluated individually to ensure we can provide the best service and buyer matching.":
      "Manejamos empresas, bienes raíces comerciales, propiedad intelectual y otros activos de alto valor. Cada activo se evalúa individualmente para asegurar que podemos proporcionar el mejor servicio y emparejamiento de compradores.",
    "How are buyers matched to my asset?": "¿Cómo se emparejan los compradores con mi activo?",
    "We maintain a curated network of verified investors and buyers. Using our proprietary matching system, we identify prospects based on investment criteria, industry focus, ticket size, and strategic fit.":
      "Mantenemos una red curada de inversores y compradores verificados. Usando nuestro sistema de emparejamiento propio, identificamos prospectos basados en criterios de inversión, enfoque de industria, tamaño de ticket y ajuste estratégico.",

    // Analysis Section
    "analysis.cta": "Descubre Cómo Podemos Optimizar el Valor de Tu Empresa",
    "analysis.ctaButton": "Inicia Tu Evaluación de Valor",

    // Footer
    "footer.legal": "Legal",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad",
    "footer.sustainability": "Sostenibilidad",
    "footer.knowledge": "Conocimiento",

    // Industries
    "industry.realEstate": "Inmobiliario &\nConstrucción",
    "industry.infrastructure": "Infraestructura\n& Energía",
    "industry.lifeSciences": "Ciencias de la Vida\n& Salud",
    "industry.hospitality": "Hospitalidad\n& Turismo",
    "industry.industrial": "Industrial\n& Manufactura",
    "industry.commodities": "Commodities &\nRecursos Naturales",
    "industry.consulting": "Consultoría &\nServicios Empresariales",
    "industry.financial": "Servicios Financieros\n& Capital Privado",
    "industry.transport": "Transporte &\nLogística",
    "industry.tmt": "Tecnología, Medios &\nTelecomunicaciones",

    // Opportunity Section
    "opportunity.text": "El tiempo está contando y estás perdiendo oportunidades...",
    "opportunity.startNow": "Comenzar Ahora",
    "opportunity.startBusiness": "Comenzar como Negocio",
    "opportunity.startInvestor": "Comenzar como Inversor",

    // Pillar Descriptions (from analysis-section)
    "pillar.commercial.title": "Comercial",
    "pillar.commercial.description":
      "Transforma tu estrategia comercial de reactiva a predictiva. Te ayudamos a capturar tanto las oportunidades visibles del mercado como el valor oculto del contrato a través de la posición estratégica de RFP y la inteligencia de adquisiciones.",
    "pillar.intangible.title": "Valor de Activos Intangibles",
    "pillar.intangible.description":
      "Maximiza tus múltiplos de salida al construir propiedad intelectual defensiva. Te ayudamos a crear sistemas y activos de conocimiento propios que hagan que tu negocio sea irremplazable en el mercado.",
    "pillar.physical.title": "Activos Tangibles",
    "pillar.physical.description":
      "Optimiza tu portafolio de activos tangibles para una eficiencia operativa máxima e impacto de valoración. Te ayudamos a adquirir, mantener y rea Calificar activos tangibles estratégicamente para apoyar el crecimiento sostenible.",
    "pillar.people.title": "Recursos Humanos (Personas)",
    "pillar.people.description":
      "Construye tu equipo de sueños como un activo estratégico. Te ayudamos a atraer, desarrollar y retener el mejor talento con estructuras de compensación alineadas con el mercado y programas de compromiso que impulsan la productividad y reducen los riesgos de dependencia.",
    "pillar.financial.title": "Finanzas y Capital",
    "pillar.financial.description":
      "Accede a mejor capital a mejores términos. Estructuramos soluciones de financiamiento no dilutivo, desbloqueamos incentivos gubernamentales y optimizamos tu posición financiera para impulsar el crecimiento sin sacrificar la equidad.",

    // For Companies Page - Specific translations
    "Company Valuation Assessment": "Evaluación de Valor de Empresa",
    "Find Out What Your Company Is": "Descubre Cuánto Vale Tu Empresa",
    "Really Worth": "Realmente Vale",
    "Before the Market Decides for You": "Antes de que el Mercado Decida por Ti",
    "You can be growing, expanding, doing everything right and still lose millions in company value just because the market moved.":
      "Puedes estargrowing, expanding, doing everything right — and still lose millions in company value just because the market moved.",
    "Check Your Company Value Now": "Consulta el Valor de Tu Empresa Ahora",
    "Live transactions": "Transacciones en Vivo",
    "Market Alignment Is": "El Alineamiento con el Mercado Es",
    Essential: "Esencial",
    "for Strategic Decisions": "Para Decisiones Estratégicas",
    "Every contract, every supplier decision, every M&A move happens in real-time across the market.":
      "Cada contrato, cada decisión de proveedor, cada movimiento de M&A ocurre en tiempo real en el mercado.",
    "To set the right strategy, you need to know what the market would actually pay for your company today. Before signing that supplier contract, consider: are there better alternatives? Will this decision increase or decrease your market value?":
      "Para establecer la estrategia correcta, necesitas saber lo que realmente pagaría el mercado por tu empresa hoy. Antes de firmar ese contrato de proveedor, considera: ¿hay mejores alternativas? ¿Esta decisión aumentará o disminuirá el valor de tu mercado?",
    "Coming through us means seeing all alternatives before committing — and understanding exactly how each choice impacts your valuation.":
      "Venir a través de nosotros significa ver todas las alternativas antes de comprometerse — y entender exactamente cómo cada elección afecta tu valoración.",
    "Discover What Investors Would Pay Today": "Descubre Cuánto Pagaría un Inversor Hoy",
    "Sabe quanto vale a sua empresa?": "¿Sabes Cuánto Vale Tu Empresa?",
    "Em poucos segundos e com apenas alguns dados, faça já uma pré-avaliação gratuita da sua empresa.":
      "En solo unos segundos y con solo algunos datos, obtén ya una evaluación gratuita preliminar de tu empresa.",
    "Realizar uma avaliação inicial é essencial para tomar decisões estratégicas em várias situações: venda, compra, reestruturação ou entrada de novos investidores.":
      "Realizar una evaluación inicial es esencial para tomar decisiones estratégicas en varias situaciones: venta, compra, reestructuración o entrada de nuevos inversores.",
    "Passo 1 – Dados da empresa": "Paso 1 – Datos de la Empresa",
    "Preencher Manualmente": "Llenar Manualmente",
    "Carregar IES": "Cargar IES",
    "Clique para carregar o seu IES ou arraste aqui": "Haz clic para cargar tu IES o arrastra aquí",
    "PDF ou XML": "PDF o XML",
    "Como obter o IES?": "¿Cómo Obtener el IES?",
    "Setor de atividade": "Sector de Actividad",
    "Selecionar setor": "Seleccionar Sector",
    "Volume de negócios (€)": "Volumen de Negocios (€)",
    "ex: 2.500.000": "e.g., 2,500,000",
    "Resultado operacional (€)": "Resultado Operacional (€)",
    "ex: 500.000": "e.g., 500,000",
    "Caixa e disponibilidades (€)": "Caja y Equivalentes (€)",
    "ex: 200.000": "e.g., 200,000",
    "Dívida bancária (€)": "Deuda Bancaria (€)",
    "ex: 150.000": "e.g., 150,000",
    "Please upload your IES document first": "Por favor, carga primero tu documento IES",
    "Please fill all required fields": "Por favor, completa todos los campos requeridos",
    "Continuar simulação": "Continuar Simulación",
    Continue: "Continuar",
    "Passo 2 – Dados do responsável": "Paso 2 – Información de Contacto",
    Nome: "Nombre",
    "E-mail": "Correo Electrónico",
    Telefone: "Teléfono",
    "Ao continuar, está a concordar com os nossos termos, condições e política de privacidade.":
      "Al continuar, estás aceptando nuestros términos, condiciones y política de privacidad.",
    "Voltar ao Passo 1": "Volver al Paso 1",
    Back: "Atrás",
    "Ver resultado": "Ver Resultado",
    "See Result": "Ver Resultado",
    "Let's Capture Value": "Vamos a Capturar Valor",
    "Before It's Too Late": "Antes de Que sea Demasiado Tarde",
    "Dazur works with company owners who want to know when to act.":
      "Dazur trabaja con propietarios de empresas que quieren saber cuándo actuar.",
    "We connect businesses with the right investors at the right moment — before the window closes.":
      "Conectamos negocios con los inversores adecuados en el momento adecuado — antes de que se cierre la ventana.",
    "Some decide to sell, others bring in partners or restructure for growth. All of them understand one thing: timing decides value.":
      "Algunos deciden vender, otros traen a socios o reestructuran para el crecimiento. Todos ellos entienden una cosa: el timing decide el valor.",
    "Get Your Private Valuation": "Obtén Tu Evaluación Privada",
    "How to Obtain Your Financial Statements": "Cómo Obtener Tus Estados Financieros",
    "Search your country...": "Busca tu país...",
    "Visit official website →": "Visita el sitio web oficial →",
    "Your Valuation Report": "Tu Informe de Evaluación",
    Preview: "Vista Previa",
    "Company Valuation Analysis": "Análisis de Evaluación de Empresa",
    "Full report will be sent to your email": "El informe completo será enviado a tu correo electrónico",
    "Detailed analysis...": "Análisis detallado...",
    "Your comprehensive valuation report will be sent to": "Tu informe de evaluación abrangente será enviado a",
    "shortly.": "pronto.",
    "Continue to WhatsApp": "Continuar a WhatsApp",
    "Please fill all required company fields": "Por favor, completa todos los campos requeridos de la empresa",
    "Please upload your IES document": "Por favor, carga tu documento IES",
    "Please fill all contact fields": "Por favor, completa todos los campos de contacto",
    "I filled out the company valuation form and want to proceed. Please send me the full report.":
      "Llené el formulario de evaluación de la empresa y quiero proceder. Por favor, envíame el informe completo.",
    "This field is required": "Este campo es requerido",
    "companies.form.heading": "¿Cuánto pagaría un inversor por tu negocio hoy?",
    "businesses.form.heading": "¿Cuánto pagaría un inversor por tu activo hoy?",
    "Asset Valuation Assessment": "Evaluación de Valoración de Activos",
    "Find Out What Your Asset Is": "Descubre Cuánto Vale Tu Activo",
    "Market Timing Is": "El Momento del Mercado Es",
    Everything: "Everything",
    "Every deal, every buyer, every valuation shift happens in real-time across the market.":
      "Cada operación, cada comprador, cada cambio de valoración ocurre en tiempo real en el mercado.",
    "Whether it's a business, commercial real estate, or intellectual property — assets are constantly changing value. Don't waste years of work and potential returns.":
      "Ya sea un negocio, inmuebles comerciales o propiedad intelectual — los activos cambian constantemente de valor. No desperdicies años de trabajo y retornos potenciales.",
    "Fill the form and get the fastest, most dedicated sale process in the market. We only accept verified projects with matched buyers.":
      "Completa el formulario y obtén el proceso de venta más rápido y dedicado del mercado. Solo aceptamos proyectos verificados con compradores emparejados.",
    "Get Started Now": "Comenzar Ahora",
    "Real estate, companies and high-value assets, changes value with time. Knowing what buyers will pay before it's too late.":
      "Bienes raíces, empresas y activos de alto valor cambian de valor con el tiempo. Saber qué pagarán los compradores antes de que sea demasiado tarde.",
    "Check Your Asset Value Now": "Consulta el Valor de Tu Activo Ahora",
    Our: "Our",
    Process: "Process",
    "From valuation to closing, we handle everything so you can focus on what matters.":
      "Desde la valoración hasta el cierre, manejamos todo para que te concentres en lo que importa.",
    "Fill the Form": "Completa el Formulario",
    "Complete our comprehensive asset evaluation form with your business details.":
      "Completa nuestro formulario integral de evaluación de activos con los detalles de tu negocio.",
    "Validation & Investor Match": "Validación y Emparejamiento de Inversores",
    "If verified, you'll be notified with contract details, required documents, and retainer information ($, 3-18 months). If we don't sell within the planned timing, we refund the full retainer. Retainer is deducted from success fee afterwards. Includes all document creation, weekly buyer pipeline updates, and current match count.":
      "Si es verificado, serás notificado con detalles del contrato, documentos requeridos e información de anticipo ($, 3-18 meses). Si no vendemos dentro del plazo planificado, reembolsamos el anticipo completo. El anticipo se deduce de la comisión de éxito posteriormente. Incluye toda la creación de documentos, actualizaciones semanales del pipeline de compradores y conteo actual de coincidencias.",
    "Blind Teaser to Match Investors": "Teaser Anónimo para Inversores Coincidentes",
    "We send anonymous teasers to pre-qualified investors matching your asset profile.":
      "Enviamos teasers anónimos a inversores precalificados que coinciden con el perfil de tu activo.",
    "NDA with Interested Investors": "NDA con Inversores Interesados",
    "Interested parties sign NDAs before receiving detailed information.":
      "Las partes interesadas firman NDAs antes de recibir información detallada.",
    "Full Investment Memorandum": "Memorándum de Inversión Completo",
    "Complete asset sale documentation and presentations (included in retainer).":
      "Documentación y presentaciones completas de venta de activos (incluido en el anticipo).",
    Negotiation: "Negociación",
    "We handle all negotiations to secure the best terms for your asset.":
      "Manejamos todas las negociaciones para asegurar los mejores términos para tu activo.",
    "Closing & Transaction": "Cierre y Transacción",
    "Deal closing and value transfer processed securely.":
      "Cierre del trato y transferencia de valor procesados de forma segura.",
    "Re-investment Opportunities": "Oportunidades de Reinversión",
    "Access curated opportunities to diversify and grow your portfolio.":
      "Accede a oportunidades curadas para diversificar y hacer crecer tu portafolio.",
    "*Retainer refund applies if we don't close within the agreed timeline. Terms and conditions apply.":
      "*El reembolso del anticipo aplica si no cerramos dentro del plazo acordado. Se aplican términos y condiciones.",
    "Complete the form below and our team will analyze your asset and match you with qualified buyers within 48 hours.":
      "Completa el formulario a continuación y nuestro equipo analizará tu activo y te emparejará con compradores calificados en 48 horas.",
    "Schedule a free consultation to discuss your asset valuation and sale strategy.":
      "Agenda una consulta gratuita para discutir la valoración de tu activo y estrategia de venta.",

    // For Investors Page - Specific translations
    "Exclusive Investment Opportunities": "Oportunidades de Inversión Exclusivas",
    "Explore Live Opportunities": "Explorar Oportunidades en Vivo",
    "Precision Over": "Precisión Sobre",
    Volume: "Volumen",
    "You don't need more deals. You need the right ones.": "No necesitas más negocios. Necesitas los correctos.",
    "We screen every opportunity through our internal due diligence process, ensuring you see only assets aligned with institutional standards — not open-market noise.":
      "Evaluamos cada oportunidad a través de nuestro proceso interno de debida diligencia, asegurándote de que solo veas activos alineados con estándares institucionales — no ruido del mercado abierto.",
    "Our goal: to save your time, reduce risk, and expand your access to real value.":
      "Nuestro objetivo: ahorrar tu tiempo, reducir riesgos y expandir tu acceso a valor real.",
    "Start Your Search": "Comienza Tu Búsqueda",
    "Pre-Screened": "Precalificado",
    "Institutional-grade opportunities only": "Solo oportunidades de nivel institucional",
    "Risk Reduced": "Riesgo Reducido",
    "Verified metrics and structure": "Métricas y estructura verificadas",
    "Multi-Region": "Multi-Región",
    "Europe & growth markets": "Europa & mercados emergentes",
    "Real Value": "Valor Real",
    "Timing-optimized deals": "Negocios optimizados en timing",
    "What You": "¿Qué Obtienes?",
    Gain: "Ganancia",
    "Live deal pipeline under continuous evaluation": "Pipeline de negocios en vivo bajo evaluación continua",
    "Structurally optimized assets ready for transaction":
      "Activos estructuralmente optimizados listos para transacción",
    "Multi-region coverage across Europe and key growth markets":
      "Cobertura multi-región a través de Europa y mercados clave de crecimiento",
    "Transparent metrics and investment structure clarity":
      "Métricas y claridad de estructura de inversión transparentes",
    "Direct access to company principals and co-investment options":
      "Acceso directo a los principales de la empresa y opciones de co-inversión",
    "You focus on capital; we handle structure, governance, and preparation.":
      "Tú enfocas en el capital; nosotros manejamos estructura, gobernanza y preparación.",
    "Access These Opportunities Now": "Accede a Estas Oportunidades Ahora",
    "Investment Opportunity": "Oportunidad de Inversión",
    Finder: "Buscador",
    "Define your investment profile and access opportunities that fit your criteria.":
      "Define tu perfil de inversión y accede a oportunidades que se ajusten a tus criterios.",
    "Step 1 – Investment Criteria": "Paso 1 – Criterios de Inversión",
    "Preferred Sector": "Sector Preferido",
    "Select sector": "Seleccionar Sector",
    "Target Company Revenue (€)": "Revenuo Objetivo de la Empresa (€)",
    "e.g., 5,000,000": "e.g., 5,000,000",
    "Target EBITDA (€)": "EBITDA Objetivo (€)",
    "e.g., 1,000,000": "e.g., 1,000,000",
    "Preferred Region": "Región Preferida",
    "Select region": "Seleccionar Región",
    Portugal: "Portugal",
    Spain: "España",
    Europe: "Europa",
    Global: "Global",
    "Type of Investment": "Tipo de Inversión",
    "Select type": "Seleccionar Tipo",
    Acquisition: "Adquisición",
    Partnership: "Societario",
    "Co-Investment": "Co-Inversión",
    "Growth Capital": "Capital de Crecimiento",
    Other: "Otro",
    "Please fill the required fields": "Por favor, completa los campos requeridos",
    "Continue to Matching": "Continuar al Emparejamiento",
    "Step 2 – Investor Information": "Paso 2 – Información del Inversor",
    "Full Name": "Nombre Completo",
    "Organization / Family Office / Fund": "Organización / Oficina de Familia / Fondo",
    Email: "Correo Electrónico",
    "Phone / WhatsApp": "Teléfono / WhatsApp",
    "Investor Type": "Tipo de Inversor",
    Institutional: "Institucional",
    "Family Office": "Oficina de Familia",
    Fund: "Fondo",
    "Individual Investor": "Inversor Individual",
    "By continuing, you agree to our terms and privacy policy.":
      "Al continuar, aceptas nuestros términos y política de privacidad.",
    "Back to Step 1": "Volver al Paso 1",
    "See Matching Opportunities": "Ver Oportunidades Emparejadas",
    "See Matches": "Ver Coincidencias",
    Why: "¿Por Qué?",
    Now: "Ahora",
    "Private markets move in silence.": "Los mercados privados se mueven en silencio.",
    "By the time a company becomes visible, its value has already been priced in. Access the next opportunities before they reach the surface — while the structure, returns, and timing still align with your investment criteria.":
      "Cuando una empresa se hace visible, su valor ya ha sido fijado. Accede a las próximas oportunidades antes de que lleguen a la superficie — mientras la estructura, los retornos y el timing siguen alineados con tus criterios de inversión.",
    "Access Exclusive Opportunities": "Accede a Oportunidades Exclusivas",
    "Investment Opportunities Report": "Informe de Oportunidades de Inversión",
    "Matched Opportunities": "Oportunidades Coincidentes",
    "€250": "€250",
    "One-time access fee for full report": "Tarifa única de acceso para informe completo",
    "Includes detailed opportunity analysis and direct contact info":
      "Incluye análisis detallado de oportunidades e información de contacto directa",
    "Your report preview will be sent to": "Tu vista previa del informe será enviada a",
    "Pay €250 to unlock the full report with complete deal details and contact information":
      "Paga €250 para desbloquear el informe completo con detalles completos de negocios e información de contacto",
    Close: "Cerrar",
    "Pay & Continue": "Pagar y Continuar",
    "After payment, schedule a call at cal.com/dazur": "Después del pago, agenda una llamada en cal.com/dazur",

    // Tech Venture Page
    "Pioneering the future": "Pioneros del futuro",
    "of investment.": "de la inversión.",
    "The new Intelligence of Capital": "La nueva Inteligencia del Capital",
    "Creations for Clients": "Creaciones para Clientes",
    "Our Ongoing Creations": "Nuestras Creaciones en Curso",
    "Pre-seed to IPO": "Pre-seed a IPO",
    "Ideas to co-invest": "Ideas para co-invertir",
    "min. ticket 250k": "inversión mín. 250k",
    "Want to invest with us or want to create together, pitch us!":
      "¿Quieres invertir con nosotros o crear juntos? ¡Preséntanos tu propuesta!",
    Raising: "Levantando",
    "Start Now": "Comenzar Ahora",
    webapp: "webapp",
    "webapp + app": "webapp + app",
    marketplace: "marketplace",
    Million: "M",
    FORM: "FORMULARIO",

    "methodology.title": "Nuestra",
    "methodology.titleBold": "Metodología",
    "methodology.description":
      "Analizamos todos los cinco pilares simultáneamente, identificando dónde está oculto el valor y dónde la optimización crea los mayores EBITDA y múltiplos de mercado. Cada decisión está respaldada por datos y vinculada a resultados de capital.",

    "industries.title": "Industrias & Estudios de Caso",

    "Select your type of Deal": "Selecciona tu tipo de Acuerdo",
    Company: "Empresa",
    Asset: "Activo",
  },
  PT: {
    // Header & Navigation
    "nav.marketValue": "Valor de Mercado",
    "nav.whatWeDo": "O que fazemos",
    "nav.forBusinesses": "Para Negócios",
    "nav.forInvestors": "Para Investidores",
    "nav.techVenture": "Tech Venture",
    "nav.investors": "Investidores",
    "nav.start": "Começar",

    // Hero Section
    "hero.title": "Globalizando Empresas que investidores não podem ignorar.",
    "hero.subtitle":
      "A volatilidade dos Mercados de Capital é uma oportunidade para empresas com excelência operacional.",
    "hero.scrollToExplore": "Deslize para explorar",
    "hero.forBusinesses": "Para Negócios",
    "hero.forInvestors": "Para Investidores",
    "hero.valueNow": "Valor agora",

    // Value Section
    "value.title": "As empresas perdem",
    "value.titleBold1": "momentos de mercado",
    "value.titleBold2": "e valor",
    "value.subtitle": "não porque tenham resultados ruins,",
    "value.subtitleBold": "porque os mercados flutuam.",
    "value.realTimeValue": "Valor em Tempo Real",
    "value.company": "Empresa",
    "value.year": "Ano",
    "value.ebitda": "EBITDA",
    "value.multiple": "Multiplo",
    "value.finalValue": "Valor Final",
    "value.scenario": "Cenário com 0 Dívida, base de cálculo:",
    "value.formula": "Valorização= [ EBITDA x ( Multiplo do Mercado + Spread ) ] - Dívida",
    "value.keyInsight": "Insight Chave",
    "value.keyInsightText":
      "Aumentar apenas o seu EBITDA não significa um aumento imediato do valor da empresa, os mercados flutuam e os riscos podem fazer com que sua valorização caia (índices de mercado).",
    "value.solution": "A Solução",
    "value.solutionText": "Você tem que aumentar ambos",
    "value.dueDiligence": "Conhecimento de Due Diligence de Investidores",
    "value.dueDiligenceText":
      "Aumentar o seu EBITDA e Multiplos = Tempo é dinheiro. Ahorra ambos tendo conhecimento de estratégias de saída.",

    // What We Do Section
    "whatWeDo.header": "O que fazemos",
    "whatWeDo.title": "Otimização do Valor de Mercado",
    "whatWeDo.titleBold": "& Conselhos de Capital",
    "whatWeDo.subtitle":
      "Transformando negócios através de conselhos estratégicos de capital e otimização abrangente de valor",
    "whatWeDo.ebitda": "+ 10M€ em EBITDA",
    "whatWeDo.target": "objetivo",
    "whatWeDo.pillar1": "Nós ajudamos você a prosperar em todos os seus",
    "whatWeDo.pillar1Bold": "5 Pilares",
    "whatWeDo.pillar1List": "Comercial, Intangível, Físico, Pessoal e Financeiro.",
    "whatWeDo.pillar2": "Utilizamos",
    "whatWeDo.pillar2Bold": "conhecimento próprio",
    "whatWeDo.pillar2Text": "baseado em nosso",
    "whatWeDo.pillar2Bold2": "Capital Partners Investors",
    "whatWeDo.pillar2Text2": "que adquire negócios sabendo exatamente o que aumenta o seu",
    "whatWeDo.pillar2Bold3": "EBITDA e Multiplos",
    "whatWeDo.pillar3": "De",
    "whatWeDo.pillar3Bold": "In-house vs outsource",
    "whatWeDo.pillar3Text": "para otimização de margem. Até",
    "whatWeDo.pillar3Bold2": "Estruturas Legais",
    "whatWeDo.pillar3Text2": "Holding vs Unidades de Negócios.",
    "whatWeDo.pillar4": "Ajudamos as operações a se alinhar com",
    "whatWeDo.pillar4Bold": "momentos de mercado de capital privado",
    "whatWeDo.pillar4Text": ", e executar as necessárias",
    "whatWeDo.pillar4Bold2": "transações de capital",
    "whatWeDo.pillar4Text2": "desde leverageo de dívida a deals de M&A.",

    // Stakeholders Section
    "stakeholders.title": "3 Principais Interessados",
    "stakeholders.founder.title": "Fundadores e Acionistas",
    "stakeholders.founder.description": "Maximize a valorização da sua empresa e capture o momento de saída perfeito",
    "stakeholders.founder.point1": "Avaliação de prontidão para valorização",
    "stakeholders.founder.point2": "Posicionamento estratégico para investidores",
    "stakeholders.founder.point3": "Suporte para execução de capital",
    "stakeholders.founder.point4": "Otimização operacional",
    "stakeholders.investor.title": "Investidores de Capital",
    "stakeholders.investor.description":
      "Acesse fluxo de negócios qualificado com oportunidades de investimento pré-selecionadas",
    "stakeholders.investor.point1": "Pipeline de negócios qualificado em tempo real",
    "stakeholders.investor.point2": "Ativos estruturalmente otimizados",
    "stakeholders.investor.point3": "Cobertura multi-região",
    "stakeholders.investor.point4": "Métricas e relatórios transparentes",
    "stakeholders.investor.point5": "Oportunidades de co-investimento e diversificação do portfólio",
    "stakeholders.partner.title": "Parceiros Operacionais",
    "stakeholders.partner.description": "Colabore nos cinco pilares para desbloquear o valor oculto da empresa",
    "stakeholders.partner.point1": "Otimização comercial e de adquisições",
    "stakeholders.partner.point2": "Ganho de eficiência operacional",
    "stakeholders.partner.point3": "Valorização de ativos",
    "stakeholders.partner.point4": "Suporte para estrutura de capital",
    "stakeholders.partner.point5": "Parceiros de contabilidade, legal e tecnológico",
    "stakeholders.startNow": "Começar Agora",

    // Investors Section
    "investors.title": "Para Capital",
    "investors.titleBold": "Investidores",
    "investors.subtitle":
      "Acesse fluxo de negócios pré-qualificados com ativos estruturalmente otimizados prontos para criação de valor imediato",
    "investors.benefit1.title": "Pipeline de Negócios Pré-Qualificados",
    "investors.benefit1.description":
      "Acesso em tempo real a oportunidades de investimento qualificadas em múltiplos setores e regiões",
    "investors.benefit2.title": "Ativos Estruturalmente Otimizados",
    "investors.benefit2.description":
      "Empresas já analisadas e melhoradas em todos os cinco pilares para o máximo potencial de ROI",
    "investors.benefit3.title": "Métricas de Valor Transparentes",
    "investors.benefit3.description":
      "Projeções claras de EBITDA e spreads de múltiplos com roadmap de otimização detalhado",
    "investors.benefit4.title": "Cobertura Multi-Região",
    "investors.benefit4.description":
      "Fluxo de negócios através da Europa, Américas e mercados emergentes com experiência local",
    "investors.benefit5.title": "Oportunidades de Co-Investimento",
    "investors.benefit5.description":
      "Colabore com outros investidores qualificados para diversificar o risco e maximizar o desempenho do portfólio",
    "investors.benefit6.title": "Alinhamento com Estratégia de Saída",
    "investors.benefit6.description":
      "Negócios estruturados com caminhos claros de saída e otimização de timing do mercado desde o dia um",
    "investors.cta": "Acesse o Fluxo de Negócios",
    "Access continuously vetted investment opportunities across multiple sectors and regions, ensuring you're always ahead of market trends.":
      "Acesse oportunidades de investimento continuamente revisadas em múltiplos setores e regiões, garantindo que esteja sempre por frente das tendências do mercado.",
    "Every asset in our pipeline has been through our rigorous optimization process, reducing post-acquisition complexity and accelerating value realization.":
      "Cada ativo em nosso pipeline passou por nosso processo rigoroso de otimização, reduzindo a complexidade pós-adquição e acelerando a realização de valor.",
    "Expand your portfolio across Portugal, Spain, and emerging European markets with local expertise and on-the-ground intelligence.":
      "Expanda seu portafólio através de Portugal, Espanha e mercados europeus emergentes com experiência local e inteligência no terreno.",
    "Ready to": "Pronto para?",
    "Discuss Opportunities?": "Discutir Oportunidades?",
    "Schedule a call with our team to explore investment opportunities tailored to your criteria.":
      "Agende uma chamada com nossa equipe para explorar oportunidades de investimento adaptadas aos seus critérios.",
    "Schedule a Call": "Agendar uma Chamada",
    "Need Help?": "Precisa de Ajuda?",
    "Let's Talk": "Vamos Conversar",
    "Schedule a free consultation to discuss your company valuation and growth strategy.":
      "Agende uma consulta gratuita para discutir a avaliação da sua empresa e estratégia de crescimento.",
    "Quanto investidores pagam hoje pelo seu negócio?": "Quanto investidores pagariam pelo seu negócio hoje?",
    "Frequently Asked": "Perguntas",
    Questions: "Frequentes",
    "Everything you need to know about our process": "Tudo o que precisa de saber sobre o nosso processo",
    "How long does the process take?": "Quanto tempo demora o processo?",
    "The typical process takes 3-18 months depending on the asset type and market conditions. We provide weekly updates on buyer pipeline and match count throughout the entire process.":
      "O processo típico demora 3-18 meses dependendo do tipo de ativo e condições de mercado. Fornecemos atualizações semanais sobre o pipeline de compradores e número de correspondências durante todo o processo.",
    "What is the retainer and how does it work?": "O que é o adiantamento e como funciona?",
    "The retainer covers all costs including document creation, marketing materials, and buyer sourcing. If we don't close within the planned timeline, we refund the full retainer. Upon successful sale, the retainer is deducted from the success fee.":
      "O adiantamento cobre todos os custos incluindo criação de documentos, materiais de marketing e procura de compradores. Se não fecharmos dentro do prazo planeado, reembolsamos o adiantamento completo. Após uma venda bem-sucedida, o adiantamento é deduzido da comissão de sucesso.",
    "What documents do I need to provide?": "Que documentos preciso de fornecer?",
    "After verification, we'll provide a detailed list of required documents specific to your asset type. This typically includes financial statements, legal documents, and operational data. We help you prepare everything needed.":
      "Após a verificação, forneceremos uma lista detalhada de documentos necessários específicos para o seu tipo de ativo. Isto normalmente inclui demonstrações financeiras, documentos legais e dados operacionais. Ajudamo-lo a preparar tudo o que é necessário.",
    "How do you protect my confidentiality?": "Como protegem a minha confidencialidade?",
    "We use blind teasers initially, revealing your identity only after investors sign NDAs. All buyer prospects are pre-qualified and vetted before receiving any detailed information about your asset.":
      "Utilizamos teasers anónimos inicialmente, revelando a sua identidade apenas após os investidores assinarem NDAs. Todos os potenciais compradores são pré-qualificados e verificados antes de receberem qualquer informação detalhada sobre o seu ativo.",
    "What types of assets do you handle?": "Que tipos de ativos tratam?",
    "We handle companies, commercial real estate, intellectual property, and other high-value assets. Each asset is evaluated individually to ensure we can provide the best service and buyer matching.":
      "Tratamos empresas, imóveis comerciais, propriedade intelectual e outros ativos de alto valor. Cada ativo é avaliado individualmente para garantir que podemos fornecer o melhor serviço e correspondência de compradores.",
    "How are buyers matched to my asset?": "Como são os compradores correspondidos ao meu ativo?",
    "We maintain a curated network of verified investors and buyers. Using our proprietary matching system, we identify prospects based on investment criteria, industry focus, ticket size, and strategic fit.":
      "Mantemos uma rede curada de investidores e compradores verificados. Usando o nosso sistema de correspondência proprietário, identificamos potenciais compradores com base em critérios de investimento, foco da indústria, valor do investimento e adequação estratégica.",

    // Analysis Section
    "analysis.cta": "Descubra Como Podemos Otimizar o Valor da Sua Empresa",
    "analysis.ctaButton": "Inicie Sua Avaliação de Valor",

    // Footer
    "footer.legal": "Legal",
    "footer.terms": "Termos & Condições",
    "footer.privacy": "Política de Privacidade",
    "footer.sustainability": "Sustentabilidade",
    "footer.knowledge": "Conhecimento",

    // Industries
    "industry.realEstate": "Imóveis &\nConstrução",
    "industry.infrastructure": "Infraestrutura\n& Energia",
    "industry.lifeSciences": "Ciências da Vida\n& Saúde",
    "industry.hospitality": "Hospitalidade\n& Turismo",
    "industry.industrial": "Industrial\n& Fabricação",
    "industry.commodities": "Commodities &\nRecursos Naturais",
    "industry.consulting": "Consultoria &\nServiços Empresariais",
    "industry.financial": "Serviços Financeiros\n& Capital Privado",
    "industry.transport": "Transporte &\nLogística",
    "industry.tmt": "Tecnologia, Mídia &\nTelecomunicações",

    // Opportunity Section
    "opportunity.text": "O tempo está contando e você está perdendo oportunidades...",
    "opportunity.startNow": "Começar Agora",
    "opportunity.startBusiness": "Começar como Negócio",
    "opportunity.startInvestor": "Começar como Investidor",

    // Pillar Descriptions (from analysis-section)
    "pillar.commercial.title": "Comercial",
    "pillar.commercial.description":
      "Transforme sua estratégia comercial de reativa para preditiva. Nós ajudamos você a capturar tanto as oportunidades visíveis do mercado quanto o valor oculto do contrato a partir de uma posição estratégica de RFP e inteligência de aquisição.",
    "pillar.intangible.title": "Valor de Ativos Intangíveis",
    "pillar.intangible.description":
      "Maximize seus múltiplos de saída ao construir propriedade intelectual defensiva. Nós ajudamos você a criar sistemas e ativos de conhecimento próprios que façam sua empresa irrepetível no mercado.",
    "pillar.physical.title": "Ativos Tangíveis",
    "pillar.physical.description":
      "Otimize seu portfólio de ativos tangíveis para uma eficiência operacional máxima e impacto de valorização. Nós ajudamos você a adquirir, manter e requalificar ativos tangíveis estrategicamente para apoiar o crescimento sustentável.",
    "pillar.people.title": "Recursos Humanos (Pessoal)",
    "pillar.people.description":
      "Construa sua equipe de sonhos como um ativo estratégico. Nós ajudamos você a atrair, desenvolver e reter o melhor talento com estruturas de compensação alinhadas com o mercado e programas de compromisso que impulsionam a produtividade e reduzem os riscos de dependência.",
    "pillar.financial.title": "Finanças e Capital",
    "pillar.financial.description":
      "Acesse melhor capital a melhores termos. Estruturamos soluções de financiamento não dilutivo, desbloqueamos incentivos governamentais e otimizamos sua posição financeira para impulsionar o crescimento sem sacrificar a equidade.",

    // For Companies Page - Specific translations
    "Company Valuation Assessment": "Avaliação de Valor da Empresa",
    "Find Out What Your Company Is": "Descubra Quanto Vale a Sua Empresa",
    "Really Worth": "Realmente Vale",
    "Before the Market Decides for You": "Antes que o Mercado Decida por Você",
    "You can be growing, expanding, doing everything right and still lose millions in company value just because the market moved.":
      "Você pode estar crescendo, expandindo, fazendo tudo certo e ainda perder milhões no valor da empresa apenas porque o mercado mudou.",
    "Check Your Company Value Now": "Verifique o Valor da Sua Empresa Agora",
    "Live transactions": "Transações em Tempo Real",
    "Market Alignment Is": "O Alinhamento com o Mercado É",
    Essential: "Tudo",
    "for Strategic Decisions": "Para Decisões Estratégicas",
    "Every contract, every supplier decision, every M&A move happens in real-time across the market.":
      "Cada negócio, cada comprador, cada mudança de valorização acontece em tempo real no mercado.",
    "To set the right strategy, you need to know what the market would actually pay for your company today. Before signing that supplier contract, consider: are there better alternatives? Will this decision increase or decrease your market value?":
      "Para definir a estratégia certa, você precisa saber o que o mercado realmente pagaria por sua empresa hoje. Antes de assinar esse contrato de fornecedor, considere: existem alternativas melhores? Essa decisão aumentará ou diminuirá o valor de mercado?",
    "Coming through us means seeing all alternatives before committing — and understanding exactly how each choice impacts your valuation.":
      "Vir através de nós significa ver todas as alternativas antes de se comprometer — e entender exatamente como cada escolha impacta sua valorização.",
    "Discover What Investors Would Pay Today": "Descubra Quanto Investidores Pagariam Hoje",
    "Sabe quanto vale a sua empresa?": "Sabe quanto vale a sua empresa?",
    "Em poucos segundos e com apenas alguns dados, faça já uma pré-avaliação gratuita da sua empresa.":
      "Em poucos segundos e com apenas alguns dados, faça já uma pré-avaliação gratuita da sua empresa.",
    "Realizar uma avaliação inicial é essencial para tomar decisões estratégicas em várias situações: venda, compra, reestruturação ou entrada de novos investidores.":
      "Realizar uma avaliação inicial é essencial para tomar decisões estratégicas em várias situações: venda, compra, reestruturação ou entrada de novos investidores.",
    "Passo 1 – Dados da empresa": "Passo 1 – Dados da Empresa",
    "Preencher Manualmente": "Preencher Manualmente",
    "Carregar IES": "Carregar IES",
    "Clique para carregar o seu IES ou arraste aqui": "Clique para carregar o seu IES ou arraste aqui",
    "PDF ou XML": "PDF ou XML",
    "Como obter o IES?": "Como obter o IES?",
    "Setor de atividade": "Setor de Atividade",
    "Selecionar setor": "Selecionar Setor",
    "Volume de negócios (€)": "Volume de Negócios (€)",
    "ex: 2.500.000": "ex: 2.500.000",
    "Resultado operacional (€)": "Resultado Operacional (€)",
    "ex: 500.000": "ex: 500.000",
    "Caixa e disponibilidades (€)": "Caixa e Disponibilidades (€)",
    "ex: 200.000": "ex: 200.000",
    "Dívida bancária (€)": "Dívida Bancária (€)",
    "ex: 150.000": "ex: 150.000",
    "Please upload your IES document first": "Por favor, carregue primeiro o seu documento IES",
    "Please fill all required fields": "Por favor, preencha todos os campos obrigatórios",
    "Continuar simulação": "Continuar Simulação",
    Continue: "Continuar",
    "Passo 2 – Dados do responsável": "Passo 2 – Dados do Responsável",
    Nome: "Nome",
    "E-mail": "E-mail",
    Telefone: "Telefone",
    "Ao continuar, está a concordar com os nossos termos, condições e política de privacidade.":
      "Ao continuar, concorda com os nossos termos, condições e política de privacidade.",
    "Voltar ao Passo 1": "Voltar ao Passo 1",
    Back: "Voltar",
    "Ver resultado": "Ver Resultado",
    "See Result": "Ver Resultado",
    "Let's Capture Value": "Vamos Capturar Valor",
    "Before It's Too Late": "Antes Que Seja Tarde Demais",
    "Dazur works with company owners who want to know when to act.":
      "A Dazur trabalha com proprietários de empresas que querem saber quando agir.",
    "We connect businesses with the right investors at the right moment — before the window closes.":
      "Conectamos negócios com os investidores certos no momento certo — antes que a janela feche.",
    "Some decide to sell, others bring in partners or restructure for growth. All of them understand one thing: timing decides value.":
      "Alguns decidem vender, outros trazem parceiros ou reestruturam para crescer. Todos eles entendem uma coisa: o timing decide o valor.",
    "Get Your Private Valuation": "Obtenha a Sua Avaliação Privada",
    "How to Obtain Your Financial Statements": "Como Obter as Suas Demonstrações Financeiras",
    "Search your country...": "Pesquise o seu país...",
    "Visit official website →": "Visite o site oficial →",
    "Your Valuation Report": "O Seu Relatório de Avaliação",
    Preview: "Pré-visualização",
    "Company Valuation Analysis": "Análise de Avaliação da Empresa",
    "Full report will be sent to your email": "O relatório completo será enviado para o seu e-mail",
    "Detailed analysis...": "Análise detalhada...",
    "Your comprehensive valuation report will be sent to": "O seu relatório de avaliação abrangente será enviado para",
    "shortly.": "em breve.",
    "Continue to WhatsApp": "Continuar para WhatsApp",
    "Please fill all required company fields": "Por favor, preencha todos os campos obrigatórios da empresa",
    "Please upload your IES document": "Por favor, carregue o seu documento IES",
    "Please fill all contact fields": "Por favor, preencha todos os campos de contato",
    "I filled out the company valuation form and want to proceed. Please send me the full report.":
      "Preenchi o formulário de avaliação da empresa e quero prosseguir. Por favor, envie-me o relatório completo.",
    "This field is required": "Este campo é obrigatório",
    "companies.form.heading": "Quanto pagariam os investidores pelo seu negócio hoje?",
    "businesses.form.heading": "Quanto pagariam os investidores pelo seu ativo hoje?",
    "Asset Valuation Assessment": "Avaliação de Valorização de Ativos",
    "Find Out What Your Asset Is": "Descubra Quanto Vale o Seu Ativo",
    "Market Timing Is": "O Timing do Mercado É",
    Everything: "Everything",
    "Every deal, every buyer, every valuation shift happens in real-time across the market.":
      "Cada negócio, cada comprador, cada mudança de valorização acontece em tempo real no mercado.",
    "Whether it's a business, commercial real estate, or intellectual property — assets are constantly changing value. Don't waste years of work and potential returns.":
      "Seja um negócio, imóvel comercial ou propriedade intelectual — os ativos estão constantemente a mudar de valor. Não desperdice anos de trabalho e retornos potenciais.",
    "Fill the form and get the fastest, most dedicated sale process in the market. We only accept verified projects with matched buyers.":
      "Preencha o formulário e obtenha o processo de venda mais rápido e dedicado do mercado. Apenas aceitamos projetos verificados com compradores correspondentes.",
    "Get Started Now": "Começar Agora",
    "Real estate, companies and high-value assets, changes value with time. Knowing what buyers will pay before it's too late.":
      "Imóveis, empresas e ativos de alto valor mudam de valor com o tempo. Saber o que os compradores pagarão antes que seja tarde demais.",
    "Check Your Asset Value Now": "Verifique o Valor do Seu Ativo Agora",
    Our: "Our",
    Process: "Process",
    "From valuation to closing, we handle everything so you can focus on what matters.":
      "Da avaliação ao encerramento, tratamos de tudo para que se possa concentrar no que importa.",
    "Fill the Form": "Preencher o Formulário",
    "Complete our comprehensive asset evaluation form with your business details.":
      "Complete o nosso formulário abrangente de avaliação de ativos com os detalhes do seu negócio.",
    "Validation & Investor Match": "Validação e Correspondência de Investidores",
    "If verified, you'll be notified with contract details, required documents, and retainer information ($, 3-18 months). If we don't sell within the planned timing, we refund the full retainer. Retainer is deducted from success fee afterwards. Includes all document creation, weekly buyer pipeline updates, and current match count.":
      "Se verificado, será notificado com os detalhes do contrato, documentos necessários e informações sobre a antecipação ($, 3-18 meses). Se não vendermos dentro do prazo planeado, reembolsamos a totalidade da antecipação. A antecipação é deduzida da taxa de sucesso posteriormente. Inclui toda a criação de documentos, atualizações semanais do pipeline de compradores e contagem de correspondências atuais.",
    "Blind Teaser to Match Investors": "Teaser Anónimo para Investidores Correspondentes",
    "We send anonymous teasers to pre-qualified investors matching your asset profile.":
      "Enviamos teasers anónimos para investidores pré-qualificados que correspondem ao perfil do seu ativo.",
    "NDA with Interested Investors": "NDA com Investidores Interessados",
    "Interested parties sign NDAs before receiving detailed information.":
      "As partes interessadas assinam NDAs antes de receberem informações detalhadas.",
    "Full Investment Memorandum": "Memorando de Investimento Completo",
    "Complete asset sale documentation and presentations (included in retainer).":
      "Documentação e apresentações completas de venda de ativos (incluídas na antecipação).",
    Negotiation: "Negociação",
    "We handle all negotiations to secure the best terms for your asset.":
      "Tratamos de todas as negociações para garantir os melhores termos para o seu ativo.",
    "Closing & Transaction": "Encerramento e Transação",
    "Deal closing and value transfer processed securely.":
      "Encerramento do negócio e transferência de valor processados com segurança.",
    "Re-investment Opportunities": "Oportunidades de Reinvestimento",
    "Access curated opportunities to diversify and grow your portfolio.":
      "Aceda a oportunidades selecionadas para diversificar e expandir o seu portefólio.",
    "*Retainer refund applies if we don't close within the agreed timeline. Terms and conditions apply.":
      "*O reembolso da antecipação aplica-se se não fecharmos dentro do prazo acordado. Aplicam-se termos e condições.",
    "Complete the form below and our team will analyze your asset and match you with qualified buyers within 48 hours.":
      "Complete o formulário abaixo e a nossa equipa analisará o seu ativo e fará a correspondência com compradores qualificados em 48 horas.",
    "Schedule a free consultation to discuss your asset valuation and sale strategy.":
      "Agende uma consulta gratuita para discutir a avaliação do seu ativo e estratégia de venda.",

    // For Investors Page - Specific translations
    "Exclusive Investment Opportunities": "Oportunidades de Inversão Exclusivas",
    "Explore Live Opportunities": "Explorar Oportunidades em Vivo",
    "Precision Over": "Precisão Sobre",
    Volume: "Volume",
    "You don't need more deals. You need the right ones.": "Não precisa de mais negócios. Precisa dos corretos.",
    "We screen every opportunity through our internal due diligence process, ensuring you see only assets aligned with institutional standards — not open-market noise.":
      "Avaliamos cada oportunidade através do nosso processo interno de due diligence, garantindo que veja apenas ativos alinhados com padrões institucionais — não ruído do mercado aberto.",
    "Our goal: to save your time, reduce risk, and expand your access to real value.":
      "Nosso objetivo: economizar seu tempo, reduzir riscos e expandir seu acesso a valor real.",
    "Start Your Search": "Começar Sua Busca",
    "Pre-Screened": "Pré-selecionado",
    "Institutional-grade opportunities only": "Apenas oportunidades de nível institucional",
    "Risk Reduced": "Risco Reduzido",
    "Verified metrics and structure": "Métricas e estrutura verificadas",
    "Multi-Region": "Multi-Região",
    "Europe & growth markets": "Europa & mercados em crescimento",
    "Real Value": "Valor Real",
    "Timing-optimized deals": "Negócios otimizados pelo timing",
    "What You": "O Que Você",
    Gain: "Ganha",
    "Live deal pipeline under continuous evaluation": "Pipeline de negócios em tempo real sob avaliação contínua",
    "Structurally optimized assets ready for transaction": "Ativos estruturalmente otimizados prontos para transação",
    "Multi-region coverage across Europe and key growth markets":
      "Cobertura multi-região em toda a Europa e mercados de crescimento chave",
    "Transparent metrics and investment structure clarity":
      "Métricas transparentes e clareza da estrutura de investimento",
    "Direct access to company principals and co-investment options":
      "Acesso direto aos principais da empresa e opções de co-investimento",
    "You focus on capital; we handle structure, governance, and preparation.":
      "Você foca no capital; nós cuidamos da estrutura, governança e preparação.",
    "Access These Opportunities Now": "Acesse Estas Oportunidades Agora",
    "Investment Opportunity": "Oportunidade de Investimento",
    Finder: "Localizador",
    "Define your investment profile and access opportunities that fit your criteria.":
      "Defina seu perfil de investimento e acesse oportunidades que se encaixam em seus critérios.",
    "Step 1 – Investment Criteria": "Passo 1 – Critérios de Investimento",
    "Preferred Sector": "Setor Preferencial",
    "Select sector": "Selecionar Setor",
    "Target Company Revenue (€)": "Receita da Empresa Alvo (€)",
    "e.g., 5,000,000": "e.g., 5.000.000",
    "Target EBITDA (€)": "EBITDA Alvo (€)",
    "e.g., 1,000,000": "e.g., 1.000.000",
    "Preferred Region": "Região Preferencial",
    "Select region": "Selecionar Região",
    Portugal: "Portugal",
    Spain: "Espanha",
    Europe: "Europa",
    Global: "Global",
    "Type of Investment": "Tipo de Investimento",
    "Select type": "Selecionar Tipo",
    Acquisition: "Aquisição",
    Partnership: "Parceria",
    "Co-Investment": "Co-Investimento",
    "Growth Capital": "Capital de Crescimento",
    Other: "Outro",
    "Please fill the required fields": "Por favor, preencha os campos obrigatórios",
    "Continue to Matching": "Continuar para Correspondência",
    "Step 2 – Investor Information": "Passo 2 – Informações do Investidor",
    "Full Name": "Nome Completo",
    "Organization / Family Office / Fund": "Organização / Family Office / Fundo",
    Email: "Email",
    "Phone / WhatsApp": "Telefone / WhatsApp",
    "Investor Type": "Tipo de Investidor",
    Institutional: "Institucional",
    "Family Office": "Family Office",
    Fund: "Fundo",
    "Individual Investor": "Investidor Individual",
    "By continuing, you agree to our terms and privacy policy.":
      "Ao continuar, concorda com os nossos termos e política de privacidade.",
    "Back to Step 1": "Voltar ao Passo 1",
    "See Matching Opportunities": "Ver Oportunidades Correspondentes",
    "See Matches": "Ver Correspondências",
    Why: "Por",
    Now: "Agora",
    "Private markets move in silence.": "Os mercados privados movem-se em silêncio.",
    "By the time a company becomes visible, its value has already been priced in. Access the next opportunities before they reach the surface — while the structure, returns, and timing still align with your investment criteria.":
      "Quando uma empresa se torna visível, o seu valor já foi precificado. Acesse as próximas oportunidades antes que cheguem à superfície — enquanto a estrutura, os retornos e o timing ainda se alinham com seus critérios de investimento.",
    "Access Exclusive Opportunities": "Acesse Oportunidades Exclusivas",
    "Investment Opportunities Report": "Relatório de Oportunidades de Investimento",
    "Matched Opportunities": "Oportunidades Correspondentes",
    "€250": "€250",
    "One-time access fee for full report": "Taxa única de acesso para relatório completo",
    "Includes detailed opportunity analysis and direct contact info":
      "Inclui análise detalhada de oportunidades e informações de contato direto",
    "Your report preview will be sent to": "Sua pré-visualização do relatório será enviada para",
    "Pay €250 to unlock the full report with complete deal details and contact information":
      "Pague €250 para desbloquear o relatório completo com detalhes completos do negócio e informações de contato",
    Close: "Fechar",
    "Pay & Continue": "Pagar e Continuar",
    "After payment, schedule a call at cal.com/dazur": "Após o pagamento, agende uma chamada em cal.com/dazur",

    // Tech Venture Page
    "Pioneering the future": "Pioneiros do futuro",
    "of investment.": "do investimento.",
    "The new Intelligence of Capital": "A nova Inteligência do Capital",
    "Creations for Clients": "Criações para Clientes",
    "Our Ongoing Creations": "Nossas Criações em Curso",
    "Pre-seed to IPO": "Pre-seed a IPO",
    "Ideas to co-invest": "Ideias para co-investir",
    "min. ticket 250k": "min. bilhete 250k",
    "Want to invest with us or want to create together, pitch us!":
      "Quer investir conosco ou criar juntos, apresente-nos!",
    Raising: "Levantando",
    "Start Now": "Começar Agora",
    webapp: "webapp",
    "webapp + app": "webapp + app",
    marketplace: "marketplace",
    Million: "M",
    FORM: "FORMULÁRIO",

    "methodology.title": "Nossa",
    "methodology.titleBold": "Metodologia",
    "methodology.description":
      "Analisamos todos os cinco pilares simultaneamente, identificando onde o valor está oculto e onde a otimização cria o maior EBITDA e múltiplos de mercado. Cada decisão é orientada por dados e ligada a resultados de capital.",

    "industries.title": "Indústrias & Estudos de Caso",

    "Select your type of Deal": "Selecione o seu tipo de Negócio",
    Company: "Empresa",
    Asset: "Ativo",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN")
  const [, setForceUpdate] = useState(0)

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["EN", "ES", "PT"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    setForceUpdate((prev) => prev + 1)
  }

  const t = (key: string): string => {
    // Access translations using the current language
    // Ensure the key exists in the current language's translations
    // If not, return the key itself or a fallback
    const langTranslations = translations[language]
    return langTranslations && langTranslations[key as keyof typeof langTranslations]
      ? langTranslations[key as keyof typeof langTranslations]
      : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
