"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Filter, Upload, FileText, ShoppingCart, Download, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Dados simulados de compras baseadas em cotações aprovadas
const mockPurchases = [
  {
    id: 1,
    cotacaoId: 2, // Referência à cotação aprovada
    produto: "Landing Gear Assembly",
    quantidade: 1,
    fornecedorEscolhido: "Liebherr Aerospace",
    justificativa: "Melhor custo-benefício e prazo de entrega adequado",
    valorFinalPago: 458000,
    moeda: "EUR",
    dataCompra: "2024-01-25",
    numeroCompra: "PC-2024-002",
    notaFiscal: "NF-LIE-2024-002.pdf",
    status: "comprado",
    projeto: "Projeto Beta",
    condicoesPagamento: "À vista",
    comprovantes: [
      { nome: "Comprovante_Pagamento.pdf", tipo: "pagamento", data: "2024-01-25" },
      { nome: "Certificado_Origem.pdf", tipo: "certificado", data: "2024-01-25" },
    ],
    historicoNegociacao: [
      {
        data: "2024-01-18",
        usuario: "João Silva",
        acao: "Cotação aprovada",
        observacao: "Aprovado com desconto negociado",
      },
      {
        data: "2024-01-20",
        usuario: "Maria Santos",
        acao: "Negociação iniciada",
        observacao: "Solicitado desconto adicional",
      },
      {
        data: "2024-01-22",
        usuario: "João Silva",
        acao: "Desconto aprovado",
        observacao: "Desconto de 2% aprovado pelo fornecedor",
      },
      {
        data: "2024-01-25",
        usuario: "Carlos Oliveira",
        acao: "Compra finalizada",
        observacao: "Pedido de compra emitido",
      },
    ],
    observacoes: "Compra realizada com sucesso. Fornecedor ofereceu garantia estendida.",
  },
  {
    id: 2,
    cotacaoId: 4,
    produto: "Hydraulic Pump",
    quantidade: 3,
    fornecedorEscolhido: "Parker Hannifin",
    justificativa: "Aprovado com ressalva sobre certificação - certificação confirmada posteriormente",
    valorFinalPago: 76500,
    moeda: "USD",
    dataCompra: "2024-01-28",
    numeroCompra: "PC-2024-004",
    notaFiscal: null,
    status: "aguardando_nf",
    projeto: "Projeto Alpha",
    condicoesPagamento: "45 dias",
    comprovantes: [{ nome: "Ordem_Compra.pdf", tipo: "ordem", data: "2024-01-28" }],
    historicoNegociacao: [
      {
        data: "2024-01-22",
        usuario: "João Silva",
        acao: "Aprovado com ressalva",
        observacao: "Necessária confirmação de certificação",
      },
      {
        data: "2024-01-26",
        usuario: "Ana Costa",
        acao: "Certificação confirmada",
        observacao: "Fornecedor enviou certificados AS9100",
      },
      {
        data: "2024-01-28",
        usuario: "Carlos Oliveira",
        acao: "Compra autorizada",
        observacao: "Pedido de compra emitido",
      },
    ],
    observacoes: "Aguardando emissão da nota fiscal pelo fornecedor.",
  },
]

