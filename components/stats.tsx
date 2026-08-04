export function Stats() {
  const stats = [
    { number: "15+", label: "Anos de Experiência" },
    { number: "2.5M+", label: "Componentes Fornecidos" },
    { number: "150+", label: "Clientes Ativos" },
    { number: "25", label: "Países Atendidos" },
  ]

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
