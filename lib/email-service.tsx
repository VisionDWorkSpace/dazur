// Email Service for automated communications
// Prepared for integration with SendGrid, Mailgun, or similar providers

import type { OpportunityFormData, OpportunityStatus } from "./types"

export interface EmailTemplate {
  subject: string
  htmlBody: string
  textBody: string
}

export interface EmailConfig {
  provider?: "sendgrid" | "mailgun" | "smtp"
  apiKey?: string
  from: string
  replyTo?: string
}

// Email templates in Portuguese (PT-PT)
const EMAIL_TEMPLATES: Record<OpportunityStatus, (data: TemplateData) => EmailTemplate> = {
  "pending-analysis": (data) => ({
    subject: "Confirmação de Receção - Oportunidade de Investimento",
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f8f9fa; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .highlight { background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #1a1a2e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Investment Banking Boutique</h1>
          </div>
          <div class="content">
            <p>Estimado/a <strong>${data.senderName}</strong>,</p>
            
            <p>Confirmamos a receção da sua oportunidade de investimento:</p>
            
            <div class="highlight">
              <p><strong>Título:</strong> ${data.title}</p>
              <p><strong>Tipo:</strong> ${data.opportunityType}</p>
              <p><strong>Valor:</strong> €${data.value?.toLocaleString("pt-PT")}</p>
              <p><strong>Referência:</strong> ${data.reference || "N/A"}</p>
            </div>
            
            <p>A sua oportunidade está agora <strong>em análise interna</strong> pela nossa equipa de especialistas. Este processo pode demorar entre 3 a 5 dias úteis.</p>
            
            <p>Entraremos em contacto assim que tivermos uma atualização sobre o estado da sua submissão.</p>
            
            <p>Se tiver alguma questão, não hesite em responder a este email.</p>
            
            <p>Com os melhores cumprimentos,</p>
            <p><strong>Equipa de Investment Banking</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 Investment Banking Boutique. Todos os direitos reservados.</p>
            <p>Este email foi enviado automaticamente. Por favor não responda diretamente.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textBody: `
Estimado/a ${data.senderName},

Confirmamos a receção da sua oportunidade de investimento:

Título: ${data.title}
Tipo: ${data.opportunityType}
Valor: €${data.value?.toLocaleString("pt-PT")}
Referência: ${data.reference || "N/A"}

A sua oportunidade está agora em análise interna pela nossa equipa de especialistas. Este processo pode demorar entre 3 a 5 dias úteis.

Entraremos em contacto assim que tivermos uma atualização sobre o estado da sua submissão.

Com os melhores cumprimentos,
Equipa de Investment Banking
    `,
  }),

  accepted: (data) => ({
    subject: "Boas Notícias! Interesse de Investidores na Sua Oportunidade",
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0d6b3d; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f8f9fa; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .highlight { background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0d6b3d; }
          .button { display: inline-block; background: #0d6b3d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          .steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .step { display: flex; margin: 10px 0; }
          .step-number { background: #0d6b3d; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Oportunidade Aceite</h1>
          </div>
          <div class="content">
            <p>Estimado/a <strong>${data.senderName}</strong>,</p>
            
            <div class="highlight">
              <p><strong>Excelentes notícias!</strong> A sua oportunidade "${data.title}" foi analisada e identificámos interesse por parte de investidores no nosso network.</p>
            </div>
            
            <h3>Próximos Passos</h3>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div>
                  <strong>Contrato de Mediação</strong>
                  <p>Em anexo enviamos o contrato de mediação para formalizar a nossa relação comercial.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div>
                  <strong>Assinatura</strong>
                  <p>Por favor, reveja, assine e devolva o contrato no prazo de 5 dias úteis.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div>
                  <strong>Apresentação a Investidores</strong>
                  <p>Após receção do contrato assinado, iniciaremos o processo de apresentação a investidores qualificados.</p>
                </div>
              </div>
            </div>
            
            <p>Caso tenha alguma dúvida sobre o contrato ou o processo, a nossa equipa está disponível para esclarecer.</p>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="${data.contractUrl || "#"}" class="button">Ver Contrato de Mediação</a>
            </p>
            
            <p>Com os melhores cumprimentos,</p>
            <p><strong>Equipa de Investment Banking</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 Investment Banking Boutique. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textBody: `
Estimado/a ${data.senderName},

Excelentes notícias! A sua oportunidade "${data.title}" foi analisada e identificámos interesse por parte de investidores no nosso network.

PRÓXIMOS PASSOS:

1. Contrato de Mediação
Em anexo enviamos o contrato de mediação para formalizar a nossa relação comercial.

2. Assinatura
Por favor, reveja, assine e devolva o contrato no prazo de 5 dias úteis.

3. Apresentação a Investidores
Após receção do contrato assinado, iniciaremos o processo de apresentação a investidores qualificados.

Caso tenha alguma dúvida sobre o contrato ou o processo, a nossa equipa está disponível para esclarecer.

Com os melhores cumprimentos,
Equipa de Investment Banking
    `,
  }),

  "rejected-no-profile": (data) => ({
    subject: "Atualização sobre a Sua Oportunidade de Investimento",
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f8f9fa; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .info-box { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Investment Banking Boutique</h1>
          </div>
          <div class="content">
            <p>Estimado/a <strong>${data.senderName}</strong>,</p>
            
            <p>Agradecemos a submissão da sua oportunidade "${data.title}".</p>
            
            <div class="info-box">
              <p>Após análise cuidada pela nossa equipa, concluímos que, neste momento, a oportunidade <strong>não se enquadra no perfil de investimento</strong> dos nossos parceiros e investidores atuais.</p>
            </div>
            
            <p>Esta decisão não reflete o valor intrínseco do seu ativo ou negócio, mas sim a adequação ao perfil específico de investidores com quem trabalhamos atualmente.</p>
            
            <p>Encorajamos a que nos contacte no futuro caso:</p>
            <ul>
              <li>As condições da oportunidade se alterem</li>
              <li>Tenha outras oportunidades para submeter</li>
              <li>O perfil dos nossos investidores se altere</li>
            </ul>
            
            <p>Agradecemos a confiança depositada nos nossos serviços.</p>
            
            <p>Com os melhores cumprimentos,</p>
            <p><strong>Equipa de Investment Banking</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 Investment Banking Boutique. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textBody: `
Estimado/a ${data.senderName},

Agradecemos a submissão da sua oportunidade "${data.title}".

Após análise cuidada pela nossa equipa, concluímos que, neste momento, a oportunidade não se enquadra no perfil de investimento dos nossos parceiros e investidores atuais.

Esta decisão não reflete o valor intrínseco do seu ativo ou negócio, mas sim a adequação ao perfil específico de investidores com quem trabalhamos atualmente.

Encorajamos a que nos contacte no futuro caso:
- As condições da oportunidade se alterem
- Tenha outras oportunidades para submeter
- O perfil dos nossos investidores se altere

Agradecemos a confiança depositada nos nossos serviços.

Com os melhores cumprimentos,
Equipa de Investment Banking
    `,
  }),

  "pending-documents": (data) => ({
    subject: "Documentos em Falta - Oportunidade de Investimento",
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f8f9fa; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .warning-box { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .document-list { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .document-item { padding: 10px; border-bottom: 1px solid #eee; }
          .document-item:last-child { border-bottom: none; }
          .button { display: inline-block; background: #1a1a2e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Documentos em Falta</h1>
          </div>
          <div class="content">
            <p>Estimado/a <strong>${data.senderName}</strong>,</p>
            
            <p>Relativamente à sua oportunidade "${data.title}", identificámos que alguns documentos necessários para análise estão em falta ou incompletos.</p>
            
            <div class="warning-box">
              <strong>Atenção:</strong> Sem estes documentos, não nos é possível avançar com a análise e apresentação a investidores.
            </div>
            
            <h3>Documentos em Falta</h3>
            <div class="document-list">
              ${
                data.missingDocuments?.map((doc) => `<div class="document-item">• ${doc}</div>`).join("") ||
                "<div class='document-item'>• Documentação pendente</div>"
              }
            </div>
            
            <p>Por favor, submeta os documentos em falta no prazo de <strong>10 dias úteis</strong> através do link abaixo.</p>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="${data.uploadUrl || "#"}" class="button">Submeter Documentos</a>
            </p>
            
            <p>Se tiver dificuldades em obter algum dos documentos solicitados, por favor contacte-nos para discutirmos alternativas.</p>
            
            <p>Com os melhores cumprimentos,</p>
            <p><strong>Equipa de Investment Banking</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 Investment Banking Boutique. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textBody: `
Estimado/a ${data.senderName},

Relativamente à sua oportunidade "${data.title}", identificámos que alguns documentos necessários para análise estão em falta ou incompletos.

DOCUMENTOS EM FALTA:
${data.missingDocuments?.map((doc) => `- ${doc}`).join("\n") || "- Documentação pendente"}

Por favor, submeta os documentos em falta no prazo de 10 dias úteis.

Se tiver dificuldades em obter algum dos documentos solicitados, por favor contacte-nos para discutirmos alternativas.

Com os melhores cumprimentos,
Equipa de Investment Banking
    `,
  }),

  "rejected-invalid-docs": (data) => ({
    subject: "Problema com Documentação - Oportunidade de Investimento",
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc3545; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f8f9fa; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .error-box { background: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Documentação Inválida</h1>
          </div>
          <div class="content">
            <p>Estimado/a <strong>${data.senderName}</strong>,</p>
            
            <p>Relativamente à sua oportunidade "${data.title}", após análise da documentação submetida, identificámos problemas que impedem o avanço do processo.</p>
            
            <div class="error-box">
              <p><strong>Motivo:</strong> A documentação fornecida não corresponde ao solicitado ou levanta dúvidas quanto à sua autenticidade e relevância para a oportunidade em questão.</p>
            </div>
            
            <p>Neste momento, não nos é possível prosseguir com a análise desta oportunidade.</p>
            
            <p>Se considera que houve um erro ou mal-entendido, estamos disponíveis para esclarecer a situação. Por favor, responda a este email com informação adicional.</p>
            
            <p>Com os melhores cumprimentos,</p>
            <p><strong>Equipa de Investment Banking</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 Investment Banking Boutique. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textBody: `
Estimado/a ${data.senderName},

Relativamente à sua oportunidade "${data.title}", após análise da documentação submetida, identificámos problemas que impedem o avanço do processo.

MOTIVO: A documentação fornecida não corresponde ao solicitado ou levanta dúvidas quanto à sua autenticidade e relevância para a oportunidade em questão.

Neste momento, não nos é possível prosseguir com a análise desta oportunidade.

Se considera que houve um erro ou mal-entendido, estamos disponíveis para esclarecer a situação.

Com os melhores cumprimentos,
Equipa de Investment Banking
    `,
  }),
}

interface TemplateData {
  senderName: string
  senderEmail: string
  title: string
  opportunityType: string
  value?: number
  reference?: string
  contractUrl?: string
  uploadUrl?: string
  missingDocuments?: string[]
}

export class EmailService {
  private config: EmailConfig

  constructor(
    config: EmailConfig = {
      from: "noreply@investmentbanking.pt",
      replyTo: "info@investmentbanking.pt",
    },
  ) {
    this.config = config
  }

  // Send email based on opportunity status
  async sendStatusEmail(
    opportunity: OpportunityFormData,
    metadata?: Record<string, string | string[]>,
  ): Promise<boolean> {
    const templateFn = EMAIL_TEMPLATES[opportunity.status]
    if (!templateFn) {
      console.error(`[v0] No email template for status: ${opportunity.status}`)
      return false
    }

    const templateData: TemplateData = {
      senderName: opportunity.sender?.fullName || "Cliente",
      senderEmail: opportunity.sender?.email || "",
      title: opportunity.base?.title || "Oportunidade",
      opportunityType: this.getOpportunityTypeLabel(opportunity.opportunityType),
      value: opportunity.base?.requestedValue,
      reference: metadata?.reference as string,
      contractUrl: metadata?.contractUrl as string,
      uploadUrl: metadata?.uploadUrl as string,
      missingDocuments: metadata?.missingDocuments as string[],
    }

    const template = templateFn(templateData)

    return this.sendEmail(templateData.senderEmail, template)
  }

  // Generic send email method
  async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      // In production, integrate with email provider
      // Example with SendGrid:
      /*
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(this.config.apiKey)
      
      await sgMail.send({
        to,
        from: this.config.from,
        replyTo: this.config.replyTo,
        subject: template.subject,
        text: template.textBody,
        html: template.htmlBody,
      })
      */

      console.log(`[v0] Email would be sent to: ${to}`)
      console.log(`[v0] Subject: ${template.subject}`)

      return true
    } catch (error) {
      console.error("[v0] Email sending error:", error)
      return false
    }
  }

  // Helper to get opportunity type label in Portuguese
  private getOpportunityTypeLabel(type?: string): string {
    const labels: Record<string, string> = {
      business: "Negócio / Empresa",
      "real-estate": "Ativo Imobiliário",
      "movable-asset": "Ativo Mobiliário",
      "intangible-asset": "Ativo Intangível",
      portfolio: "Portefólio",
      "total-patrimony": "Património Total",
      other: "Outro",
    }
    return labels[type || ""] || "Oportunidade"
  }
}

// Export singleton instance
export const emailService = new EmailService()
