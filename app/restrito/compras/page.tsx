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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Upload, FileText, TrendingUp, Package, Truck, AlertCircle, CheckCircle, Clock } from "lucide-react"

// Dados simulados de compras
const mockPurchases = [
  {
    id: 1,
    fornecedor: "Safran Aircraft Engines",
    numeroCompra: "PO-2024-001",
    produto: "Turbina CFM56-7B",
    valorFinal: 2500000,
    dataCompra: "2024-01-20",
    dataEntregaPrevista: "2024-04-20",
    dataEntregaReal: null,
    status: "em_transito",
    notaFiscal: "NF-001-2024.pdf",
    comprovantes: ["comprovante_pagamento.pdf", "certificado_origem.pdf"],
    projeto: "Projeto Alpha",
    moeda: "USD",
  },
  {
    id: 2,
    fornecedor: "Liebherr Aerospace",
    numeroCompra: "PO-2024-002",
    produto: "Landing Gear Assembly",
    valorFinal: 450000,
    dataCompra: "2024-01-15",
    dataEntregaPrevista: "2024-03-15",
    dataEntregaReal: "2024-03-10",
    status: "entregue",
    notaFiscal: "NF-002-2024.pdf",
    comprovantes: ["comprovante_pagamento.pdf"],
    projeto: "Projeto Beta",
    moeda: "EUR",
  },
  {
    id: 3,
    fornecedor: "Parker Hannifin",
    numeroCompra: "PO-2024-003",
    produto: "Hydraulic Pump",
    valorFinal: 75000,
    dataCompra: "2024-01-25",
    dataEntregaPrevista: "2024-02-25",
    dataEntregaReal: null,
    status: "atrasado",
    notaFiscal: null,
    comprovantes: [],
    projeto: "Projeto Alpha",
    moeda: "USD",
  },
]

export default function ComprasPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [purchases, setPurchases] = useState(mockPurchases)
  const [filteredPurchases, setFilteredPurchases] = useState(mockPurchases)
  const [filters, setFilters] = useState({
    status: "all",
    fornecedor: "",
    projeto: "",
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
    let filtered = purchases

    if (filters.status !== "all") {
      filtered = filtered.filter((p) => p.status === filters.status)
    }
    if (filters.fornecedor) {
      filtered = filtered.filter((p) => p.fornecedor.toLowerCase().includes(filters.fornecedor.toLowerCase()))
    }
    if (filters.projeto) {
      filtered = filtered.filter((p) => p.projeto.toLowerCase().includes(filters.projeto.toLowerCase()))
    }

    setFilteredPurchases(filtered)
  }, [filters, purchases])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "entregue":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Entregue
          </Badge>
        )
      case "em_transito":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Truck className="h-3 w-3 mr-1" />
            Em Trânsito
          </Badge>
        )
      case "atrasado":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertCircle className="h-3 w-3 mr-1" />
            Atrasado
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
    }
  }

  const getStatusStats = () => {
    const total = purchases.length
    const entregue = purchases.filter((p) => p.status === "entregue").length
    const emTransito = purchases.filter((p) => p.status === "em_transito").length
    const atrasado = purchases.filter((p) => p.status === "atrasado").length

    return { total, entregue, emTransito, atrasado }
  }

  const stats = getStatusStats()

  if (!isAuthenticated) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestão de Compras</h1>
          <p className="text-slate-600">Acompanhe o status das compras e entregas de componentes</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="compras">Compras</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Cards de Status */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total de Compras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="flex items-center mt-2">
                    <Package className="h-4 w-4 text-slate-500 mr-1" />
                    <span className="text-sm text-slate-500">Itens</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Entregues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.entregue}</div>
                  <Progress value={(stats.entregue / stats.total) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Em Trânsito</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.emTransito}</div>
                  <Progress value={(stats.emTransito / stats.total) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Atrasados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.atrasado}</div>
                  <Progress value={(stats.atrasado / stats.total) * 100} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Alertas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Alertas e Notificações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <div className="font-medium text-red-800">Entrega Atrasada</div>
                      <div className="text-sm text-red-600">Hydraulic Pump - Parker Hannifin (5 dias de atraso)</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Truck className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <div className="font-medium text-blue-800">Em Trânsito</div>
                      <div className="text-sm text-blue-600">Turbina CFM56-7B chegará em 15 dias</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compras" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="entregue">Entregue</SelectItem>
                        <SelectItem value="em_transito">Em Trânsito</SelectItem>
                        <SelectItem value="atrasado">Atrasado</SelectItem>
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
                    <Label>Projeto</Label>
                    <Input
                      placeholder="Filtrar por projeto"
                      value={filters.projeto}
                      onChange={(e) => setFilters({ ...filters, projeto: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de Compras */}
            <Card>
              <CardHeader>
                <CardTitle>Compras Realizadas</CardTitle>
                <CardDescription>{filteredPurchases.length} compras encontradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Nº Compra</th>
                        <th className="text-left p-3">Produto</th>
                        <th className="text-left p-3">Fornecedor</th>
                        <th className="text-left p-3">Valor</th>
                        <th className="text-left p-3">Entrega</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Documentos</th>
                        <th className="text-left p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPurchases.map((purchase) => (
                        <tr key={purchase.id} className="border-b hover:bg-slate-50">
                          <td className="p-3">
                            <div className="font-medium">{purchase.numeroCompra}</div>
                            <div className="text-sm text-slate-500">{purchase.dataCompra}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">{purchase.produto}</div>
                            <div className="text-sm text-slate-500">{purchase.projeto}</div>
                          </td>
                          <td className="p-3">{purchase.fornecedor}</td>
                          <td className="p-3">
                            <div className="font-medium">
                              {purchase.moeda} {purchase.valorFinal.toLocaleString()}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              <div>Prevista: {purchase.dataEntregaPrevista}</div>
                              {purchase.dataEntregaReal && (
                                <div className="text-green-600">Real: {purchase.dataEntregaReal}</div>
                              )}
                            </div>
                          </td>
                          <td className="p-3">{getStatusBadge(purchase.status)}</td>
                          <td className="p-3">
                            <div className="space-y-1">
                              {purchase.notaFiscal && (
                                <div className="flex items-center text-sm">
                                  <FileText className="h-3 w-3 mr-1" />
                                  NF
                                </div>
                              )}
                              <div className="text-sm text-slate-500">{purchase.comprovantes.length} docs</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Editar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Editar Compra</DialogTitle>
                                    <DialogDescription>
                                      {purchase.numeroCompra} - {purchase.produto}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Status</Label>
                                      <Select defaultValue={purchase.status}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="entregue">Entregue</SelectItem>
                                          <SelectItem value="em_transito">Em Trânsito</SelectItem>
                                          <SelectItem value="atrasado">Atrasado</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label>Data de Entrega Real</Label>
                                      <Input type="date" />
                                    </div>
                                    <Button className="w-full">Salvar Alterações</Button>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Upload className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Upload de Documentos</DialogTitle>
                                    <DialogDescription>Enviar comprovantes e documentos da compra</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                      <p className="text-slate-600">Arraste arquivos aqui ou clique para selecionar</p>
                                    </div>
                                    <Button className="w-full">Enviar Documentos</Button>
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
          </TabsContent>

          <TabsContent value="relatorios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Relatórios e Exportação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <FileText className="h-6 w-6 mb-2" />
                    Exportar PDF
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Relatório Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
