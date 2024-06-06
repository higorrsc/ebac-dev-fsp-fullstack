'use client'

import React from 'react'

import defaultUser from '@/images/profile/default-user.png'
import { UserCard } from '@/components/usercard'
import InfoBlock from '@/components/infoblock'

export default function sidebar() {
  return (
    <div className="no-scrollbar sticky top-14 flex h-[calc(100vh-56px)] flex-col gap-2 overflow-auto p-4 text-xs">
      <InfoBlock title="Sugestões para você">
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          follow
        />
      </InfoBlock>
      <InfoBlock title="Últimas atividades">
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          time="1 min"
          activity="Compartilhou uma publicação"
        />
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          activity="Compartilhou uma publicação"
          inPost
        />
      </InfoBlock>
      <InfoBlock title="Amigos online">
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          online
        />
      </InfoBlock>
    </div>
  )
}
