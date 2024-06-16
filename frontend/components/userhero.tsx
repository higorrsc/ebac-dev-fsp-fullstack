import Image, { StaticImageData } from 'next/image'
import React from 'react'

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
        // {userData?.profile_data?.profile_image || defaultProfilePicture}
        alt={profileImageAlt}
        // {`Foto de ${userData?.profile_data?.first_name}`}
        width={100}
        height={100}
        className="absolute left-5 top-[115px] h-40 w-40 rounded-full object-cover"
      />
    </div>
  )
}
