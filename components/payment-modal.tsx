"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Lock, Calendar, User } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  currency: string
}

export function PaymentModal({ isOpen, onClose, amount, currency }: PaymentModalProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    installments: "1",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular processamento de pagamento
    alert("Pagamento processado com sucesso!")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Pagamento Seguro
          </DialogTitle>
          <DialogDescription>
            Valor: {currency} {amount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="pl-10"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cardName">Nome no Cartão</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="cardName"
                placeholder="Nome como está no cartão"
                className="pl-10"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Validade</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="expiryDate"
                  placeholder="MM/AA"
                  className="pl-10"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cvv"
                  placeholder="123"
                  className="pl-10"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Parcelamento</Label>
            <Select
              value={paymentData.installments}
              onValueChange={(value) => setPaymentData({ ...paymentData, installments: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">À vista</SelectItem>
                <SelectItem value="2">2x sem juros</SelectItem>
                <SelectItem value="3">3x sem juros</SelectItem>
                <SelectItem value="6">6x com juros</SelectItem>
                <SelectItem value="12">12x com juros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center text-sm text-slate-600 mb-2">
              <Lock className="h-4 w-4 mr-2" />
              Pagamento 100% seguro
            </div>
            <p className="text-xs text-slate-500">Seus dados são protegidos por criptografia SSL de 256 bits</p>
          </div>

          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
            Finalizar Pagamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
