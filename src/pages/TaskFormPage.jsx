import { useForm } from "react-hook-form"
import { useTasks } from "../context/Task Context";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { updateTaskRequest } from "../api/task";
  
  function TaskFormPage(){
    const {register, handleSubmit,setValue} = useForm();
    const{createTask,getTask}= useTasks()
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
      async function loadTask(){
        if(params.id){
        const task = await getTask(params.id);
        console.log(task)
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    loadTask()
    },[]);

    const onSubmit=handleSubmit((data)=>{
      if (params.id){
        updateTaskRequest(params.id,data)
      }else{
        createTask(data)
      }
      navigate('/tasks')
    });
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md"> 
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Title"
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
            />
            <textarea rows="3" placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            ></textarea>
            <button>
              Save
            </button>
          </form>
        </div>
    )
  }
  export default TaskFormPage