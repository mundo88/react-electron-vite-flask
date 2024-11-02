import React from 'react'

export default function NodeHeader({title}) {
  return (
    <div className={`text-center p-2 border-b bg-sky-600 text-white`}>
        <p className='text-center font-semibold text-md'>{title}</p>
    </div>
  )
}

export {
  NodeHeader
}