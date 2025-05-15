import { createContext, useContext,useState } from "react";
import { createTaskRequest,getTasksRequest, deleteTaskRequest } from "../api/task"; 

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

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTask([...tasks, res.data]); 
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
        const res = await deleteTaskRequest(id);
        if (res.status === 204) setTask(tasks.filter((task) => task._id !== id));
        } catch (error) {
        console.log(error);
        }
    };

    return(
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTask,
            deleteTask,
            }}>
            {children}
        </TaskContext.Provider>
    );
}