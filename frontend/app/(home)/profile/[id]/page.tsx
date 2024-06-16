'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Mail, MapPin, MoreVerticalIcon } from 'lucide-react'

import apiService from '@/app/services/apiService'
import { Button } from '@/components/ui/button'
import PostBar from '@/components/posts/postbar'
import ModalMessage from '@/components/modalmessage'
import Header from '@/components/header'
import defaultProfilePicture from '@/images/profile/default-user.png'
import { User } from '@/lib/types'

export default function Profile({ params }: { params: { id: string } }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState('')
  const [userData, setUserData] = useState<User | null>(null)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await apiService.get(`/users/${params.id}/`)
      const errors = response.errors
      setModalDescription('')

      if (errors) {
        setModalDescription(errors.join(', '))
      } else {
        const data: User = response
        if (data.profile_data) {
          const updatedData = {
            ...data,
            profile_data: {
              ...data.profile_data,
              profile_image: `${process.env.NEXT_PUBLIC_URL}${data.profile_data.profile_image}`
            }
          }
          setUserData(updatedData)
        }
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
      <Header
        label={`${userData?.profile_data?.first_name} ${userData?.profile_data?.last_name}`}
        showBackArrow
      />
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
          src={userData?.profile_data?.profile_image || defaultProfilePicture}
          alt={`Foto de ${userData?.profile_data?.first_name}`}
          width={100}
          height={100}
          className="absolute left-5 top-[115px] h-40 w-40 rounded-full object-cover"
        />
      </div>
      {/* user data */}
      <div className="mb-4 flex flex-col items-start bg-gray-300 py-4 shadow-md dark:bg-gray-900">
        <div className="grid w-full grid-cols-3">
          <div className="col-span-2 flex flex-col px-4 pt-20">
            <span className="text-2xl">{`${userData?.profile_data?.first_name} ${userData?.profile_data?.last_name}`}</span>
            <span className="text-sm">{userData?.username}</span>
            <span className="text-sm">{userData?.profile_data?.dob}</span>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-end gap-4 p-4">
              <a href={`mailto:${userData?.email}`}>
                <Mail />
              </a>
              <Button className="cursor-pointer rounded-xl border-none bg-blue-600 text-xs hover:bg-blue-900">
                Seguir
              </Button>
              <MoreVerticalIcon />
            </div>
            <div className="flex w-full flex-col items-center justify-end p-4 text-xs">
              <div className="flex w-full items-center justify-end">
                <MapPin />
                <span>{userData?.profile_data?.lives_in}</span>
              </div>
              <div className="flex w-full items-center justify-end">
                <span>{userData?.profile_data?.studies_at}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* posts */}
      <PostBar />
    </div>
  )
}
