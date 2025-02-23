import React , {useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../styles/dashboard.css'


const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const { logout, token } = useContext(AuthContext);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/tasks/get/today",{
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setPendingTasks(response.data.pendingTasks);
                setCompletedTasks(response.data.completedTasks);
            })
            .catch(error => {
                console.error("Error fetching today's tasks", error);
            });
    }, []);




    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-sidebar-ctr">
            <Sidebar/>
            <div className="dashboard-ctr">

            <div className="dashboard-1">
            <h1 className="inter-dashboard-header">{pendingTasks.length > 0 
                        ? `You have ${pendingTasks.length} tasks pending for today`
                        : "No tasks pending for today"}
</h1>
<h1 className="inter-dashboard-header">{completedTasks.length > 0 
                        ? `You have completed ${completedTasks.length} tasks today`
                        : "No tasks completed today"}
</h1> 
            </div>
            <div className="dashboard-2">
                <h1 className="inter-dashboard-header">
                    You have completed {completedTasks.length} / {completedTasks.length + pendingTasks.length} tasks today.
                </h1>
            </div>
            <div className="add-task-ctr">

            <a className="add-task-link" href="/addtask">
            <div className="add-task-btn">
                <p className="inter-plus-btn">+</p>
                <p className="inter-add-task">Add tasks</p>
            </div>
        </a>

            </div>



            </div>

            </div>

        </div>
    );
};

export default Dashboard;