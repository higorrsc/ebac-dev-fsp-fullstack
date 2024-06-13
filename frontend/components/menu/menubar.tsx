'use client'

import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  LogOutIcon,
  StickyNoteIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { MenuItem } from '@/components/menu/menuitem'
import logo from '@/images/logo-h.png'
import { getUserId, resetAuthCookies } from '@/lib/actions'

export default function MenuBar() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [route, setRoute] = useState<string>('/login')

  useEffect(() => {
    ;(async () => {
      const gUserId = await getUserId()
      setUserId(gUserId)
      setRoute(`/profile/${gUserId}`)
    })()
  }, [userId])

  const handleLogout = async () => {
    await resetAuthCookies()
    setUserId(null)
    router.push('/login')
  }

  const menuItems = [
    {
      icon: HomeIcon,
      label: 'Página inicial',
      href: '/',
      onClick: () => router.push('/')
    },
    {
      icon: BellIcon,
      label: 'Notificações',
      href: '#',
      onClick: () => {}
    },
    {
      icon: UserIcon,
      label: 'Perfil',
      href: '#',
      onClick: () => router.push(route)
    },
    {
      icon: LogOutIcon,
      label: 'Sair',
      href: null,
      onClick: handleLogout
    },
    {
      icon: StickyNoteIcon,
      label: 'Postar',
      href: '#',
      onClick: () => router.push('/')
    }
  ]
  return (
    <aside className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <div
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-4 transition"
            onClick={() => router.push('/')}
          >
            <Image src={logo} alt="logo" width={56} height={56} />
          </div>
          {menuItems.map((item, idx) => (
            <MenuItem
              key={idx}
              icon={item.icon}
              label={item.label}
              href={item.href}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
