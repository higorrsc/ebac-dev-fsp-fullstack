'use client'

import { useEffect, useState } from 'react'

import apiService from '@/app/services/apiService'
import InfoBlock from '@/components/infoblock'
import { UserCard } from '@/components/usercard'
import defaultUser from '@/images/profile/default-user.png'
import { getUserId } from '@/lib/actions'
import { User } from '@/lib/types'

export default function SideBar() {
  const [usersProfile, setUsersProfile] = useState<User[] | null>(null)
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setUserId(await getUserId())
      if (userId) {
        const response = await apiService.getWithAuth(
          `/friendship/find_friends/`
        )
        const errors = response.errors
        if (errors) {
          return
        }
        const data = response
        const updatedData = data.map(
          (user: { profile_data: { profile_image?: string } }) => ({
            ...user,
            profile_data: {
              ...user.profile_data,
              profile_image:
                user.profile_data?.profile_image &&
                `${process.env.NEXT_PUBLIC_URL}${user.profile_data.profile_image}`
            }
          })
        )
        updatedData.sort(
          (
            a: { profile_data: { first_name: { toLowerCase: () => number } } },
            b: { profile_data: { first_name: { toLowerCase: () => number } } }
          ) =>
            a.profile_data?.first_name?.toLowerCase() <
            b.profile_data?.first_name?.toLowerCase()
              ? -1
              : a.profile_data?.first_name?.toLowerCase() >
                  b.profile_data?.first_name?.toLowerCase()
                ? 1
                : 0
        )
        setUsersProfile(updatedData)
      }
    }
    fetchData()
  }, [userId])

  return (
    <div className="hidden px-6 py-6 md:block">
      {usersProfile?.length ? (
        <InfoBlock title="Quem seguir">
          {usersProfile?.map((user) =>
            user.profile_data ? (
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
            ) : null
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
