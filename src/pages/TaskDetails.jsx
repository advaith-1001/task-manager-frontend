import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/taskdetails.css";
import { AuthContext } from "../context/AuthContext";

function TaskDetails() {
  const { taskId } = useParams();
  const { token } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const taskData = response.data;
        setTask(taskData);
        let initialTimerValue = taskData.timeSpent || 0;

      // If it's running, add elapsed time since `startTime`
      if (taskData.status === "IN_PROGRESS" && taskData.startTime) {
        const startTime = new Date(taskData.startTime).getTime();
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        initialTimerValue += elapsedSeconds;
        setIsRunning(true); // Timer should resume on frontend
      } else {
        setIsRunning(false);
      }

      setTimer(initialTimerValue);
  
      } catch (error) {
        console.error("Failed to fetch task details:", error);
      } finally {
        setLoading(false); // ✅ Will run whether fetch is successful or fails
      }
    };
  
    fetchTaskDetails();
  }, [taskId, token]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);


  const handleStart = async () => {
  try {
    await axios.put(
      `http://localhost:8080/tasks/${task.id}/start`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTask((prev) => ({
      ...prev,
      status: "IN_PROGRESS",
      startTime: new Date().toISOString(),
    }));
    setIsRunning(true);
  } catch (error) {
    console.error("Failed to start task:", error);
  }
};


const handlePause = async () => {
  setIsRunning(false);

  try {
    await axios.put(
      `http://localhost:8080/tasks/${task.id}/pause`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updatedTask = { ...task, status: "PENDING" };

    setTask(updatedTask);
  } catch (error) {
    console.error("Failed to pause task:", error);
  }
};
  

const handleFinish = async () => {
  setIsRunning(false);

  try {
    await axios.put(
      `http://localhost:8080/tasks/${task.id}/complete`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTask((prev) => ({
      ...prev,
      status: "COMPLETED",
    }));
  } catch (error) {
    console.error("Failed to complete task:", error);
  }
};
if(loading) {
  return(
    <div>
      <p>Loading...</p>
    </div>
  );
}


  return (
    <div className="taskdetails">
      <Navbar />
      <div className="taskdetails-sidebar-ctr">
        <Sidebar />
        <div className="taskdetails-ctr">
          <div className="taskdetails-box">
            <p>Task: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Created at: {task.createdAt}</p>
            <p>Due at: {task.dueDateTime}</p>
            <p>
              Time spent: {Math.floor(timer / 3600)}h{" "}
              {Math.floor((timer % 3600) / 60)}m {timer % 60}s
            </p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>
          <div className="buttons-ctr">
          <button className="start-btn" onClick={handleStart} disabled={task.status === "COMPLETED"}>
              Start
          </button>
            <button className="pause-btn" onClick={handlePause} disabled={!isRunning}>
              Pause
            </button>
            <button className="finish-btn" onClick={handleFinish} disabled={task.status === "COMPLETED"}>
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
