'use client'

import { useEffect, useState } from 'react'
import {
  BellIcon,
  FeatherIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
  UserPlusIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { MenuItem } from '@/components/menu/menuitem'
import logo from '@/images/logo-h.png'
import { getUserId, resetAuthCookies } from '@/lib/actions'
import apiService from '@/app/services/apiService'

export default function MenuBar() {
  const router = useRouter()
  const [userId, setUserId] = useState<number | null>(null)
  const [route, setRoute] = useState<string>('/login')
  const [notification, setNotification] = useState<number>(0)

  useEffect(() => {
    const fetchNotification = async () => {
      setUserId(await getUserId())
      if (!userId) return

      const response = await apiService.getWithAuth(
        '/friendship/incoming_requests'
      )

      const data = response
      if (data) setNotification(data.length)
    }
    const fetchUserId = async () => {
      setUserId(await getUserId())
      if (!userId) {
        setRoute('/login')
      } else {
        setRoute(`/profile/${userId}`)
      }
    }
    fetchNotification()
    fetchUserId()
  }, [userId])

  const handleLogout = async () => {
    await resetAuthCookies()
    setUserId(null)
    router.push('/login')
  }

  const handlePost = () => {
    if (userId) {
      router.push('/')
    } else {
      router.push('/login')
    }
  }

  const menuItems = [
    {
      icon: HomeIcon,
      label: 'Página inicial',
      href: '/'
    },
    {
      icon: BellIcon,
      label: 'Notificações',
      href: '#',
      notification: notification
    },
    {
      icon: UserIcon,
      label: 'Perfil',
      href: route
    },
    {
      icon: LogOutIcon,
      label: 'Sair',
      onClick: handleLogout
    },
    {
      icon: FeatherIcon,
      label: 'Postar',
      onClick: handlePost
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
          {userId ? (
            menuItems.map((item, idx) => (
              <MenuItem
                key={idx}
                icon={item.icon}
                label={item.label}
                href={item.href}
                notification={item.notification}
                onClick={item.onClick}
              />
            ))
          ) : (
            <>
              <MenuItem icon={LogInIcon} label="Fazer login" href="/login" />
              <MenuItem
                icon={UserPlusIcon}
                label="Criar conta"
                href="/signup"
              />
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
