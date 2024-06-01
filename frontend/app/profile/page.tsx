'use server'

import Image from 'next/image'

import defaultUser from '@/images/profile/default-user.png'
import apiService from '@/app/services/apiService'
import { getUserId } from '@/lib/actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default async function Profile() {
  const { profile_data: userProfileData } = await apiService.get(
    `/users/${await getUserId()}/`
  )

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Card className="z-10 w-full max-w-5xl text-sm rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Editar perfil</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center text-sm overflow-hidden">
          <Image
            src={userProfileData.profile_image || defaultUser}
            width={100}
            height={10}
            alt="imagem usuário"
            className="w-24 h-24 rounded-full overflow-clip"
          />
          <div className="ml-10">
            <h1 className="text-3xl font-bold">
              {userProfileData.first_name} {userProfileData.last_name}
            </h1>
          </div>
        </CardContent>
      </Card>
      <Separator className="my-2" />
      <Card className="z-10 w-full max-w-5xl text-sm rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Gênero</Label>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Separator className="my-2" />
          <Label>Data de nascimento</Label>
          <Input
            id="dob"
            type="date"
            value={userProfileData.dob}
            readOnly
            className="rounded-xl"
          />
          <Separator className="my-2" />
          <Label>Telefone</Label>
          <Input
            id="phone"
            type="phone"
            value={userProfileData.phone}
            readOnly
            className="rounded-xl"
          />
          <Separator className="my-2" />
          <Label>Endereço de trabalho</Label>
          <Input
            id="works_at"
            type="text"
            value={userProfileData.works_at}
            readOnly
            className="rounded-xl"
          />
          <Separator className="my-2" />
          <Label>Endereço residencial</Label>
          <Input
            id="lives_in"
            type="text"
            value={userProfileData.lives_in}
            readOnly
            className="rounded-xl"
          />
          <Separator className="my-2" />
          <Label>Endereço da escola</Label>
          <Input
            id="studies_at"
            type="text"
            value={userProfileData.studies_at}
            readOnly
            className="rounded-xl"
          />
        </CardContent>
      </Card>
    </main>
  )
}
