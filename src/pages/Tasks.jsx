import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../styles/tasks.css'
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const { logout, token } = useContext(AuthContext); 

    useEffect(() => {
        axios.get("http://localhost:8080/tasks/get/pending", {headers: { Authorization: `Bearer ${token}`}})
        .then((res)=> {
            setTasks(res.data);
        })
        .catch((err) => console.log("Error fetching data",err));
    }, []);

    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:8080/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` }
      })
          .then(() => {
            setTasks(tasks.filter(task => task.id !== taskId));
          })
          .catch((err) => console.error("Error deleting the task",err));
      };

      const handleCompleteTask = (taskId) => {
        axios.put(
          `http://localhost:8080/tasks/${taskId}/complete`,
          {}, // Empty body if your endpoint doesn't expect any request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
          .then(() => {
            setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
            setTasks(tasks.filter(task => task.id !== taskId));
          })
          .catch((err) => console.error(err));
      };  

    

    return(
        <div className="tasks">
            <Navbar />
            <div className="tasks-sidebar-ctr">
                <Sidebar />
                <div className="tasks-ctr">
                {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
        ))
      ) : (
        <a className="add-task-link" href="/addtask">
            <div className="add-task-btn">
                <p className="inter-plus-btn">+</p>
                <p className="inter-add-task">Add tasks</p>
            </div>
        </a>
      )}
                </div>
            </div>
        </div>
    );

}

export default Tasks