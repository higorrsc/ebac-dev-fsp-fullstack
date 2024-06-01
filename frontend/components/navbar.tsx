'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Home,
  Moon,
  Sun,
  LayoutGrid,
  Bell,
  Mail,
  User,
  Search
} from 'lucide-react'

import defaultUserImage from '@/images/profile/default-user.png'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-2 py-4 h-14 border-b-2 border-b-slate-500">
      <div id="left" className="flex items-center gap-8">
        <Link href="/">
          <span className="font-bold text-xl text-slate-300">Social H</span>
        </Link>
        <Home />
        <Moon />
        <Sun />
        <LayoutGrid />
        <div
          id="search"
          className="flex items-center gap-2 border-solid border-slate-500 border-2 rounded-xl p-2"
        >
          <Search />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="border-none w-80 md:w-40"
          />
        </div>
      </div>
      <div id="right" className="flex items-center gap-4">
        <User />
        <Mail />
        <Bell />
        <div id="user" className="flex items-center gap-2 font-medium">
          <Image
            src={defaultUserImage}
            alt="imagem do usuário"
            className="rounded-full object-cover"
            width={32}
            height={32}
          />
          <span>Usuário logado</span>
        </div>
      </div>
    </nav>
  )
}
