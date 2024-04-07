import LogoutButton from '@/components/logout-button'
import { getUserId } from '@/app/lib/actions'

const Home = async () => {
    const userId = await getUserId()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {userId && <LogoutButton />}
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </main>
    )
}

export default Home
