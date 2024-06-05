'use client'

import Image from 'next/image'
import React from 'react'

import defaultUser from '@/images/profile/default-user.png'
import { UserCard } from '@/components/usercard'

export default function sidebar() {
  return (
    <div className="no-scrollbar sticky top-14 flex h-[calc(100vh-56px)] flex-col gap-2 overflow-auto p-4 text-xs">
      <div
        id="suggestions"
        className="gap-2 rounded-xl bg-gray-300 p-2 shadow-md dark:bg-gray-700"
      >
        <p className="pb-2">Sugestões para você</p>
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          follow
        />
      </div>
      <div
        id="activities"
        className="rounded-xl bg-gray-300 p-2 shadow-md dark:bg-gray-700"
      >
        <p className="pb-2">Últimas atividades</p>
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
      </div>
      <div
        id="online"
        className="rounded-xl bg-gray-300 p-2 shadow-md dark:bg-gray-700"
      >
        <p className="pb-2">Amigos online</p>
        <UserCard
          id={1}
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          online
        />
      </div>
    </div>
  )
}
