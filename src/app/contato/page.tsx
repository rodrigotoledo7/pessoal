import { Metadata } from 'next'
import FormContato from '@/app/components/FormContato'

export const metadata: Metadata = {
    title: 'Contato - Prof. Rodrigo Tolêdo',
    description: 'Entre em contato com o Professor Rodrigo Tolêdo.',
}

export default function Contato() {
    return <FormContato />
}