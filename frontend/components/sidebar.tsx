'use client'

import React from 'react'

import InfoBlock from '@/components/infoblock'
import { UserCard } from '@/components/usercard'
import defaultUser from '@/images/profile/default-user.png'

export default function SideBar() {
  return (
    <div className="hidden px-6 py-6 md:block">
      <InfoBlock title="Quem seguir">
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          follow
        />
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome de outro usuário"
          follow
        />
      </InfoBlock>
    </div>
  )
}
