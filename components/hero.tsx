import { Button } from "@/components/ui/button"
import { ArrowRight, RocketIcon, Building, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="font-semibold text-white">
            <div className="flex items-center space-x-2 mb-6">
              <RocketIcon className="h-8 w-8 text-white" />
              <span className="font-semibold text-white">{"Avante!!!"}</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {"Equipe de"}
              <span className="text-blue-300 block">{"Pesquisa Universitária"}</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {
                "Desenvolvemos soluções tecnológicas inovadoras através de pesquisa aplicada, conectando academia e indústria para transformar conhecimento em impacto social."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/admin/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  {"Área Administrativa"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-300 text-blue-300 hover:bg-blue-800 bg-transparent"
                >
                  {"Entre em Contato"}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-700">
              <div className="text-center">
                <Users className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                <p className="text-sm text-blue-200">{"Equipe Especializada"}</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                <p className="text-sm text-blue-200">{"Pesquisa Aplicada"}</p>
              </div>
              <div className="text-center">
                <Building className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                <p className="text-sm text-blue-200">{"Parcerias Estratégicas"}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-lg transform rotate-6 opacity-45"></div>
            <img
              src="/placeholder.svg?height=500&width=600&text=Instituto+de+Pesquisa"
              alt="Instituto de Pesquisa"
              className="relative rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
