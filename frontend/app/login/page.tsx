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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginAccount() {
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
                <form id="login" onSubmit={(e) => e.preventDefault()}>
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
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                />
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
                                onClick={() => console.log('login')}
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
