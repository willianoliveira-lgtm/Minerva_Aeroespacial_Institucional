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
import { Filter, Eye, CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react"

// Dados simulados de cotações
const mockQuotations = [
  {
    id: 1,
    produto: "Turbina CFM56-7B",
    quantidade: 2,
    link: "https://example.com/cfm56",
    tipo: "Engine",
    moeda: "USD",
    frete: 15000,
    total: 2500000,
    prazo: "90 dias",
    status: "pendente",
    data: "2024-01-15",
    fornecedor: "Safran Aircraft Engines",
    projeto: "Projeto Alpha",
  },
  {
    id: 2,
    produto: "Landing Gear Assembly",
    quantidade: 1,
    link: "https://example.com/landing-gear",
    tipo: "Landing System",
    moeda: "EUR",
    frete: 8000,
    total: 450000,
    prazo: "60 dias",
    status: "aprovado",
    data: "2024-01-10",
    fornecedor: "Liebherr Aerospace",
    projeto: "Projeto Beta",
  },
  {
    id: 3,
    produto: "Avionics Display Unit",
    quantidade: 4,
    link: "https://example.com/avionics",
    tipo: "Avionics",
    moeda: "USD",
    frete: 2000,
    total: 180000,
    prazo: "45 dias",
    status: "reprovado",
    data: "2024-01-08",
    fornecedor: "Honeywell Aerospace",
    projeto: "Projeto Gamma",
  },
  {
    id: 4,
    produto: "Hydraulic Pump",
    quantidade: 3,
    link: "https://example.com/hydraulic",
    tipo: "Hydraulic System",
    moeda: "USD",
    frete: 1500,
    total: 75000,
    prazo: "30 dias",
    status: "ressalva",
    data: "2024-01-12",
    fornecedor: "Parker Hannifin",
    projeto: "Projeto Alpha",
  },
]

export default function AprovacaoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [quotations, setQuotations] = useState(mockQuotations)
  const [filteredQuotations, setFilteredQuotations] = useState(mockQuotations)
  const [filters, setFilters] = useState({
    projeto: "",
    status: "",
    fornecedor: "",
    dataInicio: "",
    dataFim: "",
  })
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null)
  const [approvalData, setApprovalData] = useState({
    status: "",
    justificativa: "",
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("aerospace_auth")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  useEffect(() => {
    // Aplicar filtros
    let filtered = quotations

    if (filters.projeto) {
      filtered = filtered.filter((q) => q.projeto.toLowerCase().includes(filters.projeto.toLowerCase()))
    }
    if (filters.status) {
      filtered = filtered.filter((q) => q.status === filters.status)
    }
    if (filters.fornecedor) {
      filtered = filtered.filter((q) => q.fornecedor.toLowerCase().includes(filters.fornecedor.toLowerCase()))
    }

    setFilteredQuotations(filtered)
  }, [filters, quotations])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-500 hover:bg-green-600">Aprovado</Badge>
      case "reprovado":
        return <Badge className="bg-red-500 hover:bg-red-600">Reprovado</Badge>
      case "ressalva":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Com Ressalva</Badge>
      default:
        return <Badge variant="outline">Pendente</Badge>
    }
  }

  const handleApproval = () => {
    if (selectedQuotation && approvalData.status) {
      const updatedQuotations = quotations.map((q) =>
        q.id === selectedQuotation.id
          ? { ...q, status: approvalData.status, justificativa: approvalData.justificativa }
          : q,
      )
      setQuotations(updatedQuotations)
      setSelectedQuotation(null)
      setApprovalData({ status: "", justificativa: "" })
    }
  }

  if (!isAuthenticated) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Aprovação de Cotações</h1>
          <p className="text-slate-600">Gerencie e aprove cotações de componentes aeroespaciais</p>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros
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

        {/* Tabela de Cotações */}
        <Card>
          <CardHeader>
            <CardTitle>Cotações Recebidas</CardTitle>
            <CardDescription>{filteredQuotations.length} cotações encontradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Produto</th>
                    <th className="text-left p-3">Qtd</th>
                    <th className="text-left p-3">Fornecedor</th>
                    <th className="text-left p-3">Valor Total</th>
                    <th className="text-left p-3">Prazo</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Projeto</th>
                    <th className="text-left p-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotations.map((quotation) => (
                    <tr key={quotation.id} className="border-b hover:bg-slate-50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{quotation.produto}</div>
                          <div className="text-sm text-slate-500">{quotation.tipo}</div>
                        </div>
                      </td>
                      <td className="p-3">{quotation.quantidade}</td>
                      <td className="p-3">
                        <div className="font-medium">{quotation.fornecedor}</div>
                        <div className="text-sm text-slate-500">{quotation.data}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">
                          {quotation.moeda} {quotation.total.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500">
                          Frete: {quotation.moeda} {quotation.frete.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-3">{quotation.prazo}</td>
                      <td className="p-3">{getStatusBadge(quotation.status)}</td>
                      <td className="p-3">{quotation.projeto}</td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={quotation.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedQuotation(quotation)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Aprovar Cotação</DialogTitle>
                                <DialogDescription>
                                  {quotation.produto} - {quotation.fornecedor}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4">
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
                                  <Label>Justificativa</Label>
                                  <Textarea
                                    placeholder="Digite a justificativa da decisão..."
                                    value={approvalData.justificativa}
                                    onChange={(e) =>
                                      setApprovalData({ ...approvalData, justificativa: e.target.value })
                                    }
                                  />
                                </div>

                                <Button onClick={handleApproval} className="w-full" disabled={!approvalData.status}>
                                  Confirmar Decisão
                                </Button>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
