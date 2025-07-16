import { Material } from '@/types'

export default function MaterialCard({ nome, descricao, arquivo }: Material) {
    return (
        <div className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{nome}</h3>
            <p className="text-sm text-gray-600">{descricao}</p>
            <a
                href={`/downloads/${arquivo}`}
                download
                className="inline-block mt-2 text-blue-700 hover:underline"
            >
                Baixar
            </a>
        </div>
    )
}