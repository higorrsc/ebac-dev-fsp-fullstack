'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import apiService from '@/app/services/apiService'
import ModalMessage from '@/components/modalmessage'
import { getUserId } from '@/lib/actions'
import { ACCESS_TOKEN_NAME } from '@/constants'

const registerUserSchema = z
  .object({
    email: z.string().email({ message: 'O e-mail deve ser preenchido' }),
    firstName: z.string().trim().min(1, {
      message: 'O nome deve ser preenchido'
    }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome deve ser preenchido'
    }),
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
  const [hasError, setHasError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [modalDescription, setModalDescription] = useState('')

  const router = useRouter()

  const handleCloseModal = () => {
    setIsOpen(false)
    if (!hasError) {
      router.push('/')
    }
  }

  useEffect(() => {
    ;(async () => {
      const gUserId = await getUserId(ACCESS_TOKEN_NAME)
      setUserId(gUserId)
    })()
  })

  useEffect(() => {
    if (userId) {
      router.push('/')
    }
  })

  const submitSignUp = async (data: FormData) => {
    const userData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password
    }
    const res = await apiService.post('/users/', userData)
    const errors = res.errors

    if (errors) {
      setHasError(true)
      setIsOpen(true)
      setModalDescription(errors.join(', '))
    }

    if (res.id) {
      setHasError(false)
      setIsOpen(true)
      setModalDescription(
        'Conta criada com sucesso! Você pode fazer o login e completar seu perfil...'
      )
    } else {
      if (!res.id && res.username) {
        setHasError(true)
        setIsOpen(true)
        setModalDescription('Nome de usuário já cadastrado')
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
        {isOpen && (
          <ModalMessage
            title={hasError ? 'Erro!' : 'Sucesso!'}
            description={modalDescription}
            icon={hasError ? 'critical' : 'information'}
            onClose={handleCloseModal}
          />
        )}
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
                type="text"
                id="firstName"
                placeholder="Primeiro nome"
                className="w-full border-b-2 bg-transparent p-2 outline-none"
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName?.message}</p>
              )}
              <input
                type="text"
                id="firstName"
                placeholder="Último nome"
                className="w-full border-b-2 bg-transparent p-2 outline-none"
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName?.message}</p>
              )}
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
