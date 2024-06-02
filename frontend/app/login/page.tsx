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
      <div className="flex h-screen items-center justify-center">
        <div
          id="card"
          className="grid min-h-[600px] w-full grid-cols-1 overflow-hidden rounded-2xl bg-slate-300 md:grid-cols-2"
        >
          <div
            id="left"
            className='flex flex-col gap-8 bg-[linear-gradient(to_right_bottom,rgba(255,255,255,0.8),rgba(133,133,133,0.8)),url("https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png")] bg-cover bg-center p-12 text-black'
          >
            <h1 className="text-6xl font-bold">Social H</h1>
            <h2 className="text-3xl font-bold">Bem vindo de volta!</h2>
            <p className="text-sm">
              Estamos felizes em tê-lo de volta à nossa comunidade. Entre em sua
              conta para continuar conectado com seus amigos, familiares e
              interesses.
            </p>
            <p className="text-xs">Faça login para:</p>
            <ul className="list-inside list-disc text-xs">
              <li>Compartilhar seus pensamentos e ideias.</li>
              <li>Acompanhar as últimas notícias e tendências.</li>
              <li>Conectar-se com amigos e familiares.</li>
              <li>Descobrir novos conteúdos e inspirações.</li>
              <li>Participar de grupos e comunidades.</li>
              <li>Fazer a diferença no mundo.</li>
            </ul>
            <p className="text-xs">Ainda não tem uma conta?</p>
            <span className="text-xs">
              Cadastre-se agora mesmo e junte-se à nossa comunidade! É fácil e
              rápido.
            </span>
            <Link
              href="/signup"
              className="w-[50%] rounded-2xl border-2 border-black bg-white p-2 text-center text-sm"
            >
              Criar conta
            </Link>
          </div>
          <div
            id="right"
            className="flex flex-col justify-center p-12 text-black"
          >
            <h1 className="pb-10 text-2xl font-bold text-gray-700">Login</h1>
            <form
              id="login"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(submitLogin)}
            >
              <input
                type="text"
                id="username"
                placeholder="Nome de usuário"
                className="border-b-2 bg-transparent p-2 outline-none"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username?.message}
                </p>
              )}
              <input
                type="password"
                id="password"
                placeholder="Senha"
                className="border-b-2 bg-transparent p-2 outline-none"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
              <button
                className="w-[50%] rounded-2xl border-2 border-black bg-white p-2 text-center text-sm"
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
