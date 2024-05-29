'use server'

import Image from 'next/image'

import defaultUser from '@/images/profile/default-user.png'
import apiService from '@/app/services/apiService'
import { getUserId } from '@/lib/actions'

export default async function Profile() {
  const userName = await getUserId()
  const userData = await apiService.get(`/profiles/${userName}/`)

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="z-10 w-full max-w-5xl items-center text-sm lg:flex overflow-hidden">
        <Image
          src={userData.profile_image ? userData.profile_image : defaultUser}
          width={100}
          height={10}
          alt="imagem usuário"
          className="w-24 h-24 rounded-full overflow-clip"
        />
        <div className="ml-10">
          <h1 className="text-3xl font-bold">
            {userData.first_name} {userData.last_name}
          </h1>
        </div>
      </div>
      <div>
        <p>{userData.gender}</p>
        <p>{userData.dob}</p>
        <p>{userData.phone}</p>
        <p>{userData.works_at}</p>
        <p>{userData.lives_in}</p>
        <p>{userData.studies_at}</p>
      </div>
    </main>
  )
}
