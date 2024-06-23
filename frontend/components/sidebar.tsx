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
      if (!userId) return

      const response = await apiService.getWithAuth(`/friendship/find_friends/`)
      const errors = response.errors
      if (errors) return

      const data = response
      if (data) {
        const updatedData = data.map(
          (user: {
            profile_data: {
              profile_image?: string
            }
          }) => ({
            ...user,
            profile_data: {
              ...user.profile_data,
              profile_image:
                user.profile_data?.profile_image &&
                `${process.env.NEXT_PUBLIC_URL}${user.profile_data.profile_image}`
            }
          })
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
                image={user.profile_data?.profile_image}
                username={user.first_name + ' ' + user.last_name}
                follow
              />
            ) : null
          )}
        </InfoBlock>
      ) : !userId ? (
        <InfoBlock title="Novo no Social H?">
          <div className="mt-4 flex flex-col items-center justify-center gap-6 text-xs md:text-sm">
            <span>
              Inscreva-se para ter sua própria timeline personalizada!
            </span>
          </div>
        </InfoBlock>
      ) : (
        <InfoBlock title="Convide seus amigos">
          <div className="mt-4 flex flex-col items-center justify-center gap-6 text-xs md:text-sm">
            <span>Convide seus amigos a se juntarem a você na Social H</span>
          </div>
        </InfoBlock>
      )}
    </div>
  )
}
