import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export function NewsSection() {
  const news = [
    {
      id: 1,
      title: "Novo Projeto de Pesquisa em IA Aprovado",
      description:
        "Projeto interdisciplinar focado em aplicações de inteligência artificial para sustentabilidade ambiental recebe financiamento.",
      date: "2024-01-15",
      category: "Pesquisa",
      image: "/placeholder.svg?height=200&width=300&text=AI+Research",
    },
    {
      id: 2,
      title: "Publicação em Revista Internacional",
      description: "Artigo sobre otimização de algoritmos publicado na IEEE Transactions on Computing.",
      date: "2024-01-10",
      category: "Publicação",
      image: "/placeholder.svg?height=200&width=300&text=Publication",
    },
    {
      id: 3,
      title: "Workshop de Tecnologias Emergentes",
      description: "Evento aberto ao público sobre as últimas tendências em tecnologia e inovação.",
      date: "2024-01-05",
      category: "Evento",
      image: "/placeholder.svg?height=200&width=300&text=Workshop",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{"Notícias e Atualizações"}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {"Fique por dentro das últimas novidades, projetos e conquistas do nosso instituto"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(item.date)}
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between">
                  {"Ler mais"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/publicacoes">
            <Button size="lg" variant="outline">
              {"Ver todas as notícias"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
