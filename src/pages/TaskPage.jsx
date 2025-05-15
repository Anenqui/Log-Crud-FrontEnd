import { useEffect } from "react";
import {useAuth} from "../context/AuthContext.jsx";
import { useTasks } from "../context/Task Context";
import TaskCard from "../components/TaskCard.jsx";

 function TaskPage(){
  const {getTask, tasks}=useTasks();

  useEffect(()=>{
    getTask()
  },[]);

  if (tasks.length ===0) return (<h1>No Tasks</h1>)
    
    return (
        <div className="grid grid-cols-3 gap-2">
          {tasks.map((task)=>(
           <TaskCard task={task} key={task._id}/>
          ))}
        </div>
    )
  }
  export default TaskPage