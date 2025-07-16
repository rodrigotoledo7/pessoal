import materiais from '../../materiais.json'
import MaterialCard from './MaterialCard'

export default function ListaMateriais() {
    return (
        <section className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Materiais para Download</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {materiais.map((mat, idx) => (
                    <MaterialCard key={idx} {...mat} />
                ))}
            </div>
        </section>
    )
}