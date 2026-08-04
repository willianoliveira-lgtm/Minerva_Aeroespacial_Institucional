# Minerva Aerospace - Sistema de Cotações e Aquisições

Sistema institucional completo para cotação e aquisição de componentes aeroespaciais, com área pública e área restrita para gestão interna.

## 🚀 Funcionalidades

### 🌐 Área Pública
- **Homepage Institucional**: Apresentação da empresa e serviços
- **Serviços**: Catálogo completo de soluções oferecidas
- **Sobre**: História e credenciais da empresa
- **Contato**: Formulário e informações de contato

### 🔒 Área Restrita (Intranet)
- **Sistema de Login**: Autenticação simulada (admin/aerospace123)
- **Módulo de Cotação**: Sistema completo de gestão de cotações
  - **Aprovação do Cotador**: Análise e aprovação de cotações recebidas
  - **Compra do Item**: Gestão de itens comprados baseados em cotações aprovadas
- **Gestão de Compras**: Acompanhamento de pedidos e entregas
- **Modais de Pagamento**: Interface moderna para processamento
- **Planos PRO**: Sistema de upgrade com benefícios

## 🎯 Módulo de Cotação - Funcionalidades Detalhadas

### 📋 Aprovação do Cotador (`/restrito/cotacao/aprovacao`)
- ✅ **Tabela Completa** com todas as colunas especificadas:
  - Produto | Qtd | Link | Valor Unit. | Tipo | Moeda | Frete | Total | Prazo | Desconto | Alfândega | Status | Data Aprov. | Fornecedor | Nº Interno
- ✅ **Filtros Avançados**: Data, Projeto, Status de aprovação, Fornecedor, Número interno
- ✅ **Destaques Visuais**: Verde (Aprovadas), Amarelo (Ressalva), Vermelho (Recusadas)
- ✅ **Modal de Aprovação**: Formulário completo com justificativa e observações
- ✅ **Tooltips Explicativos**: Informações contextuais para termos técnicos
- ✅ **Estatísticas**: Dashboard com contadores por status

### 🛒 Compra do Item (`/restrito/cotacao/compras`)
- ✅ **Lista de Itens Comprados**: Baseada em cotações aprovadas
- ✅ **Informações Completas**:
  - Fornecedor escolhido
  - Justificativa da escolha
  - Valor final pago
  - Nota fiscal (quando disponível)
- ✅ **Upload de Documentos**: Sistema para anexar comprovantes, notas e PDFs
- ✅ **Histórico de Negociação**: Timeline completa por item
- ✅ **Status de Compra**: Comprado, Aguardando NF, Cancelado

## 🛠 Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Biblioteca de componentes
- **Lucide React**: Ícones modernos

## 📱 Design Responsivo

- Layout adaptativo para desktop, tablet e mobile
- Tabelas responsivas com scroll horizontal
- Modais otimizados para dispositivos móveis
- Tooltips e feedback visual

## 🔐 Sistema de Autenticação

### Credenciais de Teste
- **Usuário**: admin
- **Senha**: aerospace123

### Rotas Protegidas
- `/restrito/cotacao/aprovacao` - Aprovação de cotações
- `/restrito/cotacao/compras` - Compra de itens
- `/restrito/compras` - Gestão geral de compras

## 💽 Estrutura de Dados (Planejada)

