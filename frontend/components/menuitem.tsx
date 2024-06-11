import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

type MenuItemProps = {
  icon: StaticImageData
  alt: string
  title: string
  href: string
  onlyImage?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  alt,
  title,
  href,
  onlyImage = false
}) => {
  return (
    <Link
      href={href}
      className="flex cursor-pointer items-center gap-2 font-medium"
    >
      <Image
        src={Icon.src}
        alt={alt}
        className="rounded-full object-cover"
        width={32}
        height={32}
      />
      {!onlyImage && <span>{title}</span>}
    </Link>
  )
}
