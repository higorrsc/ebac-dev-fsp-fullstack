import React from 'react'

import { UserCard } from '@/components/usercard'
import { Button } from '@/components/ui/button'
import defaultUser from '@/images/profile/default-user.png'
import currentUser from '@/images/profile/default-man.png'

const Comments = () => {
  const comments = [
    {
      id: 1,
      comment:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus unde blanditiis aspernatur provident ipsa sunt consequuntur, ad ipsam voluptatibus voluptatem omnis! Ipsam velit, doloribus praesentium eius eveniet facere, illum corrupti, ab veniam natus itaque quasi.',
      image: 'https://picsum.photos/1920/1080',
      date: '2024-06-05',
      postId: 1,
      userId: 1
    },
    {
      id: 2,
      comment: 'hello world!',
      date: '2024-06-05',
      postId: 1,
      userId: 1
    }
  ]
  return (
    <div className="w-full">
      {/* new comment */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <UserCard
          id={1}
          image={currentUser}
          alt="imagem do usuário"
          username="John Doe"
          onlyImage
        />
        <input
          type="text"
          placeholder="Escreva um comentário..."
          className="ml-2 w-full rounded border border-solid bg-transparent px-2 text-sm"
        />
        <Button className="h-10 w-20 rounded bg-blue-600 text-xs hover:bg-blue-900">
          Comentar
        </Button>
      </div>
      {/* all comments */}
      {comments.map((comment) => (
        <div key={comment.id} className="mx-0 my-8 flex justify-between gap-4">
          <div className="flex max-w-xl flex-1 flex-col items-start gap-1">
            <UserCard
              id={comment.userId}
              image={defaultUser}
              alt="imagem do usuário"
              username="John Doe"
            />
            <p className="pl-10 text-sm">{comment.comment}</p>
          </div>
          <div className="self-center text-xs text-gray-500">
            <span>{comment.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
