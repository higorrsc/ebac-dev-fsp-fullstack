import Link from 'next/link'
import React, { useState } from 'react'

import apiService from '@/app/services/apiService'
import ModalMessage from '@/components/modalmessage'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

type UserCardProps = {
  id: number
  username: string
  image: string
  activity?: string
  time?: string
  follow?: boolean
  inPost?: boolean
  onlyImage?: boolean
}
export const UserCard: React.FC<UserCardProps> = ({
  id,
  username,
  image,
  activity,
  time,
  online,
  follow,
  inPost,
  onlyImage = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIcon, setModalIcon] = useState('')
  const [modalDescription, setModalDescription] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleFollowLink = async () => {
    const postContent = { request_to: id }

    const response = await apiService.postWithAuth(`/friendship/`, postContent)
    const data = response
    const errors = response.errors

    if (errors) {
      setModalIcon('error')
      setModalTitle('Erro')
      setModalDescription(errors.join(', '))
      setIsModalOpen(true)
    } else {
      if (data.message) {
        setModalIcon('exclamation')
        setModalTitle('Atenção')
        setModalDescription(data.message)
        setIsModalOpen(true)
      } else {
        if (data.status_request === 'pending') {
          setModalIcon('information')
          setModalTitle('Informação')
          setModalDescription('Sua solicitação foi enviada!')
          setIsModalOpen(true)
        }
      }
    }
  }
  return (
    <>
      {isModalOpen && (
        <ModalMessage
          title={modalTitle}
          description={modalDescription}
          icon={modalIcon}
          onClose={handleCloseModal}
        />
      )}
      <div className="relative flex items-center justify-between">
        <Link href={`/profile/${id}`}>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>
                {username.split(' ')[0][0].toUpperCase() +
                  username.split(' ')[1][0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!onlyImage && (
              <div
                className={`flex ${inPost ? 'flex-col' : 'items-center gap-2'}`}
              >
                <span className="text-sm font-medium">{username}</span>
                {activity && <span className="text-[10px]">{activity}</span>}
              </div>
            )}
          </div>
        </Link>
        {time && (
          <div>
            <span>{time}</span>
          </div>
        )}
        {follow && (
          <Button
            className="h-6 w-16 rounded-xl bg-blue-600 text-xs hover:bg-blue-900"
            onClick={handleFollowLink}
          >
            Seguir
          </Button>
        )}
      </div>
    </>
  )
}
