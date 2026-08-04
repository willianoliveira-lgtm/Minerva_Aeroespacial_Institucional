import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, ExternalLink, Search, Filter } from "lucide-react"

export default function PublicacoesPage() {
  const publications = [
    {
      id: 1,
      title: "Aplicação de Inteligência Artificial na Educação Superior",
      description:
        "Estudo sobre o impacto da IA nos processos educacionais e sua implementação em instituições de ensino superior.",
      type: "Artigo Científico",
      date: "15 de Janeiro de 2024",
      authors: ["Dra. Maria Santos", "Dr. João Silva"],
      journal: "Revista Brasileira de Informática na Educação",
      tags: ["IA", "Educação", "Tecnologia"],
      url: "#",
    },
    {
      id: 2,
      title: "Desenvolvimento de Sistemas Web Responsivos com React",
      description:
        "Guia completo para desenvolvimento de aplicações web modernas utilizando React e tecnologias relacionadas.",
      type: "Tutorial Técnico",
      date: "10 de Janeiro de 2024",
      authors: ["Prof. Carlos Oliveira"],
      journal: "Portal de Desenvolvimento",
      tags: ["React", "Web Development", "Frontend"],
      url: "#",
    },
    {
      id: 3,
      title: "Segurança em Sistemas de Informação Acadêmicos",
      description: "Análise das principais vulnerabilidades e estratégias de proteção para sistemas acadêmicos.",
      type: "Paper de Conferência",
      date: "5 de Janeiro de 2024",
      authors: ["Dr. João Silva", "Ana Costa"],
      journal: "Conferência Brasileira de Segurança da Informação",
      tags: ["Segurança", "Sistemas", "Proteção"],
      url: "#",
    },
    {
      id: 4,
      title: "UX Design em Plataformas Educacionais",
      description: "Princípios e práticas de design de experiência do usuário aplicados a sistemas educacionais.",
      type: "Artigo de Revista",
      date: "28 de Dezembro de 2023",
      authors: ["Ana Costa", "Dra. Maria Santos"],
      journal: "Design & Tecnologia",
      tags: ["UX", "Design", "Educação"],
      url: "#",
    },
    {
      id: 5,
      title: "Análise de Performance em Aplicações Node.js",
      description: "Técnicas de otimização e monitoramento de performance para aplicações backend em Node.js.",
      type: "Documentação Técnica",
      date: "20 de Dezembro de 2023",
      authors: ["Prof. Carlos Oliveira"],
      journal: "Documentação Interna",
      tags: ["Node.js", "Performance", "Backend"],
      url: "#",
    },
    {
      id: 6,
      title: "Metodologias Ágeis no Desenvolvimento de Software Educacional",
      description:
        "Aplicação de metodologias ágeis no contexto de desenvolvimento de software para instituições educacionais.",
      type: "Estudo de Caso",
      date: "15 de Dezembro de 2023",
      authors: ["Dr. João Silva", "Prof. Carlos Oliveira"],
      journal: "Revista de Engenharia de Software",
      tags: ["Metodologias Ágeis", "Software", "Educação"],
      url: "#",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Artigo Científico":
        return "bg-blue-500"
      case "Tutorial Técnico":
        return "bg-green-500"
      case "Paper de Conferência":
        return "bg-purple-500"
      case "Artigo de Revista":
        return "bg-orange-500"
      case "Documentação Técnica":
        return "bg-gray-500"
      case "Estudo de Caso":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const types = [...new Set(publications.map((pub) => pub.type))]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publicações e Notícias</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe nossas publicações científicas, artigos técnicos e as últimas novidades do instituto de pesquisa.
          </p>
        </div>

        {/* Filtros e busca */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar publicações..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Todos
            </Badge>
            {types.map((type) => (
              <Badge key={type} variant="outline" className="cursor-pointer hover:bg-gray-100">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {publications.map((publication) => (
            <Card key={publication.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl flex-1 pr-4">{publication.title}</CardTitle>
                  <Badge className={`${getTypeColor(publication.type)} text-white whitespace-nowrap`}>
                    {publication.type}
                  </Badge>
                </div>
                <CardDescription className="text-base">{publication.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{publication.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{publication.authors.join(", ")}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Publicado em: </span>
                  <span className="text-sm text-gray-600">{publication.journal}</span>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700 block mb-2">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {publication.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button>
                    Ler Publicação
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Estatísticas de Publicações</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">25</div>
              <div className="text-gray-600">Artigos Publicados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-gray-600">Conferências</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-gray-600">Revistas Indexadas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">150+</div>
              <div className="text-gray-600">Citações</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
