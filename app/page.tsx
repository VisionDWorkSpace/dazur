import { MasterForm } from "@/components/form/master-form"
import { Navbar } from "@/components/navigation/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      {/* Hero */}
      <section className="py-12 md:py-16 lg:py-20 border-b bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3 md:mb-4">
            Submissão de Oportunidades
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-semibold text-foreground mb-4 md:mb-5 text-balance leading-tight">
            Venda os Seus Ativos com Confiança
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Submeta oportunidades de negócios, imóveis, equipamentos ou propriedade intelectual com valor igual ou
            superior a 1.000.000 €. A nossa rede de investidores qualificados está pronta para analisar a sua proposta.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <MasterForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-10 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-sm">IB</span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">© 2025 Private Investment Banking</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Compliance
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
