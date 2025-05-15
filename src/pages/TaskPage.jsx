 import { useEffect } from "react";
import {useAuth} from "../context/AuthContext.jsx";
import { useTasks } from "../context/Task Context";

 function TaskPage(){
  const {getTask, tasks}=useTasks();

  useEffect(()=>{
    getTask()
  },[]);

  if (tasks.length ===0) return (<h1>No Tasks</h1>)
    
    return (
        <div>
          {tasks.map((task)=>(
            <div key={task._id}>
              <h1>{task.title}</h1>
              <p>{task.description}</p>
          </div>
          ))}
        </div>
    )
  }
  export default TaskPage