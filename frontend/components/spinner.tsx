import React from 'react'

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
    </div>
  )
}

export default Spinner
