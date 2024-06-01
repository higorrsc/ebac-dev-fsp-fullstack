'use server'

import { cookies } from 'next/headers'

export async function handleLogin(
  userId: string,
  userName: string,
  accessToken: string,
  refreshToken: string
) {
  cookies().set('session_user_id', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })
  cookies().set('session_user_name', userName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })
  cookies().set('session_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/'
  })
  cookies().set('session_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/'
  })
}

export async function resetAuthCookies() {
  cookies().set('session_user_id', '')
  cookies().set('session_user_name', '')
  cookies().set('session_access_token', '')
  cookies().set('session_refresh_token', '')
}

export async function getUserId() {
  const userId = cookies().get('session_user_id')?.value
  return userId ? userId : null
}

export async function getUserName() {
  const userName = cookies().get('session_user_name')?.value
  return userName ? userName : null
}
