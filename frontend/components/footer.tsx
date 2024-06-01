'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [state, setState] = useState(false)

  const links = [
    { title: 'Condições para o uso', path: '#' },
    { title: 'Política de Privacidade', path: '#' },
    { title: 'Proteção de dados', path: '#' },
    { title: 'Acordo de Licença', path: '#' },
    { title: '©2023', path: '' }
  ]
  return (
    <footer className="w-full lg:border-t lg:border-border/40">
      <ul className="hidden lg:flex justify-center text-sm">
        {links.map((item, idx) => (
          <li key={idx + 200} className="p-5 py-0">
            <Link href={item.path} key={idx + 200} legacyBehavior passHref>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
