import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate'
import Task from './Task'
import ITask from '@renderer/@types/ITask'

export default function TaskCreate() {
  const {axiosServerInstance} = useAxiosPrivate()
  const defaultTask:ITask = {
    title:"App mới",
    platform : "mobie",
    nodes : [],
    edges : []
  }
  const onSave = ({title,platform,nodes,edges})=>{
    const data = {title,platform,nodes,edges}
    axiosServerInstance.post('/tasks/',data).then(res=>{
      console.log(res.data)
    })
  }
  return (
    <Task task={defaultTask} onSave={onSave}/>
  )
}
