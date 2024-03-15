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
import Link from 'next/link'

export default function Signup() {
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
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
                            <Input id="username" type="text" placeholder="" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Confirme sua Senha</Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full border rounded bg-slate-700">
                            Cadastrar
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
