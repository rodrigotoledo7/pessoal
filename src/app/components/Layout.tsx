import { ReactNode } from 'react'
import Link from 'next/link'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-900 text-white p-4">
        <nav className="max-w-5xl mx-auto flex justify-between">
          <span className="font-bold text-xl">Prof. Rodrigo Tolêdo</span>
          <ul className="flex gap-4">
            <li><Link href="/" className="hover:underline">Início</Link></li>
            <li><Link href="/materiais" className="hover:underline">Materiais</Link></li>
            <li><Link href="/contato" className="hover:underline">Contato</Link></li>
            <li><Link href="/sobre" className="hover:underline">Sobre</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow pb-16">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white text-center text-sm text-gray-600 py-4 border-t">© {new Date().getFullYear()} Rodrigo Tolêdo</footer>
    </div>
  )
}