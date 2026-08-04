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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  FileText,
  DollarSign,
  Truck,
  Calendar,
  Building,
  Hash,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Dados simulados de cotações expandidos
const mockQuotations = [
  {
    id: 1,
    produto: "Turbina CFM56-7B",
    quantidade: 2,
    link: "https://example.com/cfm56-spec",
    valorUnitario: 1250000,
    tipo: "Engine Component",
    moeda: "USD",
    frete: 15000,
    total: 2515000,
    prazo: "90 dias",
    desconto: 5,
    alfandega: 25000,
    status: "pendente",
    dataAprovacao: null,
    fornecedor: "Safran Aircraft Engines",
    numeroInterno: "INT-2024-001",
    projeto: "Projeto Alpha",
    dataRecebimento: "2024-01-15",
    observacoes: "Cotação com certificação AS9100 incluída",
    condicoesPagamento: "30/60/90 dias",
    validadeCotacao: "2024-03-15",
  },
  {
    id: 2,
    produto: "Landing Gear Assembly",
    quantidade: 1,
    link: "https://example.com/landing-gear-spec",
    valorUnitario: 450000,
    tipo: "Landing System",
    moeda: "EUR",
    frete: 8000,
    total: 458000,
    prazo: "60 dias",
    desconto: 2,
    alfandega: 12000,
    status: "aprovado",
    dataAprovacao: "2024-01-18",
    fornecedor: "Liebherr Aerospace",
    numeroInterno: "INT-2024-002",
    projeto: "Projeto Beta",
    dataRecebimento: "2024-01-10",
    observacoes: "Aprovado com desconto negociado",
    condicoesPagamento: "À vista",
    validadeCotacao: "2024-02-28",
  },
  {
    id: 3,
    produto: "Avionics Display Unit",
    quantidade: 4,
    link: "https://example.com/avionics-spec",
    valorUnitario: 45000,
    tipo: "Avionics",
    moeda: "USD",
    frete: 2000,
    total: 182000,
    prazo: "45 dias",
    desconto: 0,
    alfandega: 5000,
    status: "reprovado",
    dataAprovacao: "2024-01-20",
    fornecedor: "Honeywell Aerospace",
    numeroInterno: "INT-2024-003",
    projeto: "Projeto Gamma",
    dataRecebimento: "2024-01-08",
    observacoes: "Reprovado por prazo inadequado",
    condicoesPagamento: "60 dias",
    validadeCotacao: "2024-02-15",
  },
  {
    id: 4,
    produto: "Hydraulic Pump",
    quantidade: 3,
    link: "https://example.com/hydraulic-spec",
    valorUnitario: 25000,
    tipo: "Hydraulic System",
    moeda: "USD",
    frete: 1500,
    total: 76500,
    prazo: "30 dias",
    desconto: 3,
    alfandega: 2000,
    status: "ressalva",
    dataAprovacao: "2024-01-22",
    fornecedor: "Parker Hannifin",
    numeroInterno: "INT-2024-004",
    projeto: "Projeto Alpha",
    dataRecebimento: "2024-01-12",
    observacoes: "Aprovado com ressalva sobre certificação",
    condicoesPagamento: "45 dias",
    validadeCotacao: "2024-03-01",
  },
  {
    id: 5,
    produto: "Oxygen System Valve",
    quantidade: 6,
    link: "https://example.com/oxygen-valve-spec",
    valorUnitario: 8500,
    tipo: "Life Support",
    moeda: "USD",
    frete: 800,
    total: 51800,
    prazo: "21 dias",
    desconto: 1,
    alfandega: 1500,
    status: "pendente",
    dataAprovacao: null,
    fornecedor: "Zodiac Aerospace",
    numeroInterno: "INT-2024-005",
    projeto: "Projeto Delta",
    dataRecebimento: "2024-01-25",
    observacoes: "Aguardando análise técnica",
    condicoesPagamento: "30 dias",
    validadeCotacao: "2024-02-25",
  },
]

