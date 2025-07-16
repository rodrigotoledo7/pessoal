export default function Destaques() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Destaques</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">Curso de Cálculo I</h3>
            <p>Curso completo com videoaulas, exercícios e material didático.</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">Publicação Científica</h3>
            <p>Artigo premiado em modelagem matemática aplicado à física.</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">Projeto de Extensão</h3>
            <p>Grupo de estudos aberto à comunidade para reforço escolar.</p>
          </div>
        </div>
      </div>
    </section>
  )
}