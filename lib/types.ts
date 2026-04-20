// Master Form Types for Investment Banking Opportunity System

export type OpportunityType = "business" | "real-estate" | "movable-asset" | "intangible-asset"

export type SaleType = "total" | "partial" | "control"

export type RelationType = "owner" | "mandatary" | "consultant"

export type OpportunityStatus =
  | "pending-analysis"
  | "accepted"
  | "rejected-no-profile"
  | "pending-documents"
  | "rejected-invalid-docs"

export type DocumentValidationStatus = "pending" | "analyzing" | "valid" | "invalid"

// Document requirement per asset type
export interface DocumentRequirement {
  id: string
  name: string
  description: string
  required: boolean
  acceptedFormats: string[]
}

export const BUSINESS_DOCUMENTS: DocumentRequirement[] = [
  {
    id: "certidao-permanente",
    name: "Certidão Permanente",
    description: "Código de acesso ao registo comercial atualizado",
    required: true,
    acceptedFormats: [".pdf"],
  },
  {
    id: "ies",
    name: "IES - Informação Empresarial Simplificada",
    description: "Declaração fiscal dos últimos 3 anos",
    required: true,
    acceptedFormats: [".pdf"],
  },
  {
    id: "demonstracoes-financeiras",
    name: "Demonstrações Financeiras",
    description: "Balanço e demonstração de resultados (auditados se disponível)",
    required: false,
    acceptedFormats: [".pdf", ".xlsx"],
  },
  {
    id: "contrato-social",
    name: "Contrato Social / Estatutos",
    description: "Documento constitutivo da empresa",
    required: false,
    acceptedFormats: [".pdf"],
  },
]

export const REAL_ESTATE_DOCUMENTS: DocumentRequirement[] = [
  {
    id: "certidao-teor",
    name: "Certidão de Teor",
    description: "Registo predial atualizado da Conservatória",
    required: true,
    acceptedFormats: [".pdf"],
  },
  {
    id: "caderneta-predial",
    name: "Caderneta Predial",
    description: "Documento das Finanças com dados do imóvel",
    required: true,
    acceptedFormats: [".pdf"],
  },
  {
    id: "licenca-utilizacao",
    name: "Licença de Utilização",
    description: "Autorização camarária de utilização",
    required: false,
    acceptedFormats: [".pdf"],
  },
  {
    id: "certificado-energetico",
    name: "Certificado Energético",
    description: "Certificação de eficiência energética",
    required: false,
    acceptedFormats: [".pdf"],
  },
]

export const MOVABLE_ASSET_DOCUMENTS: DocumentRequirement[] = [
  {
    id: "titulo-propriedade",
    name: "Título de Propriedade / Registo",
    description: "Documento de registo oficial (ex: DUA, registo marítimo, certificado aeronáutico)",
    required: true,
    acceptedFormats: [".pdf"],
  },
  {
    id: "fatura-aquisicao",
    name: "Fatura de Aquisição",
    description: "Documento comprovativo da compra original",
    required: false,
    acceptedFormats: [".pdf"],
  },
  {
    id: "avaliacao-perito",
    name: "Avaliação por Perito Certificado",
    description: "Relatório de avaliação por entidade reconhecida",
    required: false,
    acceptedFormats: [".pdf"],
  },
]

export const INTANGIBLE_ASSET_DOCUMENTS: DocumentRequirement[] = [
  {
    id: "registo-inpi",
    name: "Registo INPI / Entidade Equivalente",
    description: "Certificado de registo de patente, marca ou direito autoral",
    required: true,
    acceptedFormats: [".pdf"],
  },
  {
    id: "contrato-licenciamento",
    name: "Contrato de Licenciamento",
    description: "Acordo de exploração ou cessão de direitos (se aplicável)",
    required: false,
    acceptedFormats: [".pdf"],
  },
  {
    id: "avaliacao-intangiveis",
    name: "Avaliação de Ativos Intangíveis",
    description: "Relatório de valorização por entidade especializada",
    required: false,
    acceptedFormats: [".pdf"],
  },
]

export const BUSINESS_INDUSTRIES = [
  "Aerospace & Defense",
  "Agriculture",
  "Automotive & Assembly",
  "Chemicals",
  "Consumer Packaged Goods",
  "Education",
  "Electric Power & Natural Gas",
  "Energy and Materials",
  "Engineering, Construction & Building Materials",
  "Financial Services",
  "Healthcare",
  "Industrials & Electronics",
  "Infrastructure",
  "Life Sciences",
  "Logistics",
  "Metals & Mining",
  "Oil & Gas",
  "Packaging & Paper",
  "Private Capital",
  "Public Sector",
  "Real Estate",
  "Retail",
  "Semiconductors",
  "Social Sector",
  "Technology, Media & Telecommunications",
  "Travel",
]

