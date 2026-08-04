import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function About() {
  const features = [
    "Mais de 15 anos de experiência no setor aeroespacial",
    "Rede de fornecedores certificados em 25 países",
    "Sistema de rastreabilidade completa de componentes",
    "Equipe técnica especializada em engenharia aeroespacial",
    "Certificações AS9100, ISO 9001 e ITAR compliance",
    "Suporte 24/7 para emergências e AOG (Aircraft on Ground)",
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Excelência em Aquisições Aeroespaciais</h2>
            <p className="text-lg text-slate-600 mb-8">
              A Minerva Aerospace é líder em soluções de aquisição para a indústria aeroespacial. Nossa plataforma
              integrada conecta fabricantes, MROs e operadores aos melhores fornecedores globais, garantindo qualidade,
              prazo e custo otimizado.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
              Conheça Nossa História
            </Button>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/placeholder.svg?height=250&width=300&text=Aerospace+Facility"
                alt="Instalações"
                className="rounded-lg shadow-lg"
              />
              <img
                src="/placeholder.svg?height=250&width=300&text=Quality+Control"
                alt="Controle de Qualidade"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm">Projetos Concluídos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
