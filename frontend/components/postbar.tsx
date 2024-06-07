import React from 'react'

import { Post } from './post'

export default function PostBar() {
  const posts = [
    {
      id: 1,
      username: 'John Doe',
      userId: 1,
      profilPic: 'https://i.pravatar.cc/300',
      image: 'https://picsum.photos/1920/1080',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, nostrum.',
      date: '2024-06-05',
      category: '#post #python #javascript'
    },
    {
      id: 2,
      username: 'Jane Doe',
      userId: 2,
      profilPic: 'https://i.pravatar.cc/300',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, nostrum.',
      date: '2024-06-05',
      category: '#post #python #nextjs'
    }
  ]
  return (
    <div className="flex w-full flex-col gap-8">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}
