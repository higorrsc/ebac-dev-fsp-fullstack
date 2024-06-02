import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

type MenuItemProps = {
  icon: StaticImageData
  alt: string
  title: string
  href: string
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  alt,
  title,
  href
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 font-medium cursor-pointer"
    >
      <Image
        src={Icon.src}
        alt={alt}
        className="rounded-full object-cover"
        width={32}
        height={32}
      />
      <span>{title}</span>
    </Link>
  )
}
