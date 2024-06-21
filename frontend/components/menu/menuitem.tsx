import { LucideIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

type MenuItemProps = {
  icon: LucideIcon
  label: string
  notification?: number
  href?: string | null
  onClick?: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  href,
  notification,
  onClick
}) => {
  const [hasNotification, setHasNotification] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (notification && notification > 0) {
      setHasNotification(true)
    }
  }, [notification])

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick()
    }

    if (href) {
      router.push(href)
    }
  }, [router, href, onClick])

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative flex cursor-pointer items-center justify-center gap-4 rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10">
        <Icon size={28} />
        {hasNotification && (
          <div className="absolute left-8 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
            {notification}
          </div>
        )}
        <p className="hidden md:block">{label}</p>
      </div>
    </div>
  )
}
