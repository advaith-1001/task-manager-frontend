import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext"; 
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import Categories from "./pages/Categories";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
       <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/tasks" element={<PrivateRoute><Tasks/></PrivateRoute>}/>
      <Route path="/categories" element={<PrivateRoute><Categories/></PrivateRoute>}/>
      <Route path="/addtask" element={<PrivateRoute><AddTask/></PrivateRoute>}/>
      <Route path="/task/:taskId" element={<PrivateRoute><TaskDetails/></PrivateRoute>}/>
      <Route path="/analytics" element={<PrivateRoute><Analytics/></PrivateRoute>}/>
    </Routes>
    </AuthProvider>
    
  );
};

export default App;