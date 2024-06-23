import React, { useEffect, useState } from 'react'

import apiService from '@/app/services/apiService'
import { UserCard } from '@/components/usercard'
import defaultUser from '@/images/profile/default-user.png'
import { Comment as CommentType, User } from '@/lib/types'

type CommentProps = {
  comment: CommentType
}
export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.get(`/users/${comment.owner}/`)
      const errors = response.errors
      if (errors) return

      const data: User = response
      if (data) {
        const updatedData: User = {
          ...data,
          profile_data: {
            ...data.profile_data,
            profile_image:
              data.profile_data?.profile_image &&
              `${process.env.NEXT_PUBLIC_URL}${data.profile_data.profile_image}`
          }
        }
        setUserProfile(updatedData)
      }
    }
    fetchData()
  }, [comment])

  return (
    <div key={comment.id} className="mx-0 my-8 flex justify-between gap-4">
      <div className="flex max-w-xl flex-1 flex-col items-start gap-1">
        <UserCard
          id={userProfile?.id}
          image={userProfile?.profile_data?.profile_image}
          username={userProfile?.first_name + ' ' + userProfile?.last_name}
        />
        <p className="pl-10 text-sm">{comment.comment}</p>
      </div>
      <div className="self-center text-xs text-gray-500">
        <span>{comment.comment_date?.toString()}</span>
      </div>
    </div>
  )
}

export default Comment