export const PROPERTY_TYPES = [
  "Escritórios",
  "Retalho",
  "Logística & Industrial",
  "Hotelaria",
  "Residencial",
  "Cuidados de Saúde",
  "Educação",
  "Terrenos",
  "Ativos Especiais",
]

export const MOVABLE_ASSET_TYPES = [
  "Embarcações",
  "Aviação",
  "Frotas de Veículos",
  "Veículos de Coleção",
  "Equipamento Industrial",
  "Equipamento de Construção",
  "Equipamento Agrícola",
  "Equipamento Médico & Científico",
  "Infraestrutura Tecnológica",
  "Equipamento de Energia",
  "Arte & Colecionáveis",
]

export const INTANGIBLE_TYPES = [
  "Patentes",
  "Marcas",
  "Software & Plataformas Digitais",
  "Direitos de Autor & Media",
  "Franchising & Licenças",
  "Contratos & Carteiras de Clientes",
  "Certificações & Autorizações",
]

export const ASSET_CONDITIONS = ["Novo", "Como novo", "Excelente", "Bom", "Razoável", "A necessitar de intervenção"]

export const COUNTRIES = [
  "Portugal",
  "Espanha",
  "França",
  "Alemanha",
  "Reino Unido",
  "Itália",
  "Países Baixos",
  "Bélgica",
  "Suíça",
  "Luxemburgo",
  "Brasil",
  "Angola",
  "Moçambique",
  "Cabo Verde",
  "Estados Unidos",
  "Emirados Árabes Unidos",
]

// Document Upload with AI validation
export interface DocumentUpload {
  id: string
  requirementId: string
  type: string
  fileName: string
  fileUrl: string
  fileSize: number
  uploadedAt: Date
  validationStatus: DocumentValidationStatus
  validationMessage?: string
  aiAnalysis?: {
    isAuthentic: boolean
    documentType: string
    extractedData: Record<string, string>
    confidence: number
    issues: string[]
  }
}

// Photo Upload
export interface PhotoUpload {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  uploadedAt: Date
}

export interface BusinessItem {
  id: string
  itemType: "business"
  name: string
  industry: string
  address: string
  employees: number
  annualRevenue: number
  ebitda: number
  estimatedValue: number
  valueJustification: string
  documents: DocumentUpload[]
  photos: PhotoUpload[]
}

export interface RealEstateItem {
  id: string
  itemType: "real-estate"
  propertyType: string
  address: string
  totalArea: number
  usableArea: number
  yearBuilt: number
  isRented: boolean
  monthlyRent?: number
  occupancyRate?: number
  estimatedValue: number
  valueJustification: string
  documents: DocumentUpload[]
  photos: PhotoUpload[]
}

export interface MovableAssetItem {
  id: string
  itemType: "movable-asset"
  assetType: string
  brand: string
  model: string
  serialNumber: string
  year: number
  condition: string
  address: string
  estimatedValue: number
  valueJustification: string
  documents: DocumentUpload[]
  photos: PhotoUpload[]
}

export interface IntangibleAssetItem {
  id: string
  itemType: "intangible-asset"
  intangibleType: string
  name: string
  registrationNumber: string
  registrationEntity: string
  validUntil: string
  annualRevenue?: number
  estimatedValue: number
  valueJustification: string
  documents: DocumentUpload[]
  photos: PhotoUpload[]
}

export type PortfolioItem = BusinessItem | RealEstateItem | MovableAssetItem | IntangibleAssetItem

// Sender / Contact Data
export interface SenderData {
  fullName: string
  email: string
  phone: string
  company?: string
  position?: string
  relation: RelationType
  declarationAccepted: boolean
  contactAuthorized: boolean
}

// Complete Opportunity Form Data
export interface OpportunityFormData {
  portfolioItems: PortfolioItem[]
  sender: SenderData
  status: OpportunityStatus
  createdAt: Date
  updatedAt: Date
}

// Form step configuration
export interface FormStep {
  id: number
  title: string
  description: string
  isComplete: boolean
}

// Helper to get documents requirements by asset type
export function getDocumentRequirements(itemType: OpportunityType): DocumentRequirement[] {
  switch (itemType) {
    case "business":
      return BUSINESS_DOCUMENTS
    case "real-estate":
      return REAL_ESTATE_DOCUMENTS
    case "movable-asset":
      return MOVABLE_ASSET_DOCUMENTS
    case "intangible-asset":
      return INTANGIBLE_ASSET_DOCUMENTS
    default:
      return []
  }
}
