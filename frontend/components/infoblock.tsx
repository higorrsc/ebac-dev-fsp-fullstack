import React from 'react'

type InfoBlockProps = {
  title?: string
  children: React.ReactNode
}

const InfoBlock = ({ title, children }: InfoBlockProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-gray-300 p-2 shadow-md dark:bg-gray-700">
      <p className="pb-2">{title}</p>
      {children}
    </div>
  )
}

export default InfoBlock
