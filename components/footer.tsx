import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{"IPU"}</span>
              </div>
              <span className="font-bold text-xl">{"Instituto de Pesquisa"}</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {
                "Desenvolvemos soluções tecnológicas inovadoras através de pesquisa aplicada, conectando academia e indústria para transformar conhecimento em impacto social."
              }
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{"Links Rápidos"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/equipe" className="text-gray-300 hover:text-white transition-colors">
                  {"Equipe"}
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="text-gray-300 hover:text-white transition-colors">
                  {"Projetos"}
                </Link>
              </li>
              <li>
                <Link href="/sistemas" className="text-gray-300 hover:text-white transition-colors">
                  {"Sistemas"}
                </Link>
              </li>
              <li>
                <Link href="/publicacoes" className="text-gray-300 hover:text-white transition-colors">
                  {"Publicações"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{"Contato"}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">{"contato@instituto.edu.br"}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">{"(11) 1234-5678"}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <span className="text-gray-300">
                  {"Rua da Universidade, 123"}
                  <br />
                  {"São Paulo, SP - 01234-567"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">{"© 2024 Instituto de Pesquisa Universitária. Todos os direitos reservados."}</p>
        </div>
      </div>
    </footer>
  )
}
