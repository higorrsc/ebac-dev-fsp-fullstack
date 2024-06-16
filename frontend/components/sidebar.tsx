'use client'

import { useEffect, useState } from 'react'

import apiService from '@/app/services/apiService'
import InfoBlock from '@/components/infoblock'
import ModalMessage from '@/components/modalmessage'
import { UserCard } from '@/components/usercard'
import defaultUser from '@/images/profile/default-user.png'
import { getUserId } from '@/lib/actions'
import { User } from '@/lib/types'

export default function SideBar() {
  const [userId, setUserId] = useState<number | null>(null)
  const [usersProfile, setUsersProfile] = useState<User[]>()
  const [modalDescription, setModalDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchUserId = async () => {
      setUserId(await getUserId())
    }
    fetchUserId()

    if (userId) {
      const fetchProfileData = async () => {
        const response = await apiService.getWithAuth(
          `/friendship/find_friends/`
        )
        const errors = response.errors

        if (errors) {
          setIsOpen(true)
          setModalDescription(errors.join(', '))
        } else {
          const data = response
          const updatedData = data.map(
            (user: { profile_data: { profile_image: any } }) => {
              if (user.profile_data?.profile_image) {
                return {
                  ...user,
                  profile_data: {
                    ...user.profile_data,
                    profile_image: `${process.env.NEXT_PUBLIC_URL}${user.profile_data.profile_image}`
                  }
                }
              }
              return user
            }
          )
          updatedData.sort(
            (
              a: {
                profile_data: { first_name: { toLowerCase: () => number } }
              },
              b: { profile_data: { first_name: { toLowerCase: () => number } } }
            ) => {
              if (
                a.profile_data?.first_name?.toLowerCase() <
                b.profile_data?.first_name?.toLowerCase()
              )
                return -1
              if (
                a.profile_data?.first_name?.toLowerCase() >
                b.profile_data?.first_name?.toLowerCase()
              )
                return 1
              return 0
            }
          )
          setUsersProfile(updatedData)
          setModalDescription('')
        }
      }
      fetchProfileData()
    }
  }, [userId])

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div className="hidden px-6 py-6 md:block">
      {isOpen && (
        <ModalMessage
          title="Erro"
          description={modalDescription}
          icon="critical"
          onClose={handleCloseModal}
        />
      )}
      {userId ? (
        <InfoBlock title="Quem seguir">
          {usersProfile?.map(
            (user) =>
              user.profile_data && (
                <UserCard
                  key={user.id}
                  id={user.id}
                  image={user?.profile_data?.profile_image || defaultUser}
                  alt="imagem do usuário"
                  username={
                    user?.profile_data?.first_name +
                      ' ' +
                      user?.profile_data?.last_name || user?.username
                  }
                  follow
                />
              )
          )}
        </InfoBlock>
      ) : (
        <InfoBlock title="Novo no Social H?">
          <div className="mt-4 flex flex-col items-center justify-center gap-6 text-xs md:text-sm">
            <span>
              Inscreva-se para ter sua própria timeline personalizada!
            </span>
          </div>
        </InfoBlock>
      )}
    </div>
  )
}
