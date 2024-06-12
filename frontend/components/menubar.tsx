import React from 'react'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

import defaultUserImage from '@/images/profile/default-user.png'
import iconCalendar from '@/images/icons/calendar.png'
import iconCourses from '@/images/icons/courses.png'
import iconFriends from '@/images/icons/friends.png'
import iconFundraiser from '@/images/icons/fundraiser.png'
import iconGallery from '@/images/icons/gallery.png'
import iconGames from '@/images/icons/games.png'
import iconGroups from '@/images/icons/groups.png'
import iconMarketplace from '@/images/icons/marketplace.png'
import iconMemories from '@/images/icons/memories.png'
import iconMessages from '@/images/icons/messages.png'
import iconTutorials from '@/images/icons/tutorials.png'
import iconVideos from '@/images/icons/videos.png'
import iconWatch from '@/images/icons/watch.png'
import { MenuItem } from '@/components/menuitem'

export default function MenuBar() {
  const menuItems = [
    {
      group: '',
      items: [
        {
          image: iconFriends,
          title: 'Amigos',
          href: '#',
          alt: 'ícone de amigos'
        },
        {
          image: iconGroups,
          title: 'Grupos',
          href: '#',
          alt: 'ícone de grupos'
        },
        {
          image: iconMarketplace,
          title: 'Marketplace',
          href: '#',
          alt: 'ícone de marketplace'
        },
        {
          image: iconWatch,
          title: 'Assista',
          href: '#',
          alt: 'ícone de está aleatório'
        },
        {
          image: iconMemories,
          title: 'Memórias',
          href: '#',
          alt: 'ícone de memórias'
        }
      ]
    },
    {
      group: 'Atalhos',
      items: [
        {
          image: iconCalendar,
          title: 'Calendário',
          href: '#',
          alt: 'ícone de calendário'
        },
        { image: iconGames, title: 'Jogos', href: '#', alt: 'ícone de jogos' },
        {
          image: iconGallery,
          title: 'Galeria',
          href: '#',
          alt: 'ícone de galeria'
        },
        {
          image: iconVideos,
          title: 'Vídeos',
          href: '#',
          alt: 'ícone de vídeos'
        },
        {
          image: iconMessages,
          title: 'Mensagens',
          href: '#',
          alt: 'ícone de mensagens'
        }
      ]
    },
    {
      group: 'Outros',
      items: [
        {
          image: iconFundraiser,
          title: 'Fundos',
          href: '#',
          alt: 'ícone de levantamento de fundos'
        },
        {
          image: iconTutorials,
          title: 'Tutoriais',
          href: '#',
          alt: 'ícone de tutoriais'
        },
        {
          image: iconCourses,
          title: 'Cursos',
          href: '#',
          alt: 'ícone de cursos'
        }
      ]
    }
  ]
  return (
    <aside className="relative ml-2 flex h-full w-48 flex-col items-start justify-around gap-2">
      <Link href="/">
        <h1 className="hidden text-xl font-bold text-slate-700 dark:text-slate-300 sm:flex">
          Social H
        </h1>
        <HomeIcon className="text-center lg:hidden" size={32} />
      </Link>
      {menuItems.map((group) => (
        <div key={group.group} className="flex w-full flex-col gap-2">
          <hr className="mx-0 my-2 h-[0.5px] w-8 border-none bg-slate-500 sm:w-full" />
          <span className="hidden text-xs font-semibold sm:flex">
            {group.group}
          </span>
          {group.items.map((item) => (
            <MenuItem
              key={item.title}
              icon={item.image}
              alt={item.alt}
              title={item.title}
              href={item.href}
            />
          ))}
        </div>
      ))}

      <MenuItem
        alt="imagem do usuário"
        icon={defaultUserImage}
        title="Usuário logado"
        href="#"
      />
    </aside>
  )
}
