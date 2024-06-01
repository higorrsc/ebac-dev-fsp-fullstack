'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
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
      description: description,
      title: 'Erro'
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
        description:
          'Conta criada com sucesso! Você pode fazer o login e completar seu perfil...',
        title: 'Sucesso',
        action: (
          <ToastAction altText="Ir para o login">
            <Button onClick={() => router.push('/login')}>Ir para login</Button>
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
      <div className="h-screen flex items-center justify-center">
        <div
          id="card"
          className="w-full min-h-[600px] grid grid-cols-1 md:grid-cols-2 bg-slate-300 rounded-2xl overflow-hidden"
        >
          <div
            id="left"
            className="p-12 flex justify-center flex-col text-black"
          >
            <h1 className="text-2xl font-bold text-gray-700 pb-10">
              Registre-se
            </h1>
            <form
              id="signup"
              onSubmit={handleSubmit(submitSignUp)}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                className="border-b-2 outline-none bg-transparent p-2 w-full"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              )}
              <input
                type="text"
                id="username"
                placeholder="Nome de usuário"
                className="border-b-2 outline-none bg-transparent p-2 w-full"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-500 text-xs">
                  {errors.username?.message}
                </p>
              )}
              <div className="grid grid-cols-2">
                <div className="block">
                  <input
                    type="password"
                    id="password"
                    placeholder="Senha"
                    className="border-b-2 outline-none bg-transparent p-2 w-full"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmar a senha"
                    className="border-b-2 outline-none bg-transparent p-2 w-full"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                className="w-[50%] text-center border-2 bg-white border-black rounded-2xl p-2 text-sm"
                type="submit"
              >
                Registrar
              </button>
            </form>
          </div>
          <div
            id="right"
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
            <span className="text-xs">Já tem uma conta?</span>
            <Link
              href="/login"
              className="w-[50%] text-center border-2 bg-white border-black rounded-2xl p-2 text-sm"
            >
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
