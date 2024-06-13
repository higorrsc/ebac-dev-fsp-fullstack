'use client'

import * as React from 'react'
import { Search, ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type HeaderProps = {
  label: string
  showBackArrow?: boolean
}

export default function Header({ label, showBackArrow }: HeaderProps) {
  const router = useRouter()

  const handleBack = React.useCallback(() => {
    router.back()
  }, [router])

  return (
    <header className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <ChevronLeftIcon
            onClick={handleBack}
            size={20}
            className="cursor-pointer transition hover:opacity-70"
          />
        )}
        <h1 className="text-xl font-semibold text-white">{label}</h1>
      </div>
      {/* <div
        id="search"
        className="flex w-full items-center gap-2 rounded-xl border-2 border-solid border-slate-500 p-2"
      >
        <Search />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="border-none bg-transparent"
        />
      </div> */}
    </header>
  )
}
