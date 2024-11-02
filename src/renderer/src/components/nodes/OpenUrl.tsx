import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
 
const handleStyle = { left: 10 };
 
export default function OpenUrl({id, data }) {
  const [url,setUrl] = useState(data.url)
  const onChange = useCallback((evt) => {
    data.url = evt.target.value;
  }, []);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='rounded-md bg-white border gap-2 react-node overflow-hidden'>
        <div className={`p-2 border-b text-center bg-sky-600 text-white`}>
          <label htmlFor={"text-"+id} className='text-md font-semibold'>{data.label}</label>
        </div>
        <div className='p-4'>
          <input type='url' value={url} placeholder='Nhập url của bạn' id={"text-"+id} name="text" onChange={onChange} className="nodrag text-sm border rounded-md outline-none px-4 py-2" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

