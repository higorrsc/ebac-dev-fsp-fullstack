'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
    username: z.string().trim().min(1, {
        message: 'O nome de usuário deve ser preenchido'
    }),
    password: z.string().min(1, { message: 'A senha deve ser preenchida' })
})

type FormData = z.infer<typeof loginSchema>

export default function LoginAccount() {
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
                <form
                    id="login"
                    onSubmit={handleSubmit((data) => console.log(data))}
                >
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
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Manter conectado
                                </label>
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
