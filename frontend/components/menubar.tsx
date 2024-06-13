'use client'

import React from 'react'
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  LogOutIcon,
  StickyNoteIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import logo from '@/images/logo-h.png'
import { MenuItem } from '@/components/menuitem'

export default function MenuBar() {
  const router = useRouter()
  const menuItems = [
    {
      icon: HomeIcon,
      label: 'Página inicial',
      href: '/',
      onClick: () => {}
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
      href: '/profile/1',
      onClick: () => {}
    },
    {
      icon: LogOutIcon,
      label: 'Sair',
      href: null,
      onClick: () => {}
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
