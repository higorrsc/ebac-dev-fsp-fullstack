'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Home, LayoutGrid, Bell, Mail, User, Search } from 'lucide-react'

import { ToggleTheme } from '@/components/toggle-theme'
import defaultUserImage from '@/images/profile/default-user.png'
import { UserCard } from './usercard'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-2 py-4 h-14 border-b-2 border-b-slate-500 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div id="left" className="flex items-center gap-8">
        <Link href="/">
          <span className="font-bold text-xl dark:text-slate-300 text-slate-700">
            Social H
          </span>
        </Link>
        <Home />
        <ToggleTheme />
        <LayoutGrid />
        <div
          id="search"
          className="flex items-center gap-2 border-solid border-slate-500 border-2 rounded-xl p-2"
        >
          <Search />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="border-none w-80 md:w-40 bg-transparent"
          />
        </div>
      </div>
      <div id="right" className="flex items-center gap-4">
        <User />
        <Mail />
        <Bell />
        <UserCard
          image={defaultUserImage}
          alt="imagem do usuário"
          username="Usuário logado"
        />
      </div>
    </nav>
  )
}
