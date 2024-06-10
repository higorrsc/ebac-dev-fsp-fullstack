'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MoreVerticalIcon,
  Twitter,
  Youtube
} from 'lucide-react'

import defaultProfilePicture from '@/images/profile/default-user.png'
import { Button } from '@/components/ui/button'
import PostBar from '@/components/postbar'

export interface UserData {
  id: number
  username: string
  is_active: boolean
  profile_data: ProfileData | null
}

export interface ProfileData {
  id: number
  owner: string
  first_name: string
  last_name: string
  gender: string
  dob: Date
  phone: string
  works_at: string
  lives_in: string
  studies_at: string
  profile_image: string
}

export default function Profile() {
  return (
    <div>
      {/* images */}
      <div className="relative h-72 w-full pt-4">
        <Image
          id="cover"
          src="https://picsum.photos/1920/1080"
          alt="fundo aleatório"
          width={1920}
          height={1080}
          className="h-full w-full rounded-3xl object-cover"
        />
        <Image
          id="profile"
          src={defaultProfilePicture}
          alt="Nome do usuário"
          width={200}
          height={200}
          className="absolute left-0 right-0 top-52 m-auto h-40 w-40 rounded-full object-cover"
        />
      </div>
      {/* user data */}
      <div className="p-4">
        <div className="mb-4 flex h-60 items-center justify-between rounded-2xl bg-gray-300 px-12 shadow-md dark:bg-gray-700">
          {/* left side */}
          <div className="flex flex-1 gap-4">
            <Link href="#">
              <Facebook />
            </Link>
            <Link href="#">
              <Instagram />
            </Link>
            <Link href="#">
              <Twitter />
            </Link>
            <Link href="#">
              <Linkedin />
            </Link>
            <Link href="#">
              <Youtube />
            </Link>
          </div>
          {/* center */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <span className="text-3xl">John Doe</span>
            <div className="flex w-full items-center justify-center text-xs">
              <MapPin />
              <span>Cidade do Usuário</span>
            </div>
            <Button className="cursor-pointer rounded-xl border-none bg-blue-600 px-4 py-2 text-xs hover:bg-blue-900">
              Seguir
            </Button>
          </div>
          {/* right side */}
          <div className="flex flex-1 items-center justify-end gap-4">
            <Mail />
            <MoreVerticalIcon />
          </div>
        </div>
        {/* posts */}
        <PostBar />
      </div>
    </div>
  )
}
