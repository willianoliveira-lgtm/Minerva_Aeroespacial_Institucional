import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, FolderOpen, Settings, FileText, Phone, BookOpen } from "lucide-react"
import Link from "next/link"

export function QuickLinks() {
  const links = [
    {
      title: "Nossa Equipe",
      description: "Conheça os pesquisadores e colaboradores",
      href: "/equipe",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Projetos",
      description: "Explore nossos projetos de pesquisa",
      href: "/projetos",
      icon: FolderOpen,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Sistemas",
      description: "Ferramentas e sistemas desenvolvidos",
      href: "/sistemas",
      icon: Settings,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Publicações",
      description: "Artigos, notícias e publicações",
      href: "/publicacoes",
      icon: FileText,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Contato",
      description: "Entre em contato conosco",
      href: "/contato",
      icon: Phone,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Biblioteca",
      description: "Recursos e materiais de estudo",
      href: "/biblioteca",
      icon: BookOpen,
      color: "bg-indigo-50 text-indigo-600",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{"Acesso Rápido"}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {"Navegue pelas principais seções do nosso instituto e descubra nosso trabalho"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <Card key={link.href} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-4`}>
                  <link.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={link.href}>
                  <Button variant="ghost" className="w-full justify-between">
                    {"Acessar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
