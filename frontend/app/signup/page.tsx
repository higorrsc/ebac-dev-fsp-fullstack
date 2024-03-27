'use client'

import Link from 'next/link'

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

export default function Signup() {
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
                <form id="signup" onSubmit={(e) => e.preventDefault()}>
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
                                <Input id="email" type="email" placeholder="" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Usuário</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Confirme sua Senha
                                </Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button
                                className="w-full border rounded bg-slate-700"
                                type="submit"
                                onClick={() => console.log('signup')}
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
