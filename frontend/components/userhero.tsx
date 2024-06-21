import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { SwitchCamera } from 'lucide-react'

type UserHeroProps = {
  userProfileImage: string | StaticImageData
  profileImageAlt: string
}
export default function UserHero({
  userProfileImage,
  profileImageAlt
}: UserHeroProps) {
  return (
    <div className="relative h-48 w-full">
      <Image
        id="cover"
        src="https://picsum.photos/1920/1080"
        alt={'fundo aleatório'}
        width={1920}
        height={1080}
        className="h-full w-full object-cover"
      />
      <Image
        id="profile"
        src={userProfileImage}
        alt={profileImageAlt}
        width={100}
        height={100}
        className="absolute left-5 top-[115px] h-40 w-40 rounded-full border-4 border-black object-cover"
      />
      <div className="absolute left-32 top-56 flex flex-row items-center">
        <div className="relative flex cursor-pointer items-center justify-center gap-4 rounded-full bg-slate-500 bg-opacity-30 p-4 hover:bg-slate-900 hover:bg-opacity-50">
          <SwitchCamera size={18} />
        </div>
      </div>
    </div>
  )
}
