"use client"

import { useFormContext } from "@/lib/form-context"
import type {
  PortfolioItem,
  OpportunityType,
  BusinessItem,
  RealEstateItem,
  MovableAssetItem,
  IntangibleAssetItem,
  DocumentUpload,
  PhotoUpload,
} from "@/lib/types"
import {
  BUSINESS_INDUSTRIES,
  PROPERTY_TYPES,
  MOVABLE_ASSET_TYPES,
  ASSET_CONDITIONS,
  INTANGIBLE_TYPES,
  getDocumentRequirements,
} from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Trash2,
  Building2,
  Home,
  HardHat,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Plus,
  Loader2,
  TrendingUp,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ValueInput } from "@/components/ui/value-input"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { AddressAutocomplete } from "@/components/ui/address-autocomplete"
import { AssetDocumentUpload } from "@/components/form/asset-document-upload"
import { AssetPhotoUpload } from "@/components/form/asset-photo-upload"
import { Alert, AlertDescription } from "@/components/ui/alert"

const MIN_VALUE = 1000000

const formatCurrency = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const itemTypeOptions: { value: OpportunityType; label: string; sublabel: string; icon: typeof Building2 }[] = [
  { value: "business", label: "Negócio / Empresa", sublabel: "Empresa com operação ativa", icon: Building2 },
  { value: "real-estate", label: "Ativo Imobiliário", sublabel: "Imóvel ou terreno", icon: Home },
  { value: "movable-asset", label: "Ativo Mobiliário", sublabel: "Equipamento ou veículo", icon: HardHat },
  { value: "intangible-asset", label: "Ativo Intangível", sublabel: "Propriedade intelectual", icon: Lightbulb },
]

const validateRequired = (value: string | number | undefined): boolean => {
  if (typeof value === "string") return value.trim().length > 0
  if (typeof value === "number") return value > 0
  return false
}

function InvestorMatchIndicator({ item }: { item: PortfolioItem }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchScore, setMatchScore] = useState<number | null>(null)

  useEffect(() => {
    // Check if asset has minimum required data
    const hasValue = (item.estimatedValue || 0) >= MIN_VALUE
    const reqs = getDocumentRequirements(item.itemType)
    const requiredDocs = reqs.filter((r) => r.required)
    const validDocs = item.documents?.filter((d) => d.validationStatus === "valid") || []
    const hasAllDocs = requiredDocs.every((req) => validDocs.some((d) => d.requirementId === req.id))
    const hasPhotos = (item.photos?.length || 0) > 0

    if (hasValue && hasAllDocs && (item.itemType === "intangible-asset" || hasPhotos)) {
      setIsAnalyzing(true)
      // Simulate AI matching analysis
      setTimeout(() => {
        const score = Math.floor(Math.random() * 20) + 75 // 75-95%
        setMatchScore(score)
        setIsAnalyzing(false)
      }, 2000)
    } else {
      setMatchScore(null)
      setIsAnalyzing(false)
    }
  }, [item])

  if (!isAnalyzing && !matchScore) return null

  return (
    <div className="mt-3 p-3 bg-[oklch(0.45_0.12_160)]/5 border border-[oklch(0.45_0.12_160)]/20 flex items-center gap-2">
      {isAnalyzing ? (
        <>
          <Loader2 className="w-4 h-4 text-[oklch(0.45_0.12_160)] animate-spin" />
          <span className="text-xs font-medium text-muted-foreground">A analisar investidores...</span>
        </>
      ) : (
        <>
          <TrendingUp className="w-4 h-4 text-[oklch(0.45_0.12_160)]" />
          <span className="text-xs font-medium text-[oklch(0.45_0.12_160)]">{matchScore}% match com investidores</span>
        </>
      )}
    </div>
  )
}

