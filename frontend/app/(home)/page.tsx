'use client'

import Header from '@/components/header'
import PostBar from '@/components/postbar'

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <main className="flex flex-col items-center pt-4 md:min-h-screen">
        <PostBar />
      </main>
    </>
  )
}
