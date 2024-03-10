'use client'

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
                            <Input id="username" type="text" placeholder="" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" />
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
                        <Button className="w-full border rounded bg-slate-700">
                            Login
                        </Button>
                        <p className="mt-2 text-xs text-center text-gray-700">
                            {' '}
                            Não tem uma conta?{' '}
                            <span className=" text-blue-600 hover:underline">
                                Cadastre-se
                            </span>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
