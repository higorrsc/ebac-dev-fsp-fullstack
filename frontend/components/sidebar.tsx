'use client'

import Image from 'next/image'
import React from 'react'

import defaultUser from '@/images/profile/default-user.png'
import { Button } from '@/components/ui/button'

export default function sidebar() {
  return (
    <div className="flex flex-col gap-2 p-4 text-xs sticky top-14 h-[calc(100vh-56px)] overflow-auto no-scrollbar">
      <div id="suggestions" className="bg-gray-300 rounded-xl p-2 shadow-md">
        <span>Sugestões para você</span>
        <div id="user" className="flex items-center justify-between">
          <div id="info" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-black">Nome do usuário</span>
          </div>
          <Button className="rounded-xl h-6 w-20 bg-blue-600 hover:bg-blue-900">
            Seguir
          </Button>
        </div>
        <div id="user" className="flex items-center justify-between">
          <div id="info" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-black">Nome do usuário</span>
          </div>
          <Button className="rounded-xl h-6 w-20 bg-blue-600 hover:bg-blue-900">
            Seguir
          </Button>
        </div>
        <div id="user" className="flex items-center justify-between">
          <div id="info" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-black">Nome do usuário</span>
          </div>
          <Button className="rounded-xl h-6 w-20 bg-blue-600 hover:bg-blue-900">
            Seguir
          </Button>
        </div>
        <div id="user" className="flex items-center justify-between">
          <div id="info" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-black">Nome do usuário</span>
          </div>
          <Button className="rounded-xl h-6 w-20 bg-blue-600 hover:bg-blue-900">
            Seguir
          </Button>
        </div>
      </div>
      <div id="activities" className="bg-gray-300 rounded-xl p-2 shadow-md">
        <span>Últimas atividades</span>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
        <div id="user" className="flex items-center justify-between">
          <div id="info" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium  text-black">Nome do usuário</span>
          </div>
          <span>1 min</span>
        </div>
      </div>
      <div id="online" className="bg-gray-300 rounded-xl p-2 shadow-md">
        <span>Amigos online</span>
        <div id="user2" className="flex items-center justify-between">
          <div id="info2" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-black">Nome do usuário</span>
          </div>
        </div>
        <div id="user" className="flex items-center justify-between">
          <div id="info" className="flex items-center gap-2">
            <Image
              src="http://localhost:8000/media/profile_images/higorrsc_t6KOT03.jpg" //{defaultUser}
              alt="usuário padrão"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-black">Nome do usuário</span>
          </div>
        </div>
      </div>
    </div>
  )
}
