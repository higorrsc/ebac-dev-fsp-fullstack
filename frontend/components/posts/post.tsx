'use client'

import Image from 'next/image'
import { Ellipsis, Heart, MessageSquareMore } from 'lucide-react'
import { useEffect, useState } from 'react'

import apiService from '@/app/services/apiService'
import { PostComments } from '@/components/posts/postcomment'
import { UserCard } from '@/components/user/usercard'
import defaultUser from '@/images/profile/default-user.png'
import { Post as PostType, User } from '@/lib/types'

type PostProps = {
  post: PostType
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false)
  const [commentsQty, setCommentsQty] = useState(0)
  const [upVotesQty, setUpVotesQty] = useState(0)
  const [userProfile, setUserProfile] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.get(`/users/${post.owner}/`)
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
    const countVotesAndComments = () => {
      if (post.votes) {
        setUpVotesQty(post.votes.filter((vote) => vote.up_vote_by).length)
      }
      if (post.comments) {
        setCommentsQty(post.comments.length)
      }
    }
    fetchData()
    countVotesAndComments()
  }, [post])

  return (
    <div className="rounded-2xl border-2 shadow-xl">
      <div className="p-4">
        {/* user */}
        <div className="flex items-center justify-between">
          <UserCard
            key={post.id}
            id={post.owner}
            image={userProfile?.profile_data?.profile_image}
            username={userProfile?.first_name + ' ' + userProfile?.last_name}
            inPost
            activity={post.post_date.toString()}
          />
          <Ellipsis />
        </div>
        {/* content */}
        <div className="my-4">
          <p>{post.content}</p>
          {post.post_image && (
            <Image
              src={post.post_image}
              alt={post.content}
              width={800}
              height={800}
              className="mt-4 object-cover"
            />
          )}
          <p className="text-center">{post.category}</p>
        </div>
        {/* info */}
        <div className="flex items-center gap-5">
          <div className="flex cursor-pointer items-center gap-2 text-xs">
            {upVotesQty > 0 ? <Heart fill="red" /> : <Heart />}{' '}
            {upVotesQty || ''}
          </div>
          <div
            className="flex cursor-pointer items-center gap-2 text-xs"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <MessageSquareMore /> {commentsQty || ''}
          </div>
        </div>
        {/* comments */}
        {commentOpen && (
          <div className="w-full">
            <PostComments comments={post.comments} />
          </div>
        )}
      </div>
    </div>
  )
}
