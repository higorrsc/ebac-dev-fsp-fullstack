'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import apiService from '@/app/services/apiService'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUserId } from '@/lib/actions'
import { ACCESS_TOKEN_NAME } from '@/constants'
import { User } from '@/lib/types'

type ModalUserProfileProps = {
  onClose: () => void
}

const userProfileSchema = z
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

type FormData = z.infer<typeof userProfileSchema>

function UserProfile({ onClose }: ModalUserProfileProps) {
  const [modalDescription, setModalDescription] = useState('')
  const [userData, setUserData] = useState<User | null>(null)
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      setUserId(await getUserId(ACCESS_TOKEN_NAME))
      const response = await apiService.get(`/users/${userId}/`)
      const errors = response.errors
      setModalDescription('')

      if (errors) {
        setModalDescription(errors.join(', '))
      } else {
        const data: User = response
        const updatedData: User = {
          ...data,
          profile_data: {
            ...data.profile_data,
            profile_image:
              data.profile_data?.profile_image &&
              `${process.env.NEXT_PUBLIC_URL}${data.profile_data.profile_image}`
          }
        }
        setUserData(updatedData)
      }
    }
    fetchProfileData()
  }, [userId])

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(userProfileSchema)
  })

  return (
    <>
      <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30">
        <div className="flex h-[440px] w-11/12 flex-col items-center gap-4 rounded-3xl bg-stone-300 p-2 shadow-md xl:h-[480px] xl:w-[480px] xl:p-10">
          <h1 className="text-center text-lg font-bold text-black">
            Editar perfil
          </h1>
          <form
            className="flex w-full flex-col gap-4 text-xs text-black md:text-sm"
            id="profile"
            onSubmit={(e) => e.preventDefault()}
          >
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="flex xl:justify-between">
                <TabsTrigger value="account">Conta</TabsTrigger>
                <TabsTrigger value="contact">Contato</TabsTrigger>
                <TabsTrigger value="address">Endereços</TabsTrigger>
                <TabsTrigger value="password">Senha</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="mb-4 flex gap-2">
                  <div className="flex w-full flex-col">
                    <label htmlFor="username" className="text-[10px]">
                      Nome de usuário
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Nome de usuário"
                      className="w-full border-b-2 bg-transparent p-2 outline-none"
                      value={userData?.username}
                      {...register('username')}
                    />
                    {errors.username && (
                      <p className="text-red-500">{errors.username?.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4 flex gap-2">
                  <div className="flex w-full flex-col">
                    <label htmlFor="firstName" className="text-[10px]">
                      Primeiro Nome
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Primeiro nome"
                      className="w-full border-b-2 bg-transparent p-2 outline-none"
                      value={userData?.first_name}
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-red-500">
                        {errors.firstName?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full flex-col">
                    <label htmlFor="lastName" className="text-[10px]">
                      Último Nome
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Último nome"
                      className="w-full border-b-2 bg-transparent p-2 outline-none"
                      value={userData?.last_name}
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-red-500">{errors.lastName?.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4 flex gap-2">
                  <div className="flex w-full flex-col">
                    <label htmlFor="gender" className="text-[10px]">
                      Gênero
                    </label>
                    <select
                      id="gender"
                      className="h-full w-full border-b-2 bg-transparent p-2 outline-none"
                      value={userData?.profile_data?.gender}
                    >
                      <option value="" selected disabled>
                        Selecione
                      </option>
                      <option value="male">Masculino</option>
                      <option value="female">Feminino</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                  <div className="flex w-full flex-col">
                    <label htmlFor="dob" className="text-[10px]">
                      Data de nascimento
                    </label>
                    <input
                      id="dob"
                      type="date"
                      className="w-full border-b-2 bg-transparent p-2 outline-none"
                      value={userData?.profile_data?.dob}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contact">
                <div className="mb-4 flex w-full flex-col">
                  <label htmlFor="email" className="text-[10px]">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="E-mail"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    value={userData?.email}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email?.message}</p>
                  )}
                </div>
                <div className="mb-4 flex w-full flex-col">
                  <label htmlFor="phone" className="text-[10px]">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="h-full w-full border-b-2 bg-transparent p-2 outline-none"
                    value={userData?.profile_data?.phone}
                  />
                </div>
              </TabsContent>
              <TabsContent value="address">
                <div className="mb-4 flex w-full flex-col">
                  <label htmlFor="lives_in" className="text-[10px]">
                    Residencial
                  </label>
                  <input
                    id="lives_in"
                    type="text"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    value={userData?.profile_data?.lives_in}
                  />
                </div>
                <div className="mb-4 flex w-full flex-col">
                  <label htmlFor="works_at" className="text-[10px]">
                    Comercial
                  </label>
                  <input
                    id="works_at"
                    type="text"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    value={userData?.profile_data?.works_at}
                  />
                </div>
                <div className="mb-4 flex w-full flex-col">
                  <label htmlFor="studies_at" className="text-[10px]">
                    Instituição de Ensino
                  </label>
                  <input
                    id="studies_at"
                    type="text"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    value={userData?.profile_data?.studies_at}
                  />
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div className="mb-4 flex w-full flex-col">
                  <label htmlFor="password" className="text-[10px]">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    // {...register('password')}
                  />
                  {/* {errors.password && (
                    <p className="text-red-500">{errors.password?.message}</p>
                  )} */}
                </div>
                <div className="mb-4 flex w-full flex-col">
                  <label htmlFor="confirmPassword" className="text-[10px]">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full border-b-2 bg-transparent p-2 outline-none"
                    // {...register('confirmPassword')}
                  />
                  {/* {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword?.message}
                    </p>
                  )} */}
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-5 flex items-center">
              <button
                type="button"
                className="w-full rounded-xl bg-blue-500 px-4 py-2 text-white"
                onClick={onClose}
              >
                Ok
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserProfile
