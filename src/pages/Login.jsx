import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../styles/login.css'

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="login-ctr">
                    <div className="login">
            <h2 className="login-header">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="email-inp"
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    className="password-inp"
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button className="login-btn" type="submit">Login</button>
            </form>
            <p className="new-usr-p">New User? <a href="/register" className="new-usr-a">Click here</a> to Register</p>
        </div>
        </div>

    );
};

export default Login;
