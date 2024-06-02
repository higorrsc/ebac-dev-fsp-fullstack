import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/button'

type UserCardProps = {
  image: StaticImageData
  alt: string
  username: string
  follow?: boolean
  activity?: string | null
  time?: string | null
  online?: boolean
}
export const UserCard: React.FC<UserCardProps> = ({
  image: Icon,
  alt,
  username,
  follow,
  activity,
  time,
  online
}) => {
  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={Icon}
          alt={alt}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="font-medium">{username}</span>
        {activity && <span>{activity}</span>}
      </div>
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
