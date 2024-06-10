'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import apiService from '@/app/services/apiService'
import { getUserId } from '@/lib/actions'

const registerUserSchema = z
  .object({
    email: z.string().email({ message: 'O e-mail deve ser preenchido' }),
    username: z.string().trim().min(5, {
      message: 'O nome de usuário deve ter no mínimo 5 caracteres'
    }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword']
  })

type FormData = z.infer<typeof registerUserSchema>

export default function SignUp() {
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
      title: 'Erro',
      description: description,
      action: <ToastAction altText="Fechar">Fechar</ToastAction>
    })
  }

  const submitSignUp = async (data: FormData) => {
    const userData = {
      email: data.email,
      username: data.username,
      password: data.password
    }
    const res = await apiService.post('/users/', userData)
    const errors = res.errors

    if (errors) {
      toastError(errors.join(', '))
      return
    }

    if (res.id) {
      toast({
        title: 'Sucesso',
        description:
          'Conta criada com sucesso! Você pode fazer o login e completar seu perfil...',
        action: (
          <ToastAction
            altText="Ir para o login"
            onClick={() => router.push('/login')}
          >
            Ir para login
          </ToastAction>
        )
      })
    } else {
      if (!res.id && res.username) {
        toastError('Nome de usuário em uso')
      }
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(registerUserSchema)
  })

  return (
    <div className="container m-auto">
      <div className="flex h-screen items-center justify-center sm:my-4">
        <div
          id="card"
          className="grid min-h-[600px] w-full grid-cols-1 overflow-hidden rounded-2xl bg-slate-300 md:grid-cols-2"
        >
          <div
            id="left"
            className="flex flex-col justify-center p-12 text-black"
          >
            <h1 className="pb-10 text-2xl font-bold text-gray-700">
              Registre-se
            </h1>
            <form
              id="signup"
              onSubmit={handleSubmit(submitSignUp)}
              className="flex flex-col gap-4 text-xs md:text-sm"
            >
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                className="w-full border-b-2 bg-transparent p-2 outline-none"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
              <input
                type="text"
                id="username"
                placeholder="Nome de usuário"
                className="w-full border-b-2 bg-transparent p-2 outline-none"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username?.message}</p>
              )}
              <div className="grid grid-cols-2">
                <div className="block">
                  <input
                    type="password"
                    id="password"
                    placeholder="Senha"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password?.message}</p>
                  )}
                </div>
                <div className="block">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmar a senha"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                className="w-full rounded-2xl border-2 border-black bg-white p-2 text-center md:w-[25%]"
                type="submit"
              >
                Registrar
              </button>
            </form>
          </div>
          <div
            id="right"
            className='flex flex-col gap-8 bg-[linear-gradient(to_right_bottom,rgba(255,255,255,0.8),rgba(133,133,133,0.8)),url("https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png")] bg-cover bg-center p-12 text-xs text-black md:text-sm'
          >
            <h1 className="text-2xl font-bold">Social H</h1>
            <p className="text-xs md:text-sm">
              Estamos felizes em apresentar a você uma nova rede social que está
              sendo desenvolvida com o objetivo de conectar pessoas com
              interesses em comum, compartilhar experiências, promover debates e
              compartilhar conhecimento.
            </p>
            <div className="hidden md:flex md:flex-col md:gap-8">
              <p>O que você pode esperar da Social H?</p>
              <ul className="list-inside list-disc text-xs">
                <li>Um ambiente acolhedor e inclusivo</li>
                <li>Ferramentas para facilitar a conexão</li>
                <li>Conteúdos de qualidade</li>
                <li>Oportunidade para se expressar</li>
                <li>Um espaço para fazer a diferença</li>
              </ul>
            </div>
            <span className="text-xs md:text-sm">Já tem uma conta?</span>
            <Link
              href="/login"
              className="w-full rounded-2xl border-2 border-black bg-white p-2 text-center md:w-[25%]"
            >
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
