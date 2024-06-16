'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import apiService from '@/app/services/apiService'
import ModalMessage from '@/components/modalmessage'
import { getUserId, handleLogin } from '@/lib/actions'

const loginSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'O nome de usuário deve ser preenchido'
  }),
  password: z.string().min(1, { message: 'A senha deve ser preenchida' })
})

type FormData = z.infer<typeof loginSchema>

export default function LoginAccount() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState('')
  const [userId, setUserId] = useState<number | null>(null)

  const router = useRouter()

  const handleCloseModal = () => {
    setIsOpen(false)
  }

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

  const submitLogin = async (data: FormData) => {
    const response = await apiService.post('/token/', data)
    const errors = response.errors

    if (errors) {
      setIsOpen(true)
      setModalDescription(errors.join(', '))
    }

    if (response.access && response.refresh) {
      handleLogin(response.access, response.refresh)
      router.push('/')
    } else {
      setIsOpen(true)
      setModalDescription('Nome de usuário ou senha inválido(a)')
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
      <div className="flex h-screen items-center justify-center sm:my-4">
        {isOpen && (
          <ModalMessage
            title="Erro"
            description={modalDescription}
            icon="critical"
            onClose={handleCloseModal}
          />
        )}
        <div
          id="card"
          className="grid min-h-[600px] w-full grid-cols-1 overflow-hidden rounded-2xl bg-slate-300 md:grid-cols-2"
        >
          <div
            id="left"
            className='flex flex-col gap-8 bg-[linear-gradient(to_right_bottom,rgba(255,255,255,0.8),rgba(133,133,133,0.8)),url("https://cdn.pixabay.com/photo/2023/03/19/08/09/network-7862066_1280.jpg")] bg-cover bg-center p-12 text-xs text-black md:text-sm'
          >
            <h1 className="text-2xl font-bold">Social H</h1>
            <h2 className="text-xl font-bold">Bem vindo de volta!</h2>
            <div className="hidden md:flex md:flex-col md:gap-8">
              <p className="text-xs md:text-sm">
                Estamos felizes em tê-lo de volta à nossa comunidade. Entre em
                sua conta para continuar conectado com seus amigos, familiares e
                interesses.
              </p>
              <p className="text-xs md:text-sm">Faça login para:</p>
              <ul className="list-inside list-disc text-xs">
                <li>Compartilhar seus pensamentos e ideias.</li>
                <li>Acompanhar as últimas notícias e tendências.</li>
                <li>Conectar-se com amigos e familiares.</li>
                <li>Descobrir novos conteúdos e inspirações.</li>
                <li>Participar de grupos e comunidades.</li>
                <li>Fazer a diferença no mundo.</li>
              </ul>
            </div>
            <p className="text-xs md:text-sm">Ainda não tem uma conta?</p>
            <span className="text-xs md:text-sm">
              Cadastre-se agora mesmo e junte-se à nossa comunidade! É fácil e
              rápido.
            </span>
            <Link
              href="/signup"
              className="w-full rounded-2xl border-2 border-black bg-white p-2 text-center md:w-[25%]"
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
              className="flex flex-col gap-4 text-xs md:text-sm"
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
                className="w-full rounded-2xl border-2 border-black bg-white p-2 text-center md:w-[25%]"
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
