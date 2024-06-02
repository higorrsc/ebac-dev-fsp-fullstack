'use client'

import Image from 'next/image'
import React from 'react'

import defaultUser from '@/images/profile/default-user.png'
import { UserCard } from '@/components/usercard'

export default function sidebar() {
  return (
    <div className="flex flex-col gap-2 p-4 text-xs sticky top-14 h-[calc(100vh-56px)] overflow-auto no-scrollbar">
      <div id="suggestions" className="bg-gray-300 rounded-xl p-2 shadow-md">
        <span>Sugestões para você</span>
        <UserCard
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          follow
        />
      </div>
      <div id="activities" className="bg-gray-300 rounded-xl p-2 shadow-md">
        <span>Últimas atividades</span>
        <UserCard
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          time="1 min"
        />
      </div>
      <div id="online" className="bg-gray-300 rounded-xl p-2 shadow-md">
        <span>Amigos online</span>
        <UserCard
          image={defaultUser}
          alt="imagem do usuário"
          username="Nome do usuário"
          online
        />
      </div>
    </div>
  )
}
