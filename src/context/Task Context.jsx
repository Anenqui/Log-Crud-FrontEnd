import { createContext, useContext,useState } from "react";
import { createTaskRequest,getTasksRequest } from "../api/task"; 

const TaskContext = createContext();

export const useTasks=()=>{
    const context = useContext(TaskContext);

    if (!context){
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
}

export function TaskProvider({children}){

    const [tasks,setTask]=useState([]);

    const getTask = async (task) => {
        try {
            const res = await getTasksRequest();
            setTask(res.data);
        }catch(error){
            console.error(error);
        }
    }

    const createTask = async(task)=>{
        const res=await  createTaskRequest(task)
        console.log(res)
    }

    return(
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTask,
            }}>
            {children}
        </TaskContext.Provider>
    );
}