### Cotações
\`\`\`typescript
interface Quotation {
  id: number
  produto: string
  quantidade: number
  link: string
  valorUnitario: number
  tipo: string
  moeda: string
  frete: number
  total: number
  prazo: string
  desconto: number
  alfandega: number
  status: 'pendente' | 'aprovado' | 'reprovado' | 'ressalva'
  dataAprovacao?: string
  fornecedor: string
  numeroInterno: string
  projeto: string
  dataRecebimento: string
  observacoes: string
  condicoesPagamento: string
  validadeCotacao: string
  justificativa?: string
}
\`\`\`

### Compras
\`\`\`typescript
interface Purchase {
  id: number
  cotacaoId: number
  produto: string
  quantidade: number
  fornecedorEscolhido: string
  justificativa: string
  valorFinalPago: number
  moeda: string
  dataCompra: string
  numeroCompra: string
  notaFiscal?: string
  status: 'comprado' | 'aguardando_nf' | 'cancelado'
  projeto: string
  condicoesPagamento: string
  comprovantes: Array<{
    nome: string
    tipo: string
    data: string
  }>
  historicoNegociacao: Array<{
    data: string
    usuario: string
    acao: string
    observacao: string
  }>
  observacoes: string
}
\`\`\`

## 🎨 Características do Design

- **Tema Aeroespacial**: Cores azul escuro e slate
- **Componentes Modulares**: Cards, badges, tabelas reutilizáveis
- **Feedback Visual**: Status coloridos e animações
- **Tooltips**: Informações contextuais
- **Responsividade**: Adaptação completa para mobile
- **Upload de Arquivos**: Componente drag-and-drop

## 📁 Estrutura do Projeto

\`\`\`
app/
├── page.tsx                           # Homepage
├── layout.tsx                         # Layout principal
├── login/page.tsx                    # Login
└── restrito/
    ├── cotacao/
    │   ├── page.tsx                  # Redirecionamento
    │   ├── aprovacao/page.tsx        # Aprovação do Cotador
    │   └── compras/page.tsx          # Compra do Item
    └── compras/page.tsx              # Gestão geral de compras

components/
├── header.tsx                        # Cabeçalho com menu dinâmico
├── footer.tsx                        # Rodapé institucional
├── hero.tsx                          # Seção hero
├── services.tsx                      # Serviços
├── about.tsx                         # Sobre a empresa
├── stats.tsx                         # Estatísticas
├── payment-modal.tsx                 # Modal de pagamento
├── pro-plan-modal.tsx               # Modal plano PRO
└── file-upload.tsx                   # Componente de upload
\`\`\`

## 🚀 Como Executar

1. **Instalação**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Desenvolvimento**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Acesso**:
   - Site público: `http://localhost:3000`
   - Login: `http://localhost:3000/login`
   - Aprovação de Cotações: `http://localhost:3000/restrito/cotacao/aprovacao`
   - Compra de Itens: `http://localhost:3000/restrito/cotacao/compras`

## 🔧 Personalização

### Dados das Cotações
Edite o array `mockQuotations` em `/app/restrito/cotacao/aprovacao/page.tsx`

### Dados das Compras
Modifique o array `mockPurchases` em `/app/restrito/cotacao/compras/page.tsx`

### Informações da Empresa
Atualize os componentes `header.tsx` e `footer.tsx`

## 🧩 Componentes Prontos Incorporados

- ✅ **Upload de Arquivo**: Componente drag-and-drop com validação
- ✅ **Modal de Pagamento**: Interface moderna para cartão de crédito
- ✅ **Modal de Planos**: Sistema de assinatura mensal/anual
- ✅ **Menu da Conta**: Navegação vertical para painel administrativo
- ✅ **Sistema de Registro/Login**: Autenticação simulada

## 🌟 Próximos Passos

### Backend Integration
- [ ] API REST para cotações e compras
- [ ] Banco de dados PostgreSQL/MySQL
- [ ] Autenticação JWT real
- [ ] Upload de arquivos com storage

### Funcionalidades Avançadas
- [ ] Notificações em tempo real
- [ ] Integração com ERPs
- [ ] Relatórios avançados
- [ ] Dashboard analytics
- [ ] Sistema de workflow de aprovação

### Melhorias UX
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Notificações push
- [ ] Chat de suporte integrado

## 💡 Pontos de Integração Backend

O código está preparado para integração backend com comentários indicando:

- **Autenticação**: Pontos para implementar JWT e sessões
- **APIs**: Locais para chamadas REST
- **Upload**: Sistema de arquivos preparado para storage
- **Filtros**: Queries preparadas para banco de dados
- **Validações**: Estrutura para validação server-side

## 📞 Suporte

Para dúvidas ou suporte técnico:
- Email: contato@minerva-aerospace.com
- Telefone: +55 (12) 3456-7890

## 📄 Licença

Este projeto está sob a licença MIT.
