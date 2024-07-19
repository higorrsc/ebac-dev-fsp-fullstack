'use client'
import React, { useEffect, useState } from 'react'

import Header from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import apiService from '@/app/services/apiService'
import { User } from '@/lib/types'
import { UserCard } from '@/components/user/usercard'
import { getUserId } from '@/lib/actions'
import { ACCESS_TOKEN_NAME } from '@/constants'

function Notification() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState('')
  const [incomingRequests, setIncomingRequests] = useState<User[]>([])
  const [sentRequests, setSentRequests] = useState<User[]>([])

  useEffect(() => {
    async function fetchIncomingRequests() {
      const response = await apiService.get(
        '/friendship/incoming_requests/',
        true
      )
      const errors = response.errors
      if (errors) {
        setModalDescription(errors.join(', '))
      } else {
        if (!response.message) setIncomingRequests(response)
      }
    }
    fetchIncomingRequests()

    async function fetchSentRequests() {
      const response = await apiService.get('/friendship/sent_requests/', true)
      const errors = response.errors
      if (errors) {
        setModalDescription(errors.join(', '))
      } else {
        if (!response.message) setSentRequests(response)
      }
    }
    fetchSentRequests()
  }, [])

  async function handleAcceptRequest(userFrom: number) {
    const userId = await getUserId(ACCESS_TOKEN_NAME)
    if (!userId) return

    const content = {
      status_request: 'accepted'
    }

    const response = await apiService.put(
      `/friendship/2/friendrequests/`,
      content,
      true
    )
  }

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
            {incomingRequests ? (
              incomingRequests.map((user) => (
                <div key={user.id} className="flex justify-between gap-4">
                  <UserCard
                    id={user.id}
                    username={user.first_name + ' ' + user.last_name}
                    image={user.profile_data?.profile_image}
                  />
                  <button onClick={() => handleAcceptRequest(user.id)}>
                    Aceitar
                  </button>
                </div>
              ))
            ) : (
              <p>Sem solicitações</p>
            )}
          </TabsContent>
          <TabsContent value="sent">
            {sentRequests ? (
              sentRequests.map((user) => (
                <UserCard
                  id={user.id}
                  key={user.id}
                  username={user.first_name + ' ' + user.last_name}
                  image={user.profile_data?.profile_image}
                />
              ))
            ) : (
              <p>Sem solicitações</p>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default Notification
