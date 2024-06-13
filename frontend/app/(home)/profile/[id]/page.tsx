'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, MoreVerticalIcon } from 'lucide-react'

import defaultProfilePicture from '@/images/profile/default-user.png'
import { Button } from '@/components/ui/button'
import PostBar from '@/components/posts/postbar'
import apiService from '@/app/services/apiService'
import ModalMessage from '@/components/modalmessage'
import Header from '@/components/header'

type ProfileData = {
  id: number
  owner: string
  first_name: string
  last_name: string
  gender: string
  dob: string
  phone: string
  works_at: string
  lives_in: string
  studies_at: string
  profile_image: string
}
type UserData = {
  id: number
  username: string
  email: string
  is_active: boolean
  profile_data: ProfileData
}

export default function Profile({ params }: { params: { id: string } }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState('')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string>('')

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await apiService.get(`/users/${params.id}/`)
      const errors = response.errors
      setUserData(response)
      setModalDescription('')
      setProfileImageUrl(
        `${process.env.NEXT_PUBLIC_URL}${response.profile_data.profile_image}`
      )
      setFullName(
        response.profile_data.first_name + ' ' + response.profile_data.last_name
      )

      if (errors) {
        setModalDescription(errors.join(', '))
      }
    }
    fetchProfileData()
  }, [params.id])

  return (
    <div>
      {isOpen && (
        <ModalMessage
          title="Erro"
          description={modalDescription}
          icon="critical"
          onClose={handleCloseModal}
        />
      )}
      <Header label={fullName} showBackArrow />
      {/* images */}
      <div className="relative h-48 w-full">
        <Image
          id="cover"
          src="https://picsum.photos/1920/1080"
          alt={'fundo aleatório'}
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <Image
          id="profile"
          src={profileImageUrl || defaultProfilePicture}
          alt={`Foto de ${userData?.profile_data?.first_name}`}
          width={100}
          height={100}
          className="absolute left-5 top-[115px] h-40 w-40 rounded-full object-cover"
        />
      </div>
      {/* user data */}
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-300 shadow-md dark:bg-gray-900">
          {/* left side */}
          <div className="flex flex-1 gap-4">
            <a href={`mailto:${userData?.email}`}>
              <Mail />
            </a>
          </div>
          {/* center */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <span className="text-2xl">{fullName}</span>
            <div className="flex w-full items-center justify-center text-xs">
              <MapPin />
              <span>{userData?.profile_data?.lives_in}</span>
            </div>
            <Button className="cursor-pointer rounded-xl border-none bg-blue-600 px-4 py-2 text-xs hover:bg-blue-900">
              Seguir
            </Button>
          </div>
          {/* right side */}
          <div className="flex flex-1 items-center justify-end gap-4">
            <MoreVerticalIcon />
          </div>
        </div>
        {/* posts */}
        <PostBar />
      </div>
    </div>
  )
}
