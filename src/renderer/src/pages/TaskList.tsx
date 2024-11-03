import { Link } from 'react-router-dom'
import { IconFile, IconPlayerPlay, IconTrash } from '@tabler/icons-react';
import ITask from '@renderer/@types/ITask';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate';

export default function TaskList() {
  const [tasks,setTasks] = useState<ITask[]>()
  const {axiosServerInstance} = useAxiosPrivate()

  const removeTask = (task_id)=>{
    if (tasks) {
      const new_tasks = tasks.filter(task=>task.id !== task_id)
      setTasks(new_tasks)
      axiosServerInstance.delete(`/tasks/${task_id}/`).then(res=>{
        console.log(res.data)
      })
    }
  }
  useEffect(()=>{
    axiosServerInstance.get('/tasks/').then(res=>{
      setTasks(res.data)
    })
  },[])
  return (
    <div className='p-6'>
        <h2 className='text-2xl font-bold'>TaskList</h2>
        <div className='grid grid-cols-5 mt-8 gap-6'>
            {tasks && tasks.map((task,index)=>(
                <div key={index} className='p-2 gap-4 rounded-md border border-gray-300 shadow-sm flex items-center justify-between'>
                    <Link className="flex gap-4" to={"/tasks/edit/"+task.id} >
                      <div className={' aspect-square rounded-md flex items-center justify-center overflow-hidden '}>
                        <IconFile size={32} className={'text-gray-500'}></IconFile>
                      </div>
                      <div>
                        <h2 className="text-md font-semibold text-gray-800">{task.title}</h2>
                        <p className="text-gray-500 text-sm font-semibold">{task.platform}</p>
                      </div>
                    </Link>
                    <div className='flex items-center gap-2'>
                      <button className={"flex items-center justify-center text-gray-500 hover:text-sky-500 duration-150"}>
                        <IconPlayerPlay></IconPlayerPlay>
                      </button>
                      <button onClick={()=>removeTask(task.id)} className={"flex items-center justify-center text-gray-500 hover:text-red-500 duration-150"}>
                        <IconTrash></IconTrash>
                      </button>
                    </div>
                </div>
            ))}
        </div>
    </div>

  )
}