export default function CotacaoAprovacaoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [quotations, setQuotations] = useState(mockQuotations)
  const [filteredQuotations, setFilteredQuotations] = useState(mockQuotations)
  const [filters, setFilters] = useState({
    dataInicio: "",
    dataFim: "",
    projeto: "",
    status: "all",
    fornecedor: "",
    numeroInterno: "",
  })
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null)
  const [approvalData, setApprovalData] = useState({
    status: "",
    justificativa: "",
    observacoes: "",
  })
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
    let filtered = quotations

    if (filters.dataInicio) {
      filtered = filtered.filter((q) => q.dataRecebimento >= filters.dataInicio)
    }
    if (filters.dataFim) {
      filtered = filtered.filter((q) => q.dataRecebimento <= filters.dataFim)
    }
    if (filters.projeto) {
      filtered = filtered.filter((q) => q.projeto.toLowerCase().includes(filters.projeto.toLowerCase()))
    }
    if (filters.status !== "all") {
      filtered = filtered.filter((q) => q.status === filters.status)
    }
    if (filters.fornecedor) {
      filtered = filtered.filter((q) => q.fornecedor.toLowerCase().includes(filters.fornecedor.toLowerCase()))
    }
    if (filters.numeroInterno) {
      filtered = filtered.filter((q) => q.numeroInterno.toLowerCase().includes(filters.numeroInterno.toLowerCase()))
    }

    setFilteredQuotations(filtered)
  }, [filters, quotations])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">✓ Aprovado</Badge>
      case "reprovado":
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">✗ Reprovado</Badge>
      case "ressalva":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">⚠ Com Ressalva</Badge>
      default:
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            ⏳ Pendente
          </Badge>
        )
    }
  }

  const handleApproval = () => {
    if (selectedQuotation && approvalData.status) {
      const updatedQuotations = quotations.map((q) =>
        q.id === selectedQuotation.id
          ? {
              ...q,
              status: approvalData.status,
              justificativa: approvalData.justificativa,
              dataAprovacao: new Date().toISOString().split("T")[0],
              observacoes: approvalData.observacoes,
            }
          : q,
      )
      setQuotations(updatedQuotations)
      setSelectedQuotation(null)
      setApprovalData({ status: "", justificativa: "", observacoes: "" })
    }
  }

  const formatCurrency = (value: number, currency: string) => {
    return `${currency} ${value.toLocaleString()}`
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
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Aprovação do Cotador</h1>
                  <p className="text-gray-600">Gerencie e aprove cotações recebidas dos fornecedores</p>
                </div>
              </div>
            </div>

            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">{quotations.length}</div>
                <div className="text-sm text-gray-600">Total de Cotações</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-green-600">
                  {quotations.filter((q) => q.status === "aprovado").length}
                </div>
                <div className="text-sm text-gray-600">Aprovadas</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-yellow-600">
                  {quotations.filter((q) => q.status === "ressalva").length}
                </div>
                <div className="text-sm text-gray-600">Com Ressalva</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-gray-600">
                  {quotations.filter((q) => q.status === "pendente").length}
                </div>
                <div className="text-sm text-gray-600">Pendentes</div>
              </div>
            </div>
          </div>

          {/* Filtros Avançados */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros de Pesquisa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-6 gap-4">
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
                <div>
                  <Label>Projeto</Label>
                  <Input
                    placeholder="Filtrar por projeto"
                    value={filters.projeto}
                    onChange={(e) => setFilters({ ...filters, projeto: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Status de Aprovação</Label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="aprovado">Aprovado</SelectItem>
                      <SelectItem value="reprovado">Reprovado</SelectItem>
                      <SelectItem value="ressalva">Com Ressalva</SelectItem>
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
                  <Label>Nº Interno</Label>
                  <Input
                    placeholder="Número interno"
                    value={filters.numeroInterno}
                    onChange={(e) => setFilters({ ...filters, numeroInterno: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      dataInicio: "",
                      dataFim: "",
                      projeto: "",
                      status: "all",
                      fornecedor: "",
                      numeroInterno: "",
                    })
                  }
                >
                  Limpar Filtros
                </Button>
                <Button>Exportar Resultados</Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Cotações */}
          <Card>
            <CardHeader>
              <CardTitle>Cotações Recebidas</CardTitle>
              <CardDescription>
                {filteredQuotations.length} cotações encontradas
                {filters.status !== "all" && ` • Filtro: ${filters.status}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3 font-semibold">Produto</th>
                      <th className="text-left p-3 font-semibold">Qtd</th>
                      <th className="text-left p-3 font-semibold">Link</th>
                      <th className="text-left p-3 font-semibold">Valor Unit.</th>
                      <th className="text-left p-3 font-semibold">Tipo</th>
                      <th className="text-left p-3 font-semibold">Moeda</th>
                      <th className="text-left p-3 font-semibold">Frete</th>
                      <th className="text-left p-3 font-semibold">Total</th>
                      <th className="text-left p-3 font-semibold">Prazo</th>
                      <th className="text-left p-3 font-semibold">Desconto</th>
                      <th className="text-left p-3 font-semibold">Alfândega</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Data Aprov.</th>
                      <th className="text-left p-3 font-semibold">Fornecedor</th>
                      <th className="text-left p-3 font-semibold">Nº Interno</th>
                      <th className="text-left p-3 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotations.map((quotation) => (
                      <tr key={quotation.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="font-medium text-gray-900 max-w-32 truncate">{quotation.produto}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{quotation.produto}</p>
                              <p className="text-xs text-gray-500">{quotation.observacoes}</p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        <td className="p-3 text-center font-medium">{quotation.quantidade}</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={quotation.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </td>
                        <td className="p-3 font-medium">{formatCurrency(quotation.valorUnitario, quotation.moeda)}</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-xs">
                            {quotation.tipo}
                          </Badge>
                        </td>
                        <td className="p-3 text-center font-mono">{quotation.moeda}</td>
                        <td className="p-3">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center">
                                <Truck className="h-3 w-3 mr-1 text-gray-500" />
                                {formatCurrency(quotation.frete, quotation.moeda)}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Custo de frete e logística</p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        <td className="p-3 font-bold text-gray-900">
                          {formatCurrency(quotation.total, quotation.moeda)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                            {quotation.prazo}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          {quotation.desconto > 0 ? (
                            <Badge className="bg-green-100 text-green-800">-{quotation.desconto}%</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-3">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center">
                                <Building className="h-3 w-3 mr-1 text-gray-500" />
                                {formatCurrency(quotation.alfandega, quotation.moeda)}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Taxas alfandegárias estimadas</p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        <td className="p-3">{getStatusBadge(quotation.status)}</td>
                        <td className="p-3 text-center">
                          {quotation.dataAprovacao ? (
                            <div className="text-xs">
                              {new Date(quotation.dataAprovacao).toLocaleDateString("pt-BR")}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="max-w-32 truncate font-medium">{quotation.fornecedor}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center font-mono text-xs">
                            <Hash className="h-3 w-3 mr-1 text-gray-500" />
                            {quotation.numeroInterno}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedQuotation(quotation)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center">
                                    <FileText className="h-5 w-5 mr-2" />
                                    Análise de Cotação
                                  </DialogTitle>
                                  <DialogDescription>
                                    {quotation.produto} - {quotation.fornecedor}
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6">
                                  {/* Informações da Cotação */}
                                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div>
                                      <Label className="text-xs text-gray-600">Número Interno</Label>
                                      <div className="font-mono text-sm">{quotation.numeroInterno}</div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-600">Data Recebimento</Label>
                                      <div className="text-sm">
                                        {new Date(quotation.dataRecebimento).toLocaleDateString("pt-BR")}
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-600">Validade</Label>
                                      <div className="text-sm">
                                        {new Date(quotation.validadeCotacao).toLocaleDateString("pt-BR")}
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-600">Condições de Pagamento</Label>
                                      <div className="text-sm">{quotation.condicoesPagamento}</div>
                                    </div>
                                  </div>

                                  {/* Detalhes Financeiros */}
                                  <div className="space-y-3">
                                    <h4 className="font-semibold flex items-center">
                                      <DollarSign className="h-4 w-4 mr-2" />
                                      Detalhes Financeiros
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        Valor Unitário:{" "}
                                        <span className="font-medium">
                                          {formatCurrency(quotation.valorUnitario, quotation.moeda)}
                                        </span>
                                      </div>
                                      <div>
                                        Quantidade: <span className="font-medium">{quotation.quantidade}</span>
                                      </div>
                                      <div>
                                        Frete:{" "}
                                        <span className="font-medium">
                                          {formatCurrency(quotation.frete, quotation.moeda)}
                                        </span>
                                      </div>
                                      <div>
                                        Alfândega:{" "}
                                        <span className="font-medium">
                                          {formatCurrency(quotation.alfandega, quotation.moeda)}
                                        </span>
                                      </div>
                                      <div>
                                        Desconto: <span className="font-medium">{quotation.desconto}%</span>
                                      </div>
                                      <div className="font-bold text-lg col-span-2 pt-2 border-t">
                                        Total: {formatCurrency(quotation.total, quotation.moeda)}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Observações */}
                                  {quotation.observacoes && (
                                    <div>
                                      <Label className="text-sm font-semibold">Observações</Label>
                                      <div className="mt-1 p-3 bg-blue-50 rounded-lg text-sm">
                                        {quotation.observacoes}
                                      </div>
                                    </div>
                                  )}

                                  {/* Formulário de Aprovação */}
                                  <div className="space-y-4 border-t pt-4">
                                    <h4 className="font-semibold">Decisão de Aprovação</h4>

                                    <div>
                                      <Label>Status da Aprovação</Label>
                                      <Select
                                        value={approvalData.status}
                                        onValueChange={(value) => setApprovalData({ ...approvalData, status: value })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione o status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="aprovado">
                                            <div className="flex items-center">
                                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                              Aprovar
                                            </div>
                                          </SelectItem>
                                          <SelectItem value="reprovado">
                                            <div className="flex items-center">
                                              <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                              Reprovar
                                            </div>
                                          </SelectItem>
                                          <SelectItem value="ressalva">
                                            <div className="flex items-center">
                                              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                                              Aprovar com Ressalva
                                            </div>
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div>
                                      <Label>Justificativa da Decisão</Label>
                                      <Textarea
                                        placeholder="Digite a justificativa da decisão..."
                                        value={approvalData.justificativa}
                                        onChange={(e) =>
                                          setApprovalData({ ...approvalData, justificativa: e.target.value })
                                        }
                                        rows={3}
                                      />
                                    </div>

                                    <div>
                                      <Label>Observações Adicionais</Label>
                                      <Textarea
                                        placeholder="Observações técnicas ou comerciais..."
                                        value={approvalData.observacoes}
                                        onChange={(e) =>
                                          setApprovalData({ ...approvalData, observacoes: e.target.value })
                                        }
                                        rows={2}
                                      />
                                    </div>

                                    <Button onClick={handleApproval} className="w-full" disabled={!approvalData.status}>
                                      Confirmar Decisão
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredQuotations.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma cotação encontrada</h3>
                  <p className="text-gray-600">Ajuste os filtros para ver mais resultados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
