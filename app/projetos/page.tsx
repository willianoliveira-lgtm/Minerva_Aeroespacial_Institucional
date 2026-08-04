import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ExternalLink } from "lucide-react"

export default function ProjetosPage() {
  const projects = [
    {
      id: 1,
      title: "Sistema de Gestão Acadêmica",
      description:
        "Plataforma integrada para gestão de atividades acadêmicas, incluindo matrículas, notas, frequência e relatórios administrativos.",
      status: "Em Desenvolvimento",
      startDate: "Janeiro 2024",
      team: ["Dr. João Silva", "Prof. Carlos Oliveira", "Ana Costa"],
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      image: "/placeholder.svg?height=200&width=400",
      progress: 75,
    },
    {
      id: 2,
      title: "IA para Análise de Dados Educacionais",
      description:
        "Sistema de inteligência artificial para análise preditiva de desempenho estudantil e identificação de padrões de aprendizagem.",
      status: "Concluído",
      startDate: "Março 2023",
      team: ["Dra. Maria Santos", "Dr. João Silva"],
      technologies: ["Python", "TensorFlow", "Pandas", "Jupyter"],
      image: "/placeholder.svg?height=200&width=400",
      progress: 100,
    },
    {
      id: 3,
      title: "Portal de Pesquisa Colaborativa",
      description:
        "Plataforma para facilitar a colaboração entre pesquisadores, compartilhamento de recursos e gestão de projetos de pesquisa.",
      status: "Planejamento",
      startDate: "Abril 2024",
      team: ["Prof. Carlos Oliveira", "Ana Costa"],
      technologies: ["Next.js", "Supabase", "TypeScript"],
      image: "/placeholder.svg?height=200&width=400",
      progress: 25,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-500"
      case "Em Desenvolvimento":
        return "bg-blue-500"
      case "Planejamento":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projetos Desenvolvidos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os projetos que estamos desenvolvendo para inovar e melhorar os processos educacionais e de
            pesquisa.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
                    </div>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Início: {project.startDate}</span>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Equipe:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member) => (
                          <Badge key={member} variant="outline">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Tecnologias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progresso</span>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Ver Detalhes</Button>
                      {project.status === "Concluído" && (
                        <Button>
                          Acessar Sistema
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
