'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Home, LayoutGrid, Bell, Mail, User, Search } from 'lucide-react'

import { ToggleTheme } from '@/components/toggle-theme'
import { UserCard } from '@/components/usercard'
import defaultUserImage from '@/images/profile/default-user.png'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b-2 border-b-slate-500 bg-background/95 px-2 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* left side */}
      <div className="flex items-center gap-4">
        <span className="hidden text-xl font-bold text-slate-700 dark:text-slate-300 md:flex">
          Social H
        </span>
        <Link href="/">
          <Home />
        </Link>
        <ToggleTheme />
        <LayoutGrid />
        <div
          id="search"
          className="flex items-center md:gap-2 md:rounded-xl md:border-2 md:border-solid md:border-slate-500 md:p-2"
        >
          <Search />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="hidden border-none bg-transparent md:flex md:w-80"
          />
        </div>
      </div>
      {/* right side */}
      <div className="flex items-center gap-4">
        <User />
        <Mail />
        <Bell />
      </div>
    </nav>
  )
}
