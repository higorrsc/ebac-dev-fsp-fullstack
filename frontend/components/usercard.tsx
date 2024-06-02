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
    <div className="flex items-center justify-between relative ">
      <div className="flex items-center gap-2">
        <Image
          src={Icon}
          alt={alt}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="font-medium text-black">{username}</span>
        {activity && <span>{activity}</span>}
      </div>
      {time && (
        <div>
          <span>{time}</span>
        </div>
      )}
      {follow && (
        <Button className="rounded-xl h-6 w-16 text-xs bg-blue-600 hover:bg-blue-900">
          Seguir
        </Button>
      )}
      {online && (
        <div className="rounded-full h-2 w-2 top-0 left-6 bg-green-500 absolute"></div>
      )}
    </div>
  )
}
