'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/components/ui/use-toast'
import apiService from '@/app/services/apiService'
import { getUserId, handleLogin } from '@/lib/actions'

const loginSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'O nome de usuário deve ser preenchido'
  }),
  password: z.string().min(1, { message: 'A senha deve ser preenchida' })
})

type FormData = z.infer<typeof loginSchema>

export default function LoginAccount() {
  const { toast } = useToast()
  const router = useRouter()

  const [userId, setUserId] = useState<string | null>('')
  useEffect(() => {
    ;(async () => {
      const gUserId = await getUserId()
      setUserId(gUserId)
    })()
  })

  useEffect(() => {
    if (userId) {
      router.push('/')
    }
  })

  const toastError = (description: string) => {
    toast({
      variant: 'destructive',
      description: description,
      title: 'Erro'
    })
  }

  const submitLogin = async (data: FormData) => {
    const response = await apiService.post('/token/', data)
    const errors = response.errors

    if (errors) {
      toastError(errors.join(', '))
      return
    }

    if (response.access && response.refresh) {
      handleLogin(
        response.user_id,
        response.username,
        response.access,
        response.refresh
      )
      router.push('/')
    } else {
      toastError('Nome de usuário ou senha inválido(a)')
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema)
  })

  return (
    <div className="container m-auto">
      <div className="h-screen flex items-center justify-center">
        <div
          id="card"
          className="w-full min-h-[600px] grid grid-cols-1 md:grid-cols-2  bg-slate-300 rounded-2xl"
        >
          <div
            id="left"
            className='bg-[linear-gradient(to_right_bottom,rgba(255,255,255,0.8),rgba(133,133,133,0.8)),url("https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png")] bg-cover bg-center p-12 flex flex-col gap-8 text-black'
          >
            <h1 className="text-6xl font-bold">Social H</h1>
            <p className="text-sm">
              Estamos felizes em apresentar a você uma nova rede social que está
              sendo desenvolvida com o objetivo de conectar pessoas com
              interesses em comum, compartilhar experiências, promover debates e
              compartilhar conhecimento.
            </p>
            <p className="text-xs">O que você pode esperar da Social H?</p>
            <ul className="list-disc list-inside text-xs">
              <li>Um ambiente acolhedor e inclusivo</li>
              <li>Ferramentas para facilitar a conexão</li>
              <li>Conteúdos de qualidade</li>
              <li>Oportunidade para se expressar</li>
              <li>Um espaço para fazer a diferença</li>
            </ul>

            <span className="text-xs">Não tem uma conta?</span>
            <Link
              href="/signup"
              className="w-[50%] text-center border-2 bg-white border-black rounded-2xl p-2 text-sm"
            >
              Criar conta
            </Link>
          </div>
          <div
            id="right"
            className="p-12 flex justify-center flex-col text-black"
          >
            <h1 className="text-2xl font-bold text-gray-700 pb-10">Login</h1>
            <form
              id="login"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(submitLogin)}
            >
              <input
                type="text"
                id="username"
                placeholder="Nome de usuário"
                className="border-b-2 outline-none bg-transparent p-2"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username?.message}</p>
              )}
              <input
                type="password"
                id="password"
                placeholder="Senha"
                className="border-b-2 outline-none bg-transparent p-2"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password?.message}</p>
              )}
              <button
                className="w-[50%] text-center border-2 bg-white border-black rounded-2xl p-2 text-sm"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
