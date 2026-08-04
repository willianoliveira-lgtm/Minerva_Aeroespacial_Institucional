import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Cog, Truck, FileCheck, DollarSign, Clock } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: FileCheck,
      title: "Cotação Inteligente",
      description: "Sistema automatizado de cotação com múltiplos fornecedores globais",
      color: "bg-blue-500",
    },
    {
      icon: Cog,
      title: "Componentes Certificados",
      description: "Peças aeroespaciais com certificação AS9100 e rastreabilidade completa",
      color: "bg-green-500",
    },
    {
      icon: Truck,
      title: "Logística Especializada",
      description: "Transporte seguro com seguro total e acompanhamento em tempo real",
      color: "bg-purple-500",
    },
    {
      icon: DollarSign,
      title: "Gestão Financeira",
      description: "Controle de custos, câmbio e condições de pagamento otimizadas",
      color: "bg-orange-500",
    },
    {
      icon: Clock,
      title: "Prazos Garantidos",
      description: "Cronogramas rigorosos com alertas e acompanhamento de entregas",
      color: "bg-red-500",
    },
    {
      icon: Plane,
      title: "Suporte Técnico",
      description: "Equipe especializada em engenharia aeroespacial disponível 24/7",
      color: "bg-indigo-500",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para aquisição de componentes aeroespaciais, desde a cotação até a entrega
            final
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