function BusinessForm({
  item,
  onChange,
  onDocUpload,
  onDocRemove,
  onPhotoUpload,
  onPhotoRemove,
}: {
  item: BusinessItem
  onChange: (item: BusinessItem) => void
  onDocUpload: (reqId: string, file: File) => void
  onDocRemove: (docId: string) => void
  onPhotoUpload: (files: File[]) => void
  onPhotoRemove: (id: string) => void
}) {
  const [hasMultipleAssets, setHasMultipleAssets] = useState(false)
  const [sellTogether, setSellTogether] = useState(true)

  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-11">
        <TabsTrigger value="info" className="text-sm">
          Informações
        </TabsTrigger>
        <TabsTrigger value="docs" className="text-sm">
          Documentos
        </TabsTrigger>
        <TabsTrigger value="photos" className="text-sm">
          Fotografias
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-5 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Nome da empresa *
            </Label>
            <Input
              placeholder="Ex.: Tech Solutions Lda"
              value={item.name}
              onChange={(e) => onChange({ ...item, name: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.name)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Indústria *</Label>
            <SearchableSelect
              options={BUSINESS_INDUSTRIES}
              value={item.industry}
              onValueChange={(v) => onChange({ ...item, industry: v })}
              placeholder="Selecionar indústria..."
              searchPlaceholder="Pesquisar..."
              className="mt-1.5"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Morada *</Label>
            <AddressAutocomplete
              value={item.address}
              onChange={(v) => onChange({ ...item, address: v })}
              placeholder="Pesquisar morada..."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Colaboradores *</Label>
            <Input
              type="number"
              placeholder="Ex.: 25"
              value={item.employees || ""}
              onChange={(e) => onChange({ ...item, employees: Number.parseInt(e.target.value) || 0 })}
              className="mt-1.5"
              required
              min="0"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Faturação anual *
            </Label>
            <ValueInput
              value={item.annualRevenue}
              onChange={(v) => onChange({ ...item, annualRevenue: v })}
              placeholder="Ex.: 2 000 000"
              showHelp={false}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">EBITDA *</Label>
            <ValueInput
              value={item.ebitda}
              onChange={(v) => onChange({ ...item, ebitda: v })}
              placeholder="Ex.: 500 000"
              showHelp={false}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Valor Pretendido *
            </Label>
            <ValueInput
              value={item.estimatedValue}
              onChange={(v) => onChange({ ...item, estimatedValue: v })}
              placeholder="Ex.: 5 000 000"
              min={MIN_VALUE}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-4 p-5 bg-secondary/30 border">
          <div className="flex items-center gap-3">
            <Switch checked={hasMultipleAssets} onCheckedChange={setHasMultipleAssets} />
            <Label className="text-sm font-medium">A empresa possui ativos individuais significativos?</Label>
          </div>

          {hasMultipleAssets && (
            <div className="space-y-4 pl-11">
              <div className="flex items-center gap-3">
                <Switch checked={sellTogether} onCheckedChange={setSellTogether} />
                <Label className="text-sm font-medium">Vender a empresa como um todo?</Label>
              </div>

              <Alert className="bg-[oklch(0.6_0.12_60)]/10 border-[oklch(0.6_0.12_60)]/30">
                <TrendingUp className="w-4 h-4 text-[oklch(0.6_0.12_60)]" />
                <AlertDescription className="text-xs">
                  {sellTogether ? (
                    <>
                      <strong>Recomendação:</strong> Se os ativos individuais não atingem 1M€ cada, vender a empresa
                      como um todo pode maximizar o valor através de sinergias operacionais e premium de controlo.
                    </>
                  ) : (
                    <>
                      <strong>Atenção:</strong> Vender ativos separadamente pode reduzir o valor total. Considere
                      adicionar cada ativo individualmente apenas se cada um superar 1M€ e tiver valor independente.
                    </>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Justificação do Valor *
          </Label>
          <Textarea
            placeholder="Descreva como chegou a este valor. Inclua comparáveis de mercado, múltiplos do setor, avaliações existentes, potencial de crescimento, etc."
            value={item.valueJustification}
            onChange={(e) => onChange({ ...item, valueJustification: e.target.value })}
            className="h-24 resize-none mt-1.5"
            required
            aria-invalid={!validateRequired(item.valueJustification)}
          />
        </div>

        <InvestorMatchIndicator item={item} />
      </TabsContent>

      <TabsContent value="docs" className="mt-5">
        <AssetDocumentUpload
          requirements={getDocumentRequirements("business")}
          documents={item.documents}
          onUpload={onDocUpload}
          onRemove={onDocRemove}
        />
      </TabsContent>

      <TabsContent value="photos" className="mt-5">
        <AssetPhotoUpload photos={item.photos} onUpload={onPhotoUpload} onRemove={onPhotoRemove} required />
      </TabsContent>
    </Tabs>
  )
}

function RealEstateForm({
  item,
  onChange,
  onDocUpload,
  onDocRemove,
  onPhotoUpload,
  onPhotoRemove,
}: {
  item: RealEstateItem
  onChange: (item: RealEstateItem) => void
  onDocUpload: (reqId: string, file: File) => void
  onDocRemove: (docId: string) => void
  onPhotoUpload: (files: File[]) => void
  onPhotoRemove: (id: string) => void
}) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-11">
        <TabsTrigger value="info" className="text-sm">
          Informações
        </TabsTrigger>
        <TabsTrigger value="docs" className="text-sm">
          Documentos
        </TabsTrigger>
        <TabsTrigger value="photos" className="text-sm">
          Fotografias
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-5 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tipo de imóvel *
            </Label>
            <SearchableSelect
              options={PROPERTY_TYPES}
              value={item.propertyType}
              onValueChange={(v) => onChange({ ...item, propertyType: v })}
              placeholder="Selecionar tipo..."
              searchPlaceholder="Pesquisar..."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Ano de construção *
            </Label>
            <Input
              type="number"
              placeholder="Ex.: 2015"
              value={item.yearBuilt || ""}
              onChange={(e) => onChange({ ...item, yearBuilt: Number.parseInt(e.target.value) || 0 })}
              className="mt-1.5"
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Morada *</Label>
            <AddressAutocomplete
              value={item.address}
              onChange={(v) => onChange({ ...item, address: v })}
              placeholder="Pesquisar morada..."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Área total (m²) *
            </Label>
            <Input
              type="number"
              placeholder="Ex.: 5000"
              value={item.totalArea || ""}
              onChange={(e) => onChange({ ...item, totalArea: Number.parseFloat(e.target.value) || 0 })}
              className="mt-1.5"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Área útil (m²) *
            </Label>
            <Input
              type="number"
              placeholder="Ex.: 4200"
              value={item.usableArea || ""}
              onChange={(e) => onChange({ ...item, usableArea: Number.parseFloat(e.target.value) || 0 })}
              className="mt-1.5"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Valor Pretendido *
            </Label>
            <ValueInput
              value={item.estimatedValue}
              onChange={(v) => onChange({ ...item, estimatedValue: v })}
              placeholder="Ex.: 3 500 000"
              min={MIN_VALUE}
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 p-4 bg-secondary/50 border">
          <div className="flex items-center gap-3">
            <Switch checked={item.isRented} onCheckedChange={(v) => onChange({ ...item, isRented: v })} />
            <Label className="text-sm font-medium">Arrendado / Com rendimento</Label>
          </div>
          {item.isRented && (
            <>
              <div className="flex-1 max-w-[160px]">
                <Label className="text-xs text-muted-foreground">Renda mensal</Label>
                <ValueInput
                  value={item.monthlyRent || 0}
                  onChange={(v) => onChange({ ...item, monthlyRent: v })}
                  placeholder="Ex.: 15 000"
                  showHelp={false}
                  className="mt-1"
                />
              </div>
              <div className="flex-1 max-w-[100px]">
                <Label className="text-xs text-muted-foreground">Ocupação (%)</Label>
                <Input
                  type="number"
                  placeholder="95"
                  value={item.occupancyRate || ""}
                  onChange={(e) => onChange({ ...item, occupancyRate: Number.parseFloat(e.target.value) || 0 })}
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>
            </>
          )}
        </div>
        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Justificação do Valor *
          </Label>
          <Textarea
            placeholder="Comparáveis de mercado, avaliações bancárias, yield esperado, potencial de valorização..."
            value={item.valueJustification}
            onChange={(e) => onChange({ ...item, valueJustification: e.target.value })}
            className="h-24 resize-none mt-1.5"
            required
            aria-invalid={!validateRequired(item.valueJustification)}
          />
        </div>

        <InvestorMatchIndicator item={item} />
      </TabsContent>

      <TabsContent value="docs" className="mt-5">
        <AssetDocumentUpload
          requirements={getDocumentRequirements("real-estate")}
          documents={item.documents}
          onUpload={onDocUpload}
          onRemove={onDocRemove}
        />
      </TabsContent>

      <TabsContent value="photos" className="mt-5">
        <AssetPhotoUpload photos={item.photos} onUpload={onPhotoUpload} onRemove={onPhotoRemove} required />
      </TabsContent>
    </Tabs>
  )
}

function MovableAssetForm({
  item,
  onChange,
  onDocUpload,
  onDocRemove,
  onPhotoUpload,
  onPhotoRemove,
}: {
  item: MovableAssetItem
  onChange: (item: MovableAssetItem) => void
  onDocUpload: (reqId: string, file: File) => void
  onDocRemove: (docId: string) => void
  onPhotoUpload: (files: File[]) => void
  onPhotoRemove: (id: string) => void
}) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-11">
        <TabsTrigger value="info" className="text-sm">
          Informações
        </TabsTrigger>
        <TabsTrigger value="docs" className="text-sm">
          Documentos
        </TabsTrigger>
        <TabsTrigger value="photos" className="text-sm">
          Fotografias
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-5 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Categoria *</Label>
            <SearchableSelect
              options={MOVABLE_ASSET_TYPES}
              value={item.assetType}
              onValueChange={(v) => onChange({ ...item, assetType: v })}
              placeholder="Selecionar categoria..."
              searchPlaceholder="Pesquisar..."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Marca / Fabricante *
            </Label>
            <Input
              placeholder="Ex.: Caterpillar, Sunseeker..."
              value={item.brand}
              onChange={(e) => onChange({ ...item, brand: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.brand)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Modelo *</Label>
            <Input
              placeholder="Ex.: D9T, Predator 74..."
              value={item.model}
              onChange={(e) => onChange({ ...item, model: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.model)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Nº Série / Matrícula *
            </Label>
            <Input
              placeholder="Ex.: HB-JKL, IMO 1234567"
              value={item.serialNumber}
              onChange={(e) => onChange({ ...item, serialNumber: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.serialNumber)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ano *</Label>
            <Input
              type="number"
              placeholder="Ex.: 2021"
              value={item.year || ""}
              onChange={(e) => onChange({ ...item, year: Number.parseInt(e.target.value) || 0 })}
              className="mt-1.5"
              required
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Condição *</Label>
            <SearchableSelect
              options={ASSET_CONDITIONS}
              value={item.condition}
              onValueChange={(v) => onChange({ ...item, condition: v })}
              placeholder="Selecionar..."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Localização *</Label>
            <AddressAutocomplete
              value={item.address}
              onChange={(v) => onChange({ ...item, address: v })}
              placeholder="Marina, hangar, estaleiro..."
              className="mt-1.5"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Valor Pretendido *
            </Label>
            <ValueInput
              value={item.estimatedValue}
              onChange={(v) => onChange({ ...item, estimatedValue: v })}
              placeholder="Ex.: 8 500 000"
              min={MIN_VALUE}
              className="mt-1.5"
            />
          </div>
        </div>
        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Justificação do Valor *
          </Label>
          <Textarea
            placeholder="Horas de utilização, histórico de manutenção, comparáveis de mercado, avaliações periciais..."
            value={item.valueJustification}
            onChange={(e) => onChange({ ...item, valueJustification: e.target.value })}
            className="h-24 resize-none mt-1.5"
            required
            aria-invalid={!validateRequired(item.valueJustification)}
          />
        </div>

        <InvestorMatchIndicator item={item} />
      </TabsContent>

      <TabsContent value="docs" className="mt-5">
        <AssetDocumentUpload
          requirements={getDocumentRequirements("movable-asset")}
          documents={item.documents}
          onUpload={onDocUpload}
          onRemove={onDocRemove}
        />
      </TabsContent>

      <TabsContent value="photos" className="mt-5">
        <AssetPhotoUpload photos={item.photos} onUpload={onPhotoUpload} onRemove={onPhotoRemove} required />
      </TabsContent>
    </Tabs>
  )
}

function IntangibleAssetForm({
  item,
  onChange,
  onDocUpload,
  onDocRemove,
  onPhotoUpload,
  onPhotoRemove,
}: {
  item: IntangibleAssetItem
  onChange: (item: IntangibleAssetItem) => void
  onDocUpload: (reqId: string, file: File) => void
  onDocRemove: (docId: string) => void
  onPhotoUpload: (files: File[]) => void
  onPhotoRemove: (id: string) => void
}) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-11">
        <TabsTrigger value="info" className="text-sm">
          Informações
        </TabsTrigger>
        <TabsTrigger value="docs" className="text-sm">
          Documentos
        </TabsTrigger>
        <TabsTrigger value="photos" className="text-sm">
          Evidências
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-5 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Categoria *</Label>
            <SearchableSelect
              options={INTANGIBLE_TYPES}
              value={item.intangibleType}
              onValueChange={(v) => onChange({ ...item, intangibleType: v })}
              placeholder="Selecionar categoria..."
              searchPlaceholder="Pesquisar..."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Nome / Designação *
            </Label>
            <Input
              placeholder="Ex.: SmartApp Pro"
              value={item.name}
              onChange={(e) => onChange({ ...item, name: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.name)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nº Registo *</Label>
            <Input
              placeholder="Ex.: PT123456"
              value={item.registrationNumber}
              onChange={(e) => onChange({ ...item, registrationNumber: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.registrationNumber)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Entidade de registo *
            </Label>
            <Input
              placeholder="Ex.: INPI, EUIPO, USPTO..."
              value={item.registrationEntity}
              onChange={(e) => onChange({ ...item, registrationEntity: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.registrationEntity)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Válido até *</Label>
            <Input
              placeholder="Ex.: 2035"
              value={item.validUntil}
              onChange={(e) => onChange({ ...item, validUntil: e.target.value })}
              className="mt-1.5"
              required
              aria-invalid={!validateRequired(item.validUntil)}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Receita anual</Label>
            <ValueInput
              value={item.annualRevenue || 0}
              onChange={(v) => onChange({ ...item, annualRevenue: v })}
              placeholder="Ex.: 500 000"
              showHelp={false}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Valor Pretendido *
            </Label>
            <ValueInput
              value={item.estimatedValue}
              onChange={(v) => onChange({ ...item, estimatedValue: v })}
              placeholder="Ex.: 2 000 000"
              min={MIN_VALUE}
              className="mt-1.5"
            />
          </div>
        </div>
        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Justificação do Valor *
          </Label>
          <Textarea
            placeholder="Receitas históricas, projeções de royalties, comparáveis de mercado, múltiplos do setor, valor estratégico..."
            value={item.valueJustification}
            onChange={(e) => onChange({ ...item, valueJustification: e.target.value })}
            className="h-24 resize-none mt-1.5"
            required
            aria-invalid={!validateRequired(item.valueJustification)}
          />
        </div>

        <InvestorMatchIndicator item={item} />
      </TabsContent>

      <TabsContent value="docs" className="mt-5">
        <AssetDocumentUpload
          requirements={getDocumentRequirements("intangible-asset")}
          documents={item.documents}
          onUpload={onDocUpload}
          onRemove={onDocRemove}
        />
      </TabsContent>

      <TabsContent value="photos" className="mt-5">
        <AssetPhotoUpload photos={item.photos} onUpload={onPhotoUpload} onRemove={onPhotoRemove} required={false} />
      </TabsContent>
    </Tabs>
  )
}

function getTabCompletion(item: PortfolioItem): { info: boolean; docs: boolean; photos: boolean } {
  const reqs = getDocumentRequirements(item.itemType)
  const requiredDocs = reqs.filter((r) => r.required)
  const validDocs = item.documents?.filter((d) => d.validationStatus === "valid") || []
  const hasAllDocs = requiredDocs.every((req) => validDocs.some((d) => d.requirementId === req.id))
  const hasPhotos = (item.photos?.length || 0) > 0

  let infoComplete = false
  if (item.itemType === "business") {
    const b = item as BusinessItem
    infoComplete =
      validateRequired(b.name) &&
      validateRequired(b.industry) &&
      validateRequired(b.address) &&
      validateRequired(b.employees) &&
      validateRequired(b.annualRevenue) &&
      validateRequired(b.ebitda) &&
      validateRequired(b.estimatedValue) &&
      validateRequired(b.valueJustification)
  } else if (item.itemType === "real-estate") {
    const r = item as RealEstateItem
    infoComplete =
      validateRequired(r.propertyType) &&
      validateRequired(r.address) &&
      validateRequired(r.totalArea) &&
      validateRequired(r.usableArea) &&
      validateRequired(r.yearBuilt) &&
      validateRequired(r.estimatedValue) &&
      validateRequired(r.valueJustification)
  } else if (item.itemType === "movable-asset") {
    const m = item as MovableAssetItem
    infoComplete =
      validateRequired(m.assetType) &&
      validateRequired(m.brand) &&
      validateRequired(m.model) &&
      validateRequired(m.serialNumber) &&
      validateRequired(m.year) &&
      validateRequired(m.condition) &&
      validateRequired(m.address) &&
      validateRequired(m.estimatedValue) &&
      validateRequired(m.valueJustification)
  } else if (item.itemType === "intangible-asset") {
    const i = item as IntangibleAssetItem
    infoComplete =
      validateRequired(i.intangibleType) &&
      validateRequired(i.name) &&
      validateRequired(i.registrationNumber) &&
      validateRequired(i.registrationEntity) &&
      validateRequired(i.validUntil) &&
      validateRequired(i.estimatedValue) &&
      validateRequired(i.valueJustification)
  }

  return {
    info: infoComplete,
    docs: hasAllDocs,
    photos: item.itemType === "intangible-asset" ? true : hasPhotos,
  }
}

export function Step1Portfolio() {
  const { formData, updateFormData, validationErrors } = useFormContext()
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)
  const [showingAssetTypeSelection, setShowingAssetTypeSelection] = useState(false)

  const items = formData.portfolioItems || []

  useEffect(() => {
    if (items.length === 0) {
      setShowingAssetTypeSelection(true)
    }
  }, [])

  const addItem = (type: OpportunityType) => {
    const id = `item-${Date.now()}`
    let newItem: PortfolioItem

    switch (type) {
      case "business":
        newItem = {
          id,
          itemType: "business",
          name: "",
          industry: "",
          address: "",
          employees: 0,
          annualRevenue: 0,
          ebitda: 0,
          estimatedValue: 0,
          valueJustification: "",
          documents: [],
          photos: [],
        }
        break
      case "real-estate":
        newItem = {
          id,
          itemType: "real-estate",
          propertyType: "",
          address: "",
          totalArea: 0,
          usableArea: 0,
          yearBuilt: 0,
          isRented: false,
          estimatedValue: 0,
          valueJustification: "",
          documents: [],
          photos: [],
        }
        break
      case "movable-asset":
        newItem = {
          id,
          itemType: "movable-asset",
          assetType: "",
          brand: "",
          model: "",
          serialNumber: "",
          year: 0,
          condition: "",
          address: "",
          estimatedValue: 0,
          valueJustification: "",
          documents: [],
          photos: [],
        }
        break
      case "intangible-asset":
        newItem = {
          id,
          itemType: "intangible-asset",
          intangibleType: "",
          name: "",
          registrationNumber: "",
          registrationEntity: "",
          validUntil: "",
          annualRevenue: 0,
          estimatedValue: 0,
          valueJustification: "",
          documents: [],
          photos: [],
        }
        break
    }

    updateFormData({ portfolioItems: [...items, newItem] })
    setExpandedItemId(id)
    setShowingAssetTypeSelection(false)
  }

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      return
    }
    updateFormData({ portfolioItems: items.filter((item) => item.id !== id) })
    if (expandedItemId === id) setExpandedItemId(null)
  }

  const updateItem = (id: string, updates: Partial<PortfolioItem>) => {
    updateFormData({
      portfolioItems: items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })
  }

  const handleDocUpload = (itemId: string, reqId: string, file: File) => {
    const newDoc: DocumentUpload = {
      id: `doc-${Date.now()}`,
      requirementId: reqId,
      type: file.type,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileSize: file.size,
      uploadedAt: new Date(),
      validationStatus: "valid",
      aiAnalysis: {
        isAuthentic: true,
        documentType: reqId,
        extractedData: {},
        confidence: 1.0,
        issues: [],
      },
    }

    const item = items.find((i) => i.id === itemId)
    if (item) {
      updateItem(itemId, { documents: [...item.documents, newDoc] })
    }
  }

  const handleDocRemove = (itemId: string, docId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (item) {
      updateItem(itemId, { documents: item.documents.filter((d) => d.id !== docId) })
    }
  }

  const handlePhotoUpload = (itemId: string, files: File[]) => {
    const item = items.find((i) => i.id === itemId)
    if (item) {
      const newPhotos: PhotoUpload[] = files.map((file) => ({
        id: `photo-${Date.now()}-${Math.random()}`,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        fileSize: file.size,
        uploadedAt: new Date(),
      }))
      updateItem(itemId, { photos: [...item.photos, ...newPhotos] })
    }
  }

  const handlePhotoRemove = (itemId: string, photoId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (item) {
      updateItem(itemId, { photos: item.photos.filter((p) => p.id !== photoId) })
    }
  }

  const getItemLabel = (item: PortfolioItem): string => {
    switch (item.itemType) {
      case "business":
        return item.name || "Negócio sem nome"
      case "real-estate":
        return item.propertyType || "Imóvel sem tipo"
      case "movable-asset":
        return item.brand && item.model ? `${item.brand} ${item.model}` : item.assetType || "Ativo sem identificação"
      case "intangible-asset":
        return item.name || "Ativo intangível sem nome"
      default:
        return "Ativo"
    }
  }

  const getItemIcon = (type: OpportunityType) => {
    const option = itemTypeOptions.find((o) => o.value === type)
    return option?.icon || Building2
  }

  // Permitir sempre adicionar mais ativos, mesmo que os anteriores estejam incompletos.
  // O utilizador pode passar à frente e completar as informações/documentos mais tarde.
  const canAddMore = true

  const totalValue = items.reduce((sum, item) => sum + (item?.estimatedValue || 0), 0)

  return (
    <div className="space-y-6">
      {items.length > 0 && !showingAssetTypeSelection && (
        <div className="p-5 md:p-6 bg-gradient-to-r from-[oklch(0.45_0.12_160)]/10 to-transparent border border-[oklch(0.45_0.12_160)]/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Valor Total do Portfólio
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-[oklch(0.45_0.12_160)]">
                {formatCurrency(totalValue)} €
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">
                {items.length} {items.length === 1 ? "ativo" : "ativos"}
              </p>
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[oklch(0.45_0.12_160)] ml-auto" />
            </div>
          </div>
        </div>
      )}

      {showingAssetTypeSelection && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Adicionar ativo</p>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {itemTypeOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => addItem(option.value)}
                  className="p-4 md:p-6 border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground group-hover:text-primary mb-2 md:mb-3 transition-colors" />
                  <p className="text-sm md:text-base font-semibold mb-1">{option.label}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{option.sublabel}</p>
                </button>
              )
            })}
          </div>
          {items.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowingAssetTypeSelection(false)}
              className="mt-3"
            >
              Cancelar
            </Button>
          )}
        </div>
      )}

      {!showingAssetTypeSelection && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item) => {
            const Icon = getItemIcon(item.itemType)
            const isExpanded = expandedItemId === item.id
            const isValid = (item?.estimatedValue || 0) >= MIN_VALUE
            const completion = getTabCompletion(item)
            const isComplete = completion.info && completion.docs && completion.photos

            return (
              <Card key={item.id} className={isComplete ? "border-[oklch(0.45_0.12_160)]/30" : ""}>
                <CardHeader
                  className="cursor-pointer hover:bg-secondary/30 transition-colors p-4"
                  onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 flex items-center justify-center ${isComplete ? "bg-[oklch(0.45_0.12_160)]/10" : "bg-secondary"}`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isComplete ? "text-[oklch(0.45_0.12_160)]" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{getItemLabel(item)}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{formatCurrency(item.estimatedValue || 0)} €</span>
                          {isComplete && (
                            <span className="flex items-center gap-1 text-[oklch(0.45_0.12_160)]">
                              <CheckCircle2 className="w-3 h-3" />
                              Completo
                            </span>
                          )}
                        </div>
                        {!isExpanded && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <div
                              className={`w-2 h-2 ${completion.info ? "bg-[oklch(0.45_0.12_160)]" : "bg-muted-foreground/30"}`}
                              title={completion.info ? "Informações completas" : "Informações incompletas"}
                            />
                            <div
                              className={`w-2 h-2 ${completion.docs ? "bg-[oklch(0.45_0.12_160)]" : "bg-muted-foreground/30"}`}
                              title={completion.docs ? "Documentos completos" : "Documentos incompletos"}
                            />
                            <div
                              className={`w-2 h-2 ${completion.photos ? "bg-[oklch(0.45_0.12_160)]" : "bg-muted-foreground/30"}`}
                              title={completion.photos ? "Fotografias completas" : "Fotografias incompletas"}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeItem(item.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="pt-0 pb-6 px-4 md:px-6">
                    {item.itemType === "business" && (
                      <BusinessForm
                        item={item as BusinessItem}
                        onChange={(updated) => updateItem(item.id, updated)}
                        onDocUpload={(reqId, file) => handleDocUpload(item.id, reqId, file)}
                        onDocRemove={(docId) => handleDocRemove(item.id, docId)}
                        onPhotoUpload={(files) => handlePhotoUpload(item.id, files)}
                        onPhotoRemove={(photoId) => handlePhotoRemove(item.id, photoId)}
                      />
                    )}
                    {item.itemType === "real-estate" && (
                      <RealEstateForm
                        item={item as RealEstateItem}
                        onChange={(updated) => updateItem(item.id, updated)}
                        onDocUpload={(reqId, file) => handleDocUpload(item.id, reqId, file)}
                        onDocRemove={(docId) => handleDocRemove(item.id, docId)}
                        onPhotoUpload={(files) => handlePhotoUpload(item.id, files)}
                        onPhotoRemove={(photoId) => handlePhotoRemove(item.id, photoId)}
                      />
                    )}
                    {item.itemType === "movable-asset" && (
                      <MovableAssetForm
                        item={item as MovableAssetItem}
                        onChange={(updated) => updateItem(item.id, updated)}
                        onDocUpload={(reqId, file) => handleDocUpload(item.id, reqId, file)}
                        onDocRemove={(docId) => handleDocRemove(item.id, docId)}
                        onPhotoUpload={(files) => handlePhotoUpload(item.id, files)}
                        onPhotoRemove={(photoId) => handlePhotoRemove(item.id, photoId)}
                      />
                    )}
                    {item.itemType === "intangible-asset" && (
                      <IntangibleAssetForm
                        item={item as IntangibleAssetItem}
                        onChange={(updated) => updateItem(item.id, updated)}
                        onDocUpload={(reqId, file) => handleDocUpload(item.id, reqId, file)}
                        onDocRemove={(docId) => handleDocRemove(item.id, docId)}
                        onPhotoUpload={(files) => handlePhotoUpload(item.id, files)}
                        onPhotoRemove={(photoId) => handlePhotoRemove(item.id, photoId)}
                      />
                    )}
                  </CardContent>
                )}
              </Card>
            )
          })}

          <Card
            className={`border-2 border-dashed transition-all ${
              canAddMore
                ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
                : "border-muted-foreground/20 opacity-50 cursor-not-allowed"
            }`}
            onClick={() => canAddMore && setShowingAssetTypeSelection(true)}
          >
            <CardContent className="p-4 flex items-center justify-center gap-3 text-muted-foreground">
              <Plus className={`w-4 h-4 ${canAddMore ? "group-hover:text-primary" : ""}`} />
              <span className={`font-medium text-sm ${canAddMore ? "hover:text-primary" : ""}`}>
                {canAddMore ? "Adicionar outro ativo" : "Complete o ativo atual para adicionar mais"}
              </span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
