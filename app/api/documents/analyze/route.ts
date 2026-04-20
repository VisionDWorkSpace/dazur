import { NextResponse } from "next/server"

// AI Document Analysis API endpoint
// This would integrate with a document AI service (like OpenAI Vision, Google Document AI, or AWS Textract)

interface AnalysisRequest {
  documentType: string
  fileName: string
  fileBase64?: string
  fileUrl?: string
  assetType: "business" | "real-estate" | "movable-asset" | "intangible-asset"
}

interface AnalysisResponse {
  isValid: boolean
  isAuthentic: boolean
  documentType: string
  extractedData: Record<string, string>
  confidence: number
  issues: string[]
  message: string
}

// Document type expectations for validation
const DOCUMENT_EXPECTATIONS: Record<string, { keywords: string[]; requiredFields: string[] }> = {
  "certidao-permanente": {
    keywords: ["Certidão", "Permanente", "Registo Comercial", "NIPC", "Capital Social"],
    requiredFields: ["Denominação", "NIPC", "Sede", "Capital Social"],
  },
  ies: {
    keywords: ["IES", "Informação Empresarial", "Declaração Fiscal", "Balanço"],
    requiredFields: ["NIF", "Volume de Negócios", "Resultado Líquido"],
  },
  "demonstracoes-financeiras": {
    keywords: ["Balanço", "Demonstração", "Resultados", "Auditoria", "ROC"],
    requiredFields: ["Ativo", "Passivo", "Capital Próprio", "Resultado"],
  },
  "contrato-social": {
    keywords: ["Contrato", "Sociedade", "Estatutos", "Constituição", "Notário"],
    requiredFields: ["Sócios", "Capital", "Objeto Social"],
  },
  "certidao-teor": {
    keywords: ["Certidão", "Teor", "Conservatória", "Registo Predial", "Inscrição"],
    requiredFields: ["Descrição", "Proprietário", "Ónus"],
  },
  "caderneta-predial": {
    keywords: ["Caderneta", "Predial", "Finanças", "Artigo", "Património"],
    requiredFields: ["Artigo Matricial", "Titular", "Valor Patrimonial"],
  },
  "licenca-utilizacao": {
    keywords: ["Licença", "Utilização", "Câmara Municipal", "Alvará"],
    requiredFields: ["Tipo de Utilização", "Área", "Localização"],
  },
  "certificado-energetico": {
    keywords: ["Certificado", "Energético", "ADENE", "Classe", "Eficiência"],
    requiredFields: ["Classe Energética", "Validade", "Morada"],
  },
  "fatura-aquisicao": {
    keywords: ["Fatura", "Aquisição", "Compra", "NIF", "IVA"],
    requiredFields: ["Valor", "Data", "Vendedor", "Descrição"],
  },
  "titulo-propriedade": {
    keywords: ["Título", "Propriedade", "Registo", "Documento Único", "Matrícula"],
    requiredFields: ["Proprietário", "Identificação", "Data"],
  },
  "avaliacao-perito": {
    keywords: ["Avaliação", "Perito", "Relatório", "Valor de Mercado"],
    requiredFields: ["Valor", "Data", "Metodologia", "Perito"],
  },
  "registo-inpi": {
    keywords: ["INPI", "Patente", "Marca", "Registo", "Propriedade Industrial"],
    requiredFields: ["Número de Registo", "Titular", "Validade"],
  },
  "contrato-licenciamento": {
    keywords: ["Licenciamento", "Contrato", "Licença", "Royalties", "Direitos"],
    requiredFields: ["Licenciador", "Licenciado", "Objeto", "Duração"],
  },
  "avaliacao-intangiveis": {
    keywords: ["Avaliação", "Intangível", "Valor", "Metodologia", "Propriedade Intelectual"],
    requiredFields: ["Valor", "Metodologia", "Data", "Avaliador"],
  },
}

export async function POST(request: Request) {
  try {
    const body: AnalysisRequest = await request.json()
    const { documentType, fileName, assetType } = body

    // In production, this would:
    // 1. Send document to AI vision API (OpenAI GPT-4 Vision, Google Document AI, etc.)
    // 2. Extract text via OCR if needed
    // 3. Validate against expected document type
    // 4. Check for authenticity markers
    // 5. Extract relevant data fields

    // Simulated AI analysis response
    const expectations = DOCUMENT_EXPECTATIONS[documentType]

    // Simulate processing time and validation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulated analysis result
    const confidence = 0.85 + Math.random() * 0.14 // 85-99%
    const isAuthentic = confidence > 0.88
    const isValid = isAuthentic && fileName.toLowerCase().endsWith(".pdf")

    const response: AnalysisResponse = {
      isValid,
      isAuthentic,
      documentType: expectations ? documentType : "unknown",
      extractedData: expectations
        ? expectations.requiredFields.reduce(
            (acc, field) => ({
              ...acc,
              [field]: isValid ? "[Extraído]" : "[Não encontrado]",
            }),
            {},
          )
        : {},
      confidence,
      issues: isValid
        ? []
        : [
            !isAuthentic ? "Documento pode não ser autêntico ou estar alterado" : "",
            !fileName.toLowerCase().endsWith(".pdf") ? "Formato de ficheiro não suportado" : "",
          ].filter(Boolean),
      message: isValid
        ? "Documento validado com sucesso. Dados extraídos e verificados."
        : "O documento não passou na validação. Por favor, submeta um documento válido.",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Document analysis error:", error)
    return NextResponse.json(
      {
        isValid: false,
        isAuthentic: false,
        documentType: "error",
        extractedData: {},
        confidence: 0,
        issues: ["Erro ao processar o documento"],
        message: "Ocorreu um erro ao analisar o documento. Por favor, tente novamente.",
      },
      { status: 500 },
    )
  }
}
