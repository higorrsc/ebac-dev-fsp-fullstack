import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/button'

type UserCardProps = {
  image: StaticImageData
  alt: string
  username: string
  follow?: boolean
  activity?: string
  time?: string
  online?: boolean
  inPost?: boolean
}
export const UserCard: React.FC<UserCardProps> = ({
  image: src,
  alt,
  username,
  follow,
  activity,
  time,
  online,
  inPost
}) => {
  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        {inPost ? (
          <>
            <div>
              <span className="font-medium">{username}</span>
              <br />
              {activity && <span className="text-[10px]">{activity}</span>}
            </div>
          </>
        ) : (
          <>
            <span className="font-medium">{username}</span>
            {activity && <span className="text-[10px]">{activity}</span>}
          </>
        )}
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
