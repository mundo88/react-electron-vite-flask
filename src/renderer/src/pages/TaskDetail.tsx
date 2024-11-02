import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Task from './Task';

export default function TaskDetail() {
  const { id } = useParams();
  const [task,setTask] = useState(null)
  const editTask = ({title,platform,nodes,edges})=>{
    console.log(edges)
    const data = {
      task_id : id,
      data : {
        title:title,
        platform:platform,
        nodes :nodes,
        edges :edges
      }
    }
  }


  return (
    <>
      {task ? <Task task={task} onSave={editTask}/> : <div>Loading</div>}
    </>
  )
}
