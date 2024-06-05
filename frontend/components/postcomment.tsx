import React from 'react'

type CommentProps = {
  id: number
  postId: number
  userId: number
  comment: string
  commentDate: string
  commentImage?: string
}

export const PostComment = () => {
  const comments = [
    {
      id: 2,
      postId: 1,
      userId: 2,
      comment:
        'arrow boy stopped control life physical conversation typical health ability indeed football sheep onto pile trace screen third obtain system worry five capital word',
      commentDate: '2024-06-04',
      commentImage: ''
    },
    {
      id: 1,
      postId: 1,
      userId: 2,
      comment:
        'softly research apart task border sky proud dug scientist birth whatever hundred contrast well something plural powerful uncle respect nearer subject low bowl nation',
      commentDate: '2024-06-04',
      commentImage: ''
    }
  ]
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}></div>
      ))}
    </div>
  )
}
