"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CotacaoPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar automaticamente para a página de aprovação
    router.push("/restrito/cotacao/aprovacao")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Redirecionando...</p>
      </div>
    </div>
  )
}
