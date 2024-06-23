import React, { useEffect, useState } from 'react'

import apiService from '@/app/services/apiService'
import ModalMessage from '@/components/modalmessage'
import { Post } from '@/components/posts/post'
import { Post as PostType } from '@/lib/types'

type PostBarProps = {
  userId?: number
}

export default function PostBar({ userId }: PostBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState('')
  const [posts, setPosts] = useState<PostType[]>([])

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await apiService.get(`/posts/`)
      const errors = response.errors
      setModalDescription('')

      if (errors) {
        setModalDescription(errors.join(', '))
      } else {
        const data = response
        setPosts(data)
      }
    }
    fetchPosts()
  }, [userId])

  return (
    <>
      {isModalOpen && (
        <ModalMessage
          title="Erro"
          description={modalDescription}
          icon="critical"
          onClose={handleCloseModal}
        />
      )}
      <div className="flex w-full flex-col gap-4">
        {posts &&
          posts.map(
            (post) =>
              (!userId || userId == post.owner) && (
                <Post key={post.id} post={post} />
              )
          )}
      </div>
    </>
  )
}
