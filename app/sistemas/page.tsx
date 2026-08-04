import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Database, Shield, Users, FileText, Calendar, Settings } from "lucide-react"

export default function SistemasPage() {
  const systems = [
    {
      id: 1,
      name: "SIGAA - Sistema Integrado de Gestão",
      description: "Sistema completo para gestão acadêmica e administrativa da instituição.",
      icon: Database,
      status: "Ativo",
      users: "2.500+",
      category: "Gestão Acadêmica",
      features: ["Matrículas", "Notas", "Frequência", "Relatórios"],
      url: "#",
    },
    {
      id: 2,
      name: "Portal do Pesquisador",
      description: "Plataforma para submissão e acompanhamento de projetos de pesquisa.",
      icon: FileText,
      status: "Ativo",
      users: "450+",
      category: "Pesquisa",
      features: ["Submissão de projetos", "Acompanhamento", "Relatórios", "Colaboração"],
      url: "#",
    },
    {
      id: 3,
      name: "Sistema de Autenticação Única",
      description: "Gerenciamento centralizado de usuários e permissões.",
      icon: Shield,
      status: "Ativo",
      users: "3.000+",
      category: "Segurança",
      features: ["SSO", "Controle de acesso", "Auditoria", "Integração"],
      url: "#",
    },
    {
      id: 4,
      name: "Agenda Institucional",
      description: "Sistema para agendamento de salas e recursos institucionais.",
      icon: Calendar,
      status: "Beta",
      users: "200+",
      category: "Recursos",
      features: ["Reserva de salas", "Calendário", "Notificações", "Relatórios"],
      url: "#",
    },
    {
      id: 5,
      name: "Portal de Recursos Humanos",
      description: "Gestão de funcionários, folha de pagamento e benefícios.",
      icon: Users,
      status: "Desenvolvimento",
      users: "Em breve",
      category: "RH",
      features: ["Cadastro de funcionários", "Folha de pagamento", "Benefícios", "Avaliações"],
      url: "#",
    },
    {
      id: 6,
      name: "Painel de Configurações",
      description: "Interface administrativa para configuração dos sistemas.",
      icon: Settings,
      status: "Ativo",
      users: "50+",
      category: "Administração",
      features: ["Configurações", "Monitoramento", "Logs", "Backup"],
      url: "#",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-500"
      case "Beta":
        return "bg-yellow-500"
      case "Desenvolvimento":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const categories = [...new Set(systems.map((system) => system.category))]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sistemas e Ferramentas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os sistemas desenvolvidos pela nossa equipe para otimizar processos institucionais e facilitar o
            trabalho acadêmico.
          </p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Todos
          </Badge>
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-100">
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system) => (
            <Card key={system.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <system.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className={`${getStatusColor(system.status)} text-white`}>{system.status}</Badge>
                </div>
                <CardTitle className="text-xl">{system.name}</CardTitle>
                <CardDescription>{system.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Categoria:</span>
                  <Badge variant="secondary">{system.category}</Badge>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usuários ativos:</span>
                  <span className="font-semibold">{system.users}</span>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Funcionalidades:</h4>
                  <div className="flex flex-wrap gap-1">
                    {system.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  {system.status === "Ativo" || system.status === "Beta" ? (
                    <Button className="w-full">
                      Acessar Sistema
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      Em Desenvolvimento
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de estatísticas */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Estatísticas dos Sistemas</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">6</div>
              <div className="text-gray-600">Sistemas Ativos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">6.200+</div>
              <div className="text-gray-600">Usuários Totais</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
