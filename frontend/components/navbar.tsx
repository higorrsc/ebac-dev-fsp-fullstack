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
    <nav className="sticky top-0 flex h-14 items-center justify-between border-b-2 border-b-slate-500 bg-background/95 px-2 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div id="left" className="flex items-center gap-8">
        <Link href="/">
          <span className="text-xl font-bold text-slate-700 dark:text-slate-300">
            Social H
          </span>
        </Link>
        <Home />
        <ToggleTheme />
        <LayoutGrid />
        <div
          id="search"
          className="flex items-center gap-2 rounded-xl border-2 border-solid border-slate-500 p-2"
        >
          <Search />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-80 border-none bg-transparent md:w-40"
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
