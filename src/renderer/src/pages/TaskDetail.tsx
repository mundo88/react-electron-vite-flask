import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Task from './Task';
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'react-toastify';

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const { axiosServerInstance } = useAxiosPrivate();
  const navigate = useNavigate();
  const editTask = async ({ title, platform, nodes, edges }) => {
    const { data } = await axiosServerInstance.put(`/tasks/${id}/`, {
      title,
      platform,
      nodes,
      edges
    })
    console.log(data)
    toast.success(`Đã cập nhật node mới`)

  }
  useEffect(() => {
    const getTaskById = async () => {
      setLoading(true)
      try {
        const res = await axiosServerInstance.get(`/tasks/${id}`);
        console.log(res.data)
        setLoading(false)
        setTask(res.data)
      } catch (error) {
        console.log(error)
        navigate('/tasks/create')
      }
    }
    getTaskById();
  }, [id])

  return (
    <>
      {loading ?
        <div className='w-full h-full flex items-center justify-center'>
          <AiOutlineLoading3Quarters size={36} className='text-blue-600 animate-spin'></AiOutlineLoading3Quarters>
        </div> : null
      }
      {task && <Task task={task} onSave={editTask} />}
    </>
  )
}
