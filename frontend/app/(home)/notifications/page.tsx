import React from 'react'

import Header from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Notification() {
  return (
    <>
      <Header label="Notificações" />
      <main className="flex flex-col items-center pt-4 md:min-h-screen">
        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="flex xl:justify-center">
            <TabsTrigger
              value="incoming"
              className="w-full bg-slate-700 data-[state=active]:bg-slate-600"
            >
              Solicitações recebidas
            </TabsTrigger>
            <TabsTrigger
              value="sent"
              className="w-full bg-slate-700 data-[state=active]:bg-slate-600"
            >
              Solicitações Enviadas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="incoming">
            Solicitações de amizade recebidas
          </TabsContent>
          <TabsContent value="sent">
            Solicitações de amizade enviadas
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default Notification
