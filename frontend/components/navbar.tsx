'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { ToggleTheme } from '@/components/toggle-theme'
import logo from '@/images/logo-h.png'
import defaultUser from '@/images/profile/default-user.png'
import { getUserId, resetAuthCookies } from '@/lib/actions'

export default function Navbar() {
    const router = useRouter()
    const { setTheme } = useTheme()
    const [state, setState] = useState(false)

    const menus = [
        { title: 'Feed', path: '/' },
        { title: 'Sobre', path: '/about' },
        { title: 'Contact Us', path: '/contactus' }
    ]

    const [userId, setUserId] = useState<string | null>('')
    useEffect(() => {
        ;(async () => {
            const gUserId = await getUserId()
            setUserId(gUserId)
        })()
    })

    const submitLogout = async () => {
        await resetAuthCookies()
        router.push('/')
    }

    return (
        <nav className="w-full border-b md:border-0">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Image src={logo} width={50} height={50} alt={'logo'} />
                    <div className="md:hidden">
                        <button
                            className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                        state ? 'block' : 'hidden'
                    }`}
                >
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menus.map((item, idx) => (
                                <NavigationMenuItem key={idx}>
                                    <Link
                                        href={item.path}
                                        key={idx + 100}
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            {item.title}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Usuário
                                </NavigationMenuTrigger>
                                {userId ? (
                                    <NavigationMenuContent>
                                        <Link href="/profile">
                                            <NavigationMenuLink
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                Perfil
                                            </NavigationMenuLink>
                                        </Link>
                                        <Link href="/" onClick={submitLogout}>
                                            <NavigationMenuLink
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                Logout
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuContent>
                                ) : (
                                    <NavigationMenuContent>
                                        <Link href="/login">
                                            <NavigationMenuLink
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                Login
                                            </NavigationMenuLink>
                                        </Link>

                                        <Link href="/signup">
                                            <NavigationMenuLink
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                Cadastro
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuContent>
                                )}
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="hidden  lg:flex">
                    <div>
                        <Link href={userId ? '/profile' : '/login'}>
                            <Image
                                src={defaultUser}
                                className="w-10 h-10 mr-3"
                                alt="Usuário"
                            />
                        </Link>
                    </div>
                    <ToggleTheme />
                </div>
            </div>
        </nav>
    )
}
