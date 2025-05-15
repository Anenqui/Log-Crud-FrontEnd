import { createContext, useContext,useState } from "react";
import { createTaskRequest,getTasksRequest, deleteTaskRequest, getTaskRequest,updateTaskRequest,} from "../api/task"; 

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

    const getTasks = async (task) => {
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

    const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
};
    return(
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask,
            }}>
            {children}
        </TaskContext.Provider>
    );
}