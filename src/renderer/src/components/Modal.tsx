import React from 'react'


export default function Modal({show,onHidden,node}) {
  console.log(node)
  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-[9999] flex items-center justify-center' >
        <div className="absolute inset-0 bg-black/60" onClick={onHidden}></div>
        <div className='relative w-96 h-96 bg-white rounded-lg'>
            {node.data.label}
        </div>
    </div>
  )
}
