import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type UserCardProps = {
  id: number
  username: string
  image: string
  activity?: string
  time?: string
  online?: boolean
  follow?: boolean
  inPost?: boolean
  onlyImage?: boolean
}
export const UserCard: React.FC<UserCardProps> = ({
  id,
  username,
  image,
  activity,
  time,
  online,
  follow,
  inPost,
  onlyImage = false
}) => {
  return (
    <div className="relative flex items-center justify-between">
      <Link href={`/profile/${id}`}>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>
              {username.split(' ')[0][0].toUpperCase() +
                username.split(' ')[1][0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!onlyImage && (
            <>
              {inPost ? (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{username}</span>
                  {activity && <span className="text-[10px]">{activity}</span>}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{username}</span>
                  {activity && <span className="text-[10px]">{activity}</span>}
                </div>
              )}
            </>
          )}
        </div>
      </Link>
      {time && (
        <div>
          <span>{time}</span>
        </div>
      )}
      {follow && (
        <Button className="h-6 w-16 rounded-xl bg-blue-600 text-xs hover:bg-blue-900">
          Seguir
        </Button>
      )}
      {online && (
        <div className="absolute left-6 top-0 h-2 w-2 rounded-full bg-green-500"></div>
      )}
    </div>
  )
}
