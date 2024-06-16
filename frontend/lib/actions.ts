'use server'

import { cookies } from 'next/headers'
import { jwtDecode, JwtPayload } from 'jwt-decode'

import apiService from '@/app/services/apiService'

interface ExtendedJwtPayload extends JwtPayload {
  user_id: string
}

export async function handleLogin(accessToken: string, refreshToken: string) {
  cookies().set('session_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/'
  })
  cookies().set('session_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })
}

export async function resetAuthCookies() {
  cookies().delete('session_access_token')
  cookies().delete('session_refresh_token')
}

export async function getUserId() {
  const token = cookies().get('session_access_token')?.value
  if (!token) return null

  const payload = jwtDecode<ExtendedJwtPayload>(token)
  const userId = Number(payload.user_id)
  return userId ? userId : null
}

export async function revalidateAccessToken() {
  const token = cookies().get('session_access_token')?.value
  if (!token) return null

  const payload = jwtDecode<ExtendedJwtPayload>(token)
  const currentTimestamp = Math.floor(Date.now() / 1000) // Current time in Unix time
  const tokenExpiration = payload.exp

  if (currentTimestamp >= tokenExpiration) {
    const data = {
      refresh: cookies().get('session_refresh_token')?.value
    }
    if (!data) return null

    const response = await apiService.post('/token/refresh/', data)
    const errors = response.errors

    if (errors) return errors

    if (response.access && response.refresh) {
      handleLogin(response.access, response.refresh)
    }
  }

  return
}

export async function getAccessToken() {
  let accessToken = cookies().get('session_access_token')?.value

  return accessToken
}
