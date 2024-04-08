'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import apiService from '@/app/services/apiService'
import { handleLogin } from '@/lib/actions'

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
            handleLogin(data.username, response.access, response.refresh)
            router.push('/')
        } else {
            toastError('Nome de usuário ou senha inválido')
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
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
                <form id="login" onSubmit={handleSubmit(submitLogin)}>
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">
                                Login
                            </CardTitle>
                            <CardDescription className="text-center">
                                Informe seu usuário e sua senha
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Usuário</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder=""
                                    autoComplete="username"
                                    {...register('username')}
                                />
                                {errors.username && (
                                    <p className="text-red-500">
                                        {errors.username?.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register('password')}
                                />
                                {errors.password && (
                                    <p className="text-red-500">
                                        {errors.password?.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button
                                className="w-full border rounded bg-slate-700"
                                type="submit"
                            >
                                Login
                            </Button>
                            <p className="mt-2 text-xs text-center text-gray-700">
                                {' '}
                                Não tem uma conta?{' '}
                                <span className=" text-blue-600 hover:underline">
                                    <Link href={'/signup'}>Cadastre-se</Link>
                                </span>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}
