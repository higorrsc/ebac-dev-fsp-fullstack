import Image from 'next/image'
import { Ellipsis, Heart, MessageSquareMore, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Comments } from '@/components/posts/postcomment'
import { UserCard } from '@/components/usercard'
import defaultUser from '@/images/profile/default-user.png'
import { Post as PostType } from '@/lib/types'

type PostProps = {
  post: PostType
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false)
  const [commentsQty, setCommentsQty] = useState(0)
  const [upVotesQty, setUpVotesQty] = useState(0)

  useEffect(() => {
    if (post.votes) {
      const allVotes = post.votes
      allVotes.map((vote) => {
        if (vote.up_vote_by) {
          setUpVotesQty((u) => u + 1)
        }
      })
    }
    if (post.comments) {
      setCommentsQty(post.comments.length)
    }
  }, [post])

  return (
    <div className="rounded-2xl border-2 shadow-xl">
      <div className="p-4">
        {/* user */}
        <div className="flex items-center justify-between">
          <UserCard
            key={post.id}
            id={post.owner}
            image={defaultUser}
            alt="imagem do usuário"
            username="a"
            inPost
            activity={post.post_date.toString()}
          />
          <Ellipsis />
        </div>
        {/* content */}
        <div className="my-4">
          <p>{post.content}</p>
          {post.post_image && (
            <Image
              src={post.post_image}
              alt={post.content}
              width={800}
              height={800}
              className="mt-4 object-cover"
            />
          )}
          <p className="text-center">{post.category}</p>
        </div>
        {/* info */}
        <div className="flex items-center gap-5">
          <div className="flex cursor-pointer items-center gap-2 text-xs">
            {upVotesQty > 0 ? <Heart fill="red" /> : <Heart />}{' '}
            {upVotesQty || ''}
          </div>
          <div
            className="flex cursor-pointer items-center gap-2 text-xs"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <MessageSquareMore /> {commentsQty || ''}
          </div>
          <div className="flex cursor-pointer items-center gap-2 text-xs">
            <Share2 />
          </div>
        </div>
        {/* comments */}
        {commentOpen && (
          <div className="w-full">
            {' '}
            <Comments comments={post.comments} />{' '}
          </div>
        )}
      </div>
    </div>
  )
}
