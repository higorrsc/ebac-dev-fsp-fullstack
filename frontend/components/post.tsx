import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'
import { Ellipsis, Heart, MessageSquareMore, Share2 } from 'lucide-react'

import { UserCard } from './usercard'
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
  const liked = true

  return (
    <div className="rounded-xl border-2 p-4 shadow-xl">
      <div id="user" className="flex items-center justify-between">
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
      <div id="content" className="my-4 flex flex-col items-center">
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
        <p>{category}</p>
      </div>
      <div id="info" className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-xs">
          {liked ? <Heart fill="red" /> : <Heart />} 12 likes
        </div>
        <div className="flex items-center gap-2 text-xs">
          <MessageSquareMore /> 12 comentários
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Share2 /> Compartilhar
        </div>
      </div>
    </div>
  )
}
