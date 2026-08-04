import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, Github } from "lucide-react"

export default function EquipePage() {
  const team = [
    {
      name: "Dr. João Silva",
      role: "Coordenador Geral",
      description: "Doutor em Ciência da Computação com especialização em Sistemas Distribuídos",
      image: "/placeholder.svg?height=300&width=300",
      skills: ["Sistemas Distribuídos", "Arquitetura de Software", "Gestão de Projetos"],
      email: "joao.silva@instituto.edu.br",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Dra. Maria Santos",
      role: "Pesquisadora Sênior",
      description: "Doutora em Engenharia de Software com foco em Inteligência Artificial",
      image: "/placeholder.svg?height=300&width=300",
      skills: ["Inteligência Artificial", "Machine Learning", "Análise de Dados"],
      email: "maria.santos@instituto.edu.br",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Prof. Carlos Oliveira",
      role: "Desenvolvedor Full-Stack",
      description: "Especialista em desenvolvimento web e mobile com mais de 10 anos de experiência",
      image: "/placeholder.svg?height=300&width=300",
      skills: ["React", "Node.js", "Python", "Mobile Development"],
      email: "carlos.oliveira@instituto.edu.br",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Ana Costa",
      role: "Designer UX/UI",
      description: "Especialista em experiência do usuário e design de interfaces",
      image: "/placeholder.svg?height=300&width=300",
      skills: ["UX Design", "UI Design", "Prototipagem", "Pesquisa de Usuário"],
      email: "ana.costa@instituto.edu.br",
      linkedin: "#",
      github: "#",
    },
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nossa Equipe</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os profissionais dedicados que fazem parte do nosso instituto, cada um contribuindo com sua
            expertise para o desenvolvimento de soluções inovadoras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-blue-600 font-semibold">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">{member.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">Especialidades:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-600">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href={member.linkedin} className="text-gray-600 hover:text-blue-600">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.github} className="text-gray-600 hover:text-blue-600">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
