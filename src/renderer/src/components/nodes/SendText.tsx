import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
 
const handleStyle = { left: 10 };
 
export default function SendText({ id,data }) {
    const [by,setBy] = useState(data.by)
    const [element,setElement] = useState(data.element)
    const [content,setContent] = useState(data.content)
    const onChangeBy = useCallback((evt) => {
      data.by = evt.target.value;
      setBy(evt.target.value)
    }, []);
    const onChangeElement = useCallback((evt) => {
      data.element = evt.target.value;
      setElement(evt.target.value)
    }, []);
    const onChangeContent = useCallback((evt) => {
      data.content = evt.target.value;
      setContent(evt.target.value)
    }, []);
  return (
    <>
        <Handle type="target" position={Position.Top} />
        <div className='rounded-md bg-white border gap-2 react-node overflow-hidden'>
            <div className='flex flex-col'>
                <div className={`text-center p-2 border-b bg-sky-600 text-white`}>
                    <p className='text-center font-semibold text-md'>Send text</p>
                </div>
                <div className="p-4 flex flex-col gap-2">
                    <div className="flex gap-1 flex-col">
                        <label htmlFor={`sendText-by-${id}`} className='text-xs text-gray-500'>By</label>
                        <select onChange={onChangeBy} className='nodrag border rounded-md outline-none px-4 py-2 text-sm w-full' name={`sendText-by-${id}`} id={`sendText-by-${id}`} >
                            <option select value="id">id</option>
                            <option value="class name">class name</option>
                        </select>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <label htmlFor={`sendText-elm-${id}`} className='text-xs text-gray-500'>Element</label>
                        <input value={element} onChange={onChangeElement} placeholder='Nhập element' id={`sendText-elm-${id}`} name={`sendText-elm-${id}`} className="w-full border rounded-md outline-none px-4 py-2 text-sm" />
                    </div>
                    <div className="flex gap-1 flex-col">
                        <label htmlFor={`sendText-content-${id}`} className='text-xs text-gray-500'>Content</label>
                        <input value={content} onChange={onChangeContent} placeholder='Nhập nội dung' id={`sendText-content-${id}`} name={`sendText-content-${id}`} className="w-full border rounded-md outline-none px-4 py-2 text-sm" />
                    </div>
                </div>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </>
  );
}

