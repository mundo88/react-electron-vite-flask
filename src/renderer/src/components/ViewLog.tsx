import  { useState } from 'react'
import { IconMaximize, IconChevronUp, IconChevronDown, IconMinimize, IconTrash } from '@tabler/icons-react'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export default function ViewLog() {
  const [logs,setLogs] = useState(["123","234234","789"])
  function setLogData(log) {
    setLogs([log,...logs])
  }
  const [show,setShow] = useState(false)
  const [zoom,setZoom] = useState(false)
  return (
    <div className={`w-full bg-[#1d1f21] ${zoom ? 'fixed top-0 left-0 right-0 bottom-0' : 'relative'}`}>
        <div className='flex items-center justify-between py-2 pl-4 pr-2 w-full'>
          <p className='text-white text-lg font-semibold'>View logs</p>
          <Stack gap={1} direction="row">
            <IconButton color='primary' onClick={()=>setLogs([])}>
              <IconTrash size={20} className='text-white'/>
            </IconButton> 
            {!zoom && 
            <IconButton color='primary'onClick={()=>setShow(!show)} >
              {show ? <IconChevronDown size={20} className='text-white'/> : <IconChevronUp size={20} className='text-white'/>}
            </IconButton> 
            }
            <IconButton color='primary' onClick={()=>setZoom(!zoom)}>
              {zoom ? <IconMinimize size={20} className='text-white'/> : <IconMaximize size={20} className='text-white'/>}
            </IconButton> 
          </Stack>
        </div>
        {show && 
        <div className="min-h-44 px-4 overflow-y-auto">
          {logs.map((value,key)=>(
              <p className='text-white text-lg' key={key}>
                  {value}
              </p>   
          ))}
        </div>}
        <div className='px-4 py-1 bg-neutral-800 w-full'>
          <p className='text-sm text-gray-300'>status bar</p>
        </div>
    </div>
  )
}