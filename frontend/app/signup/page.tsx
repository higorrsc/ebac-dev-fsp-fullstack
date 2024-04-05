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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'As senhas devem ser iguais',
                path: ['confirmPassword']
            })
        }
    })

type FormData = z.infer<typeof registerUserSchema>

export default function Signup() {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormData>({
        mode: 'onBlur',
        resolver: zodResolver(registerUserSchema)
    })

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
                <form
                    id="signup"
                    onSubmit={handleSubmit((data) => console.log(data))}
                >
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">
                                Cadastro
                            </CardTitle>
                            <CardDescription className="text-center">
                                Faça seu cadastro na rede social
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div>
                                <Label htmlFor="email">E-Mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder=""
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="text-red-500">
                                        {errors.email?.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Usuário</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder=""
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
                                    {...register('password')}
                                />
                                {errors.password && (
                                    <p className="text-red-500">
                                        {errors.password?.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Confirme sua Senha
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...register('confirmPassword')}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500">
                                        {errors.confirmPassword?.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button
                                className="w-full border rounded bg-slate-700"
                                type="submit"
                            >
                                Cadastrar
                            </Button>
                            <p className="text-center text-sm mt-16">
                                Ao se inscrever, você concorda com os Termos de
                                Serviço e a Política de Privacidade, incluindo o
                                Uso de Cookies.
                            </p>

                            <p className="text-center  mt-8 mb-4">
                                Já possui uma conta?
                            </p>
                            <Link
                                href={'/login'}
                                className="border-1 w-full rounded bg-slate-700 h-10 flex items-center justify-center"
                            >
                                Entrar
                            </Link>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}
