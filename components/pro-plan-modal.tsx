"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Star, Zap, Shield, Headphones, Globe } from "lucide-react"
import { PaymentModal } from "./payment-modal"

interface ProPlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProPlanModal({ isOpen, onClose }: ProPlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual")
  const [showPayment, setShowPayment] = useState(false)

  const plans = {
    monthly: {
      price: 299,
      period: "mês",
      savings: null,
    },
    annual: {
      price: 2990,
      period: "ano",
      savings: "Economize 17%",
    },
  }

  const benefits = [
    {
      icon: Zap,
      title: "Cotações Ilimitadas",
      description: "Solicite quantas cotações precisar sem limitações",
    },
    {
      icon: Shield,
      title: "Fornecedores Premium",
      description: "Acesso exclusivo a fornecedores certificados AS9100",
    },
    {
      icon: Globe,
      title: "Logística Global",
      description: "Entrega em qualquer lugar do mundo com rastreamento",
    },
    {
      icon: Headphones,
      title: "Suporte Prioritário",
      description: "Atendimento 24/7 com engenheiros especializados",
    },
    {
      icon: Star,
      title: "Relatórios Avançados",
      description: "Analytics detalhados e relatórios personalizados",
    },
    {
      icon: CheckCircle,
      title: "API Integrada",
      description: "Integre com seus sistemas ERP e de gestão",
    },
  ]

  const handleUpgrade = () => {
    setShowPayment(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Upgrade para o Plano PRO</DialogTitle>
            <DialogDescription className="text-center">
              Desbloqueie todo o potencial da plataforma Minerva Aerospace
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={selectedPlan}
            onValueChange={(value) => setSelectedPlan(value as "monthly" | "annual")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="annual" className="relative">
                Anual
                {plans.annual.savings && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs">{plans.annual.savings}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="text-center py-6">
              <div className="text-4xl font-bold text-slate-900 mb-2">
                USD ${plans.monthly.price}
                <span className="text-lg font-normal text-slate-600">/{plans.monthly.period}</span>
              </div>
              <p className="text-slate-600 mb-6">Faturamento mensal</p>
            </TabsContent>

            <TabsContent value="annual" className="text-center py-6">
              <div className="text-4xl font-bold text-slate-900 mb-2">
                USD ${plans.annual.price}
                <span className="text-lg font-normal text-slate-600">/{plans.annual.period}</span>
              </div>
              <p className="text-slate-600 mb-2">Faturamento anual</p>
              <Badge className="bg-green-100 text-green-800">{plans.annual.savings} - Apenas USD $249/mês</Badge>
            </TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{benefit.title}</h4>
                  <p className="text-xs text-slate-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-slate-900">Garantia de 30 dias</span>
            </div>
            <p className="text-sm text-slate-600 text-center">
              Teste sem riscos. Se não ficar satisfeito, devolvemos 100% do valor.
            </p>
          </div>

          <Button
            onClick={handleUpgrade}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Fazer Upgrade Agora
          </Button>

          <p className="text-xs text-slate-500 text-center mt-4">
            Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
          </p>
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={plans[selectedPlan].price}
        currency="USD"
      />
    </>
  )
}
