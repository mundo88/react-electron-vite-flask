import Task from './Task'
import { useNavigate } from 'react-router-dom'

export default function TaskCreate() {
  const navigate = useNavigate()
  const defaultTask = {
    title:"App mới",
    platform : "mobie",
    nodes : [],
    edges : []
  }
  const onSave = ({title,platform,nodes,edges})=>{
    const data = {title,platform,nodes,edges}
    console.log(data)

  }
  return (
    <Task task={defaultTask} onSave={onSave}/>
  )
}
