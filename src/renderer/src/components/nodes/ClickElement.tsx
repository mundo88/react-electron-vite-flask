import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
 
const handleStyle = { left: 10 };
 
export default function ClickElement({id, data }) {
  const [value,setValue] = useState(data.element)
  const onChange = useCallback((evt) => {
    data.element = evt.target.value;
    setValue(evt.target.value)
  }, []);
  const onSelect = (e)=>{
    data.by = e.target.value
  }
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div className={`rounded-md bg-white border flex flex-col react-node realactive`}>
        <div className={`p-2 text-center border-b bg-sky-600 text-white rounded-t-md`}>
          <p className='text-md font-semibold'>Click Element</p>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="by" className='text-xs text-gray-500'>By</label>
            <select className='border rounded-md outline-none px-4 py-2 w-full nodrag' name="by" id="by" onChange={onSelect}>
                <option select value="id">id</option>
                <option value="class name">class name</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`click-${id}`} className='text-xs text-gray-500'>Element</label>
            <input val  ue={value} placeholder='Nhập dữ liệu nút' id={`click-${id}`} name={`click-${id}`} onChange={onChange} className="border rounded-md outline-none px-4 py-2"/>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

