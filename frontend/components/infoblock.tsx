import React from 'react'

type InfoBlockProps = {
  title?: string
  children: React.ReactNode
}

const InfoBlock = ({ title, children }: InfoBlockProps) => {
  return (
    <div className="rounded-xl bg-gray-300 p-4 shadow-md dark:bg-gray-700">
      <p className="text-xl font-semibold">{title}</p>
      <div className="mt-4 flex flex-col gap-6">{children}</div>
    </div>
  )
}

export default InfoBlock
