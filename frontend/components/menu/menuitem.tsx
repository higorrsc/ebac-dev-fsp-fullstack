import { LucideIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type MenuItemProps = {
  icon: LucideIcon
  label: string
  href?: string | null
  onClick?: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  href,
  onClick
}) => {
  const router = useRouter()

  const handleClick = React.useCallback(() => {
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
        <p className="hidden md:block">{label}</p>
      </div>
    </div>
  )
}
