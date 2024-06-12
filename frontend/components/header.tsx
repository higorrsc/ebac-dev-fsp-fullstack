'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative flex h-16 w-full items-center justify-items-start pr-2">
      <div
        id="search"
        className="flex w-full items-center gap-2 rounded-xl border-2 border-solid border-slate-500 p-2 md:w-1/2"
      >
        <Search />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="border-none bg-transparent"
        />
      </div>
    </header>
  )
}