export default function CotacaoComprasPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [purchases, setPurchases] = useState(mockPurchases)
  const [filteredPurchases, setFilteredPurchases] = useState(mockPurchases)
  const [filters, setFilters] = useState({
    projeto: "",
    status: "all",
    fornecedor: "",
    dataInicio: "",
    dataFim: "",
  })
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  useEffect(() => {
    // Aplicar filtros
    let filtered = purchases

    if (filters.projeto) {
      filtered = filtered.filter((p) => p.projeto.toLowerCase().includes(filters.projeto.toLowerCase()))
    }
    if (filters.status !== "all") {
      filtered = filtered.filter((p) => p.status === filters.status)
    }
    if (filters.fornecedor) {
      filtered = filtered.filter((p) => p.fornecedorEscolhido.toLowerCase().includes(filters.fornecedor.toLowerCase()))
    }
    if (filters.dataInicio) {
      filtered = filtered.filter((p) => p.dataCompra >= filters.dataInicio)
    }
    if (filters.dataFim) {
      filtered = filtered.filter((p) => p.dataCompra <= filters.dataFim)
    }

    setFilteredPurchases(filtered)
  }, [filters, purchases])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "comprado":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">✓ Comprado</Badge>
      case "aguardando_nf":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">⏳ Aguardando NF</Badge>
      case "cancelado":
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">✗ Cancelado</Badge>
      default:
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            📋 Em Processo
          </Badge>
        )
    }
  }

  const formatCurrency = (value: number, currency: string) => {
    return `${currency} ${value.toLocaleString()}`
  }

  const handleFileUpload = (purchaseId: number, files: FileList | null) => {
    if (files && files.length > 0) {
      // Simular upload de arquivo
      const newFiles = Array.from(files).map((file) => ({
        nome: file.name,
        tipo: "documento",
        data: new Date().toISOString().split("T")[0],
      }))

      const updatedPurchases = purchases.map((p) =>
        p.id === purchaseId ? { ...p, comprovantes: [...p.comprovantes, ...newFiles] } : p,
      )
      setPurchases(updatedPurchases)
      setUploadDialogOpen(false)
    }
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Compra do Item</h1>
                  <p className="text-gray-600">Itens comprados com base nas cotações aprovadas</p>
                </div>
              </div>
            </div>

            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-green-600">{purchases.length}</div>
                <div className="text-sm text-gray-600">Total de Compras</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">
                  {purchases.filter((p) => p.status === "comprado").length}
                </div>
                <div className="text-sm text-gray-600">Finalizadas</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-yellow-600">
                  {purchases.filter((p) => p.status === "aguardando_nf").length}
                </div>
                <div className="text-sm text-gray-600">Aguardando NF</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-gray-600">
                  {purchases.reduce((sum, p) => sum + p.valorFinalPago, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Valor Total (USD)</div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros de Pesquisa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <div>
                  <Label>Projeto</Label>
                  <Input
                    placeholder="Filtrar por projeto"
                    value={filters.projeto}
                    onChange={(e) => setFilters({ ...filters, projeto: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="comprado">Comprado</SelectItem>
                      <SelectItem value="aguardando_nf">Aguardando NF</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fornecedor</Label>
                  <Input
                    placeholder="Filtrar por fornecedor"
                    value={filters.fornecedor}
                    onChange={(e) => setFilters({ ...filters, fornecedor: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Data Início</Label>
                  <Input
                    type="date"
                    value={filters.dataInicio}
                    onChange={(e) => setFilters({ ...filters, dataInicio: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Data Fim</Label>
                  <Input
                    type="date"
                    value={filters.dataFim}
                    onChange={(e) => setFilters({ ...filters, dataFim: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Compras */}
          <div className="space-y-6">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-3">
                        <span>{purchase.produto}</span>
                        {getStatusBadge(purchase.status)}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Fornecedor:</span> {purchase.fornecedorEscolhido}
                          </div>
                          <div>
                            <span className="font-medium">Nº Compra:</span> {purchase.numeroCompra}
                          </div>
                          <div>
                            <span className="font-medium">Projeto:</span> {purchase.projeto}
                          </div>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(purchase.valorFinalPago, purchase.moeda)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(purchase.dataCompra).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Justificativa */}
                    <div>
                      <Label className="text-sm font-semibold">Justificativa da Escolha</Label>
                      <div className="mt-1 p-3 bg-blue-50 rounded-lg text-sm">{purchase.justificativa}</div>
                    </div>

                    {/* Informações Financeiras */}
                    <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label className="text-xs text-gray-600">Valor Final Pago</Label>
                        <div className="font-bold text-lg">
                          {formatCurrency(purchase.valorFinalPago, purchase.moeda)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Condições de Pagamento</Label>
                        <div className="text-sm">{purchase.condicoesPagamento}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Nota Fiscal</Label>
                        <div className="text-sm">
                          {purchase.notaFiscal ? (
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              <FileText className="h-4 w-4 mr-1" />
                              {purchase.notaFiscal}
                            </Button>
                          ) : (
                            <span className="text-gray-400">Aguardando</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Documentos e Comprovantes */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-semibold">Documentos Anexados</Label>
                        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPurchase(purchase)}>
                              <Upload className="h-4 w-4 mr-2" />
                              Anexar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload de Documentos</DialogTitle>
                              <DialogDescription>
                                Anexar comprovantes, notas fiscais e PDFs para {purchase.produto}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                                <input
                                  type="file"
                                  multiple
                                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                  onChange={(e) => handleFileUpload(purchase.id, e.target.files)}
                                  className="hidden"
                                  id="file-upload"
                                />
                                <Button
                                  variant="outline"
                                  onClick={() => document.getElementById("file-upload")?.click()}
                                >
                                  Selecionar Arquivos
                                </Button>
                              </div>
                              <div className="text-xs text-gray-500">
                                Formatos aceitos: PDF, JPG, PNG, DOC, DOCX (máx. 10MB por arquivo)
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="grid md:grid-cols-3 gap-2">
                        {purchase.comprovantes.map((doc, index) => (
                          <div key={index} className="flex items-center p-2 bg-white rounded border">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{doc.nome}</div>
                              <div className="text-xs text-gray-500">{doc.data}</div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Histórico de Negociação */}
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full bg-transparent">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Ver Histórico de Negociação ({purchase.historicoNegociacao.length} eventos)
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Histórico de Negociação</DialogTitle>
                            <DialogDescription>
                              {purchase.produto} - {purchase.numeroCompra}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            {purchase.historicoNegociacao.map((evento, index) => (
                              <div key={index} className="flex space-x-4 p-4 border rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-sm">{evento.acao}</span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(evento.data).toLocaleDateString("pt-BR")}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 mb-1">Por: {evento.usuario}</div>
                                  <div className="text-sm text-gray-700">{evento.observacao}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Observações */}
                    {purchase.observacoes && (
                      <div>
                        <Label className="text-sm font-semibold">Observações</Label>
                        <div className="mt-1 p-3 bg-yellow-50 rounded-lg text-sm">{purchase.observacoes}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPurchases.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma compra encontrada</h3>
                <p className="text-gray-600">Ajuste os filtros para ver mais resultados</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
