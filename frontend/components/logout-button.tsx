'use client'

import { useRouter } from 'next/navigation'

import { resetAuthCookies } from '@/lib/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const LogoutButton = () => {
    const router = useRouter()

    const submitLogout = async () => {
        await resetAuthCookies()
        router.push('/')
    }

    return (
        <Button onClick={submitLogout}>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </Button>
    )
}

export default LogoutButton
