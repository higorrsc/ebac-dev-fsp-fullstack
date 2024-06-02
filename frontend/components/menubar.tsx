import React from 'react'

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
  return (
    <div className="no-scrollbar sticky top-14 flex h-[calc(100vh-56px)] flex-col gap-2 overflow-auto p-4 text-xs">
      <MenuItem
        alt="imagem do usuário"
        icon={defaultUserImage}
        title="Usuário logado"
        href="#"
      />
      <MenuItem
        icon={iconFriends}
        alt="ícone de amigos"
        title="Amigos"
        href="#"
      />
      <MenuItem
        icon={iconGroups}
        alt="ícone de grupos"
        title="Grupos"
        href="#"
      />
      <MenuItem
        icon={iconMarketplace}
        alt="ícone de marketplace"
        title="Marketplace"
        href="#"
      />
      <MenuItem
        icon={iconWatch}
        alt="ícone de será aleatório"
        title="Assista"
        href="#"
      />
      <MenuItem
        icon={iconMemories}
        alt="ícone de memórias"
        title="Memórias"
        href="#"
      />

      <hr className="mx-0 my-2 h-[0.5px] border-none bg-slate-500" />
      <span className="text-xs font-semibold">Atalhos</span>

      <MenuItem
        icon={iconCalendar}
        alt="ícone de eventos"
        title="Eventos"
        href="#"
      />
      <MenuItem icon={iconGames} alt="ícone de jogos" title="Jogos" href="#" />
      <MenuItem
        icon={iconGallery}
        alt="ícone de galeria"
        title="Galeria"
        href="#"
      />
      <MenuItem
        icon={iconVideos}
        alt="ícone de videos"
        title="Vídeos"
        href="#"
      />
      <MenuItem
        icon={iconMessages}
        alt="ícone de mensagens"
        title="Mensagens"
        href="#"
      />

      <hr className="mx-0 my-2 h-[0.5px] border-none bg-slate-500" />
      <span className="text-xs font-semibold">Outros</span>

      <MenuItem
        icon={iconFundraiser}
        alt="ícone de levantamento de fundos"
        title="Fundos"
        href="#"
      />
      <MenuItem
        icon={iconTutorials}
        alt="ícone de tutoriais"
        title="Tutoriais"
        href="#"
      />
      <MenuItem
        icon={iconCourses}
        alt="ícone de cursos"
        title="Cursos"
        href="#"
      />
    </div>
  )
}
