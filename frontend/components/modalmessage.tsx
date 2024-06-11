import React, { useState } from 'react'
import {
  CircleAlert,
  CircleHelp,
  OctagonAlert,
  TriangleAlert
} from 'lucide-react'

type ModalMessageProps = {
  title: string
  description: string
  icon: 'information' | 'critical' | 'question' | 'exclamation'
  onClose: () => void
}
function ModalMessage({
  title,
  description,
  icon,
  onClose
}: ModalMessageProps) {
  return (
    <>
      <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30">
        <div className="w-11/12 rounded-3xl bg-white p-10 shadow-md">
          <h1 className="text-center text-lg font-bold text-black">{title}</h1>
          <div className="grid grid-cols-[64px_auto] items-center gap-4">
            <div>
              {icon === 'information' && (
                <CircleAlert className="mx-auto h-16 w-16 text-blue-500" />
              )}
              {icon === 'critical' && (
                <OctagonAlert className="mx-auto h-16 w-16 text-red-500" />
              )}
              {icon === 'question' && (
                <CircleHelp className="mx-auto h-16 w-16 text-blue-500" />
              )}
              {icon === 'exclamation' && (
                <TriangleAlert className="mx-auto h-16 w-16 text-yellow-500" />
              )}
            </div>
            <div>
              <p className="text-black">{description}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center">
            <button
              type="button"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
              onClick={onClose}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalMessage
