"use client"

import { useState } from 'react'

export default function FormContato() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [statusMessage, setStatusMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatusMessage('Enviando...')
        
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            
            if (!res.ok) {
                throw new Error('Falha ao enviar mensagem')
            }
            
            setIsSuccess(true)
            setStatusMessage('Mensagem enviada com sucesso!')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            setIsSuccess(false)
            setStatusMessage('Erro ao enviar. Tente novamente.')
            console.error('Erro ao enviar formulário:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Fale Comigo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nome completo" 
                    className="w-full p-2 border rounded" 
                />
                <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    className="w-full p-2 border rounded" 
                />
                <input 
                    required 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Assunto" 
                    className="w-full p-2 border rounded" 
                />
                <textarea 
                    required 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mensagem" 
                    className="w-full p-2 border rounded h-32" 
                />
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-blue-500' : 'bg-blue-700'} text-white py-2 px-4 rounded`}
                >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            {statusMessage && (
                <p className={`mt-2 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {statusMessage}
                </p>
            )}
        </section>
    )
}
