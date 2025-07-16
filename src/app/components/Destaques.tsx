export default function Destaques() {
  return (
      <section className="bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Destaques</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">Implantação de DevOps no TJRO</h3>
              <p>Responsável pela integração de pipelines CI/CD e disseminação da cultura DevOps no Tribunal de Justiça de Rondônia.</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">Experiência como Professor Universitário</h3>
              <p>Atuação em cursos de Engenharia, Administração e Contábeis, lecionando disciplinas como Estatística, Métodos Numéricos e Processamento de Sinais.</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">Orientação de Trabalhos de Conclusão</h3>
              <p>Participação e orientação em bancas de TCC em cursos de Engenharia, com foco em temas como eficiência energética e segurança cibernética.</p>
            </div>
          </div>
        </div>
      </section>
  )
}
