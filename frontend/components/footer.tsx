'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { title: 'Condições para o uso', path: '#' },
    { title: 'Política de Privacidade', path: '#' },
    { title: 'Proteção de dados', path: '#' },
    { title: 'Acordo de Licença', path: '#' },
    { title: `©${currentYear}`, path: '#' }
  ]

  return (
    <footer className="w-full lg:border-t lg:border-border/40">
      <ul className="hidden justify-center text-sm lg:flex">
        {links.map((item, idx) => (
          <li key={idx} className="p-5 py-0">
            <Link href={item.path} legacyBehavior passHref>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
