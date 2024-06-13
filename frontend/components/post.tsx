import Image, { StaticImageData } from 'next/image'
import React, { useState } from 'react'
import { Ellipsis, Heart, MessageSquareMore, Share2 } from 'lucide-react'

import Comments from '@/components/comment'
import { UserCard } from '@/components/usercard'
import defaultUser from '@/images/profile/default-user.png'

type PostProps = {
  id: number
  userId: number
  username: string
  image?: StaticImageData | string
  content: string
  date: string
  category: string
}
export const Post: React.FC<PostProps> = ({
  id,
  userId,
  username,
  image,
  content,
  date,
  category
}) => {
  // const [liked, setLiked] = useState(true)

  // useEffect(() => {
  //   setLiked(false)
  // }, [id])

  const [commentOpen, setCommentOpen] = useState(false)

  const liked = true

  return (
    <div className="rounded-2xl border-2 shadow-xl">
      <div className="p-4">
        {/* user */}
        <div className="flex items-center justify-between">
          <UserCard
            id={userId}
            image={defaultUser}
            alt="imagem do usuário"
            username={username}
            inPost
            activity={date}
          />
          <Ellipsis />
        </div>
        {/* content */}
        <div className="my-4">
          <p>{content}</p>
          {image && (
            <Image
              src={image}
              alt={content}
              width={800}
              height={800}
              className="mt-4 object-cover"
            />
          )}
          <p className="text-center">{category}</p>
        </div>
        {/* info */}
        <div className="flex items-center gap-5">
          <div className="flex cursor-pointer items-center gap-2 text-xs">
            {liked ? <Heart fill="red" /> : <Heart />} 12
          </div>
          <div
            className="flex cursor-pointer items-center gap-2 text-xs"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <MessageSquareMore /> 12
          </div>
          <div className="flex cursor-pointer items-center gap-2 text-xs">
            <Share2 />
          </div>
        </div>
        {/* comments */}
        {commentOpen && (
          <div className="w-full">
            {' '}
            <Comments />{' '}
          </div>
        )}
      </div>
    </div>
  )
}
