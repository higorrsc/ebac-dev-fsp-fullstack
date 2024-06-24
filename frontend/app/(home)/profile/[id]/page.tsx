'use client'

import { useEffect, useState } from 'react'
import { Mail, MapPin, MoreVerticalIcon } from 'lucide-react'
import { format } from 'date-fns'

import apiService from '@/app/services/apiService'
import Header from '@/components/header'
import ModalMessage from '@/components/modalmessage'
import PostBar from '@/components/posts/postbar'
import { Button } from '@/components/ui/button'
import UserHero from '@/components/user/userhero'
import defaultProfilePicture from '@/images/profile/default-user.png'
import { getUserId } from '@/lib/actions'
import { User } from '@/lib/types'
import UserProfile from '@/components/user/userprofile'

export default function Profile({ params }: { params: { id: number } }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState('')
  const [userData, setUserData] = useState<User | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleMyProfile = () => {
    setIsProfileOpen(false)
  }

  const handleFollow = async () => {}

  useEffect(() => {
    const fetchProfileData = async () => {
      setUserId(await getUserId())
      const response = await apiService.get(`/users/${params.id}/`)
      const errors = response.errors
      setModalDescription('')

      if (errors) {
        setModalDescription(errors.join(', '))
      } else {
        setIsMyProfile(params.id == userId)
        const data: User = response
        const updatedData: User = {
          ...data,
          profile_data: {
            ...data.profile_data,
            profile_image:
              data.profile_data?.profile_image &&
              `${process.env.NEXT_PUBLIC_URL}${data.profile_data.profile_image}`
          }
        }
        setUserData(updatedData)
      }
    }
    fetchProfileData()
  }, [params.id, userId])

  return (
    <>
      {isModalOpen && (
        <ModalMessage
          title="Erro"
          description={modalDescription}
          icon="critical"
          onClose={handleCloseModal}
        />
      )}
      {isProfileOpen && <UserProfile onClose={handleMyProfile} />}
      <Header
        label={`${userData?.first_name} ${userData?.last_name}`}
        showBackArrow
      />
      {/* images */}
      <UserHero
        userProfileImage={
          userData?.profile_data?.profile_image || defaultProfilePicture
        }
        profileImageAlt={`Foto de ${userData?.first_name}`}
        loginUserProfile={params.id == userId}
      />
      {/* user data */}
      <div className="mb-4 flex flex-col items-start bg-gray-300 py-4 shadow-md dark:bg-gray-900">
        <div className="grid w-full grid-cols-3">
          <div className="col-span-2 flex flex-col px-4 pt-20">
            <span className="text-2xl">{`${userData?.first_name} ${userData?.last_name}`}</span>
            <span className="text-sm">{userData?.username}</span>
            <span className="text-sm">
              {userData?.profile_data?.dob &&
                format(userData?.profile_data?.dob, 'dd/MM/yyyy')}
            </span>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-end gap-4 p-4">
              <a href={`mailto:${userData?.email}`}>
                <Mail />
              </a>
              {isMyProfile ? (
                <Button
                  className="cursor-pointer rounded-xl border-none bg-blue-600 text-xs hover:bg-blue-900"
                  onClick={() => setIsProfileOpen(true)}
                >
                  Editar
                </Button>
              ) : (
                <Button className="cursor-pointer rounded-xl border-none bg-blue-600 text-xs hover:bg-blue-900">
                  Seguir
                </Button>
              )}
              <MoreVerticalIcon />
            </div>
            <div className="flex w-full flex-col items-center justify-end p-4 text-xs">
              <div className="flex w-full items-center justify-end">
                {userData?.profile_data?.lives_in && (
                  <>
                    <MapPin />
                    <span>{userData?.profile_data?.lives_in}</span>
                  </>
                )}
              </div>
              <div className="flex w-full items-center justify-end">
                <span>{userData?.profile_data?.studies_at}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* posts */}
      <PostBar userId={params.id} />
    </>
  )
}
