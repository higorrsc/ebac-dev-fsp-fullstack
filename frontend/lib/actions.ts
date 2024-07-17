'use server'

import { cookies } from 'next/headers'
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface ExtendedJwtPayload extends JwtPayload {
  user_id: string
}

export async function getToken(name: string) {
  const token = cookies().get(name)?.value
  return token
}

export async function setToken(name: string, value: string, maxAge: number) {
  return cookies().set({
    name,
    value,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge
  })
}

export async function deleteToken(name: string) {
  return cookies().delete(name)
}

export async function isValidToken(name: string) {
  const token = cookies().get(name)?.value
  if (!token) return false

  try {
    const payload = jwtDecode<ExtendedJwtPayload>(token)
    const tokenExpiration = payload.exp

    if (!tokenExpiration) return false

    const currentTimestamp = Math.floor(Date.now() / 1000)
    return currentTimestamp < tokenExpiration
  } catch (error) {
    return false
  }
}

export async function getUserId(tokenName: string) {
  const token = cookies().get(tokenName)?.value
  if (!token) return null

  const payload = jwtDecode<ExtendedJwtPayload>(token)
  const userId = Number(payload.user_id)
  return userId ? userId : null
}
