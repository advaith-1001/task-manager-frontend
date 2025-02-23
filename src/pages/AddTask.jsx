import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../styles/addtask.css'
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function AddTask() {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [priority, setPriority] = useState('LOW');
  const [categoryId, setCategoryId] = useState('');
  const { logout, token } = useContext(AuthContext); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const taskData = {
        title,
        description,
        dueDateTime: dueDateTime + ":00",// Assuming you're selecting a date without time
        status,
        priority,
        timeSpent: 0, // Optional: default time spent
        categoryId: categoryId ? parseInt(categoryId) : null,
      };
  
      try {
        const response = await axios.post('http://localhost:8080/tasks/create', taskData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // If you are using cookies/session-based authentication
        });
  
        console.log('Task Created:', response.data);
        alert('Task added successfully!');
      } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to add task');
      }
    };

    return(
        <div className="addtask">
            <Navbar />
            <div className="addtask-sidebar-ctr">
                <Sidebar />
                <div className="form-heading-ctr">

                <h1 className="inter-add-task">Add new Task</h1>
                <form className="add-task-form" onSubmit={handleSubmit}>
      <input
      className="title-inp"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
      className="desc-inp"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
      className="date-inp"
        type="datetime-local"
        placeholder="Due by"
        value={dueDateTime}
        onChange={(e) => setDueDateTime(e.target.value)}
        required
      />

      <select className="priority-inp" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button className="create-task-btn" type="submit">Add</button>
    </form>
                </div>

            </div>
        </div>
    );


}

export default AddTask