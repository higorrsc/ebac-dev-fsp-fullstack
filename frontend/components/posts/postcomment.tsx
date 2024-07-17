import React, { useEffect, useState } from 'react'

import apiService from '@/app/services/apiService'
import { Comment } from '@/components/comment'
import { UserCard } from '@/components/user/usercard'
import { Button } from '@/components/ui/button'
import defaultUser from '@/images/profile/default-user.png'
import { getUserId } from '@/lib/actions'
import { Comment as CommentType, User } from '@/lib/types'
import { ACCESS_TOKEN_NAME } from '@/constants'

type PostCommentProps = {
  comments?: CommentType[]
}

export const PostComments: React.FC<PostCommentProps> = ({ comments }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserId(ACCESS_TOKEN_NAME)
      if (userProfile) {
        const response = await apiService.get(`/users/${userProfile}/`)
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
    }
    fetchData()
  }, [])

  return (
    <div className="w-full">
      {/* new comment */}
      {userProfile && (
        <div className="mt-4 flex items-center justify-between gap-2">
          <UserCard
            id={userProfile?.id}
            image={userProfile?.profile_data?.profile_image}
            username={userProfile?.first_name + ' ' + userProfile?.last_name}
            onlyImage
          />
          <input
            type="text"
            placeholder="Escreva um comentário..."
            className="ml-2 w-full rounded border border-solid bg-transparent px-2 text-sm"
          />
          <Button className="h-10 w-20 rounded bg-blue-600 text-xs hover:bg-blue-900">
            Comentar
          </Button>
        </div>
      )}
      {/* all comments */}
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  )
}
